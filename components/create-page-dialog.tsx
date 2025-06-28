"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Check } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const templates = [
  {
    id: "saas",
    name: "Modern SaaS",
    description: "Perfect for software products and services",
    thumbnail: "/placeholder.svg?height=150&width=200",
    category: "Business",
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "Showcase products and drive sales",
    thumbnail: "/placeholder.svg?height=150&width=200",
    category: "E-commerce",
  },
  {
    id: "agency",
    name: "Creative Agency",
    description: "Portfolio and service showcase",
    thumbnail: "/placeholder.svg?height=150&width=200",
    category: "Creative",
  },
  {
    id: "restaurant",
    name: "Restaurant",
    description: "Menu and location information",
    thumbnail: "/placeholder.svg?height=150&width=200",
    category: "Food & Beverage",
  },
  {
    id: "startup",
    name: "Startup",
    description: "Launch your new venture",
    thumbnail: "/placeholder.svg?height=150&width=200",
    category: "Business",
  },
  {
    id: "portfolio",
    name: "Personal Portfolio",
    description: "Showcase your work and skills",
    thumbnail: "/placeholder.svg?height=150&width=200",
    category: "Personal",
  },
]

export function CreatePageDialog() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [pageName, setPageName] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const router = useRouter()

  const handleCreate = () => {
    // In a real app, this would create the page in the database
    const newPageId = Date.now().toString()
    setOpen(false)
    setStep(1)
    setPageName("")
    setSelectedTemplate("")
    router.push(`/editor/${newPageId}`)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Page
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{step === 1 ? "Choose a Template" : "Page Details"}</DialogTitle>
          <DialogDescription>
            {step === 1
              ? "Select a template to get started with your landing page"
              : "Enter the details for your new landing page"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
            {templates.map((template) => (
              <Card
                key={template.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedTemplate === template.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <CardContent className="p-4">
                  <div className="relative aspect-video mb-3 rounded overflow-hidden">
                    <Image
                      src={template.thumbnail || "/placeholder.svg"}
                      alt={template.name}
                      fill
                      className="object-cover"
                    />
                    {selectedTemplate === template.id && (
                      <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                        <div className="bg-blue-500 rounded-full p-1">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="pageName">Page Name</Label>
                <Input
                  id="pageName"
                  value={pageName}
                  onChange={(e) => setPageName(e.target.value)}
                  placeholder="Enter your page name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Selected Template</Label>
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={templates.find((t) => t.id === selectedTemplate)?.thumbnail || ""}
                      alt="Selected template"
                      width={60}
                      height={40}
                      className="rounded"
                    />
                    <div>
                      <p className="font-medium">{templates.find((t) => t.id === selectedTemplate)?.name}</p>
                      <p className="text-sm text-gray-600">
                        {templates.find((t) => t.id === selectedTemplate)?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          {step === 2 && (
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
          )}
          <div className="ml-auto space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            {step === 1 ? (
              <Button onClick={() => setStep(2)} disabled={!selectedTemplate}>
                Next
              </Button>
            ) : (
              <Button onClick={handleCreate} disabled={!pageName.trim()}>
                Create Page
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
