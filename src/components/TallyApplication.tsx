import { useEffect, useRef } from 'react'
import { TALLY_APPLICATION_FORM_ID } from '../config/tally'
import { loadTally } from '../lib/tally'

const embedSrc = `https://tally.so/embed/${TALLY_APPLICATION_FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`
const directSrc = `https://tally.so/r/${TALLY_APPLICATION_FORM_ID}`

/**
 * The Founders Club application (Tally embed). Tally's script loads only when
 * the form is about to scroll into view, so it never slows the first paint.
 */
export function TallyApplication() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        // A blocked script leaves the "open in a new tab" link below as the way in
        loadTally()
          .then((tally) => tally.loadEmbeds())
          .catch(() => {})
      },
      { rootMargin: '800px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {/* Site card: surface fill, 1px border, 8px radius, 24px padding. The
          form itself is transparent (transparentBackground=1), so it sits on this. */}
      <div className="rounded-md border border-line bg-surface p-6">
        <iframe
          data-tally-src={embedSrc}
          loading="lazy"
          width="100%"
          height="620"
          title="The Founders Club application form"
          className="block w-full border-0"
        />
      </div>
      <p className="mt-4 text-sm text-muted">
        Form not loading?{' '}
        <a href={directSrc} target="_blank" rel="noopener noreferrer" className="link text-ink">
          Open it in a new tab
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        .
      </p>
    </div>
  )
}
