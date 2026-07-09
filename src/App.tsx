import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Skills } from './components/sections/Skills'
import { Certifications } from './components/sections/Certifications'
import { Projects } from './components/sections/Projects'
import { Contact } from './components/sections/Contact'
import { Ticker } from './components/ui/Ticker'
import { PageWipe } from './components/ui/PageWipe'
import { Cursor } from './components/ui/Cursor'
import { ParticleBackground } from './components/ui/ParticleBackground'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <>
      {/* Fixed, viewport-sized, behind everything — z-index handled by
          .particle-layer / .app-content in index.css, not stacking order,
          so there's no ambiguity about what paints on top. */}
      <div className="particle-layer" aria-hidden="true">
        <ParticleBackground className="h-full w-full" />
      </div>

      <div className="app-content">
        <PageWipe />
        <Cursor />
        <Header theme={theme} onToggleTheme={toggle} />
        <main>
          <Hero />
          <Ticker />
          <About />
          <Skills />
          <Certifications />
          <Projects />
          <Ticker />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
