"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Mail, MapPin, Facebook, Instagram, Youtube, Twitter } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="flex items-center gap-6 mb-2 sm:mb-0">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>hello@zunzo.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>710 1st St. Easton, PA 18042 | Chester County</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Facebook className="w-4 h-4 hover:scale-110 transition-transform cursor-pointer" />
            <Instagram className="w-4 h-4 hover:scale-110 transition-transform cursor-pointer" />
            <Youtube className="w-4 h-4 hover:scale-110 transition-transform cursor-pointer" />
            <Twitter className="w-4 h-4 hover:scale-110 transition-transform cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-accent text-accent-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-primary-foreground rounded transform rotate-45"></div>
              </div>
              <span className="text-2xl font-bold text-accent-foreground">Zunzo</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-accent-foreground hover:text-primary transition-colors font-medium">
                HOME PAGE
              </a>
              <a href="#" className="text-accent-foreground hover:text-primary transition-colors font-medium">
                ABOUT US
              </a>
              <a href="#" className="text-accent-foreground hover:text-primary transition-colors font-medium">
                OUR EVENTS
              </a>
              <a href="#" className="text-accent-foreground hover:text-primary transition-colors font-medium">
                LATEST NEWS
              </a>
              <a href="#" className="text-accent-foreground hover:text-primary transition-colors font-medium">
                CONTACT US
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-accent-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
              <div className="flex flex-col gap-4">
                <a href="#" className="text-accent-foreground hover:text-primary transition-colors font-medium">
                  HOME PAGE
                </a>
                <a href="#" className="text-accent-foreground hover:text-primary transition-colors font-medium">
                  ABOUT US
                </a>
                <a href="#" className="text-accent-foreground hover:text-primary transition-colors font-medium">
                  OUR EVENTS
                </a>
                <a href="#" className="text-accent-foreground hover:text-primary transition-colors font-medium">
                  LATEST NEWS
                </a>
                <a href="#" className="text-accent-foreground hover:text-primary transition-colors font-medium">
                  CONTACT US
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  )
}
