import EventsListing from "@/components/events/events-listing"
import FiltersPanel from "@/components/events/filters-panel"

export default function EventsPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">Educational Events</h1>

      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        <FiltersPanel />
        <EventsListing />
      </div>
    </div>
  )
}

