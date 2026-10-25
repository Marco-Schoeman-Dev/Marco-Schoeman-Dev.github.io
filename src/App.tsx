import { Suspense, type ReactNode } from 'react'
import { useLenis } from './hooks/useLenis'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Work } from './sections/Work'
import { ProjectSection } from './sections/ProjectSection'
import { Method } from './sections/Method'
import { Services } from './sections/Services'
import { Contact } from './sections/Contact'

/**
 * Each below-the-fold section is its own Suspense boundary. Nothing suspends;
 * the boundaries let React hydrate the prerendered page in separate chunks and
 * yield between them, instead of one long main-thread task (Total Blocking Time).
 */
const Chunk = ({ children }: { children: ReactNode }) => <Suspense>{children}</Suspense>

export default function App() {
  useLenis()

  return (
    <>
      <a
        href="#main"
        className="btn btn-primary fixed top-3 left-3 z-50 -translate-y-24 focus-visible:translate-y-0"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Chunk><About /></Chunk>
        <Chunk><Work /></Chunk>
        <Chunk><ProjectSection category="security" /></Chunk>
        <Chunk><ProjectSection category="automation" surface /></Chunk>
        <Chunk><Method /></Chunk>
        <Chunk><Services /></Chunk>
        <Chunk><Contact /></Chunk>
      </main>
      <Chunk><Footer /></Chunk>
    </>
  )
}
