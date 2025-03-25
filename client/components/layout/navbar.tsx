"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Search, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useMobile } from "@/hooks/use-mobile"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const isMobile = useMobile()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/placeholder.svg?height=32&width=32" alt="Logo" width={32} height={32} className="h-8 w-8" />
            <span className="hidden font-montserrat text-lg font-bold sm:inline-block">Smart Education</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/events" className="text-sm font-medium transition-colors hover:text-primary">
            Events
          </Link>
          <Link href="/resources" className="text-sm font-medium transition-colors hover:text-primary">
            Resources
          </Link>
          <Link href="/account" className="text-sm font-medium transition-colors hover:text-primary">
            My Account
          </Link>
          <Link href="/support" className="text-sm font-medium transition-colors hover:text-primary">
            Help/Support
          </Link>
        </nav>

        {/* Secondary Navigation */}
        <div className="flex items-center gap-4">
          {isSearchOpen && !isMobile ? (
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="h-9 w-[200px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <Button variant="ghost" size="icon" className="absolute right-0 top-0" onClick={toggleSearch}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" className="hidden md:inline-flex" onClick={toggleSearch}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem><Link href={"/admin/dashboard"}>Dashboard</Link></DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col space-y-4 py-4">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/events"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/resources"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              href="/account"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              My Account
            </Link>
            <Link
              href="/support"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Help/Support
            </Link>
            <div className="relative mt-2">
              <input
                type="text"
                placeholder="Search..."
                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <Button variant="ghost" size="icon" className="absolute right-0 top-0">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

