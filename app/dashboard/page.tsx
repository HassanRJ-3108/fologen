import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Plus, Zap } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const { data: portfolios } = await supabase
    .from("portfolios")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="text-muted-foreground mt-2">Manage your portfolios and create new ones</p>
      </div>

      <div className="grid gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>Create your first portfolio or use AI to generate one</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Link href="/dashboard/portfolios/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Portfolio
              </Button>
            </Link>
            <Button variant="outline">
              <Zap className="mr-2 h-4 w-4" />
              Generate with AI
            </Button>
          </CardContent>
        </Card>

        {/* Portfolios List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Portfolios</h2>
          {portfolios && portfolios.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {portfolios.map((portfolio) => (
                <Card key={portfolio.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{portfolio.title}</CardTitle>
                    <CardDescription>{portfolio.description || "No description"}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Link href={`/dashboard/portfolios/${portfolio.id}/edit`} className="flex-1">
                        <Button variant="outline" className="w-full bg-transparent">
                          Edit
                        </Button>
                      </Link>
                      <Link href={`/portfolio/${portfolio.slug}`} className="flex-1">
                        <Button variant="ghost" className="w-full">
                          View
                        </Button>
                      </Link>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {portfolio.is_published ? (
                        <span className="text-green-600">Published</span>
                      ) : (
                        <span className="text-yellow-600">Draft</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground mb-4">No portfolios yet. Create one to get started!</p>
                <Link href="/dashboard/portfolios/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Portfolio
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
