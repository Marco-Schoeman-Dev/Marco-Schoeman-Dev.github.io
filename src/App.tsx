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
        <About />
        <Work />
        <ProjectSection category="security" />
        <ProjectSection category="automation" surface />
        <Method />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
