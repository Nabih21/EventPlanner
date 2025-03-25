"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Calendar, MapPin, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type EventType = "online" | "physical" | "hybrid"

interface Event {
  id: string
  title: string
  date: string
  location: string
  type: EventType
  description: string
  image: string
}

const events: Event[] = [
  {
    id: "1",
    title: "Future of Education Summit",
    date: "May 15, 2025",
    location: "San Francisco, CA",
    type: "physical",
    description: "Join education leaders to discuss emerging trends and innovations in learning.",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "2",
    title: "Digital Learning Workshop",
    date: "June 2, 2025",
    location: "Zoom",
    type: "online",
    description: "Learn effective strategies for engaging students in virtual classrooms.",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "3",
    title: "EdTech Conference 2025",
    date: "July 10-12, 2025",
    location: "Chicago, IL & Online",
    type: "hybrid",
    description: "Explore the latest educational technologies and their implementation.",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "4",
    title: "STEM Education Symposium",
    date: "August 5, 2025",
    location: "Boston, MA",
    type: "physical",
    description: "Discover innovative approaches to teaching science, technology, engineering, and mathematics.",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "5",
    title: "Global Education Forum",
    date: "September 20, 2025",
    location: "Virtual Event",
    type: "online",
    description: "Connect with educators worldwide to address global challenges in education.",
    image: "/placeholder.svg?height=300&width=500",
  },
]

export default function FeaturedEvents() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current
      const scrollAmount = clientWidth * 0.8
      const maxScroll = scrollWidth - clientWidth

      let newPosition = direction === "right" ? scrollPosition + scrollAmount : scrollPosition - scrollAmount

      newPosition = Math.max(0, Math.min(newPosition, maxScroll))

      scrollRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      })

      setScrollPosition(newPosition)
    }
  }

  const getEventTypeIcon = (type: EventType) => {
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
    <section className="py-16">
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Events</h2>
            <p className="mt-2 text-muted-foreground">Discover upcoming educational events that match your interests</p>
          </div>
          <div className="hidden md:flex md:items-center md:gap-2">
            <Button variant="outline" size="icon" onClick={() => scroll("left")} disabled={scrollPosition <= 0}>
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
          {events.map((event) => (
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

        <div className="mt-8 flex justify-center md:hidden">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => scroll("left")} disabled={scrollPosition <= 0}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Scroll left</span>
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll("right")}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Scroll right</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

