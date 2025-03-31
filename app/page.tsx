"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, ChevronDown, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PerfumeGrid } from "@/components/perfume-grid"
import { AnimatedHero } from "@/components/animated-hero"
import { BrandCarousel } from "@/components/brand-carousel"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ParallaxSection } from "@/components/ui/parallax-section"
import { AnimatedImage } from "@/components/ui/animated-image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import perfumesData from "@/data/perfumes.json"
import { Logo } from "@/components/logo"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPerfumes, setFilteredPerfumes] = useState(perfumesData)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeBrand, setActiveBrand] = useState<string | null>(null)

  // Get category from URL params
  const categoryParam = searchParams.get("category")
  const brandParam = searchParams.get("brand")

  // Filter perfumes based on URL parameters
  useEffect(() => {
    let filtered = perfumesData

    // Apply category filter
    if (categoryParam) {
      filtered = filtered.filter((perfume) => perfume.category.toLowerCase() === categoryParam.toLowerCase())
      setActiveCategory(categoryParam)
    } else {
      setActiveCategory(null)
    }

    // Apply brand filter
    if (brandParam) {
      filtered = filtered.filter((perfume) => perfume.brand.toLowerCase() === brandParam.toLowerCase())
      setActiveBrand(brandParam)
    } else {
      setActiveBrand(null)
    }

    // Apply search filter if there's a search term
    if (searchTerm) {
      filtered = filtered.filter(
        (perfume) =>
          perfume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          perfume.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          perfume.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredPerfumes(filtered)
  }, [categoryParam, brandParam, searchTerm])

  // Handle search input
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const search = formData.get("search") as string
    setSearchTerm(search)
  }

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    router.push(`/?category=${category.toLowerCase()}`)
    setMobileMenuOpen(false)
  }

  // Handle brand selection
  const handleBrandSelect = (brand: string) => {
    router.push(`/?brand=${encodeURIComponent(brand.toLowerCase())}`)
    setMobileMenuOpen(false)
  }

  // Clear all filters
  const clearFilters = () => {
    router.push("/")
    setSearchTerm("")
    setActiveCategory(null)
    setActiveBrand(null)
  }

  // Get featured and new perfumes from filtered list
  const featuredPerfumes = filteredPerfumes.filter((perfume) => perfume.featured)
  const newPerfumes = filteredPerfumes.filter((perfume) => perfume.new)

  // Agrupar perfumes por marca
  const perfumesByBrand = perfumesData.reduce(
    (acc, perfume) => {
      if (!acc[perfume.brand]) {
        acc[perfume.brand] = []
      }
      acc[perfume.brand].push(perfume)
      return acc
    },
    {} as Record<string, typeof perfumesData>,
  )

  // Obtener marcas únicas
  const brands = Object.keys(perfumesByBrand).map((brand) => ({
    name: brand,
    image: `/placeholder.svg?height=80&width=120&text=${brand.replace(/\s+/g, "+")}`,
    count: perfumesByBrand[brand].length,
  }))

  // Número de WhatsApp para contacto
  const whatsappNumber = "+51961316339" // Número de WhatsApp actualizado
  const whatsappMessage = "Hola, estoy interesado en conocer más sobre sus perfumes."
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top banner */}
      <div className="w-full bg-[hsl(var(--decant-blue))] text-white py-3 text-center text-sm">
        <span className="mr-2">Envío gratis en compras mayores a S/199</span>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[hsl(var(--decant-gold))] transition-colors"
        >
          Contáctanos
        </a>
      </div>

      {/* Header */}
      <header className="border-b py-4 sticky top-0 bg-white/95 backdrop-blur-sm z-50 transition-all duration-300 hover:bg-white">
        <div className="decant-container flex items-center justify-between">
          <Link href="/" className="flex items-center transition-transform duration-300 hover:scale-105">
            <Logo className="h-10 md:h-12 w-auto" />
          </Link>

          <div className="flex-1 max-w-xl mx-2 md:mx-4 hidden sm:block">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Input
                  type="text"
                  name="search"
                  placeholder="Buscar perfumes..."
                  className="w-full border rounded-md pl-4 pr-10 py-2 transition-all duration-300 focus:ring-2 focus:ring-[hsl(var(--decant-blue))]/20 focus:border-[hsl(var(--decant-blue))]"
                  defaultValue={searchTerm}
                />
                <Button
                  type="submit"
                  variant="default"
                  size="icon"
                  className="absolute right-0 top-0 h-full rounded-l-none bg-[hsl(var(--decant-blue))] hover:bg-[hsl(var(--decant-dark-blue))] transition-all duration-300"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </form>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 md:gap-2 text-xs md:text-sm font-medium bg-green-600 hover:bg-green-700 text-white px-2 md:px-4 py-2 rounded-md transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden xs:inline">WhatsApp</span>
            </a>
            <a href="tel:+51999999999" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm font-medium">
              <Phone className="h-4 w-4" />
              <span className="hidden md:inline">+51 999 999 999</span>
            </a>
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              onClick={() => document.querySelector('input[type="text"]')?.focus()}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search (visible only on small screens) */}
        <div className="sm:hidden pt-2 px-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Input
                type="text"
                name="search"
                placeholder="Buscar perfumes..."
                className="w-full border rounded-md pl-4 pr-10 py-2 text-sm"
                defaultValue={searchTerm}
              />
              <Button
                type="submit"
                variant="default"
                size="icon"
                className="absolute right-0 top-0 h-full rounded-l-none bg-[hsl(var(--decant-blue))] hover:bg-[hsl(var(--decant-dark-blue))]"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-[hsl(var(--decant-blue))] text-white sticky top-[73px] z-40">
        <div className="decant-container">
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="flex items-center justify-between text-sm font-medium whitespace-nowrap">
              <li
                className={`py-3 px-4 hover:bg-[hsl(var(--decant-dark-blue))] cursor-pointer transition-colors duration-300 ${!activeCategory && !activeBrand ? "bg-[hsl(var(--decant-dark-blue))]" : ""}`}
              >
                <button onClick={clearFilters}>TODOS</button>
              </li>
              <li
                className={`py-3 px-4 hover:bg-[hsl(var(--decant-dark-blue))] cursor-pointer transition-colors duration-300 ${activeCategory === "hombre" ? "bg-[hsl(var(--decant-dark-blue))]" : ""}`}
              >
                <button onClick={() => handleCategorySelect("hombre")}>HOMBRE</button>
              </li>
              <li
                className={`py-3 px-4 hover:bg-[hsl(var(--decant-dark-blue))] cursor-pointer transition-colors duration-300 ${activeCategory === "mujer" ? "bg-[hsl(var(--decant-dark-blue))]" : ""}`}
              >
                <button onClick={() => handleCategorySelect("mujer")}>MUJER</button>
              </li>
              <li
                className={`py-3 px-4 hover:bg-[hsl(var(--decant-dark-blue))] cursor-pointer transition-colors duration-300 ${activeCategory === "unisex" ? "bg-[hsl(var(--decant-dark-blue))]" : ""}`}
              >
                <button onClick={() => handleCategorySelect("unisex")}>UNISEX</button>
              </li>
              <li className="py-3 px-4 hover:bg-[hsl(var(--decant-dark-blue))] cursor-pointer transition-colors duration-300">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center focus:outline-none">
                    MARCAS <ChevronDown className="h-4 w-4 ml-1" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white text-[hsl(var(--decant-blue))] rounded-md shadow-lg p-2 w-48">
                    {brands.map((brand) => (
                      <DropdownMenuItem
                        key={brand.name}
                        className={`cursor-pointer hover:bg-[hsl(var(--decant-light-blue))] rounded-sm p-2 ${
                          activeBrand === brand.name.toLowerCase() ? "bg-[hsl(var(--decant-light-blue))]" : ""
                        }`}
                        onClick={() => handleBrandSelect(brand.name)}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span>{brand.name}</span>
                          <span className="text-xs bg-[hsl(var(--decant-light-blue))] px-2 py-1 rounded-full">
                            {brand.count}
                          </span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li
                className={`py-3 px-4 hover:bg-[hsl(var(--decant-dark-blue))] cursor-pointer transition-colors duration-300`}
              >
                <button onClick={() => router.push("/?new=true")}>NOVEDADES</button>
              </li>
              <li className="py-3 px-4 bg-[hsl(var(--decant-gold))] hover:brightness-90 cursor-pointer transition-colors duration-300">
                <button onClick={() => router.push("/?sale=true")}>OFERTAS</button>
              </li>
            </ul>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex justify-between items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="py-3 px-4 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Ofertas button always visible */}
            <div className="py-3 px-4 bg-[hsl(var(--decant-gold))] hover:brightness-90">
              <button onClick={() => router.push("/?sale=true")}>OFERTAS</button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-[hsl(var(--decant-dark-blue))] animate-fadeIn">
              <div className="py-2">
                <button
                  onClick={clearFilters}
                  className={`block w-full text-left py-2 px-4 hover:bg-[hsl(var(--decant-blue))] ${!activeCategory && !activeBrand ? "bg-[hsl(var(--decant-blue))]" : ""}`}
                >
                  TODOS
                </button>
                <button
                  onClick={() => handleCategorySelect("hombre")}
                  className={`block w-full text-left py-2 px-4 hover:bg-[hsl(var(--decant-blue))] ${activeCategory === "hombre" ? "bg-[hsl(var(--decant-blue))]" : ""}`}
                >
                  HOMBRE
                </button>
                <button
                  onClick={() => handleCategorySelect("mujer")}
                  className={`block w-full text-left py-2 px-4 hover:bg-[hsl(var(--decant-blue))] ${activeCategory === "mujer" ? "bg-[hsl(var(--decant-blue))]" : ""}`}
                >
                  MUJER
                </button>
                <button
                  onClick={() => handleCategorySelect("unisex")}
                  className={`block w-full text-left py-2 px-4 hover:bg-[hsl(var(--decant-blue))] ${activeCategory === "unisex" ? "bg-[hsl(var(--decant-blue))]" : ""}`}
                >
                  UNISEX
                </button>
                <button
                  onClick={() => router.push("/?new=true")}
                  className="block w-full text-left py-2 px-4 hover:bg-[hsl(var(--decant-blue))]"
                >
                  NOVEDADES
                </button>

                <div className="py-2 px-4">
                  <div className="font-medium mb-2">MARCAS</div>
                  <div className="ml-2 grid grid-cols-2 gap-2">
                    {brands.map((brand) => (
                      <button
                        key={brand.name}
                        onClick={() => handleBrandSelect(brand.name)}
                        className={`flex items-center text-sm py-1 hover:text-[hsl(var(--decant-gold))] ${
                          activeBrand === brand.name.toLowerCase() ? "text-[hsl(var(--decant-gold))]" : ""
                        }`}
                      >
                        <span>{brand.name}</span>
                        <span className="ml-1 text-xs bg-[hsl(var(--decant-light-blue))] text-[hsl(var(--decant-blue))] px-2 py-0.5 rounded-full">
                          {brand.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Active Filters */}
      {(activeCategory || activeBrand || searchTerm) && (
        <div className="bg-gray-100 py-3">
          <div className="decant-container">
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-sm text-gray-600">Filtros activos:</span>

              {activeCategory && (
                <div className="bg-white px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow-sm">
                  <span>Categoría: {activeCategory}</span>
                  <button
                    onClick={() => router.push(activeBrand ? `/?brand=${activeBrand}` : "/")}
                    className="ml-1 text-gray-500 hover:text-decant-blue"
                  >
                    ×
                  </button>
                </div>
              )}

              {activeBrand && (
                <div className="bg-white px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow-sm">
                  <span>Marca: {activeBrand}</span>
                  <button
                    onClick={() => router.push(activeCategory ? `/?category=${activeCategory}` : "/")}
                    className="ml-1 text-gray-500 hover:text-decant-blue"
                  >
                    ×
                  </button>
                </div>
              )}

              {searchTerm && (
                <div className="bg-white px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow-sm">
                  <span>Búsqueda: {searchTerm}</span>
                  <button onClick={() => setSearchTerm("")} className="ml-1 text-gray-500 hover:text-decant-blue">
                    ×
                  </button>
                </div>
              )}

              <button onClick={clearFilters} className="text-sm text-decant-blue hover:underline ml-auto">
                Limpiar todos
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No results message */}
      {filteredPerfumes.length === 0 && (
        <div className="py-16 text-center">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-serif font-bold text-decant-blue mb-4">No se encontraron resultados</h2>
            <p className="text-gray-600 mb-8">
              No hemos encontrado perfumes que coincidan con tu búsqueda. Intenta con otros filtros o términos de
              búsqueda.
            </p>
            <Button onClick={clearFilters} className="bg-decant-blue hover:bg-decant-dark-blue">
              Ver todos los perfumes
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section - Only show if no filters are active */}
      {!activeCategory && !activeBrand && !searchTerm && (
        <AnimatedHero
          title="Fragancias Exclusivas de Arequipa para el Mundo"
          subtitle="Descubre el arte de la perfumería en DecantAQP, donde cada gota cuenta una historia"
          buttonText="CONTÁCTANOS POR WHATSAPP"
          buttonLink={whatsappUrl}
          imageSrc="/placeholder.svg?height=500&width=1920&text=DecantAQP+-+Perfumes+Exclusivos"
          imageAlt="DecantAQP - Perfumes Exclusivos"
        />
      )}

      {/* Featured Perfumes - Only show if we have featured perfumes and no specific filters */}
      {featuredPerfumes.length > 0 && !activeCategory && !activeBrand && !searchTerm && (
        <div id="todos">
          <PerfumeGrid
            perfumes={featuredPerfumes}
            title="Perfumes Destacados"
            subtitle="Nuestra selección de fragancias más exclusivas"
            whatsappNumber={whatsappNumber}
          />
        </div>
      )}

      {/* Main Perfume Grid - Always show with appropriate title */}
      <PerfumeGrid
        perfumes={filteredPerfumes}
        title={
          activeCategory
            ? `Perfumes para ${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}`
            : activeBrand
              ? `Perfumes ${activeBrand.charAt(0).toUpperCase() + activeBrand.slice(1)}`
              : searchTerm
                ? `Resultados para "${searchTerm}"`
                : "Todos los Perfumes"
        }
        subtitle={
          filteredPerfumes.length > 0
            ? `Mostrando ${filteredPerfumes.length} ${filteredPerfumes.length === 1 ? "perfume" : "perfumes"}`
            : ""
        }
        whatsappNumber={whatsappNumber}
      />

      {/* About Section - Only show if no filters are active */}
      {!activeCategory && !activeBrand && !searchTerm && (
        <section className="py-16 bg-[hsl(var(--decant-light-blue))]">
          <div className="decant-container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <ScrollReveal direction="left">
                <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/placeholder.svg?height=400&width=600&text=DecantAQP+Arequipa"
                    alt="DecantAQP en Arequipa"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--decant-blue))]/70 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-xl font-serif font-bold">Nacidos en la Ciudad Blanca</h3>
                      <p className="mt-2">Arequipa, Perú</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <div className="space-y-6">
                  <h2 className="text-3xl font-serif font-bold text-[hsl(var(--decant-blue))]">Nuestra Historia</h2>
                  <div className="h-1 w-20 bg-[hsl(var(--decant-gold))]"></div>
                  <p className="text-gray-700">
                    DecantAQP nace en Arequipa, la Ciudad Blanca, con la misión de traer las fragancias más exclusivas
                    del mundo a los amantes del perfume en Perú. Nuestro nombre fusiona la técnica del "decant"
                    (división de perfumes en porciones más pequeñas) con "AQP", el código de nuestra amada ciudad.
                  </p>
                  <p className="text-gray-700">
                    Nos especializamos en ofrecer decants de alta calidad de las marcas más prestigiosas, permitiendo a
                    nuestros clientes explorar el mundo de la alta perfumería sin comprometerse a comprar botellas
                    completas.
                  </p>
                  <p className="text-gray-700">
                    Cada decant es preparado con precisión y cuidado, manteniendo la integridad y calidad de la
                    fragancia original.
                  </p>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <Button className="mt-4 bg-[hsl(var(--decant-blue))] hover:bg-[hsl(var(--decant-dark-blue))] text-white transition-all duration-300 hover:scale-105">
                      Conoce Más Sobre Nosotros
                    </Button>
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}

      {/* Brands Carousel - Only show if no brand filter is active */}
      {!activeBrand && <BrandCarousel brands={brands} title="Marcas Exclusivas" />}

      {/* New Arrivals - Only show if we have new perfumes and no specific filters */}
      {newPerfumes.length > 0 && !activeCategory && !activeBrand && !searchTerm && (
        <div id="nuevos">
          <PerfumeGrid
            perfumes={newPerfumes}
            title="Nuevos Lanzamientos"
            subtitle="Las últimas incorporaciones a nuestra exclusiva colección"
            whatsappNumber={whatsappNumber}
          />
        </div>
      )}

      {/* Categories - Only show if no filters are active */}
      {!activeCategory && !activeBrand && !searchTerm && (
        <section className="py-16 bg-white overflow-hidden">
          <div className="decant-container">
            <ScrollReveal>
              <h2 className="text-3xl font-serif font-bold text-center text-[hsl(var(--decant-blue))] mb-2">
                Explora por Categoría
              </h2>
              <div className="h-1 w-20 bg-[hsl(var(--decant-gold))] mx-auto mb-8"></div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ScrollReveal direction="left" delay={100}>
                <div id="hombre" className="relative h-80 group overflow-hidden rounded-lg shadow-lg">
                  <ParallaxSection speed={0.2}>
                    <AnimatedImage
                      src="/placeholder.svg?height=320&width=600&text=Perfumes+para+Hombre"
                      alt="Perfumes para Hombre"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </ParallaxSection>
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--decant-blue))]/80 to-[hsl(var(--decant-blue))]/30 flex items-end p-6">
                    <div>
                      <h3 className="text-white text-2xl font-serif font-bold mb-2">Perfumes para Hombre</h3>
                      <p className="text-white mb-4">Fragancias masculinas con carácter y distinción</p>
                      <Button
                        variant="outline"
                        className="bg-transparent text-white border-white hover:bg-white hover:text-[hsl(var(--decant-blue))] transition-all duration-300 hover:scale-105"
                        onClick={() => handleCategorySelect("hombre")}
                      >
                        Ver Colección
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="right" delay={200}>
                <div id="mujer" className="relative h-80 group overflow-hidden rounded-lg shadow-lg">
                  <ParallaxSection speed={0.2}>
                    <AnimatedImage
                      src="/placeholder.svg?height=320&width=600&text=Perfumes+para+Mujer"
                      alt="Perfumes para Mujer"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </ParallaxSection>
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--decant-blue))]/80 to-[hsl(var(--decant-blue))]/30 flex items-end p-6">
                    <div>
                      <h3 className="text-white text-2xl font-serif font-bold mb-2">Perfumes para Mujer</h3>
                      <p className="text-white mb-4">Fragancias femeninas que cautivan y enamoran</p>
                      <Button
                        variant="outline"
                        className="bg-transparent text-white border-white hover:bg-white hover:text-[hsl(var(--decant-blue))] transition-all duration-300 hover:scale-105"
                        onClick={() => handleCategorySelect("mujer")}
                      >
                        Ver Colección
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-16 bg-[hsl(var(--decant-light-blue))]">
        <div className="decant-container">
          <ScrollReveal>
            <h2 className="text-3xl font-serif font-bold text-center text-[hsl(var(--decant-blue))] mb-2">
              ¿Cómo Funciona?
            </h2>
            <div className="h-1 w-20 bg-[hsl(var(--decant-gold))] mx-auto mb-8"></div>
            <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">
              En DecantAQP te ofrecemos la posibilidad de explorar fragancias de lujo sin comprometerte a comprar
              botellas completas. Así es como funciona nuestro servicio:
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            <ScrollReveal delay={100}>
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-[hsl(var(--decant-blue))] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="text-xl font-serif font-bold text-[hsl(var(--decant-blue))] mb-4">Elige tu Fragancia</h3>
                <p className="text-gray-700">
                  Explora nuestro catálogo de perfumes exclusivos y selecciona los que deseas probar.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-[hsl(var(--decant-blue))] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-serif font-bold text-[hsl(var(--decant-blue))] mb-4">
                  Selecciona el Tamaño
                </h3>
                <p className="text-gray-700">
                  Elige entre nuestras opciones de decant: 5ml, 10ml o 30ml, según tus necesidades.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-[hsl(var(--decant-blue))] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-serif font-bold text-[hsl(var(--decant-blue))] mb-4">Recibe en Casa</h3>
                <p className="text-gray-700">
                  Preparamos tu pedido con precisión y lo enviamos directamente a tu puerta en un empaque elegante y
                  seguro.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="text-center mt-12">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button className="bg-[hsl(var(--decant-gold))] hover:brightness-90 text-white transition-all duration-300 hover:scale-105 px-8 py-6 text-lg">
                <MessageCircle className="h-5 w-5 mr-2" />
                Comenzar Ahora
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[hsl(var(--decant-blue))] text-white">
        <div className="decant-container">
          <ScrollReveal>
            <h2 className="text-3xl font-serif font-bold text-center mb-2">Lo Que Dicen Nuestros Clientes</h2>
            <div className="h-1 w-20 bg-[hsl(var(--decant-gold))] mx-auto mb-12"></div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "María Fernanda",
                location: "Arequipa",
                quote:
                  "DecantAQP me permitió descubrir mi fragancia favorita sin gastar una fortuna. La calidad de sus decants es excepcional y el servicio es impecable.",
              },
              {
                name: "Carlos Eduardo",
                location: "Lima",
                quote:
                  "Increíble poder probar tantas fragancias de lujo a un precio accesible. Los envíos son rápidos y el empaque es muy elegante. Totalmente recomendado.",
              },
              {
                name: "Luciana",
                location: "Cusco",
                quote:
                  "La asesoría personalizada que me brindaron fue clave para encontrar el perfume perfecto para mi boda. Gracias a DecantAQP por hacer este día aún más especial.",
              },
            ].map((testimonial, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[hsl(var(--decant-gold))] rounded-full flex items-center justify-center text-[hsl(var(--decant-blue))] font-bold mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-white/80">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="italic">"{testimonial.quote}"</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="decant-container">
          <ScrollReveal>
            <h2 className="text-3xl font-serif font-bold text-center text-[hsl(var(--decant-blue))] mb-2">
              ¿Necesitas ayuda para elegir tu perfume?
            </h2>
            <div className="h-1 w-20 bg-[hsl(var(--decant-gold))] mx-auto mb-8"></div>
            <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">
              Nuestros expertos en perfumería están listos para asesorarte y ayudarte a encontrar la fragancia perfecta
              para ti o para regalar.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
                <Button className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 hover:scale-105 px-8 py-6 text-lg">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contactar por WhatsApp
                </Button>
              </a>
              <a href="tel:+51999999999" className="inline-block">
                <Button
                  variant="outline"
                  className="border-[hsl(var(--decant-blue))] text-[hsl(var(--decant-blue))] hover:bg-[hsl(var(--decant-light-blue))] transition-all duration-300 hover:scale-105 px-8 py-6 text-lg"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Llamar Ahora
                </Button>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[hsl(var(--decant-blue))] text-white py-16">
        <div className="decant-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ScrollReveal direction="up" delay={100}>
              <div>
                <Logo className="h-12 w-auto mb-6" isWhite />
                <p className="text-white/80 mb-4">
                  DecantAQP es tu destino para descubrir fragancias exclusivas en Arequipa y todo el Perú. Ofrecemos
                  decants de alta calidad de las marcas más prestigiosas del mundo.
                </p>
                <p className="text-white/80">
                  Cada decant es preparado con precisión y cuidado, manteniendo la integridad y calidad de la fragancia
                  original.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={200}>
              <div>
                <h3 className="font-serif font-bold text-lg mb-6">Contacto</h3>
                <ul className="space-y-4">
                  <li className="flex items-center text-white/80">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Calle Santa Catalina 123, Arequipa, Perú
                  </li>
                  <li className="flex items-center text-white/80">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    info@decantaqp.com
                  </li>
                  <li className="flex items-center text-white/80">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    +51 999 999 999
                  </li>
                  <li className="flex items-center text-white/80">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Lun - Sáb: 10:00 - 20:00
                  </li>
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={300}>
              <div>
                <h3 className="font-serif font-bold text-lg mb-6">Síguenos</h3>
                <div className="flex gap-4 mb-8">
                  <a href="#" className="transition-transform duration-300 hover:scale-110">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-white/30 text-white hover:bg-white/10"
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
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </Button>
                  </a>
                  <a href="#" className="transition-transform duration-300 hover:scale-110">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-white/30 text-white hover:bg-white/10"
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
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                      </svg>
                    </Button>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform duration-300 hover:scale-110"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-white/30 text-white hover:bg-white/10"
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
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </Button>
                  </a>
                </div>
                <h3 className="font-serif font-bold text-lg mb-6">Métodos de Pago</h3>
                <div className="flex gap-2 flex-wrap">
                  <Image
                    src="/placeholder.svg?height=30&width=40&text=VISA"
                    alt="VISA"
                    width={40}
                    height={30}
                    className="transition-transform duration-300 hover:scale-110 bg-white rounded p-1"
                  />
                  <Image
                    src="/placeholder.svg?height=30&width=40&text=MC"
                    alt="MasterCard"
                    width={40}
                    height={30}
                    className="transition-transform duration-300 hover:scale-110 bg-white rounded p-1"
                  />
                  <Image
                    src="/placeholder.svg?height=30&width=40&text=YAPE"
                    alt="Yape"
                    width={40}
                    height={30}
                    className="transition-transform duration-300 hover:scale-110 bg-white rounded p-1"
                  />
                  <Image
                    src="/placeholder.svg?height=30&width=40&text=PLIN"
                    alt="Plin"
                    width={40}
                    height={30}
                    className="transition-transform duration-300 hover:scale-110 bg-white rounded p-1"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
          <div className="border-t border-white/20 mt-12 pt-8 text-center text-sm text-white/60">
            <p>© 2024 DecantAQP. Todos los derechos reservados.</p>
          </div>
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
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  )
}

