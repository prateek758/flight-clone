import type { FlightSearchParams, SimplifiedFlight, AirportSuggestion } from "./types"

const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY
const RAPIDAPI_HOST = process.env.NEXT_PUBLIC_RAPIDAPI_HOST || "sky-scrapper.p.rapidapi.com"

const apiConfig = {
  headers: {
    "X-RapidAPI-Key": RAPIDAPI_KEY || "",
    "X-RapidAPI-Host": RAPIDAPI_HOST,
    "Content-Type": "application/json",
  },
  baseUrl: `https://${RAPIDAPI_HOST}`,
}

const mockData = {
  airports: [
    {
      skyId: "JFK",
      entityId: "27537542",
      name: "John F. Kennedy International Airport",
      city: "New York",
      country: "United States",
      iata: "JFK",
    },
    {
      skyId: "LAX",
      entityId: "27537471",
      name: "Los Angeles International Airport",
      city: "Los Angeles",
      country: "United States",
      iata: "LAX",
    },
    {
      skyId: "ORD",
      entityId: "27537392",
      name: "O'Hare International Airport",
      city: "Chicago",
      country: "United States",
      iata: "ORD",
    },
    {
      skyId: "LHR",
      entityId: "27544008",
      name: "Heathrow Airport",
      city: "London",
      country: "United Kingdom",
      iata: "LHR",
    },
    {
      skyId: "CDG",
      entityId: "27539793",
      name: "Charles de Gaulle Airport",
      city: "Paris",
      country: "France",
      iata: "CDG",
    },
  ],
  flights: [
    {
      id: "1",
      airline: "Delta Airlines",
      logo: "/placeholder.svg?height=40&width=40&text=DL",
      departure: { time: "08:30", airport: "JFK", city: "New York" },
      arrival: { time: "11:45", airport: "LAX", city: "Los Angeles" },
      duration: "5h 15m",
      stops: "Non-stop",
      price: 299,
      priceFormatted: "$299",
    },
    {
      id: "2",
      airline: "American Airlines",
      logo: "/placeholder.svg?height=40&width=40&text=AA",
      departure: { time: "14:20", airport: "JFK", city: "New York" },
      arrival: { time: "18:10", airport: "LAX", city: "Los Angeles" },
      duration: "5h 50m",
      stops: "1 stop",
      price: 245,
      priceFormatted: "$245",
    },
  ],
}

