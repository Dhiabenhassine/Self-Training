"use client"

import { useEffect, useState } from "react"

const stats = [
  { number: "500+", label: "Active Members" },
  { number: "50+", label: "Events Completed" },
  { number: "25+", label: "Training Programs" },
  { number: "10+", label: "Years Experience" },
]

export function StatsSection() {
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

    const section = document.getElementById("stats-section")
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="stats-section" className="py-20 bg-accent text-accent-foreground">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-lg text-accent-foreground/80 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
