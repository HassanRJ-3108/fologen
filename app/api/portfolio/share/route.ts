import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { randomBytes } from "crypto"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { portfolioId, shareType = "link", expiresIn } = await request.json()

    // Verify portfolio ownership
    const { data: portfolio, error: portfolioError } = await supabase
      .from("portfolios")
      .select("*")
      .eq("id", portfolioId)
      .eq("user_id", user.id)
      .single()

    if (portfolioError || !portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 })
    }

    // Generate share token
    const shareToken = randomBytes(16).toString("hex")

    // Calculate expiration date
    let expiresAt = null
    if (expiresIn) {
      const date = new Date()
      date.setHours(date.getHours() + expiresIn)
      expiresAt = date.toISOString()
    }

    // Create share record
    const { data: share, error: shareError } = await supabase
      .from("portfolio_shares")
      .insert({
        portfolio_id: portfolioId,
        share_token: shareToken,
        share_type: shareType,
        expires_at: expiresAt,
      })
      .select()
      .single()

    if (shareError) {
      return NextResponse.json({ error: "Failed to create share" }, { status: 500 })
    }

    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/portfolio/${portfolio.slug}?share=${shareToken}`

    return NextResponse.json({
      success: true,
      share: {
        ...share,
        shareUrl,
      },
    })
  } catch (error) {
    console.error("Error creating share:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
