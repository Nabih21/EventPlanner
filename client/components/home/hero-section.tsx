import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative">
      <div
        className="absolute inset-0 bg-primary/70"
        style={{
          backgroundImage: "url('/placeholder.svg?height=800&width=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      />
      <div className="container relative z-10 flex min-h-[600px] flex-col items-center justify-center py-24 text-center text-white">
        <h1 className="mb-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Transform Your Educational Events Experience
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-white/90 md:text-xl">
          Discover, organize, and participate in educational events that enhance learning and professional development.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/events">Browse Events</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white bg-transparent text-white hover:bg-white/10"
          >
            <Link href="/create-event">Create Event</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

