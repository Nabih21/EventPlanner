import RegistrationFlow from "@/components/registration/registration-flow"

export default function RegisterPage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">Register for Event</h1>

      <RegistrationFlow eventId={params.id} />
    </div>
  )
}

