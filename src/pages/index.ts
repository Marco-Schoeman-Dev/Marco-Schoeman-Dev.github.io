import type { ComponentType } from 'react'
import type { Route, RouteId } from '../routes'

export interface PageProps {
  route: Route
}

type PageModule = { default: ComponentType<PageProps> }

/**
 * One JS chunk per page. The browser loads only the page it is on; the
 * prerender preloads that chunk (modulepreload) so hydration doesn't wait.
 */
export const pages: Record<RouteId, () => Promise<PageModule>> = {
  home: () => import('./Home'),
  lives: () => import('./Lives'),
  live: () => import('./LivePost'),
  club: () => import('./FoundersClub'),
  work: () => import('./Work'),
  about: () => import('./About'),
  notFound: () => import('./NotFound'),
}

/** Source file of each page, as keyed in Vite's build manifest */
export const pageFiles: Record<RouteId, string> = {
  home: 'src/pages/Home.tsx',
  lives: 'src/pages/Lives.tsx',
  live: 'src/pages/LivePost.tsx',
  club: 'src/pages/FoundersClub.tsx',
  work: 'src/pages/Work.tsx',
  about: 'src/pages/About.tsx',
  notFound: 'src/pages/NotFound.tsx',
}
