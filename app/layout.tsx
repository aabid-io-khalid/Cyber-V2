import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollProvider } from "@/components/scroll-provider"
import AnalyticsProvider from "@/components/analytics-provider"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Preload - Cyberpunk Portfolio Template",
  description: "A dystopian cyberpunk portfolio template for designers and creative professionals",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AnalyticsProvider>
            <ScrollProvider>
              <Suspense>{children}</Suspense>
            </ScrollProvider>
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
