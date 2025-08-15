"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { SearchForm } from "@/components/search-form"
import { FlightsList } from "@/components/flights-list"
import { searchFlights } from "@/lib/api"
import type { Flight, FlightSearchParams } from "@/lib/types"

export default function FlightsPage() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (searchParams: FlightSearchParams) => {
    setLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      const results = await searchFlights(searchParams)
      setFlights(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while searching for flights")
      setFlights([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 relative overflow-hidden">
      <Navbar />

      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Search Form */}
        <div className="mb-8">
          <SearchForm onSearch={handleSearch} loading={loading} />
        </div>

        {/* Results Section */}
        <div className="mt-8">
          {!hasSearched ? (
            <div className="text-center py-16">
              <div className="w-64 h-64 mx-auto mb-6 bg-gray-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
                <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Search for flights</h2>
            </div>
          ) : (
            <FlightsList flights={flights} loading={loading} error={error} />
          )}
        </div>
      </main>
    </div>
  )
}
