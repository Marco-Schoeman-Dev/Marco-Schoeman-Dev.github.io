import { useRef } from 'react'
import type { PageProps } from '.'
import { benefits, club, faqs, pricing, steps } from '../data/club'
import { gsap } from '../lib/gsap'
import { useGsap } from '../hooks/useGsap'
import { Chunk } from '../components/Chunk'
import { PageHeader } from '../components/PageHeader'
import { KineticHeading } from '../components/KineticHeading'
import { SectionLabel } from '../components/SectionLabel'
import { Accent } from '../components/Accent'
import { TallyApplication } from '../components/TallyApplication'
import { IconArrow, IconPlus } from '../components/Icons'

const pad = (n: number) => String(n).padStart(2, '0')

function Benefits() {
  const ref = useRef<HTMLElement>(null)
  useGsap(() => {
    gsap.utils.toArray<HTMLElement>('[data-benefit]').forEach((el, i) => {
      const from = { x: i % 2 ? 48 : -48, opacity: 0 }
      gsap.fromTo(el, from, { x: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
    })
  }, ref)

  return (
    <section ref={ref} aria-labelledby="benefits-title" className="relative overflow-hidden bg-surface py-(--section-space)">
      <div className="shell relative">
        <SectionLabel index="01" name="Membership" className="mb-5" />
        <KineticHeading id="benefits-title" label="What you get" className="h2 mb-12 text-ink md:mb-16">
          What you <Accent>get</Accent>
        </KineticHeading>

        <ul className="grid gap-4 md:grid-cols-2">
          {benefits.map((b, i) => (
            <li key={b.id} data-benefit className={`panel ${i % 2 ? 'panel-cut-bl' : 'panel-cut-tr'} [--panel-ink:var(--border)]`}>
              <div className="panel-inner flex h-full flex-col gap-6 bg-raised! p-6 md:p-8">
                <span className="label text-ember" aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <div>
                  <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[0.98] uppercase">{b.title}</h3>
                  <p className="mt-3 text-muted">{b.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="label mt-10 text-muted">
          For business owners, C-suite and content creators, anywhere in the world.
        </p>
      </div>
    </section>
  )
}

function Pricing() {
  const tiers = [pricing.founding, pricing.standard]
  return (
    <section aria-labelledby="pricing-title" className="relative overflow-hidden py-(--section-space)">
      <div className="sunset-glow" aria-hidden="true" />
      <div className="shell relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionLabel index="02" name="Price" className="mb-5" />
          <KineticHeading id="pricing-title" label="The price" className="h2 text-ink">
            The <Accent>price</Accent>
          </KineticHeading>
          <p className="lead mt-8 max-w-[40ch]">
            Founding members pay less for showing up first. {pricing.terms}
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:self-end">
          {tiers.map((t, i) => (
            <li key={t.note} className={`panel ${i ? 'panel-cut-bl [--panel-ink:var(--border)]' : 'panel-cut-tr [--panel-ink:var(--ember-glow)]'}`}>
              <div className="panel-inner flex h-full flex-col justify-between gap-10 bg-raised! p-6 md:p-8">
                <span className={`label ${i ? 'text-muted' : 'text-ember'}`}>{t.note}</span>
                <p>
                  <span className="label mr-2 align-top text-muted">{pricing.currency}</span>
                  <span className="font-display text-[clamp(3.5rem,7vw,5.5rem)] leading-none font-bold text-ink">{t.amount}</span>
                  <span className="label mt-3 block text-muted">{t.label}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section aria-labelledby="steps-title" className="relative bg-surface py-(--section-space)">
      <div className="shell relative">
        <SectionLabel index="03" name="Process" className="mb-5" />
        <KineticHeading id="steps-title" label="How it works" className="h2 mb-12 text-ink md:mb-16">
          How it works
        </KineticHeading>

        <ol className="grid gap-x-10 border-t border-line md:grid-cols-3 md:border-t-0">
          {steps.map((s, i) => (
            <li key={s.id} className="border-b border-line py-8 md:border-t md:border-b-0">
              <span aria-hidden="true" className="text-outline block font-display text-[clamp(4rem,8vw,6.5rem)] leading-[0.82] font-bold [-webkit-text-stroke-width:2px]">
                {pad(i + 1)}
              </span>
              <h3 className="mt-6 font-display text-[clamp(1.75rem,3vw,2.5rem)] uppercase">
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </h3>
              <p className="mt-3 max-w-[40ch] text-muted">{s.body}</p>
            </li>
          ))}
        </ol>

        <p className="lead mt-12 text-ink">
          <span className="label mr-3 align-middle text-ember">{'// '}Note</span>
          {club.reviewNote}
        </p>
      </div>
    </section>
  )
}

function Apply() {
  return (
    <section id="apply" aria-labelledby="apply-title" className="relative overflow-hidden py-(--section-space)">
      <div className="focus-lines focus-lines-burst inset-[-20%] opacity-40 [--fx:20%] [--fy:20%]" aria-hidden="true" />
      <div className="shell relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionLabel index="04" name="Apply" className="mb-5" />
          <KineticHeading id="apply-title" label="Apply" className="h2 text-ink">
            <Accent>Apply</Accent>
          </KineticHeading>
          {/* No intro copy here: review and payment are covered in How it works and the FAQ */}
        </div>
        <div className="lg:col-span-8">
          <TallyApplication />
        </div>
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative bg-surface py-(--section-space)">
      <div className="shell relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionLabel index="05" name="FAQ" className="mb-5" />
          <KineticHeading id="faq-title" label="Questions" className="h2 text-ink lg:text-[clamp(2.5rem,4.6vw,4.5rem)]">
            Questions
          </KineticHeading>
        </div>
        <div className="border-t border-line lg:col-span-8">
          {faqs.map((f) => (
            <details key={f.q} className="faq border-b border-line">
              <summary>
                <span className="font-display text-[clamp(1.375rem,2.6vw,2rem)] leading-tight uppercase">{f.q}</span>
                <span aria-hidden="true" className="faq-icon grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-muted">
                  <IconPlus width={18} height={18} />
                </span>
              </summary>
              <p className="lead max-w-[60ch] pb-8">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function FoundersClub(_: PageProps) {
  return (
    <>
      <PageHeader
        eyebrow={{ index: '00', name: 'The Founders Club' }}
        label="The Founders Club"
        title={
          <>
            The Founders
            {' '}<br />
            Club
          </>
        }
        lead={
          <>
            <p className="text-ink">{club.lead}</p>
            <p className="label mt-6 text-ember">
              {pricing.currency} {pricing.founding.amount}/month for the first 20 founding members · then {pricing.standard.amount}/month
            </p>
          </>
        }
      >
        <a href="#apply" className="btn btn-primary">
          Apply
          <IconArrow width={18} height={18} className="rotate-90" />
        </a>
        <a href="#faq" className="btn btn-secondary">
          Questions first
        </a>
      </PageHeader>
      <Chunk>
        <Benefits />
      </Chunk>
      <Chunk>
        <Pricing />
      </Chunk>
      <Chunk>
        <HowItWorks />
      </Chunk>
      <Chunk>
        <Apply />
      </Chunk>
      <Chunk>
        <Faq />
      </Chunk>
    </>
  )
}
