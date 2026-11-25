import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'
import { HERO_PREVIEWS, type Route } from './routes'
import { pageFiles, pages } from './pages'
import { lives } from './data/lives'
import { headHtml } from './seo'

/** Every page the build writes, with its output file inside dist/ */
export function routes(): { route: Route; file: string; lastmod?: string }[] {
  return [
    { route: { id: 'home', path: '/' }, file: 'index.html' },
    { route: { id: 'lives', path: '/lives' }, file: 'lives.html', lastmod: lives[0]?.date },
    ...lives.map((l) => ({
      route: { id: 'live' as const, path: `/lives/${l.slug}`, slug: l.slug },
      file: `lives/${l.slug}.html`,
      lastmod: l.date,
    })),
    { route: { id: 'club', path: '/founders-club' }, file: 'founders-club.html' },
    { route: { id: 'work', path: '/work' }, file: 'work.html' },
    { route: { id: 'about', path: '/about' }, file: 'about.html' },
    { route: { id: 'notFound', path: '/404' }, file: '404.html' },
    // TEMPORARY hero options (noindex, not in the sitemap)
    ...Object.entries(HERO_PREVIEWS).map(([path, variant]) => ({
      route: { id: 'home' as const, path, variant },
      file: `${path.slice(1)}.html`,
    })),
  ]
}

/** Used by scripts/prerender.mjs to bake each page into its own HTML file. */
export async function render(route: Route) {
  const { default: Page } = await pages[route.id]()
  const html = renderToString(
    <StrictMode>
      <App route={route} Page={Page} />
    </StrictMode>,
  )
  return { html, head: headHtml(route), pageFile: pageFiles[route.id] }
}
