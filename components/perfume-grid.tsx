import { PerfumeCard } from "@/components/perfume-card"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

interface Perfume {
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
  featured?: boolean
  new?: boolean
  rating?: number
  reviews?: number
}

interface PerfumeGridProps {
  perfumes: Perfume[]
  title?: string
  subtitle?: string
  whatsappNumber?: string
}

export function PerfumeGrid({ perfumes, title, subtitle, whatsappNumber }: PerfumeGridProps) {
  return (
    <section className="py-16">
      <div className="decant-container">
        {title && (
          <ScrollReveal direction="up" distance={20}>
            <h2 className="text-3xl font-serif font-bold text-center text-decant-blue mb-2">{title}</h2>
            <div className="h-1 w-20 bg-decant-gold mx-auto"></div>
          </ScrollReveal>
        )}
        {subtitle && (
          <ScrollReveal direction="up" delay={100} distance={20}>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto mt-4">{subtitle}</p>
          </ScrollReveal>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {perfumes.map((perfume, index) => (
            <PerfumeCard
              key={perfume.id}
              {...perfume}
              delay={Math.min(index * 100, 700)}
              whatsappNumber={whatsappNumber}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

