import { useRef } from 'react'
import { method, methodArt } from '../data/method'
import { gsap } from '../lib/gsap'
import { useGsap } from '../hooks/useGsap'
import { KineticHeading } from '../components/KineticHeading'
import { SectionLabel } from '../components/SectionLabel'
import { Picture } from '../components/Picture'

const pad = (n: number) => String(n).padStart(2, '0')

export function Method() {
  const ref = useRef<HTMLElement>(null)

  useGsap(() => {
    // Neon spine fills as you read down the steps
    gsap.fromTo(
      '[data-spine]',
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: '[data-steps]', start: 'top 70%', end: 'bottom 70%', scrub: true },
      },
    )

    // Operative panel: slides in, then the art drifts inside its frame
    gsap.fromTo(
      '[data-operative]',
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.1, scrollTrigger: { trigger: '[data-operative]', start: 'top 80%', once: true } },
    )
    gsap.fromTo(
      '[data-operative-art]',
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: '[data-steps]', start: 'top bottom', end: 'bottom top', scrub: true },
      },
    )

    gsap.utils.toArray<HTMLElement>('[data-step]').forEach((step) => {
      gsap
        .timeline({ scrollTrigger: { trigger: step, start: 'top 78%', once: true } })
        .fromTo(step.querySelector('[data-numeral]'), { yPercent: 105 }, { yPercent: 0, duration: 1.1, ease: 'expo.out' })
        .fromTo(
          step.querySelectorAll('[data-step-copy] > *'),
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.8 },
          '<0.2',
        )
    })
  }, ref)

  return (
    <section id="method" ref={ref} aria-labelledby="method-title" className="relative py-(--section-space)">
      <div className="shell relative">
        <SectionLabel index="03" name="Method" kana="手法" className="mb-5" />
        <KineticHeading id="method-title" label="How I work" className="h2 mb-12 text-ink md:mb-20">
          How I work
        </KineticHeading>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Operative: sticky manga panel on desktop, inline on mobile */}
          <div className="lg:col-span-4">
            <figure data-operative className="relative lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <div className="panel panel-cut-both aspect-4/5 lg:aspect-auto lg:h-[calc(100svh-var(--header-h)-6rem)] lg:max-h-[52rem]">
                <div className="panel-inner">
                  <div data-operative-art className="absolute -inset-y-[8%] inset-x-0">
                    <Picture
                      image={methodArt.image}
                      alt={methodArt.alt}
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="block h-full w-full"
                      imgClassName="h-full w-full object-cover object-[50%_12%]"
                    />
                  </div>
                  <div className="focus-lines opacity-50 [--fx:50%] [--fy:18%]" aria-hidden="true" />
                  <div className="halftone right-0 bottom-0 h-1/2 w-2/3 [--ht-mask:linear-gradient(315deg,#000,transparent_65%)]" aria-hidden="true" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(11_6_5/0.75),transparent_40%)]" aria-hidden="true" />
                  {/* Vertical katakana down the panel edge, like a manga sound/caption strip */}
                  <span
                    aria-hidden="true"
                    lang="ja"
                    className="kana absolute top-6 right-4 text-sm tracking-[0.4em] [writing-mode:vertical-rl] text-ember!"
                  >
                    {methodArt.kana}
                  </span>
                  <figcaption className="label absolute bottom-5 left-5 text-ink">
                    <span className="text-ember">{'// '}</span>Operator mode
                  </figcaption>
                </div>
              </div>
            </figure>
          </div>

          <ol data-steps className="relative lg:col-span-8">
            {/* Spine: decorative progress line */}
            <span className="absolute top-0 bottom-0 left-0 hidden w-px bg-line md:block" aria-hidden="true">
              <span data-spine className="neon-line block w-full origin-top" style={{ height: '100%' }} />
            </span>

            {method.map((step, i) => (
              <li
                key={step.id}
                data-step
                // Fixed numeral column so every step title starts on the same x
                className={`grid gap-x-8 gap-y-4 border-b border-line py-10 sm:grid-cols-[clamp(7.5rem,15vw,13.5rem)_1fr] sm:items-end md:py-14 md:pl-10 ${
                  i === 0 ? 'border-t' : ''
                }`}
              >
                <div className="overflow-hidden" aria-hidden="true">
                  <span
                    data-numeral
                    className="text-outline block font-display text-[clamp(5.5rem,11vw,10rem)] leading-[0.82] font-bold [-webkit-text-stroke-width:2px]"
                  >
                    {pad(i + 1)}
                  </span>
                </div>
                <div data-step-copy>
                  <h3 className="flex flex-wrap items-baseline gap-x-4 font-display text-[clamp(2rem,4vw,3.25rem)] uppercase">
                    <span>
                      <span className="sr-only">Step {i + 1}: </span>
                      {step.title}
                    </span>
                    <span className="kana text-base" aria-hidden="true" lang="ja">
                      {step.kana}
                    </span>
                  </h3>
                  <p className="mt-4 max-w-[48ch] text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
