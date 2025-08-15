"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import type { Flight } from "@/lib/types"

interface FilterState {
  maxPrice: number
  stops: number[]
  airlines: string[]
  sortBy: "price" | "duration" | "departure"
}

interface FlightFiltersProps {
  flights: Flight[]
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

export function FlightFilters({ flights, filters, onFiltersChange }: FlightFiltersProps) {
  const maxPrice = Math.max(...flights.map((f) => f.price), 1000)
  const uniqueAirlines = Array.from(new Set(flights.map((f) => f.airline))).sort()
  const uniqueStops = Array.from(new Set(flights.map((f) => f.stops))).sort((a, b) => a - b)

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({ ...filters, maxPrice: value[0] })
  }

  const handleStopsChange = (stops: number, checked: boolean) => {
    const newStops = checked ? [...filters.stops, stops] : filters.stops.filter((s) => s !== stops)
    onFiltersChange({ ...filters, stops: newStops })
  }

  const handleAirlineChange = (airline: string, checked: boolean) => {
    const newAirlines = checked ? [...filters.airlines, airline] : filters.airlines.filter((a) => a !== airline)
    onFiltersChange({ ...filters, airlines: newAirlines })
  }

  const handleSortChange = (sortBy: "price" | "duration" | "departure") => {
    onFiltersChange({ ...filters, sortBy })
  }

  const clearFilters = () => {
    onFiltersChange({
      maxPrice: maxPrice,
      stops: [],
      airlines: [],
      sortBy: "price",
    })
  }

  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Sort By */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Sort by</Label>
          <Select value={filters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price (Low to High)</SelectItem>
              <SelectItem value="duration">Duration (Shortest)</SelectItem>
              <SelectItem value="departure">Departure Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Max Price: ${filters.maxPrice}</Label>
          <Slider
            value={[filters.maxPrice]}
            onValueChange={handlePriceChange}
            max={maxPrice}
            min={0}
            step={50}
            className="w-full"
          />
        </div>

        {/* Stops */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Stops</Label>
          <div className="space-y-2">
            {uniqueStops.map((stops) => (
              <div key={stops} className="flex items-center space-x-2">
                <Checkbox
                  id={`stops-${stops}`}
                  checked={filters.stops.includes(stops)}
                  onCheckedChange={(checked) => handleStopsChange(stops, checked as boolean)}
                />
                <Label htmlFor={`stops-${stops}`} className="text-sm">
                  {stops === 0 ? "Non-stop" : `${stops} stop${stops > 1 ? "s" : ""}`}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Airlines */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Airlines</Label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {uniqueAirlines.map((airline) => (
              <div key={airline} className="flex items-center space-x-2">
                <Checkbox
                  id={`airline-${airline}`}
                  checked={filters.airlines.includes(airline)}
                  onCheckedChange={(checked) => handleAirlineChange(airline, checked as boolean)}
                />
                <Label htmlFor={`airline-${airline}`} className="text-sm">
                  {airline}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button variant="outline" onClick={clearFilters} className="w-full sm:w-auto bg-transparent">
          Clear All Filters
        </Button>
      </div>
    </Card>
  )
}
