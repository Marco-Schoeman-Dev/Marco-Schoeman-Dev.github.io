# Design

## Visual Theme

Ember and sunset. Dark, warm, cinematic, built around the illustrated portraits. Manga-panel framing (thick ink borders, angled cuts), focus lines and halftone dots as low-opacity texture, ember light bleeding in from the hero art. Nothing that reads as neon city: no tube glows, no cyan, no Japanese labels. Multi-page: Home, Lives, Live post, The Founders Club, Work, About. Each page has big numbered sections; Home has a marquee band; Work has numbered method and expanding service rows.

Scene: someone opens the link from an Instagram bio on their phone at night, in a dim room. Dark theme only.

Color strategy: **Restrained with a committed image.** About 80% dark surfaces, 15% text, 5% ember. The hero art carries the saturation; UI orange is an accent, never a background block.

## Color

| Token | Value | Role |
|---|---|---|
| `--bg` | `#0b0605` | Page background |
| `--surface` | `#140907` | Panels, alternating sections |
| `--surface-raised` | `#1e0f0c` | Cards, menu, raised panels |
| `--border` | `#401b13` | Hairlines and panel edges (decorative, 1.3:1) |
| `--ink` | `#fff4ee` | Warm off-white: headings, primary text (18.6:1 on bg) |
| `--ink-muted` | `#c4a596` | Body and secondary text (8.8:1 on bg) |
| `--ember-glow` | `#f18a36` | Accent, primary button, focus ring, key numerals (8.1:1 on bg). Tailwind: `ember` |
| `--burnt-orange` | `#c1582c` | Rules, textures, glow gradients. Decoration only, never small text. Tailwind: `burnt` |
| `--on-ember` | `#1a0d0a` | Text on ember (7.6:1) |
| `--sun` | `#fcc133` | Rare highlight: impact flash core, ember particles |

Glow: `--glow-ember: 0 0 24px rgba(241,138,54,.35)`.

## Typography

- **Display:** Chakra Petch 600/700. Uppercase for section titles and project names, tight tracking (-0.02em), leading 0.9.
- **Body:** IBM Plex Sans 400/500. 17–18px base, leading 1.65, max 65ch. (Kept by brand-kit decision despite being a common choice.)
- **Labels/code:** JetBrains Mono 400/500. 12–13px, uppercase, tracking 0.16em.

Fluid scale (≈1.333 ratio): label 0.75rem · body 1.0625rem · lead 1.25rem · h3 clamp(1.5rem, 3vw, 2rem) · h2 clamp(2.75rem, 8vw, 6.5rem) · display clamp(3.5rem, 13vw, 11rem).

No em dashes in copy. Section labels read `// 01 / WORK`. No Japanese anywhere.

Accent word: at most one ember word per heading, via `<Accent>`. No red anywhere on the site.

Logos: header and footer both use the trimmed lockup (`logo-lockup`): header 40px tall on mobile, 48px desktop; footer 64px / 80px. About = round-cropped `profile`. Social preview = `public/images/brand/og-image-1200x630.png` (lockup on `#0b0605`, from `npm run brand-assets`).

## Shape & Elevation

Radii: `--radius-sm 4px`, `--radius-md 8px`, `--radius-lg 16px`. Manga panels use 0 radius with a clip-path corner cut instead. Elevation comes from surface steps and ember glow, not drop shadows.

## Components

- **Button (primary):** ember fill, on-ember text, radius-sm, Chakra Petch 600 uppercase. Hover: ember glow. Focus: 2px ember ring, 3px offset.
- **Button (secondary):** 1px ink/30 border, ink text; hover border ember.
- **Section label:** mono `// 0N / NAME` in ember.
- **Manga panel:** 2px ink border at 85%, clip-path chopped corner, optional halftone corner.
- **Impact card (work):** panel + hover/focus impact frame: 120ms white flash, ember focus lines, 1.02 scale.
- **Service row:** full-width disclosure button; numeral, title, chevron; expands via grid-template-rows.
- **Marquee:** Chakra Petch uppercase band between ember rules (`.ember-rule`, no glow).
- **Live card:** panel with border ink that turns ember on hover; date, title, summary; whole card is one link.
- **Page header:** eyebrow, kinetic h1 (`.page-title`), lead, actions. `id="top"`.

## Motion

- Engine: GSAP + ScrollTrigger, Lenis smooth scroll. All disabled under `prefers-reduced-motion`.
- Easing: expo.out / power4.out. No bounce or elastic.
- Title card: chars rise from 110% with -12° skew settling to 0, an ember slash wipe crosses the line. 0.9s, 0.02s stagger.
- Panels slide in on scroll from alternating sides (x ±60px, clip reveal).
- Hover feedback 150–250ms; entrances 600–900ms.
- Only transform and opacity animate.

## Layout

Edge gutters `clamp(1rem, 4vw, 3rem)`. Max content width 1920px (`.shell`), shared by header, hero panel and every section so edges align on ultra-wide screens; body copy is capped separately at 65ch. Sections are full-bleed with generous vertical space `clamp(6rem, 14vw, 12rem)`. Mobile-first.
