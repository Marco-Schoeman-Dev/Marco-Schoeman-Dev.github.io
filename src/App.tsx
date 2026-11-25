import type { ComponentType } from 'react'
import type { Route } from './routes'
import type { PageProps } from './pages'
import { useLenis } from './hooks/useLenis'
import { RouteContext } from './hooks/useRoute'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Chunk } from './components/Chunk'

interface AppProps {
  route: Route
  Page: ComponentType<PageProps>
}

/** Shared shell: skip link, header, the current page, footer. */
export default function App({ route, Page }: AppProps) {
  useLenis()

  return (
    <RouteContext.Provider value={route}>
      <a
        href="#main"
        className="btn btn-primary fixed top-3 left-3 z-50 max-w-[calc(100vw-1.5rem)] -translate-y-24 focus-visible:translate-y-0"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Page route={route} />
      </main>
      <Chunk>
        <Footer />
      </Chunk>
    </RouteContext.Provider>
  )
}
