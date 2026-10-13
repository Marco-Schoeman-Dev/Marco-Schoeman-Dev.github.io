import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

let lenis: Lenis | null = null

/** Start Lenis and drive it from GSAP's ticker so ScrollTrigger stays in sync. */
export function startLenis() {
  if (lenis) return lenis
  lenis = new Lenis({ lerp: 0.1, anchors: false })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export function stopLenis() {
  if (!lenis) return
  gsap.ticker.remove(raf)
  lenis.destroy()
  lenis = null
}

function raf(time: number) {
  lenis?.raf(time * 1000)
}

/** Pause/resume page scrolling (menu overlay). Falls back to overflow lock. */
export function lockScroll(locked: boolean) {
  document.documentElement.classList.toggle('scroll-locked', locked)
  if (!lenis) return
  if (locked) lenis.stop()
  else lenis.start()
}

/**
 * Scroll to an in-page target and move focus there so keyboard and screen
 * reader users land where sighted users do.
 */
export function scrollToTarget(hash: string) {
  const target = hash === '#top' ? document.body : document.querySelector<HTMLElement>(hash)
  if (!target) return

  const focus = () => {
    if (target === document.body) return
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
  }

  // Both paths honour the CSS scroll-margin-top (= header height) on [id],
  // so no extra offset here.
  if (lenis) {
    lenis.scrollTo(hash === '#top' ? 0 : target, { onComplete: focus })
  } else {
    if (hash === '#top') window.scrollTo({ top: 0 })
    else target.scrollIntoView({ block: 'start' })
    focus()
  }
  history.replaceState(null, '', hash === '#top' ? location.pathname : hash)
}
