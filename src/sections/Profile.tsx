import { useRef } from 'react'
import { workIntro } from '../data/site'
import { stats } from '../data/stats'
import { credentials } from '../data/credentials'
import { gsap, restOf } from '../lib/gsap'
import { useGsap } from '../hooks/useGsap'
import { Picture } from '../components/Picture'
import { KineticHeading } from '../components/KineticHeading'
import { SectionLabel } from '../components/SectionLabel'
import { CountUp } from '../components/CountUp'
import { Accent } from '../components/Accent'
import { IconArrowUpRight } from '../components/Icons'

/** Work page: condensed bio, stats and credentials. */
export function Profile({ index = '01' }: { index?: string }) {
  const ref = useRef<HTMLElement>(null)

  useGsap(() => {
    const rise = { y: 24, opacity: 0 }
    gsap.fromTo('[data-profile-copy] > *', rise, {
      ...restOf(rise),
      stagger: 0.1,
      scrollTrigger: { trigger: '[data-profile-copy]', start: 'top 80%', once: true },
    })
    // Stat panels slide in from alternating sides like manga panels
    gsap.utils.toArray<HTMLElement>('[data-stat]').forEach((el, i) => {
      const from = { x: i % 2 ? 48 : -48, opacity: 0 }
      gsap.fromTo(el, from, {
        ...restOf(from),
        duration: 1,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })
    const credFrom = { y: 20, opacity: 0 }
    gsap.fromTo('[data-cred]', credFrom, {
      ...restOf(credFrom),
      stagger: 0.05,
      duration: 0.7,
      scrollTrigger: { trigger: '[data-creds]', start: 'top 85%', once: true },
    })
  }, ref)

  return (
    <section id="profile" ref={ref} aria-labelledby="profile-title" className="relative overflow-hidden py-(--section-space)">
      <div className="sunset-glow" aria-hidden="true" />

      <div className="shell relative">
        <SectionLabel index={index} name="Profile" className="mb-10 md:mb-16" />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <KineticHeading id="profile-title" label="Developer. Operator. Both." className="h2 text-ink lg:col-span-5 lg:text-[clamp(3rem,5.2vw,5.5rem)]">
            Developer.
            <br />
            Operator.
            <br />
            <Accent>Both.</Accent>
          </KineticHeading>
          <div data-profile-copy className="flex max-w-[65ch] flex-col gap-5 lg:col-span-7">
            {workIntro.map((p, i) => (
              <p key={p.slice(0, 24)} className={i === 0 ? 'lead text-ink' : 'text-muted'}>
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Stats */}
        <ul className="mt-(--section-space) grid gap-4 sm:grid-cols-2" aria-label="In numbers">
          {stats.map((s, i) => (
            <li key={s.label} data-stat className={`panel ${i % 2 ? 'panel-cut-bl' : 'panel-cut-tr'} [--panel-ink:var(--border)]`}>
              <div className="panel-inner flex h-full flex-col justify-between gap-10 p-6 md:p-8">
                <span className="label text-muted" aria-hidden="true">
                  S-{String(i + 1).padStart(2, '0')}
                </span>
                <p>
                  <span className="block font-display text-[clamp(3.5rem,8vw,6.5rem)] leading-none font-bold text-ink">
                    <CountUp value={s.value} />
                  </span>
                  <span className="label mt-3 block text-ember">{s.label}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Credentials */}
        <div data-creds className="mt-(--section-space)">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-5">
            <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] uppercase">Credentials</h3>
            <p className="label text-muted">Verify links open the issuer's record</p>
          </div>

          <ul className="grid gap-x-10 md:grid-cols-2">
            {credentials.map((c) => (
              <li key={c.id} data-cred className="flex items-center gap-4 border-b border-line py-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-md bg-raised">
                  {c.image ? (
                    <Picture image={c.image} alt="" sizes="40px" className="block h-10 w-10" imgClassName="h-10 w-10 object-contain" />
                  ) : (
                    <span className="font-display text-sm font-bold text-ember" aria-hidden="true">
                      {c.abbr}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg leading-snug font-semibold text-ink">{c.name}</p>
                  <p className="text-sm text-muted">
                    {c.issuer}
                    {c.note && <span className="text-ember"> · {c.note}</span>}
                  </p>
                </div>
                {c.verifyUrl ? (
                  <a
                    href={c.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label inline-flex min-h-11 shrink-0 items-center gap-1 text-muted transition-colors hover:text-ember"
                  >
                    Verify
                    <span className="sr-only"> {c.name} (opens in a new tab)</span>
                    <IconArrowUpRight width={14} height={14} />
                  </a>
                ) : (
                  <span className="label shrink-0 text-muted/70">{c.badge}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
