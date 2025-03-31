"use client"

import Link from "next/link"
import { Star, Heart, MessageCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AnimatedImage } from "@/components/ui/animated-image"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface Volume {
  size: string
  price: number
}

interface PerfumeCardProps {
  id: string
  name: string
  brand: string
  price: number
  description: string
  category: string
  images: {
    main: string
    angle1?: string
    angle2?: string
    angle3?: string
  }
  volumes?: Volume[]
  featured?: boolean
  new?: boolean
  rating?: number
  reviews?: number
  delay?: number
  whatsappNumber?: string
}

export function PerfumeCard({
  id,
  name,
  brand,
  price,
  description,
  category,
  images,
  volumes,
  featured = false,
  new: isNew = false,
  rating = 0,
  reviews = 0,
  delay = 0,
  whatsappNumber = "+51961316339",
}: PerfumeCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  // Get the lowest price if volumes are available
  const getLowestPrice = () => {
    if (!volumes || volumes.length === 0) return price

    return volumes.reduce((min, volume) => (volume.price < min ? volume.price : min), volumes[0].price)
  }

  const displayPrice = getLowestPrice()
  const hasMultiplePrices = volumes && volumes.length > 1

  const whatsappMessage = `Hola, estoy interesado en el perfume ${name} de ${brand}. ¿Podrían darme más información?`
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  // Determine animation delay class
  const getDelayClass = () => {
    if (delay === 0) return "animate-fade-in-up"
    if (delay <= 100) return "animate-fade-in-up-delay-100"
    if (delay <= 200) return "animate-fade-in-up-delay-200"
    if (delay <= 300) return "animate-fade-in-up-delay-300"
    if (delay <= 400) return "animate-fade-in-up-delay-400"
    if (delay <= 500) return "animate-fade-in-up-delay-500"
    if (delay <= 600) return "animate-fade-in-up-delay-600"
    return "animate-fade-in-up-delay-700"
  }

  return (
    <div
      className={cn(
        "group relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 border border-gray-100",
        isHovered ? "shadow-xl scale-[1.02] z-10" : "hover:shadow-lg",
        getDelayClass(),
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/perfume/${id}`} className="block">
        <div className="relative h-64 w-full overflow-hidden bg-gray-100">
          {/* Asegúrate de que el contenedor tenga un tamaño definido */}
          <Image
            src={images.main} // Asegúrate de que `images.main` tenga un valor válido
            alt={name}
            layout="fill" // Usa layout="fill" para que la imagen ocupe todo el contenedor
            className="object-cover" // Ajusta la imagen para que se adapte al contenedor
            unoptimized={true} // Establecer unoptimized a true para imágenes locales
            onLoadingComplete={() => {
              console.log(`Imagen cargada: ${images.main}`); // Depuración
            }}
          />
        </div>
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {featured && <Badge className="bg-decant-blue text-white opacity-90">Destacado</Badge>}
          {isNew && <Badge className="bg-decant-gold text-white opacity-90">Nuevo</Badge>}
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm text-decant-blue">
            {category}
          </Badge>
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/perfume/${id}`} className="block">
          <h3 className="text-sm text-gray-500 mb-1 transition-colors duration-300 group-hover:text-gray-700">
            {brand}
          </h3>
          <h2 className="font-serif font-bold text-lg mb-1 transition-colors duration-300 group-hover:text-decant-blue">
            {name}
          </h2>
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 transition-all duration-300 ${
                  i < Math.floor(rating) ? "fill-decant-gold text-decant-gold" : "fill-gray-200 text-gray-200"
                } ${isHovered && i < Math.floor(rating) ? "scale-110" : ""}`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1 transition-opacity duration-300 group-hover:opacity-100">
              ({reviews})
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 transition-colors duration-300 group-hover:text-gray-800">
            {description}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg transition-all duration-300 group-hover:text-decant-blue group-hover:scale-105">
              {hasMultiplePrices ? "Desde " : ""}S/ {displayPrice.toFixed(2)}
            </span>
          </div>
        </Link>
        <div className="mt-3 flex gap-2">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button
              className={cn(
                "w-full transition-all duration-300 ease-in-out flex items-center justify-center",
                "bg-green-600 hover:bg-green-700 text-white",
              )}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Consultar
            </Button>
          </a>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "transition-all duration-300 border-decant-blue",
              isFavorite ? "text-decant-gold border-decant-gold bg-decant-light-blue" : "",
            )}
            onClick={(e) => {
              e.preventDefault()
              setIsFavorite(!isFavorite)
            }}
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-all duration-300",
                isFavorite ? "fill-decant-gold text-decant-gold scale-110" : "",
              )}
            />
          </Button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-fade-in-up-delay-100 { animation: fadeInUp 0.6s ease-out forwards 0.1s; }
        .animate-fade-in-up-delay-200 { animation: fadeInUp 0.6s ease-out forwards 0.2s; }
        .animate-fade-in-up-delay-300 { animation: fadeInUp 0.6s ease-out forwards 0.3s; }
        .animate-fade-in-up-delay-400 { animation: fadeInUp 0.6s ease-out forwards 0.4s; }
        .animate-fade-in-up-delay-500 { animation: fadeInUp 0.6s ease-out forwards 0.5s; }
        .animate-fade-in-up-delay-600 { animation: fadeInUp 0.6s ease-out forwards 0.6s; }
        .animate-fade-in-up-delay-700 { animation: fadeInUp 0.6s ease-out forwards 0.7s; }
      `}</style>
    </div>
  )
}


