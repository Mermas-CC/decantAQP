"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down"
}

export function ParallaxSection({ children, className, speed = 0.3, direction = "up" }: ParallaxSectionProps) {
  const [offset, setOffset] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      if (!sectionRef.current) return

      const { top, height } = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate how far the section is from the center of the viewport
      const sectionCenter = top + height / 2
      const viewportCenter = windowHeight / 2
      const distanceFromCenter = sectionCenter - viewportCenter

      // Calculate the parallax offset based on the distance from center
      const parallaxOffset = distanceFromCenter * speed * (direction === "up" ? -1 : 1)

      setOffset(parallaxOffset)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed, direction])

  return (
    <div ref={sectionRef} className={cn("relative overflow-hidden", className)}>
      <div
        style={{
          transform: `translateY(${offset}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  )
}

