import type { ReactNode } from 'react'
import { KineticHeading } from './KineticHeading'
import { SectionLabel } from './SectionLabel'

interface PageHeaderProps {
  /** Eyebrow, e.g. { index: '00', name: 'Lives' } */
  eyebrow: { index: string; name: string }
  /** Plain-text title for assistive tech */
  label: string
  /** Visible (animated) title; may contain one <Accent> word */
  title: ReactNode
  lead?: ReactNode
  children?: ReactNode
}

/**
 * Title block for inner pages. id="top" so "Back to top" lands here and the
 * pre-JS hide rule in motion.css (#top h1) stops the title flashing before
 * its entrance runs.
 */
export function PageHeader({ eyebrow, label, title, lead, children }: PageHeaderProps) {
  return (
    <section
      id="top"
      aria-labelledby="page-title"
      className="relative overflow-hidden pt-[calc(var(--header-h)+clamp(3rem,9vw,7rem))] pb-[clamp(3rem,8vw,6rem)]"
    >
      <div className="sunset-glow" aria-hidden="true" />
      <div className="halftone top-0 right-0 h-full w-1/2 [--ht-mask:linear-gradient(225deg,#000,transparent_65%)]" aria-hidden="true" />
      <div className="shell relative">
        <SectionLabel index={eyebrow.index} name={eyebrow.name} className="mb-6" />
        <KineticHeading as="h1" id="page-title" trigger="load" delay={0.1} label={label} className="page-title text-ink">
          {title}
        </KineticHeading>
        {lead && <div className="lead mt-8 max-w-[52ch]">{lead}</div>}
        {children && <div className="mt-10 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  )
}
