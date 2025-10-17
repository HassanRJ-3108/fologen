"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Globe, Link2, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PublishDialogProps {
  portfolioId: string
  portfolioSlug: string
  isPublished: boolean
  onPublish?: (published: boolean) => void
}

export function PublishDialog({ portfolioId, portfolioSlug, isPublished, onPublish }: PublishDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [shareUrl, setShareUrl] = useState("")
  const [shareType, setShareType] = useState<"link" | "email">("link")
  const { toast } = useToast()

  const handlePublish = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/portfolio/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          portfolioId,
          isPublished: !isPublished,
        }),
      })

      if (!response.ok) throw new Error("Failed to publish")

      toast({
        title: "Success",
        description: isPublished ? "Portfolio unpublished" : "Portfolio published",
      })

      onPublish?.(!isPublished)
      setOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish portfolio",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateShare = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/portfolio/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          portfolioId,
          shareType,
          expiresIn: shareType === "link" ? 24 : null,
        }),
      })

      if (!response.ok) throw new Error("Failed to create share")

      const data = await response.json()
      setShareUrl(data.share.shareUrl)

      toast({
        title: "Success",
        description: "Share link created",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create share link",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    toast({
      title: "Copied",
      description: "Share link copied to clipboard",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Globe className="mr-2 h-4 w-4" />
          Publish & Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Publish & Share Portfolio</DialogTitle>
          <DialogDescription>Make your portfolio public and share it with others</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="publish" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="publish">Publish</TabsTrigger>
            <TabsTrigger value="share">Share</TabsTrigger>
          </TabsList>

          <TabsContent value="publish" className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {isPublished
                  ? "Your portfolio is currently published and visible to everyone."
                  : "Publish your portfolio to make it visible to the public."}
              </p>
            </div>
            <Button onClick={handlePublish} disabled={isLoading} className="w-full">
              {isLoading ? "Loading..." : isPublished ? "Unpublish" : "Publish Portfolio"}
            </Button>
          </TabsContent>

          <TabsContent value="share" className="space-y-4">
            <div className="space-y-2">
              <Label>Share Type</Label>
              <div className="flex gap-2">
                <Button
                  variant={shareType === "link" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShareType("link")}
                  className="flex-1"
                >
                  <Link2 className="mr-2 h-4 w-4" />
                  Link
                </Button>
                <Button
                  variant={shareType === "email" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShareType("email")}
                  className="flex-1"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Button>
              </div>
            </div>

            <Button onClick={handleCreateShare} disabled={isLoading} className="w-full">
              {isLoading ? "Creating..." : "Create Share Link"}
            </Button>

            {shareUrl && (
              <div className="space-y-2">
                <Label>Share URL</Label>
                <div className="flex gap-2">
                  <Input value={shareUrl} readOnly />
                  <Button size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
