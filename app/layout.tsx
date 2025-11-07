import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/nav/navbar"
import { Footer } from "@/components/nav/footer"

export const metadata: Metadata = {
  title: "THE FITNESS PRIEST - Personal Fitness Coaching",
  description: "Transform your fitness journey with personalized coaching, custom workout plans, and expert guidance.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
