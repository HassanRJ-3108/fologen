"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette, Type, Layout } from "lucide-react"

interface CustomizerProps {
  portfolioId: string
  onSave?: () => void
}

export function PortfolioCustomizer({ portfolioId, onSave }: CustomizerProps) {
  const [customization, setCustomization] = useState({
    primaryColor: "#6366f1",
    secondaryColor: "#ec4899",
    fontFamily: "inter",
    layout: "modern",
  })

  const handleSave = async () => {
    // Save customization to database
    onSave?.()
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="colors" className="space-y-4">
        <TabsList>
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            Typography
          </TabsTrigger>
          <TabsTrigger value="layout" className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            Layout
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors">
          <Card>
            <CardHeader>
              <CardTitle>Color Scheme</CardTitle>
              <CardDescription>Customize your portfolio colors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primary">Primary Color</Label>
                <div className="flex gap-2">
                  <input
                    id="primary"
                    type="color"
                    value={customization.primaryColor}
                    onChange={(e) => setCustomization({ ...customization, primaryColor: e.target.value })}
                    className="h-10 w-20 rounded cursor-pointer"
                  />
                  <Input value={customization.primaryColor} readOnly />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondary">Secondary Color</Label>
                <div className="flex gap-2">
                  <input
                    id="secondary"
                    type="color"
                    value={customization.secondaryColor}
                    onChange={(e) => setCustomization({ ...customization, secondaryColor: e.target.value })}
                    className="h-10 w-20 rounded cursor-pointer"
                  />
                  <Input value={customization.secondaryColor} readOnly />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="typography">
          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
              <CardDescription>Choose your font family</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="font">Font Family</Label>
                <select
                  id="font"
                  value={customization.fontFamily}
                  onChange={(e) => setCustomization({ ...customization, fontFamily: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="inter">Inter</option>
                  <option value="poppins">Poppins</option>
                  <option value="playfair">Playfair Display</option>
                  <option value="roboto">Roboto</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layout">
          <Card>
            <CardHeader>
              <CardTitle>Layout</CardTitle>
              <CardDescription>Choose your portfolio layout</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="layout">Layout Style</Label>
                <select
                  id="layout"
                  value={customization.layout}
                  onChange={(e) => setCustomization({ ...customization, layout: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="modern">Modern</option>
                  <option value="minimal">Minimal</option>
                  <option value="creative">Creative</option>
                  <option value="professional">Professional</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button onClick={handleSave} className="w-full">
        Save Customization
      </Button>
    </div>
  )
}
