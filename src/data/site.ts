// ─── Site-wide content ────────────────────────────────────────────────────────
// All copy lives in src/data/*. Edit content here, not in components.
// Voice: deadpan, observational, logical, short. No hype words.

export const site = {
  name: 'Marco Schoeman',
  url: 'https://marcoschoeman.com',
  role: 'Founder · Operator · Builder',
  location: 'South Africa',
  email: 'marcoschoeman1988@gmail.com',
  handle: '@marco_founder',
  year: 2026,
  club: 'The Founders Club',
  /** Shared social preview image (brand kit) */
  ogImage: '/images/brand/og-image-1200x630.png',
  ogImageAlt: 'Marco Schoeman logo',
}

export interface SocialLink {
  id: 'instagram' | 'tiktok' | 'github' | 'linkedin'
  label: string
  href: string
}

export const socials: SocialLink[] = [
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/marco_founder/' },
  { id: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@marco_founder' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/Marco-Schoeman-Dev' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/marco-schoeman-24421414a/' },
]

export const socialById = (id: SocialLink['id']) => socials.find((s) => s.id === id)!

/** Opens a DM thread directly (falls back to the profile if not logged in) */
export const instagramDm = 'https://ig.me/m/marco_founder'

export interface NavItem {
  id: string
  label: string
  href: string
}

/** Shared header / menu / footer navigation */
export const nav: NavItem[] = [
  { id: 'lives', label: 'Lives', href: '/lives' },
  { id: 'club', label: 'The Founders Club', href: '/founders-club' },
  { id: 'work', label: 'Work', href: '/work' },
  { id: 'about', label: 'About', href: '/about' },
]

/** Primary header button */
export const applyHref = '/founders-club'

export const hero = {
  /** One-line positioning under the name */
  offer: 'Founder of The Founders Club',
  intro:
    'I run businesses, build the systems behind them and talk through it live. Mostly so other founders can make cheaper mistakes.',
  marquee: ['Founder', 'Operator', 'Builder', 'The Founders Club'],
  imageAlt:
    'Illustrated portrait of Marco in headphones and orange-mirrored sunglasses at his desk, a sunset city skyline behind him.',
}

export const homeLives = {
  title: 'Recent Lives',
  intro:
    'I go live, work through one business problem, then write it up properly. Because nobody remembers anything from a livestream.',
}

export const homeClub = {
  intro:
    'An application-only network for business owners, C-suite and content creators. Weekly calls, one-on-one sessions and a chat where nobody is selling a course.',
  price: 'USD $30/month for the first 20 founding members.',
}

export const homeWork = {
  intro:
    'Websites, AI automations and security testing, for businesses that would rather not find out the hard way.',
}

export const about = {
  paragraphs: [
    'I am a founder and operator based in South Africa. I run businesses, build the software behind them and test its security, usually in that order.',
    'I go live to work through one business problem at a time. Afterwards each one becomes a post on this site, so the useful part outlives the stream.',
    'The Founders Club is the private version: a small group of founders, executives and creators comparing what actually works.',
    'Before all of that I was a developer, then I moved into offensive security. The second part explains the trust issues.',
  ],
  avatarAlt: 'Marco Schoeman',
}

/** Condensed bio on the Work page */
export const workIntro = [
  'I build full-stack web applications and test systems for security weaknesses, sometimes on the same day. React, TypeScript, Node.js and API automation on one side; web app pentesting and Active Directory red teaming on the other.',
  'Knowing how things get attacked changes how I build them. The result is software that is fast, tidy and harder to break.',
]

export const contact = {
  lead: 'DM me what you are building, or what you would like tested. I reply within 48 hours, which is faster than most agencies send a proposal.',
}

export const disclaimer = 'General information, not legal or financial advice.'
