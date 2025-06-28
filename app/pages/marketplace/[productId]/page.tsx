"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Check,
  Download,
  Star,
  CreditCard,
  Lock,
  Layers,
  Phone,
  Mail,
  Settings,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { loadStripe } from "@stripe/stripe-js"
// import { useStripe, useElements } from "@stripe/react-stripe-js"

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// Complete product data for all marketplace items
const getProductData = (productId: string) => {
  const products: Record<string, any> = {
    "ecom-starter": {
      id: "ecom-starter",
      title: "E-commerce Starter",
      description:
        "A complete e-commerce solution with product management, cart, and checkout functionality. Built with modern technologies to provide a seamless shopping experience for your customers.",
      longDescription:
        "Our E-commerce Starter is a comprehensive solution designed to help businesses quickly launch their online store. Built with scalability and performance in mind, this template includes everything you need to start selling products online. From product management to secure checkout, we've covered all the essentials so you can focus on growing your business.",
      image: "/images/ecommerce/product.png",
      gallery: [
        "/images/ecommerce/product-galary-1.png",
        "/images/ecommerce/product-galary-2.png",
        "/images/ecommerce/product-galary-3.png",
        "/images/ecommerce/product-galary-4.png",
      ],
      price: 499,
      salePrice: 399,
      category: "Web",
      rating: 4.8,
      reviews: 24,
      tags: ["React", "Next.js", "Stripe", "Tailwind CSS"],
      features: [
        "Responsive design for all devices",
        "Product management system",
        "Shopping cart and checkout",
        "Payment processing with Stripe",
        "User authentication and accounts",
        "Order management and history",
        "Admin dashboard",
        "SEO optimized",
        "Performance optimized",
        "6 months of support",
      ],
      techStack: [
        { name: "Next.js", description: "React framework for production" },
        { name: "Tailwind CSS", description: "Utility-first CSS framework" },
        { name: "Prisma", description: "Next-generation ORM for Node.js and TypeScript" },
        { name: "PostgreSQL", description: "Powerful, open source object-relational database" },
        { name: "Stripe", description: "Payment processing platform" },
      ],
      faqs: [
        {
          question: "Do I need technical knowledge to use this template?",
          answer:
            "Basic knowledge of React and Next.js is recommended, but our documentation is comprehensive and we offer support to help you get started.",
        },
        {
          question: "Can I customize the design?",
          answer:
            "Yes, the template is built with Tailwind CSS which makes it easy to customize the design to match your brand.",
        },
        {
          question: "Is the code well documented?",
          answer:
            "Yes, the code is well documented with comments and we provide comprehensive documentation to help you understand how everything works.",
        },
        {
          question: "Do you offer customization services?",
          answer: "Yes, we offer customization services at an additional cost. Please contact us for more information.",
        },
        {
          question: "What's included in the 6 months support?",
          answer:
            "Our support includes bug fixes, answering questions about the template, and guidance on how to use the template. It does not include adding new features or customizations.",
        },
      ],
    },
    "restaurant-app": {
      id: "restaurant-app",
      title: "Restaurant App",
      description: "Mobile app for restaurants with online ordering, reservations, and loyalty program features.",
      longDescription:
        "Transform your restaurant business with our comprehensive mobile app solution. This app includes everything you need to provide a seamless dining experience for your customers, from online ordering to table reservations and loyalty programs.",
      image: "/images/restaurant-app/product.png",
      gallery: [
        "/images/restaurant-app/product-galary-1.png",
        "/images/restaurant-app/product-galary-2.png",
        "/images/restaurant-app/product-galary-3.png",
        "/images/restaurant-app/product-galary-4.png",
      ],
      price: 699,
      salePrice: 599,
      category: "Mobile",
      rating: 4.9,
      reviews: 18,
      tags: ["React Native", "Firebase", "Stripe"],
      features: [
        "Cross-platform mobile app (iOS & Android)",
        "Online ordering system",
        "Table reservation management",
        "Digital menu with categories",
        "Push notifications",
        "Loyalty program integration",
        "Payment processing",
        "Order tracking",
        "Customer reviews and ratings",
        "Admin dashboard for restaurant owners",
      ],
      techStack: [
        { name: "React Native", description: "Cross-platform mobile app development" },
        { name: "Firebase", description: "Backend-as-a-Service platform" },
        { name: "Stripe", description: "Payment processing platform" },
        { name: "Google Maps API", description: "Location and mapping services" },
        { name: "Push Notifications", description: "Real-time customer engagement" },
      ],
      faqs: [
        {
          question: "Does this work on both iOS and Android?",
          answer: "Yes, this is a React Native app that works on both iOS and Android platforms.",
        },
        {
          question: "Can I customize the menu categories?",
          answer: "The menu system is fully customizable with categories, items, and pricing.",
        },
        {
          question: "Is payment processing included?",
          answer: "Yes, Stripe payment processing is integrated for secure online payments.",
        },
        {
          question: "How does the reservation system work?",
          answer:
            "Customers can book tables through the app, and restaurant staff can manage bookings through the admin panel.",
        },
      ],
    },
    "portfolio-template": {
      id: "portfolio-template",
      title: "Portfolio Template",
      description: "Professional portfolio website template for designers, developers, and creative professionals.",
      longDescription:
        "Showcase your work with style using our modern portfolio template. Perfect for designers, developers, photographers, and creative professionals who want to make a lasting impression on potential clients and employers.",
      image: "/images/portfolio/product.png",
      gallery: [
        "/images/portfolio/product-galary-1.png",
        "/images/portfolio/product-galary-2.png",
        "/images/portfolio/product-galary-3.png",
        "/images/portfolio/product-garary-4.png",
      ],
      price: 299,
      salePrice: 249,
      category: "Web",
      rating: 4.7,
      reviews: 32,
      tags: ["React", "Tailwind CSS", "Framer Motion"],
      features: [
        "Modern and clean design",
        "Responsive layout",
        "Portfolio gallery with filtering",
        "Smooth animations",
        "Contact form integration",
        "Blog section",
        "SEO optimized",
        "Fast loading performance",
        "Easy to customize",
        "3 months of support",
      ],
      techStack: [
        { name: "React", description: "JavaScript library for building user interfaces" },
        { name: "Tailwind CSS", description: "Utility-first CSS framework" },
        { name: "Framer Motion", description: "Animation library for React" },
        { name: "Next.js", description: "React framework with SSR capabilities" },
        { name: "Vercel", description: "Deployment and hosting platform" },
      ],
      faqs: [
        {
          question: "Can I add my own projects to the portfolio?",
          answer: "Yes, the portfolio section is fully customizable. You can easily add, remove, or modify projects.",
        },
        {
          question: "Is the template suitable for photographers?",
          answer: "The template works great for showcasing photography portfolios with high-quality image galleries.",
        },
        {
          question: "How do I customize the animations?",
          answer:
            "The template uses Framer Motion for animations, which are easily customizable through configuration files.",
        },
      ],
    },
    "blog-platform": {
      id: "blog-platform",
      title: "Blog Platform",
      description: "Complete blog platform with content management, user authentication, and commenting system.",
      longDescription:
        "Launch your own blog platform with our comprehensive solution. Features include content management, user authentication, commenting system, and everything you need to create a thriving blogging community.",
      image: "/images/blogging/product.png",
      gallery: [
        "/images/blogging/product-galary-1.png",
        "/images/blogging/product-galary-2.png",
        "/images/blogging/product-galary-3.png",
        "/images/blogging/product-galary-4.png",
      ],
      price: 399,
      salePrice: 349,
      category: "Web",
      rating: 4.6,
      reviews: 15,
      tags: ["Next.js", "Prisma", "PostgreSQL"],
      features: [
        "Content management system",
        "User authentication and profiles",
        "Rich text editor",
        "Comment system",
        "Category and tag management",
        "Search functionality",
        "Admin dashboard",
        "Email notifications",
        "SEO optimization",
        "Social media integration",
      ],
      techStack: [
        { name: "Next.js", description: "Full-stack React framework" },
        { name: "Prisma", description: "Next-generation ORM" },
        { name: "PostgreSQL", description: "Advanced open source database" },
        { name: "NextAuth.js", description: "Authentication for Next.js" },
        { name: "TinyMCE", description: "Rich text editor" },
      ],
      faqs: [
        {
          question: "Can multiple authors contribute to the blog?",
          answer: "Yes, the platform supports multiple authors with different permission levels.",
        },
        {
          question: "Is there a comment moderation system?",
          answer: "Yes, comments can be moderated before being published, and there's spam protection included.",
        },
        {
          question: "Can I monetize the blog?",
          answer:
            "The platform is designed to be extensible, so you can easily add monetization features like ads or subscriptions.",
        },
      ],
    },
    "fitness-tracker": {
      id: "fitness-tracker",
      title: "Fitness Tracker",
      description: "Mobile app for tracking workouts, nutrition, and health metrics with progress visualization.",
      longDescription:
        "Help users achieve their fitness goals with our comprehensive fitness tracking app. Features workout logging, nutrition tracking, progress visualization, and integration with popular health platforms.",
      image: "/images/fitness-app/product.png",
      gallery: [
        "/images/fitness-app/product-galary-1.png",
        "/images/fitness-app/product-galary-2.png",
        "/images/fitness-app/product-galary-3.png",
        "/images/fitness-app/product-galary-4.png",
      ],
      price: 599,
      salePrice: 499,
      category: "Mobile",
      rating: 4.8,
      reviews: 21,
      tags: ["React Native", "HealthKit", "Google Fit"],
      features: [
        "Workout tracking and logging",
        "Nutrition and calorie tracking",
        "Progress visualization with charts",
        "Goal setting and achievements",
        "Exercise library with instructions",
        "Health platform integration",
        "Social features and challenges",
        "Wearable device sync",
        "Offline mode support",
        "Personal trainer features",
      ],
      techStack: [
        { name: "React Native", description: "Cross-platform mobile development" },
        { name: "HealthKit", description: "iOS health data integration" },
        { name: "Google Fit", description: "Android fitness data integration" },
        { name: "Chart.js", description: "Data visualization library" },
        { name: "SQLite", description: "Local database for offline support" },
      ],
      faqs: [
        {
          question: "Does it sync with fitness wearables?",
          answer:
            "Yes, the app integrates with popular fitness trackers and smartwatches through HealthKit and Google Fit.",
        },
        {
          question: "Can I track custom exercises?",
          answer: "You can create custom exercises and workouts in addition to the pre-built exercise library.",
        },
        {
          question: "Is there a social component?",
          answer:
            "Yes, users can share achievements, participate in challenges, and connect with friends for motivation.",
        },
      ],
    },
    "real-estate": {
      id: "real-estate",
      title: "Real Estate Platform",
      description: "Property listing and management platform with search, filtering, and agent dashboard.",
      longDescription:
        "Complete real estate platform for property listings, agent management, and customer interactions. Features advanced search, virtual tours, mortgage calculators, and comprehensive admin tools.",
      image: "/images/real-estate/product.png",
      gallery: [
        "/images/real-estate/product=galary-1.png",
        "/images/real-estate/product=galary-2.png",
        "/images/real-estate/product=galary-3.png",
        "/images/real-estate/product=galary-4.png",
      ],
      price: 799,
      salePrice: 699,
      category: "Web",
      rating: 4.9,
      reviews: 12,
      tags: ["Next.js", "MongoDB", "Google Maps API"],
      features: [
        "Property listing management",
        "Advanced search and filtering",
        "Interactive maps integration",
        "Virtual tour support",
        "Mortgage calculator",
        "Agent profiles and management",
        "Lead generation tools",
        "CRM integration",
        "Mobile responsive design",
        "Multi-language support",
      ],
      techStack: [
        { name: "Next.js", description: "Full-stack React framework" },
        { name: "MongoDB", description: "NoSQL database for flexible data storage" },
        { name: "Google Maps API", description: "Interactive maps and location services" },
        { name: "Cloudinary", description: "Image and video management" },
        { name: "SendGrid", description: "Email delivery service" },
      ],
      faqs: [
        {
          question: "Can agents manage their own listings?",
          answer: "Yes, agents have their own dashboard where they can add, edit, and manage their property listings.",
        },
        {
          question: "Is there a mobile app version?",
          answer:
            "The platform is fully responsive and works great on mobile devices. A native app version is available as an add-on.",
        },
        {
          question: "How does the lead generation work?",
          answer:
            "The platform captures leads through contact forms, property inquiries, and integrates with popular CRM systems.",
        },
      ],
    },
    "event-management": {
      id: "event-management",
      title: "Event Management",
      description: "Complete event management system with ticketing, attendee management, and analytics.",
      longDescription:
        "Streamline your event planning with our comprehensive event management platform. From ticket sales to attendee check-in, manage every aspect of your events with ease.",
      image: "/images/event-management/product.png",
      gallery: [
        "/images/event-management/product-galary-1.png",
        "/images/event-management/product-galary-2.png",
        "/images/event-management/product-galary-3.png",
        "/images/event-management/product-galary-4.png",
      ],
      price: 649,
      salePrice: 549,
      category: "Web",
      rating: 4.7,
      reviews: 9,
      tags: ["React", "Node.js", "Stripe"],
      features: [
        "Event creation and management",
        "Ticket sales and pricing tiers",
        "Attendee registration and check-in",
        "Payment processing",
        "Email marketing integration",
        "Analytics and reporting",
        "QR code ticket generation",
        "Venue management",
        "Speaker and sponsor management",
        "Mobile check-in app",
      ],
      techStack: [
        { name: "React", description: "Frontend user interface library" },
        { name: "Node.js", description: "Backend JavaScript runtime" },
        { name: "Stripe", description: "Payment processing platform" },
        { name: "MongoDB", description: "Database for event and user data" },
        { name: "Socket.io", description: "Real-time communication" },
      ],
      faqs: [
        {
          question: "Can I sell different types of tickets?",
          answer: "Yes, you can create multiple ticket tiers with different pricing, benefits, and availability dates.",
        },
        {
          question: "How does the check-in process work?",
          answer: "Attendees receive QR codes with their tickets, which can be scanned using our mobile check-in app.",
        },
        {
          question: "Is there integration with email marketing tools?",
          answer: "Yes, the platform integrates with popular email marketing services for attendee communication.",
        },
      ],
    },
    "delivery-app": {
      id: "delivery-app",
      title: "Delivery App",
      description: "On-demand delivery application with real-time tracking, payment processing, and driver management.",
      longDescription:
        "Launch your own delivery service with our comprehensive on-demand delivery app. Features real-time tracking, driver management, payment processing, and everything needed for a successful delivery business.",
      image: "/images/delivery/product.png",
      gallery: [
        "/images/delivery/product-galary-1.png",
        "/images/delivery/product-galary-2.png",
        "/images/delivery/product-galary-3.png",
        "/images/delivery/product-galary-4.png",
      ],
      price: 899,
      salePrice: 799,
      category: "Mobile",
      rating: 4.8,
      reviews: 14,
      tags: ["React Native", "Firebase", "Google Maps"],
      features: [
        "Customer mobile app",
        "Driver mobile app",
        "Admin web dashboard",
        "Real-time order tracking",
        "Payment processing",
        "Driver management and verification",
        "Route optimization",
        "Push notifications",
        "Rating and review system",
        "Analytics and reporting",
      ],
      techStack: [
        { name: "React Native", description: "Cross-platform mobile app development" },
        { name: "Firebase", description: "Real-time database and backend services" },
        { name: "Google Maps", description: "Mapping and navigation services" },
        { name: "Stripe", description: "Payment processing" },
        { name: "Socket.io", description: "Real-time communication" },
      ],
      faqs: [
        {
          question: "Does it include both customer and driver apps?",
          answer: "Yes, the package includes separate apps for customers, drivers, and an admin web dashboard.",
        },
        {
          question: "How accurate is the real-time tracking?",
          answer:
            "The tracking uses GPS and updates every few seconds to provide accurate real-time location information.",
        },
        {
          question: "Can I customize the delivery fees?",
          answer:
            "Yes, you can set custom delivery fees based on distance, time, or other factors through the admin dashboard.",
        },
      ],
    },
  }

  return products[productId] || null
}

