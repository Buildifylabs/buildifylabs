"use client"

import React, { useState } from "react"
import { Layers, Phone, Menu } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import Image from "next/image"


// Add this responsive header component
const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "/pages/marketplace", label: "Marketplace" },
    { href: "/pages/page-creator", label: "Page Creator" },
    { href: "/pages/about", label: "About" },
    { href: "/pages/contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 mx-5">
              <Image
              src="/logo/Buildifylabs icon.png"
              alt="logo"
              // layout="fill"
              objectFit="cover"
              width={100}
              height={100}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
            </div>
            <span className="text-xl font-bold">Buidifylabs</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Call us:</span>
              <a href="tel:+1234567890" className="font-medium transition-colors hover:text-primary">
                +1 (234) 567-890
              </a>
            </div>
            <Button size="sm" asChild>
              <a href="https://calendly.com/angusdev-aeworks/30min" target="_blank" rel="noopener noreferrer">
                Book a Call
              </a>
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            {/* <Button size="sm" variant="outline" asChild className="hidden sm:flex">
              <a href="tel:+1234567890">
                <Phone className="h-4 w-4 mr-1" />
                Call
              </a>
            </Button>
            <Button size="sm" asChild className="text-xs px-3">
              <a href="https://calendly.com/your-calendly-link" target="_blank" rel="noopener noreferrer">
                Book Call
              </a>
            </Button> */}

            {/* Mobile Menu Trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  {/* Mobile Menu Header */}
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center gap-2">
                      <Layers className="h-6 w-6 text-primary" />
                      <span className="text-xl font-bold">Buildifylabs</span>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col gap-4 py-6">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium transition-colors hover:text-primary py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile Contact Info */}
                  <div className="mt-auto pt-6 border-t">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Call us</p>
                          <a href="tel:+2348109959313" className="font-medium hover:text-primary">
                            +234 810 995 9313
                          </a>
                        </div>
                      </div>
                      <Button className="w-full" asChild>
                        <a
                          href="https://calendly.com/angusdev-aeworks/30min"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsOpen(false)}
                        >
                          Book a Call
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header