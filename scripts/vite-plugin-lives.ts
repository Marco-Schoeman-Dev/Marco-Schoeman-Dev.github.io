// Turns content/lives/*.md into the `virtual:lives` module at build time.
// Markdown parsing (gray-matter + marked) runs only here, in Node: none of it
// ships to the browser. A Live with bad front matter fails the build with a
// message that names the file and the field.
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'
import { Marked, type Tokens } from 'marked'
import type { Plugin } from 'vite'

/** Allowed values for a Live's "topic", in filter order. Add one here to add a filter button. */
export const TOPICS = ['Business', 'Marketing', 'Security', 'AI News'] as const
export type Topic = (typeof TOPICS)[number]

const VIRTUAL_ID = 'virtual:lives'
const RESOLVED_ID = '\0' + VIRTUAL_ID

export interface LiveEntry {
  slug: string
  title: string
  /** YYYY-MM-DD */
  date: string
  topic: Topic
  summary: string
  keyPoints: [string, string, string]
  /** Words in the post (key points + body), for reading time and JSON-LD */
  wordCount: number
  /** Minutes to read at 220 words a minute, at least 1 */
  readingMinutes: number
  /** Public path to a cover image, e.g. /images/lives/my-live.webp */
  cover?: string
  /** The post body (Markdown), rendered to HTML */
  html: string
}

const toPosix = (p: string) => p.replace(/\\/g, '/')

function fail(file: string, message: string): never {
  throw new Error(`[lives] content/lives/${file}: ${message}`)
}

const isText = (v: unknown): v is string => typeof v === 'string' && v.trim() !== ''

interface ImageEntry {
  width: number
  height: number
  avif: string[]
  webp: string[]
  fallback: string
}

/** Manifest from scripts/optimize-images.mjs (runs before dev and build) */
function readManifest(root: string): Record<string, ImageEntry> {
  const path = join(root, 'src', 'data', 'images.generated.json')
  return existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : {}
}

const escAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** In-post images fill the 70ch text column, or the screen on phones */
const BODY_IMG_SIZES = '(min-width: 48rem) 70ch, calc(100vw - 2rem)'

/**
 * Markdown → HTML for a post body. Images become an optimised <picture>
 * (AVIF/WebP from the manifest, width/height set so nothing jumps, lazy),
 * wrapped in a link to the full-size file; the post page turns that link into
 * a full-size viewer. An image alone in a paragraph renders without the <p>.
 */
