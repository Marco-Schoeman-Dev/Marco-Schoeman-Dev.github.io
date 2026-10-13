// ─── Site-wide content ────────────────────────────────────────────────────────
// All copy lives in src/data/*. Edit content here, not in components.

export const site = {
  name: 'Marco Schoeman',
  role: 'Founder · Web developer · Tech operator',
  location: 'South Africa',
  email: 'marcoschoeman1988@gmail.com',
  handle: '@marco_founder',
  year: 2026,
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
  kana: string
}

/** Full-screen menu, numbered 01–04 */
export const menu: NavItem[] = [
  { id: 'about', label: 'About', href: '#about', kana: 'プロフィール' },
  { id: 'work', label: 'Work', href: '#work', kana: 'プロジェクト' },
  { id: 'services', label: 'Services', href: '#services', kana: 'サービス' },
  { id: 'contact', label: 'Contact', href: '#contact', kana: 'コンタクト' },
]

/** Inline header links (desktop) */
export const headerLinks = menu.filter((m) => m.id !== 'contact')

export const hero = {
  /** Plain-language offer, the first thing a visitor from social needs */
  offer: ['Websites', 'AI automations', 'Penetration testing'],
  intro:
    "Clean code and a real attacker's perspective. Building secure, well-engineered software, and testing its limits.",
  marquee: ['Marco Schoeman', `Portfolio ${site.year}`, 'ウェブ開発'],
  imageAlt:
    'Illustrated portrait of Marco in headphones and orange-mirrored sunglasses at his desk, a sunset city skyline behind him.',
}

export const about = {
  paragraphs: [
    'I build fullstack web applications and break into systems for a living, sometimes both on the same day. My background spans React, TypeScript, Node.js, and API automation, combined with hands-on offensive security: web app pentesting, Active Directory attacks, and red team operations.',
    "Moving from development into offensive security changed how I write code. I don't just think about what a feature should do; I think about how an attacker would abuse it. That shift makes the software I ship more resilient, not just functional.",
    'Based in South Africa, available for remote work and consulting worldwide.',
  ],
  avatarAlt: 'Illustrated avatar of Marco in headphones and orange-mirrored sunglasses.',
}

export const contact = {
  title: 'Build it. Break it.',
  lead: 'The fastest way to reach me is a DM. Tell me what you are building, or what you want broken, and I will take it from there.',
  replyNote: 'I reply within 48 hours.',
}
