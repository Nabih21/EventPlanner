"use client"

import { useState } from "react"
import { CheckCircle2, User, Ticket, CreditCard, ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import AttendeeInformation from "@/components/registration/attendee-information"
import TicketSelection from "@/components/registration/ticket-selection"
import PaymentConfirmation from "@/components/registration/payment-confirmation"
import ConfirmationScreen from "@/components/registration/confirmation-screen"

interface RegistrationFlowProps {
  eventId: string
}

export default function RegistrationFlow({ eventId }: RegistrationFlowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    attendee: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      organization: "",
      role: "",
      specialRequirements: "",
    },
    tickets: {
      type: "standard",
      quantity: 1,
      discountCode: "",
    },
    payment: {
      method: "credit-card",
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
      billingAddress: "",
      agreeToTerms: false,
    },
  })

  const updateFormData = (section: keyof typeof formData, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }))
  }

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    // In a real application, you would submit the form data to an API
    console.log("Form submitted:", formData)
    handleNext()
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {currentStep > 1 ? <CheckCircle2 className="h-5 w-5" /> : <User className="h-5 w-5" />}
            </div>
            <div className={`ml-2 ${currentStep >= 1 ? "text-foreground" : "text-muted-foreground"}`}>
              <div className="text-sm font-medium">Step 1</div>
              <div className="text-xs">Attendee Information</div>
            </div>
          </div>

          <div className={`flex-1 border-t ${currentStep >= 2 ? "border-primary" : "border-muted"}`} />

          <div className="flex items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {currentStep > 2 ? <CheckCircle2 className="h-5 w-5" /> : <Ticket className="h-5 w-5" />}
            </div>
            <div className={`ml-2 ${currentStep >= 2 ? "text-foreground" : "text-muted-foreground"}`}>
              <div className="text-sm font-medium">Step 2</div>
              <div className="text-xs">Ticket Selection</div>
            </div>
          </div>

          <div className={`flex-1 border-t ${currentStep >= 3 ? "border-primary" : "border-muted"}`} />

          <div className="flex items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                currentStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {currentStep > 3 ? <CheckCircle2 className="h-5 w-5" /> : <CreditCard className="h-5 w-5" />}
            </div>
            <div className={`ml-2 ${currentStep >= 3 ? "text-foreground" : "text-muted-foreground"}`}>
              <div className="text-sm font-medium">Step 3</div>
              <div className="text-xs">Payment & Confirmation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        {currentStep === 1 && (
          <AttendeeInformation data={formData.attendee} updateData={(data) => updateFormData("attendee", data)} />
        )}

        {currentStep === 2 && (
          <TicketSelection
            eventId={eventId}
            data={formData.tickets}
            updateData={(data) => updateFormData("tickets", data)}
          />
        )}

        {currentStep === 3 && (
          <PaymentConfirmation
            eventId={eventId}
            data={formData.payment}
            ticketData={formData.tickets}
            updateData={(data) => updateFormData("payment", data)}
          />
        )}

        {currentStep === 4 && <ConfirmationScreen eventId={eventId} formData={formData} />}
      </div>

      {/* Navigation Buttons */}
      {currentStep < 4 && (
        <div className="mt-6 flex justify-between">
          {currentStep > 1 ? (
            <Button variant="outline" onClick={handleBack}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          ) : (
            <div></div>
          )}

          {currentStep < 3 ? (
            <Button onClick={handleNext}>
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit}>
              Complete Registration
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

