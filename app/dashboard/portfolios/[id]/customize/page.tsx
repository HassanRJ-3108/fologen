import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { PortfolioCustomizer } from "@/components/portfolio/customizer"

export default async function CustomizePortfolioPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: portfolio, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user?.id)
    .single()

  if (error || !portfolio) {
    notFound()
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Customize {portfolio.title}</h1>
        <p className="text-muted-foreground mt-2">Personalize your portfolio appearance</p>
      </div>

      <div className="max-w-2xl">
        <PortfolioCustomizer portfolioId={portfolio.id} />
      </div>
    </div>
  )
}
