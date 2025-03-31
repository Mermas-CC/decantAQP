import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-medium mb-6">Perfume no encontrado</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Lo sentimos, el perfume que estás buscando no existe o ha sido descontinuado.
      </p>
      <Button asChild>
        <Link href="/">Volver a la tienda</Link>
      </Button>
    </div>
  )
}

