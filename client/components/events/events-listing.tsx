"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Wifi, Users, ChevronLeft, ChevronRight } from "lucide-react"
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
  price: string
  organizer: string
  organizerAvatar: string
  remainingSeats: number
}

const events: Event[] = [
  {
    id: "1",
    title: "Future of Education Summit",
    date: "May 15, 2025",
    location: "San Francisco, CA",
    type: "physical",
    description:
      "Join education leaders to discuss emerging trends and innovations in learning. This summit brings together thought leaders, practitioners, and policymakers to shape the future of education.",
    image: "/placeholder.svg?height=300&width=500",
    price: "$299",
    organizer: "Global Education Alliance",
    organizerAvatar: "/placeholder.svg?height=40&width=40",
    remainingSeats: 45,
  },
  {
    id: "2",
    title: "Digital Learning Workshop",
    date: "June 2, 2025",
    location: "Zoom",
    type: "online",
    description:
      "Learn effective strategies for engaging students in virtual classrooms. This hands-on workshop will provide practical tools and techniques for online teaching excellence.",
    image: "/placeholder.svg?height=300&width=500",
    price: "$99",
    organizer: "EdTech Innovators",
    organizerAvatar: "/placeholder.svg?height=40&width=40",
    remainingSeats: 120,
  },
  {
    id: "3",
    title: "EdTech Conference 2025",
    date: "July 10-12, 2025",
    location: "Chicago, IL & Online",
    type: "hybrid",
    description:
      "Explore the latest educational technologies and their implementation. Connect with vendors, researchers, and practitioners at the forefront of educational innovation.",
    image: "/placeholder.svg?height=300&width=500",
    price: "$349",
    organizer: "Tech in Education Association",
    organizerAvatar: "/placeholder.svg?height=40&width=40",
    remainingSeats: 75,
  },
  {
    id: "4",
    title: "STEM Education Symposium",
    date: "August 5, 2025",
    location: "Boston, MA",
    type: "physical",
    description:
      "Discover innovative approaches to teaching science, technology, engineering, and mathematics. This symposium features hands-on demonstrations, research presentations, and networking opportunities.",
    image: "/placeholder.svg?height=300&width=500",
    price: "$199",
    organizer: "STEM Forward Initiative",
    organizerAvatar: "/placeholder.svg?height=40&width=40",
    remainingSeats: 30,
  },
  {
    id: "5",
    title: "Global Education Forum",
    date: "September 20, 2025",
    location: "Virtual Event",
    type: "online",
    description:
      "Connect with educators worldwide to address global challenges in education. This forum facilitates cross-cultural exchange of ideas and best practices in education.",
    image: "/placeholder.svg?height=300&width=500",
    price: "Free",
    organizer: "International Education Collaborative",
    organizerAvatar: "/placeholder.svg?height=40&width=40",
    remainingSeats: 500,
  },
  {
    id: "6",
    title: "Inclusive Education Conference",
    date: "October 15, 2025",
    location: "Toronto, Canada",
    type: "physical",
    description:
      "Learn strategies for creating inclusive learning environments for all students. This conference addresses diverse learning needs, accessibility, and equity in education.",
    image: "/placeholder.svg?height=300&width=500",
    price: "$249",
    organizer: "Education for All Network",
    organizerAvatar: "/placeholder.svg?height=40&width=40",
    remainingSeats: 60,
  },
]

export default function EventsListing() {
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 6
  const totalPages = Math.ceil(events.length / eventsPerPage)

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} className="flex h-full flex-col transition-all hover:shadow-md">
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
            <CardContent className="flex-1 p-6">
              <h3 className="mb-2 line-clamp-1 text-xl font-bold">{event.title}</h3>
              <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{event.date}</span>
              </div>
              <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                {event.type === "online" ? <Wifi className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                <span>{event.location}</span>
              </div>
              <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{event.description}</p>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative h-6 w-6 overflow-hidden rounded-full">
                    <Image
                      src={event.organizerAvatar || "/placeholder.svg"}
                      alt={event.organizer}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{event.organizer}</span>
                </div>
                <Badge variant={event.price === "Free" ? "secondary" : "outline"}>{event.price}</Badge>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                <span>
                  {event.remainingSeats} {event.remainingSeats === 1 ? "seat" : "seats"} remaining
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 p-6 pt-0">
              <Button asChild variant="outline" className="flex-1">
                <Link href={`/events/${event.id}`}>View Details</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link href={`/events/${event.id}/register`}>Register</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-center gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous page</span>
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            onClick={() => handlePageChange(page)}
            className="h-8 w-8"
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next page</span>
        </Button>
      </div>
    </div>
  )
}

