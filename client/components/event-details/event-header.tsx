import Image from "next/image"
import { Calendar, MapPin, Wifi, Share2, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EventHeaderProps {
  eventId: string
}

export default function EventHeader({ eventId }: EventHeaderProps) {
  // In a real application, you would fetch event data based on the ID
  const event = {
    id: eventId,
    title: "Future of Education Summit",
    date: "May 15, 2025",
    time: "9:00 AM - 5:00 PM PST",
    location: "San Francisco Convention Center, CA",
    type: "physical",
    organizer: "Global Education Alliance",
    organizerAvatar: "/placeholder.svg?height=40&width=40",
  }

  return (
    <div className="relative">
      <div className="relative h-[300px] w-full md:h-[400px]">
        <Image src="/placeholder.svg?height=800&width=1600" alt={event.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <div className="container relative -mt-32 pb-6 pt-6 md:-mt-40">
        <div className="rounded-lg bg-background/95 p-6 shadow-lg backdrop-blur-sm md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">{event.title}</h1>

              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>
                    {event.date}, {event.time}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {event.type === "online" ? (
                    <Wifi className="h-4 w-4 text-primary" />
                  ) : (
                    <MapPin className="h-4 w-4 text-primary" />
                  )}
                  <span>{event.location}</span>
                </div>

                <div className="flex items-center gap-1">
                  <User className="h-4 w-4 text-primary" />
                  <span>Organized by {event.organizer}</span>
                </div>
              </div>
            </div>

            <Button variant="outline" size="sm" className="flex gap-1">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

