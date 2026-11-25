import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

// Self-hosted brand fonts (latin subset only, font-display: swap).
// One weight per body/label family keeps first-load font bytes low; emphasis
// comes from Chakra Petch rather than a medium body weight.
import '@fontsource/chakra-petch/latin-600.css'
import '@fontsource/chakra-petch/latin-700.css'
import '@fontsource/ibm-plex-sans/latin-400.css'
import '@fontsource/jetbrains-mono/latin-400.css'

import './styles/index.css'
import App from './App.tsx'
import { matchRoute, type HeroVariant, type Route, type RouteId } from './routes'
import { pages } from './pages'

const root = document.getElementById('root')!

// Production HTML is prerendered per page (scripts/prerender.mjs), which
// records the route it rendered on #root. Trust that over the URL: an unknown
// path is served 404.html and must hydrate as the 404 page.
const prerendered = root.dataset.route as RouteId | undefined
const route: Route = prerendered
  ? {
      id: prerendered,
      path: root.dataset.path ?? location.pathname,
      slug: root.dataset.slug || undefined,
      variant: (root.dataset.variant as HeroVariant) || undefined,
    }
  : matchRoute(location.pathname)

const { default: Page } = await pages[route.id]()

const app = (
  <StrictMode>
    <App route={route} Page={Page} />
  </StrictMode>
)

// The dev server serves an empty root: render from scratch.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)

if (import.meta.env.DEV) {
  // Prerender writes the real <head>; in dev, at least get the tab title right
  void import('./seo').then(({ metaFor }) => (document.title = metaFor(route).title))
}
