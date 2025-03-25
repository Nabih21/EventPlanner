"use client"

import { useState } from "react"
import Image from "next/image"
import { CreditCard, Calendar, Lock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PaymentData {
  method: string
  cardNumber: string
  cardName: string
  expiryDate: string
  cvv: string
  billingAddress: string
  agreeToTerms: boolean
}

interface TicketData {
  type: string
  quantity: number
  discountCode: string
}

interface PaymentConfirmationProps {
  eventId: string
  data: PaymentData
  ticketData: TicketData
  updateData: (data: Partial<PaymentData>) => void
}

export default function PaymentConfirmation({ eventId, data, ticketData, updateData }: PaymentConfirmationProps) {
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof PaymentData, string>>>({})

  // In a real application, you would fetch event and ticket data from an API
  const event = {
    id: eventId,
    title: "Future of Education Summit",
    date: "May 15, 2025",
    location: "San Francisco Convention Center, CA",
  }

  const ticketTypes = [
    {
      id: "standard",
      name: "Standard Ticket",
      price: 299,
    },
    {
      id: "early-bird",
      name: "Early Bird Ticket",
      price: 249,
    },
    {
      id: "vip",
      name: "VIP Ticket",
      price: 499,
    },
    {
      id: "student",
      name: "Student Ticket",
      price: 149,
    },
  ]

  const selectedTicket = ticketTypes.find((ticket) => ticket.id === ticketData.type) || ticketTypes[0]
  const discountApplied = ticketData.discountCode.toUpperCase() === "EDUCATION25"

  const calculateTotal = () => {
    const subtotal = selectedTicket.price * ticketData.quantity
    const discount = discountApplied ? subtotal * 0.25 : 0 // 25% discount
    return subtotal - discount
  }

  const validateForm = () => {
    const errors: Partial<Record<keyof PaymentData, string>> = {}

    if (data.method === "credit-card") {
      if (!data.cardNumber.trim()) {
        errors.cardNumber = "Card number is required"
      }

      if (!data.cardName.trim()) {
        errors.cardName = "Name on card is required"
      }

      if (!data.expiryDate.trim()) {
        errors.expiryDate = "Expiry date is required"
      }

      if (!data.cvv.trim()) {
        errors.cvv = "CVV is required"
      }
    }

    if (!data.billingAddress.trim()) {
      errors.billingAddress = "Billing address is required"
    }

    if (!data.agreeToTerms) {
      errors.agreeToTerms = "You must agree to the terms and conditions"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (field: keyof PaymentData, value: any) => {
    updateData({ [field]: value })
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Payment & Confirmation</h2>

      <div className="grid gap-8 md:grid-cols-[1fr_350px]">
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={data.method}
                onValueChange={(value) => handleChange("method", value)}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card" className="flex flex-1 cursor-pointer items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Credit or Debit Card</span>
                  </Label>
                  <div className="flex gap-1">
                    <Image src="/placeholder.svg?height=24&width=36" alt="Visa" width={36} height={24} />
                    <Image src="/placeholder.svg?height=24&width=36" alt="Mastercard" width={36} height={24} />
                    <Image src="/placeholder.svg?height=24&width=36" alt="Amex" width={36} height={24} />
                  </div>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex flex-1 cursor-pointer items-center gap-2">
                    <Image src="/placeholder.svg?height=20&width=20" alt="PayPal" width={20} height={20} />
                    <span>PayPal</span>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {data.method === "credit-card" && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Card Details</CardTitle>
                <CardDescription>Enter your card information securely</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">
                    Card Number <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={data.cardNumber}
                      onChange={(e) => handleChange("cardNumber", e.target.value)}
                      className={`pl-10 ${formErrors.cardNumber ? "border-destructive" : ""}`}
                    />
                    <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                  {formErrors.cardNumber && <p className="text-xs text-destructive">{formErrors.cardNumber}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardName">
                    Name on Card <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="cardName"
                    placeholder="John Smith"
                    value={data.cardName}
                    onChange={(e) => handleChange("cardName", e.target.value)}
                    className={formErrors.cardName ? "border-destructive" : ""}
                  />
                  {formErrors.cardName && <p className="text-xs text-destructive">{formErrors.cardName}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">
                      Expiry Date <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={data.expiryDate}
                        onChange={(e) => handleChange("expiryDate", e.target.value)}
                        className={`pl-10 ${formErrors.expiryDate ? "border-destructive" : ""}`}
                      />
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                    {formErrors.expiryDate && <p className="text-xs text-destructive">{formErrors.expiryDate}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv">
                      CVV <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={data.cvv}
                        onChange={(e) => handleChange("cvv", e.target.value)}
                        className={`pl-10 ${formErrors.cvv ? "border-destructive" : ""}`}
                      />
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                    {formErrors.cvv && <p className="text-xs text-destructive">{formErrors.cvv}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="billingAddress">
                  Billing Address <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="billingAddress"
                  placeholder="Enter your full billing address"
                  value={data.billingAddress}
                  onChange={(e) => handleChange("billingAddress", e.target.value)}
                  className={`min-h-[100px] ${formErrors.billingAddress ? "border-destructive" : ""}`}
                />
                {formErrors.billingAddress && <p className="text-xs text-destructive">{formErrors.billingAddress}</p>}
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={data.agreeToTerms}
                  onCheckedChange={(checked) => handleChange("agreeToTerms", checked)}
                />
                <Label
                  htmlFor="agreeToTerms"
                  className={`text-sm ${formErrors.agreeToTerms ? "text-destructive" : ""}`}
                >
                  I agree to the terms and conditions and privacy policy
                </Label>
              </div>
              {formErrors.agreeToTerms && <p className="text-xs text-destructive">{formErrors.agreeToTerms}</p>}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <h3 className="mb-2 font-medium">{event.title}</h3>
                <p className="text-sm text-muted-foreground">{event.date}</p>
                <p className="text-sm text-muted-foreground">{event.location}</p>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>{selectedTicket.name}</span>
                  <span>x{ticketData.quantity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${selectedTicket.price * ticketData.quantity}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-sm">
                    <span>Discount (25%)</span>
                    <span className="text-green-600">
                      -${(selectedTicket.price * ticketData.quantity * 0.25).toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between border-t pt-2 font-medium">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <div className="rounded-lg bg-muted/50 p-3 text-center text-xs text-muted-foreground">
                <Lock className="mx-auto mb-1 h-4 w-4" />
                <p>Your payment information is encrypted and secure.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

