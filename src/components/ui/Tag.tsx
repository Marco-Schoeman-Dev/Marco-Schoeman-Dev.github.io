type TagVariant = 'default' | 'accent' | 'blue' | 'green' | 'purple'

const variants: Record<TagVariant, string> = {
  default: 'bg-surface text-ink-2 border border-line',
  accent: 'bg-accent-muted text-accent border border-accent-border',
  blue:   'bg-blue-50 text-blue-700 border border-blue-200',
  green:  'bg-emerald-50 text-emerald-700 border border-emerald-200',
  purple: 'bg-violet-50 text-violet-700 border border-violet-200',
}

interface TagProps {
  children: React.ReactNode
  variant?: TagVariant
  className?: string
}

export function Tag({ children, variant = 'default', className = '' }: TagProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