function renderBody(root: string, file: string, markdown: string, manifest: Record<string, ImageEntry>) {
  const md = new Marked({ gfm: true, breaks: true })
  md.use({
    renderer: {
      image({ href, text }: Tokens.Image) {
        const src = href.trim()
        if (src.startsWith('/') && !existsSync(join(root, 'public', src))) fail(file, `image not found: public${src}`)
        if (!text.trim()) warn(file, `image ${src} has no alt text`)
        const alt = escAttr(text)
        const entry = manifest[src.replace(/^\/?images\//, '').replace(/\.\w+$/, '')]
        const img = entry
          ? `<picture><source type="image/avif" srcset="${entry.avif.join(', ')}" sizes="${BODY_IMG_SIZES}"><source type="image/webp" srcset="${entry.webp.join(', ')}" sizes="${BODY_IMG_SIZES}"><img src="${entry.fallback}" alt="${alt}" width="${entry.width}" height="${entry.height}" loading="lazy" decoding="async"></picture>`
          : `<img src="${escAttr(src)}" alt="${alt}" loading="lazy" decoding="async">`
        return `<figure class="prose-figure"><a href="${escAttr(src)}" data-zoom target="_blank" rel="noopener">${img}<span class="sr-only"> (open full size)</span></a></figure>`
      },
      paragraph({ tokens }: Tokens.Paragraph) {
        const onlyImages = tokens.length > 0 && tokens.every((t) => t.type === 'image' || (t.type === 'text' && !t.raw.trim()))
        const inner = this.parser.parseInline(tokens)
        return onlyImages ? inner : `<p>${inner}</p>\n`
      },
    },
  })
  return md.parse(markdown, { async: false }) as string
}

let warnFn: (msg: string) => void = console.warn
const warn = (file: string, msg: string) => warnFn(`content/lives/${file}: ${msg}`)

const WORDS_PER_MINUTE = 220

/** Words in Markdown text: drop link targets and markup, count tokens that contain a letter or digit */
const countWords = (text: string) =>
  text
    .replace(/\]\([^)]*\)/g, ']')
    .replace(/[#*_>`~[\]]/g, ' ')
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length

function parseLive(root: string, file: string, manifest: Record<string, ImageEntry>): LiveEntry {
  const raw = readFileSync(join(root, 'content', 'lives', file), 'utf8')
  const { data, content } = matter(raw)

  for (const field of ['title', 'slug', 'topic', 'summary'] as const) {
    if (!isText(data[field])) fail(file, `"${field}" is missing or empty`)
  }

  // YAML turns an unquoted 2026-11-24 into a Date (UTC midnight)
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? '')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) fail(file, `"date" must look like 2026-11-24 (got "${date}")`)

  const slug = String(data.slug).trim()
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    fail(file, `"slug" must be lowercase letters, numbers and single dashes (got "${slug}")`)
  }

  const topic = String(data.topic).trim() as Topic
  if (!TOPICS.includes(topic)) fail(file, `"topic" must be one of: ${TOPICS.join(', ')} (got "${topic}")`)

  const points: unknown = data.keyPoints
  if (!Array.isArray(points) || points.length !== 3 || !points.every(isText)) {
    const found = Array.isArray(points) ? `${points.length} item(s)` : 'not a list'
    fail(file, `"keyPoints" must be a list of exactly 3 lines (found ${found})`)
  }

  let cover: string | undefined
  if (data.cover != null && data.cover !== '') {
    cover = String(data.cover).trim()
    if (!cover.startsWith('/')) cover = `/${cover}`
    if (!existsSync(join(root, 'public', cover))) fail(file, `cover image not found: public${cover}`)
  }

  const summary = String(data.summary).trim()
  const sentences = summary.split(/(?<=[.!?])\s+/).filter(Boolean).length
  if (sentences !== 2) warn(file, `"summary" should be 2 sentences (found ${sentences})`)

  if (!content.trim()) fail(file, 'the post body (Markdown under the front matter) is empty')
  const keyPoints = points.map((p: string) => p.trim()) as [string, string, string]
  const wordCount = countWords([...keyPoints, content].join(' '))

  return {
    slug,
    title: String(data.title).trim(),
    date,
    topic,
    summary,
    keyPoints,
    wordCount,
    readingMinutes: Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE)),
    cover,
    // breaks: a single line break in the Markdown is a line break on the page
    html: renderBody(root, file, content, manifest),
  }
}

/** All Lives, newest first. Files starting with "_" (the template) are skipped. */
export function readLives(root: string, onWarn: (msg: string) => void = console.warn): LiveEntry[] {
  warnFn = onWarn
  const dir = join(root, 'content', 'lives')
  if (!existsSync(dir)) return []
  const files = readdirSync(dir).filter((f) => f.endsWith('.md') && !f.startsWith('_'))
  const manifest = readManifest(root)
  const lives = files.map((f) => parseLive(root, f, manifest))

  const seen = new Map<string, string>()
  lives.forEach((l, i) => {
    if (seen.has(l.slug)) fail(files[i], `slug "${l.slug}" is already used by ${seen.get(l.slug)}`)
    seen.set(l.slug, files[i])
  })

  return lives.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))
}

export function livesPlugin(root: string): Plugin {
  // Posts, plus the image manifest (rewritten when "npm run images" runs)
  const watched = [toPosix(join(root, 'content', 'lives')), toPosix(join(root, 'src', 'data', 'images.generated.json'))]

  return {
    name: 'lives',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },
    load(id) {
      if (id !== RESOLVED_ID) return
      const lives = readLives(root, (msg) => this.warn(msg))
      return `export const topics = ${JSON.stringify(TOPICS)}\nexport const lives = ${JSON.stringify(lives)}`
    },
    configureServer(server) {
      watched.forEach((dir) => server.watcher.add(dir))
      const onChange = (file: string) => {
        if (!watched.some((dir) => toPosix(file).startsWith(dir))) return
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.on('add', onChange)
      server.watcher.on('change', onChange)
      server.watcher.on('unlink', onChange)
    },
  }
}
