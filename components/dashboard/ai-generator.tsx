"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Zap } from "lucide-react"

interface AIGeneratorProps {
  portfolioId: string
  onGenerated?: () => void
}

export function AIGenerator({ portfolioId, onGenerated }: AIGeneratorProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userInfo, setUserInfo] = useState({
    profession: "",
    skills: "",
    experience: "",
    bio: "",
  })

  const handleGenerate = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/generate-portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          portfolioId,
          userInfo,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate portfolio")
      }

      const data = await response.json()
      onGenerated?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          AI Portfolio Generator
        </CardTitle>
        <CardDescription>Let AI help you create your portfolio content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="profession">Profession</Label>
          <Input
            id="profession"
            placeholder="e.g., Full Stack Developer"
            value={userInfo.profession}
            onChange={(e) => setUserInfo({ ...userInfo, profession: e.target.value })}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="skills">Skills</Label>
          <Input
            id="skills"
            placeholder="e.g., React, Node.js, TypeScript"
            value={userInfo.skills}
            onChange={(e) => setUserInfo({ ...userInfo, skills: e.target.value })}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Experience</Label>
          <Input
            id="experience"
            placeholder="e.g., 5 years in web development"
            value={userInfo.experience}
            onChange={(e) => setUserInfo({ ...userInfo, experience: e.target.value })}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell us about yourself..."
            value={userInfo.bio}
            onChange={(e) => setUserInfo({ ...userInfo, bio: e.target.value })}
            disabled={isLoading}
            rows={4}
          />
        </div>

        {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}

        <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Generate Portfolio
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
