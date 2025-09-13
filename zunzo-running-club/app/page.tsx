import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { EventsSection } from "@/components/events-section"
import { StatsSection } from "@/components/stats-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <StatsSection />
      <EventsSection />
    </main>
  )
}
