import { useEffect, useState } from 'react'

const ROLES = ['Web Developer', 'Red Team Operator']
const TYPE_MS = 75
const DELETE_MS = 40
const PAUSE_MS = 2400

export function useTypewriter() {
  const [text, setText] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const target = ROLES[roleIdx]

    const delay = isDeleting
      ? DELETE_MS
      : text.length === target.length
        ? PAUSE_MS
        : TYPE_MS

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < target.length) {
          setText(target.slice(0, text.length + 1))
        } else {
          setIsDeleting(true)
        }
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1))
        } else {
          setIsDeleting(false)
          setRoleIdx((i) => (i + 1) % ROLES.length)
        }
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [text, isDeleting, roleIdx])

  return { text, isDeleting }
}
