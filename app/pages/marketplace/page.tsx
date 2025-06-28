"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Filter, Search, ShoppingCart, Star, X, Layers, Phone, Settings, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Sample projects data
const allProjects = [
  {
    id: "ecom-starter",
    title: "E-commerce Starter",
    description: "A complete e-commerce solution with product management, cart, and checkout functionality.",
    image: "/images/ecommerce/product.png",
    price: 499,
    salePrice: 399,
    category: "Web",
    rating: 4.8,
    tags: ["React", "Next.js", "Stripe"],
    featured: true,
    new: false,
    bestseller: true,
  },
  {
    id: "restaurant-app",
    title: "Restaurant App",
    description: "Mobile app for restaurants with online ordering, reservations, and loyalty program features.",
    image: "/images/restaurant-app/product.png",
    price: 699,
    salePrice: 599,
    category: "Mobile",
    rating: 4.9,
    tags: ["React Native", "Firebase", "Stripe"],
    featured: true,
    new: true,
    bestseller: true,
  },
  {
    id: "portfolio-template",
    title: "Portfolio Template",
    description: "Professional portfolio website template for designers, developers, and creative professionals.",
    image: "/images/portfolio/product.png",
    price: 299,
    salePrice: 249,
    category: "Web",
    rating: 4.7,
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    featured: false,
    new: false,
    bestseller: false,
  },
  {
    id: "blog-platform",
    title: "Blog Platform",
    description: "Complete blog platform with content management, user authentication, and commenting system.",
    image: "/images/blogging/product.png",
    price: 399,
    salePrice: 349,
    category: "Web",
    rating: 4.6,
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    featured: false,
    new: true,
    bestseller: false,
  },
  {
    id: "fitness-tracker",
    title: "Fitness Tracker",
    description: "Mobile app for tracking workouts, nutrition, and health metrics with progress visualization.",
    image: "/images/fitness-app/product.png",
    price: 599,
    salePrice: 499,
    category: "Mobile",
    rating: 4.8,
    tags: ["React Native", "HealthKit", "Google Fit"],
    featured: true,
    new: false,
    bestseller: false,
  },
  {
    id: "real-estate",
    title: "Real Estate Platform",
    description: "Property listing and management platform with search, filtering, and agent dashboard.",
    image: "/images/real-estate/product.png",
    price: 799,
    salePrice: 699,
    category: "Web",
    rating: 4.9,
    tags: ["Next.js", "MongoDB", "Google Maps API"],
    featured: true,
    new: false,
    bestseller: true,
  },
  {
    id: "event-management",
    title: "Event Management",
    description: "Complete event management system with ticketing, attendee management, and analytics.",
    image: "/images/event-management/product.png",
    price: 649,
    salePrice: 549,
    category: "Web",
    rating: 4.7,
    tags: ["React", "Node.js", "Stripe"],
    featured: false,
    new: true,
    bestseller: false,
  },
  {
    id: "delivery-app",
    title: "Delivery App",
    description: "On-demand delivery application with real-time tracking, payment processing, and driver management.",
    image: "/images/delivery/product.png",
    price: 899,
    salePrice: 799,
    category: "Mobile",
    rating: 4.8,
    tags: ["React Native", "Firebase", "Google Maps"],
    featured: false,
    new: false,
    bestseller: true,
  },
]

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedRating, setSelectedRating] = useState<number[]>([])
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [activeTab, setActiveTab] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false)

  const openWhatsAppChat = () => {
    const phoneNumber = "09128539578" // Replace with your WhatsApp business number
    const message = "Hi! I'm interested in your marketplace products. Can you help me?"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  // Get unique values for filters
  const categories = [...new Set(allProjects.map((p) => p.category))]
  const technologies = [...new Set(allProjects.flatMap((p) => p.tags))]

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    const filtered = allProjects.filter((project) => {
      // Search filter
      if (
        searchTerm &&
        !project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !project.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(project.category)) {
        return false
      }

      // Price filter
      if (project.salePrice < priceRange[0] || project.salePrice > priceRange[1]) {
        return false
      }

      // Rating filter
      if (selectedRating.length > 0 && !selectedRating.some((rating) => project.rating >= rating)) {
        return false
      }

      // Technology filter
      if (selectedTechnologies.length > 0 && !selectedTechnologies.some((tech) => project.tags.includes(tech))) {
        return false
      }

      // Tab filter
      if (activeTab === "featured" && !project.featured) return false
      if (activeTab === "new" && !project.new) return false
      if (activeTab === "bestsellers" && !project.bestseller) return false

      return true
    })

    // Sort projects
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.salePrice - b.salePrice)
        break
      case "price-high":
        filtered.sort((a, b) => b.salePrice - a.salePrice)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0))
        break
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return filtered
  }, [searchTerm, selectedCategories, priceRange, selectedRating, selectedTechnologies, sortBy, activeTab])

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const handleRatingChange = (rating: number, checked: boolean) => {
    if (checked) {
      setSelectedRating([...selectedRating, rating])
    } else {
      setSelectedRating(selectedRating.filter((r) => r !== rating))
    }
  }

  const handleTechnologyChange = (tech: string, checked: boolean) => {
    if (checked) {
      setSelectedTechnologies([...selectedTechnologies, tech])
    } else {
      setSelectedTechnologies(selectedTechnologies.filter((t) => t !== tech))
    }
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedCategories([])
    setPriceRange([0, 1000])
    setSelectedRating([])
    setSelectedTechnologies([])
    setActiveTab("all")
  }

  const activeFiltersCount =
    selectedCategories.length +
    selectedRating.length +
    selectedTechnologies.length +
    (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0)

  return (
    <div className="flex min-h-screen flex-col">

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Project Marketplace</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Browse our collection of pre-built projects to jumpstart your development process.
                </p>
              </div>
              <div className="w-full max-w-md">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search projects..."
                    className="w-full bg-background pl-8 rounded-lg border border-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col lg:flex-row gap-6">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden">
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </Button>
              </div>

              {/* Filters Sidebar */}
              <div className={`w-full lg:w-64 space-y-4 ${showFilters ? "block" : "hidden lg:block"}`}>
                <Card className="border-0 shadow-sm">
                  <div className="flex flex-row items-center justify-between space-y-0 p-4">
                    <h3 className="font-medium tracking-tight flex items-center">
                      <Filter className="mr-2 h-4 w-4" /> Filters
                    </h3>
                    {activeFiltersCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="p-4 pt-0 space-y-6">
                    {/* Category Filter */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Category</h4>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              id={`category-${category}`}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                            />
                            <label htmlFor={`category-${category}`} className="text-sm">
                              {category} ({allProjects.filter((p) => p.category === category).length})
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price Range Filter */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Price Range</h4>
                      <div className="px-2">
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={1000}
                          min={0}
                          step={50}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Rating Filter */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Rating</h4>
                      <div className="space-y-2">
                        {[4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center space-x-2">
                            <Checkbox
                              id={`rating-${rating}`}
                              checked={selectedRating.includes(rating)}
                              onCheckedChange={(checked) => handleRatingChange(rating, checked as boolean)}
                            />
                            <label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
                              {rating}+ <Star className="ml-1 h-3 w-3 fill-primary text-primary" />
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies Filter */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Technologies</h4>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {technologies.map((tech) => (
                          <div key={tech} className="flex items-center space-x-2">
                            <Checkbox
                              id={`tech-${tech}`}
                              checked={selectedTechnologies.includes(tech)}
                              onCheckedChange={(checked) => handleTechnologyChange(tech, checked as boolean)}
                            />
                            <label htmlFor={`tech-${tech}`} className="text-sm">
                              {tech}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                    <TabsList>
                      <TabsTrigger value="all">All Projects</TabsTrigger>
                      <TabsTrigger value="featured">Featured</TabsTrigger>
                      <TabsTrigger value="new">New Arrivals</TabsTrigger>
                      <TabsTrigger value="bestsellers">Bestsellers</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <div className="w-full md:w-48">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Results Count */}
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredProjects.length} of {allProjects.length} projects
                  </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <Card
                      key={project.id}
                      className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <Link href={`/marketplace/${project.id}`} className="block">
                        <div className="aspect-video w-full overflow-hidden relative">
                          <Image
                            src={project.image}
                            alt={project.title}
                            layout="fill"
                            objectFit="cover"
                            // width={300}
                            // height={200}
                            className="h-full w-full object-cover transition-transform hover:scale-105"
                          />
                          {project.featured && (
                            <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">Featured</Badge>
                          )}
                          {project.new && <Badge className="absolute top-2 right-2 bg-green-500 text-white">New</Badge>}
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
                        <Link href={`/marketplace/${project.id}`} className="block">
                          <CardTitle className="text-xl hover:text-primary transition-colors line-clamp-2">
                            {project.title}
                          </CardTitle>
                        </Link>
                        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="px-4 pb-0">
                        <div className="flex flex-wrap gap-1">
                          {project.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="bg-muted/50 text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {project.tags.length > 3 && (
                            <Badge variant="outline" className="bg-muted/50 text-xs">
                              +{project.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-2">
                          <div className="text-lg font-bold text-primary">${project.salePrice}</div>
                          {project.price !== project.salePrice && (
                            <div className="text-sm text-muted-foreground line-through">${project.price}</div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/pages/marketplace/${project.id}`}>Details</Link>
                          </Button>
                          {/* <Button size="sm" onClick={openWhatsAppChat} className="bg-green-600 hover:bg-green-700">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Chat
                          </Button> */}
                          <Button size="sm" onClick={() => setShowMaintenanceModal(true)}>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Buy
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                {/* No Results */}
                {filteredProjects.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium mb-2">No projects found</h3>
                    <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
                    <Button onClick={clearAllFilters}>Clear All Filters</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Maintenance Modal */}
      <Dialog open={showMaintenanceModal} onOpenChange={setShowMaintenanceModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-orange-500" />
              System Maintenance
            </DialogTitle>
            <DialogDescription>
              Our purchasing system is currently undergoing maintenance to serve you better.
            </DialogDescription>
          </DialogHeader>
          <div className="text-center py-6">
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Settings className="h-8 w-8 text-orange-500 animate-spin" />
            </div>
            <h3 className="text-lg font-medium mb-2">Purchasing Temporarily Unavailable</h3>
            <p className="text-muted-foreground mb-6">
              We're working hard to improve our services. In the meantime, feel free to chat with us directly for any
              inquiries or purchases.
            </p>
            <div className="flex flex-col gap-3">
              <Button onClick={openWhatsAppChat} className="bg-green-600 hover:bg-green-700">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat on WhatsApp
              </Button>
              <Button variant="outline" onClick={() => setShowMaintenanceModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
