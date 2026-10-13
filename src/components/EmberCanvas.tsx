import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../hooks/useReducedMotion'

interface Ember {
  x: number
  y: number
  r: number
  vy: number
  sway: number
  phase: number
  life: number
  color: string
}

const COLORS = ['241,138,54', '252,193,51', '255,108,68']

/**
 * Embers drifting up out of the sunset. Cheap 2D canvas, no dependencies.
 * Starts when the browser is idle, pauses off-screen and in hidden tabs,
 * and draws a single still frame under prefers-reduced-motion.
 */
export function EmberCanvas({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduced = prefersReducedMotion()
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let w = 0
    let h = 0
    let embers: Ember[] = []
    let raf = 0
    let visible = true
    let running = false

    const spawn = (anywhere: boolean): Ember => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 10,
      r: 0.6 + Math.random() * 1.8,
      vy: 0.25 + Math.random() * 0.7,
      sway: 0.3 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2,
      life: 0.4 + Math.random() * 0.6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    })

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(56, Math.round((w * h) / 22000))
      embers = Array.from({ length: count }, () => spawn(true))
      if (!running) draw(0)
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      for (const e of embers) {
        if (running) {
          e.y -= e.vy
          e.x += Math.sin(t / 1400 + e.phase) * e.sway * 0.35
          if (e.y < -10) Object.assign(e, spawn(false))
        }
        // Fade in from the bottom, out towards the top
        const fade = Math.min(1, (h - e.y) / (h * 0.25)) * Math.min(1, e.y / (h * 0.45))
        const flicker = 0.75 + Math.sin(t / 180 + e.phase * 3) * 0.25
        const a = Math.max(0, fade * flicker * e.life)
        ctx.fillStyle = `rgba(${e.color},${a * 0.22})`
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.r * 3.2, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = `rgba(${e.color},${a})`
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'
    }

    const loop = (t: number) => {
      draw(t)
      raf = requestAnimationFrame(loop)
    }

    const play = () => {
      if (running || reduced || !visible || document.hidden) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    const pause = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) play()
      else pause()
    })
    io.observe(canvas)

    const onVisibility = () => (document.hidden ? pause() : play())
    document.addEventListener('visibilitychange', onVisibility)

    // Keep the main thread free during first load
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(play, { timeout: 2000 })
      : window.setTimeout(play, 1200)

    return () => {
      pause()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle)
      else window.clearTimeout(idle)
    }
  }, [])

  return <canvas ref={ref} className={`pointer-events-none ${className}`} aria-hidden="true" />
}
