"use client"

import type React from "react"

import { useState } from "react"
import { Search, HelpCircle, Book, MessageSquare, FileText, Settings, Users, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("")
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false)

  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would submit the form data to an API
    setContactFormSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setContactFormSubmitted(false)
    }, 3000)
  }

  return (
    <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
      <div className="space-y-8">
        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle>How can we help you?</CardTitle>
            <CardDescription>Search our knowledge base or browse categories below</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for help articles..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Help Categories */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="transition-all hover:shadow-md">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
                <Calendar className="h-6 w-6" />
              </div>
              <CardTitle className="mb-2 text-lg">Events</CardTitle>
              <CardDescription>Registration, attendance, and event management</CardDescription>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-md">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
                <Users className="h-6 w-6" />
              </div>
              <CardTitle className="mb-2 text-lg">Account</CardTitle>
              <CardDescription>Profile settings, login issues, and account management</CardDescription>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-md">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
                <FileText className="h-6 w-6" />
              </div>
              <CardTitle className="mb-2 text-lg">Resources</CardTitle>
              <CardDescription>Accessing, downloading, and sharing resources</CardDescription>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-md">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
                <Settings className="h-6 w-6" />
              </div>
              <CardTitle className="mb-2 text-lg">Technical</CardTitle>
              <CardDescription>Platform features, troubleshooting, and system requirements</CardDescription>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-md">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
                <MessageSquare className="h-6 w-6" />
              </div>
              <CardTitle className="mb-2 text-lg">Communication</CardTitle>
              <CardDescription>Messaging, notifications, and email preferences</CardDescription>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-md">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
                <Book className="h-6 w-6" />
              </div>
              <CardTitle className="mb-2 text-lg">Policies</CardTitle>
              <CardDescription>Terms of service, privacy, and refund policies</CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Accordion */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="events">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
              </TabsList>

              <TabsContent value="events" className="mt-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I register for an event?</AccordionTrigger>
                    <AccordionContent>
                      To register for an event, navigate to the Events page, select the event you're interested in, and
                      click the "Register" button. Follow the steps to complete your registration, including selecting
                      ticket types and completing payment if required.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>Can I cancel my registration?</AccordionTrigger>
                    <AccordionContent>
                      Yes, you can cancel your registration by going to your account dashboard, finding the event under
                      "My Events," and clicking "Cancel Registration." Please note that refund policies vary by event
                      and are set by the event organizer.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do I access online events?</AccordionTrigger>
                    <AccordionContent>
                      For online events, you'll receive access instructions via email before the event. You can also
                      find the access link in your account dashboard under "My Events." Make sure to test your system
                      requirements before the event starts.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>Can I transfer my registration to someone else?</AccordionTrigger>
                    <AccordionContent>
                      Some events allow registration transfers. To check if this is possible for your event, go to your
                      account dashboard, find the event, and look for the "Transfer Registration" option. If it's not
                      available, contact the event organizer directly.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              <TabsContent value="account" className="mt-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                    <AccordionContent>
                      To reset your password, click on the "Forgot Password" link on the login page. Enter your email
                      address, and you'll receive instructions to create a new password. For security reasons, password
                      reset links expire after 24 hours.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I update my profile information?</AccordionTrigger>
                    <AccordionContent>
                      You can update your profile by going to your account dashboard and clicking on "Edit Profile" or
                      "Settings." From there, you can modify your personal information, contact details, and
                      notification preferences.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>Can I have multiple accounts?</AccordionTrigger>
                    <AccordionContent>
                      We recommend having only one account per user. Multiple accounts for the same person may cause
                      confusion with event registrations and resource access. If you need to manage events for an
                      organization, consider using the organization features instead.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              <TabsContent value="technical" className="mt-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What browsers are supported?</AccordionTrigger>
                    <AccordionContent>
                      Our platform supports the latest versions of Chrome, Firefox, Safari, and Edge. For the best
                      experience, we recommend keeping your browser updated. Internet Explorer is not supported.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I troubleshoot video playback issues?</AccordionTrigger>
                    <AccordionContent>
                      If you're experiencing video playback issues, try the following: check your internet connection,
                      clear your browser cache, disable browser extensions, and ensure your device meets the minimum
                      system requirements. If problems persist, try using a different browser.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>Is the platform accessible on mobile devices?</AccordionTrigger>
                    <AccordionContent>
                      Yes, our platform is fully responsive and works on smartphones and tablets. For the best mobile
                      experience, we recommend using our mobile app, available for download on iOS and Android devices.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <HelpCircle className="mr-2 h-4 w-4" />
              View All FAQs
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Contact Support Panel */}
      <div>
        <Card className="sticky top-20">
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>Can't find what you're looking for? Send us a message.</CardDescription>
          </CardHeader>
          <CardContent>
            {contactFormSubmitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Message Sent!</h3>
                <p className="text-muted-foreground">
                  Thank you for contacting us. We'll respond to your inquiry as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactFormSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Select>
                    <SelectTrigger id="topic">
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="events">Events</SelectItem>
                      <SelectItem value="account">Account</SelectItem>
                      <SelectItem value="resources">Resources</SelectItem>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Please describe your issue or question in detail..."
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex-col items-start space-y-2 border-t bg-muted/50 px-6 py-4">
            <div className="text-sm font-medium">Alternative Contact Methods</div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>support@smarteducation.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="text-xs text-muted-foreground">Support hours: Monday-Friday, 9:00 AM - 5:00 PM EST</div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

import { CheckCircle, Mail, Phone } from "lucide-react"

