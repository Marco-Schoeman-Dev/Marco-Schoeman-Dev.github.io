import { useEffect, useRef, type SyntheticEvent } from 'react'
import { applyHref, instagramDm, nav, site, socials } from '../data/site'
import { gsap } from '../lib/gsap'
import { lockScroll } from '../lib/lenis'
import { prefersReducedMotion } from '../hooks/useReducedMotion'
import { socialIcon } from './socialIcons'

interface MenuOverlayProps {
  open: boolean
  onClose: () => void
  /** Nav id of the current page */
  current: string | null
}

const OPEN_SHAPE = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
const CLOSED_SHAPE = 'polygon(0% 0%, 0% 0%, -12% 100%, -12% 100%)'

/**
 * Full-screen menu (below lg). Native <dialog>: focus is trapped, the page
 * behind is inert, Esc closes, and focus returns to the menu button.
 * Links are ordinary page loads.
 */
export function MenuOverlay({ open, onClose, current }: MenuOverlayProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const reduced = prefersReducedMotion()

    if (open && !dialog.open) {
      dialog.showModal()
      lockScroll(true)
      if (!reduced) {
        gsap
          .timeline()
          .fromTo(dialog, { clipPath: CLOSED_SHAPE }, { clipPath: OPEN_SHAPE, duration: 0.7, ease: 'expo.inOut' })
          .fromTo(dialog.querySelectorAll('[data-menu-item]'), { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.06 }, '-=0.35')
          .fromTo(dialog.querySelectorAll('[data-menu-fade]'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 }, '<0.2')
      }
    }

    if (!open && dialog.open) {
      const finish = () => {
        dialog.close()
        lockScroll(false)
        gsap.set(dialog, { clearProps: 'clipPath' })
      }
      if (reduced) finish()
      else gsap.to(dialog, { clipPath: CLOSED_SHAPE, duration: 0.45, ease: 'expo.in', onComplete: finish })
    }
  }, [open])

  // Esc fires `cancel`; let React state drive the (animated) close instead.
  const onCancel = (e: SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault()
    onClose()
  }

  return (
    <dialog id="site-menu" ref={ref} className="menu" aria-label="Site menu" onCancel={onCancel}>
      <div className="sunset-glow" aria-hidden="true" />
      <div className="halftone right-0 bottom-0 h-[60%] w-[70%]" style={{ ['--ht-mask' as string]: 'linear-gradient(315deg, #000, transparent 65%)' }} aria-hidden="true" />

      <div className="shell relative flex min-h-full flex-col">
        <div className="flex h-(--header-h) items-center justify-between" data-menu-fade>
          <p className="label text-muted">Menu</p>
          <button type="button" className="btn btn-secondary btn-sm min-w-11 px-3" onClick={onClose} autoFocus>
            <span className="sr-only sm:not-sr-only">Close</span>
            <span aria-hidden="true" className="relative block h-4 w-4">
              <span className="absolute top-1/2 left-0 h-0.5 w-full rotate-45 bg-current" />
              <span className="absolute top-1/2 left-0 h-0.5 w-full -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        <nav aria-label="Menu" className="flex flex-1 flex-col justify-center gap-8 py-10">
          <ol className="w-full">
            {nav.map((item, i) => (
              <li key={item.id} className="overflow-hidden border-b border-line first:border-t">
                <a
                  href={item.href}
                  aria-current={current === item.id ? 'page' : undefined}
                  data-menu-item
                  className="group flex items-baseline gap-[clamp(1rem,3vw,2.5rem)] py-[clamp(0.75rem,2vh,1.5rem)]"
                >
                  <span className="label w-8 shrink-0 text-ember">{String(i + 1).padStart(2, '0')}</span>
                  <span
                    className={`font-display text-[clamp(2rem,min(9vw,8svh),6rem)] leading-[0.9] font-bold uppercase tracking-tight transition-[color,transform] duration-300 ease-expo group-hover:translate-x-3 group-hover:text-ember group-focus-visible:text-ember ${
                      current === item.id ? 'text-ember' : ''
                    }`}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ol>
          <a href={applyHref} className="btn btn-primary self-start" data-menu-fade>
            Apply to The Founders Club
          </a>
        </nav>

        <div className="flex flex-col gap-6 pb-8 sm:flex-row sm:items-end sm:justify-between" data-menu-fade>
          <ul className="flex flex-wrap gap-2" aria-label="Social links">
            {socials.map((s) => {
              const Icon = socialIcon[s.id]
              // Instagram DM is the primary contact route; the rest are secondary
              const primary = s.id === 'instagram'
              return (
                <li key={s.id}>
                  <a href={primary ? instagramDm : s.href} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-secondary">
                    <Icon width={16} height={16} />
                    {primary ? 'DM on Instagram' : s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              )
            })}
          </ul>
          <div className="label flex flex-col gap-2 text-muted sm:items-end">
            <a href={`mailto:${site.email}`} className="link text-sm tracking-normal normal-case">
              {site.email}
            </a>
            <span>{site.location}</span>
          </div>
        </div>
      </div>
    </dialog>
  )
}
