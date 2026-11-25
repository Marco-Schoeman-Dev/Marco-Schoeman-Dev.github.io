// Bakes every page into its own HTML file so the first paint (hero art, titles,
// copy) happens before any JavaScript runs, and each page ships its own <head>
// (title, description, canonical, Open Graph, JSON-LD). React hydrates on load.
// Also writes sitemap.xml. Runs after `vite build` and the SSR build.
//
// Output: dist/index.html, dist/lives.html, dist/lives/<slug>.html, ...
// Cloudflare Pages serves those at clean URLs (/lives, /lives/<slug>).
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')
const SITE = 'https://marcoschoeman.com'

const { render, routes } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)

const template = readFileSync(join(dist, 'index.html'), 'utf8')
const HEAD = '<!--app-head-->'
const ROOT = '<div id="root"></div>'
for (const marker of [HEAD, ROOT]) {
  if (!template.includes(marker)) throw new Error(`[prerender] ${marker} not found in dist/index.html`)
}

// Vite's manifest: which JS chunk (and its imports) each page needs, so the
// browser can fetch it alongside the entry instead of after it.
const manifestPath = join(dist, '.vite', 'manifest.json')
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
const entryKey = Object.keys(manifest).find((k) => manifest[k].isEntry)
const entryImports = new Set(manifest[entryKey]?.imports ?? [])

function preloadsFor(pageFile) {
  const files = new Set()
  const walk = (key) => {
    const chunk = manifest[key]
    if (!chunk || files.has(chunk.file)) return
    files.add(chunk.file)
    for (const dep of chunk.imports ?? []) if (!entryImports.has(dep) && dep !== entryKey) walk(dep)
  }
  walk(pageFile)
  return [...files].map((f) => `<link rel="modulepreload" crossorigin href="/${f}" />`)
}

// Preload the faces that set the above-the-fold text: display headings (700),
// buttons (600) and body (400). Without this they arrive late, text and button
// rows re-wrap when they swap in, the sections below jump (layout shift) and
// the text LCP is delayed. JetBrains Mono (small labels) is left to load lazily.
const PRELOAD_FONTS = [
  /^chakra-petch-latin-700-normal-.*\.woff2$/,
  /^chakra-petch-latin-600-normal-.*\.woff2$/,
  /^ibm-plex-sans-latin-400-normal-.*\.woff2$/,
]
const assetFiles = readdirSync(join(dist, 'assets'))
const fontPreloads = PRELOAD_FONTS.map((re) => {
  const file = assetFiles.find((f) => re.test(f))
  if (!file) throw new Error(`[prerender] no font file matches ${re}`)
  return `<link rel="preload" as="font" type="font/woff2" crossorigin href="/assets/${file}" />`
})

const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')

const pages = routes()
for (const { route, file } of pages) {
  const { html, head, pageFile } = await render(route)
  const rootAttrs = [`data-route="${route.id}"`, `data-path="${attr(route.path)}"`, route.slug ? `data-slug="${attr(route.slug)}"` : '', route.variant ? `data-variant="${route.variant}"` : '']
    .filter(Boolean)
    .join(' ')
  const out = template
    .replace(HEAD, [head, ...fontPreloads, ...preloadsFor(pageFile)].join('\n    '))
    .replace(ROOT, `<div id="root" ${rootAttrs}>${html}</div>`)
  const outPath = join(dist, file)
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, out)
  console.log(`[prerender] ${file.padEnd(34)} ${(html.length / 1024).toFixed(1)} KB`)
}

// Sitemap: every real page (not the 404), canonical clean URLs
const today = new Date().toISOString().slice(0, 10)
const urls = pages
  .filter(({ route }) => route.id !== 'notFound' && !route.variant)
  .map(({ route, lastmod }) => {
    const loc = route.path === '/' ? `${SITE}/` : `${SITE}${route.path}`
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod ?? today}</lastmod>\n  </url>`
  })
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
)
console.log(`[prerender] sitemap.xml: ${urls.length} URLs`)

// Build-only artefacts: never deploy them
rmSync(join(dist, '.vite'), { recursive: true, force: true })
rmSync(ssrDir, { recursive: true, force: true })
