"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Eye,
  Save,
  ArrowLeft,
  Settings,
  Palette,
  Type,
  ImageIcon,
  Layout,
  Plus,
  Trash2,
  Upload,
  Check,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  X,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface PageEditorProps {
  pageId: string
}

interface FeatureItem {
  title: string
  description: string
  icon: string
}

interface ThemeConfig {
  id: string
  name: string
  image: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  fonts: {
    heading: string
    body: string
  }
  layout: {
    heroStyle: string
    featuresLayout: string
    spacing: string
  }
}

interface PageData {
  hero: {
    title: string
    headline: string
    subheadline: string
    ctaText: string
    ctaUrl: string
    heroImage: string
    backgroundColor: string
    primaryColor: string
    fontFamily: string
  }
  features: {
    heading: string
    items: FeatureItem[]
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

interface SocialMediaLinks {
  facebook: { enabled: boolean; url: string }
  twitter: { enabled: boolean; url: string }
  instagram: { enabled: boolean; url: string }
  linkedin: { enabled: boolean; url: string }
}

interface PageSettings {
  theme: string
  customColors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  fontStyle: string
  layout: string
  title: string
  description: string
  url: string
  visibility: string
  socialMedia: SocialMediaLinks
  analytics: {
    enabled: boolean
    googleAnalyticsId: string
  }
  customDomain: {
    enabled: boolean
    domain: string
  }
}

interface Section {
  id: string
  name: string
  enabled: boolean
}

export function PageEditor({ pageId }: PageEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [pageData, setPageData] = useState<PageData>({
    hero: {
      title: "SaaS Product Launch",
      headline: "Transform Your Business with Our Revolutionary SaaS Platform",
      subheadline:
        "Streamline operations, boost productivity, and scale your business with our cutting-edge software solution.",
      ctaText: "Start Free Trial",
      ctaUrl: "#",
      heroImage: "/placeholder.svg?height=400&width=600",
      backgroundColor: "#ffffff",
      primaryColor: "#3b82f6",
      fontFamily: "Inter",
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
    theme: "business",
    customColors: {
      primary: "#3b82f6",
      secondary: "#64748b",
      accent: "#f59e0b",
      background: "#ffffff",
      text: "#1f2937",
    },
    fontStyle: "modern",
    layout: "centered",
    title: "My Landing Page",
    description: "A beautiful landing page created with our page builder",
    url: "my-landing-page",
    visibility: "public",
    socialMedia: {
      facebook: { enabled: false, url: "https://facebook.com/yourpage" },
      twitter: { enabled: false, url: "https://twitter.com/yourhandle" },
      instagram: { enabled: false, url: "https://instagram.com/yourhandle" },
      linkedin: { enabled: false, url: "https://linkedin.com/company/yourcompany" },
    },
    analytics: {
      enabled: false,
      googleAnalyticsId: "",
    },
    customDomain: {
      enabled: false,
      domain: "",
    },
  })

  const [sections, setSections] = useState<Section[]>([
    { id: "hero", name: "Hero Section", enabled: true },
    { id: "features", name: "Features Section", enabled: true },
    { id: "about", name: "About Section", enabled: true },
    { id: "contact", name: "Contact Section", enabled: true },
  ])

  // Theme configurations
  const themes: ThemeConfig[] = [
    {
      id: "business",
      name: "Business",
      image: "/placeholder.svg?height=120&width=160&text=Business",
      colors: {
        primary: "#1e40af",
        secondary: "#64748b",
        accent: "#f59e0b",
        background: "#ffffff",
        text: "#1f2937",
      },
      fonts: {
        heading: "Inter",
        body: "Inter",
      },
      layout: {
        heroStyle: "centered",
        featuresLayout: "grid",
        spacing: "normal",
      },
    },
    {
      id: "creative",
      name: "Creative",
      image: "/placeholder.svg?height=120&width=160&text=Creative",
      colors: {
        primary: "#7c3aed",
        secondary: "#ec4899",
        accent: "#06b6d4",
        background: "#fafafa",
        text: "#374151",
      },
      fonts: {
        heading: "Playfair Display",
        body: "Inter",
      },
      layout: {
        heroStyle: "asymmetric",
        featuresLayout: "cards",
        spacing: "relaxed",
      },
    },
    {
      id: "restaurant",
      name: "Restaurant",
      image: "/placeholder.svg?height=120&width=160&text=Restaurant",
      colors: {
        primary: "#dc2626",
        secondary: "#92400e",
        accent: "#f59e0b",
        background: "#fffbeb",
        text: "#451a03",
      },
      fonts: {
        heading: "Playfair Display",
        body: "Inter",
      },
      layout: {
        heroStyle: "fullscreen",
        featuresLayout: "showcase",
        spacing: "cozy",
      },
    },
    {
      id: "fitness",
      name: "Fitness",
      image: "/placeholder.svg?height=120&width=160&text=Fitness",
      colors: {
        primary: "#059669",
        secondary: "#0d9488",
        accent: "#f97316",
        background: "#f0fdf4",
        text: "#064e3b",
      },
      fonts: {
        heading: "Inter",
        body: "Inter",
      },
      layout: {
        heroStyle: "split",
        featuresLayout: "timeline",
        spacing: "tight",
      },
    },
    {
      id: "portfolio",
      name: "Portfolio",
      image: "/placeholder.svg?height=120&width=160&text=Portfolio",
      colors: {
        primary: "#1f2937",
        secondary: "#6b7280",
        accent: "#3b82f6",
        background: "#ffffff",
        text: "#111827",
      },
      fonts: {
        heading: "Inter",
        body: "Inter",
      },
      layout: {
        heroStyle: "minimal",
        featuresLayout: "masonry",
        spacing: "spacious",
      },
    },
    {
      id: "event",
      name: "Event",
      image: "/placeholder.svg?height=120&width=160&text=Event",
      colors: {
        primary: "#be185d",
        secondary: "#7c2d12",
        accent: "#eab308",
        background: "#fdf2f8",
        text: "#831843",
      },
      fonts: {
        heading: "Playfair Display",
        body: "Inter",
      },
      layout: {
        heroStyle: "celebration",
        featuresLayout: "timeline",
        spacing: "festive",
      },
    },
  ]

  const fontStyles = [
    { id: "modern", name: "Modern", heading: "Inter", body: "Inter" },
    { id: "classic", name: "Classic", heading: "Playfair Display", body: "Georgia" },
    { id: "playful", name: "Playful", heading: "Poppins", body: "Poppins" },
    { id: "elegant", name: "Elegant", heading: "Playfair Display", body: "Inter" },
  ]

  // Get current theme configuration
  const getCurrentTheme = (): ThemeConfig => {
    return themes.find((theme) => theme.id === settings.theme) || themes[0]
  }

  // Get current font configuration
  const getCurrentFont = () => {
    return fontStyles.find((font) => font.id === settings.fontStyle) || fontStyles[0]
  }

  // Get effective colors (theme colors or custom colors)
  const getEffectiveColors = () => {
    const currentTheme = getCurrentTheme()
    return {
      primary: settings.customColors.primary || currentTheme.colors.primary,
      secondary: settings.customColors.secondary || currentTheme.colors.secondary,
      accent: settings.customColors.accent || currentTheme.colors.accent,
      background: settings.customColors.background || currentTheme.colors.background,
      text: settings.customColors.text || currentTheme.colors.text,
    }
  }

  // Helper functions for updating state
  const updateHero = (field: keyof PageData["hero"], value: string) => {
    setPageData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value,
      },
    }))
  }

  const updateFeatures = (field: keyof PageData["features"], value: any) => {
    setPageData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [field]: value,
      },
    }))
  }

  const updateAbout = (field: keyof PageData["about"], value: string) => {
    setPageData((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        [field]: value,
      },
    }))
  }

  const updateContact = (field: keyof PageData["contact"], value: any) => {
    setPageData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value,
      },
    }))
  }

  const updateSettings = (field: keyof PageSettings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateCustomColor = (colorType: keyof PageSettings["customColors"], color: string) => {
    setSettings((prev) => ({
      ...prev,
      customColors: {
        ...prev.customColors,
        [colorType]: color,
      },
    }))
  }

  const updateSocialMedia = (platform: keyof SocialMediaLinks, field: "enabled" | "url", value: boolean | string) => {
    setSettings((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: {
          ...prev.socialMedia[platform],
          [field]: value,
        },
      },
    }))
  }

  const applyTheme = (themeId: string) => {
    const theme = themes.find((t) => t.id === themeId)
    if (theme) {
      setSettings((prev) => ({
        ...prev,
        theme: themeId,
        customColors: theme.colors,
      }))
    }
  }

  // Handle hero image upload
  const handleHeroImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        updateHero("heroImage", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerHeroImageUpload = () => {
    fileInputRef.current?.click()
  }

  const addFeature = () => {
    const newFeature: FeatureItem = {
      title: `Feature ${pageData.features.items.length + 1}`,
      description: "Describe this feature and its benefits.",
      icon: "star",
    }
    updateFeatures("items", [...pageData.features.items, newFeature])
  }

  const removeFeature = (index: number) => {
    const updatedItems = pageData.features.items.filter((_, i) => i !== index)
    updateFeatures("items", updatedItems)
  }

  const updateFeature = (index: number, field: keyof FeatureItem, value: string) => {
    const updatedItems = pageData.features.items.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    updateFeatures("items", updatedItems)
  }

  const toggleSection = (sectionId: string) => {
    setSections((prev) =>
      prev.map((section) => (section.id === sectionId ? { ...section, enabled: !section.enabled } : section)),
    )
  }

  const handleSave = () => {
    console.log("Saving page data:", { pageData, settings, sections })
  }

  // Color picker component
  const ColorPicker = ({
    color,
    onChange,
    label,
  }: { color: string; onChange: (color: string) => void; label: string }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left font-normal">
            <div className="w-4 h-4 rounded border mr-2" style={{ backgroundColor: color }} />
            {color}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-3">
            <Input type="color" value={color} onChange={(e) => onChange(e.target.value)} className="w-full h-10" />
            <Input type="text" value={color} onChange={(e) => onChange(e.target.value)} placeholder="#000000" />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )

  // Get theme-specific styles
  const getThemeStyles = () => {
    const currentTheme = getCurrentTheme()
    const currentFont = getCurrentFont()
    const colors = getEffectiveColors()

    return {
      colors,
      fonts: {
        heading: currentFont.heading,
        body: currentFont.body,
      },
      layout: currentTheme.layout,
    }
  }

  // Social Media Icons Component
  const SocialMediaIcons = () => {
    const enabledSocials = Object.entries(settings.socialMedia).filter(([_, social]) => social.enabled)

    if (enabledSocials.length === 0) return null

    const getSocialIcon = (platform: string) => {
      switch (platform) {
        case "facebook":
          return <Facebook className="h-5 w-5" />
        case "twitter":
          return <Twitter className="h-5 w-5" />
        case "instagram":
          return <Instagram className="h-5 w-5" />
        case "linkedin":
          return <Linkedin className="h-5 w-5" />
        default:
          return null
      }
    }

    return (
      <div className="flex justify-center space-x-4 mt-8">
        {enabledSocials.map(([platform, social]) => (
          <a
            key={platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full transition-all hover:scale-110 hover:shadow-lg"
            style={{
              backgroundColor: `${themeStyles.colors.primary}20`,
              color: themeStyles.colors.primary,
            }}
          >
            {getSocialIcon(platform)}
          </a>
        ))}
      </div>
    )
  }

  const themeStyles = getThemeStyles()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hidden file input for hero image upload */}
      <input type="file" ref={fileInputRef} onChange={handleHeroImageUpload} accept="image/*" className="hidden" />

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-xl font-semibold">Editing: {pageData.hero.title}</h1>
          </div>

          <div className="flex items-center space-x-2">
            <Button asChild variant="outline" size="sm">
              <Link href={`/dashboard/preview/${pageId}`}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Link>
            </Button>
            <Button onClick={handleSave} size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Page Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="content">
                      <Type className="h-4 w-4" />
                    </TabsTrigger>
                    <TabsTrigger value="design">
                      <Palette className="h-4 w-4" />
                    </TabsTrigger>
                    <TabsTrigger value="media">
                      <ImageIcon className="h-4 w-4" />
                    </TabsTrigger>
                    <TabsTrigger value="settings">
                      <Layout className="h-4 w-4" />
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-4 mt-4">
                    <Tabs defaultValue="hero">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="hero">Hero</TabsTrigger>
                        <TabsTrigger value="features">Features</TabsTrigger>
                        <TabsTrigger value="about">About</TabsTrigger>
                        <TabsTrigger value="contact">Contact</TabsTrigger>
                      </TabsList>

                      <TabsContent value="hero" className="space-y-4 mt-4">
                        <div>
                          <Label htmlFor="title">Page Title</Label>
                          <Input
                            id="title"
                            value={pageData.hero.title}
                            onChange={(e) => updateHero("title", e.target.value)}
                          />
                        </div>

                        <div>
                          <Label htmlFor="headline">Main Headline</Label>
                          <Input
                            id="headline"
                            value={pageData.hero.headline}
                            onChange={(e) => updateHero("headline", e.target.value)}
                          />
                        </div>

                        <div>
                          <Label htmlFor="subheadline">Subheadline</Label>
                          <Textarea
                            id="subheadline"
                            value={pageData.hero.subheadline}
                            onChange={(e) => updateHero("subheadline", e.target.value)}
                            rows={3}
                          />
                        </div>

                        <div>
                          <Label htmlFor="ctaText">Call-to-Action Text</Label>
                          <Input
                            id="ctaText"
                            value={pageData.hero.ctaText}
                            onChange={(e) => updateHero("ctaText", e.target.value)}
                          />
                        </div>

                        <div>
                          <Label htmlFor="ctaUrl">Call-to-Action URL</Label>
                          <Input
                            id="ctaUrl"
                            value={pageData.hero.ctaUrl}
                            onChange={(e) => updateHero("ctaUrl", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Hero Image</Label>
                          <div className="flex items-center gap-4">
                            <div className="h-20 w-32 overflow-hidden rounded-md border">
                              <Image
                                src={pageData.hero.heroImage || "/placeholder.svg"}
                                width={128}
                                height={80}
                                alt="Hero image"
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button variant="outline" size="sm" onClick={triggerHeroImageUpload}>
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Image
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateHero("heroImage", "/placeholder.svg?height=400&width=600")}
                              >
                                <X className="mr-2 h-4 w-4" />
                                Remove
                              </Button>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Recommended size: 1200x600px. Supports JPG, PNG, WebP
                          </p>
                        </div>
                      </TabsContent>

                      <TabsContent value="features">
                        <div className="space-y-4">
                          <h2 className="text-xl font-semibold">Features Section</h2>
                          <Card>
                            <CardContent className="p-4 space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="features-heading">Section Heading</Label>
                                <Input
                                  id="features-heading"
                                  value={pageData.features.heading}
                                  onChange={(e) => updateFeatures("heading", e.target.value)}
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
                                    {pageData.features.items.map((feature, index) => (
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
                      </TabsContent>

                      <TabsContent value="about">
                        <div className="space-y-4">
                          <h2 className="text-xl font-semibold">About Section</h2>
                          <Card>
                            <CardContent className="p-4 space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="about-heading">Section Heading</Label>
                                <Input
                                  id="about-heading"
                                  value={pageData.about.heading}
                                  onChange={(e) => updateAbout("heading", e.target.value)}
                                  className="w-full"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="about-content">Content</Label>
                                <Textarea
                                  id="about-content"
                                  value={pageData.about.content}
                                  onChange={(e) => updateAbout("content", e.target.value)}
                                  className="w-full min-h-24"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="about-image">Section Image</Label>
                                <div className="flex items-center gap-2">
                                  <div className="h-16 w-24 overflow-hidden rounded-md border">
                                    <Image
                                      src={pageData.about.image || "/placeholder.svg"}
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
                      </TabsContent>

                      <TabsContent value="contact">
                        <div className="space-y-4">
                          <h2 className="text-xl font-semibold">Contact Section</h2>
                          <Card>
                            <CardContent className="p-4 space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="contact-heading">Section Heading</Label>
                                <Input
                                  id="contact-heading"
                                  value={pageData.contact.heading}
                                  onChange={(e) => updateContact("heading", e.target.value)}
                                  className="w-full"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="contact-email">Contact Email</Label>
                                <Input
                                  id="contact-email"
                                  type="email"
                                  value={pageData.contact.email}
                                  onChange={(e) => updateContact("email", e.target.value)}
                                  className="w-full"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="contact-phone">Contact Phone</Label>
                                <Input
                                  id="contact-phone"
                                  value={pageData.contact.phone}
                                  onChange={(e) => updateContact("phone", e.target.value)}
                                  className="w-full"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="contact-address">Address</Label>
                                <Textarea
                                  id="contact-address"
                                  value={pageData.contact.address}
                                  onChange={(e) => updateContact("address", e.target.value)}
                                  className="w-full"
                                />
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="show-map"
                                  checked={pageData.contact.showMap}
                                  onCheckedChange={(checked) => updateContact("showMap", checked)}
                                />
                                <Label htmlFor="show-map">Show Map</Label>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </TabsContent>

                  <TabsContent value="design" className="space-y-4 mt-4">
                    <Tabs defaultValue="themes">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="themes">Themes</TabsTrigger>
                        <TabsTrigger value="appearance">Appearance</TabsTrigger>
                      </TabsList>

                      <TabsContent value="themes">
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Choose a Theme</h2>
                            <div className="grid grid-cols-2 gap-4">
                              {themes.map((theme) => (
                                <div
                                  key={theme.id}
                                  className={`cursor-pointer overflow-hidden rounded-lg border-2 transition-all hover:border-primary ${
                                    settings.theme === theme.id
                                      ? "border-primary ring-2 ring-primary ring-offset-2"
                                      : "border-muted"
                                  }`}
                                  onClick={() => applyTheme(theme.id)}
                                >
                                  <div className="relative aspect-video w-full overflow-hidden">
                                    <div
                                      className="h-full w-full p-2 text-xs"
                                      style={{
                                        backgroundColor: theme.colors.background,
                                        color: theme.colors.text,
                                      }}
                                    >
                                      <div
                                        className="h-4 w-full rounded mb-1"
                                        style={{ backgroundColor: theme.colors.primary }}
                                      />
                                      <div
                                        className="h-2 w-3/4 rounded mb-1"
                                        style={{ backgroundColor: theme.colors.secondary }}
                                      />
                                      <div
                                        className="h-2 w-1/2 rounded"
                                        style={{ backgroundColor: theme.colors.accent }}
                                      />
                                    </div>
                                    {settings.theme === theme.id && (
                                      <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
                                        <Check className="h-6 w-6 text-primary" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="p-2 text-center text-sm font-medium">{theme.name}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="appearance">
                        <div className="space-y-4">
                          <h2 className="text-xl font-semibold">Customize Colors</h2>
                          <div className="space-y-4">
                            <ColorPicker
                              color={themeStyles.colors.primary}
                              onChange={(color) => updateCustomColor("primary", color)}
                              label="Primary Color"
                            />
                            <ColorPicker
                              color={themeStyles.colors.secondary}
                              onChange={(color) => updateCustomColor("secondary", color)}
                              label="Secondary Color"
                            />
                            <ColorPicker
                              color={themeStyles.colors.accent}
                              onChange={(color) => updateCustomColor("accent", color)}
                              label="Accent Color"
                            />
                            <ColorPicker
                              color={themeStyles.colors.background}
                              onChange={(color) => updateCustomColor("background", color)}
                              label="Background Color"
                            />
                            <ColorPicker
                              color={themeStyles.colors.text}
                              onChange={(color) => updateCustomColor("text", color)}
                              label="Text Color"
                            />

                            <Separator />

                            <div className="space-y-2">
                              <Label>Font Style</Label>
                              <div className="grid grid-cols-1 gap-2">
                                {fontStyles.map((font) => (
                                  <div
                                    key={font.id}
                                    className={`cursor-pointer rounded-md border p-3 text-center transition-all ${
                                      settings.fontStyle === font.id
                                        ? "border-primary bg-primary/10"
                                        : "hover:bg-muted/50"
                                    }`}
                                    onClick={() => updateSettings("fontStyle", font.id)}
                                  >
                                    <div style={{ fontFamily: font.heading }} className="font-semibold">
                                      {font.name}
                                    </div>
                                    <div style={{ fontFamily: font.body }} className="text-sm text-muted-foreground">
                                      Sample text
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Layout Style</Label>
                              <Select
                                value={settings.layout}
                                onValueChange={(value) => updateSettings("layout", value)}
                              >
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
                      </TabsContent>
                    </Tabs>
                  </TabsContent>

                  <TabsContent value="media" className="space-y-4 mt-4">
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
                  </TabsContent>

                  <TabsContent value="settings" className="space-y-4 mt-4">
                    <Tabs defaultValue="general">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="publishing">Publishing</TabsTrigger>
                      </TabsList>

                      <TabsContent value="general">
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
                                  <span className="text-sm text-muted-foreground mr-2">buildifylabs.com/</span>
                                  <Input
                                    id="page-url"
                                    value={settings.url}
                                    onChange={(e) => updateSettings("url", e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                              </div>
                              <Separator />
                              <div className="space-y-4">
                                <Label className="text-base font-semibold">Social Media Integration</Label>
                                {Object.entries(settings.socialMedia).map(([platform, social]) => (
                                  <Card key={platform} className="p-4">
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                          {platform === "facebook" && <Facebook className="h-4 w-4" />}
                                          {platform === "twitter" && <Twitter className="h-4 w-4" />}
                                          {platform === "instagram" && <Instagram className="h-4 w-4" />}
                                          {platform === "linkedin" && <Linkedin className="h-4 w-4" />}
                                          <span className="text-sm font-medium capitalize">{platform}</span>
                                        </div>
                                        <Switch
                                          id={`${platform}-integration`}
                                          checked={social.enabled}
                                          onCheckedChange={(checked) =>
                                            updateSocialMedia(platform as keyof SocialMediaLinks, "enabled", checked)
                                          }
                                        />
                                      </div>
                                      {social.enabled && (
                                        <div className="space-y-2">
                                          <Label htmlFor={`${platform}-url`} className="text-xs">
                                            Profile URL
                                          </Label>
                                          <Input
                                            id={`${platform}-url`}
                                            value={social.url}
                                            onChange={(e) =>
                                              updateSocialMedia(
                                                platform as keyof SocialMediaLinks,
                                                "url",
                                                e.target.value,
                                              )
                                            }
                                            placeholder={`https://${platform}.com/yourprofile`}
                                            className="text-sm"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </Card>
                                ))}
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
                      </TabsContent>

                      <TabsContent value="publishing">
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
                      </TabsContent>
                    </Tabs>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div
                  className="min-h-[600px] border rounded-b-lg overflow-hidden"
                  style={{
                    backgroundColor: themeStyles.colors.background,
                    fontFamily: themeStyles.fonts.body,
                    color: themeStyles.colors.text,
                  }}
                >
                  {/* Hero Section Preview */}
                  {sections.find((s) => s.id === "hero")?.enabled && (
                    <div
                      className={`relative px-8 py-16 text-center ${
                        themeStyles.layout.heroStyle === "fullscreen"
                          ? "min-h-screen flex items-center"
                          : themeStyles.layout.heroStyle === "split"
                            ? "grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                            : themeStyles.layout.heroStyle === "asymmetric"
                              ? "text-left"
                              : themeStyles.layout.heroStyle === "minimal"
                                ? "py-24"
                                : themeStyles.layout.heroStyle === "celebration"
                                  ? "py-20 bg-gradient-to-br from-pink-50 to-purple-50"
                                  : ""
                      }`}
                      style={{
                        backgroundColor:
                          themeStyles.layout.heroStyle === "celebration"
                            ? "transparent"
                            : themeStyles.colors.background,
                      }}
                    >
                      <div
                        className={`max-w-4xl mx-auto ${themeStyles.layout.heroStyle === "asymmetric" ? "text-left" : "text-center"}`}
                      >
                        <h1
                          className={`font-bold mb-6 ${
                            themeStyles.layout.heroStyle === "minimal"
                              ? "text-3xl md:text-4xl"
                              : themeStyles.layout.heroStyle === "celebration"
                                ? "text-5xl md:text-7xl"
                                : "text-4xl md:text-6xl"
                          }`}
                          style={{
                            color: themeStyles.colors.primary,
                            fontFamily: themeStyles.fonts.heading,
                          }}
                        >
                          {pageData.hero.headline}
                        </h1>
                        <p
                          className={`text-xl mb-8 max-w-2xl ${themeStyles.layout.heroStyle === "asymmetric" ? "" : "mx-auto"}`}
                          style={{ color: themeStyles.colors.text }}
                        >
                          {pageData.hero.subheadline}
                        </p>
                        <button
                          className={`px-8 py-4 text-white font-semibold rounded-lg text-lg hover:opacity-90 transition-all transform hover:scale-105 ${
                            themeStyles.layout.heroStyle === "celebration" ? "shadow-2xl" : "shadow-lg"
                          }`}
                          style={{ backgroundColor: themeStyles.colors.primary }}
                        >
                          {pageData.hero.ctaText}
                        </button>

                        {/* Social Media Icons */}
                        <SocialMediaIcons />
                      </div>

                      {pageData.hero.heroImage && themeStyles.layout.heroStyle !== "minimal" && (
                        <div className="mt-12">
                          <img
                            src={pageData.hero.heroImage || "/placeholder.svg"}
                            alt="Hero"
                            className={`mx-auto rounded-lg shadow-2xl max-w-full h-auto ${
                              themeStyles.layout.heroStyle === "celebration" ? "border-4 border-white" : ""
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Features Section Preview */}
                  {sections.find((s) => s.id === "features")?.enabled && (
                    <div
                      className={`px-8 py-16 ${
                        themeStyles.layout.spacing === "cozy"
                          ? "py-12"
                          : themeStyles.layout.spacing === "spacious"
                            ? "py-24"
                            : themeStyles.layout.spacing === "tight"
                              ? "py-8"
                              : themeStyles.layout.spacing === "relaxed"
                                ? "py-20"
                                : themeStyles.layout.spacing === "festive"
                                  ? "py-16"
                                  : "py-16"
                      }`}
                      style={{
                        backgroundColor:
                          themeStyles.colors.background === "#ffffff"
                            ? "#f9fafb"
                            : themeStyles.colors.background === "#fafafa"
                              ? "#ffffff"
                              : `${themeStyles.colors.background}dd`,
                      }}
                    >
                      <div className="max-w-6xl mx-auto">
                        <h2
                          className="text-3xl font-bold text-center mb-12"
                          style={{
                            color: themeStyles.colors.primary,
                            fontFamily: themeStyles.fonts.heading,
                          }}
                        >
                          {pageData.features.heading}
                        </h2>
                        <div
                          className={`grid gap-8 ${
                            themeStyles.layout.featuresLayout === "grid"
                              ? "grid-cols-1 md:grid-cols-3"
                              : themeStyles.layout.featuresLayout === "cards"
                                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                                : themeStyles.layout.featuresLayout === "showcase"
                                  ? "grid-cols-1 md:grid-cols-2"
                                  : themeStyles.layout.featuresLayout === "timeline"
                                    ? "grid-cols-1 space-y-8"
                                    : themeStyles.layout.featuresLayout === "masonry"
                                      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                                      : "grid-cols-1 md:grid-cols-3"
                          }`}
                        >
                          {pageData.features.items.map((feature, index) => (
                            <div
                              key={index}
                              className={`text-center p-6 rounded-lg transition-all hover:shadow-lg ${
                                themeStyles.layout.featuresLayout === "cards"
                                  ? "bg-white shadow-md"
                                  : themeStyles.layout.featuresLayout === "showcase"
                                    ? "bg-white shadow-sm border"
                                    : themeStyles.layout.featuresLayout === "timeline"
                                      ? "flex items-start space-x-4 text-left"
                                      : ""
                              }`}
                              style={{
                                backgroundColor:
                                  themeStyles.layout.featuresLayout === "cards" ||
                                  themeStyles.layout.featuresLayout === "showcase"
                                    ? "#ffffff"
                                    : "transparent",
                              }}
                            >
                              <div
                                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                                  themeStyles.layout.featuresLayout === "timeline" ? "flex-shrink-0 mb-0" : "mx-auto"
                                }`}
                                style={{ backgroundColor: `${themeStyles.colors.primary}20` }}
                              >
                                <div
                                  className="w-8 h-8 rounded"
                                  style={{ backgroundColor: themeStyles.colors.primary }}
                                ></div>
                              </div>
                              <div className={themeStyles.layout.featuresLayout === "timeline" ? "flex-1" : ""}>
                                <h3
                                  className="text-xl font-semibold mb-2"
                                  style={{
                                    color: themeStyles.colors.text,
                                    fontFamily: themeStyles.fonts.heading,
                                  }}
                                >
                                  {feature.title}
                                </h3>
                                <p style={{ color: themeStyles.colors.secondary }}>{feature.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* About Section Preview */}
                  {sections.find((s) => s.id === "about")?.enabled && (
                    <div className="px-8 py-16">
                      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                          <h2
                            className="text-3xl font-bold mb-6"
                            style={{
                              color: themeStyles.colors.primary,
                              fontFamily: themeStyles.fonts.heading,
                            }}
                          >
                            {pageData.about.heading}
                          </h2>
                          <p className="text-lg leading-relaxed" style={{ color: themeStyles.colors.text }}>
                            {pageData.about.content}
                          </p>
                        </div>
                        <div>
                          <img
                            src={pageData.about.image || "/placeholder.svg"}
                            alt="About"
                            className="rounded-lg shadow-lg w-full h-auto"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Contact Section Preview */}
                  {sections.find((s) => s.id === "contact")?.enabled && (
                    <div
                      className="px-8 py-16"
                      style={{
                        backgroundColor:
                          themeStyles.colors.background === "#ffffff"
                            ? "#f9fafb"
                            : themeStyles.colors.background === "#fafafa"
                              ? "#ffffff"
                              : `${themeStyles.colors.background}dd`,
                      }}
                    >
                      <div className="max-w-4xl mx-auto text-center">
                        <h2
                          className="text-3xl font-bold mb-8"
                          style={{
                            color: themeStyles.colors.primary,
                            fontFamily: themeStyles.fonts.heading,
                          }}
                        >
                          {pageData.contact.heading}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          <div className="p-4 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.5)" }}>
                            <h3 className="font-semibold mb-2" style={{ color: themeStyles.colors.text }}>
                              Email
                            </h3>
                            <p style={{ color: themeStyles.colors.secondary }}>{pageData.contact.email}</p>
                          </div>
                          <div className="p-4 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.5)" }}>
                            <h3 className="font-semibold mb-2" style={{ color: themeStyles.colors.text }}>
                              Phone
                            </h3>
                            <p style={{ color: themeStyles.colors.secondary }}>{pageData.contact.phone}</p>
                          </div>
                          <div className="p-4 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.5)" }}>
                            <h3 className="font-semibold mb-2" style={{ color: themeStyles.colors.text }}>
                              Address
                            </h3>
                            <p style={{ color: themeStyles.colors.secondary }}>{pageData.contact.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
