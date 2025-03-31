/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.sephora.com", "www.chanel.com", "www.creedboutique.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Añadir esta configuración para permitir imágenes sin optimización
    unoptimized: true,
  },
}

export default nextConfig

