"use client"

import type React from "react"

import { useState } from "react"
import { Search, MapPin, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface MobileSearchBarProps {
  visible: boolean
  searchParams: {
    origin: string
    destination: string
    departureDate: string
    returnDate: string
    passengers: string
  }
  onSearch: (params: any) => void
  loading: boolean
}

export function MobileSearchBar({ visible, searchParams, onSearch, loading }: MobileSearchBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [localParams, setLocalParams] = useState(searchParams)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(localParams)
    setIsOpen(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setLocalParams((prev) => ({ ...prev, [field]: value }))
  }

  if (!visible) return null

  return (
    <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-white dark:bg-gray-950 border-b shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left h-12 bg-transparent  ">
              <div className="flex items-center space-x-2 text-gray-500">
                <Search className="h-4 w-4" />
                <span className="truncate">
                  {searchParams.origin && searchParams.destination
                    ? `${searchParams.origin} → ${searchParams.destination}`
                    : "Search flights"}
                </span>
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="h-full">
            <SheetHeader>
              <SheetTitle>Search Flights</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Origin and Destination */}
                <div className="space-y-4">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="From"
                      value={localParams.origin}
                      onChange={(e) => handleInputChange("origin", e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="To"
                      value={localParams.destination}
                      onChange={(e) => handleInputChange("destination", e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="date"
                      value={localParams.departureDate}
                      onChange={(e) => handleInputChange("departureDate", e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="date"
                      value={localParams.returnDate}
                      onChange={(e) => handleInputChange("returnDate", e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                {/* Passengers */}
                <Select
                  value={localParams.passengers}
                  onValueChange={(value) => handleInputChange("passengers", value)}
                >
                  <SelectTrigger className="h-12">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-2" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Passenger</SelectItem>
                    <SelectItem value="2">2 Passengers</SelectItem>
                    <SelectItem value="3">3 Passengers</SelectItem>
                    <SelectItem value="4">4 Passengers</SelectItem>
                    <SelectItem value="5">5+ Passengers</SelectItem>
                  </SelectContent>
                </Select>

                {/* Search Button */}
                <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700" disabled={loading}>
                  <Search className="h-4 w-4 mr-2" />
                  {loading ? "Searching..." : "Search Flights"}
                </Button>
              </form>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
