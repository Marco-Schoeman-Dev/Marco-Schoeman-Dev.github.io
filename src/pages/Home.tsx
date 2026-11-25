import { useRef, type RefObject } from 'react'
import type { PageProps } from '.'
import { applyHref, homeClub, homeLives, homeWork } from '../data/site'
import { latestLives } from '../data/lives'
import { benefits } from '../data/club'
import { projects } from '../data/projects'
import { gsap } from '../lib/gsap'
import { useGsap } from '../hooks/useGsap'
import { Hero } from '../sections/Hero'
import { Chunk } from '../components/Chunk'
import { KineticHeading } from '../components/KineticHeading'
import { SectionLabel } from '../components/SectionLabel'
import { Accent } from '../components/Accent'
import { LiveCard } from '../components/LiveCard'
import { ImpactCard } from '../components/ImpactCard'
import { IconArrow } from '../components/Icons'

/** Cards rise in as they scroll into view */
function useRise(ref: RefObject<HTMLElement | null>, selector: string) {
  useGsap(() => {
    gsap.utils.toArray<HTMLElement>(selector).forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: (i % 3) * 0.08, scrollTrigger: { trigger: el, start: 'top 88%', once: true } },
      )
    })
  }, ref)
}

function LatestLives() {
  const ref = useRef<HTMLElement>(null)
  const items = latestLives(3)
  useRise(ref, '[data-live-card]')

  return (
    <section ref={ref} aria-labelledby="home-lives-title" className="relative overflow-hidden py-(--section-space)">
      <div className="sunset-glow" aria-hidden="true" />
      <div className="shell relative">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div>
            <SectionLabel index="01" name="Lives" className="mb-5" />
            <KineticHeading id="home-lives-title" label={homeLives.title} className="h2 text-ink">
              Recent <Accent>Lives</Accent>
            </KineticHeading>
          </div>
          <p className="max-w-[44ch] text-muted">{homeLives.intro}</p>
        </div>

        {items.length ? (
          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((live) => (
              <li key={live.slug} data-live-card>
                <LiveCard live={live} />
              </li>
            ))}
          </ol>
        ) : (
          <p className="lead">The first Live is on its way. It will land here.</p>
        )}

        <a href="/lives" className="btn btn-secondary mt-12">
          All Lives
          <IconArrow width={16} height={16} />
        </a>
      </div>
    </section>
  )
}

function ClubTeaser() {
  const ref = useRef<HTMLElement>(null)
  useRise(ref, '[data-benefit]')

  return (
    <section ref={ref} aria-labelledby="home-club-title" className="relative overflow-hidden bg-surface py-(--section-space)">
      <div className="focus-lines focus-lines-burst inset-[-20%] opacity-40 [--fx:75%] [--fy:30%]" aria-hidden="true" />
      <div className="shell relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionLabel index="02" name="The Founders Club" className="mb-5" />
          <KineticHeading id="home-club-title" label="A smaller room." className="h2 text-ink">
            A smaller
            <br />
            <Accent>room</Accent>.
          </KineticHeading>
          <p className="lead mt-8 max-w-[44ch]">{homeClub.intro}</p>
          <p className="label mt-6 text-ember">{homeClub.price}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={applyHref} className="btn btn-primary">
              Apply
              <IconArrow width={18} height={18} />
            </a>
            <a href="/founders-club" className="btn btn-secondary">
              How it works
            </a>
          </div>
        </div>

        <ul className="flex flex-col border-t border-line lg:col-span-6 lg:self-end">
          {benefits.map((b, i) => (
            <li key={b.id} data-benefit className="flex gap-5 border-b border-line py-5">
              <span className="label pt-1.5 text-ember" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display text-[clamp(1.25rem,2vw,1.625rem)] leading-tight uppercase">{b.title}</h3>
                <p className="mt-1 text-muted">{b.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function WorkTeaser() {
  const ref = useRef<HTMLElement>(null)
  useRise(ref, '[data-work-card]')

  return (
    <section ref={ref} aria-labelledby="home-work-title" className="relative overflow-hidden py-(--section-space)">
      <div className="shell relative">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div>
            <SectionLabel index="03" name="Work" className="mb-5" />
            <KineticHeading id="home-work-title" label="I also build things." className="h2 text-ink">
              I also build
              <br />
              <Accent>things</Accent>.
            </KineticHeading>
          </div>
          <p className="max-w-[40ch] text-muted">{homeWork.intro}</p>
        </div>

        <ol className="grid gap-12 md:grid-cols-3 md:gap-8">
          {projects.map((p, i) => (
            <li key={p.id} data-work-card>
              <ImpactCard project={p} index={i} total={projects.length} compact aspect="aspect-[40/21]" />
            </li>
          ))}
        </ol>

        <a href="/work" className="btn btn-secondary mt-12">
          See the work
          <IconArrow width={16} height={16} />
        </a>
      </div>
    </section>
  )
}

export default function Home({ route }: PageProps) {
  return (
    <>
      <Hero variant={route.variant} />
      <Chunk>
        <LatestLives />
      </Chunk>
      <Chunk>
        <ClubTeaser />
      </Chunk>
      <Chunk>
        <WorkTeaser />
      </Chunk>
    </>
  )
}
