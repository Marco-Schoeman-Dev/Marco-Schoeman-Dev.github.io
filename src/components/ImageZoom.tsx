import { useEffect, useRef, useState, type RefObject } from 'react'

/**
 * Full-size viewer for images inside a post. Each in-post image is a link to
 * its full-size file (so it still works without JavaScript); with JS, clicking
 * it opens the file in a native <dialog> instead: Esc, the close button or a
 * click anywhere closes it, and focus returns to the image link.
 */
export function ImageZoom({ scope }: { scope: RefObject<HTMLElement | null> }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [shown, setShown] = useState<{ src: string; alt: string } | null>(null)

  useEffect(() => {
    const root = scope.current
    if (!root) return
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as Element).closest<HTMLAnchorElement>('a[data-zoom]')
      if (!link || !root.contains(link)) return
      e.preventDefault()
      setShown({ src: link.getAttribute('href')!, alt: link.querySelector('img')?.alt ?? '' })
      dialogRef.current?.showModal()
    }
    root.addEventListener('click', onClick)
    return () => root.removeEventListener('click', onClick)
  }, [scope])

  const close = () => dialogRef.current?.close()

  return (
    <dialog
      ref={dialogRef}
      aria-label={shown?.alt ? `Full size: ${shown.alt}` : 'Full size image'}
      onClose={() => setShown(null)}
      onClick={close}
      className="m-auto max-h-none max-w-none cursor-zoom-out border-0 bg-transparent p-0 backdrop:bg-bg/90 backdrop:backdrop-blur-sm"
    >
      <div className="relative flex max-h-[92svh] max-w-[96vw] flex-col items-end gap-3">
        <button type="button" onClick={close} className="btn btn-secondary btn-sm" autoFocus>
          Close
        </button>
        {shown && (
          <img
            src={shown.src}
            alt={shown.alt}
            className="max-h-[calc(92svh-3.5rem)] w-auto max-w-[96vw] rounded-[12px] border border-line object-contain"
          />
        )}
      </div>
    </dialog>
  )
}
