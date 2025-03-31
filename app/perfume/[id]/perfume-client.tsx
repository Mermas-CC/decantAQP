"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, Heart, Share2, ChevronLeft, Minus, Plus, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PerfumeGrid } from "@/components/perfume-grid"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { AnimatedImage } from "@/components/ui/animated-image"
import { useState } from "react"
import { Logo } from "@/components/logo"

// Definir tipos para los datos que recibimos
interface Volume {
  size: string
  price: number
}

interface PerfumeData {
  id: string
  name: string
  brand: string
  price: number
  description: string
  longDescription: string
  category: string
  volume: string
  volumes?: Volume[]
  notes?: string[]
  images: {
    main: string
    angle1?: string
    angle2?: string
    angle3?: string
  }
  rating?: number
  reviews?: number
}

interface PerfumeClientProps {
  perfume: PerfumeData
  relatedPerfumes: PerfumeData[]
  images: string[]
}

export default function PerfumeClient({ perfume, relatedPerfumes, images }: PerfumeClientProps) {
  const [activeImage, setActiveImage] = useState<string>(perfume.images.main || images[0]); // Asegúrate de que tenga un valor inicial válido
  const [quantity, setQuantity] = useState(1)
  const [selectedVolume, setSelectedVolume] = useState<string | null>(null)

  // WhatsApp contact info
  const whatsappNumber = "+51961316339" // Reemplazar con el número real
  const whatsappMessage = `Hola, estoy interesado en el perfume ${perfume.name} de ${perfume.brand}. ¿Podrían darme más información?`
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  // Set default selected volume
  if (!selectedVolume && perfume.volumes && perfume.volumes.length > 0) {
    // Find the volume that matches the default volume in the perfume data
    const defaultVolume = perfume.volumes.find((v) => v.size === perfume.volume) || perfume.volumes[0]
    setSelectedVolume(defaultVolume.size)
  }

  // Get current price based on selected volume
  const getCurrentPrice = () => {
    if (!perfume.volumes) return perfume.price

    const volumeData = perfume.volumes.find((v) => v.size === selectedVolume)
    return volumeData ? volumeData.price : perfume.price
  }

  // Handle volume selection
  const handleVolumeSelect = (volume: string) => {
    setSelectedVolume(volume)
  }

  // Handle quantity changes
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  // Calculate total price
  const totalPrice = getCurrentPrice() * quantity

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top banner */}
      <div className="w-full bg-decant-blue text-white py-3 text-center text-sm">
        Envío gratis en compras mayores a S/199
      </div>

      {/* Header (simplified) */}
      <header className="border-b py-4 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="decant-container flex items-center justify-between">
          <Link href="/" className="flex items-center transition-transform duration-300 hover:scale-105">
            <Logo className="h-12 w-auto" />
          </Link>

          <div className="flex items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a href="tel:+51961316339" className="flex items-center gap-2 text-sm font-medium">
              <Phone className="h-4 w-4" />
              <span className="hidden md:inline">+51 999 999 999</span>
            </a>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="bg-decant-light-blue py-3">
        <div className="decant-container">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-decant-blue transition-colors duration-300">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <Link href="/" className="hover:text-decant-blue transition-colors duration-300">
              Perfumes
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/?category=${perfume.category}`}
              className="hover:text-decant-blue transition-colors duration-300"
            >
              {perfume.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-decant-blue font-medium">{perfume.name}</span>
          </div>
        </div>
      </div>

      {/* Back button (mobile only) */}
      <div className="decant-container py-4 md:hidden">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-decant-blue transition-colors duration-300"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Volver a la tienda
        </Link>
      </div>

      {/* Product Detail */}
      <section className="py-12">
        <div className="decant-container">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <ScrollReveal direction="left">
              <div className="space-y-4">
                {/* Imagen activa */}
                <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-100 shadow-md transition-all duration-500">
                  <Image
                    src={activeImage} // Usa la imagen activa
                    alt={perfume.name}
                    fill
                    className="object-contain" // Asegúrate de que la imagen se ajuste correctamente
                    unoptimized={true} // Establecer unoptimized a true
                  />
                </div>

                {/* Miniaturas */}
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, i) => (
                    <div
                      key={i}
                      className={`relative aspect-square overflow-hidden rounded-lg border cursor-pointer transition-all duration-300 ${
                        activeImage === image
                          ? "border-decant-blue"
                          : "border-gray-200 hover:border-decant-blue"
                      }`}
                      onClick={() => setActiveImage(image)} // Actualiza la imagen activa al hacer clic
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${perfume.name} - Vista ${i + 1}`}
                        fill
                        className="object-contain transition-all duration-300 hover:scale-105"
                        unoptimized={true} // Establecer unoptimized a true para todas las imágenes
                      />
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Product Info */}
            <ScrollReveal direction="right">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-serif font-bold text-decant-blue">{perfume.name}</h1>
                  <p className="text-xl text-gray-600">{perfume.brand}</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 transition-all duration-300 ${
                          i < Math.floor(perfume.rating || 0)
                            ? "fill-decant-gold text-decant-gold"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {perfume.rating} ({perfume.reviews} reseñas)
                  </span>
                </div>

                <div className="text-3xl font-bold text-decant-blue">S/ {totalPrice.toFixed(2)}</div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-serif font-medium mb-2">Volumen</h3>
                    <div className="flex gap-2">
                      {perfume.volumes?.map((volume) => (
                        <Button
                          key={volume.size}
                          variant="outline"
                          className={`transition-all duration-300 ${
                            selectedVolume === volume.size
                              ? "border-2 border-decant-blue text-decant-blue"
                              : "hover:border-decant-blue text-gray-700"
                          }`}
                          onClick={() => handleVolumeSelect(volume.size)}
                        >
                          {volume.size}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif font-medium mb-2">Cantidad</h3>
                    <div className="flex items-center border border-gray-200 rounded-md w-32">
                      <Button
                        variant="ghost"
                        className="h-10 px-3 rounded-none transition-all duration-300 hover:bg-decant-light-blue text-decant-blue"
                        onClick={decreaseQuantity}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 text-center font-medium">{quantity}</div>
                      <Button
                        variant="ghost"
                        className="h-10 px-3 rounded-none transition-all duration-300 hover:bg-decant-light-blue text-decant-blue"
                        onClick={increaseQuantity}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button className="w-full bg-green-600 hover:bg-green-700 h-12 px-8 transition-all duration-300 hover:scale-[1.02]">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Consultar por WhatsApp
                    </Button>
                  </a>
                  <Button
                    variant="outline"
                    className="h-12 px-4 transition-all duration-300 hover:scale-110 border-decant-blue text-decant-blue hover:bg-decant-light-blue"
                  >
                    <Heart className="h-5 w-5 transition-all duration-300" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 px-4 transition-all duration-300 hover:scale-110 border-decant-blue text-decant-blue hover:bg-decant-light-blue"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-serif font-medium mb-2">Descripción</h3>
                  <p className="text-gray-700">{perfume.description}</p>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-serif font-medium mb-2">Notas de Fragancia</h3>
                  <div className="flex flex-wrap gap-2">
                    {perfume.notes?.map((note) => (
                      <span
                        key={note}
                        className="bg-decant-light-blue text-decant-blue px-3 py-1 rounded-full text-sm transition-all duration-300 hover:bg-decant-blue hover:text-white hover:scale-105"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-12 bg-decant-light-blue">
        <div className="decant-container">
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger
                value="description"
                className="transition-all duration-300 data-[state=active]:bg-decant-blue data-[state=active]:text-white"
              >
                Descripción Detallada
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="transition-all duration-300 data-[state=active]:bg-decant-blue data-[state=active]:text-white"
              >
                Detalles del Producto
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="transition-all duration-300 data-[state=active]:bg-decant-blue data-[state=active]:text-white"
              >
                Reseñas
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="description"
              className="bg-white p-6 rounded-lg shadow-md transition-all duration-500 animate-fadeIn"
            >
              <ScrollReveal>
                <h3 className="text-xl font-serif font-bold text-decant-blue mb-4">
                  {perfume.name} por {perfume.brand}
                </h3>
                <p className="text-gray-700 mb-4">{perfume.longDescription}</p>
              </ScrollReveal>
            </TabsContent>
            <TabsContent
              value="details"
              className="bg-white p-6 rounded-lg shadow-md transition-all duration-500 animate-fadeIn"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <ScrollReveal>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-decant-blue mb-4">Especificaciones</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between py-2 border-b border-gray-100 transition-all duration-300 hover:bg-decant-light-blue">
                        <span className="text-gray-600">Marca</span>
                        <span className="font-medium">{perfume.brand}</span>
                      </li>
                      <li className="flex justify-between py-2 border-b border-gray-100 transition-all duration-300 hover:bg-decant-light-blue">
                        <span className="text-gray-600">Categoría</span>
                        <span className="font-medium">{perfume.category}</span>
                      </li>
                      <li className="flex justify-between py-2 border-b border-gray-100 transition-all duration-300 hover:bg-decant-light-blue">
                        <span className="text-gray-600">Volumen</span>
                        <span className="font-medium">{selectedVolume || perfume.volume}</span>
                      </li>
                      <li className="flex justify-between py-2 border-b border-gray-100 transition-all duration-300 hover:bg-decant-light-blue">
                        <span className="text-gray-600">Tipo de Fragancia</span>
                        <span className="font-medium">Eau de Parfum</span>
                      </li>
                    </ul>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={200}>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-decant-blue mb-4">Envío y Devoluciones</h3>
                    <p className="text-gray-700 mb-4">
                      Envío gratuito en pedidos superiores a S/199. Entrega en 2-3 días hábiles en Arequipa y 3-5 días
                      para el resto del Perú.
                    </p>
                    <p className="text-gray-700">
                      Devoluciones gratuitas dentro de los 30 días posteriores a la recepción si el producto está en
                      perfectas condiciones.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </TabsContent>
            <TabsContent
              value="reviews"
              className="bg-white p-6 rounded-lg shadow-md transition-all duration-500 animate-fadeIn"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif font-bold text-decant-blue">Reseñas de Clientes</h3>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="transition-all duration-300 hover:scale-105 bg-green-600 hover:bg-green-700">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contactar por WhatsApp
                  </Button>
                </a>
              </div>
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <ScrollReveal key={i} delay={i * 150}>
                    <div className="border-b border-gray-100 pb-6">
                      <div className="flex justify-between mb-2">
                        <div className="font-medium">Cliente {i}</div>
                        <div className="text-gray-500 text-sm">Hace {i} días</div>
                      </div>
                      <div className="flex mb-2">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star
                            key={j}
                            className={`w-4 h-4 ${j < 5 - (i % 2) ? "fill-decant-gold text-decant-gold" : "fill-gray-200 text-gray-200"}`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies
                        tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Products */}
      <PerfumeGrid
        perfumes={relatedPerfumes}
        title="También te puede interesar"
        subtitle="Otros perfumes similares que podrían gustarte"
        whatsappNumber={whatsappNumber}
      />

      {/* Footer (simplified) */}
      <footer className="bg-decant-blue text-white py-8">
        <div className="decant-container text-center">
          <Logo className="h-12 w-auto mx-auto mb-4" isWhite />
          <p className="text-sm text-white/80">© 2024 DecantAQP. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition-all duration-300 hover:scale-110 hover:bg-green-700"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}


