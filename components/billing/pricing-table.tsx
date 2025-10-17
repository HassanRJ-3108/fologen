"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

interface Plan {
  id: string
  name: string
  description: string
  price: number
  interval: "month" | "year"
  features: string[]
  cta: string
  highlighted?: boolean
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for getting started",
    price: 9,
    interval: "month",
    features: ["1 Portfolio", "Basic Templates", "Manual Content", "Public Sharing", "Email Support"],
    cta: "Get Started",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professionals",
    price: 29,
    interval: "month",
    features: [
      "Unlimited Portfolios",
      "All Templates",
      "AI Content Generation",
      "Custom Domain",
      "Analytics",
      "Priority Support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For teams",
    price: 99,
    interval: "month",
    features: [
      "Everything in Pro",
      "Team Collaboration",
      "Advanced Analytics",
      "API Access",
      "Custom Integrations",
      "Dedicated Support",
    ],
    cta: "Contact Sales",
  },
]

export function PricingTable() {
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async (planId: string) => {
    if (planId === "enterprise") {
      // Open contact form or redirect to sales page
      window.location.href = "/contact-sales"
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      })

      if (!response.ok) throw new Error("Failed to create checkout")

      const data = await response.json()
      window.location.href = data.checkoutUrl
    } catch (error) {
      console.error("Checkout error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <Card
          key={plan.id}
          className={`flex flex-col ${plan.highlighted ? "border-primary shadow-lg md:scale-105" : ""}`}
        >
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-6">
            <div>
              <span className="text-4xl font-bold">${plan.price}</span>
              <span className="text-muted-foreground">/{plan.interval}</span>
            </div>

            <ul className="space-y-3">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => handleCheckout(plan.id)}
              disabled={isLoading}
              variant={plan.highlighted ? "default" : "outline"}
              className="w-full"
            >
              {isLoading ? "Loading..." : plan.cta}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
