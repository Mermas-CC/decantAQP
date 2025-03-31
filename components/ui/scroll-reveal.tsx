"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  distance?: number
  once?: boolean
  threshold?: number
}

export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 700,
  distance = 50,
  once = true,
  threshold = 0.1,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) setHasAnimated(true)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold },
    )

    const currentRef = ref.current
    if (currentRef) observer.observe(currentRef)

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [once, threshold])

  const getTransform = () => {
    if (!isVisible && (!once || !hasAnimated)) {
      switch (direction) {
        case "up":
          return `translateY(${distance}px)`
        case "down":
          return `translateY(-${distance}px)`
        case "left":
          return `translateX(${distance}px)`
        case "right":
          return `translateX(-${distance}px)`
        default:
          return `translateY(${distance}px)`
      }
    }
    return "translate(0, 0)"
  }

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        transform: getTransform(),
        opacity: isVisible || (once && hasAnimated) ? 1 : 0,
        transition: `transform ${duration}ms ease-out ${delay}ms, opacity ${duration}ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

