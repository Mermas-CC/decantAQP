import { notFound } from "next/navigation"
import perfumesData from "@/data/perfumes.json"
import PerfumeClient from "./perfume-client"

interface PageParams {
  id: string
}

export default function PerfumePage({ params }: { params: PageParams }) {
  const perfume = perfumesData.find((p) => p.id === params.id)

  if (!perfume) {
    notFound()
  }

  // Obtener perfumes relacionados
  const relatedPerfumes = perfumesData.filter((p) => p.category === perfume.category && p.id !== perfume.id).slice(0, 4)

  // Obtener todas las imágenes
  const images = [perfume.images.main, perfume.images.angle1, perfume.images.angle2, perfume.images.angle3].filter(
    Boolean,
  ) as string[]

  // Pasar los datos al componente cliente
  return <PerfumeClient perfume={perfume} relatedPerfumes={relatedPerfumes} images={images} />
}


