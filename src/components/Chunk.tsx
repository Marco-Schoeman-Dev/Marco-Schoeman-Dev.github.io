import { Suspense, type ReactNode } from 'react'

/**
 * Hydration boundary. Nothing suspends; each boundary lets React hydrate the
 * prerendered page in separate chunks and yield between them, instead of one
 * long main-thread task (Total Blocking Time). Wrap each below-the-fold section.
 */
export const Chunk = ({ children }: { children: ReactNode }) => <Suspense>{children}</Suspense>
