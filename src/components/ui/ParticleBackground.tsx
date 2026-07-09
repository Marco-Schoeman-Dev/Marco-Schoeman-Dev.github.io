import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}

export function ParticleBackground({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !parent || !ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const maxDist = 170            // connection distance between particles
    const dotRadius = 3            // particle size
    const lineWidth = 1.6          // particle-to-particle line weight
    const bindRadius = 190         // how far the pointer's pull reaches
    const pullStrength = 0.55      // how hard particles accelerate toward the pointer
    const separationDist = 34      // particles push apart below this distance
    const separationStrength = 0.5 // how hard they push apart
    const friction = 0.975         // settles bursts of speed back down
    const minSpeed = 0.3           // floor so drift never fully stops
    const maxSpeed = 2.6           // ceiling so pointer bursts don't run away

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let raf = 0
    const mouse = { x: -9999, y: -9999 }
    let accent = 'oklch(48% 0.20 22)'

    const readAccent = () => {
      accent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || accent
    }
    readAccent()

    const themeObserver = new MutationObserver(readAccent)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const resize = () => {
      const rect = parent.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(70, Math.round((width * height) / 20000))
      particles = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * minSpeed,
          vy: Math.sin(angle) * minSpeed,
        }
      })
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        const dxm = mouse.x - p.x
        const dym = mouse.y - p.y
        const dm = Math.sqrt(dxm * dxm + dym * dym)
        if (dm < bindRadius && dm > 0.01) {
          const pull = (1 - dm / bindRadius) * pullStrength
          p.vx += (dxm / dm) * pull
          p.vy += (dym / dm) * pull
        }

        // Keep particles from stacking on top of each other while clustered
        // around the pointer — short-range push-apart.
        for (let j = 0; j < particles.length; j++) {
          if (i === j) continue
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < separationDist && d > 0.01) {
            const push = (1 - d / separationDist) * separationStrength
            p.vx += (dx / d) * push
            p.vy += (dy / d) * push
          }
        }

        p.vx *= friction
        p.vy *= friction

        const speed = Math.hypot(p.vx, p.vy)
        if (speed < minSpeed) {
          const angle = speed > 0.0001 ? Math.atan2(p.vy, p.vx) : Math.random() * Math.PI * 2
          p.vx = Math.cos(angle) * minSpeed
          p.vy = Math.sin(angle) * minSpeed
        } else if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed
          p.vy = (p.vy / speed) * maxSpeed
        }

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
        p.x = Math.max(0, Math.min(width, p.x))
        p.y = Math.max(0, Math.min(height, p.y))
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            ctx.strokeStyle = accent
            ctx.lineWidth = lineWidth
            ctx.globalAlpha = (1 - dist / maxDist) * 0.25
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }

        const dxm = a.x - mouse.x
        const dym = a.y - mouse.y
        const dm = Math.sqrt(dxm * dxm + dym * dym)
        if (dm < bindRadius) {
          ctx.strokeStyle = accent
          ctx.lineWidth = lineWidth * 1.3
          ctx.globalAlpha = (1 - dm / bindRadius) * 0.45
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }

        ctx.globalAlpha = 0.85
        ctx.fillStyle = accent
        ctx.beginPath()
        ctx.arc(a.x, a.y, dotRadius, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
    }

    const loop = () => {
      drawFrame()
      raf = requestAnimationFrame(loop)
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(parent)

    if (reduced) {
      drawFrame()
    } else {
      // Listen on window, not the canvas — the canvas sits under
      // pointer-events-none so hero content stays clickable.
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('blur', onLeave)
      raf = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      themeObserver.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('blur', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block' }}
      aria-hidden="true"
    />
  )
}
