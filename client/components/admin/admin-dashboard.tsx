"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts"
import {
  Calendar,
  Users,
  DollarSign,
  BarChart2,
  Plus,
  FileText,
  Search,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Edit,
  Trash,
  MoreHorizontal,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for charts
const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 7000 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 8000 },
]

const attendanceData = [
  { name: "Jan", physical: 240, online: 400, hybrid: 180 },
  { name: "Feb", physical: 300, online: 450, hybrid: 200 },
  { name: "Mar", physical: 200, online: 500, hybrid: 250 },
  { name: "Apr", physical: 270, online: 480, hybrid: 220 },
  { name: "May", physical: 350, online: 520, hybrid: 260 },
  { name: "Jun", physical: 380, online: 550, hybrid: 300 },
]

const eventTypeData = [
  { name: "Physical", value: 35 },
  { name: "Online", value: 45 },
  { name: "Hybrid", value: 20 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

// Mock data for tables
const upcomingEvents = [
  {
    id: "1",
    title: "Future of Education Summit",
    date: "May 15, 2025",
    registrations: 155,
    capacity: 200,
    status: "active",
  },
  {
    id: "2",
    title: "Digital Learning Workshop",
    date: "June 2, 2025",
    registrations: 87,
    capacity: 150,
    status: "active",
  },
  {
    id: "3",
    title: "EdTech Conference 2025",
    date: "July 10-12, 2025",
    registrations: 210,
    capacity: 500,
    status: "draft",
  },
  {
    id: "4",
    title: "STEM Education Symposium",
    date: "August 5, 2025",
    registrations: 45,
    capacity: 200,
    status: "active",
  },
  {
    id: "5",
    title: "Global Education Forum",
    date: "September 20, 2025",
    registrations: 120,
    capacity: 300,
    status: "active",
  },
]

const recentRegistrations = [
  {
    id: "1",
    user: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
    },
    event: "Future of Education Summit",
    date: "2 hours ago",
    ticketType: "Standard",
    amount: "$299",
  },
  {
    id: "2",
    user: {
      name: "Michael Chen",
      email: "m.chen@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MC",
    },
    event: "Digital Learning Workshop",
    date: "5 hours ago",
    ticketType: "VIP",
    amount: "$499",
  },
  {
    id: "3",
    user: {
      name: "Emily Rodriguez",
      email: "e.rodriguez@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ER",
    },
    event: "Future of Education Summit",
    date: "Yesterday",
    ticketType: "Early Bird",
    amount: "$249",
  },
  {
    id: "4",
    user: {
      name: "David Kim",
      email: "d.kim@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DK",
    },
    event: "STEM Education Symposium",
    date: "Yesterday",
    ticketType: "Standard",
    amount: "$199",
  },
  {
    id: "5",
    user: {
      name: "Lisa Patel",
      email: "l.patel@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "LP",
    },
    event: "Digital Learning Workshop",
    date: "2 days ago",
    ticketType: "Student",
    amount: "$99",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <h3 className="text-2xl font-bold">$42,500</h3>
              </div>
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              <span className="font-medium text-green-500">+12.5%</span>
              <span className="ml-1 text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Registrations</p>
                <h3 className="text-2xl font-bold">1,245</h3>
              </div>
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              <span className="font-medium text-green-500">+8.2%</span>
              <span className="ml-1 text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Events</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              <span className="font-medium text-green-500">+2</span>
              <span className="ml-1 text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resource Downloads</p>
                <h3 className="text-2xl font-bold">3,782</h3>
              </div>
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Download className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
              <span className="font-medium text-red-500">-3.1%</span>
              <span className="ml-1 text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 pt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Revenue Chart */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue from event registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                      <Bar dataKey="revenue" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Event Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Event Types</CardTitle>
                <CardDescription>Distribution by event format</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={eventTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {eventTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Monitor and manage your scheduled events</CardDescription>
              </div>
              <Button asChild>
                <Link href="/admin/events/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Event
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Registrations</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.title}</TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>
                            {event.registrations}/{event.capacity}
                          </span>
                          <Progress value={(event.registrations / event.capacity) * 100} className="h-2 w-16" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={event.status === "active" ? "default" : "outline"}>
                          {event.status === "active" ? "Active" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Event
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete Event
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline" asChild>
                <Link href="/admin/events">View All Events</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Recent Registrations */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Registrations</CardTitle>
              <CardDescription>Latest user registrations across all events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRegistrations.map((registration) => (
                  <div key={registration.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={registration.user.avatar} alt={registration.user.name} />
                        <AvatarFallback>{registration.user.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{registration.user.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{registration.event}</span>
                          <span>•</span>
                          <span>{registration.ticketType}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{registration.amount}</div>
                      <div className="text-sm text-muted-foreground">{registration.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">View All Registrations</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search events..." className="pl-10" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
            <Button asChild>
              <Link href="/admin/events/create">
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </Link>
            </Button>
          </div>

          <Tabs defaultValue="active">
            <TabsList>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Registrations</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingEvents
                        .filter((event) => event.status === "active")
                        .map((event) => (
                          <TableRow key={event.id}>
                            <TableCell className="font-medium">{event.title}</TableCell>
                            <TableCell>{event.date}</TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {event.id === "2" ? "Online" : event.id === "3" ? "Hybrid" : "Physical"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span>
                                  {event.registrations}/{event.capacity}
                                </span>
                                <Progress value={(event.registrations / event.capacity) * 100} className="h-2 w-16" />
                              </div>
                            </TableCell>
                            <TableCell>
                              $
                              {(
                                event.registrations * (event.id === "2" ? 99 : event.id === "4" ? 199 : 299)
                              ).toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Event
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Users className="mr-2 h-4 w-4" />
                                    Manage Attendees
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <BarChart2 className="mr-2 h-4 w-4" />
                                    View Analytics
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete Event
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="draft" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-xl font-semibold">Draft Events</h3>
                    <p className="mb-4 max-w-md text-muted-foreground">
                      You have 1 event in draft status. Continue editing or publish when ready.
                    </p>
                    <Button asChild>
                      <Link href="/admin/events/3/edit">Edit Draft Event</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6 pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Attendance Trends */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Attendance Trends</CardTitle>
                <CardDescription>Monthly attendance by event type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="physical" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="online" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="hybrid" stroke="#ffc658" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Key Performance Metrics</CardTitle>
                <CardDescription>Year-to-date performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Average Attendance Rate</h4>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Resource Engagement</h4>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Repeat Attendees</h4>
                    <span className="text-sm font-medium">42%</span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Feedback Submission Rate</h4>
                    <span className="text-sm font-medium">53%</span>
                  </div>
                  <Progress value={53} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Revenue Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>By ticket type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Standard", value: 55 },
                          { name: "VIP", value: 25 },
                          { name: "Early Bird", value: 15 },
                          { name: "Student", value: 5 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {eventTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Analytics Controls</CardTitle>
              <CardDescription>Customize your analytics view</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="date-range">Date Range</Label>
                  <Select defaultValue="6months">
                    <SelectTrigger id="date-range">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30days">Last 30 Days</SelectItem>
                      <SelectItem value="3months">Last 3 Months</SelectItem>
                      <SelectItem value="6months">Last 6 Months</SelectItem>
                      <SelectItem value="1year">Last Year</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="event-type">Event Type</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="event-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="physical">Physical</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metrics">Metrics</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="metrics">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Metrics</SelectItem>
                      <SelectItem value="attendance">Attendance</SelectItem>
                      <SelectItem value="revenue">Revenue</SelectItem>
                      <SelectItem value="engagement">Engagement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Reset</Button>
              <Button>Apply Filters</Button>
            </CardFooter>
          </Card>

          <div className="flex justify-end">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Analytics Report
            </Button>
          </div>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search users..." className="pl-10" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Events Attended</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: "1",
                      name: "Sarah Johnson",
                      email: "sarah.j@example.com",
                      avatar: "/placeholder.svg?height=40&width=40",
                      initials: "SJ",
                      role: "Attendee",
                      eventsAttended: 5,
                      lastActive: "2 hours ago",
                    },
                    {
                      id: "2",
                      name: "Michael Chen",
                      email: "m.chen@example.com",
                      avatar: "/placeholder.svg?height=40&width=40",
                      initials: "MC",
                      role: "Organizer",
                      eventsAttended: 12,
                      lastActive: "1 day ago",
                    },
                    {
                      id: "3",
                      name: "Emily Rodriguez",
                      email: "e.rodriguez@example.com",
                      avatar: "/placeholder.svg?height=40&width=40",
                      initials: "ER",
                      role: "Speaker",
                      eventsAttended: 8,
                      lastActive: "3 days ago",
                    },
                    {
                      id: "4",
                      name: "David Kim",
                      email: "d.kim@example.com",
                      avatar: "/placeholder.svg?height=40&width=40",
                      initials: "DK",
                      role: "Admin",
                      eventsAttended: 15,
                      lastActive: "Just now",
                    },
                    {
                      id: "5",
                      name: "Lisa Patel",
                      email: "l.patel@example.com",
                      avatar: "/placeholder.svg?height=40&width=40",
                      initials: "LP",
                      role: "Attendee",
                      eventsAttended: 3,
                      lastActive: "1 week ago",
                    },
                  ].map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.initials}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.role === "Admin" ? "default" : user.role === "Organizer" ? "secondary" : "outline"
                          }
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.eventsAttended}</TableCell>
                      <TableCell>{user.lastActive}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              View Events
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">Showing 5 of 120 users</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

