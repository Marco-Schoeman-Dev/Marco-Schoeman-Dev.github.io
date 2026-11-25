import { useRef } from 'react'
import { projects } from '../data/projects'
import { gsap } from '../lib/gsap'
import { useGsap } from '../hooks/useGsap'
import { KineticHeading } from '../components/KineticHeading'
import { SectionLabel } from '../components/SectionLabel'
import { ImpactCard } from '../components/ImpactCard'

/** Work page: the three client sites. */
export function ClientWork({ index = '02' }: { index?: string }) {
  const ref = useRef<HTMLElement>(null)

  useGsap(() => {
    gsap.utils.toArray<HTMLElement>('[data-work-card]').forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: (i % 3) * 0.08, scrollTrigger: { trigger: card, start: 'top 88%', once: true } },
      )
    })
  }, ref)

  return (
    <section id="client-work" ref={ref} aria-labelledby="client-work-title" className="relative overflow-hidden bg-surface py-(--section-space)">
      <div className="halftone top-0 right-0 h-1/2 w-1/3 [--ht-mask:linear-gradient(225deg,#000,transparent_70%)]" aria-hidden="true" />
      <div className="shell relative">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div>
            <SectionLabel index={index} name="Client work" className="mb-5" />
            <KineticHeading id="client-work-title" label="Websites" className="h2 text-ink">
              Websites
            </KineticHeading>
          </div>
          <p className="max-w-[38ch] text-muted">Sites I have designed, built and launched for real businesses and creators.</p>
        </div>

        <ol className="grid gap-16 md:grid-cols-2 md:gap-x-10 xl:grid-cols-3">
          {projects.map((p, i) => (
            <li key={p.id} data-work-card>
              <ImpactCard project={p} index={i} total={projects.length} sizes="(min-width: 1280px) 31vw, (min-width: 768px) 46vw, 100vw" aspect="aspect-[40/21]" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
