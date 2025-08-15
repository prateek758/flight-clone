// Sky-Scrapper API Types
export interface Airport {
  skyId: string
  entityId: string
  presentation: {
    title: string
    subtitle?: string
  }
  navigation: {
    entityId: string
    entityType: string
    localizedName: string
    relevantFlightParams: {
      skyId: string
      entityId: string
      flightPlaceType: string
      localizedName: string
    }
  }
}

export interface AirportSearchResponse {
  status: boolean
  data: Airport[]
}

export interface FlightSegment {
  id: string
  origin: {
    id: string
    entityId: string
    name: string
    displayCode: string
    city: string
    country: string
  }
  destination: {
    id: string
    entityId: string
    name: string
    displayCode: string
    city: string
    country: string
  }
  departure: string
  arrival: string
  durationInMinutes: number
  flightNumber: string
  marketingCarrier: {
    id: number
    name: string
    alternateId: string
    allianceId: number
    displayCode: string
  }
  operatingCarrier: {
    id: number
    name: string
    alternateId: string
    allianceId: number
    displayCode: string
  }
}

export interface FlightItinerary {
  id: string
  price: {
    raw: number
    formatted: string
    pricingOptionId: string
  }
  legs: Array<{
    id: string
    origin: {
      id: string
      entityId: string
      name: string
      displayCode: string
      city: string
      country: string
    }
    destination: {
      id: string
      entityId: string
      name: string
      displayCode: string
      city: string
      country: string
    }
    durationInMinutes: number
    stopCount: number
    isSmallestStops: boolean
    departure: string
    arrival: string
    timeDeltaInDays: number
    carriers: {
      marketing: Array<{
        id: number
        logoUrl: string
        name: string
      }>
      operating: Array<{
        id: number
        logoUrl: string
        name: string
      }>
    }
    segments: FlightSegment[]
  }>
  isSelfTransfer: boolean
  isProtectedSelfTransfer: boolean
  farePolicy: {
    isChangeAllowed: boolean
    isPartiallyChangeable: boolean
    isCancellationAllowed: boolean
    isPartiallyRefundable: boolean
  }
  eco: {
    ecoContenderDelta: number
  }
  fareAttributes: Record<string, any>
  tags: string[]
  isMashUp: boolean
  hasFlexibleOptions: boolean
  score: number
}

export interface FlightSearchResponse {
  status: boolean
  data: {
    itineraries: FlightItinerary[]
    messages: any[]
    filterStats: {
      duration: {
        min: number
        max: number
        multiCityMin: number
        multiCityMax: number
      }
      airports: Array<{
        city: string
        airports: Array<{
          skyId: string
          entityId: string
          name: string
        }>
      }>
      carriers: Array<{
        id: number
        name: string
        count: number
      }>
      stopPrices: {
        direct: {
          isPresent: boolean
        }
        one: {
          isPresent: boolean
        }
        twoOrMore: {
          isPresent: boolean
        }
      }
    }
    flightsSessionId: string
    destinationImageUrl: string
  }
}

// UI Component Types - these are what the search form and components expect
export interface AirportSuggestion {
  skyId: string
  entityId: string
  name: string
  city: string
  country: string
  iata: string
}

export interface SimplifiedFlight {
  id: string
  airline: string
  logo: string
  departure: {
    time: string
    airport: string
    city: string
  }
  arrival: {
    time: string
    airport: string
    city: string
  }
  duration: string
  stops: string
  price: number
  priceFormatted: string
}

export interface FlightSearchParams {
  originSkyId: string
  originEntityId: string
  destinationSkyId: string
  destinationEntityId: string
  departureDate: string
  returnDate?: string
  cabinClass: string
  adults: number
  children?: number
  infants?: number
  currency: string
  market: string
  locale: string
}

// Legacy aliases for backward compatibility
export interface SearchFlightParams extends FlightSearchParams {}
export interface SimplifiedAirport {
  skyId: string
  entityId: string
  name: string
  city: string
  code: string
}

export type Flight = SimplifiedFlight
