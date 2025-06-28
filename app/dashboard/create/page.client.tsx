"use client"

import { useState, useEffect, useCallback , Suspense} from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Eye,
  Layers,
  Palette,
  Save,
  Settings,
  Type,
  Plus,
  Trash2,
  Upload,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

interface LandingPageContent {
  hero: {
    heading: string
    subheading: string
    ctaText: string
    backgroundImage: string
  }
  features: {
    heading: string
    items: Array<{
      title: string
      description: string
      icon: string
    }>
  }
  about: {
    heading: string
    content: string
    image: string
  }
  contact: {
    heading: string
    email: string
    phone: string
    address: string
    showMap: boolean
  }
}

interface PageSettings {
  title: string
  description: string
  url: string
  theme: string
  colorTheme: string
  fontStyle: string
  layout: string
  socialMedia: {
    facebook: boolean
    twitter: boolean
    instagram: boolean
    linkedin: boolean
  }
  analytics: {
    enabled: boolean
    googleAnalyticsId: string
  }
  visibility: string
  customDomain: {
    enabled: boolean
    domain: string
  }
}

const themes = [
  { id: "business", name: "Business", image: "/placeholder.svg?height=120&width=160&text=Business" },
  { id: "creative", name: "Creative", image: "/placeholder.svg?height=120&width=160&text=Creative" },
  { id: "restaurant", name: "Restaurant", image: "/placeholder.svg?height=120&width=160&text=Restaurant" },
  { id: "fitness", name: "Fitness", image: "/placeholder.svg?height=120&width=160&text=Fitness" },
  { id: "portfolio", name: "Portfolio", image: "/placeholder.svg?height=120&width=160&text=Portfolio" },
  { id: "event", name: "Event", image: "/placeholder.svg?height=120&width=160&text=Event" },
]

const colorThemes = [
  { id: "blue", color: "bg-blue-500", name: "Blue" },
  { id: "green", color: "bg-green-500", name: "Green" },
  { id: "purple", color: "bg-purple-500", name: "Purple" },
  { id: "orange", color: "bg-orange-500", name: "Orange" },
  { id: "red", color: "bg-red-500", name: "Red" },
  { id: "teal", color: "bg-teal-500", name: "Teal" },
]

const fontStyles = [
  { id: "modern", name: "Modern" },
  { id: "classic", name: "Classic" },
  { id: "playful", name: "Playful" },
  { id: "elegant", name: "Elegant" },
]

