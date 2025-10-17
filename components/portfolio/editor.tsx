"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

export function PortfolioEditor({ portfolioId }: { portfolioId: string }) {
  const [sections, setSections] = useState<any[]>([])

  const addSection = (type: string) => {
    setSections([...sections, { type, title: "", content: {} }])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Sections</CardTitle>
          <CardDescription>Add and customize sections for your portfolio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {sections.length === 0 ? (
            <p className="text-muted-foreground">No sections yet. Add one to get started.</p>
          ) : (
            <div className="space-y-4">
              {sections.map((section, idx) => (
                <Card key={idx} className="p-4">
                  <p className="font-medium capitalize">{section.type} Section</p>
                </Card>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-4">
            <Button variant="outline" size="sm" onClick={() => addSection("about")}>
              <Plus className="mr-2 h-4 w-4" />
              About
            </Button>
            <Button variant="outline" size="sm" onClick={() => addSection("projects")}>
              <Plus className="mr-2 h-4 w-4" />
              Projects
            </Button>
            <Button variant="outline" size="sm" onClick={() => addSection("skills")}>
              <Plus className="mr-2 h-4 w-4" />
              Skills
            </Button>
            <Button variant="outline" size="sm" onClick={() => addSection("experience")}>
              <Plus className="mr-2 h-4 w-4" />
              Experience
            </Button>
            <Button variant="outline" size="sm" onClick={() => addSection("contact")}>
              <Plus className="mr-2 h-4 w-4" />
              Contact
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
