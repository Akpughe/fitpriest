"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Dumbbell, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "About me", href: "#about" },
  { name: "Programs", href: "/plans" },
  { name: "Cases", href: "/dashboard" },
  { name: "Blog", href: "/schedule" },
  { name: "Reviews", href: "#reviews" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  return (
    <nav className={cn(
      "fixed top-0 z-50 w-full transition-all duration-300",
      isHomePage
        ? "bg-brand-black/80 backdrop-blur-md border-b border-white/10"
        : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
    )}>
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <Dumbbell className={cn(
              "h-6 w-6",
              isHomePage ? "text-brand-orange-500" : "text-brand-orange-500"
            )} />
          </motion.div>
          <span className={cn(
            "text-xl font-bold tracking-tight",
            isHomePage ? "text-white" : "text-foreground"
          )}>
            EGO
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-sm font-medium transition-colors",
                isHomePage
                  ? "text-white/80 hover:text-white"
                  : "text-muted-foreground hover:text-foreground",
                pathname === item.href && (isHomePage ? "text-white" : "text-foreground")
              )}
            >
              {item.name}
              {pathname === item.href && (
                <motion.div
                  layoutId="navbar-indicator"
                  className={cn(
                    "absolute -bottom-7 left-0 right-0 h-0.5",
                    isHomePage ? "bg-brand-orange-500" : "bg-brand-orange-500"
                  )}
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex md:items-center">
          <Link href="/consultation">
            <button className={cn(
              "px-6 py-2.5 rounded-full font-semibold transition-all duration-200",
              isHomePage
                ? "bg-white text-brand-black hover:bg-gray-100"
                : "bg-brand-orange-500 text-white hover:bg-brand-orange-400"
            )}>
              Contact me
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={cn(
            "md:hidden",
            isHomePage ? "text-white" : "text-foreground"
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={cn(
            "border-b md:hidden",
            isHomePage ? "bg-brand-black border-white/10" : "bg-background"
          )}
        >
          <div className="container space-y-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium",
                  pathname === item.href
                    ? isHomePage
                      ? "bg-brand-orange-500/20 text-brand-orange-500"
                      : "bg-brand-orange-500/10 text-brand-orange-500"
                    : isHomePage
                      ? "text-white/70 hover:bg-white/10 hover:text-white"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4">
              <Link href="/consultation" onClick={() => setMobileMenuOpen(false)}>
                <button className={cn(
                  "w-full px-6 py-2.5 rounded-full font-semibold transition-all duration-200",
                  isHomePage
                    ? "bg-white text-brand-black hover:bg-gray-100"
                    : "bg-brand-orange-500 text-white hover:bg-brand-orange-400"
                )}>
                  Contact me
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  )
}
