interface MarqueeProps {
  items: string[]
  className?: string
}

// One copy must outrun a 2560px screen; the track holds two copies and
// slides -50%. Repeat count keeps a single copy comfortably wider than that.
const REPEATS = 4

/** Decorative looping band between neon tube lines. Hidden from assistive tech. */
export function Marquee({ items, className = '' }: MarqueeProps) {
  const copy = Array.from({ length: REPEATS }, () => items).flat()

  const renderCopy = (key: string) => (
    <div key={key} className="flex shrink-0 items-center">
      {copy.map((item, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`font-display px-[0.35em] text-[clamp(2rem,6vw,4.5rem)] font-bold uppercase leading-none tracking-tight ${
              i % 2 === 1 ? 'text-outline' : 'text-ink'
            }`}
            lang={/[぀-ヿ一-龯]/.test(item) ? 'ja' : undefined}
          >
            {item}
          </span>
          <span className="text-ember text-[clamp(1.25rem,3vw,2.25rem)] leading-none">·</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      <div className="neon-line" />
      <div className="bg-bg/80 py-[clamp(0.75rem,2vw,1.25rem)]">
        <div className="marquee-track">
          {renderCopy('a')}
          {renderCopy('b')}
        </div>
      </div>
      <div className="neon-line" />
    </div>
  )
}
