"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AttendeeData {
  firstName: string
  lastName: string
  email: string
  phone: string
  organization: string
  role: string
  specialRequirements: string
}

interface AttendeeInformationProps {
  data: AttendeeData
  updateData: (data: Partial<AttendeeData>) => void
}

export default function AttendeeInformation({ data, updateData }: AttendeeInformationProps) {
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof AttendeeData, string>>>({})

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validateForm = () => {
    const errors: Partial<Record<keyof AttendeeData, string>> = {}

    if (!data.firstName.trim()) {
      errors.firstName = "First name is required"
    }

    if (!data.lastName.trim()) {
      errors.lastName = "Last name is required"
    }

    if (!data.email.trim()) {
      errors.email = "Email is required"
    } else if (!validateEmail(data.email)) {
      errors.email = "Please enter a valid email address"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  useEffect(() => {
    validateForm()
  }, [data])

  const handleChange = (field: keyof AttendeeData, value: string) => {
    updateData({ [field]: value })
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Attendee Information</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className={formErrors.firstName ? "border-destructive" : ""}
          />
          {formErrors.firstName && <p className="text-xs text-destructive">{formErrors.firstName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            className={formErrors.lastName ? "border-destructive" : ""}
          />
          {formErrors.lastName && <p className="text-xs text-destructive">{formErrors.lastName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={formErrors.email ? "border-destructive" : ""}
          />
          {formErrors.email && <p className="text-xs text-destructive">{formErrors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" value={data.phone} onChange={(e) => handleChange("phone", e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization">Organization</Label>
          <Input
            id="organization"
            value={data.organization}
            onChange={(e) => handleChange("organization", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Select value={data.role} onValueChange={(value) => handleChange("role", value)}>
            <SelectTrigger id="role">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="teacher">Teacher</SelectItem>
              <SelectItem value="administrator">Administrator</SelectItem>
              <SelectItem value="researcher">Researcher</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="industry">Industry Professional</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="specialRequirements">Special Requirements or Accommodations</Label>
          <Textarea
            id="specialRequirements"
            value={data.specialRequirements}
            onChange={(e) => handleChange("specialRequirements", e.target.value)}
            placeholder="Please let us know if you have any dietary restrictions, accessibility needs, or other requirements."
            className="min-h-[100px]"
          />
        </div>
      </div>
    </div>
  )
}

