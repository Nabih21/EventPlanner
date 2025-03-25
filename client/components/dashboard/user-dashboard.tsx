"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Wifi, Download, ExternalLink, Edit, Plus, Ticket, CalendarPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("upcoming")

  // In a real application, you would fetch this data from an API
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    upcomingEvents: 3,
    notifications: 2,
  }

  const upcomingEvents = [
    {
      id: "1",
      title: "Future of Education Summit",
      date: "May 15, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "San Francisco Convention Center, CA",
      type: "physical" as const,
      image: "/placeholder.svg?height=300&width=500",
      status: "confirmed" as const,
    },
    {
      id: "2",
      title: "Digital Learning Workshop",
      date: "June 2, 2025",
      time: "10:00 AM - 2:00 PM",
      location: "Zoom",
      type: "online" as const,
      image: "/placeholder.svg?height=300&width=500",
      status: "confirmed" as const,
    },
    {
      id: "3",
      title: "EdTech Conference 2025",
      date: "July 10-12, 2025",
      time: "All Day",
      location: "Chicago, IL & Online",
      type: "hybrid" as const,
      image: "/placeholder.svg?height=300&width=500",
      status: "pending" as const,
    },
  ]

  const pastEvents = [
    {
      id: "4",
      title: "Teaching Innovation Forum",
      date: "March 5, 2025",
      time: "9:00 AM - 4:00 PM",
      location: "Boston University",
      type: "physical" as const,
      image: "/placeholder.svg?height=300&width=500",
      status: "completed" as const,
    },
    {
      id: "5",
      title: "AI in Education Webinar",
      date: "February 15, 2025",
      time: "1:00 PM - 3:00 PM",
      location: "Online",
      type: "online" as const,
      image: "/placeholder.svg?height=300&width=500",
      status: "completed" as const,
    },
  ]

  const savedEvents = [
    {
      id: "6",
      title: "STEM Education Symposium",
      date: "August 5, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Boston, MA",
      type: "physical" as const,
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "7",
      title: "Global Education Forum",
      date: "September 20, 2025",
      time: "8:00 AM - 6:00 PM",
      location: "Virtual Event",
      type: "online" as const,
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  const resources = [
    {
      id: "1",
      title: "AI in Education: A Practical Guide",
      type: "PDF",
      event: "Digital Learning Workshop",
      dateAdded: "April 10, 2025",
      size: "5.1 MB",
      icon: "file-text",
    },
    {
      id: "2",
      title: "Future Skills Framework",
      type: "PDF",
      event: "Future of Education Summit",
      dateAdded: "April 5, 2025",
      size: "3.7 MB",
      icon: "file-text",
    },
    {
      id: "3",
      title: "Teaching Innovation Slides",
      type: "PPTX",
      event: "Teaching Innovation Forum",
      dateAdded: "March 6, 2025",
      size: "12.3 MB",
      icon: "file-presentation",
    },
    {
      id: "4",
      title: "AI Webinar Recording",
      type: "MP4",
      event: "AI in Education Webinar",
      dateAdded: "February 16, 2025",
      size: "245 MB",
      icon: "video",
    },
  ]

  return (
    <div className="grid gap-8 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr]">
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4 h-24 w-24">
                <Image
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  fill
                  className="rounded-full object-cover"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-background"
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit profile</span>
                </Button>
              </div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>

              <div className="mt-4 grid w-full grid-cols-2 gap-2">
                <div className="rounded-lg bg-muted p-2 text-center">
                  <div className="text-2xl font-bold">{user.upcomingEvents}</div>
                  <div className="text-xs text-muted-foreground">Upcoming Events</div>
                </div>
                <div className="rounded-lg bg-muted p-2 text-center">
                  <div className="text-2xl font-bold">{user.notifications}</div>
                  <div className="text-xs text-muted-foreground">Notifications</div>
                </div>
              </div>

              <Button asChild className="mt-4 w-full">
                <Link href="/account/settings">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dashboard Navigation</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <nav className="grid">
              <Link
                href="/account"
                className="flex items-center gap-2 border-l-2 border-primary bg-muted/50 px-4 py-2 font-medium"
              >
                <Calendar className="h-4 w-4" />
                <span>My Events</span>
              </Link>
              <Link
                href="/account/resources"
                className="flex items-center gap-2 border-l-2 border-transparent px-4 py-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
              >
                <Download className="h-4 w-4" />
                <span>My Resources</span>
              </Link>
              <Link
                href="/account/messages"
                className="flex items-center gap-2 border-l-2 border-transparent px-4 py-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Messages</span>
              </Link>
              <Link
                href="/account/favorites"
                className="flex items-center gap-2 border-l-2 border-transparent px-4 py-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
              >
                <Heart className="h-4 w-4" />
                <span>Favorites</span>
              </Link>
              <Link
                href="/account/billing"
                className="flex items-center gap-2 border-l-2 border-transparent px-4 py-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
              >
                <CreditCard className="h-4 w-4" />
                <span>Billing/Payments</span>
              </Link>
              <Link
                href="/account/settings"
                className="flex items-center gap-2 border-l-2 border-transparent px-4 py-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </nav>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>My Events</CardTitle>
            <CardDescription>Manage your registered and saved events</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="mt-6">
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <Card key={event.id} className="overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div className="relative h-48 w-full sm:h-auto sm:w-48">
                            <Image
                              src={event.image || "/placeholder.svg"}
                              alt={event.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col p-4">
                            <div className="mb-2 flex items-start justify-between">
                              <h3 className="text-lg font-bold">{event.title}</h3>
                              <Badge
                                variant={
                                  event.status === "confirmed"
                                    ? "default"
                                    : event.status === "pending"
                                      ? "outline"
                                      : "secondary"
                                }
                              >
                                {event.status === "confirmed"
                                  ? "Confirmed"
                                  : event.status === "pending"
                                    ? "Pending"
                                    : "Completed"}
                              </Badge>
                            </div>

                            <div className="mb-4 space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {event.type === "online" ? (
                                  <Wifi className="h-4 w-4" />
                                ) : (
                                  <MapPin className="h-4 w-4" />
                                )}
                                <span>{event.location}</span>
                              </div>
                            </div>

                            <div className="mt-auto flex flex-wrap gap-2">
                              <Button asChild size="sm" variant="outline">
                                <Link href={`/events/${event.id}`}>
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  View Event
                                </Link>
                              </Button>
                              <Button asChild size="sm">
                                <Link href={`/account/tickets/${event.id}`}>
                                  <Ticket className="mr-2 h-4 w-4" />
                                  View Ticket
                                </Link>
                              </Button>
                              <Button size="sm" variant="outline">
                                <CalendarPlus className="mr-2 h-4 w-4" />
                                Add to Calendar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-xl font-semibold">No Upcoming Events</h3>
                    <p className="mb-4 text-muted-foreground">
                      You don't have any upcoming events. Browse events to register.
                    </p>
                    <Button asChild>
                      <Link href="/events">Browse Events</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="past" className="mt-6">
                {pastEvents.length > 0 ? (
                  <div className="space-y-4">
                    {pastEvents.map((event) => (
                      <Card key={event.id} className="overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div className="relative h-48 w-full sm:h-auto sm:w-48">
                            <Image
                              src={event.image || "/placeholder.svg"}
                              alt={event.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                                Completed
                              </Badge>
                            </div>
                          </div>
                          <div className="flex flex-1 flex-col p-4">
                            <h3 className="mb-2 text-lg font-bold">{event.title}</h3>

                            <div className="mb-4 space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {event.type === "online" ? (
                                  <Wifi className="h-4 w-4" />
                                ) : (
                                  <MapPin className="h-4 w-4" />
                                )}
                                <span>{event.location}</span>
                              </div>
                            </div>

                            <div className="mt-auto flex flex-wrap gap-2">
                              <Button asChild size="sm" variant="outline">
                                <Link href={`/events/${event.id}`}>
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  View Event
                                </Link>
                              </Button>
                              <Button asChild size="sm">
                                <Link href={`/account/certificates/${event.id}`}>
                                  <Award className="mr-2 h-4 w-4" />
                                  View Certificate
                                </Link>
                              </Button>
                              <Button size="sm" variant="outline">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Leave Feedback
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <History className="mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-xl font-semibold">No Past Events</h3>
                    <p className="mb-4 text-muted-foreground">
                      You haven't attended any events yet. Browse events to register.
                    </p>
                    <Button asChild>
                      <Link href="/events">Browse Events</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="saved" className="mt-6">
                {savedEvents.length > 0 ? (
                  <div className="space-y-4">
                    {savedEvents.map((event) => (
                      <Card key={event.id} className="overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div className="relative h-48 w-full sm:h-auto sm:w-48">
                            <Image
                              src={event.image || "/placeholder.svg"}
                              alt={event.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col p-4">
                            <h3 className="mb-2 text-lg font-bold">{event.title}</h3>

                            <div className="mb-4 space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {event.type === "online" ? (
                                  <Wifi className="h-4 w-4" />
                                ) : (
                                  <MapPin className="h-4 w-4" />
                                )}
                                <span>{event.location}</span>
                              </div>
                            </div>

                            <div className="mt-auto flex flex-wrap gap-2">
                              <Button asChild size="sm" variant="outline">
                                <Link href={`/events/${event.id}`}>
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  View Event
                                </Link>
                              </Button>
                              <Button asChild size="sm">
                                <Link href={`/events/${event.id}/register`}>
                                  <Ticket className="mr-2 h-4 w-4" />
                                  Register Now
                                </Link>
                              </Button>
                              <Button size="sm" variant="outline">
                                <Trash className="mr-2 h-4 w-4" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Bookmark className="mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-xl font-semibold">No Saved Events</h3>
                    <p className="mb-4 text-muted-foreground">
                      You haven't saved any events yet. Browse events and save them for later.
                    </p>
                    <Button asChild>
                      <Link href="/events">Browse Events</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Resources</CardTitle>
            <CardDescription>Access materials from your events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-primary/10 p-2 text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">{resource.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{resource.type}</span>
                        <span>•</span>
                        <span>{resource.size}</span>
                        <span>•</span>
                        <span>From: {resource.event}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <Button asChild variant="outline">
                <Link href="/account/resources">
                  <Plus className="mr-2 h-4 w-4" />
                  View All Resources
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Your event participation statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Events Attended</h4>
                  <span className="text-sm text-muted-foreground">2/5</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Resources Downloaded</h4>
                  <span className="text-sm text-muted-foreground">7/12</span>
                </div>
                <Progress value={58} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Feedback Submitted</h4>
                  <span className="text-sm text-muted-foreground">1/2</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Profile Completion</h4>
                  <span className="text-sm text-muted-foreground">80%</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { MessageSquare, Heart, CreditCard, Settings, History, Bookmark, Award, Trash, FileText } from "lucide-react"

