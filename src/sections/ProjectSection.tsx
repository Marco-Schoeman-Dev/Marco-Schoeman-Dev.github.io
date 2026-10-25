import { useRef } from 'react'
import { projectGroups, projectsIn, type ProjectCategory } from '../data/projects'
import { instagramDm, site } from '../data/site'
import { gsap } from '../lib/gsap'
import { useGsap } from '../hooks/useGsap'
import { KineticHeading } from '../components/KineticHeading'
import { SectionLabel } from '../components/SectionLabel'
import { ImpactCard } from '../components/ImpactCard'
import { IconArrowUpRight } from '../components/Icons'

interface ProjectSectionProps {
  category: Exclude<ProjectCategory, 'web'>
  /** Alternate section backgrounds down the page */
  surface?: boolean
}

/**
 * A portfolio discipline (ethical hacking, AI automations): heading, what it
 * covers, its project cards and a channel-appropriate CTA. One project gets a
 * feature layout (card + aside); several get a grid under the header.
 */
export function ProjectSection({ category, surface = false }: ProjectSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const group = projectGroups[category]
  const items = projectsIn(category)
  const feature = items.length === 1
  const titleId = `${group.id}-title`

  useGsap(() => {
    gsap.fromTo(
      '[data-ps-aside] > *',
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, scrollTrigger: { trigger: '[data-ps-aside]', start: 'top 85%', once: true } },
    )
    gsap.utils.toArray<HTMLElement>('[data-ps-card]').forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: i * 0.08, scrollTrigger: { trigger: card, start: 'top 88%', once: true } },
      )
    })
  }, ref)

  const cta = group.cta && (
    <a
      href={
        group.cta.channel === 'instagram'
          ? instagramDm
          : `mailto:${site.email}?subject=${encodeURIComponent(group.cta.subject ?? group.title)}`
      }
      target={group.cta.channel === 'instagram' ? '_blank' : undefined}
      rel={group.cta.channel === 'instagram' ? 'noopener noreferrer' : undefined}
      className="btn btn-primary self-start"
    >
      {group.cta.label}
      {group.cta.channel === 'instagram' && <span className="sr-only"> on Instagram (opens in a new tab)</span>}
      <IconArrowUpRight width={16} height={16} />
    </a>
  )

  const intro = <p className="lead">{group.intro}</p>
  const highlights = group.highlights && (
    <ul className="flex flex-col border-t border-line">
      {group.highlights.map((h, i) => (
        <li key={h} className="flex gap-4 border-b border-line py-3">
          <span className="label pt-1 text-ember" aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="text-ink">{h}</span>
        </li>
      ))}
    </ul>
  )

  return (
    <section
      id={group.id}
      ref={ref}
      aria-labelledby={titleId}
      className={`relative overflow-hidden py-(--section-space) ${surface ? 'bg-surface' : ''}`}
    >
      <div className="sunset-glow opacity-60" aria-hidden="true" />
      <div className="shell relative">
        <SectionLabel index={group.index} name={group.name} kana={group.kana} className="mb-5" />
        <KineticHeading
          id={titleId}
          label={group.subtitle ? `${group.title} ${group.subtitle}` : group.title}
          className="h2 mb-12 text-ink md:mb-16"
        >
          {group.title}
          {group.subtitle && (
            <span className="mt-3 block text-[0.42em] leading-tight text-ember">{group.subtitle}</span>
          )}
        </KineticHeading>

        {feature ? (
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div data-ps-card className="lg:col-span-7">
              <ImpactCard project={items[0]} index={0} total={1} />
            </div>
            <div data-ps-aside className="flex flex-col gap-6 lg:col-span-5">
              {intro}
              {highlights}
              {cta}
            </div>
          </div>
        ) : (
          <>
            {/* Two columns on desktop: intro + CTA, then what the discipline covers */}
            <div data-ps-aside className="mb-14 grid gap-8 md:mb-20 lg:grid-cols-12 lg:gap-16">
              <div className="flex flex-col gap-6 lg:col-span-5">
                {intro}
                {cta}
              </div>
              <div className="lg:col-span-7">{highlights}</div>
            </div>
            <ol className={`grid gap-16 md:grid-cols-2 md:gap-x-10`}>
              {items.map((p, i) => (
                <li key={p.id} data-ps-card>
                  <ImpactCard project={p} index={i} total={items.length} />
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    </section>
  )
}
