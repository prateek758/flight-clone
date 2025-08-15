"use client"

import { FlightCard } from "@/components/flight-card"
import { Card, CardContent } from "@/components/ui/card"
import { Plane, Search } from "lucide-react"

interface Flight {
  id: string
  airline: string
  logo: string
  departure: { time: string; airport: string }
  arrival: { time: string; airport: string }
  duration: string
  stops: string
  price: number
}

interface FlightsListProps {
  flights: Flight[]
  loading: boolean
}

export function FlightsList({ flights, loading }: FlightsListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Searching flights...</h2>
        </div>
        {/* Loading skeleton */}
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-neutral-700 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 dark:bg-neutral-700 rounded w-16"></div>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-200 dark:bg-neutral-700 rounded w-12"></div>
                    <div className="h-3 bg-gray-200 dark:bg-neutral-700 rounded w-8"></div>
                  </div>
                  <div className="w-20 h-px bg-gray-200 dark:bg-neutral-700"></div>
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-200 dark:bg-neutral-700 rounded w-12"></div>
                    <div className="h-3 bg-gray-200 dark:bg-neutral-700 rounded w-8"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 dark:bg-neutral-700 rounded w-16"></div>
                  <div className="h-8 bg-gray-200 dark:bg-neutral-700 rounded w-20"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (flights.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-4">
          <Search className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No flights found</h3>
        <p className="text-gray-500 dark:text-neutral-400 max-w-sm mx-auto">
          Try adjusting your search criteria or filters to find more flight options.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {flights.length} flight{flights.length !== 1 ? "s" : ""} found
        </h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-neutral-400">
          <Plane className="h-4 w-4" />
          <span>Sorted by best value</span>
        </div>
      </div>

      {/* Flight Cards */}
      <div className="space-y-3">
        {flights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>

      {/* Load More Button (placeholder for pagination) */}
      {flights.length >= 3 && (
        <div className="text-center pt-6">
          <button className="text-blue-600 hover:text-blue-700 font-medium">Load more flights</button>
        </div>
      )}
    </div>
  )
}
