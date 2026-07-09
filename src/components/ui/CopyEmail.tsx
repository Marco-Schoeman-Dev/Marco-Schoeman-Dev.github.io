import { useState } from 'react'
import { IconCopy, IconCheck } from './Icons'

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // Fallback for browsers without clipboard API
      const el = document.createElement('textarea')
      el.value = email
      el.style.cssText = 'position:fixed;opacity:0'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-lg border border-line bg-surface hover:border-accent hover:bg-accent-muted text-ink font-medium transition-all duration-200 cursor-pointer"
      aria-label={copied ? 'Email copied' : 'Copy email address'}
      title={copied ? 'Copied!' : 'Click to copy'}
    >
      <span className="text-base">{email}</span>
      <span className={`transition-colors duration-200 ${copied ? 'text-accent' : 'text-ink-3 group-hover:text-accent'}`}>
        {copied ? <IconCheck /> : <IconCopy />}
      </span>
    </button>
  )
}
