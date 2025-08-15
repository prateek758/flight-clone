"use client"

import { useState, useRef, useCallback } from "react"
import { getAirportSuggestions } from "@/lib/api"
import type { AirportSuggestion } from "@/lib/types"

export function useAirportSearch() {
  const [suggestions, setSuggestions] = useState<AirportSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const searchAirports = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    setLoading(true)
    try {
      const results = await getAirportSuggestions(query)
      setSuggestions(results)
      setShowSuggestions(true)
    } catch (error) {
      console.error("Airport search error:", error)
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleInputChange = useCallback(
    (value: string) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => searchAirports(value), 300)
    },
    [searchAirports],
  )

  const selectAirport = useCallback((airport: AirportSuggestion) => {
    setShowSuggestions(false)
    setSuggestions([])
    return `${airport.name} (${airport.iata})`
  }, [])

  const hideSuggestions = useCallback(() => {
    setShowSuggestions(false)
  }, [])

  return {
    suggestions,
    loading,
    showSuggestions,
    handleInputChange,
    selectAirport,
    hideSuggestions,
  }
}
