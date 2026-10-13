interface SectionLabelProps {
  index: string
  name: string
  kana: string
  className?: string
}

/** `// 01 / WORK  プロジェクト`, katakana is decorative. */
export function SectionLabel({ index, name, kana, className = '' }: SectionLabelProps) {
  return (
    <p className={`label flex flex-wrap items-baseline gap-x-4 gap-y-1 ${className}`}>
      <span className="text-ember">
        {'// '}
        {index} <span className="text-muted">/</span> {name}
      </span>
      <span className="kana text-xs" aria-hidden="true" lang="ja">
        {kana}
      </span>
    </p>
  )
}
