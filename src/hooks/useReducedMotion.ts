import { useMediaQuery } from './useMediaQuery'

export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

export function useReducedMotion() {
  return useMediaQuery(REDUCED_MOTION)
}

/** Non-hook check for code that runs outside React render. */
export function prefersReducedMotion() {
  return window.matchMedia(REDUCED_MOTION).matches
}
