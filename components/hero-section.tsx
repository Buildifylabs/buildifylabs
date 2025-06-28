import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_700px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Transform Your Digital Presence with Expert Development
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                We build cutting-edge mobile and web solutions that help businesses thrive in the digital landscape.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="group" asChild>
                <a href="https://calendly.com/angusdev-aeworks/30min" target="_blank" rel="noopener noreferrer">
                  Book a Call
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/pages/marketplace">View Our Work</a>
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="inline-block h-8 w-8 overflow-hidden rounded-full border-2 border-background">
                    <Image
                      src={`/placeholder.svg?height=32&width=32&text=${i}`}
                      width={32}
                      height={32}
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-muted-foreground">
                Trusted by <span className="font-medium text-foreground">500+</span> companies
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="relative h-[450px] w-full overflow-hidden rounded-lg bg-muted">
              <Image
                src={`/images/ecommerce/product.png`}
                width={32}
                height={32}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 h-24 w-64 rounded-lg bg-primary p-4 shadow-lg">
              <div className="flex h-full flex-col justify-between">
                <div className="text-sm font-medium text-primary-foreground">Latest Project</div>
                <div className="text-lg font-bold text-primary-foreground">E-commerce Platform</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