export default function ProductPage({ params }: { params: { productId: string } }) {
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false)
  const searchParams = useSearchParams()
  const product = getProductData(params.productId)

  const openWhatsAppChat = () => {
    const phoneNumber = "09128539578" // Replace with your WhatsApp business number
    const message = `Hi! I'm interested in the ${product?.title}. Can you help me with the purchase?`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  useEffect(() => { }, [searchParams])

  // If product not found, show 404
  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">

        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/marketplace">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Marketplace
              </Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  const relatedProducts = [
    {
      id: "blog-platform",
      title: "Blog Platform",
      image: "/images/blogging/product.png",
      price: 349,
      category: "Web",
    },
    {
      id: "portfolio-template",
      title: "Portfolio Template",
      image: "/images/portfolio/product.png",
      price: 249,
      category: "Web",
    },
    {
      id: "real-estate",
      title: "Real Estate Platform",
      image: "/images/real-estate/product.png",
      price: 699,
      category: "Web",
    },
  ].filter((p) => p.id !== product.id)

  return (
    <div className="flex min-h-screen flex-col">



      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="mb-6">
            <Link
              href="/pages/marketplace"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Marketplace
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 t">
            <div className="space-y-6">
              <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                width={600}
                height={400}
                className="h-full w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.gallery.map((image: string, index: number) => (
                  <div key={index} className="overflow-hidden rounded-lg border bg-muted cursor-pointer">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.title} screenshot ${index + 1}`}
                      width={150}
                      height={100}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{product.category}</Badge>
                  <div className="flex items-center text-sm">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground"
                            }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                </div>
                <h1 className="mt-2 text-3xl font-bold">{product.title}</h1>
                <p className="mt-2 text-muted-foreground">{product.description}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-primary">${product.salePrice}</div>
                {product.price !== product.salePrice && (
                  <>
                    <div className="text-xl text-muted-foreground line-through">${product.price}</div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                    </Badge>
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-1">
                {product.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="bg-muted/50">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Key Features</h3>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="w-full bg-green-600 hover:bg-green-700" onClick={openWhatsAppChat}>
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                </Button>
                <Button size="lg" variant="outline" className="w-full" onClick={() => setShowMaintenanceModal(true)}>
                  <CreditCard className="mr-2 h-5 w-5" />
                  Purchase Now
                </Button>
                <Button size="lg" variant="outline" className="w-full" onClick={() => setShowMaintenanceModal(true)}>
                  <Download className="mr-2 h-5 w-5" />
                  Download Demo
                </Button>
              </div>

              <div className="text-xs text-muted-foreground">
                <div className="flex items-center gap-2 mb-1">
                  <Lock className="h-3 w-3" />
                  Secure payment processing
                </div>
                <div>30-day money-back guarantee</div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Tabs defaultValue="details">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="tech-stack">Tech Stack</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Product Details</h2>
                  <p className="text-muted-foreground">{product.longDescription}</p>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[
                      {
                        title: "Easy to Customize",
                        description:
                          "Customize the template to match your brand with our easy-to-use configuration options.",
                      },
                      {
                        title: "Fully Responsive",
                        description:
                          "The template is fully responsive and works on all devices, from mobile to desktop.",
                      },
                      {
                        title: "Well Documented",
                        description:
                          "Comprehensive documentation and code comments to help you understand and modify the code.",
                      },
                    ].map((item, i) => (
                      <Card key={i} className="border-0 shadow-md">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="tech-stack" className="mt-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Technology Stack</h2>
                  <p className="text-muted-foreground">This product is built with the following technologies:</p>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {product.techStack.map((tech: any, index: number) => (
                      <Card key={index} className="border-0 shadow-md">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
                          <p className="text-muted-foreground">{tech.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="faq" className="mt-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {product.faqs.map((faq: any, index: number) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Customer Reviews</h2>
                  <div className="flex items-center gap-4">
                    <div className="text-5xl font-bold">{product.rating}</div>
                    <div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground"
                              }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">Based on {product.reviews} reviews</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        name: "John Doe",
                        rating: 5,
                        date: "2 months ago",
                        review:
                          "This template saved me so much time. It's well designed and the code is clean and easy to understand.",
                      },
                      {
                        name: "Jane Smith",
                        rating: 4,
                        date: "1 month ago",
                        review:
                          "Great product! The documentation is comprehensive and the support team is very responsive.",
                      },
                      {
                        name: "Robert Johnson",
                        rating: 5,
                        date: "2 weeks ago",
                        review:
                          "Excellent quality and easy to customize. Highly recommended for anyone starting a new project.",
                      },
                    ].map((review, i) => (
                      <div key={i} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                              {review.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <p className="font-medium">{review.name}</p>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, j) => (
                              <Star
                                key={j}
                                className={`h-4 w-4 ${j < review.rating ? "fill-primary text-primary" : "text-muted-foreground"
                                  }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-sm">{review.review}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Related Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Card key={relatedProduct.id} className="overflow-hidden border-0 shadow-lg">
                    <Link href={`/pages/marketplace/${relatedProduct.id}`} className="block">
                      <div className="aspect-video w-full overflow-hidden">
                        <Image
                          src={relatedProduct.image || "/placeholder.svg"}
                          alt={relatedProduct.title}
                          width={300}
                          height={200}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    </Link>
                    <CardContent className="p-4">
                      <Badge variant="secondary">{relatedProduct.category}</Badge>
                      <Link href={`/pages/marketplace/${relatedProduct.id}`} className="block">
                        <h3 className="mt-2 text-xl font-bold hover:text-primary transition-colors">
                          {relatedProduct.title}
                        </h3>
                      </Link>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="text-lg font-bold">${relatedProduct.price}</div>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/pages/marketplace/${relatedProduct.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
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
              inquiries about <strong>{product?.title}</strong>.
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
