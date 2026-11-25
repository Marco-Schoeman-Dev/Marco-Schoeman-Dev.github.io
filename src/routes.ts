// ─── Pages ───────────────────────────────────────────────────────────────────
// Multi-page site: every route is prerendered to its own HTML file
// (scripts/prerender.mjs). Links are plain <a href>; no client router.

export type RouteId = 'home' | 'lives' | 'live' | 'club' | 'work' | 'about' | 'notFound'

/** Home hero brand visual. Non-default values are preview pages only. */
export type HeroVariant = 'portrait' | 'alongside' | 'emblem'

export interface Route {
  id: RouteId
  /** Clean URL path, no trailing slash (except "/") */
  path: string
  /** Live slug, for id "live" */
  slug?: string
  /** Home hero option being previewed (/preview/hero-*). Not indexed. */
  variant?: HeroVariant
}

/** TEMPORARY: home page with each hero option, to choose between them */
export const HERO_PREVIEWS: Record<string, HeroVariant> = {
  '/preview/hero-alongside': 'alongside',
  '/preview/hero-emblem': 'emblem',
}

const STATIC: Record<string, RouteId> = {
  '/': 'home',
  '/lives': 'lives',
  '/founders-club': 'club',
  '/work': 'work',
  '/about': 'about',
}

/** "/work/", "/work.html" and "/work/index.html" all become "/work" */
export function normalizePath(pathname: string) {
  let p = pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '')
  if (p.length > 1) p = p.replace(/\/+$/, '')
  return p || '/'
}

/** Route for a URL. Live slugs are checked by the page, not here, so the
 *  shared bundle never has to carry the list of Lives. */
export function matchRoute(pathname: string): Route {
  const path = normalizePath(pathname)
  if (STATIC[path]) return { id: STATIC[path], path }
  if (HERO_PREVIEWS[path]) return { id: 'home', path, variant: HERO_PREVIEWS[path] }
  const live = path.match(/^\/lives\/([a-z0-9-]+)$/)
  if (live) return { id: 'live', path, slug: live[1] }
  return { id: 'notFound', path }
}

/** Which nav item a route belongs to (header aria-current) */
export const navIdFor = (id: RouteId) =>
  id === 'live' ? 'lives' : id === 'home' || id === 'notFound' ? null : id
