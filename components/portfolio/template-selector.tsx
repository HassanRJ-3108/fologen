"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Template {
  id: string
  name: string
  description: string
  category: string
}

interface TemplateSelectorProps {
  templates: Template[]
  onSelect: (templateId: string) => void
  isLoading?: boolean
}

export function TemplateSelector({ templates, onSelect, isLoading }: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")

  return (
    <div className="space-y-4">
      <RadioGroup value={selectedTemplate} onValueChange={setSelectedTemplate}>
        <div className="grid gap-4 md:grid-cols-2">
          {templates.map((template) => (
            <div key={template.id} className="flex items-center space-x-2">
              <RadioGroupItem value={template.id} id={template.id} />
              <Label htmlFor={template.id} className="flex-1 cursor-pointer">
                <Card className="hover:bg-accent">
                  <CardHeader>
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>

      <Button onClick={() => onSelect(selectedTemplate)} disabled={!selectedTemplate || isLoading} className="w-full">
        {isLoading ? "Creating..." : "Create with Template"}
      </Button>
    </div>
  )
}
