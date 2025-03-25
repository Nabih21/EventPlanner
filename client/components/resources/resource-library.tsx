"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Grid,
  List,
  FileText,
  FileImage,
  Video,
  FileIcon as FilePresentation,
  Download,
  Eye,
  Share2,
  Plus,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ResourceType = "pdf" | "image" | "video" | "presentation" | "document"

interface Resource {
  id: string
  title: string
  description: string
  type: ResourceType
  fileSize: string
  uploadDate: string
  uploader: string
  downloadsCount: number
  category: string
  tags: string[]
  thumbnail: string
}

export default function ResourceLibrary() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [filtersVisible, setFiltersVisible] = useState(false)

  // In a real application, you would fetch this data from an API
  const resources: Resource[] = [
    {
      id: "1",
      title: "AI in Education: A Practical Guide",
      description: "A comprehensive guide to implementing AI tools in educational settings.",
      type: "pdf",
      fileSize: "5.1 MB",
      uploadDate: "April 10, 2025",
      uploader: "Dr. Maria Chen",
      downloadsCount: 245,
      category: "Educational Technology",
      tags: ["AI", "EdTech", "Implementation"],
      thumbnail: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "2",
      title: "Future Skills Framework",
      description: "A framework for identifying and developing skills needed for the future workforce.",
      type: "pdf",
      fileSize: "3.7 MB",
      uploadDate: "April 5, 2025",
      uploader: "Future Learning Institute",
      downloadsCount: 189,
      category: "Curriculum Development",
      tags: ["Skills", "Workforce", "Framework"],
      thumbnail: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "3",
      title: "Teaching Innovation Slides",
      description: "Presentation slides from the Teaching Innovation Forum with key insights and strategies.",
      type: "presentation",
      fileSize: "12.3 MB",
      uploadDate: "March 6, 2025",
      uploader: "Prof. Sarah Ahmed",
      downloadsCount: 156,
      category: "Teaching Methods",
      tags: ["Innovation", "Pedagogy", "Slides"],
      thumbnail: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "4",
      title: "AI Webinar Recording",
      description: "Full recording of the AI in Education Webinar featuring expert panelists.",
      type: "video",
      fileSize: "245 MB",
      uploadDate: "February 16, 2025",
      uploader: "EdTech Innovations",
      downloadsCount: 312,
      category: "Educational Technology",
      tags: ["AI", "Webinar", "Video"],
      thumbnail: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "5",
      title: "Inclusive Classroom Strategies",
      description: "Document outlining effective strategies for creating inclusive learning environments.",
      type: "document",
      fileSize: "2.8 MB",
      uploadDate: "January 20, 2025",
      uploader: "Education for All Network",
      downloadsCount: 278,
      category: "Inclusive Education",
      tags: ["Inclusion", "Accessibility", "Strategies"],
      thumbnail: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "6",
      title: "STEM Education Infographics",
      description: "Collection of infographics visualizing key concepts in STEM education.",
      type: "image",
      fileSize: "8.5 MB",
      uploadDate: "January 12, 2025",
      uploader: "STEM Forward Initiative",
      downloadsCount: 203,
      category: "STEM Education",
      tags: ["STEM", "Infographics", "Visual"],
      thumbnail: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "7",
      title: "Global Education Trends Report",
      description: "Comprehensive report on emerging trends in global education.",
      type: "pdf",
      fileSize: "7.2 MB",
      uploadDate: "December 5, 2024",
      uploader: "International Education Collaborative",
      downloadsCount: 421,
      category: "Education Research",
      tags: ["Global", "Trends", "Research"],
      thumbnail: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "8",
      title: "Digital Assessment Tools Overview",
      description: "Presentation comparing various digital assessment tools for educators.",
      type: "presentation",
      fileSize: "9.6 MB",
      uploadDate: "November 18, 2024",
      uploader: "Dr. James Wilson",
      downloadsCount: 187,
      category: "Assessment",
      tags: ["Digital", "Assessment", "Tools"],
      thumbnail: "/placeholder.svg?height=200&width=200",
    },
  ]

  const getResourceIcon = (type: ResourceType) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-6 w-6" />
      case "image":
        return <FileImage className="h-6 w-6" />
      case "video":
        return <Video className="h-6 w-6" />
      case "presentation":
        return <FilePresentation className="h-6 w-6" />
      case "document":
        return <FileText className="h-6 w-6" />
    }
  }

  const filteredResources = resources.filter((resource) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return (
      resource.title.toLowerCase().includes(query) ||
      resource.description.toLowerCase().includes(query) ||
      resource.category.toLowerCase().includes(query) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(query))
    )
  })

  return (
    <div className="grid gap-8 md:grid-cols-[300px_1fr]">
      {/* Filters Panel - Desktop */}
      <div className="hidden md:block">
        <div className="sticky top-20 rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Filters</h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search resources..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Resource Type</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="type-pdf" />
                  <Label htmlFor="type-pdf" className="text-sm">
                    PDF Documents
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="type-presentation" />
                  <Label htmlFor="type-presentation" className="text-sm">
                    Presentations
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="type-video" />
                  <Label htmlFor="type-video" className="text-sm">
                    Videos
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="type-image" />
                  <Label htmlFor="type-image" className="text-sm">
                    Images
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="type-document" />
                  <Label htmlFor="type-document" className="text-sm">
                    Other Documents
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="educational-technology">Educational Technology</SelectItem>
                  <SelectItem value="curriculum-development">Curriculum Development</SelectItem>
                  <SelectItem value="teaching-methods">Teaching Methods</SelectItem>
                  <SelectItem value="inclusive-education">Inclusive Education</SelectItem>
                  <SelectItem value="stem-education">STEM Education</SelectItem>
                  <SelectItem value="education-research">Education Research</SelectItem>
                  <SelectItem value="assessment">Assessment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sort">Sort By</Label>
              <Select defaultValue="recent">
                <SelectTrigger id="sort">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="az">Alphabetical (A-Z)</SelectItem>
                  <SelectItem value="za">Alphabetical (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Popular Tags</Label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  AI
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  EdTech
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  STEM
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  Inclusion
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  Assessment
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  Research
                </Badge>
              </div>
            </div>

            <Button className="w-full">Apply Filters</Button>
            <Button variant="outline" className="w-full">
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div>
        {/* Mobile Search and Filters */}
        <div className="mb-6 md:hidden">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button
            variant="outline"
            className="w-full justify-between"
            onClick={() => setFiltersVisible(!filtersVisible)}
          >
            <div className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </div>
            {filtersVisible ? (
              <X className="h-4 w-4" />
            ) : (
              <span className="text-xs text-muted-foreground">Click to expand</span>
            )}
          </Button>

          {filtersVisible && (
            <div className="mt-4 rounded-lg border bg-card p-4 shadow-sm">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Resource Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mobile-type-pdf" />
                      <Label htmlFor="mobile-type-pdf" className="text-sm">
                        PDF Documents
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mobile-type-presentation" />
                      <Label htmlFor="mobile-type-presentation" className="text-sm">
                        Presentations
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mobile-type-video" />
                      <Label htmlFor="mobile-type-video" className="text-sm">
                        Videos
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mobile-type-image" />
                      <Label htmlFor="mobile-type-image" className="text-sm">
                        Images
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile-category">Category</Label>
                  <Select>
                    <SelectTrigger id="mobile-category">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="educational-technology">Educational Technology</SelectItem>
                      <SelectItem value="curriculum-development">Curriculum Development</SelectItem>
                      <SelectItem value="teaching-methods">Teaching Methods</SelectItem>
                      <SelectItem value="inclusive-education">Inclusive Education</SelectItem>
                      <SelectItem value="stem-education">STEM Education</SelectItem>
                      <SelectItem value="education-research">Education Research</SelectItem>
                      <SelectItem value="assessment">Assessment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile-sort">Sort By</Label>
                  <Select defaultValue="recent">
                    <SelectTrigger id="mobile-sort">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="az">Alphabetical (A-Z)</SelectItem>
                      <SelectItem value="za">Alphabetical (Z-A)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">Apply</Button>
                  <Button variant="outline" className="flex-1">
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Resources</h2>
            <p className="text-muted-foreground">{filteredResources.length} resources available</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setViewMode("grid")}>
              <Grid className={`h-4 w-4 ${viewMode === "grid" ? "text-primary" : ""}`} />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => setViewMode("list")}>
              <List className={`h-4 w-4 ${viewMode === "list" ? "text-primary" : ""}`} />
              <span className="sr-only">List view</span>
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Upload Resource
            </Button>
          </div>
        </div>

        {/* Resources Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="overflow-hidden">
                <div className="relative aspect-video bg-muted">
                  <div className="flex h-full items-center justify-center">
                    <div className="rounded-full bg-primary/10 p-4 text-primary">{getResourceIcon(resource.type)}</div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="font-semibold">{resource.title}</h3>
                    <Badge variant="outline" className="capitalize">
                      {resource.type}
                    </Badge>
                  </div>
                  <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">{resource.description}</p>
                  <div className="mb-2 flex flex-wrap gap-1">
                    {resource.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{resource.fileSize}</span>
                    <span>{resource.uploadDate}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t bg-muted/50 p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 px-2 text-xs"
                    onClick={() => setSelectedResource(resource)}
                  >
                    <Eye className="h-3 w-3" />
                    <span>Preview</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-xs">
                    <Download className="h-3 w-3" />
                    <span>Download</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-xs">
                    <Share2 className="h-3 w-3" />
                    <span>Share</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="flex h-24 w-full items-center justify-center bg-muted sm:w-24">
                    <div className="rounded-full bg-primary/10 p-3 text-primary">{getResourceIcon(resource.type)}</div>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{resource.title}</h3>
                        <p className="line-clamp-1 text-sm text-muted-foreground">{resource.description}</p>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {resource.type}
                      </Badge>
                    </div>
                    <div className="mb-2 flex flex-wrap gap-1">
                      {resource.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex gap-4">
                        <span>{resource.fileSize}</span>
                        <span>{resource.uploadDate}</span>
                        <span>{resource.downloadsCount} downloads</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1 px-2"
                          onClick={() => setSelectedResource(resource)}
                        >
                          <Eye className="h-4 w-4" />
                          <span>Preview</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
                          <Share2 className="h-4 w-4" />
                          <span>Share</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Resource Preview Dialog */}
        {selectedResource && (
          <Dialog open={!!selectedResource} onOpenChange={() => setSelectedResource(null)}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{selectedResource.title}</DialogTitle>
                <DialogDescription>{selectedResource.description}</DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="preview">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="related">Related</TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="min-h-[400px]">
                  <div className="flex h-[400px] items-center justify-center rounded-lg border bg-muted">
                    <div className="text-center">
                      <div className="mx-auto mb-4 rounded-full bg-primary/10 p-4 text-primary">
                        {getResourceIcon(selectedResource.type)}
                      </div>
                      <p className="mb-4 text-muted-foreground">
                        Preview not available. Please download the file to view it.
                      </p>
                      <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details">
                  <div className="space-y-4 p-4">
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">File Type</h4>
                        <p>{selectedResource.type.toUpperCase()}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">File Size</h4>
                        <p>{selectedResource.fileSize}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Upload Date</h4>
                        <p>{selectedResource.uploadDate}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Uploader</h4>
                        <p>{selectedResource.uploader}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Category</h4>
                        <p>{selectedResource.category}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Downloads</h4>
                        <p>{selectedResource.downloadsCount}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Tags</h4>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {selectedResource.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="related">
                  <div className="grid gap-4 p-4 sm:grid-cols-2">
                    {resources
                      .filter(
                        (r) =>
                          r.id !== selectedResource.id &&
                          (r.category === selectedResource.category ||
                            r.tags.some((tag) => selectedResource.tags.includes(tag))),
                      )
                      .slice(0, 4)
                      .map((resource) => (
                        <div key={resource.id} className="flex items-center gap-3 rounded-lg border p-3">
                          <div className="rounded-md bg-primary/10 p-2 text-primary">
                            {getResourceIcon(resource.type)}
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <h4 className="truncate font-medium">{resource.title}</h4>
                            <p className="text-xs text-muted-foreground">{resource.category}</p>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-between">
                <Button variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <DialogClose asChild>
                  <Button>Close</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

