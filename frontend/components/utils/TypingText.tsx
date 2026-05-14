'use client';
import { useEffect, useMemo, useState } from 'react'

type TypingTextProps = {
  words: string[]
  className?: string
}

function TypingText({ words, className }: TypingTextProps) {
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  const currentWord = useMemo(() => words[wordIndex % words.length] ?? '', [wordIndex, words])

  useEffect(() => {
    const speed = deleting ? 45 : 85
    const pause = 1300

    const timer = setTimeout(() => {
      if (!deleting && charIndex < currentWord.length) {
        setCharIndex((prev) => prev + 1)
        return
      }

      if (!deleting && charIndex === currentWord.length) {
        setTimeout(() => setDeleting(true), pause)
        return
      }

      if (deleting && charIndex > 0) {
        setCharIndex((prev) => prev - 1)
        return
      }

      if (deleting && charIndex === 0) {
        setDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [charIndex, currentWord, deleting, words.length])

  return <span className={className}>{currentWord.slice(0, charIndex)}|</span>
}

export default TypingText
