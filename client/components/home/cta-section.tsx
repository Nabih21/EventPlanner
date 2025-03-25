import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CtaSection() {
  return (
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Transform Your Educational Events?
          </h2>
          <p className="mb-8 text-lg text-primary-foreground/90">
            Join thousands of educators and event organizers who are creating impactful learning experiences with our
            platform.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/signup">Sign Up Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

