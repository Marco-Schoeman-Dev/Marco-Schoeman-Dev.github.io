import { useEffect, useState } from 'react'
import type { PageProps } from '.'
import { lives, topics, topicSlug, type Topic } from '../data/lives'
import { Chunk } from '../components/Chunk'
import { PageHeader } from '../components/PageHeader'
import { Accent } from '../components/Accent'
import { LiveCard } from '../components/LiveCard'
import { ApplyCta } from '../components/ApplyCta'

type Filter = Topic | 'All'

const countFor = (f: Filter) => (f === 'All' ? lives.length : lives.filter((l) => l.topic === f).length)

/**
 * Topic filter + list. The prerendered page shows everything ("All"); the
 * chosen topic is read from ?topic= after hydration and written back to the
 * URL, so a filtered view can be shared.
 */
function LivesBrowser() {
  const [filter, setFilter] = useState<Filter>('All')

  useEffect(() => {
    const wanted = new URLSearchParams(location.search).get('topic')
    const match = topics.find((t) => topicSlug(t) === wanted)
    if (match) setFilter(match)
  }, [])

  const choose = (f: Filter) => {
    setFilter(f)
    const url = new URL(location.href)
    if (f === 'All') url.searchParams.delete('topic')
    else url.searchParams.set('topic', topicSlug(f))
    history.replaceState(null, '', url)
  }

  const list = filter === 'All' ? lives : lives.filter((l) => l.topic === filter)
  const [featured, ...rest] = list
  const filters: Filter[] = ['All', ...topics]

  return (
    <section aria-label="All Lives" className="relative pb-(--section-space)">
      <div className="shell">
        <div role="group" aria-label="Filter Lives by topic" className="mb-10 flex flex-wrap gap-2 md:mb-14">
          {filters.map((f) => {
            const active = f === filter
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => choose(f)}
                className={`btn btn-sm gap-2 ${active ? 'btn-primary' : 'btn-secondary'}`}
              >
                {f}
                <span className={`font-mono text-xs ${active ? 'text-on-ember/70' : 'text-muted'}`}>{countFor(f)}</span>
              </button>
            )
          })}
        </div>

        <p className="sr-only" role="status">
          {list.length === 1 ? '1 Live' : `${list.length} Lives`}
          {filter === 'All' ? '' : ` in ${filter}`}
        </p>

        {featured ? (
          <>
            <div className="mb-6">
              <LiveCard live={featured} as="h2" featured />
            </div>
            {rest.length > 0 && (
              <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((live) => (
                  <li key={live.slug}>
                    <LiveCard live={live} as="h2" />
                  </li>
                ))}
              </ol>
            )}
          </>
        ) : (
          <div className="rounded-md border border-line bg-surface p-8 md:p-12">
            <p className="lead text-ink">
              {filter === 'All' ? 'Nothing here yet. The first Live is on its way.' : `No ${filter} Lives yet.`}
            </p>
            {filter !== 'All' && (
              <p className="mt-2 text-muted">Give it a week. Or a Live. Whichever comes first.</p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default function Lives(_: PageProps) {
  return (
    <>
      <PageHeader
        eyebrow={{ index: '00', name: 'Lives' }}
        label="Lives, written down."
        title={
          <>
            Lives, written
            <br />
            <Accent>down</Accent>.
          </>
        }
        lead="I go live and work through one business problem at a time. Afterwards I write up what was worth keeping. Newest first."
      />

      <LivesBrowser />

      <Chunk>
        <ApplyCta />
      </Chunk>
    </>
  )
}
