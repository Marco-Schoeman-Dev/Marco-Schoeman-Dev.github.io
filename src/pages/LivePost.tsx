import { useRef } from 'react'
import type { PageProps } from '.'
import { formatDate, liveBySlug, otherLives, readingTime, topicSlug } from '../data/lives'
import { disclaimer } from '../data/site'
import { imageForPath } from '../data/images'
import { Picture } from '../components/Picture'
import { ImageZoom } from '../components/ImageZoom'
import { Chunk } from '../components/Chunk'
import { KineticHeading } from '../components/KineticHeading'
import { LiveCard } from '../components/LiveCard'
import { ApplyCta } from '../components/ApplyCta'
import { IconArrow } from '../components/Icons'
import NotFound from './NotFound'

/** "More Lives": two other posts, newest first */
function MoreLives({ slug }: { slug: string }) {
  const more = otherLives(slug, 2)
  if (!more.length) return null
  return (
    <section aria-labelledby="more-lives-title" className="relative py-(--section-space)">
      <div className="shell">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label mb-5 text-ember">{'// '}Keep reading</p>
            <h2 id="more-lives-title" className="h2 text-ink">
              More Lives
            </h2>
          </div>
          <a href="/lives" className="btn btn-secondary">
            All Lives
            <IconArrow width={16} height={16} />
          </a>
        </div>
        <ul className="grid gap-6 md:grid-cols-2">
          {more.map((live) => (
            <li key={live.slug}>
              <LiveCard live={live} as="h3" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** One post: title, meta, key takeaways, body. Then Apply and More Lives. */
export default function LivePost({ route }: PageProps) {
  const live = route.slug ? liveBySlug(route.slug) : undefined
  const bodyRef = useRef<HTMLDivElement>(null)
  if (!live) return <NotFound route={route} />
  const cover = live.cover ? imageForPath(live.cover) : undefined

  return (
    <>
      <article aria-labelledby="page-title">
        <header id="top" className="relative overflow-hidden pt-[calc(var(--header-h)+clamp(2.5rem,7vw,5rem))] pb-[clamp(2.5rem,6vw,4rem)]">
          <div className="sunset-glow" aria-hidden="true" />
          <div className="shell relative">
            <a href="/lives" className="label inline-flex min-h-11 items-center gap-2 text-muted hover:text-ember">
              <IconArrow width={14} height={14} className="rotate-180" />
              All Lives
            </a>
            <KineticHeading
              as="h1"
              id="page-title"
              trigger="load"
              delay={0.1}
              label={live.title}
              className="mt-6 max-w-[18ch] font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.92] uppercase text-ink"
            >
              {live.title}
            </KineticHeading>
            <p className="label mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
              <time dateTime={live.date}>{formatDate(live.date)}</time>
              <span aria-hidden="true" className="text-ember">·</span>
              <a href={`/lives?topic=${topicSlug(live.topic)}`} className="-my-2.5 inline-flex min-h-11 items-center text-ember hover:text-ink">
                {live.topic}
              </a>
              {/* Phones: reading time on its own line, so no "·" dangles at a line end */}
              <span aria-hidden="true" className="text-ember max-sm:hidden">·</span>
              <span className="max-sm:basis-full">{readingTime(live)}</span>
            </p>
            <p className="lead mt-6 max-w-[52ch] text-ink">{live.summary}</p>
          </div>
        </header>

        {/* Cover: full-width 16:9 hero. It repeats the title, so it is decorative. */}
        {live.cover && (
          <div className="shell mb-[clamp(2.5rem,6vw,4rem)]">
            <div className="aspect-video overflow-hidden rounded-[12px] border border-line bg-surface">
              {cover ? (
                <Picture
                  image={cover}
                  alt=""
                  sizes="(min-width: 1920px) 1824px, calc(100vw - 2 * clamp(1rem, 4vw, 3rem))"
                  priority
                  className="block h-full w-full"
                  imgClassName="h-full w-full object-cover"
                />
              ) : (
                <img src={live.cover} alt="" fetchPriority="high" className="h-full w-full object-cover" />
              )}
            </div>
          </div>
        )}

        <div className="shell pb-[clamp(3rem,8vw,6rem)]">
          <div className="max-w-[70ch]">
            {/* Key takeaways */}
            <aside aria-labelledby="takeaways-title" className="relative overflow-hidden rounded-md border border-ember/40 bg-surface p-6 shadow-glow md:p-8">
              <h2 id="takeaways-title" className="label text-ember">
                Key takeaways
              </h2>
              <ol className="mt-5 flex flex-col gap-4">
                {live.keyPoints.map((point, i) => (
                  <li key={point} className="flex gap-4">
                    <span aria-hidden="true" className="font-display text-xl leading-tight font-bold text-ember tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-ink">{point}</p>
                  </li>
                ))}
              </ol>
            </aside>

            {/* The post */}
            <div ref={bodyRef} className="prose-live mt-[clamp(2.5rem,6vw,4rem)]" dangerouslySetInnerHTML={{ __html: live.html }} />
            <ImageZoom scope={bodyRef} />

            <p className="label mt-[clamp(3rem,7vw,5rem)] border-t border-line pt-5 text-muted">{disclaimer}</p>
          </div>
        </div>
      </article>

      <Chunk>
        <ApplyCta />
      </Chunk>
      <Chunk>
        <MoreLives slug={live.slug} />
      </Chunk>
    </>
  )
}
