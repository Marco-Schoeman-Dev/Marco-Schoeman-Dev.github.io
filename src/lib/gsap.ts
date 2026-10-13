import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// Register once, import from here everywhere else. Guarded so the build-time
// prerender (Node, no window) can import components safely.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText)
  gsap.defaults({ ease: 'expo.out', duration: 0.9 })
}

/** Resting (fully revealed) value for every property an entrance animates from. */
const REST: Record<string, number> = {
  x: 0, y: 0, xPercent: 0, yPercent: 0, rotate: 0, skewX: 0, scale: 1, opacity: 1, autoAlpha: 1,
}

/**
 * End values for a reveal: `fromTo(el, from, { ...restOf(from), duration })`.
 * Use instead of gsap.from(): from() reads the element's *current* state as the
 * end value, which breaks if that state is mid-transition or already offset
 * (cards stuck at their start x on mobile was exactly that).
 */
export function restOf(from: gsap.TweenVars): gsap.TweenVars {
  return Object.fromEntries(Object.keys(from).filter((k) => k in REST).map((k) => [k, REST[k]]))
}

export { gsap, ScrollTrigger, SplitText }
