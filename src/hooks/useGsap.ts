import { useLayoutEffect, type DependencyList, type RefObject } from 'react'
import { gsap } from '../lib/gsap'
import { prefersReducedMotion } from './useReducedMotion'

/**
 * Runs GSAP setup inside a scoped context and reverts everything (tweens,
 * ScrollTriggers, SplitText) on unmount or when deps change. Skipped entirely
 * under prefers-reduced-motion so content renders in its final state.
 */
export function useGsap(
  setup: (ctx: gsap.Context) => void | (() => void),
  scope: RefObject<HTMLElement | null>,
  deps: DependencyList = [],
) {
  useLayoutEffect(() => {
    if (!scope.current || prefersReducedMotion()) return
    const ctx = gsap.context((self) => setup(self), scope.current)
    return () => ctx.revert()
    // Caller-supplied deps by design (mirrors useEffect's contract)
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
