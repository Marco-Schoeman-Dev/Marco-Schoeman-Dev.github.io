import { formatDate, livePath, readingTime, type Live } from '../data/lives'
import { LiveCover } from './LiveCover'
import { IconArrow } from './Icons'

interface LiveCardProps {
  live: Live
  /** Heading level: h3 under a section heading, h2 directly under the page h1 */
  as?: 'h2' | 'h3'
  /** Newest post on /lives: wide card, cover beside the text on desktop */
  featured?: boolean
}

/**
 * One post: cover, date · topic · reading time, title, summary, "Read the post".
 * The title link is stretched over the whole card, so the card is one tab stop.
 */
export function LiveCard({ live, as: Heading = 'h3', featured = false }: LiveCardProps) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-md border border-line bg-surface transition-[border-color,box-shadow] duration-300 hover:border-ember hover:shadow-[0_0_32px_rgb(241_138_54/0.22)] focus-within:border-ember focus-within:shadow-[0_0_32px_rgb(241_138_54/0.22)] ${
        featured ? 'lg:grid lg:grid-cols-12' : ''
      }`}
    >
      <div className={featured ? 'lg:col-span-7 lg:self-center' : ''}>
        <LiveCover live={live} featured={featured} />
      </div>

      <div className={`@container flex flex-1 flex-col gap-4 p-6 md:p-8 ${featured ? 'lg:col-span-5 lg:justify-center lg:p-10' : ''}`}>
        {/* Narrow card: reading time on its own line, so no "·" dangles at a line end */}
        <p className="label flex flex-wrap items-center gap-x-2.5 gap-y-1 text-muted">
          <time dateTime={live.date}>{formatDate(live.date)}</time>
          <span aria-hidden="true" className="text-ember">·</span>
          <span className="text-ember">{live.topic}</span>
          <span aria-hidden="true" className="text-ember @max-sm:hidden">·</span>
          <span className="@max-sm:basis-full">{readingTime(live)}</span>
        </p>
        <Heading
          className={`font-display leading-[0.98] uppercase transition-colors duration-200 group-hover:text-ember ${
            featured ? 'text-[clamp(1.75rem,3.4vw,3rem)]' : 'text-[clamp(1.375rem,2.2vw,1.875rem)]'
          }`}
        >
          <a href={livePath(live)} className="after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none">
            {live.title}
          </a>
        </Heading>
        <p className={featured ? 'lead' : 'text-muted'}>{live.summary}</p>
        <span aria-hidden="true" className="label mt-auto inline-flex items-center gap-2 pt-2 text-ember">
          Read the post
          <IconArrow width={14} height={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  )
}
