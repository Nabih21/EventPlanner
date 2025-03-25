"use client"

import Link from "next/link"
import { CheckCircle, Calendar, Download, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ConfirmationScreenProps {
  eventId: string
  formData: any
}

export default function ConfirmationScreen({ eventId, formData }: ConfirmationScreenProps) {
  // In a real application, you would fetch event data from an API
  const event = {
    id: eventId,
    title: "Future of Education Summit",
    date: "May 15, 2025",
    time: "9:00 AM - 5:00 PM PST",
    location: "San Francisco Convention Center, CA",
  }

  // Generate a random confirmation number
  const confirmationNumber = `EDU-${Math.floor(100000 + Math.random() * 900000)}`

  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6 rounded-full bg-green-100 p-3 text-green-600">
        <CheckCircle className="h-12 w-12" />
      </div>

      <h2 className="mb-2 text-2xl font-bold">Registration Complete!</h2>
      <p className="mb-6 text-muted-foreground">
        Thank you for registering for the event. Your confirmation details are below.
      </p>

      <Card className="mb-8 w-full max-w-md">
        <CardContent className="p-6">
          <div className="mb-4 text-center">
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p className="text-sm text-muted-foreground">
              {event.date}, {event.time}
            </p>
            <p className="text-sm text-muted-foreground">{event.location}</p>
          </div>

          <div className="mb-4 rounded-lg bg-muted p-3 text-center">
            <p className="text-sm">Confirmation Number</p>
            <p className="text-lg font-bold">{confirmationNumber}</p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Attendee:</span>
              <span>
                {formData.attendee.firstName} {formData.attendee.lastName}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Email:</span>
              <span>{formData.attendee.email}</span>
            </div>
            <div className="flex justify-between">
              <span>Ticket Type:</span>
              <span className="capitalize">{formData.tickets.type.replace("-", " ")}</span>
            </div>
            <div className="flex justify-between">
              <span>Quantity:</span>
              <span>{formData.tickets.quantity}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button className="gap-2">
          <Calendar className="h-4 w-4" />
          <span>Add to Calendar</span>
        </Button>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          <span>Download Ticket</span>
        </Button>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <p className="mb-2 text-muted-foreground">A confirmation email has been sent to {formData.attendee.email}</p>
        <Link href="/events" className="flex items-center gap-1 text-sm text-primary hover:underline">
          <span>Browse More Events</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

