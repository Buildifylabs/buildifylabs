"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Layout, Palette, Type } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LandingPageCreator() {
  const [activeTab, setActiveTab] = useState("templates")

  const themes = [
    {
      id: 1,
      image: "/themes/theme1.png"
    },
    {
      id: 2,
      image: "/themes/theme2.png"
    },
    {
      id: 3,
      image: "/themes/theme3.png"
    },
    {
      id: 4,
      image: "/themes/theme4.png"
    }
  ]

  return (
    <section id="creator" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                New Feature
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Create Your Business Landing Page in Minutes
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our intuitive landing page creator lets you build professional pages without any coding knowledge.
              </p>
            </div>
            <ul className="grid gap-2">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Choose from professionally designed templates</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Customize colors, fonts, and layouts</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Add your own content and images</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Publish to your own domain in one click</span>
              </li>
            </ul>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="group" asChild>
                <Link href="/pages/page-creator">
                  Start Creating
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pages//page-creator#examples">View Examples</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="templates">
                  <Layout className="mr-2 h-4 w-4" />
                  Templates
                </TabsTrigger>
                <TabsTrigger value="customize">
                  <Palette className="mr-2 h-4 w-4" />
                  Customize
                </TabsTrigger>
                <TabsTrigger value="content">
                  <Type className="mr-2 h-4 w-4" />
                  Content
                </TabsTrigger>
              </TabsList>
              <TabsContent value="templates" className="mt-4">
                <Card className="border-0 shadow-md">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-2 gap-2 p-4">
                      {themes.map((i) => (
                        <div key={i.id} className="overflow-hidden rounded-lg border">
                          <Image
                            src={i.image}
                            width={160}
                            height={120}
                            alt={`Template ${i}`}
                            className="h-full w-full object-cover transition-transform hover:scale-105 cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="customize" className="mt-4">
                <Card className="border-0 shadow-md">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Color Theme</label>
                        <div className="flex gap-2">
                          {["bg-primary", "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500"].map(
                            (color, i) => (
                              <div
                                key={i}
                                className={`h-8 w-8 rounded-full ${color} cursor-pointer ring-offset-2 ${
                                  i === 0 ? "ring-2 ring-primary" : ""
                                }`}
                              />
                            ),
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Font Style</label>
                        <div className="grid grid-cols-2 gap-2">
                          {["Modern", "Classic", "Playful", "Elegant"].map((font, i) => (
                            <div
                              key={i}
                              className={`rounded-md border p-2 text-center cursor-pointer ${
                                i === 0 ? "border-primary bg-primary/10" : ""
                              }`}
                            >
                              {font}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="content" className="mt-4">
                <Card className="border-0 shadow-md">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Sections</label>
                        <div className="space-y-2">
                          {["Hero", "Features", "Testimonials", "Pricing", "Contact"].map((section, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between rounded-md border p-2 cursor-pointer hover:bg-muted/50"
                            >
                              <span>{section}</span>
                              <Check className={`h-4 w-4 ${i < 3 ? "text-primary" : "text-muted"}`} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
}
