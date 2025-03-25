import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Linkedin, Instagram, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Organization Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/placeholder.svg?height=32&width=32" alt="Logo" width={32} height={32} className="h-8 w-8" />
              <span className="font-montserrat text-lg font-bold">Smart Education</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Transforming educational events with smart technology and seamless experiences.
            </p>
            <p className="text-sm">
              <strong>Email:</strong> contact@smarteducation.com
              <br />
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/events" className="text-muted-foreground transition-colors hover:text-foreground">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-muted-foreground transition-colors hover:text-foreground">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground transition-colors hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground transition-colors hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Connect With Us</h3>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest updates on events and resources.
            </p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email" className="h-9 w-full" />
              <Button size="sm" className="h-9">
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Smart Education Events System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

