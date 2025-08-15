"use client"

import { Clock, Plane } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface FlightCardProps {
  flight: {
    id: string
    airline: string
    logo: string
    departure: { time: string; airport: string }
    arrival: { time: string; airport: string }
    duration: string
    stops: string
    price: number
  }
}

export function FlightCard({ flight }: FlightCardProps) {
  return (
    <Card className="hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-neutral-700">
      <CardContent className="p-4 md:p-6">
        <div className="space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:gap-4">
          {/* Airline Info */}
          <div className="flex items-center space-x-3 min-w-0">
            <img
              src={flight.logo || "/placeholder.svg"}
              alt={`${flight.airline} logo`}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="font-medium text-gray-900 dark:text-white truncate">{flight.airline}</p>
              <p className="text-sm text-gray-500 dark:text-neutral-400">{flight.stops}</p>
            </div>
          </div>

          {/* Flight Times - Mobile Stack, Desktop Row */}
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{flight.departure.time}</p>
              <p className="text-sm text-gray-500 dark:text-neutral-400">{flight.departure.airport}</p>
            </div>

            <div className="flex-1 flex items-center justify-center min-w-0">
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="flex-1 h-px bg-gray-300 min-w-[40px]"></div>
                <Plane className="h-4 w-4 transform rotate-90" />
                <div className="flex-1 h-px bg-gray-300 min-w-[40px]"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{flight.arrival.time}</p>
              <p className="text-sm text-gray-500 dark:text-neutral-400">{flight.arrival.airport}</p>
            </div>
          </div>

          {/* Duration and Price - Mobile Full Width, Desktop Right */}
          <div className="flex items-center justify-between md:justify-end md:flex-col md:items-end space-x-4 md:space-x-0 md:space-y-2">
            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-neutral-400">
              <Clock className="h-4 w-4" />
              <span>{flight.duration}</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">${flight.price}</p>
                <p className="text-xs md:text-sm text-gray-500 dark:text-neutral-400">per person</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 h-10 md:h-auto">Select</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
