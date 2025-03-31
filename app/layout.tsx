import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Perfumerías Unidas - Tienda Online de Perfumes y Cosméticos",
  description:
    "Descubre las mejores marcas de perfumes, maquillaje, tratamiento facial y capilar en Perfumerías Unidas. Envío gratis en compras mayores a S/199.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="perfumerias-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'