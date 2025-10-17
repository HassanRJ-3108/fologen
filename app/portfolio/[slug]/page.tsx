import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function PortfolioPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { share?: string }
}) {
  const supabase = await createClient()

  // Get portfolio by slug
  const { data: portfolio, error } = await supabase.from("portfolios").select("*").eq("slug", params.slug).single()

  if (error || !portfolio) {
    notFound()
  }

  // Check if portfolio is published or has valid share token
  if (!portfolio.is_published && searchParams.share) {
    const { data: share } = await supabase
      .from("portfolio_shares")
      .select("*")
      .eq("share_token", searchParams.share)
      .eq("portfolio_id", portfolio.id)
      .single()

    if (!share || (share.expires_at && new Date(share.expires_at) < new Date())) {
      notFound()
    }

    // Increment view count
    await supabase
      .from("portfolio_shares")
      .update({ view_count: (share.view_count || 0) + 1 })
      .eq("id", share.id)
  } else if (!portfolio.is_published) {
    notFound()
  }

  // Get portfolio sections
  const { data: sections } = await supabase
    .from("portfolio_sections")
    .select("*")
    .eq("portfolio_id", portfolio.id)
    .order("order_index", { ascending: true })

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">{portfolio.title}</h1>
          <p className="text-lg text-muted-foreground">{portfolio.description}</p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections?.map((section) => (
            <Card key={section.id}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {section.section_type === "about" && <p className="text-muted-foreground">{section.content?.text}</p>}
                {section.section_type === "projects" && (
                  <div className="space-y-4">
                    {Array.isArray(section.content?.projects) &&
                      section.content.projects.map((project: any, idx: number) => (
                        <div key={idx} className="border-l-2 border-primary pl-4">
                          <h3 className="font-semibold">{project.title}</h3>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                        </div>
                      ))}
                  </div>
                )}
                {section.section_type === "skills" && (
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(section.content?.skills) &&
                      section.content.skills.map((skill: string, idx: number) => (
                        <span key={idx} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
