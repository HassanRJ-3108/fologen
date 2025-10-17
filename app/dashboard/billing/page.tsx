import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function BillingPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: subscription } = await supabase.from("subscriptions").select("*").eq("user_id", user?.id).single()

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Billing & Subscription</h1>
        <p className="text-muted-foreground mt-2">Manage your subscription and billing information</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {subscription ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Your active subscription</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold capitalize">{subscription.plan_name} Plan</p>
                    <p className="text-sm text-muted-foreground capitalize">{subscription.status}</p>
                  </div>
                  <span className="text-2xl font-bold">
                    {subscription.plan_name === "starter" && "$9"}
                    {subscription.plan_name === "pro" && "$29"}
                    {subscription.plan_name === "enterprise" && "$99"}
                    <span className="text-sm text-muted-foreground">/month</span>
                  </span>
                </div>

                {subscription.current_period_end && (
                  <div className="text-sm text-muted-foreground">
                    Renews on {new Date(subscription.current_period_end).toLocaleDateString()}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="outline" className="text-red-600 bg-transparent">
                    Cancel Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>Your recent invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Invoices coming soon...</p>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No Active Subscription</CardTitle>
              <CardDescription>Upgrade to unlock premium features</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/pricing">
                <Button>View Plans</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
