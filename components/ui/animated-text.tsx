"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  delay?: number
  speed?: number
  threshold?: number
}

export function AnimatedText({
  text,
  className,
  once = true,
  delay = 0,
  speed = 50,
  threshold = 0.1,
}: AnimatedTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsVisible(entry.isIntersecting)
      },
      { threshold },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [threshold])

  useEffect(() => {
    if (isVisible && (!once || !hasAnimated)) {
      setHasAnimated(true)
      setDisplayedText("")

      const timer = setTimeout(() => {
        let i = 0
        const interval = setInterval(() => {
          setDisplayedText(text.substring(0, i + 1))
          i++
          if (i === text.length) clearInterval(interval)
        }, speed)

        return () => clearInterval(interval)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [isVisible, text, once, hasAnimated, delay, speed])

  return (
    <span ref={elementRef} className={cn("inline-block", className)}>
      {displayedText}
      <span className="opacity-0">{text.substring(displayedText.length)}</span>
    </span>
  )
}

