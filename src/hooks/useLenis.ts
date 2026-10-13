import { useEffect } from 'react'
import { scrollToTarget, startLenis, stopLenis } from '../lib/lenis'
import { useReducedMotion } from './useReducedMotion'

/** Smooth scroll (off under reduced motion) + accessible in-page anchor handling. */
export function useLenis() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    startLenis()
    return stopLenis
  }, [reduced])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
      const hash = link?.getAttribute('href')
      if (!link || !hash || hash === '#') return
      if (hash !== '#top' && !document.querySelector(hash)) return
      e.preventDefault()
      scrollToTarget(hash)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}
