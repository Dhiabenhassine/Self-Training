"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/athletic-woman-running-on-track-in-coral-pink-top-.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className={`transition-all duration-1000 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
              <div className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-6">
                SALE UP TO 50% OFF!
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 text-balance">
                EMPOWERING YOUR
                <br />
                <span className="text-primary">FITNESS JOURNEY</span>
              </h1>

              <p className="text-xl text-gray-200 mb-8 leading-relaxed text-pretty">
                The platform that turns aspirations into accomplishments. Join now and unleash your potential in the
                world of fitness and wellness.
              </p>

              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold animate-pulse-glow"
              >
                JOIN OUR CLUB
              </Button>
            </div>
          </div>

          {/* Right Content - Event Card */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
              <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold inline-block mb-4">
                NEW EVENT
              </div>

              <div className="mb-4">
                <img
                  src="/placeholder-qx1ij.png"
                  alt="Marathon Event 2023"
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-4">Marathon Event 2023</h3>

              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary rounded-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="font-medium">OCT 20, 2023</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="font-medium">START 06:00 AM - UNTIL FINISH</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary rounded-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="font-medium">710 1ST ST. EASTON, PA 18042 | CHESTER COUNTY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
