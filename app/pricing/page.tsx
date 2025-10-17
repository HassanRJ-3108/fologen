import { PricingTable } from "@/components/billing/pricing-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground">Choose the perfect plan for your needs</p>
        </div>

        <PricingTable />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Free Trial</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Try Pro plan free for 14 days. No credit card required.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Money-Back Guarantee</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Not satisfied? Get a full refund within 30 days.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cancel Anytime</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No long-term contracts. Cancel your subscription anytime.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
