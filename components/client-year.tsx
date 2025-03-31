"use client"

import { useState, useEffect } from "react"

export function ClientYear() {
  const [year, setYear] = useState("2024")

  useEffect(() => {
    setYear(new Date().getFullYear().toString())
  }, [])

  return year
}

