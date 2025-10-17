import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function TemplatesPage() {
  const supabase = await createClient()

  const { data: templates } = await supabase.from("templates").select("*").order("is_featured", { ascending: false })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Portfolio Templates</h1>
        <p className="text-muted-foreground mt-2">Choose a template to start your portfolio</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates?.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow overflow-hidden">
            <div className="h-40 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">{template.category}</p>
              </div>
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </div>
                {template.is_featured && (
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Featured</span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Link href={`/dashboard/portfolios/new?template=${template.id}`}>
                <Button className="w-full">Use Template</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
