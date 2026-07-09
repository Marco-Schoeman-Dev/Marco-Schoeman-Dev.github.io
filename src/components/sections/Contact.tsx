import { site } from '../../content'
import { CopyEmail } from '../ui/CopyEmail'
import { IconGithub, IconLinkedin } from '../ui/Icons'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export function Contact() {
  const ref = useScrollReveal<HTMLElement>()
  const headingRef = useScrollReveal<HTMLHeadingElement>(0.3, false)

  return (
    <section id="contact" className="py-24 px-6 border-t border-line bg-canvas/90" aria-labelledby="contact-heading" ref={ref}>
      <div className="max-w-5xl mx-auto">

        {/* Section label */}
        <span
          className="reveal text-xs font-medium text-accent tracking-widest uppercase block mb-6"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Contact
        </span>

        {/* Big editorial headline */}
        <div className="mb-16 reveal" style={{ transitionDelay: '0.05s' }}>
          <h2
            id="contact-heading"
            ref={headingRef}
            className="heading-mask text-[clamp(3.2rem,9vw,6.5rem)] font-bold text-ink leading-[0.9] tracking-tight"
          >
            <span className="heading-mask-inner">
              Let's work<br />
              <span className="text-accent">together.</span>
            </span>
          </h2>
        </div>

        {/* Two-column body */}
        <div className="grid md:grid-cols-[1fr_auto] gap-12 md:gap-24 items-start">

          {/* Left — copy */}
          <div className="reveal" style={{ transitionDelay: '0.10s' }}>
            <p className="text-base sm:text-lg text-ink-2 leading-relaxed max-w-md mb-10">
              Open to freelance projects, consulting, and full-time roles. Need a fullstack developer, a penetration test, or both: reach out.
            </p>

            {/* Social links */}
            <div>
              <p
                className="text-xs font-medium text-ink-3 tracking-widest uppercase mb-4"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Find me on
              </p>
              <div className="flex gap-3">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 border border-line rounded-lg text-sm font-medium text-ink-2 hover:border-accent hover:text-accent transition-all duration-200 cursor-pointer"
                  aria-label="GitHub profile"
                >
                  <IconGithub className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 border border-line rounded-lg text-sm font-medium text-ink-2 hover:border-accent hover:text-accent transition-all duration-200 cursor-pointer"
                  aria-label="LinkedIn profile"
                >
                  <IconLinkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right — email block */}
          <div className="reveal" style={{ transitionDelay: '0.15s' }}>
            <p
              className="text-xs font-medium text-ink-3 tracking-widest uppercase mb-4"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Email
            </p>
            <CopyEmail email={site.email} />
          </div>

        </div>
      </div>
    </section>
  )
}
