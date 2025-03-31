"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

interface Brand {
  name: string
  image: string
  count?: number
}

interface BrandCarouselProps {
  brands: Brand[]
  title: string
  autoplay?: boolean
  speed?: number
}

export function BrandCarousel({ brands, title, autoplay = true, speed = 3000 }: BrandCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const nextBrand = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % brands.length)
  }

  const prevBrand = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + brands.length) % brands.length)
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    if (autoplay && !isHovered) {
      timerRef.current = setInterval(nextBrand, speed)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [autoplay, isHovered, speed])

  // Create a duplicate array for infinite scrolling effect
  const displayBrands = [...brands, ...brands.slice(0, 6)]

  return (
    <section className="py-16 bg-white">
      <div className="decant-container">
        <ScrollReveal>
          <h2 className="text-3xl font-serif font-bold text-center text-decant-blue mb-2">{title}</h2>
          <div className="h-1 w-20 bg-decant-gold mx-auto mb-12"></div>
        </ScrollReveal>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / brands.length)}%)`,
            }}
          >
            {displayBrands.map((brand, index) => (
              <div key={`${brand.name}-${index}`} className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 px-3">
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-32 transition-all duration-300 hover:shadow-lg hover:scale-105 border border-gray-100">
                  <Image
                    src={brand.image || "/placeholder.svg"}
                    alt={brand.name}
                    width={120}
                    height={80}
                    className="object-contain transition-all duration-300 hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={prevBrand}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-decant-blue p-2 rounded-full shadow-md z-10 transition-all duration-300 hover:scale-110"
            aria-label="Marca anterior"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={nextBrand}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-decant-blue p-2 rounded-full shadow-md z-10 transition-all duration-300 hover:scale-110"
            aria-label="Marca siguiente"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

