"use client"

import { useRouter } from "next/navigation"
import { AIGenerator } from "@/components/dashboard/ai-generator"

export default function GeneratePortfolioPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Generate Portfolio with AI</h1>
        <p className="text-muted-foreground mt-2">Tell us about yourself and let AI create your portfolio</p>
      </div>

      <div className="max-w-2xl">
        <AIGenerator
          portfolioId={params.id}
          onGenerated={() => {
            router.push(`/dashboard/portfolios/${params.id}/edit`)
          }}
        />
      </div>
    </div>
  )
}
