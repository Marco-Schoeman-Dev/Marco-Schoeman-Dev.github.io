import { useRef } from 'react'
import { projects } from '../data/projects'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useGsap } from '../hooks/useGsap'
import { KineticHeading } from '../components/KineticHeading'
import { SectionLabel } from '../components/SectionLabel'
import { ImpactCard } from '../components/ImpactCard'

const pad = (n: number) => String(n).padStart(2, '0')

export function Work() {
  const ref = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLOListElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)

  useGsap(() => {
    const section = ref.current!
    const track = trackRef.current!
    const cards = gsap.utils.toArray<HTMLElement>('[data-work-card]')
    const mm = gsap.matchMedia()

    // Desktop: pin the section and scrub the reel sideways
    mm.add('(min-width: 1024px)', () => {
      const distance = () => track.scrollWidth - track.parentElement!.clientWidth

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.round(self.progress * (cards.length - 1))
            if (counterRef.current) counterRef.current.textContent = pad(i + 1)
            gsap.set(barRef.current, { scaleX: self.progress })
          },
        },
      })

      // Keyboard: tabbing to an off-screen card scrolls the page to it
      const onFocusIn = (e: FocusEvent) => {
        const st = tween.scrollTrigger
        const i = cards.findIndex((c) => c.contains(e.target as Node))
        if (!st || i < 0) return
        track.parentElement!.scrollLeft = 0
        const y = st.start + (st.end - st.start) * (i / Math.max(1, cards.length - 1))
        window.scrollTo({ top: y })
      }
      track.addEventListener('focusin', onFocusIn)

      // Panels tilt in as they enter the viewport horizontally
      cards.forEach((card) => {
        gsap.fromTo(card, { rotate: 2.5, yPercent: 6, opacity: 0.35 }, {
          rotate: 0,
          yPercent: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            containerAnimation: tween,
            start: 'left 95%',
            end: 'left 55%',
            scrub: true,
          },
        })
      })

      return () => track.removeEventListener('focusin', onFocusIn)
    })

    // Mobile/tablet: stacked panels slide in from alternating sides
    mm.add('(max-width: 1023px)', () => {
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { x: i % 2 ? 56 : -56, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: card, start: 'top 88%', once: true } },
        )
      })
    })

    // Recalculate pin distances once images have dimensions settled
    ScrollTrigger.refresh()
  }, ref)

  return (
    <section
      id="work"
      ref={ref}
      aria-labelledby="work-title"
      // Pinned reel layout only when motion is allowed; reduced motion gets a static grid
      className="relative overflow-hidden bg-surface py-(--section-space) lg:motion-safe:flex lg:motion-safe:h-svh lg:motion-safe:flex-col lg:motion-safe:justify-center lg:motion-safe:py-0 lg:motion-safe:pt-[calc(var(--header-h)+1.5rem)]"
    >
      <div className="halftone top-0 right-0 h-1/2 w-1/3 [--ht-mask:linear-gradient(225deg,#000,transparent_70%)]" aria-hidden="true" />

      <div className="shell relative mb-10 flex flex-wrap items-end justify-between gap-6 lg:mb-8">
        <div>
          <SectionLabel index="02" name="Work" kana="プロジェクト" className="mb-5" />
          <KineticHeading id="work-title" label="Selected work" className="h2 text-ink lg:motion-safe:text-[clamp(2.5rem,5vw,4.5rem)]">
            Selected work
          </KineticHeading>
        </div>
        <div className="hidden items-center gap-4 lg:motion-safe:flex" aria-hidden="true">
          <span className="font-display text-4xl font-bold tabular-nums">
            <span ref={counterRef} className="text-ember">
              01
            </span>
            <span className="text-muted"> / {pad(projects.length)}</span>
          </span>
          <span className="relative h-px w-32 bg-line">
            <span ref={barRef} className="absolute inset-0 origin-left scale-x-0 bg-ember" />
          </span>
        </div>
      </div>

      <div className="relative lg:motion-safe:overflow-hidden">
        <ol
          ref={trackRef}
          className="shell flex flex-col gap-16 md:gap-20 lg:motion-reduce:grid lg:motion-reduce:grid-cols-2 lg:motion-reduce:gap-x-10 lg:motion-safe:w-max lg:motion-safe:max-w-none lg:motion-safe:flex-row lg:motion-safe:gap-[clamp(2rem,4vw,4.5rem)] lg:motion-safe:pr-[30vw]"
        >
          {projects.map((p, i) => (
            // Pinned: width is capped by viewport height so card + heading always fit one screen
            <li key={p.id} data-work-card className="lg:motion-safe:w-[min(40vw,calc((100svh-37.5rem)*1.6))] lg:motion-safe:min-w-[22rem]">
              <ImpactCard project={p} index={i} total={projects.length} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
