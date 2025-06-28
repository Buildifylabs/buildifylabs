import { type NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { pageName, content, settings } = data

    // In a real app, you'd save to a database
    // For demo purposes, we'll save to a JSON file
    const landingPagesDir = join(process.cwd(), "data", "landing-pages")

    try {
      await mkdir(landingPagesDir, { recursive: true })
    } catch (error) {
      // Directory might already exist
    }

    const filePath = join(landingPagesDir, `${pageName}.json`)
    const pageData = {
      pageName,
      content,
      settings,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await writeFile(filePath, JSON.stringify(pageData, null, 2))

    return NextResponse.json({
      success: true,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${pageName}`,
    })
  } catch (error) {
    console.error("Error saving landing page:", error)
    return NextResponse.json({ error: "Failed to save landing page" }, { status: 500 })
  }
}
