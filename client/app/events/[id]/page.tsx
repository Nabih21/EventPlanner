import EventHeader from "@/components/event-details/event-header"
import ActionPanel from "@/components/event-details/action-panel"
import EventTabs from "@/components/event-details/event-tabs"
import SimilarEvents from "@/components/event-details/similar-events"
import SocialEngagement from "@/components/event-details/social-engagement"

export default function EventDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <EventHeader eventId={params.id} />

      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          <div>
            <EventTabs eventId={params.id} />
            <SocialEngagement eventId={params.id} />
          </div>
          <div>
            <ActionPanel eventId={params.id} />
          </div>
        </div>
      </div>

      <SimilarEvents eventId={params.id} />
    </div>
  )
}

