"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AnimatedText } from "@/components/ui/animated-text"
import { MessageCircle } from "lucide-react"

interface AnimatedHeroProps {
  title: string
  subtitle: string
  buttonText: string
  buttonLink: string
  imageSrc: string
  imageAlt: string
}

export function AnimatedHero({ title, subtitle, buttonText, buttonLink, imageSrc, imageAlt }: AnimatedHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    setIsLoaded(true)
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[600px] w-full">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={imageAlt || "Hero image"}
          fill
          className={`object-cover transition-transform duration-[2s] ease-out ${isLoaded ? "scale-100" : "scale-110"}`}
          priority
        />
        <div
          className={`absolute inset-0 bg-gradient-to-r from-decant-blue/90 to-decant-blue/50 flex items-center transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="decant-container">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 overflow-hidden">
                <AnimatedText text={title} delay={500} speed={30} className="block" />
              </h1>
              <p className="text-xl mb-8 overflow-hidden">
                <AnimatedText text={subtitle} delay={1200} speed={20} className="block opacity-90" />
              </p>
              <div
                className={`transition-all duration-1000 delay-[1800ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              >
                <a href={buttonLink} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-decant-gold hover:brightness-90 text-white px-8 py-6 text-lg font-medium transition-transform duration-300 hover:scale-105">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    {buttonText}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative element - Sillar pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-white opacity-20 z-10"></div>
    </section>
  )
}

