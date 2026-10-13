import { credentials } from './credentials'

export interface Stat {
  value: string
  label: string
}

export const stats: Stat[] = [
  { value: '30+', label: 'Projects worked on' },
  { value: String(credentials.length).padStart(2, '0'), label: 'Certifications' },
]
