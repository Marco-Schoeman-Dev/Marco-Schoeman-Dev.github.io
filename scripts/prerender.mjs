// Bakes the rendered app into dist/index.html so the first paint (hero art,
// name, copy) happens before any JavaScript runs. React hydrates it on load.
// Runs after `vite build` and `vite build --ssr src/entry-server.tsx`.
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const htmlPath = join(root, 'dist', 'index.html')
const ssrDir = join(root, 'dist-ssr')

const { render } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)
const appHtml = render()

const template = readFileSync(htmlPath, 'utf8')
const marker = '<div id="root"></div>'
if (!template.includes(marker)) throw new Error(`[prerender] ${marker} not found in dist/index.html`)

writeFileSync(htmlPath, template.replace(marker, `<div id="root">${appHtml}</div>`))
rmSync(ssrDir, { recursive: true, force: true })
console.log(`[prerender] dist/index.html: ${(appHtml.length / 1024).toFixed(1)} KB of markup inlined`)
