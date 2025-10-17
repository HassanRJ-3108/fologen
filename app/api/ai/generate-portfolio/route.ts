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

    const { portfolioId, userInfo } = await request.json()

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

    // Generate portfolio content using AI
    const { text: aboutContent } = await generateText({
      model: "openai/gpt-4-mini",
      prompt: `Generate a professional about section for a portfolio. User info: ${JSON.stringify(userInfo)}. Keep it concise and compelling.`,
    })

    const { text: projectsContent } = await generateText({
      model: "openai/gpt-4-mini",
      prompt: `Generate 3 sample project descriptions for a portfolio. User skills: ${userInfo.skills || "general"}. Format as JSON array.`,
    })

    const { text: skillsContent } = await generateText({
      model: "openai/gpt-4-mini",
      prompt: `Generate a list of relevant skills based on: ${userInfo.skills || "general development"}. Format as JSON array.`,
    })

    // Create portfolio sections
    const sections = [
      {
        portfolio_id: portfolioId,
        section_type: "about",
        title: "About Me",
        content: { text: aboutContent },
        order_index: 0,
      },
      {
        portfolio_id: portfolioId,
        section_type: "projects",
        title: "Projects",
        content: { projects: projectsContent },
        order_index: 1,
      },
      {
        portfolio_id: portfolioId,
        section_type: "skills",
        title: "Skills",
        content: { skills: skillsContent },
        order_index: 2,
      },
    ]

    const { error: insertError } = await supabase.from("portfolio_sections").insert(sections)

    if (insertError) {
      return NextResponse.json({ error: "Failed to create sections" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Portfolio generated successfully",
      sections,
    })
  } catch (error) {
    console.error("Error generating portfolio:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
