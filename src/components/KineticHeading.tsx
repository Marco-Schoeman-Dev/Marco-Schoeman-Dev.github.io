import { useRef, type ReactNode } from 'react'
import { gsap, ScrollTrigger, SplitText } from '../lib/gsap'
import { useGsap } from '../hooks/useGsap'

type Level = 'h1' | 'h2' | 'h3'

interface KineticHeadingProps {
  as?: Level
  id?: string
  className?: string
  /** Plain-text heading: becomes the heading's aria-label once the text is split for animation */
  label: string
  children: ReactNode
  /** 'scroll' waits for the heading to enter view; 'load' plays immediately */
  trigger?: 'scroll' | 'load'
  delay?: number
  /** Class added to every split letter (e.g. 'neon-char' for per-letter hover) */
  charsClass?: string
}

/**
 * Anime title card: an ember slash wipes across while letters rise out of a
 * mask with a skew that settles flat. Expo ease, no overshoot.
 *
 * Splitting is deferred until the heading approaches the viewport so first
 * load doesn't pay for layout on every heading at once.
 */
export function KineticHeading({
  as: Tag = 'h2',
  id,
  className = '',
  label,
  children,
  trigger = 'scroll',
  delay = 0,
  charsClass,
}: KineticHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const slashRef = useRef<HTMLSpanElement>(null)

  useGsap((ctx) => {
    const el = ref.current!
    const target = el.querySelector<HTMLElement>('[data-split]')!

    const play = () =>
      ctx.add(() => {
        // The heading text exists once in the HTML (crawlers and pre-JS screen
        // readers read it as-is). Splitting turns it into per-letter boxes that
        // some screen readers would spell out, so only now does the heading get
        // its name from `label` and the split layer get hidden. Undone on revert.
        el.setAttribute('aria-label', label)
        target.setAttribute('aria-hidden', 'true')

        // autoSplit re-splits once web fonts land (or on resize) and re-creates
        // the returned timeline at the same progress, so line breaks stay right.
        SplitText.create(target, {
          // words: keeps each word in one wrapper, so a narrow column can
          // never wrap a heading between letters
          type: 'lines,words,chars',
          mask: 'lines',
          aria: 'none',
          // SplitText rebuilds the letters, so any per-letter class has to be
          // applied here rather than on spans in the markup
          charsClass,
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { autoAlpha: 1 })
            return gsap
              .timeline({
                delay,
                scrollTrigger: trigger === 'scroll' ? { trigger: el, start: 'top 85%', once: true } : undefined,
              })
              .fromTo(
                slashRef.current,
                { yPercent: -50, skewX: -24, scaleX: 0, transformOrigin: 'left center' },
                { scaleX: 1, duration: 0.35, ease: 'power3.in' },
              )
              .fromTo(
                self.chars,
                { yPercent: 115, skewX: -14 },
                { yPercent: 0, skewX: 0, duration: 0.9, stagger: 0.022, ease: 'expo.out' },
                '-=0.12',
              )
              .to(slashRef.current, { scaleX: 0, transformOrigin: 'right center', duration: 0.45, ease: 'expo.inOut' }, '<0.05')
          },
        })

        return () => {
          el.removeAttribute('aria-label')
          target.removeAttribute('aria-hidden')
        }
      })

    if (trigger === 'load') play()
    else ScrollTrigger.create({ trigger: el, start: 'top bottom+=40%', once: true, onEnter: play })
  }, ref, [], { defer: trigger !== 'load' })

  return (
    <Tag id={id} ref={ref} className={`relative ${className}`}>
      {/* The only copy of the text: no separate screen-reader duplicate */}
      <span data-split className="block">
        {children}
      </span>
      <span
        ref={slashRef}
        aria-hidden="true"
        // Transform stays in one inline `transform` (not Tailwind's separate
        // scale/translate props) so GSAP owns it cleanly.
        style={{ transform: 'translateY(-50%) skewX(-24deg) scaleX(0)' }}
        className="pointer-events-none absolute inset-x-[-2%] top-1/2 block h-[0.14em] bg-ember shadow-glow"
      />
    </Tag>
  )
}
