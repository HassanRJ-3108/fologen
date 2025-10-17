import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { portfolioId, isPublished } = await request.json()

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

    // Update portfolio publish status
    const { error: updateError } = await supabase
      .from("portfolios")
      .update({
        is_published: isPublished,
        published_at: isPublished ? new Date().toISOString() : null,
      })
      .eq("id", portfolioId)

    if (updateError) {
      return NextResponse.json({ error: "Failed to update portfolio" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: isPublished ? "Portfolio published" : "Portfolio unpublished",
    })
  } catch (error) {
    console.error("Error publishing portfolio:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
