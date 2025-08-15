"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"

interface FiltersProps {
  filters: {
    priceRange: number[]
    stops: string[]
    airlines: string[]
  }
  onFilterChange: (filters: any) => void
  airlines: string[]
}

export function Filters({ filters, onFilterChange, airlines }: FiltersProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handlePriceChange = (value: number[]) => {
    onFilterChange({ ...filters, priceRange: value })
  }

  const handleStopsChange = (stop: string, checked: boolean) => {
    const newStops = checked ? [...filters.stops, stop] : filters.stops.filter((s) => s !== stop)
    onFilterChange({ ...filters, stops: newStops })
  }

  const handleAirlineChange = (airline: string, checked: boolean) => {
    const newAirlines = checked ? [...filters.airlines, airline] : filters.airlines.filter((a) => a !== airline)
    onFilterChange({ ...filters, airlines: newAirlines })
  }

  const clearAllFilters = () => {
    onFilterChange({
      priceRange: [0, 1000],
      stops: [],
      airlines: [],
    })
  }

  const stopOptions = ["Non-stop", "1 stop", "2+ stops"]

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900 dark:text-white">Price Range</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </span>
        </div>
        <Slider
          value={filters.priceRange}
          onValueChange={handlePriceChange}
          max={1000}
          min={0}
          step={25}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>$0</span>
          <span>$1000+</span>
        </div>
      </div>

      {/* Stops Filter */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900 dark:text-white">Stops</h3>
        <div className="space-y-3">
          {stopOptions.map((stop) => (
            <div key={stop} className="flex items-center space-x-2">
              <Checkbox
                id={`stop-${stop}`}
                checked={filters.stops.includes(stop)}
                onCheckedChange={(checked) => handleStopsChange(stop, checked as boolean)}
              />
              <Label htmlFor={`stop-${stop}`} className="text-sm font-normal cursor-pointer">
                {stop}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Airlines Filter */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900 dark:text-white">Airlines</h3>
        <div className="space-y-3">
          {airlines.map((airline) => (
            <div key={airline} className="flex items-center space-x-2">
              <Checkbox
                id={`airline-${airline}`}
                checked={filters.airlines.includes(airline)}
                onCheckedChange={(checked) => handleAirlineChange(airline, checked as boolean)}
              />
              <Label htmlFor={`airline-${airline}`} className="text-sm font-normal cursor-pointer">
                {airline}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <Button variant="outline" onClick={clearAllFilters} className="w-full bg-transparent">
        Clear all filters
      </Button>
    </div>
  )

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full flex items-center justify-center space-x-2"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {isMobileOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile Collapsible Filters */}
      <div className="lg:hidden">
        <Collapsible open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <CollapsibleContent>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <FilterContent />
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <FilterContent />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
