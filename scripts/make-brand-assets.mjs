// One-off brand assets from the portrait logo set. Run with `npm run brand-assets`
// after changing a logo; the outputs are committed (not generated on every build).
//
//   public/images/brand/og-image-1200x630.png  lockup centred on #0b0605 (social previews)
//   public/images/brand/favicon-32.png, favicon-180.png, icon-192.png, icon-512.png
//                                              favicons from the profile portrait
import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const logos = join(root, 'public', 'images', 'marco-schoeman-portrait-logos')
const out = join(root, 'public', 'images', 'brand')
mkdirSync(out, { recursive: true })

const BG = '#0b0605'

// ── OG image: trimmed lockup, 1000px wide, centred on the brand background
{
  const W = 1200
  const H = 630
  const lockup = await sharp(join(logos, 'marco-schoeman-lockup-transparent.png'))
    .trim()
    .resize({ width: 1000 })
    .png()
    .toBuffer({ resolveWithObject: true })
  // Soft ember glow behind the lockup, to match the site
  const glow = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs><radialGradient id="g" cx="50%" cy="50%" r="60%">
        <stop offset="0" stop-color="#f18a36" stop-opacity="0.14"/>
        <stop offset="1" stop-color="#f18a36" stop-opacity="0"/>
      </radialGradient></defs>
      <rect width="${W}" height="${H}" fill="url(#g)"/>
      <rect x="0" y="${H - 6}" width="${W}" height="6" fill="#f18a36"/>
    </svg>`,
  )
  await sharp({ create: { width: W, height: H, channels: 3, background: BG } })
    .composite([
      { input: glow, left: 0, top: 0 },
      { input: lockup.data, left: Math.round((W - lockup.info.width) / 2), top: Math.round((H - lockup.info.height) / 2) },
    ])
    .png({ compressionLevel: 9 })
    .toFile(join(out, 'og-image-1200x630.png'))
  console.log('[brand] og-image-1200x630.png')
}

// ── Favicons: the profile portrait, square, at every size the site links.
// favicon-32 (browser tab), favicon-180 (apple-touch-icon), icon-192/512 (manifest).
for (const size of [32, 180, 192, 512]) {
  const name = size === 32 || size === 180 ? `favicon-${size}.png` : `icon-${size}.png`
  await sharp(join(logos, 'marco-schoeman-profile-1080.png'))
    .resize(size, size, { kernel: 'lanczos3' })
    .png({ compressionLevel: 9 })
    .toFile(join(out, name))
  console.log(`[brand] ${name}`)
}