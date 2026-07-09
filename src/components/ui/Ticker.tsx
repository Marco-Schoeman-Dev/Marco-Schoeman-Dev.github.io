const ITEMS = [
  "LET'S TALK",
  "LET'S BUILD",
  "LET'S HACK",
  'AVAILABLE FOR HIRE',
  'WEB DEVELOPER',
  'RED TEAM OPERATOR',
  'SOUTH AFRICA',
  'REACH OUT',
]

const track = ITEMS.join('  ·  ') + '  ·  '
const REPEATS = 8

export function Ticker() {
  return (
    <div
      className="overflow-hidden border-y border-line py-3.5 bg-surface/90 select-none"
      role="marquee"
      aria-label="Marco Schoeman — available for work, web developer and red team operator based in South Africa"
    >
      {/* Repeated so the loop stays seamless on ultra-wide screens */}
      <div className="ticker-track text-xs font-semibold tracking-[0.18em] text-ink-3">
        <span>{track.repeat(REPEATS)}</span>
      </div>
    </div>
  )
}
