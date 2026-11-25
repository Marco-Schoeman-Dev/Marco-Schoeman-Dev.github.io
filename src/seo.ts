// ─── Per-page <head> ─────────────────────────────────────────────────────────
// Title, description, canonical, Open Graph, Twitter and JSON-LD for every
// prerendered page. Used at build time by scripts/prerender.mjs (via
// entry-server) and in dev to set document.title.
import type { Route } from './routes'
import { liveBySlug, lives } from './data/lives'
import { club, pricing } from './data/club'
import { imageForPath, images } from './data/images'
import { site, socials } from './data/site'

export interface PageMeta {
  title: string
  description: string
  /** Canonical path */
  path: string
  type: 'website' | 'article'
  published?: string
  noindex?: boolean
  jsonLd: object[]
  /** Share image (default: the site OG image). Path on this site, 1200×630. */
  image?: { path: string; alt: string }
}

const abs = (path: string) => `${site.url}${path === '/' ? '/' : path}`

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${site.url}/#marco`,
  name: site.name,
  jobTitle: 'Founder',
  url: `${site.url}/`,
  email: `mailto:${site.email}`,
  address: { '@type': 'PostalAddress', addressCountry: 'ZA' },
  sameAs: socials.map((s) => s.href),
}

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${site.url}/founders-club#org`,
  name: club.name,
  url: `${site.url}/founders-club`,
  description: club.lead,
  founder: { '@id': `${site.url}/#marco` },
}

export function metaFor(route: Route): PageMeta {
  switch (route.id) {
    case 'home':
      if (route.variant) {
        return {
          ...metaFor({ id: 'home', path: '/' }),
          title: `Preview: hero ${route.variant} | Marco Schoeman`,
          path: route.path,
          noindex: true,
          jsonLd: [],
        }
      }
      return {
        title: 'Marco Schoeman | Founder, Operator, Builder',
        description:
          'Marco Schoeman is a founder, operator and builder. Notes from his Lives, The Founders Club, and the websites, automations and security work behind it.',
        path: '/',
        type: 'website',
        jsonLd: [
          person,
          { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: `${site.url}/` },
        ],
      }
    case 'lives':
      return {
        title: 'Lives | Marco Schoeman',
        description:
          'Posts from Marco Schoeman’s Lives: business, marketing, security and AI news. One problem per post, written up properly.',
        path: '/lives',
        type: 'website',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Lives by Marco Schoeman',
            url: abs('/lives'),
            author: { '@id': `${site.url}/#marco` },
            blogPost: lives.map((l) => ({
              '@type': 'BlogPosting',
              headline: l.title,
              description: l.summary,
              articleSection: l.topic,
              url: abs(`/lives/${l.slug}`),
              datePublished: l.date,
            })),
          },
        ],
      }
    case 'live': {
      const live = route.slug ? liveBySlug(route.slug) : undefined
      if (!live) return metaFor({ id: 'notFound', path: route.path })
      // The cover's 1200×630 JPEG (from the image step) is the post's share image
      const shareImage = live.cover ? (imageForPath(live.cover)?.og ?? live.cover) : site.ogImage
      return {
        image: { path: shareImage, alt: live.title },
        title: `${live.title} | Marco Schoeman`,
        description: live.summary,
        path: `/lives/${live.slug}`,
        type: 'article',
        published: live.date,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: live.title,
            description: live.summary,
            articleSection: live.topic,
            keywords: live.topic,
            wordCount: live.wordCount,
            timeRequired: `PT${live.readingMinutes}M`,
            inLanguage: 'en',
            datePublished: live.date,
            dateModified: live.date,
            url: abs(`/lives/${live.slug}`),
            mainEntityOfPage: { '@type': 'WebPage', '@id': abs(`/lives/${live.slug}`) },
            image: abs(shareImage),
            author: { '@type': 'Person', '@id': `${site.url}/#marco`, name: site.name, url: `${site.url}/about` },
            publisher: { '@type': 'Person', '@id': `${site.url}/#marco`, name: site.name },
          },
        ],
      }
    }
    case 'club':
      return {
        title: 'The Founders Club | Application-only network for founders',
        description: `${club.lead} ${pricing.currency} ${pricing.founding.amount}/month for the first 20 founding members.`,
        path: '/founders-club',
        type: 'website',
        jsonLd: [organization],
      }
    case 'work':
      return {
        title: 'Work | Websites, AI automations and security testing | Marco Schoeman',
        description:
          'Websites, AI automations, penetration testing, Active Directory red teaming and OSINT by Marco Schoeman. Selected client work and how I work.',
        path: '/work',
        type: 'website',
        jsonLd: [person],
      }
    case 'about':
      return {
        title: 'About | Marco Schoeman',
        description:
          'Marco Schoeman is a founder and operator in South Africa. Short bio, and how to reach him on Instagram, TikTok, GitHub, LinkedIn or email.',
        path: '/about',
        type: 'website',
        jsonLd: [person],
      }
    case 'notFound':
      return {
        title: 'Page not found | Marco Schoeman',
        description: 'This page does not exist.',
        path: route.path,
        type: 'website',
        noindex: true,
        jsonLd: [],
      }
  }
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** `<script type="application/ld+json">` must not contain a literal "</" */
const jsonLd = (data: object) => JSON.stringify(data).replace(/</g, '\\u003c')

const srcset = (list: string[]) => list.join(', ')

/** Hero art preload (home only): the browser starts fetching before CSS/JS */
function heroPreload(route: Route) {
  const m = images['hero-mobile']
  const d = images['hero-desktop']
  const pick = (list: string[], w: number) => list.find((s) => s.endsWith(` ${w}w`))?.split(' ')[0] ?? list[0].split(' ')[0]
  if (route.variant === 'emblem') {
    const e = images['logo-emblem']
    return [
      `<link rel="preload" as="image" type="image/avif" href="${pick(e.avif, 960)}" imagesrcset="${srcset(e.avif)}" imagesizes="(min-width: 1024px) 48rem, 90vw" fetchpriority="high" />`,
    ]
  }
  return [
    `<link rel="preload" as="image" type="image/avif" href="${pick(m.avif, 800)}" imagesrcset="${srcset(m.avif)}" imagesizes="100vw" media="(max-width: 767px)" fetchpriority="high" />`,
    `<link rel="preload" as="image" type="image/avif" href="${pick(d.avif, 1280)}" imagesrcset="${srcset(d.avif)}" imagesizes="(min-width: 1024px) 58vw, 100vw" media="(min-width: 768px)" fetchpriority="high" />`,
  ]
}

export function headHtml(route: Route, meta: PageMeta = metaFor(route)) {
  const url = abs(meta.path)
  const image = abs(meta.image?.path ?? site.ogImage)
  const imageAlt = meta.image?.alt ?? site.ogImageAlt
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    meta.noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${meta.type}" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:image:alt" content="${esc(imageAlt)}" />`,
    '<meta property="og:locale" content="en_ZA" />',
    ...(meta.published ? [`<meta property="article:published_time" content="${meta.published}" />`] : []),
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${esc(imageAlt)}" />`,
    ...(route.id === 'home' ? heroPreload(route) : []),
    ...meta.jsonLd.map((d) => `<script type="application/ld+json">${jsonLd(d)}</script>`),
  ]
  return tags.join('\n    ')
}
