import { type NextRequest, NextResponse } from "next/server"
import { readdir, mkdir } from "fs/promises"
import { join } from "path"

export async function POST(request: NextRequest) {
  try {
    const { domainName } = await request.json()

    if (!domainName || domainName.length < 3) {
      return NextResponse.json({
        available: false,
        error: "Domain name must be at least 3 characters long",
        suggestions: [],
      })
    }

    // Sanitize domain name
    const sanitizedDomain = domainName.toLowerCase().replace(/[^a-z0-9-]/g, "-")

    // Check if domain name is available
    const landingPagesDir = join(process.cwd(), "data", "landing-pages")

    try {
      // Ensure directory exists
      await mkdir(landingPagesDir, { recursive: true })

      const files = await readdir(landingPagesDir)
      const existingPages = files.map((file) => file.replace(".json", ""))

      const isAvailable = !existingPages.includes(sanitizedDomain)

      return NextResponse.json({
        available: isAvailable,
        sanitizedDomain,
        suggestions: isAvailable
          ? []
          : [
              `${sanitizedDomain}-1`,
              `${sanitizedDomain}-2`,
              `${sanitizedDomain}-pro`,
              `${sanitizedDomain}-official`,
              `${sanitizedDomain}-${new Date().getFullYear()}`,
            ],
      })
    } catch (error) {
      // Directory doesn't exist, so domain is available
      await mkdir(landingPagesDir, { recursive: true })
      return NextResponse.json({
        available: true,
        sanitizedDomain,
        suggestions: [],
      })
    }
  } catch (error) {
    console.error("Error checking domain:", error)
    return NextResponse.json({ error: "Failed to check domain availability" }, { status: 500 })
  }
}
