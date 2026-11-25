# marcoschoeman.com

Personal site of Marco Schoeman and home of The Founders Club.

React 19 + TypeScript + Vite + Tailwind v4, with GSAP and Lenis for motion. Every page is prerendered to plain HTML at build time, then React hydrates it. Hosted on Cloudflare Pages.

## Pages

| URL | What it is | Source |
|---|---|---|
| `/` | Home: hero, latest 3 Lives, Club teaser, Work teaser | `src/pages/Home.tsx` |
| `/lives` | Every Live, newest first | `src/pages/Lives.tsx` |
| `/lives/<slug>` | One Live | `src/pages/LivePost.tsx` |
| `/founders-club` | The Founders Club and the application form | `src/pages/FoundersClub.tsx` |
| `/work` | Profile, credentials, client sites, services, how I work, start a project | `src/pages/Work.tsx` |
| `/about` | Short bio and contact | `src/pages/About.tsx` |
| anything else | 404 | `src/pages/NotFound.tsx` |

Copy lives in `src/data/*` (`site.ts`, `club.ts`, `projects.ts`, `services.ts`, `method.ts`, `credentials.ts`). Edit text there, not in components.

## Commands

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve dist/ locally
npm run lint
```

`npm run build` does, in order:

1. `scripts/optimize-images.mjs`: AVIF and WebP copies of the images into `public/images/_opt/` (gitignored).
2. `tsc -b`: type-check.
3. `vite build`: the browser bundle, one JS chunk per page.
4. `vite build --ssr`: a Node build used only for prerendering.
5. `scripts/prerender.mjs`: writes one HTML file per page (`dist/work.html`, `dist/lives/<slug>.html`, …) with its own title, description, canonical, Open Graph tags and JSON-LD. It also writes `dist/sitemap.xml`.

## Adding a Live

A Live is a blog post: **one Markdown file**. Nothing else to touch.

1. Copy `content/lives/_template.md` to `content/lives/2026-12-01-pricing-without-panic.md` (the file name is up to you) and fill it in:

   ```yaml
   ---
   title: "Pricing without panic"
   date: 2026-12-01
   slug: pricing-without-panic
   topic: Business   # Business, Marketing, Security or AI News
   summary: "First sentence. Second sentence."
   keyPoints:
     - "Key takeaway one."
     - "Key takeaway two."
     - "Key takeaway three."
   # cover: /images/lives/pricing-without-panic.webp   (optional)
   ---

   The post itself, in Markdown. The first paragraph is shown slightly larger.

   ## A section heading

   Use ## for section headings. A single line break stays a line break.
   Lists and **bold** are styled.
   ```

2. Run `npm run dev` to check it, then commit and push. Cloudflare rebuilds the site.

The post appears on `/lives` (as the big featured card, if it is the newest), under its topic filter, on the home page (if it is one of the 3 newest), in "More Lives" under other posts, in the sitemap, and at `/lives/<slug>`.

Each post page shows the title, date · topic · reading time, the summary, the 3 key points in a "Key takeaways" box, then the body. It ends with "General information, not legal or financial advice.", an "Apply to The Founders Club" block and "More Lives" (2 other posts). Reading time is worked out from the word count (220 words a minute).

SEO is automatic: each post gets its own title and description (from `title` and `summary`), a canonical URL, Open Graph tags and Article JSON-LD.

**Images.** Put a post's images in `public/images/lives/<slug>/`:

- `cover.png` (16:9, e.g. 1600×900), set as `cover: /images/lives/<slug>/cover.png`. It is the card image, the full-width image at the top of the post, and the post's share image on social media (a 1200×630 JPEG is made from it automatically).
- Diagrams go in the body as normal Markdown images: `![Alt text that describes the diagram](/images/lives/<slug>/diagram.png)`. The alt text is used as-is. They show at full text width with rounded corners, load lazily, and open full size when clicked.

`npm run images` (part of `dev` and `build`) makes AVIF/WebP copies of everything in `public/images/lives/` automatically; no list to update. The build stops if a Markdown image points at a file that doesn't exist, and warns if one has no alt text.

No cover yet? The card draws one: dark panel, the topic in ember, the title in large type.

Rules, checked by the build (it stops with a message naming the file and the field):

- `title`, `slug`, `topic`, `summary` are required, and so is the body. `date` must look like `2026-12-01`.
- `topic` must be exactly one of `Business`, `Marketing`, `Security`, `AI News`. These are the filter buttons on `/lives`; to add a topic, add it to `TOPICS` in `scripts/vite-plugin-lives.ts` and to the `Topic` type in `src/types/virtual-lives.d.ts`.
- `slug` is lowercase letters, numbers and dashes. It becomes the URL and must be unique.
- `keyPoints` must have **exactly 3** lines.
- `cover`, if set, must exist under `public/`.
- `summary` should be 2 sentences (a warning, not an error).
- Files starting with `_` are ignored, so `_template.md` never shows up.
## Tally form

The Founders Club application is embedded on `/founders-club`. Its ID lives in `src/config/tally.ts`:

```ts
export const TALLY_APPLICATION_FORM_ID = '2Eq1zb' // https://tally.so/r/2Eq1zb
```

- Tally's script loads only as the visitor scrolls towards the form, so it never slows the first paint. A "Form not loading? Open it in a new tab" link sits under it for ad-blocked browsers.
- There is deliberately no payment link anywhere on the site. Approved members get a private link from Marco.

## Brand rules (short version)

Full detail in `DESIGN.md` and `PRODUCT.md`.

- Colours are CSS variables in `src/styles/tokens.css`: near-black `--bg #0b0605`, `--burnt-orange`, `--ember-glow`, warm off-white `--ink`. No red anywhere.
- One accent word per heading, at most, in ember. Use `<Accent>word</Accent>` (`src/components/Accent.tsx`). Never in body text, labels or buttons.- The brand name is always **The Founders Club** (no apostrophe).
- Voice: deadpan, observational, logical, short. No hype words.
- No Japanese labels anywhere.

