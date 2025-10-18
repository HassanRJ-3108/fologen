import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { AlertCircle, Sparkles, ArrowRight } from "lucide-react"

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex flex-col">
      {/* Header */}
      <div className="border-b border-border/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Fologen</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-border/50 shadow-xl">
          <div className="p-8 space-y-6 text-center">
            {/* Error Icon */}
            <div className="flex justify-center">
              <div className="rounded-full bg-destructive/20 p-4 border border-destructive/30">
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Authentication Error</h1>
              <p className="text-muted-foreground">The confirmation link is invalid or has expired</p>
            </div>

            {/* Instructions */}
            <div className="space-y-3 p-4 bg-secondary/20 rounded-lg border border-border/30">
              <p className="text-sm text-foreground font-medium">What you can do:</p>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Try signing up again with your email</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Check that you're using the correct email address</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Make sure the link hasn't expired (links expire after 24 hours)</span>
                </li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="space-y-2">
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/auth/sign-up">
                  Try Again
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full border-border/50 bg-transparent">
                <Link href="/auth/login">Back to Sign In</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
