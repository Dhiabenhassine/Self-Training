"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

const events = [
  {
    id: 1,
    title: "5K Fun Run",
    date: "Nov 15, 2023",
    time: "07:00 AM",
    location: "Central Park",
    participants: "150+",
    image: "/placeholder-r1o7t.png",
    category: "Fun Run",
  },
  {
    id: 2,
    title: "Half Marathon Training",
    date: "Nov 22, 2023",
    time: "06:30 AM",
    location: "Riverside Trail",
    participants: "75+",
    image: "/placeholder-82gh8.png",
    category: "Training",
  },
  {
    id: 3,
    title: "Night Run Challenge",
    date: "Dec 01, 2023",
    time: "07:00 PM",
    location: "Downtown Circuit",
    participants: "200+",
    image: "/placeholder-jiiqd.png",
    category: "Challenge",
  },
]

export function EventsSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("events-section")
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="events-section" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Upcoming <span className="text-primary">Events</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Join our community events and challenge yourself with fellow runners. From fun runs to competitive races,
            there's something for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <Card
              key={event.id}
              className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      {event.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{event.participants} participants</span>
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Register Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
