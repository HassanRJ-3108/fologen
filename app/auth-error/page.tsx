"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-border/50 shadow-2xl">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-destructive/80 to-red-600 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl">Authentication Error</CardTitle>
            <CardDescription>Something went wrong with your authentication</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4 text-center">
              <div className="bg-muted/50 border border-border/50 rounded-lg p-4 space-y-2 text-left">
                <p className="text-sm font-medium text-destructive">Possible reasons:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>The confirmation link has expired</li>
                  <li>The link was already used</li>
                  <li>Invalid authentication code</li>
                </ul>
              </div>

              <p className="text-sm text-muted-foreground">Please try signing up or logging in again.</p>
            </div>

            <div className="space-y-3">
              <Link href="/signup" className="block">
                <Button className="w-full">Try Signing Up Again</Button>
              </Link>

              <Link href="/login" className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  Go to Sign In
                </Button>
              </Link>

              <Link href="/" className="block">
                <Button variant="ghost" className="w-full">
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
