import type React from "react"
import { BookOpen, Users, Calendar, Award, Globe, Lightbulb } from "lucide-react"

interface BenefitProps {
  icon: React.ReactNode
  title: string
  description: string
}

function Benefit({ icon, title, description }: BenefitProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

export default function BenefitsSection() {
  const benefits = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Streamlined Event Management",
      description: "Easily create, manage, and promote educational events with our intuitive platform.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Enhanced Networking",
      description: "Connect with like-minded educators and professionals to expand your network.",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Resource Sharing",
      description: "Access and share valuable educational resources with participants before and after events.",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Reach",
      description: "Host and attend events from anywhere in the world with our hybrid event capabilities.",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Innovative Learning",
      description: "Discover cutting-edge educational approaches and technologies through our events.",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Professional Development",
      description: "Earn certificates and recognition for your participation in educational events.",
    },
  ]

  return (
    <section className="bg-muted py-16">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">Why Choose Our Platform</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Our smart education events system provides everything you need to create, manage, and participate in
            impactful educational experiences.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Benefit key={index} icon={benefit.icon} title={benefit.title} description={benefit.description} />
          ))}
        </div>
      </div>
    </section>
  )
}

