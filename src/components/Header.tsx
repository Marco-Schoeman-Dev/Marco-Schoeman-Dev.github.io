import { useEffect, useRef, useState } from 'react'
import { headerLinks } from '../data/site'
import { MenuOverlay } from './MenuOverlay'
import { useActiveSection } from '../hooks/useActiveSection'

const kit = '/images/marco-schoeman-brand-kit/01-logo'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const active = useActiveSection(headerLinks.map((l) => l.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color] duration-300 ${
          scrolled ? 'border-line bg-bg/95' : 'border-transparent bg-transparent'
        }`}
      >
        <div className="shell flex h-(--header-h) items-center justify-between gap-3">
          <a href="#top" className="-m-1 shrink-0 p-1" aria-label="Marco Schoeman, back to top">
            <img src={`${kit}/monogram-dark.svg`} alt="" width={36} height={36} className="h-9 w-9 rounded-md md:hidden" />
            <img src={`${kit}/wordmark-on-dark.svg`} alt="" width={151} height={19} className="hidden h-[19px] w-auto md:block" />
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-[clamp(1.5rem,3vw,2.75rem)]">
              {headerLinks.map((link) => {
                const current = active === link.id
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      aria-current={current ? 'location' : undefined}
                      className={`label relative inline-flex min-h-11 items-center transition-colors duration-200 hover:text-ink ${
                        current ? 'text-ink' : 'text-muted'
                      }`}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={`neon-line absolute inset-x-0 bottom-2 origin-left transition-transform duration-300 ease-expo ${
                          current ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href="#contact" className="btn btn-primary btn-sm">
              Start a project
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              className="btn btn-secondary btn-sm min-w-11 px-3"
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only sm:not-sr-only">Menu</span>
              <span aria-hidden="true" className="flex w-4 flex-col gap-[5px]">
                <span className="h-0.5 w-full bg-current" />
                <span className="h-0.5 w-2/3 self-end bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  )
}
