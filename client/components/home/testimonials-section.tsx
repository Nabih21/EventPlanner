"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Testimonial {
  id: number
  name: string
  role: string
  organization: string
  quote: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Director of Education",
    organization: "Global Learning Institute",
    quote:
      "The Smart Education Events System has revolutionized how we organize and manage our educational conferences. The platform's intuitive interface and comprehensive features have saved us countless hours of work.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    role: "Department Chair",
    organization: "University of Technology",
    quote:
      "As an educator who frequently organizes workshops, I've found this platform to be an invaluable tool. The analytics and reporting features provide insights that help us continuously improve our events.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "EdTech Specialist",
    organization: "Future Schools Network",
    quote:
      "The hybrid event capabilities allowed us to reach a global audience while maintaining the personal connection of in-person events. Our attendance increased by 300% after switching to this platform.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">What Our Users Say</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Hear from educators and event organizers who have transformed their educational events with our platform.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Card className="border-none bg-muted/50 shadow-sm">
            <CardContent className="p-8">
              <div className="flex flex-col items-center gap-6 text-center md:flex-row md:gap-8 md:text-left">
                <div className="flex-shrink-0">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full">
                    <Image
                      src={testimonials[activeIndex].avatar || "/placeholder.svg"}
                      alt={testimonials[activeIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-4 text-primary">
                    <Quote className="h-8 w-8" />
                  </div>
                  <p className="mb-4 text-lg italic">"{testimonials[activeIndex].quote}"</p>
                  <div>
                    <h4 className="font-semibold">{testimonials[activeIndex].name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[activeIndex].role}, {testimonials[activeIndex].organization}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-center gap-2">
            <Button variant="outline" size="icon" onClick={prevTestimonial} aria-label="Previous testimonial">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant={index === activeIndex ? "default" : "outline"}
                size="icon"
                className="h-2 w-2 rounded-full p-0"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
            <Button variant="outline" size="icon" onClick={nextTestimonial} aria-label="Next testimonial">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

