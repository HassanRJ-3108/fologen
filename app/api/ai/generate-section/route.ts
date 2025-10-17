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

    const { portfolioId, sectionType, context } = await request.json()

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

    // Generate section content based on type
    let prompt = ""
    switch (sectionType) {
      case "about":
        prompt = `Generate a professional about section for a portfolio. Context: ${context}. Keep it concise and compelling.`
        break
      case "projects":
        prompt = `Generate project descriptions for a portfolio. Context: ${context}. Format as JSON array with title, description, and technologies.`
        break
      case "experience":
        prompt = `Generate work experience entries for a portfolio. Context: ${context}. Format as JSON array with company, role, duration, and description.`
        break
      case "skills":
        prompt = `Generate a list of relevant skills. Context: ${context}. Format as JSON array.`
        break
      case "contact":
        prompt = `Generate contact section content. Context: ${context}. Include email, phone, and social links if available.`
        break
      default:
        return NextResponse.json({ error: "Invalid section type" }, { status: 400 })
    }

    const { text: generatedContent } = await generateText({
      model: "openai/gpt-4-mini",
      prompt,
    })

    return NextResponse.json({
      success: true,
      content: generatedContent,
      sectionType,
    })
  } catch (error) {
    console.error("Error generating section:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
