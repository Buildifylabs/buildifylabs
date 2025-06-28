"use client"
import Link from "next/link"
import { Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import MarketplacePreview from "@/components/marketplace-preview"
import LandingPageCreator from "@/components/landing-page-creator"
import TestimonialsSection from "@/components/testimonials-section"
import ContactForm from "@/components/contact-form"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">

      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <MarketplacePreview />
        <LandingPageCreator />
        <TestimonialsSection />
        <ContactForm />
      </main>
     
    </div>
  )
}
