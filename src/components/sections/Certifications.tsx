import { certifications } from '../../content'
import type { Certification } from '../../content'
import { Tag } from '../ui/Tag'
import { useScrollReveal } from '../../hooks/useScrollReveal'

function CertCard({ cert }: { cert: Certification }) {
  const Wrapper = cert.verifyUrl ? 'a' : 'div'
  const wrapperProps = cert.verifyUrl
    ? { href: cert.verifyUrl, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Wrapper
      {...wrapperProps}
      className="h-full flex flex-col p-5 border border-line rounded-xl bg-canvas hover:border-accent/70 hover:shadow-md transition-all duration-300"
    >
      {/* Badge */}
      <div className="mb-4">
        <Tag variant={cert.badgeColor}>{cert.badge}</Tag>
      </div>

      {/* Badge image or abbreviation fallback */}
      <div className="mb-3 h-14 flex items-center">
        {cert.image ? (
          <img
            src={cert.image}
            alt={cert.abbr}
            className="h-14 w-auto object-contain"
          />
        ) : (
          <div className="text-3xl font-bold text-ink tracking-tight">
            {cert.abbr}
          </div>
        )}
      </div>

      {/* Full name */}
      <p className="text-sm font-medium text-ink leading-snug mb-2">
        {cert.name}
      </p>

      {/* Issuer */}
      <p className="text-xs text-ink-3 mt-auto pt-3 border-t border-line">
        {cert.issuer}
      </p>

      {cert.note && (
        <p className="text-xs text-accent font-medium mt-1">{cert.note}</p>
      )}
    </Wrapper>
  )
}

export function Certifications() {
  const ref = useScrollReveal<HTMLElement>()
  const headingRef = useScrollReveal<HTMLHeadingElement>(0.3, false)

  return (
    <section id="certifications" className="py-24 px-6 border-t border-line bg-canvas/90" aria-labelledby="certs-heading" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-medium text-accent tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)' }}>Credentials</span>
          <h2 id="certs-heading" ref={headingRef} className="heading-mask text-[clamp(3.2rem,7vw,6.5rem)] font-black text-ink tracking-tight leading-[0.92] mt-3">
            <span className="heading-mask-inner">
              Certifications<span className="text-accent">.</span>
            </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, i) => (
            <div
              key={cert.id}
              className="reveal"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <CertCard cert={cert} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
