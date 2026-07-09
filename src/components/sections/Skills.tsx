import { skills } from '../../content'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const tracks = [
  {
    number: '01',
    label: 'Development',
    hoverClass: 'group-hover:text-accent',
    dotClass: 'group-hover:bg-accent',
    items: skills.development,
  },
  {
    number: '02',
    label: 'Offensive Security',
    hoverClass: 'group-hover:text-accent',
    dotClass: 'group-hover:bg-accent',
    items: skills.security,
  },
]

export function Skills() {
  const ref = useScrollReveal<HTMLElement>()
  // Hooks can't be called inside .map() — one ref per track, called up front.
  const headingRefs = [
    useScrollReveal<HTMLHeadingElement>(0.3, false),
    useScrollReveal<HTMLHeadingElement>(0.3, false),
  ]

  return (
    <section id="skills" className="border-t border-line bg-surface/90" aria-labelledby="skills-heading" ref={ref}>

      {/* Header row */}
      <div className="flex items-baseline justify-between px-6 py-5 border-b border-line">
        <span
          className="text-xs font-medium text-accent tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span id="skills-heading">Skills</span>
        </span>
        <span
          className="hidden sm:block text-xs text-ink-3"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Two tracks, one perspective.
        </span>
      </div>

      {tracks.map((track, i) => (
        <div
          key={track.number}
          className="reveal group relative border-b border-line"
          style={{ transitionDelay: `${i * 0.08}s` }}
        >
          <div className="flex flex-col gap-4 sm:grid sm:grid-cols-[80px_1fr_auto] md:grid-cols-[180px_1fr_auto] sm:items-start sm:gap-4 md:gap-8 px-6 py-10 sm:py-12 md:py-16 transition-colors duration-300 group-hover:bg-canvas">

            {/* Number + count — mobile only, single row */}
            <div
              className="flex items-center justify-between sm:hidden"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span className="text-xs text-accent uppercase tracking-widest" aria-hidden="true">
                {track.number} /
              </span>
              <span className="text-xs text-ink-3/50 uppercase tracking-widest">
                {track.items.length} skills
              </span>
            </div>

            {/* Number — left, desktop only */}
            <div
              className="hidden sm:block pt-2"
              style={{ fontFamily: 'var(--font-mono)' }}
              aria-hidden="true"
            >
              <span className={`text-xs text-accent uppercase tracking-widest transition-colors duration-300`}>
                {track.number} /
              </span>
            </div>

            {/* Track name + skills — centre */}
            <div>
              <h3
                ref={headingRefs[i]}
                className={`heading-mask text-[clamp(2.75rem,9vw,6rem)] font-black uppercase text-ink leading-[0.88] tracking-tight mb-6 transition-colors duration-300 ${track.hoverClass}`}
              >
                <span
                  className="heading-mask-inner"
                  style={{ transitionDelay: `${i * 0.08 + 0.05}s` }}
                >
                  {track.label}
                </span>
              </h3>
              <p
                className="text-sm text-ink-3 leading-loose max-w-2xl"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {track.items.join(' · ')}
              </p>
            </div>

            {/* Count — right, desktop only */}
            <div
              className="hidden sm:block pt-2 text-right"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span className="text-xs text-ink-3/50 uppercase tracking-widest">
                {track.items.length} skills
              </span>
            </div>

          </div>

          {/* Dot on divider */}
          <div
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-line transition-colors duration-300 z-10 ${track.dotClass}`}
            aria-hidden="true"
          />
        </div>
      ))}

    </section>
  )
}
