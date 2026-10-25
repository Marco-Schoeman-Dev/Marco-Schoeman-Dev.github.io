// Generates responsive AVIF + WebP copies of the site's raster images.
// Originals are never modified. Output lands in public/images/_opt/ and a
// manifest in src/data/images.generated.json that <Picture> reads.
// Runs automatically before `dev` and `build`; skips files already up to date.
import { existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pub = join(root, 'public')
const outDir = join(pub, 'images', '_opt')
const manifestPath = join(root, 'src', 'data', 'images.generated.json')
const kit = 'images/marco-schoeman-brand-kit'

/** key → source (relative to public/) and target widths */
const images = {
  'hero-desktop': { src: `${kit}/04-hero/hero-desktop-1920x1080.jpg`, widths: [640, 960, 1280, 1920] },
  'hero-mobile': { src: `${kit}/04-hero/hero-mobile-1080x1350.jpg`, widths: [480, 640, 800, 1080] },
  'avatar-ring': { src: `${kit}/03-avatar/avatar-ring-512.png`, widths: [256, 384, 512] },
  'project-kingjacub': { src: 'images/kingjacub.jpg', widths: [640, 1024, 1200] },
  'project-juul': { src: 'images/juul.webp', widths: [640, 1024, 1280] },
  'project-sylk': { src: 'images/sylk.png', widths: [640, 1024] },
  'project-osint': { src: 'images/OSINT.png', widths: [640, 1024, 1600] },
  'project-redteam': { src: 'images/RedTeam.png', widths: [640, 1024, 1600] },
  'project-automation': { src: 'images/automation.png', widths: [640, 1024, 1600] },
  // Cropped to the figure: keeps third-party car/laptop/can logos out of frame
  'method-operative': {
    src: 'images/Cyberpunk Operative Overlooking Neon City.png',
    extract: { left: 220, top: 40, width: 480, height: 1000 },
    widths: [360, 480],
  },
  // Credential badges render at 40px; 96px covers 2x+ screens
  'badge-crta': { src: 'images/CRTA.png', widths: [96] },
  'badge-ctia': { src: 'images/CTI101.png', widths: [96] },
  'badge-itacademy': { src: 'images/it-academy-logo.png', widths: [96] },
  'badge-cisco-eh': { src: 'images/cisco-ethical-hacker.png', widths: [96] },
  'badge-cisco-ic': { src: 'images/cisco-intro-cybersecurity.png', widths: [96] },
  'badge-cisco-nb': { src: 'images/cisco-networking-basics.png', widths: [96] },
}

const formats = [
  { ext: 'avif', opts: { quality: 52, effort: 4 } },
  { ext: 'webp', opts: { quality: 74, effort: 5 } },
]

mkdirSync(outDir, { recursive: true })
mkdirSync(dirname(manifestPath), { recursive: true })

const manifest = {}
let written = 0

for (const [key, { src, widths, extract }] of Object.entries(images)) {
  const srcPath = join(pub, src)
  const srcTime = statSync(srcPath).mtimeMs
  const meta = extract ?? (await sharp(srcPath).metadata())
  const usable = widths.filter((w) => w <= meta.width)
  if (!usable.length) usable.push(meta.width)
  const load = () => (extract ? sharp(srcPath).extract(extract) : sharp(srcPath))

  const entry = { width: meta.width, height: meta.height, avif: [], webp: [] }

  for (const w of usable) {
    for (const { ext, opts } of formats) {
      const file = `${key}-${w}.${ext}`
      const outPath = join(outDir, file)
      if (!existsSync(outPath) || statSync(outPath).mtimeMs < srcTime) {
        await load().resize({ width: w, withoutEnlargement: true })[ext](opts).toFile(outPath)
        written++
      }
      entry[ext].push(`/images/_opt/${file} ${w}w`)
    }
  }

  entry.fallback = `/images/_opt/${key}-${usable.at(-1)}.webp`
  manifest[key] = entry
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
console.log(`[images] ${Object.keys(images).length} sources, ${written} files written`)
