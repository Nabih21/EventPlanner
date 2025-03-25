import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { LayoutDashboard, Calendar, Users, FileText, Settings, Bell, HelpCircle, BarChart2, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <Image src="/placeholder.svg?height=32&width=32" alt="Logo" width={32} height={32} className="h-8 w-8" />
              <span className="hidden font-montserrat text-lg font-bold sm:inline-block">Admin Portal</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>

            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
              <span className="sr-only">Help</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="container flex-1 items-start py-6 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        {/* Sidebar Navigation */}
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <div className="py-6 pr-6">
            <nav className="grid items-start gap-2">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/admin/events"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
              >
                <Calendar className="h-4 w-4" />
                <span>Events</span>
              </Link>
              <Link
                href="/admin/users"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
              >
                <Users className="h-4 w-4" />
                <span>Users</span>
              </Link>
              <Link
                href="/admin/resources"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
              >
                <FileText className="h-4 w-4" />
                <span>Resources</span>
              </Link>
              <Link
                href="/admin/analytics"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
              >
                <BarChart2 className="h-4 w-4" />
                <span>Analytics</span>
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full">{children}</main>
      </div>
    </div>
  )
}

