"use client"

import { Button } from "@/components/ui/button"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface EventTabsProps {
  eventId: string
}

export default function EventTabs({ eventId }: EventTabsProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // In a real application, you would fetch this data based on the event ID
  const eventData = {
    overview: `
      <p>Join us for the Future of Education Summit, a premier gathering of education leaders, innovators, and practitioners from around the world. This one-day event will explore emerging trends and technologies that are shaping the future of learning.</p>
      
      <p>The summit will feature keynote presentations, panel discussions, interactive workshops, and networking opportunities designed to inspire and equip participants with actionable insights and strategies.</p>
      
      <p>Key topics include:</p>
      <ul>
        <li>Artificial Intelligence in Education</li>
        <li>Personalized Learning Pathways</li>
        <li>Equity and Accessibility in Digital Learning</li>
        <li>Future Skills and Workforce Development</li>
        <li>Reimagining Educational Institutions</li>
      </ul>
      
      <p>Whether you're a school administrator, teacher, education technology provider, policymaker, or researcher, this summit offers valuable perspectives and connections to help you navigate the rapidly evolving education landscape.</p>
    `,
    schedule: [
      {
        time: "8:00 AM - 9:00 AM",
        title: "Registration and Breakfast",
        description:
          "Check-in, collect your badge, and enjoy a continental breakfast while networking with fellow attendees.",
      },
      {
        time: "9:00 AM - 10:00 AM",
        title: "Opening Keynote: The Next Decade in Education",
        description:
          "Dr. Maria Chen, Chief Learning Officer at Global Education Initiative, will present a vision for how education will evolve over the next ten years.",
        speaker: "Dr. Maria Chen",
      },
      {
        time: "10:15 AM - 11:30 AM",
        title: "Panel Discussion: AI and Personalized Learning",
        description:
          "Industry experts discuss how artificial intelligence is enabling truly personalized learning experiences and what this means for educators.",
        speakers: ["Dr. James Wilson", "Prof. Sarah Ahmed", "Michael Rodriguez", "Dr. Lisa Patel"],
      },
      {
        time: "11:45 AM - 12:45 PM",
        title: "Breakout Sessions (Choose One)",
        sessions: [
          "Designing Inclusive Digital Learning Experiences",
          "Data-Driven Decision Making in Education",
          "Building Future-Ready Skills Programs",
        ],
      },
      {
        time: "12:45 PM - 1:45 PM",
        title: "Networking Lunch",
        description: "Enjoy a catered lunch while connecting with speakers and fellow attendees.",
      },
      {
        time: "2:00 PM - 3:15 PM",
        title: "Interactive Workshops (Choose One)",
        sessions: [
          "Implementing AI Tools in the Classroom",
          "Creating Effective Hybrid Learning Environments",
          "Measuring Impact: Beyond Traditional Assessments",
        ],
      },
      {
        time: "3:30 PM - 4:30 PM",
        title: "Closing Keynote: Education as a Force for Change",
        description:
          "Dr. Robert Johnson, renowned education futurist, will discuss how education can drive positive social and economic transformation.",
        speaker: "Dr. Robert Johnson",
      },
      {
        time: "4:30 PM - 5:00 PM",
        title: "Closing Remarks and Next Steps",
        description: "Summary of key takeaways and information about future events and initiatives.",
      },
      {
        time: "5:00 PM - 6:30 PM",
        title: "Reception and Networking",
        description: "Continue conversations over drinks and appetizers (included in registration).",
      },
    ],
    speakers: [
      {
        name: "Dr. Maria Chen",
        role: "Chief Learning Officer",
        organization: "Global Education Initiative",
        bio: "Dr. Chen has over 20 years of experience in education innovation and has advised governments and organizations worldwide on learning strategy.",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        name: "Dr. Robert Johnson",
        role: "Education Futurist",
        organization: "Future Learning Institute",
        bio: "A bestselling author and TED speaker, Dr. Johnson's research focuses on how technology and social changes are reshaping education.",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        name: "Prof. Sarah Ahmed",
        role: "Professor of Learning Sciences",
        organization: "Stanford University",
        bio: "Prof. Ahmed's groundbreaking research on AI in education has been featured in leading academic journals and mainstream media.",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        name: "Michael Rodriguez",
        role: "CEO",
        organization: "EduTech Innovations",
        bio: "As the founder of a leading education technology company, Michael has pioneered adaptive learning platforms used by millions of students.",
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
    resources: [
      {
        title: "Pre-Summit Reading List",
        description: "A curated collection of articles and research papers related to summit topics.",
        type: "PDF",
        size: "2.4 MB",
      },
      {
        title: "AI in Education: A Practical Guide",
        description: "A comprehensive guide to implementing AI tools in educational settings.",
        type: "PDF",
        size: "5.1 MB",
      },
      {
        title: "Future Skills Framework",
        description: "A framework for identifying and developing skills needed for the future workforce.",
        type: "PDF",
        size: "3.7 MB",
      },
    ],
    faqs: [
      {
        question: "Is there a virtual attendance option?",
        answer:
          "No, this summit is designed as an in-person experience to maximize networking and hands-on workshop participation. However, keynote presentations will be recorded and made available to registered attendees after the event.",
      },
      {
        question: "Will I receive a certificate of attendance?",
        answer:
          "Yes, all attendees will receive a digital certificate of attendance that can be used for professional development credits where applicable.",
      },
      {
        question: "What is the cancellation policy?",
        answer:
          "Cancellations made 30 days or more before the event will receive a full refund minus a $50 processing fee. Cancellations made 15-29 days before the event will receive a 50% refund. No refunds will be issued for cancellations made less than 15 days before the event, but you may transfer your registration to another person.",
      },
      {
        question: "Are meals included in the registration fee?",
        answer:
          "Yes, the registration fee includes breakfast, lunch, and the networking reception with appetizers and drinks.",
      },
      {
        question: "Is there a hotel room block for attendees?",
        answer:
          "Yes, we have negotiated special rates at several nearby hotels. Details will be provided in your registration confirmation email.",
      },
    ],
    reviews: [
      {
        name: "Jennifer L.",
        role: "High School Principal",
        rating: 5,
        comment:
          "Last year's summit was transformative for our school's approach to technology integration. I'm excited to attend again and bring more of my team.",
        date: "March 15, 2025",
      },
      {
        name: "David M.",
        role: "EdTech Researcher",
        rating: 4,
        comment:
          "The quality of speakers and networking opportunities make this event a must-attend for anyone serious about education innovation.",
        date: "February 28, 2025",
      },
      {
        name: "Sophia K.",
        role: "Curriculum Director",
        rating: 5,
        comment:
          "I implemented several ideas from last year's workshops that have significantly improved student engagement in our district.",
        date: "February 10, 2025",
      },
    ],
  }

  return (
    <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
        <TabsTrigger value="speakers">Speakers</TabsTrigger>
        <TabsTrigger value="resources">Resources</TabsTrigger>
        <TabsTrigger value="faqs">FAQs</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6">
        <Card>
          <CardContent className="p-6">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: eventData.overview }} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="schedule" className="mt-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-6 text-xl font-bold">Event Schedule</h3>
            <div className="space-y-6">
              {eventData.schedule.map((item, index) => (
                <div key={index} className="relative border-l pl-6">
                  <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-primary" />
                  <div className="mb-1 text-sm font-medium text-muted-foreground">{item.time}</div>
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  {item.description && <p className="mt-1 text-muted-foreground">{item.description}</p>}
                  {item.speaker && (
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Speaker:</span> {item.speaker}
                    </div>
                  )}
                  {item.speakers && (
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Speakers:</span> {item.speakers.join(", ")}
                    </div>
                  )}
                  {item.sessions && (
                    <div className="mt-2 space-y-1">
                      <span className="text-sm font-medium">Sessions:</span>
                      <ul className="ml-4 list-disc text-sm text-muted-foreground">
                        {item.sessions.map((session, idx) => (
                          <li key={idx}>{session}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="speakers" className="mt-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-6 text-xl font-bold">Featured Speakers</h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {eventData.speakers.map((speaker, index) => (
                <div key={index} className="flex gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full">
                    <Image src={speaker.image || "/placeholder.svg"} alt={speaker.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{speaker.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {speaker.role}, {speaker.organization}
                    </p>
                    <p className="mt-2 text-sm">{speaker.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="resources" className="mt-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-6 text-xl font-bold">Event Resources</h3>
            <div className="space-y-4">
              {eventData.resources.map((resource, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <div>
                    <h4 className="font-medium">{resource.title}</h4>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {resource.type} · {resource.size}
                    </span>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="faqs" className="mt-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-6 text-xl font-bold">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="w-full">
              {eventData.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-6 text-xl font-bold">Attendee Reviews</h3>
            <div className="space-y-6">
              {eventData.reviews.map((review, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{review.name}</h4>
                      <p className="text-sm text-muted-foreground">{review.role}</p>
                    </div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 15.585l-7.07 3.707 1.35-7.857L.587 7.01l7.87-1.142L10 0l2.543 5.868 7.87 1.142-5.693 5.425 1.35 7.857z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm">{review.comment}</p>
                  <p className="mt-2 text-xs text-muted-foreground">Posted on {review.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

