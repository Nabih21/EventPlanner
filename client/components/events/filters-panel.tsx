"use client"

import { useState } from "react"
import { Calendar, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { useMobile } from "@/hooks/use-mobile"

export default function FiltersPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobile()

  const toggleFilters = () => {
    setIsOpen(!isOpen)
  }

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 font-semibold">Event Type</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="type-online" />
            <Label htmlFor="type-online">Online</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="type-physical" />
            <Label htmlFor="type-physical">Physical</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="type-hybrid" />
            <Label htmlFor="type-hybrid">Hybrid</Label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">Date Range</h3>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Start Date</span>
          </div>
          <Input type="date" className="h-9" />

          <div className="flex items-center gap-2 pt-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">End Date</span>
          </div>
          <Input type="date" className="h-9" />
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">Category</h3>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="k12">K-12 Education</SelectItem>
            <SelectItem value="higher-ed">Higher Education</SelectItem>
            <SelectItem value="professional">Professional Development</SelectItem>
            <SelectItem value="technology">Educational Technology</SelectItem>
            <SelectItem value="leadership">Leadership</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">Price Range</h3>
        <div className="space-y-4">
          <Slider defaultValue={[0, 500]} min={0} max={1000} step={10} />
          <div className="flex items-center justify-between">
            <span className="text-sm">$0</span>
            <span className="text-sm">$1000+</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">Location</h3>
        <Input placeholder="Enter city or region" />
      </div>

      <div>
        <h3 className="mb-4 font-semibold">Tags</h3>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="tags">
            <AccordionTrigger className="py-2 text-sm">Select Tags</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-1">
                <div className="flex items-center space-x-2">
                  <Checkbox id="tag-stem" />
                  <Label htmlFor="tag-stem">STEM</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="tag-arts" />
                  <Label htmlFor="tag-arts">Arts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="tag-language" />
                  <Label htmlFor="tag-language">Language</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="tag-technology" />
                  <Label htmlFor="tag-technology">Technology</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="tag-leadership" />
                  <Label htmlFor="tag-leadership">Leadership</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="flex gap-2 pt-4">
        <Button className="flex-1">Apply Filters</Button>
        <Button variant="outline" className="flex-1">
          Clear All
        </Button>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <div className="mb-6">
        <Button onClick={toggleFilters} variant="outline" className="mb-4 w-full justify-between">
          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </div>
          {isOpen ? <X className="h-4 w-4" /> : <span className="text-xs text-muted-foreground">Click to expand</span>}
        </Button>
        {isOpen && (
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <FilterContent />
          </div>
        )}
      </div>
    )
  }

  return (
    <aside className="h-fit rounded-lg border bg-card p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">Filters</h2>
      <FilterContent />
    </aside>
  )
}

