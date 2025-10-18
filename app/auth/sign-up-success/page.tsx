import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Mail, Sparkles, ArrowRight } from "lucide-react"

export default function SignUpSuccessPage() {
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
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="rounded-full bg-primary/20 p-4 border border-primary/30">
                <Mail className="h-8 w-8 text-primary" />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Check Your Email</h1>
              <p className="text-muted-foreground">We've sent a confirmation link to your email address</p>
            </div>

            {/* Instructions */}
            <div className="space-y-3 p-4 bg-secondary/20 rounded-lg border border-border/30">
              <p className="text-sm text-foreground font-medium">What's next?</p>
              <ol className="text-sm text-muted-foreground space-y-2 text-left">
                <li className="flex gap-3">
                  <span className="font-semibold text-primary">1.</span>
                  <span>Check your email inbox for a message from Fologen</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-primary">2.</span>
                  <span>Click the confirmation link in the email</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-primary">3.</span>
                  <span>You'll be redirected to complete your profile setup</span>
                </li>
              </ol>
            </div>

            {/* Spam Warning */}
            <p className="text-xs text-muted-foreground">
              Didn't receive the email? Check your spam folder or{" "}
              <Link href="/auth/resend-email" className="text-primary hover:underline font-medium">
                request a new link
              </Link>
            </p>

            {/* Back Button */}
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/auth/login">
                Back to Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
