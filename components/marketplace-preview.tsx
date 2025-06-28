import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MarketplacePreview() {
  const projects = [
    {
      id: "ecom-starter",
      title: "E-commerce Starter",
      description: "A complete e-commerce solution with product management, cart, and checkout functionality.",
      image: "/images/ecommerce/product.png",
      price: "$499",
      category: "Web",
      rating: 4.8,
    },
    {
      id: "restaurant-app",
      title: "Restaurant App",
      description: "Mobile app for restaurants with online ordering, reservations, and loyalty program features.",
      image: "/images/restaurant-app/product.png",
      price: "$699",
      category: "Mobile",
      rating: 4.9,
    },
    {
      id: "portfolio-template",
      title: "Portfolio Template",
      description: "Professional portfolio website template for designers, developers, and creative professionals.",
      image: "/images/portfolio/product.png",
      price: "$299",
      category: "Web",
      rating: 4.7,
    },
  ]

  return (
    <section id="marketplace" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Marketplace
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready-to-Use Development Projects</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Browse our collection of pre-built projects to jumpstart your development process.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden border-0 shadow-lg">
              <Link href={`/marketplace/${project.id}`} className="block">
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={300}
                    height={200}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              </Link>
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{project.category}</Badge>
                  <div className="flex items-center text-sm">
                    <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                    <span>{project.rating}</span>
                  </div>
                </div>
                <Link href={`/pages/marketplace/${project.id}`} className="block">
                  <CardTitle className="text-xl hover:text-primary transition-colors">{project.title}</CardTitle>
                </Link>
                <CardDescription className="line-clamp-2">{project.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex items-center justify-between p-4 pt-0">
                <div className="text-lg font-bold">{project.price}</div>
                <Button size="sm" asChild>
                  <Link href={`/pages/marketplace/${project.id}`}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Purchase
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <Button variant="outline" size="lg" className="group" asChild>
            <Link href="/pages/marketplace">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