## Logos and icons

- New logo set: `public/images/marco-schoeman-portrait-logos/`. The emblem, lockup and profile image go through `npm run images` (AVIF/WebP) and are shown with `<Picture>`.
- Header and footer: the trimmed lockup (`logo-lockup`).
- Favicons (tab, apple-touch-icon, manifest icons): the profile portrait, generated at 32/180/192/512px into `public/images/brand/`.
- `npm run brand-assets` (`scripts/make-brand-assets.mjs`) regenerates `public/images/brand/og-image-1200x630.png` (lockup on `#0b0605`) and the favicons (`favicon-32.png`, `favicon-180.png`, `icon-192.png`, `icon-512.png`, from the profile image). Run it after changing a logo, then commit the output.

## Deploying on Cloudflare Pages

**Project settings** (Workers & Pages → Create → Pages → Connect to Git → this repo):

| Setting | Value |
|---|---|
| Production branch | `main` |
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Environment variable | `NODE_VERSION` = `22` |

**Custom domain:** in the Pages project, Custom domains → add `marcoschoeman.com`, then add `www.marcoschoeman.com` as well (both need DNS records so the redirect below can catch `www`).

**www → apex redirect:** `_redirects` cannot do this (it only matches paths). In the Cloudflare dashboard for the `marcoschoeman.com` zone:

1. Rules → Redirect Rules → Create rule.
2. When incoming requests match: Hostname equals `www.marcoschoeman.com`.
3. Then: Dynamic redirect, expression `concat("https://marcoschoeman.com", http.request.uri.path)`, status `301`, preserve query string on.

**Files Cloudflare reads from `public/`** (copied into `dist/`):
- `_headers`: security headers; long caching for `/assets/*`, a week for `/images/*`.
- `_redirects`: short aliases (`/apply`, `/club` → `/founders-club`, `/contact` → `/about`, …).
- `robots.txt`. `sitemap.xml` is generated by the build.

Unknown URLs get `404.html` with a real 404 status. (`npm run preview` locally shows the home page instead; that is Vite, not Cloudflare.)

## Old GitHub Pages address

`marco-schoeman-dev.github.io` now only serves `github-pages-redirect/`: a page with a canonical tag that sends visitors to `marcoschoeman.com`, mapping old `#work`, `#contact`, … links to the matching new pages. `.github/workflows/deploy.yml` publishes it.

**Merge that workflow to `main` only after `marcoschoeman.com` is live on Cloudflare**, or the old address will redirect to a site that does not exist yet.
