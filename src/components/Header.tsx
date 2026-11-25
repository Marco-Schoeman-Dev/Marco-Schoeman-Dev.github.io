import { useEffect, useRef, useState } from 'react'
import { applyHref, nav } from '../data/site'
import { navIdFor } from '../routes'
import { useRoute } from '../hooks/useRoute'
import { MenuOverlay } from './MenuOverlay'
import { Picture } from './Picture'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const current = navIdFor(useRoute().id)

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
          {/* Same lockup as the footer, sized to the header bar. The drop
              shadow keeps the light lettering readable over the hero art. */}
          <a href="/" className="-m-1 shrink-0 p-1" aria-label="Marco Schoeman, home">
            <Picture
              image="logo-lockup"
              alt="Marco Schoeman logo"
              sizes="(min-width: 768px) 195px, 162px"
              eager
              className="block"
              imgClassName="h-10 w-auto drop-shadow-[0_1px_8px_rgb(11_6_5/0.85)] md:h-12"
            />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-[clamp(1.5rem,2.6vw,2.75rem)]">
              {nav.map((link) => {
                const active = current === link.id
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={`label relative inline-flex min-h-11 items-center transition-colors duration-200 hover:text-ink ${
                        active ? 'text-ink' : 'text-muted'
                      }`}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={`ember-rule absolute inset-x-0 bottom-2 origin-left transition-transform duration-300 ease-expo ${
                          active ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href={applyHref} className="btn btn-primary btn-sm">
              Apply
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              className="btn btn-secondary btn-sm min-w-11 px-3 lg:hidden"
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

      <MenuOverlay open={open} onClose={() => setOpen(false)} current={current} />
    </>
  )
}
