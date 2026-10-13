import type { ImageKey } from './images'

export interface Credential {
  id: string
  abbr: string
  name: string
  issuer: string
  /** Optimised badge image; omit for a text monogram */
  image?: ImageKey
  badge: string
  note?: string
  verifyUrl?: string
}

export const credentials: Credential[] = [
  {
    id: 'crta',
    abbr: 'CRTA',
    name: 'Certified Red Team Analyst',
    issuer: 'Alter Solutions / RastaLabs',
    image: 'badge-crta',
    badge: 'Certified',
    verifyUrl: 'https://labs.cyberwarfare.live/credential/achievement/6a188519561ddc10b092a7b4',
  },
  {
    id: 'ctia',
    abbr: 'CTIA',
    name: 'Certified Threat Intelligence Analyst',
    issuer: 'arcX',
    image: 'badge-ctia',
    badge: 'Certified',
    verifyUrl:
      'https://arcx.io/verify-certificate?id=b6b52786e172ce68d4900675c358b2d8424fca53&k=dc339e3d240d4bb597a878ac43862614',
  },
  {
    id: 'htb',
    abbr: 'HTB',
    name: 'Pro Hacker Rank',
    issuer: 'Hack The Box',
    badge: 'Pro Hacker',
    note: 'Active rank',
  },
  {
    id: 'webdev',
    abbr: 'WD',
    name: 'Web Developer Certificate',
    issuer: 'IT Academy',
    image: 'badge-itacademy',
    badge: 'Certified',
  },
  {
    id: 'cisco-ethical-hacker',
    abbr: 'EH',
    name: 'Ethical Hacker',
    issuer: 'Cisco Networking Academy',
    image: 'badge-cisco-eh',
    badge: 'Verified',
    verifyUrl: 'https://www.credly.com/badges/77108e33-84f1-4458-917b-203c3858cd41',
  },
  {
    id: 'cisco-intro-cybersecurity',
    abbr: 'IC',
    name: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    image: 'badge-cisco-ic',
    badge: 'Verified',
    verifyUrl: 'https://www.credly.com/badges/ab7b9174-a342-480e-a97b-bb33f3268568',
  },
  {
    id: 'cisco-networking-basics',
    abbr: 'NB',
    name: 'Networking Basics',
    issuer: 'Cisco Networking Academy',
    image: 'badge-cisco-nb',
    badge: 'Verified',
    verifyUrl: 'https://www.credly.com/badges/fe714762-74bb-4c74-a2b5-5da37fa2822d',
  },
]
