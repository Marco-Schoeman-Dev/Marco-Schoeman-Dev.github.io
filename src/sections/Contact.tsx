import { useRef } from 'react'
import { contact, instagramDm, site, socialById } from '../data/site'
import { gsap } from '../lib/gsap'
import { useGsap } from '../hooks/useGsap'
import { KineticHeading } from '../components/KineticHeading'
import { SectionLabel } from '../components/SectionLabel'
import { IconArrowUpRight, IconInstagram, IconTiktok } from '../components/Icons'

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const instagram = socialById('instagram')
  const tiktok = socialById('tiktok')

  // fromTo with explicit end values: never depends on reading the element's
  // current transform, so the panels always land at x: 0.
  useGsap(() => {
    gsap.fromTo(
      '[data-cta]',
      { x: (i) => (i % 2 ? 64 : -64), autoAlpha: 0 },
      {
        x: 0,
        autoAlpha: 1,
        duration: 1.1,
        stagger: 0.1,
        scrollTrigger: { trigger: '[data-ctas]', start: 'top 85%', once: true },
      },
    )
    gsap.fromTo(
      '[data-contact-fade]',
      { y: 20, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        stagger: 0.08,
        scrollTrigger: { trigger: '[data-contact-fade]', start: 'top 90%', once: true },
      },
    )
  }, ref)

  const ctas = [
    { ...instagram, href: instagramDm, Icon: IconInstagram, verb: 'DM on Instagram', primary: true },
    { ...tiktok, Icon: IconTiktok, verb: 'Message on TikTok', primary: false },
  ]

  return (
    <section id="contact" ref={ref} aria-labelledby="contact-title" className="relative overflow-hidden py-(--section-space)">
      <div className="focus-lines focus-lines-burst inset-[-20%] opacity-50 [--fx:30%] [--fy:30%]" aria-hidden="true" />
      <div className="sunset-glow" aria-hidden="true" />

      <div className="shell relative">
        <SectionLabel index="07" name="Contact" kana="コンタクト" className="mb-6" />
        <KineticHeading id="contact-title" label={contact.title} className="display text-ink">
          Build it.
          <br />
          <span className="text-ember">Break it.</span>
        </KineticHeading>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p data-contact-fade className="lead">
              {contact.lead}
            </p>
            <p data-contact-fade className="label mt-6 flex items-center gap-3 text-ink">
              <span className="live-dot h-2 w-2 shrink-0 rounded-full bg-signal" aria-hidden="true" />
              {contact.replyNote}
            </p>
          </div>

          <ul data-ctas className="grid gap-4 sm:grid-cols-2 md:col-span-7">
            {ctas.map(({ id, href, Icon, verb, primary }) => (
              // <li> is animated by GSAP; the impact hover (its own CSS transform
              // transition + focus ring) lives on an inner wrapper so they never fight.
              // The ring sits outside the clip-pathed link, which would clip its own outline.
              <li key={id} data-cta>
                <div className="impact group h-full">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`panel block h-full focus-visible:outline-none ${primary ? 'panel-cut-tr [--panel-ink:var(--ember)]' : 'panel-cut-bl'}`}
                  >
                    <span
                      className={`panel-inner flex min-h-56 flex-col justify-between gap-10 p-6 md:min-h-72 md:p-8 ${
                        primary ? 'bg-ember! text-on-ember' : 'bg-raised text-ink'
                      }`}
                    >
                      <span className="focus-lines [--fl-color:rgb(255_244_238/0.35)]" aria-hidden="true" />
                      <span className="relative flex items-start justify-between">
                        <Icon width={32} height={32} />
                        <IconArrowUpRight
                          width={28}
                          height={28}
                          className="transition-transform duration-300 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </span>
                      <span className="relative">
                        <span className="block font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-none font-bold uppercase">{verb}</span>
                        <span className={`label mt-3 block normal-case ${primary ? 'text-on-ember' : 'text-muted'}`}>{site.handle}</span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </span>
                    </span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p data-contact-fade className="mt-12 text-muted">
          Prefer email?{' '}
          <a href={`mailto:${site.email}`} className="link text-ink">
            {site.email}
          </a>
        </p>
      </div>
    </section>
  )
}