export default function PageCreatorDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("themes")
  const [previewMode, setPreviewMode] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showPublishDialog, setShowPublishDialog] = useState(false)
  const [publishSuccess, setPublishSuccess] = useState(false)

  const [content, setContent] = useState<LandingPageContent>({
    hero: {
      heading: "Welcome to Your Business",
      subheading: "We provide the best services for your needs",
      ctaText: "Get Started",
      backgroundImage: "/placeholder.svg?height=400&width=800&text=Hero+Background",
    },
    features: {
      heading: "Our Features",
      items: [
        {
          title: "Feature 1",
          description: "This is a description for feature 1. Explain the benefits here.",
          icon: "star",
        },
        {
          title: "Feature 2",
          description: "This is a description for feature 2. Explain the benefits here.",
          icon: "heart",
        },
        {
          title: "Feature 3",
          description: "This is a description for feature 3. Explain the benefits here.",
          icon: "shield",
        },
      ],
    },
    about: {
      heading: "About Us",
      content: "Tell your story here. Explain what makes your business unique and why customers should choose you.",
      image: "/placeholder.svg?height=300&width=400&text=About+Image",
    },
    contact: {
      heading: "Get In Touch",
      email: "contact@yourbusiness.com",
      phone: "+1 (234) 567-8900",
      address: "123 Business Street, City, State, ZIP",
      showMap: true,
    },
  })

  const [settings, setSettings] = useState<PageSettings>({
    title: "Your Business - Official Website",
    description:
      "Your Business provides top-quality services for all your needs. Contact us today for a free consultation.",
    url: "",
    theme: "business",
    colorTheme: "blue",
    fontStyle: "modern",
    layout: "centered",
    socialMedia: {
      facebook: false,
      twitter: false,
      instagram: false,
      linkedin: false,
    },
    analytics: {
      enabled: false,
      googleAnalyticsId: "",
    },
    visibility: "public",
    customDomain: {
      enabled: false,
      domain: "",
    },
  })

  const [sections, setSections] = useState([
    { id: "hero", name: "Hero Section", enabled: true },
    { id: "features", name: "Features", enabled: true },
    { id: "about", name: "About Us", enabled: true },
    { id: "testimonials", name: "Testimonials", enabled: false },
    { id: "pricing", name: "Pricing", enabled: false },
    { id: "contact", name: "Contact Form", enabled: true },
  ])

  // Get domain from URL params - use useCallback to prevent infinite loops
  const initializeDomain = useCallback(() => {
    const domain = searchParams.get("domain")
    if (domain && settings.url !== domain) {
      setSettings((prev) => ({ ...prev, url: domain }))
    }
  }, [searchParams, settings.url])

  useEffect(() => {
    initializeDomain()
  }, [initializeDomain])

  const updateContent = useCallback((section: keyof LandingPageContent, field: string, value: any) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }, [])

  const updateSettings = useCallback((field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  const addFeature = useCallback(() => {
    setContent((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        items: [
          ...prev.features.items,
          {
            title: `Feature ${prev.features.items.length + 1}`,
            description: `This is a description for feature ${prev.features.items.length + 1}. Explain the benefits here.`,
            icon: "star",
          },
        ],
      },
    }))
  }, [])

  const removeFeature = useCallback((index: number) => {
    setContent((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        items: prev.features.items.filter((_, i) => i !== index),
      },
    }))
  }, [])

  const updateFeature = useCallback((index: number, field: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        items: prev.features.items.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
      },
    }))
  }, [])

  const toggleSection = useCallback((sectionId: string) => {
    setSections((prev) =>
      prev.map((section) => (section.id === sectionId ? { ...section, enabled: !section.enabled } : section)),
    )
  }, [])

  const handleSave = useCallback(async () => {
    setSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Changes saved!",
        description: "Your landing page has been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }, [])

  const handlePublish = useCallback(async () => {
    if (!settings.url) {
      toast({
        title: "Error",
        description: "Please set a URL for your landing page.",
        variant: "destructive",
      })
      return
    }

    setSaving(true)
    try {
      const response = await fetch("/api/save-landing-page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageName: settings.url,
          content,
          settings,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setPublishSuccess(true)
        toast({
          title: "Page published!",
          description: `Your landing page is now live at ${result.url}`,
        })
      } else {
        throw new Error("Failed to publish")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish page. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }, [settings.url, content, settings])

  const generatePreviewHTML = useCallback(() => {
    const selectedTheme = themes.find((t) => t.id === settings.theme)
    const selectedColor = colorThemes.find((c) => c.id === settings.colorTheme)

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=width, initial-scale=1.0">
        <title>${settings.title}</title>
        <meta name="description" content="${settings.description}">
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          .theme-${settings.theme} { font-family: ${settings.fontStyle === "modern" ? "system-ui" : settings.fontStyle === "classic" ? "serif" : settings.fontStyle === "playful" ? "cursive" : "serif"}; }
          .color-${settings.colorTheme} { --primary-color: ${selectedColor?.color.replace("bg-", "")}; }
        </style>
      </head>
      <body class="theme-${settings.theme} color-${settings.colorTheme}">
        ${sections.find((s) => s.id === "hero" && s.enabled)
        ? `
        <section class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div class="text-center px-4">
            <h1 class="text-4xl md:text-6xl font-bold mb-4">${content.hero.heading}</h1>
            <p class="text-xl md:text-2xl mb-8">${content.hero.subheading}</p>
            <button class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              ${content.hero.ctaText}
            </button>
          </div>
        </section>
        `
        : ""
      }
        
        ${sections.find((s) => s.id === "features" && s.enabled)
        ? `
        <section class="py-16 px-4">
          <div class="max-w-6xl mx-auto">
            <h2 class="text-3xl font-bold text-center mb-12">${content.features.heading}</h2>
            <div class="grid md:grid-cols-3 gap-8">
              ${content.features.items
          .map(
            (item) => `
                <div class="text-center p-6 rounded-lg shadow-lg">
                  <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-2xl">⭐</span>
                  </div>
                  <h3 class="text-xl font-semibold mb-2">${item.title}</h3>
                  <p class="text-gray-600">${item.description}</p>
                </div>
              `,
          )
          .join("")}
            </div>
          </div>
        </section>
        `
        : ""
      }
        
        ${sections.find((s) => s.id === "about" && s.enabled)
        ? `
        <section class="py-16 px-4 bg-gray-50">
          <div class="max-w-6xl mx-auto">
            <div class="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 class="text-3xl font-bold mb-6">${content.about.heading}</h2>
                <p class="text-gray-600 leading-relaxed">${content.about.content}</p>
              </div>
              <div class="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <span class="text-gray-500">About Image</span>
              </div>
            </div>
          </div>
        </section>
        `
        : ""
      }
        
        ${sections.find((s) => s.id === "contact" && s.enabled)
        ? `
        <section class="py-16 px-4">
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-3xl font-bold mb-12">${content.contact.heading}</h2>
            <div class="grid md:grid-cols-3 gap-8">
              <div>
                <h3 class="font-semibold mb-2">Email</h3>
                <p class="text-gray-600">${content.contact.email}</p>
              </div>
              <div>
                <h3 class="font-semibold mb-2">Phone</h3>
                <p class="text-gray-600">${content.contact.phone}</p>
              </div>
              <div>
                <h3 class="font-semibold mb-2">Address</h3>
                <p class="text-gray-600">${content.contact.address}</p>
              </div>
            </div>
          </div>
        </section>
        `
        : ""
      }
      </body>
      </html>
    `
  }, [settings, content, sections])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Layers className="h-6 w-6" />
              <span className="text-xl font-bold">TechForge</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => setPreviewMode(!previewMode)}>
              <Eye className="mr-2 h-4 w-4" />
              {previewMode ? "Edit Mode" : "Preview"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleSave} disabled={saving}>
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button size="sm" onClick={() => setShowPublishDialog(true)}>
              <Globe className="mr-2 h-4 w-4" />
              Publish
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {!previewMode && (
          <aside className="w-64 border-r bg-muted/40">
            <div className="flex h-14 items-center border-b px-4">
              <Link
                href="/dashboard"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Dashboard
              </Link>
            </div>
            <nav className="grid gap-1 p-2">
              <Button
                variant={activeTab === "themes" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("themes")}
              >
                <Palette className="mr-2 h-4 w-4" />
                Themes
              </Button>
              <Button
                variant={activeTab === "content" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("content")}
              >
                <Type className="mr-2 h-4 w-4" />
                Content
              </Button>
              <Button
                variant={activeTab === "settings" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </nav>
          </aside>
        )}

        <main className={`flex-1 ${previewMode ? "" : "p-4 md:p-6"}`}>
          {previewMode ? (
            <div className="h-full">
              <iframe srcDoc={generatePreviewHTML()} className="h-full w-full border-0" title="Preview" />
            </div>
          ) : (
            <div className="mx-auto max-w-4xl">
              <div className="mb-6">
                <h1 className="text-2xl font-bold">Create Your Landing Page</h1>
                <p className="text-muted-foreground">
                  Customize your landing page with our easy-to-use editor
                  {settings.url && (
                    <span className="ml-2 text-primary font-medium">(URL: techforge.com/{settings.url})</span>
                  )}
                </p>
              </div>

              {activeTab === "themes" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Choose a Theme</h2>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {themes.map((theme) => (
                        <div
                          key={theme.id}
                          className={`cursor-pointer overflow-hidden rounded-lg border-2 transition-all hover:border-primary ${settings.theme === theme.id
                              ? "border-primary ring-2 ring-primary ring-offset-2"
                              : "border-muted"
                            }`}
                          onClick={() => updateSettings("theme", theme.id)}
                        >
                          <div className="relative aspect-video w-full overflow-hidden">
                            <Image
                              src={theme.image || "/placeholder.svg"}
                              alt={theme.name}
                              width={160}
                              height={120}
                              className="h-full w-full object-cover"
                            />
                            {settings.theme === theme.id && (
                              <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
                                <Check className="h-8 w-8 text-primary" />
                              </div>
                            )}
                          </div>
                          <div className="p-2 text-center text-sm font-medium">{theme.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Customize Appearance</h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Color Theme</Label>
                        <div className="flex gap-2">
                          {colorThemes.map((color) => (
                            <div
                              key={color.id}
                              className={`h-8 w-8 cursor-pointer rounded-full ${color.color} ring-offset-2 ${settings.colorTheme === color.id ? "ring-2 ring-primary" : ""
                                }`}
                              onClick={() => updateSettings("colorTheme", color.id)}
                              title={color.name}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Font Style</Label>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                          {fontStyles.map((font) => (
                            <div
                              key={font.id}
                              className={`cursor-pointer rounded-md border p-2 text-center ${settings.fontStyle === font.id ? "border-primary bg-primary/10" : ""
                                }`}
                              onClick={() => updateSettings("fontStyle", font.id)}
                            >
                              {font.name}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Layout Style</Label>
                        <Select value={settings.layout} onValueChange={(value) => updateSettings("layout", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select layout style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="centered">Centered</SelectItem>
                            <SelectItem value="sidebar">With Sidebar</SelectItem>
                            <SelectItem value="fullwidth">Full Width</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Page Sections</h2>
                    <div className="space-y-2">
                      {sections.map((section) => (
                        <div
                          key={section.id}
                          className="flex items-center justify-between rounded-md border p-3 hover:bg-muted/50"
                        >
                          <span>{section.name}</span>
                          <div className="flex items-center gap-2">
                            <Switch
                              id={section.id}
                              checked={section.enabled}
                              onCheckedChange={() => toggleSection(section.id)}
                            />
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "content" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Hero Section</h2>
                    <Card>
                      <CardContent className="p-4 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="hero-heading">Heading</Label>
                          <Input
                            id="hero-heading"
                            value={content.hero.heading}
                            onChange={(e) => updateContent("hero", "heading", e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hero-subheading">Subheading</Label>
                          <Input
                            id="hero-subheading"
                            value={content.hero.subheading}
                            onChange={(e) => updateContent("hero", "subheading", e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hero-cta">Call to Action Button</Label>
                          <Input
                            id="hero-cta"
                            value={content.hero.ctaText}
                            onChange={(e) => updateContent("hero", "ctaText", e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hero-image">Background Image</Label>
                          <div className="flex items-center gap-2">
                            <div className="h-16 w-24 overflow-hidden rounded-md border">
                              <Image
                                src={content.hero.backgroundImage || "/placeholder.svg"}
                                width={96}
                                height={64}
                                alt="Hero background"
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <Button variant="outline" size="sm">
                              <Upload className="mr-2 h-4 w-4" />
                              Change Image
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Features Section</h2>
                    <Card>
                      <CardContent className="p-4 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="features-heading">Section Heading</Label>
                          <Input
                            id="features-heading"
                            value={content.features.heading}
                            onChange={(e) => updateContent("features", "heading", e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Feature Items</Label>
                            <Button variant="outline" size="sm" onClick={addFeature}>
                              <Plus className="mr-2 h-4 w-4" />
                              Add Feature
                            </Button>
                          </div>
                          <ScrollArea className="h-64 rounded-md border">
                            <div className="p-4 space-y-4">
                              {content.features.items.map((feature, index) => (
                                <div key={index} className="space-y-2 pb-4 border-b last:border-0">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-medium">Feature {index + 1}</h4>
                                    <Button variant="ghost" size="sm" onClick={() => removeFeature(index)}>
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor={`feature-title-${index}`}>Title</Label>
                                    <Input
                                      id={`feature-title-${index}`}
                                      value={feature.title}
                                      onChange={(e) => updateFeature(index, "title", e.target.value)}
                                      className="w-full"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor={`feature-desc-${index}`}>Description</Label>
                                    <Textarea
                                      id={`feature-desc-${index}`}
                                      value={feature.description}
                                      onChange={(e) => updateFeature(index, "description", e.target.value)}
                                      className="w-full"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">About Section</h2>
                    <Card>
                      <CardContent className="p-4 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="about-heading">Section Heading</Label>
                          <Input
                            id="about-heading"
                            value={content.about.heading}
                            onChange={(e) => updateContent("about", "heading", e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="about-content">Content</Label>
                          <Textarea
                            id="about-content"
                            value={content.about.content}
                            onChange={(e) => updateContent("about", "content", e.target.value)}
                            className="w-full min-h-24"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="about-image">Section Image</Label>
                          <div className="flex items-center gap-2">
                            <div className="h-16 w-24 overflow-hidden rounded-md border">
                              <Image
                                src={content.about.image || "/placeholder.svg"}
                                width={96}
                                height={64}
                                alt="About image"
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <Button variant="outline" size="sm">
                              <Upload className="mr-2 h-4 w-4" />
                              Change Image
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Contact Section</h2>
                    <Card>
                      <CardContent className="p-4 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="contact-heading">Section Heading</Label>
                          <Input
                            id="contact-heading"
                            value={content.contact.heading}
                            onChange={(e) => updateContent("contact", "heading", e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contact-email">Contact Email</Label>
                          <Input
                            id="contact-email"
                            type="email"
                            value={content.contact.email}
                            onChange={(e) => updateContent("contact", "email", e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contact-phone">Contact Phone</Label>
                          <Input
                            id="contact-phone"
                            value={content.contact.phone}
                            onChange={(e) => updateContent("contact", "phone", e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contact-address">Address</Label>
                          <Textarea
                            id="contact-address"
                            value={content.contact.address}
                            onChange={(e) => updateContent("contact", "address", e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="show-map"
                            checked={content.contact.showMap}
                            onCheckedChange={(checked) => updateContent("contact", "showMap", checked)}
                          />
                          <Label htmlFor="show-map">Show Map</Label>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Page Settings</h2>
                    <Card>
                      <CardContent className="p-4 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="page-title">Page Title</Label>
                          <Input
                            id="page-title"
                            value={settings.title}
                            onChange={(e) => updateSettings("title", e.target.value)}
                            className="w-full"
                          />
                          <p className="text-xs text-muted-foreground">
                            This appears in browser tabs and search results
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="page-description">Meta Description</Label>
                          <Textarea
                            id="page-description"
                            value={settings.description}
                            onChange={(e) => updateSettings("description", e.target.value)}
                            className="w-full"
                          />
                          <p className="text-xs text-muted-foreground">This appears in search engine results</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="page-url">Page URL</Label>
                          <div className="flex items-center">
                            <span className="text-sm text-muted-foreground mr-2">techforge.com/</span>
                            <Input
                              id="page-url"
                              value={settings.url}
                              onChange={(e) => updateSettings("url", e.target.value)}
                              className="flex-1"
                            />
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <Label>Social Media Integration</Label>
                          <div className="space-y-2">
                            {Object.entries(settings.socialMedia).map(([platform, enabled]) => (
                              <div key={platform} className="flex items-center justify-between">
                                <span className="text-sm capitalize">{platform}</span>
                                <Switch
                                  id={`${platform}-integration`}
                                  checked={enabled}
                                  onCheckedChange={(checked) =>
                                    updateSettings("socialMedia", {
                                      ...settings.socialMedia,
                                      [platform]: checked,
                                    })
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <Label>Analytics</Label>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="enable-analytics"
                              checked={settings.analytics.enabled}
                              onCheckedChange={(checked) =>
                                updateSettings("analytics", {
                                  ...settings.analytics,
                                  enabled: checked,
                                })
                              }
                            />
                            <Label htmlFor="enable-analytics">Enable Analytics Tracking</Label>
                          </div>
                          {settings.analytics.enabled && (
                            <div className="space-y-2">
                              <Label htmlFor="analytics-id">Google Analytics ID</Label>
                              <Input
                                id="analytics-id"
                                placeholder="UA-XXXXXXXXX-X"
                                value={settings.analytics.googleAnalyticsId}
                                onChange={(e) =>
                                  updateSettings("analytics", {
                                    ...settings.analytics,
                                    googleAnalyticsId: e.target.value,
                                  })
                                }
                                className="w-full"
                              />
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Publishing Options</h2>
                    <Card>
                      <CardContent className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Page Visibility</h3>
                            <p className="text-sm text-muted-foreground">Control who can see your landing page</p>
                          </div>
                          <Select
                            value={settings.visibility}
                            onValueChange={(value) => updateSettings("visibility", value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">Public</SelectItem>
                              <SelectItem value="private">Private</SelectItem>
                              <SelectItem value="password">Password Protected</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="custom-domain"
                              checked={settings.customDomain.enabled}
                              onCheckedChange={(checked) =>
                                updateSettings("customDomain", {
                                  ...settings.customDomain,
                                  enabled: checked,
                                })
                              }
                            />
                            <Label htmlFor="custom-domain">Use Custom Domain</Label>
                          </div>
                          {settings.customDomain.enabled && (
                            <div className="space-y-2">
                              <Label htmlFor="domain-name">Domain Name</Label>
                              <Input
                                id="domain-name"
                                placeholder="yourbusiness.com"
                                value={settings.customDomain.domain}
                                onChange={(e) =>
                                  updateSettings("customDomain", {
                                    ...settings.customDomain,
                                    domain: e.target.value,
                                  })
                                }
                                className="w-full"
                              />
                              <p className="text-xs text-muted-foreground">
                                Available on Professional and Enterprise plans
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Publish Dialog */}
      <Dialog open={showPublishDialog} onOpenChange={setShowPublishDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Publish Your Landing Page</DialogTitle>
            <DialogDescription>Your landing page will be published at: techforge.com/{settings.url}</DialogDescription>
          </DialogHeader>
          {publishSuccess ? (
            <div className="text-center py-6">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Page Published Successfully!</h3>
              <p className="text-muted-foreground mb-4">Your landing page is now live and accessible to visitors.</p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowPublishDialog(false)}>
                  Close
                </Button>
                <Button onClick={() => window.open(`https://techforge.com/${settings.url}`, "_blank")}>
                  View Live Page
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Page URL</Label>
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground mr-2">techforge.com/</span>
                  <Input
                    value={settings.url}
                    onChange={(e) => updateSettings("url", e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowPublishDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handlePublish} disabled={saving}>
                  {saving ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Publishing...
                    </div>
                  ) : (
                    <>
                      <Globe className="mr-2 h-4 w-4" />
                      Publish Now
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>

    </Suspense>
      )
}
