import type { ReactNode } from 'react'

/**
 * Accent word in ember (#f18a36). Rule: ONE word, inside a heading, at most
 * once per heading. Keeps headings from turning into a colouring book.
 */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="text-ember">{children}</span>
}