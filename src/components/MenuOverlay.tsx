import { useEffect, useRef, type MouseEvent, type SyntheticEvent } from 'react'
import { instagramDm, menu, site, socials } from '../data/site'
import { gsap } from '../lib/gsap'
import { lockScroll, scrollToTarget } from '../lib/lenis'
import { prefersReducedMotion } from '../hooks/useReducedMotion'
import { socialIcon } from './socialIcons'

interface MenuOverlayProps {
  open: boolean
  onClose: () => void
}

const OPEN_SHAPE = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
const CLOSED_SHAPE = 'polygon(0% 0%, 0% 0%, -12% 100%, -12% 100%)'

/**
 * Full-screen numbered menu. Native <dialog>: focus is trapped, the page
 * behind is inert, Esc closes, and focus returns to the menu button.
 */
export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const pendingHash = useRef<string | null>(null)

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
        if (pendingHash.current) {
          scrollToTarget(pendingHash.current)
          pendingHash.current = null
        }
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

  const onNavigate = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    pendingHash.current = href
    onClose()
  }

  return (
    <dialog id="site-menu" ref={ref} className="menu" aria-label="Site menu" onCancel={onCancel}>
      <div className="sunset-glow" aria-hidden="true" />
      <div className="halftone right-0 bottom-0 h-[60%] w-[70%]" style={{ ['--ht-mask' as string]: 'linear-gradient(315deg, #000, transparent 65%)' }} aria-hidden="true" />

      <div className="shell relative flex min-h-full flex-col">
        <div className="flex h-(--header-h) items-center justify-between" data-menu-fade>
          <p className="label text-muted">
            Menu <span className="kana ml-3" aria-hidden="true" lang="ja">メニュー</span>
          </p>
          <button type="button" className="btn btn-secondary btn-sm min-w-11 px-3" onClick={onClose} autoFocus>
            <span className="sr-only sm:not-sr-only">Close</span>
            <span aria-hidden="true" className="relative block h-4 w-4">
              <span className="absolute top-1/2 left-0 h-0.5 w-full rotate-45 bg-current" />
              <span className="absolute top-1/2 left-0 h-0.5 w-full -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        <nav aria-label="Menu" className="flex flex-1 items-center py-10">
          <ol className="w-full">
            {menu.map((item, i) => (
              <li key={item.id} className="overflow-hidden border-b border-line first:border-t">
                <a
                  href={item.href}
                  onClick={(e) => onNavigate(e, item.href)}
                  data-menu-item
                  className="group flex items-baseline gap-[clamp(1rem,3vw,2.5rem)] py-[clamp(0.75rem,2vh,1.5rem)]"
                >
                  <span className="label w-8 shrink-0 text-ember">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display text-[clamp(2.25rem,min(10vw,8.5svh),7.5rem)] leading-[0.9] font-bold uppercase tracking-tight transition-[color,transform] duration-300 ease-expo group-hover:translate-x-3 group-hover:text-ember group-focus-visible:text-ember">
                    {item.label}
                  </span>
                  <span className="kana ml-auto hidden text-sm sm:block" aria-hidden="true" lang="ja">
                    {item.kana}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex flex-col gap-6 pb-8 sm:flex-row sm:items-end sm:justify-between" data-menu-fade>
          <ul className="flex flex-wrap gap-2" aria-label="Social links">
            {socials.map((s) => {
              const Icon = socialIcon[s.id]
              // Instagram DM is the primary contact route; the rest are secondary
              const primary = s.id === 'instagram'
              return (
                <li key={s.id}>
                  <a
                    href={primary ? instagramDm : s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn btn-sm ${primary ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    <Icon width={16} height={16} />
                    {primary ? 'DM on Instagram' : s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              )
            })}
          </ul>
          <div className="label flex flex-col gap-2 text-muted sm:items-end">
            <a href={`mailto:${site.email}`} className="link normal-case tracking-normal text-sm">
              {site.email}
            </a>
            <span className="flex items-center gap-2">
              <span className="live-dot h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
              Available for work · {site.location}
            </span>
          </div>
        </div>
      </div>
    </dialog>
  )
}
