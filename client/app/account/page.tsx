import UserDashboard from "@/components/dashboard/user-dashboard"

export default function AccountPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">My Account</h1>

      <UserDashboard />
    </div>
  )
}

