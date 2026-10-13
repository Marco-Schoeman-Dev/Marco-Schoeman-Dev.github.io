import { useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useGsap } from '../hooks/useGsap'

/**
 * Counts a stat like "07" or "30+" up from zero when it scrolls into view.
 * The real value is in the DOM from the start (SSR-safe, reduced-motion safe,
 * screen readers read the final number).
 */
export function CountUp({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const match = value.match(/^(\d+)(.*)$/)

  useGsap(() => {
    if (!match) return
    const el = ref.current!
    const target = Number(match[1])
    const pad = match[1].length
    const suffix = match[2]
    const counter = { n: 0 }
    gsap.to(counter, {
      n: target,
      duration: 1.6,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => {
        el.textContent = String(Math.round(counter.n)).padStart(pad, '0') + suffix
      },
    })
  }, ref)

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value}
    </span>
  )
}
