import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import crypto from "crypto"

// Verify Lemon Squeezy webhook signature
function verifyWebhookSignature(payload: string, signature: string): boolean {
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || ""
  const hash = crypto.createHmac("sha256", secret).update(payload).digest("hex")
  return hash === signature
}

export async function POST(request: Request) {
  try {
    const payload = await request.text()
    const signature = request.headers.get("x-signature") || ""

    // Verify webhook signature
    if (!verifyWebhookSignature(payload, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const event = JSON.parse(payload)
    const supabase = await createClient()

    // Handle different webhook events
    switch (event.meta.event_name) {
      case "subscription_created":
      case "subscription_updated": {
        const { data } = event
        const { user_id, plan_name, status, current_period_start, current_period_end } = data.attributes

        await supabase.from("subscriptions").upsert({
          user_id,
          lemon_squeezy_subscription_id: data.id,
          plan_name,
          status,
          current_period_start,
          current_period_end,
        })
        break
      }

      case "subscription_cancelled": {
        const { data } = event
        await supabase
          .from("subscriptions")
          .update({ status: "cancelled" })
          .eq("lemon_squeezy_subscription_id", data.id)
        break
      }

      case "subscription_expired": {
        const { data } = event
        await supabase.from("subscriptions").update({ status: "expired" }).eq("lemon_squeezy_subscription_id", data.id)
        break
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