async function apiRequest(endpoints: string[]): Promise<any> {
  if (!RAPIDAPI_KEY) throw new Error("API key not configured")

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${apiConfig.baseUrl}${endpoint}`, {
        method: "GET",
        headers: apiConfig.headers,
      })
      if (response.ok) return await response.json()
    } catch (error) {
      continue
    }
  }
  throw new Error("All endpoints failed")
}

const parseAirportResponse = (data: any): AirportSuggestion[] => {
  const extractAirport = (item: any): AirportSuggestion => ({
    skyId: item.skyId || item.PlaceId || item.iata || item.code,
    entityId: item.entityId || item.PlaceId || item.id || item.skyId,
    name: item.presentation?.title || item.PlaceName || item.name || item.airport_name,
    city: item.presentation?.subtitle || item.CityName || item.city || item.city_name || "",
    country: item.CountryName || item.country || item.country_name || "",
    iata: item.navigation?.relevantFlightParams?.skyId || item.PlaceId || item.iata || item.code || item.skyId,
  })

  if (data.status && data.data && Array.isArray(data.data)) return data.data.slice(0, 5).map(extractAirport)
  if (data.Places && Array.isArray(data.Places)) return data.Places.slice(0, 5).map(extractAirport)
  if (data.data?.ports && Array.isArray(data.data.ports)) return data.data.ports.slice(0, 5).map(extractAirport)
  if (Array.isArray(data)) return data.slice(0, 5).map(extractAirport)
  return []
}

const parseFlightResponse = (data: any): SimplifiedFlight[] => {
  const formatTime = (dateString: string) =>
    new Date(dateString).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })
  const formatDuration = (minutes: number) => `${Math.floor(minutes / 60)}h ${minutes % 60}m`

  const extractFlight = (item: any, index: number): SimplifiedFlight => {
    if (item.legs) {
      const leg = item.legs[0]
      const carrier = leg.carriers?.marketing?.[0] || leg.carriers?.operating?.[0] || {}
      return {
        id: item.id || index.toString(),
        airline: carrier.name || "Unknown",
        logo: carrier.logoUrl || `/placeholder.svg?height=40&width=40&text=${(carrier.name || "UK").substring(0, 2)}`,
        departure: { time: formatTime(leg.departure), airport: leg.origin.displayCode, city: leg.origin.city },
        arrival: { time: formatTime(leg.arrival), airport: leg.destination.displayCode, city: leg.destination.city },
        duration: formatDuration(leg.durationInMinutes),
        stops: leg.stopCount === 0 ? "Non-stop" : `${leg.stopCount} stop${leg.stopCount > 1 ? "s" : ""}`,
        price: item.price?.raw || 0,
        priceFormatted: item.price?.formatted || `$${item.price?.raw || 0}`,
      }
    }

    return {
      id: item.id || index.toString(),
      airline: item.airline || item.carrier || "Unknown",
      logo: item.logo || `/placeholder.svg?height=40&width=40&text=${(item.airline || "UK").substring(0, 2)}`,
      departure: {
        time: item.departure?.time || item.departureTime || "00:00",
        airport: item.departure?.airport || item.origin || "",
        city: item.departure?.city || item.originCity || "",
      },
      arrival: {
        time: item.arrival?.time || item.arrivalTime || "00:00",
        airport: item.arrival?.airport || item.destination || "",
        city: item.arrival?.city || item.destinationCity || "",
      },
      duration: item.duration || "0h 0m",
      stops: item.stops || "Non-stop",
      price: item.price || 0,
      priceFormatted: item.priceFormatted || `$${item.price || 0}`,
    }
  }

  if (data.status && data.data?.itineraries) return data.data.itineraries.map(extractFlight)
  if (Array.isArray(data)) return data.map(extractFlight)
  return []
}

export async function getAirportSuggestions(query: string): Promise<AirportSuggestion[]> {
  if (!RAPIDAPI_KEY) {
    return mockData.airports.filter(
      (airport) =>
        airport.name.toLowerCase().includes(query.toLowerCase()) ||
        airport.city.toLowerCase().includes(query.toLowerCase()) ||
        airport.iata.toLowerCase().includes(query.toLowerCase()),
    )
  }

  try {
    const endpoints = [
      `/api/v1/flights/getPorts?query=${encodeURIComponent(query)}`,
      `/api/v1/flights/searchAirport?query=${encodeURIComponent(query)}`,
      `/places?query=${encodeURIComponent(query)}`,
      `/autosuggest/v1.0/${encodeURIComponent(query)}/US/USD/en-US`,
    ]

    const data = await apiRequest(endpoints)
    return parseAirportResponse(data)
  } catch (error) {
    console.error("Airport search error:", error)
    return mockData.airports.filter(
      (airport) =>
        airport.name.toLowerCase().includes(query.toLowerCase()) ||
        airport.city.toLowerCase().includes(query.toLowerCase()) ||
        airport.iata.toLowerCase().includes(query.toLowerCase()),
    )
  }
}

export async function searchFlights(params: FlightSearchParams): Promise<SimplifiedFlight[]> {
  if (!RAPIDAPI_KEY) return mockData.flights

  try {
    const searchParams = new URLSearchParams({
      originSkyId: params.originSkyId,
      destinationSkyId: params.destinationSkyId,
      originEntityId: params.originEntityId,
      destinationEntityId: params.destinationEntityId,
      date: params.departureDate,
      cabinClass: params.cabinClass,
      adults: params.adults.toString(),
      currency: params.currency,
      market: params.market,
      countryCode: "US",
    })

    if (params.returnDate) searchParams.append("returnDate", params.returnDate)

    const endpoints = [
      `/api/v1/flights/searchFlights?${searchParams}`,
      `/api/v2/flights/searchFlights?${searchParams}`,
      `/searchFlights?${searchParams}`,
    ]

    const data = await apiRequest(endpoints)
    return parseFlightResponse(data)
  } catch (error) {
    console.error("Flight search error:", error)
    return mockData.flights
  }
}

export const validateApiKey = (): boolean => !!RAPIDAPI_KEY && RAPIDAPI_KEY !== "your_rapidapi_key_here"
