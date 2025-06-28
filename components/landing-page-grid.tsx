"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Eye, Copy, Trash2, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface LandingPage {
  id: string
  title: string
  template: string
  status: "draft" | "published"
  lastModified: string
  views: number
  thumbnail: string
}

const mockPages: LandingPage[] = [
  {
    id: "1",
    title: "SaaS Product Launch",
    template: "Modern SaaS",
    status: "published",
    lastModified: "2 hours ago",
    views: 1247,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "E-commerce Store",
    template: "E-commerce",
    status: "draft",
    lastModified: "1 day ago",
    views: 0,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "Agency Portfolio",
    template: "Creative Agency",
    status: "published",
    lastModified: "3 days ago",
    views: 892,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    title: "Restaurant Menu",
    template: "Restaurant",
    status: "draft",
    lastModified: "1 week ago",
    views: 0,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
]

export function LandingPageGrid() {
  const [pages, setPages] = useState<LandingPage[]>(mockPages)

  const handleDelete = (id: string) => {
    setPages(pages.filter((page) => page.id !== id))
  }

  const handleDuplicate = (id: string) => {
    const pageToClone = pages.find((page) => page.id === id)
    if (pageToClone) {
      const newPage = {
        ...pageToClone,
        id: Date.now().toString(),
        title: `${pageToClone.title} (Copy)`,
        status: "draft" as const,
        lastModified: "Just now",
        views: 0,
      }
      setPages([newPage, ...pages])
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {pages.map((page) => (
        <Card key={page.id} className="group hover:shadow-lg transition-shadow">
          <CardHeader className="p-0">
            <div className="relative aspect-video rounded-t-lg overflow-hidden">
              <Image
                src={page.thumbnail || "/placeholder.svg"}
                alt={page.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute top-2 right-2">
                <Badge variant={page.status === "published" ? "default" : "secondary"}>
                  {page.status === "published" ? (
                    <>
                      <Globe className="h-3 w-3 mr-1" />
                      Published
                    </>
                  ) : (
                    "Draft"
                  )}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4">
            <CardTitle className="text-lg mb-2 line-clamp-1">{page.title}</CardTitle>
            <p className="text-sm text-gray-600 mb-2">Template: {page.template}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Modified {page.lastModified}</span>
              <span>{page.views} views</span>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0 flex items-center justify-between">
            <div className="flex space-x-2">
              <Button asChild size="sm" variant="outline">
                <Link href={`/dashboard/editor/${page.id}`}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href={`/dashboard/preview/${page.id}`}>
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Link>
              </Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleDuplicate(page.id)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(page.id)} className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
