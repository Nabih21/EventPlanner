"use client"

import { useState } from "react"
import { Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TicketData {
  type: string
  quantity: number
  discountCode: string
}

interface TicketSelectionProps {
  eventId: string
  data: TicketData
  updateData: (data: Partial<TicketData>) => void
}

export default function TicketSelection({ eventId, data, updateData }: TicketSelectionProps) {
  const [discountApplied, setDiscountApplied] = useState(false)
  const [discountError, setDiscountError] = useState("")

  // In a real application, you would fetch ticket types from an API
  const ticketTypes = [
    {
      id: "standard",
      name: "Standard Ticket",
      price: 299,
      description: "Full access to all sessions, workshops, and networking events. Includes lunch and refreshments.",
    },
    {
      id: "early-bird",
      name: "Early Bird Ticket",
      price: 249,
      description:
        "Limited availability. Full access to all sessions, workshops, and networking events. Includes lunch and refreshments.",
    },
    {
      id: "vip",
      name: "VIP Ticket",
      price: 499,
      description:
        "Premium access with reserved seating, exclusive networking reception, and additional resources. Includes all meals and refreshments.",
    },
    {
      id: "student",
      name: "Student Ticket",
      price: 149,
      description:
        "Valid student ID required at check-in. Full access to all sessions, workshops, and networking events. Includes lunch and refreshments.",
    },
  ]

  const selectedTicket = ticketTypes.find((ticket) => ticket.id === data.type) || ticketTypes[0]

  const handleApplyDiscount = () => {
    if (!data.discountCode.trim()) {
      setDiscountError("Please enter a discount code")
      return
    }

    // In a real application, you would validate the discount code with an API
    if (data.discountCode.toUpperCase() === "EDUCATION25") {
      setDiscountApplied(true)
      setDiscountError("")
    } else {
      setDiscountError("Invalid discount code")
      setDiscountApplied(false)
    }
  }

  const calculateTotal = () => {
    const subtotal = selectedTicket.price * data.quantity
    const discount = discountApplied ? subtotal * 0.25 : 0 // 25% discount
    return subtotal - discount
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Select Your Tickets</h2>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {ticketTypes.map((ticket) => (
            <Card
              key={ticket.id}
              className={`cursor-pointer transition-all hover:border-primary ${
                data.type === ticket.id ? "border-2 border-primary" : ""
              }`}
              onClick={() => updateData({ type: ticket.id })}
            >
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div>
                  <CardTitle>{ticket.name}</CardTitle>
                  <CardDescription>${ticket.price}</CardDescription>
                </div>
                {data.type === ticket.id && (
                  <div className="rounded-full bg-primary p-1 text-primary-foreground">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{ticket.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Select
                  value={String(data.quantity)}
                  onValueChange={(value) => updateData({ quantity: Number.parseInt(value) })}
                >
                  <SelectTrigger id="quantity">
                    <SelectValue placeholder="Select quantity" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={String(num)}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="discountCode">Discount Code</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Info className="h-4 w-4" />
                          <span className="sr-only">Discount code information</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">
                          Enter a valid discount code to receive a reduction on your ticket price. Try "EDUCATION25" for
                          a 25% discount.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex gap-2">
                  <Input
                    id="discountCode"
                    value={data.discountCode}
                    onChange={(e) => updateData({ discountCode: e.target.value })}
                    className={discountError ? "border-destructive" : ""}
                  />
                  <Button variant="outline" onClick={handleApplyDiscount} disabled={discountApplied}>
                    {discountApplied ? "Applied" : "Apply"}
                  </Button>
                </div>
                {discountError && <p className="text-xs text-destructive">{discountError}</p>}
                {discountApplied && <p className="text-xs text-green-600">25% discount applied!</p>}
              </div>

              <div className="space-y-1 pt-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${selectedTicket.price * data.quantity}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-sm">
                    <span>Discount (25%)</span>
                    <span className="text-green-600">-${(selectedTicket.price * data.quantity * 0.25).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t pt-2 font-medium">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

