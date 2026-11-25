// Generates responsive AVIF + WebP copies of the site's raster images.
// Originals are never modified. Output lands in public/images/_opt/ and a
// manifest in src/data/images.generated.json that <Picture> reads.
// Runs automatically before `dev` and `build`; skips files already up to date.
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pub = join(root, 'public')
const outDir = join(pub, 'images', '_opt')
const manifestPath = join(root, 'src', 'data', 'images.generated.json')
const kit = 'images/marco-schoeman-brand-kit'
const logos = 'images/marco-schoeman-portrait-logos'

/**
 * key → source (relative to public/) and target widths.
 * extract: crop box before resizing. trim: cut transparent/flat margins first.
 */
const images = {
  'hero-desktop': { src: `${kit}/04-hero/hero-desktop-1920x1080.jpg`, widths: [640, 960, 1280, 1920] },
  'hero-mobile': { src: `${kit}/04-hero/hero-mobile-1080x1350.jpg`, widths: [480, 640, 800, 1080] },
  // Portrait logo set (transparent PNGs keep their alpha in AVIF/WebP)
  'logo-emblem': { src: `${logos}/marco-schoeman-emblem-transparent.png`, widths: [320, 480, 640, 960, 1280] },
  // Footer: shown 64–80px tall; trimmed so the empty margin doesn't count
  'logo-lockup': { src: `${logos}/marco-schoeman-lockup-transparent.png`, trim: true, widths: [320, 480, 640, 960] },
  'profile': { src: `${logos}/marco-schoeman-profile-1080.png`, widths: [320, 480, 640, 800] },
  'project-kingjacub': { src: 'images/kingjacub.jpg', widths: [640, 1024, 1200] },
  'project-juul': { src: 'images/juul.webp', widths: [640, 1024, 1280] },
  'project-sylk': { src: 'images/sylk.png', widths: [640, 1024] },
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

// ── Lives: every image under public/images/lives/<slug>/ is picked up
// automatically (covers and in-post diagrams). Key: "lives/<slug>/<name>".
// Diagrams are flat graphics with small text, so they get a higher quality.
const LIVES_DIR = join(pub, 'images', 'lives')
const LIVES_QUALITY = { avif: { quality: 64, effort: 4 }, webp: { quality: 84, effort: 5 } }
if (existsSync(LIVES_DIR)) {
  for (const slug of readdirSync(LIVES_DIR)) {
    if (!statSync(join(LIVES_DIR, slug)).isDirectory()) continue
    for (const file of readdirSync(join(LIVES_DIR, slug))) {
      if (!/\.(png|jpe?g|webp)$/i.test(file)) continue
      const name = file.replace(/\.\w+$/, '')
      images[`lives/${slug}/${name}`] = {
        src: `images/lives/${slug}/${file}`,
        widths: [480, 800, 1200, 1600],
        quality: LIVES_QUALITY,
        // Covers double as the post's share image (1200×630 JPEG)
        og: name === 'cover',
      }
    }
  }
}

const formats = [
  { ext: 'avif', opts: { quality: 52, effort: 4 } },
  { ext: 'webp', opts: { quality: 74, effort: 5 } },
]

mkdirSync(outDir, { recursive: true })
mkdirSync(dirname(manifestPath), { recursive: true })

const manifest = {}
let written = 0

for (const [key, { src, widths, extract, trim, quality, og }] of Object.entries(images)) {
  const srcPath = join(pub, src)
  const srcTime = statSync(srcPath).mtimeMs
  // Trimmed sources: trim once, then resize from the trimmed buffer
  const trimmed = trim ? await sharp(srcPath).trim().png().toBuffer({ resolveWithObject: true }) : null
  const meta = trimmed ? trimmed.info : (extract ?? (await sharp(srcPath).metadata()))
  const usable = widths.filter((w) => w <= meta.width)
  if (!usable.length) usable.push(meta.width)
  const load = () => (trimmed ? sharp(trimmed.data) : extract ? sharp(srcPath).extract(extract) : sharp(srcPath))

  const entry = { width: meta.width, height: meta.height, avif: [], webp: [] }

  for (const w of usable) {
    for (const { ext, opts } of formats) {
      const file = `${key.replace(/\//g, '-')}-${w}.${ext}`
      const outPath = join(outDir, file)
      if (!existsSync(outPath) || statSync(outPath).mtimeMs < srcTime) {
        await load().resize({ width: w, withoutEnlargement: true })[ext](quality?.[ext] ?? opts).toFile(outPath)
        written++
      }
      entry[ext].push(`/images/_opt/${file} ${w}w`)
    }
  }

  entry.fallback = `/images/_opt/${key.replace(/\//g, '-')}-${usable.at(-1)}.webp`

  if (og) {
    const file = `${key.replace(/\//g, '-')}-og.jpg`
    const outPath = join(outDir, file)
    if (!existsSync(outPath) || statSync(outPath).mtimeMs < srcTime) {
      await load().resize(1200, 630, { fit: 'cover', position: 'centre' }).jpeg({ quality: 82, mozjpeg: true }).toFile(outPath)
      written++
    }
    entry.og = `/images/_opt/${file}`
  }
  manifest[key] = entry
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
console.log(`[images] ${Object.keys(images).length} sources, ${written} files written`)
