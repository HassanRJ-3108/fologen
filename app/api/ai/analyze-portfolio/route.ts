import { generateText } from "ai"
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

    const { portfolioId } = await request.json()

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

    // Get portfolio sections
    const { data: sections } = await supabase.from("portfolio_sections").select("*").eq("portfolio_id", portfolioId)

    const portfolioContent = JSON.stringify(sections)

    // Analyze portfolio and provide suggestions
    const { text: analysis } = await generateText({
      model: "openai/gpt-4-mini",
      prompt: `Analyze this portfolio and provide 3-5 specific suggestions for improvement. Portfolio content: ${portfolioContent}. Format as JSON array with suggestion and reason.`,
    })

    return NextResponse.json({
      success: true,
      analysis,
    })
  } catch (error) {
    console.error("Error analyzing portfolio:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
