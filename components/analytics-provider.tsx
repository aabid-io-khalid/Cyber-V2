"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { initGA, pageview } from "@/lib/analytics"

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    if (measurementId) {
      initGA(measurementId)
    }
  }, [])

  useEffect(() => {
    if (pathname) {
      pageview(pathname)
    }
  }, [pathname])

  return <>{children}</>
}
