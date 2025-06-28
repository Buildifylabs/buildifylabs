import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Quote } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      content:
        "Buildifylabs transformed our business with a stunning website and mobile app. Their team was professional, responsive, and delivered beyond our expectations.",
      author: "Sarah Johnson",
      role: "CEO, Retail Solutions",
      avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    },
    {
      id: 2,
      content:
        "The landing page creator tool saved us thousands in development costs. We were able to launch our product in record time with a professional online presence.",
      author: "Michael Chen",
      role: "Founder, StartupX",
      avatar: "/placeholder.svg?height=40&width=40&text=MC",
    },
    {
      id: 3,
      content:
        "We purchased their e-commerce template from the marketplace and had it customized to our needs. The quality of code and support was exceptional.",
      author: "Emily Rodriguez",
      role: "Marketing Director, Fashion Brand",
      avatar: "/placeholder.svg?height=40&width=40&text=ER",
    },
  ]

  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Clients Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-4xl py-12">
          <Tabs defaultValue="1" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="1">Sarah Johnson</TabsTrigger>
              <TabsTrigger value="2">Michael Chen</TabsTrigger>
              <TabsTrigger value="3">Emily Rodriguez</TabsTrigger>
            </TabsList>
            <TabsContent value="1" className="mt-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <Quote className="h-8 w-8 text-primary opacity-70" />
                    <p className="text-lg">{testimonials[0].content}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center gap-4 p-6 pt-0">
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={testimonials[0].avatar || "/placeholder.svg"}
                      width={40}
                      height={40}
                      alt={testimonials[0].author}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{testimonials[0].author}</p>
                    <p className="text-sm text-muted-foreground">{testimonials[0].role}</p>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="2" className="mt-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <Quote className="h-8 w-8 text-primary opacity-70" />
                    <p className="text-lg">{testimonials[1].content}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center gap-4 p-6 pt-0">
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={testimonials[1].avatar || "/placeholder.svg"}
                      width={40}
                      height={40}
                      alt={testimonials[1].author}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{testimonials[1].author}</p>
                    <p className="text-sm text-muted-foreground">{testimonials[1].role}</p>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="3" className="mt-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <Quote className="h-8 w-8 text-primary opacity-70" />
                    <p className="text-lg">{testimonials[2].content}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center gap-4 p-6 pt-0">
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={testimonials[2].avatar || "/placeholder.svg"}
                      width={40}
                      height={40}
                      alt={testimonials[2].author}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{testimonials[2].author}</p>
                    <p className="text-sm text-muted-foreground">{testimonials[2].role}</p>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
