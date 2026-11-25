import type { Live } from '../data/lives'
import { imageForPath } from '../data/images'
import { Picture } from './Picture'

interface LiveCoverProps {
  live: Live
  /** Featured card: taller cover, bigger title */
  featured?: boolean
}

/**
 * Card cover. Uses the Live's `cover` image when it has one (optimised via the
 * image step); otherwise draws one: dark panel, topic in small ember caps, the
 * title large, soft ember glow. Either way it is decorative: the card's real
 * heading sits below it. Font size follows the cover's width (container query).
 */
export function LiveCover({ live, featured = false }: LiveCoverProps) {
  const aspect = featured ? 'aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[24rem]' : 'aspect-[16/9]'

  if (live.cover) {
    // Real covers carry their own text, so they always keep 16:9 (never cropped)
    const entry = imageForPath(live.cover)
    const sizes = featured ? '(min-width: 1024px) 55vw, 100vw' : '(min-width: 1024px) 31vw, (min-width: 768px) 46vw, 100vw'
    return (
      <div className={`relative aspect-video overflow-hidden border-b border-line ${featured ? 'lg:border-r lg:border-b-0' : ''}`}>
        {entry ? (
          <Picture
            image={entry}
            alt=""
            sizes={sizes}
            className="absolute inset-0 block h-full w-full"
            imgClassName="h-full w-full object-cover transition-transform duration-500 ease-expo group-hover:scale-[1.03]"
          />
        ) : (
          <img src={live.cover} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        )}
      </div>
    )
  }

  return (
    <div className={`@container relative overflow-hidden border-b border-line bg-surface ${aspect} ${featured ? 'lg:border-r lg:border-b-0' : ''}`} aria-hidden="true">
      {/* Ember glow, a touch stronger on hover */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_80%_at_88%_0%,rgb(241_138_54/0.22),transparent_65%),radial-gradient(55%_60%_at_0%_100%,rgb(193_88_44/0.16),transparent_70%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="halftone right-0 bottom-0 h-2/3 w-1/2 opacity-60 [--ht-mask:linear-gradient(315deg,#000,transparent_70%)]" />
      <div className="relative flex h-full flex-col justify-between gap-4 p-[clamp(1.25rem,5cqw,2.5rem)]">
        <span className="label flex items-center gap-3 text-ember">
          <span className="h-px w-6 bg-ember" />
          {live.topic}
        </span>
        <p
          className={`max-w-[18ch] font-display leading-[0.92] font-bold tracking-tight text-ink uppercase ${
            featured ? 'text-[clamp(1.75rem,8cqw,4.5rem)]' : 'text-[clamp(1.5rem,8.5cqw,2.75rem)]'
          }`}
        >
          {live.title}
        </p>
      </div>
    </div>
  )
}
