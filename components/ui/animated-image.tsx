"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface AnimatedImageProps extends Omit<React.ComponentProps<typeof Image>, "onLoad"> {
  animationDuration?: number
  animationDelay?: number
  containerClassName?: string
  unoptimized?: boolean
}

export function AnimatedImage({
  animationDuration = 500,
  animationDelay = 0,
  containerClassName,
  className,
  alt,
  ...props
}: AnimatedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, animationDelay)

    return () => clearTimeout(timer)
  }, [animationDelay])

  return (
    <div className={cn("overflow-hidden relative", containerClassName)}>
      <Image
        alt={alt || ""}
        className={cn(
          "transition-all duration-700 ease-in-out",
          isLoaded ? "scale-100 blur-0" : "scale-110 blur-sm",
          className,
        )}
        onLoadingComplete={() => setIsLoaded(true)}
        unoptimized={props.unoptimized}
        {...props}
      />
    </div>
  )
}

