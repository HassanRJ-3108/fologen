"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Mail } from "lucide-react"

export default function SignUpSuccessPage() {
  const [email, setEmail] = useState<string>("")

  useEffect(() => {
    // Get email from URL params if available
    const params = new URLSearchParams(window.location.search)
    const emailParam = params.get("email")
    if (emailParam) {
      setEmail(emailParam)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-border/50 shadow-2xl">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl">Account Created!</CardTitle>
            <CardDescription>Your account has been successfully created</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4 text-center">
              <div className="flex justify-center mb-4">
                <Mail className="w-12 h-12 text-primary/60" />
              </div>

              <div className="space-y-2">
                <p className="text-sm text-foreground">We've sent a confirmation email to:</p>
                <p className="font-semibold text-primary break-all">{email || "your email address"}</p>
              </div>

              <div className="bg-muted/50 border border-border/50 rounded-lg p-4 space-y-2 text-left">
                <p className="text-sm font-medium">Next steps:</p>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Check your email inbox</li>
                  <li>Click the confirmation link</li>
                  <li>Return here to sign in</li>
                </ol>
              </div>

              <p className="text-xs text-muted-foreground">
                Didn't receive the email? Check your spam folder or try signing up again.
              </p>
            </div>

            <div className="space-y-3">
              <Link href="/login" className="block">
                <Button className="w-full">Go to Sign In</Button>
              </Link>

              <Link href="/" className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
