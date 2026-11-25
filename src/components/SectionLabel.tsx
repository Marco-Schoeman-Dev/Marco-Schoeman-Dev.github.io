interface SectionLabelProps {
  index: string
  name: string
  className?: string
}

/** Mono eyebrow: `// 01 / Lives` */
export function SectionLabel({ index, name, className = '' }: SectionLabelProps) {
  return (
    <p className={`label text-ember ${className}`}>
      {'// '}
      {index} <span className="text-muted">/</span> {name}
    </p>
  )
}
