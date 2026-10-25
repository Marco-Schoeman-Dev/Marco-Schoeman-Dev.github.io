import { useLayoutEffect, type DependencyList, type RefObject } from 'react'
import { gsap } from '../lib/gsap'
import { prefersReducedMotion } from './useReducedMotion'

interface UseGsapOptions {
  /**
   * Run setup when the browser is idle instead of during hydration. Each
   * deferred section becomes its own small task, so first load doesn't pay for
   * every section's ScrollTriggers in one long main-thread block. Default true;
   * pass false for above-the-fold entrances (the hero).
   */
  defer?: boolean
}

type IdleHandle = { cancel: () => void }

const whenIdle = (fn: () => void): IdleHandle => {
  if (typeof window.requestIdleCallback === 'function') {
    const id = window.requestIdleCallback(fn, { timeout: 1200 })
    return { cancel: () => window.cancelIdleCallback(id) }
  }
  const id = window.setTimeout(fn, 1)
  return { cancel: () => window.clearTimeout(id) }
}

/**
 * Runs GSAP setup inside a scoped context and reverts everything (tweens,
 * ScrollTriggers, SplitText) on unmount or when deps change. Skipped entirely
 * under prefers-reduced-motion so content renders in its final state.
 */
export function useGsap(
  setup: (ctx: gsap.Context) => void | (() => void),
  scope: RefObject<HTMLElement | null>,
  deps: DependencyList = [],
  { defer = true }: UseGsapOptions = {},
) {
  useLayoutEffect(() => {
    if (!scope.current || prefersReducedMotion()) return
    let ctx: gsap.Context | undefined
    const run = () => {
      if (scope.current) ctx = gsap.context((self) => setup(self), scope.current)
    }

    if (!defer) {
      run()
      return () => ctx?.revert()
    }
    const idle = whenIdle(run)
    return () => {
      idle.cancel()
      ctx?.revert()
    }
    // Caller-supplied deps by design (mirrors useEffect's contract)
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
