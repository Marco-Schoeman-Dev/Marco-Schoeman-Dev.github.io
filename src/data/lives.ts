import { lives, topics, type Live, type Topic } from 'virtual:lives'

export type { Live, Topic }
export { lives, topics }

export const liveBySlug = (slug: string) => lives.find((l) => l.slug === slug)

export const latestLives = (count = 3) => lives.slice(0, count)

export const livePath = (live: Pick<Live, 'slug'>) => `/lives/${live.slug}`

export const readingTime = (live: Pick<Live, 'readingMinutes'>) => `${live.readingMinutes} min read`

/** Other posts for "More Lives": newest first, excluding the current one */
export const otherLives = (slug: string, count = 2) => lives.filter((l) => l.slug !== slug).slice(0, count)

/** "AI News" → "ai-news" (for ?topic= in the URL) */
export const topicSlug = (topic: Topic) => topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "2026-11-24" → "24 Nov 2026". String maths, so server and browser always agree. */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${MONTHS[m - 1]} ${y}`
}
