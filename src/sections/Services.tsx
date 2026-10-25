import { useEffect, useId, useRef, useState } from 'react'
import { services } from '../data/services'
import { instagramDm } from '../data/site'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useGsap } from '../hooks/useGsap'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { KineticHeading } from '../components/KineticHeading'
import { SectionLabel } from '../components/SectionLabel'
import { IconArrowUpRight, IconPlus } from '../components/Icons'

const pad = (n: number) => String(n).padStart(2, '0')

export function Services() {
  const ref = useRef<HTMLElement>(null)
  // A set, not a single id: hovering only ever opens rows, so rows above the
  // pointer never collapse and the list doesn't jump under the cursor.
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(() => new Set([services[0].id]))
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)')
  const uid = useId()

  // Opening/closing rows changes the page height; once the 500ms row
  // transition settles, recompute every ScrollTrigger below (Contact etc.)
  // so their start positions match the new layout.
  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 550)
    return () => window.clearTimeout(t)
  }, [openIds])

  const openRow = (id: string) => setOpenIds((prev) => (prev.has(id) ? prev : new Set(prev).add(id)))
  const toggleRow = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  useGsap(() => {
    gsap.fromTo(
      '[data-service]',
      { y: 32, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.07, duration: 0.8, scrollTrigger: { trigger: '[data-services]', start: 'top 80%', once: true } },
    )
  }, ref)

  return (
    <section id="services" ref={ref} aria-labelledby="services-title" className="relative overflow-hidden bg-surface py-(--section-space)">
      <div className="sunset-glow opacity-70" aria-hidden="true" />
      <div className="shell relative">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20">
          <div>
            <SectionLabel index="06" name="Services" kana="サービス" className="mb-5" />
            <KineticHeading id="services-title" label="What I do" className="h2 text-ink">
              What I do
            </KineticHeading>
          </div>
          <p className="max-w-[36ch] text-muted">Pick one, or let me build it, automate it and then try to break it.</p>
        </div>

        <ul data-services className="border-t border-line">
          {services.map((s, i) => {
            const open = openIds.has(s.id)
            const panelId = `${uid}-${s.id}-panel`
            const buttonId = `${uid}-${s.id}-button`
            return (
              <li key={s.id} data-service className="border-b border-line" onMouseEnter={canHover ? () => openRow(s.id) : undefined}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => toggleRow(s.id)}
                    className="group flex w-full items-center gap-[clamp(1rem,3vw,2.5rem)] py-6 text-left md:py-8"
                  >
                    <span className="label w-8 shrink-0 text-ember">{pad(i + 1)}</span>
                    <span
                      className={`font-display text-[clamp(1.75rem,5vw,4.25rem)] leading-[0.95] font-bold uppercase transition-[color,transform] duration-300 ease-expo ${
                        open ? 'translate-x-2 text-ember' : 'text-ink group-hover:text-ember'
                      }`}
                    >
                      {s.title}
                    </span>
                    <span className="kana ml-auto hidden text-sm md:block" aria-hidden="true" lang="ja">
                      {s.kana}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-[transform,border-color,color] duration-300 ease-expo max-md:ml-auto ${
                        open ? 'rotate-45 border-ember text-ember' : 'border-line text-muted group-hover:border-ember'
                      }`}
                    >
                      <IconPlus width={18} height={18} />
                    </span>
                  </button>
                </h3>

                {/* grid-template-rows 0fr → 1fr: height animation without measuring */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  inert={!open}
                  className={`grid transition-[grid-template-rows] duration-500 ease-expo ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-6 pb-8 md:grid-cols-12 md:pl-[calc(2rem+clamp(1rem,3vw,2.5rem))]">
                      <p className="lead md:col-span-6">{s.summary}</p>
                      <div className="flex flex-col gap-5 md:col-span-5 md:col-start-8">
                        <ul className="flex flex-wrap gap-2" aria-label={`${s.title} tools`}>
                          {s.stack.map((tool) => (
                            <li key={tool} className="label rounded-sm border border-line bg-bg/60 px-2 py-1 text-muted">
                              {tool}
                            </li>
                          ))}
                        </ul>
                        <a
                          href={instagramDm}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="label inline-flex min-h-11 items-center gap-2 self-start text-ember hover:text-ink"
                        >
                          Ask about {s.title.toLowerCase()}
                          <span className="sr-only"> on Instagram (opens in a new tab)</span>
                          <IconArrowUpRight width={14} height={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
