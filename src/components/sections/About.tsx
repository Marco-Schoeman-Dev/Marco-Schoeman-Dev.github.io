import { about } from '../../content'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export function About() {
  const ref = useScrollReveal<HTMLElement>()
  const headingRef = useScrollReveal<HTMLHeadingElement>(0.3, false)

  return (
    <section id="about" className="border-t border-line overflow-hidden bg-canvas/90" aria-labelledby="about-heading" ref={ref}>

      {/* Header row */}
      <div className="flex items-baseline justify-between px-6 py-5 border-b border-line">
        <span
          className="text-xs font-medium text-accent tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          About
        </span>
      </div>

      {/* Content: text left, photo bleed right */}
      <div className="grid md:grid-cols-[3fr_2fr] min-h-145">

        {/* Text */}
        <div className="px-6 py-16 md:py-20 flex flex-col justify-center">
          <h2
            id="about-heading"
            ref={headingRef}
            className="heading-mask text-[clamp(3.2rem,7.5vw,7.5rem)] font-black uppercase text-ink leading-[0.88] tracking-tight mb-10"
          >
            <span className="heading-mask-inner">
              Developer.<br />
              Operator.<br />
              <span className="text-accent">Both.</span>
            </span>
          </h2>

          <div className="flex flex-col gap-5 max-w-xl">
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className="reveal text-base sm:text-lg text-ink-2 leading-relaxed"
                style={{ transitionDelay: `${0.1 + i * 0.07}s` }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Photo — bleeds to right edge, hidden on mobile */}
        <div className="relative hidden md:block">
          <img
            src="/images/Profile.jpeg"
            alt="Marco Schoeman"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center 42%' }}
          />
          {/* Fade into text panel */}
          <div className="absolute inset-y-0 left-0 w-28 bg-linear-to-r from-canvas to-transparent" />
        </div>

      </div>
    </section>
  )
}
