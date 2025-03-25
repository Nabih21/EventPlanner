"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, Clock, Users, CreditCard, CalendarPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ActionPanelProps {
  eventId: string
}

export default function ActionPanel({ eventId }: ActionPanelProps) {
  // In a real application, you would fetch event data based on the ID
  const event = {
    id: eventId,
    price: "$299",
    startDate: "2025-05-15T09:00:00",
    endDate: "2025-05-15T17:00:00",
    capacity: 200,
    registered: 155,
  }

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date(event.startDate)
      const now = new Date()
      const difference = eventDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [event.startDate])

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Registration</span>
          <Badge variant={event.price === "Free" ? "secondary" : "outline"}>{event.price}</Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-lg bg-muted p-4">
          <h3 className="mb-2 text-sm font-medium">Event starts in:</h3>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="rounded-md bg-background p-2">
              <div className="text-xl font-bold">{timeLeft.days}</div>
              <div className="text-xs text-muted-foreground">Days</div>
            </div>
            <div className="rounded-md bg-background p-2">
              <div className="text-xl font-bold">{timeLeft.hours}</div>
              <div className="text-xs text-muted-foreground">Hours</div>
            </div>
            <div className="rounded-md bg-background p-2">
              <div className="text-xl font-bold">{timeLeft.minutes}</div>
              <div className="text-xs text-muted-foreground">Mins</div>
            </div>
            <div className="rounded-md bg-background p-2">
              <div className="text-xl font-bold">{timeLeft.seconds}</div>
              <div className="text-xs text-muted-foreground">Secs</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm">May 15, 2025</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm">9:00 AM - 5:00 PM</span>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm">Attendees</span>
          </div>
          <div className="text-sm">
            <span className="font-medium">{event.registered}</span>
            <span className="text-muted-foreground">/{event.capacity}</span>
          </div>
        </div>

        <div className="relative h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="absolute left-0 top-0 h-full bg-primary"
            style={{ width: `${(event.registered / event.capacity) * 100}%` }}
          />
        </div>
        <div className="text-center text-sm text-muted-foreground">
          {event.capacity - event.registered} seats remaining
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button asChild className="w-full">
          <Link href={`/events/${eventId}/register`}>
            <CreditCard className="mr-2 h-4 w-4" />
            Register Now
          </Link>
        </Button>
        <Button variant="outline" className="w-full">
          <CalendarPlus className="mr-2 h-4 w-4" />
          Add to Calendar
        </Button>
      </CardFooter>
    </Card>
  )
}

