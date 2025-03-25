"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Calendar, MapPin, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SimilarEventsProps {
  eventId: string
}

export default function SimilarEvents({ eventId }: SimilarEventsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // In a real application, you would fetch similar events based on the current event
  const similarEvents = [
    {
      id: "2",
      title: "Digital Learning Workshop",
      date: "June 2, 2025",
      location: "Zoom",
      type: "online" as const,
      description: "Learn effective strategies for engaging students in virtual classrooms.",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "3",
      title: "EdTech Conference 2025",
      date: "July 10-12, 2025",
      location: "Chicago, IL & Online",
      type: "hybrid" as const,
      description: "Explore the latest educational technologies and their implementation.",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "4",
      title: "STEM Education Symposium",
      date: "August 5, 2025",
      location: "Boston, MA",
      type: "physical" as const,
      description: "Discover innovative approaches to teaching science, technology, engineering, and mathematics.",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "5",
      title: "Global Education Forum",
      date: "September 20, 2025",
      location: "Virtual Event",
      type: "online" as const,
      description: "Connect with educators worldwide to address global challenges in education.",
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      })
    }
  }

  const getEventTypeIcon = (type: "online" | "physical" | "hybrid") => {
    switch (type) {
      case "online":
        return <Wifi className="h-4 w-4" />
      case "physical":
        return <MapPin className="h-4 w-4" />
      case "hybrid":
        return (
          <div className="flex">
            <MapPin className="h-4 w-4" />
            <Wifi className="h-4 w-4" />
          </div>
        )
    }
  }

  return (
    <section className="border-t bg-muted py-12">
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Similar Events</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => scroll("left")}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Scroll left</span>
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll("right")}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Scroll right</span>
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {similarEvents.map((event) => (
            <Card
              key={event.id}
              className="min-w-[300px] max-w-[350px] flex-shrink-0 transition-all hover:shadow-md md:min-w-[350px]"
            >
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
                <div className="absolute right-2 top-2">
                  <Badge variant="secondary" className="flex items-center gap-1 bg-background/80 backdrop-blur-sm">
                    {getEventTypeIcon(event.type)}
                    <span className="capitalize">{event.type}</span>
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="mb-2 line-clamp-1 text-xl font-bold">{event.title}</h3>
                <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                  {event.type === "online" ? <Wifi className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                  <span>{event.location}</span>
                </div>
                <p className="line-clamp-2 text-sm text-muted-foreground">{event.description}</p>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Button asChild className="w-full">
                  <Link href={`/events/${event.id}`}>Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

