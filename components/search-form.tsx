"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { CalendarDays, Users, Search, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { AirportInput } from "./AirportInput"
import { useAirportSearch } from "@/hooks/useAirportSearch"
import type { AirportSuggestion, FlightSearchParams } from "@/lib/types"

interface SearchFormProps {
  onSearch: (params: FlightSearchParams) => void
  loading: boolean
}

export function SearchForm({ onSearch, loading }: SearchFormProps) {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    cabinClass: "economy",
    adults: 1,
  })

  const [selectedAirports, setSelectedAirports] = useState({
    origin: null as AirportSuggestion | null,
    destination: null as AirportSuggestion | null,
  })

  const [isRotating, setIsRotating] = useState(false)

  const originSearch = useAirportSearch()
  const destinationSearch = useAirportSearch()

  const originRef = useRef<HTMLDivElement>(null)
  const destinationRef = useRef<HTMLDivElement>(null)

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleOriginChange = (value: string) => {
    updateFormData("origin", value)
    setSelectedAirports((prev) => ({ ...prev, origin: null }))
    originSearch.handleInputChange(value)
  }

  const handleDestinationChange = (value: string) => {
    updateFormData("destination", value)
    setSelectedAirports((prev) => ({ ...prev, destination: null }))
    destinationSearch.handleInputChange(value)
  }

  const selectOrigin = (airport: AirportSuggestion) => {
    setSelectedAirports((prev) => ({ ...prev, origin: airport }))
    updateFormData("origin", originSearch.selectAirport(airport))
  }

  const selectDestination = (airport: AirportSuggestion) => {
    setSelectedAirports((prev) => ({ ...prev, destination: airport }))
    updateFormData("destination", destinationSearch.selectAirport(airport))
  }

  const swapAirports = () => {
    setIsRotating(true)
    setFormData((prev) => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin,
    }))
    setSelectedAirports((prev) => ({
      origin: prev.destination,
      destination: prev.origin,
    }))
    setTimeout(() => setIsRotating(false), 200)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedAirports.origin || !selectedAirports.destination || !formData.departureDate) {
      alert("Please fill in all required fields")
      return
    }

    onSearch({
      originSkyId: selectedAirports.origin.skyId,
      originEntityId: selectedAirports.origin.entityId,
      destinationSkyId: selectedAirports.destination.skyId,
      destinationEntityId: selectedAirports.destination.entityId,
      departureDate: formData.departureDate,
      returnDate: formData.returnDate || undefined,
      cabinClass: formData.cabinClass,
      adults: formData.adults,
      currency: "USD",
      market: "US",
      locale: "en-US",
    })
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (originRef.current && !originRef.current.contains(event.target as Node)) {
        originSearch.hideSuggestions()
      }
      if (destinationRef.current && !destinationRef.current.contains(event.target as Node)) {
        destinationSearch.hideSuggestions()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [originSearch, destinationSearch])

  return (
    <Card className="w-full shadow-lg relative pb-8">
      <span className="absolute top-0 left-0  bg-gradient-to-r from-transparent via-cyan-400 to-transparent h-px w-3/4"></span>
      <span className="absolute bottom-0 right-0 bg-gradient-to-l from-transparent via-cyan-400 to-transparent h-px w-3/4"></span>

      <CardContent className="p-4 md:p-6">
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div className="flex gap-4">
            <Select value={formData.cabinClass} onValueChange={(value) => updateFormData("cabinClass", value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="economy">Economy</SelectItem>
                <SelectItem value="premium_economy">Premium Economy</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="first">First Class</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14">
              <AirportInput
                ref={originRef}
                label="From"
                placeholder="Where From ?"
                value={formData.origin}
                onChange={handleOriginChange}
                onSelect={selectOrigin}
                suggestions={originSearch.suggestions}
                loading={originSearch.loading}
                showSuggestions={originSearch.showSuggestions}
                onHideSuggestions={originSearch.hideSuggestions}
              />
              <div className="absolute left-1/2 top-14 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={swapAirports}
                className={`rounded-full bg-white dark:bg-neutral-800 border-2 shadow-md hover:shadow-lg transition-all duration-200  ${
                  isRotating ? "rotate-180" : ""
                }`}
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>

              <AirportInput
                ref={destinationRef}
                label="To"
                placeholder="Where To ?"
                value={formData.destination}
                onChange={handleDestinationChange}
                onSelect={selectDestination}
                suggestions={destinationSearch.suggestions}
                loading={destinationSearch.loading}
                showSuggestions={destinationSearch.showSuggestions}
                onHideSuggestions={destinationSearch.hideSuggestions}
              />
            </div>

            
          </div>

          <div className="md:hidden flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={swapAirports}
              className={`transition-transform duration-200 ${isRotating ? "rotate-180" : ""}`}
            >
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Swap
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Departure *</Label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                <Input
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) => updateFormData("departureDate", e.target.value)}
                  className="pl-10 h-12"
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Return (Optional)</Label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                <Input
                  type="date"
                  value={formData.returnDate}
                  onChange={(e) => updateFormData("returnDate", e.target.value)}
                  className="pl-10 h-12"
                  min={formData.departureDate || new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Passengers</Label>
              <Select
                value={formData.adults.toString()}
                onValueChange={(value) => updateFormData("adults", Number.parseInt(value))}
              >
                <SelectTrigger className="h-12">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-neutral-400 mr-2" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} Adult{num > 1 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>

      <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 z-50">
        <div className="absolute inset-0 bg-white dark:bg-neutral-900 rounded-lg transform scale-10 -z-10"></div>
        <Button
          type="submit"
          onClick={handleSubmit}
          className="px-8 py-3 h-12 bg-gradient-to-b from-neutral-500 to-neutral-900 hover:bg-blue-900 shadow-xl opacity-100 relative border-2 border-neutral-700"
          disabled={loading || !selectedAirports.origin || !selectedAirports.destination || !formData.departureDate}
        >
          <Search className="h-4 w-4 mr-2" />
          {loading ? "Searching..." : "Search Flights"}
        </Button>
      </div>
    </Card>
  )
}
