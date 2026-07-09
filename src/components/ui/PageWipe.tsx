import { useEffect, useState } from 'react'

export function PageWipe() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1200)
    return () => clearTimeout(t)
  }, [])

  if (!visible) return null

  return <div className="page-wipe" aria-hidden="true" />
}
