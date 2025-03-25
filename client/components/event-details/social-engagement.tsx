"use client"

import type React from "react"

import { useState } from "react"
import { Share2, MessageSquare, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface SocialEngagementProps {
  eventId: string
}

export default function SocialEngagement({ eventId }: SocialEngagementProps) {
  const [comment, setComment] = useState("")

  // In a real application, you would fetch comments from an API
  const comments = [
    {
      id: "1",
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AJ",
      },
      content:
        "Looking forward to the AI in Education panel! Will there be any hands-on demonstrations of the technologies discussed?",
      date: "2 days ago",
      likes: 5,
    },
    {
      id: "2",
      user: {
        name: "Samantha Lee",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SL",
      },
      content:
        "I attended last year's summit and it was incredibly valuable. The networking opportunities alone were worth the registration fee.",
      date: "1 week ago",
      likes: 12,
    },
  ]

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send the comment to an API
    console.log("Submitting comment:", comment)
    setComment("")
  }

  return (
    <div className="mt-8 rounded-lg border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold">Discussion</h3>
        <Button variant="outline" size="sm" className="flex gap-1">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </div>

      <form onSubmit={handleSubmitComment} className="mb-6">
        <Textarea
          placeholder="Join the conversation..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mb-2 min-h-[100px] resize-none"
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={!comment.trim()}>
            Post Comment
          </Button>
        </div>
      </form>

      <Separator className="my-6" />

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
              <AvatarFallback>{comment.user.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{comment.user.name}</h4>
                <span className="text-xs text-muted-foreground">{comment.date}</span>
              </div>
              <p className="mt-1 text-sm">{comment.content}</p>
              <div className="mt-2 flex items-center gap-4">
                <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{comment.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Reply</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

