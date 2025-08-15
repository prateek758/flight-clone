"use client"

import { forwardRef } from "react"
import { MapPin, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { AirportSuggestion } from "@/lib/types"

interface AirportInputProps {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  onSelect: (airport: AirportSuggestion) => void
  suggestions: AirportSuggestion[]
  loading: boolean
  showSuggestions: boolean
  onHideSuggestions: () => void
}

export const AirportInput = forwardRef<HTMLDivElement, AirportInputProps>(
  (
    { label, placeholder, value, onChange, onSelect, suggestions, loading, showSuggestions, onHideSuggestions },
    ref,
  ) => (
    <div className="space-y-2" ref={ref}>
      <Label className="text-sm font-medium">{label}</Label>
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 h-12"
          autoComplete="off"
        />
        {loading && <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-gray-400" />}

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
            {suggestions.map((airport) => (
              <button
                key={`${airport.skyId}-${airport.entityId}`}
                type="button"
                onClick={() => onSelect(airport)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 last:border-b-0"
              >
                <div className="font-medium">{airport.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {airport.city}, {airport.country} ({airport.iata})
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  ),
)

AirportInput.displayName = "AirportInput"
