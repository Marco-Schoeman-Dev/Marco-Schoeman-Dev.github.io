import type { JSX } from 'react'
import type { SocialLink } from '../data/site'
import { IconGithub, IconInstagram, IconLinkedin, IconTiktok, type IconProps } from './Icons'

export const socialIcon: Record<SocialLink['id'], (p: IconProps) => JSX.Element> = {
  instagram: IconInstagram,
  tiktok: IconTiktok,
  github: IconGithub,
  linkedin: IconLinkedin,
}
