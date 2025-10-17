"use client"

import type { User } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, Plus, Home, Settings } from "lucide-react"

export function DashboardNav({ user }: { user: User }) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <nav className="w-64 border-r border-border bg-card p-6 flex flex-col">
      <div className="mb-8">
        <Link href="/dashboard" className="text-2xl font-bold text-primary">
          Fologen
        </Link>
        <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
      </div>

      <div className="space-y-2 flex-1">
        <Link href="/dashboard">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        <Link href="/dashboard/portfolios/new">
          <Button className="w-full justify-start">
            <Plus className="mr-2 h-4 w-4" />
            New Portfolio
          </Button>
        </Link>
        <Link href="/dashboard/settings">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </Link>
      </div>

      <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    </nav>
  )
}
