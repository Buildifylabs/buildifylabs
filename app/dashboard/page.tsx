"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { LandingPageGrid } from "@/components/landing-page-grid"
import { CreatePageDialog } from "@/components/create-page-dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"

export default function Dashboard() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Landing Pages</h1>
            <p className="text-gray-600 mt-2">Create and manage your landing pages</p>
          </div>
          <Button onClick={()=> router.push("/dashboard/create")}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Page
          </Button>
          {/* <CreatePageDialog /> */}
        </div>
        <LandingPageGrid />
      </main>
    </div>
  )
}
