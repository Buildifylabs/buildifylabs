"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, Smartphone, Tablet, Monitor } from "lucide-react"
import Link from "next/link"

interface PagePreviewProps {
  pageId: string
}

export function PagePreview({ pageId }: PagePreviewProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")

  // Mock page data - in a real app, this would be fetched based on pageId
  const pageData = {
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
  }

  const getPreviewWidth = () => {
    switch (viewMode) {
      case "mobile":
        return "max-w-sm"
      case "tablet":
        return "max-w-2xl"
      default:
        return "max-w-full"
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
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
            <h1 className="text-xl font-semibold">Preview: {pageData.title}</h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Device Toggle */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === "desktop" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("desktop")}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "tablet" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("tablet")}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "mobile" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("mobile")}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>

            <Button asChild size="sm">
              <Link href={`/dashboard/editor/${pageId}`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Page
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Preview Content */}
      <div className="container mx-auto px-4 py-8">
        <div className={`mx-auto transition-all duration-300 ${getPreviewWidth()}`}>
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            style={{
              backgroundColor: pageData.backgroundColor,
              fontFamily: pageData.fontFamily,
            }}
          >
            {/* Hero Section */}
            <div className="relative px-8 py-16 text-center">
              <div className="max-w-4xl mx-auto">
                <h1
                  className={`font-bold mb-6 ${
                    viewMode === "mobile" ? "text-3xl" : viewMode === "tablet" ? "text-4xl" : "text-6xl"
                  }`}
                  style={{ color: pageData.primaryColor }}
                >
                  {pageData.headline}
                </h1>
                <p
                  className={`text-gray-600 mb-8 max-w-2xl mx-auto ${viewMode === "mobile" ? "text-base" : "text-xl"}`}
                >
                  {pageData.subheadline}
                </p>
                <button
                  className={`text-white font-semibold rounded-lg hover:opacity-90 transition-opacity ${
                    viewMode === "mobile" ? "px-6 py-3 text-base" : "px-8 py-4 text-lg"
                  }`}
                  style={{ backgroundColor: pageData.primaryColor }}
                >
                  {pageData.ctaText}
                </button>
              </div>

              {pageData.heroImage && (
                <div className="mt-12">
                  <img
                    src={pageData.heroImage || "/placeholder.svg"}
                    alt="Hero"
                    className="mx-auto rounded-lg shadow-2xl max-w-full h-auto"
                  />
                </div>
              )}
            </div>

            {/* Features Section */}
            <div className="px-8 py-16 bg-gray-50">
              <div className="max-w-6xl mx-auto">
                <h2 className={`font-bold text-center mb-12 ${viewMode === "mobile" ? "text-2xl" : "text-4xl"}`}>
                  Why Choose Our Platform?
                </h2>
                <div
                  className={`grid gap-8 ${
                    viewMode === "mobile" ? "grid-cols-1" : viewMode === "tablet" ? "grid-cols-2" : "grid-cols-3"
                  }`}
                >
                  {[
                    {
                      title: "Easy Integration",
                      description: "Seamlessly integrate with your existing tools and workflows.",
                    },
                    {
                      title: "Scalable Solution",
                      description: "Grow your business without worrying about technical limitations.",
                    },
                    {
                      title: "24/7 Support",
                      description: "Get help whenever you need it with our dedicated support team.",
                    },
                  ].map((feature, index) => (
                    <div key={index} className="text-center">
                      <div
                        className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                        style={{ backgroundColor: pageData.primaryColor }}
                      >
                        <span className="text-white font-bold text-xl">{index + 1}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="px-8 py-16 text-center">
              <div className="max-w-2xl mx-auto">
                <h2 className={`font-bold mb-4 ${viewMode === "mobile" ? "text-2xl" : "text-3xl"}`}>
                  Ready to Get Started?
                </h2>
                <p className="text-gray-600 mb-8">
                  Join thousands of businesses already using our platform to grow their success.
                </p>
                <button
                  className={`text-white font-semibold rounded-lg hover:opacity-90 transition-opacity ${
                    viewMode === "mobile" ? "px-6 py-3 text-base" : "px-8 py-4 text-lg"
                  }`}
                  style={{ backgroundColor: pageData.primaryColor }}
                >
                  {pageData.ctaText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
