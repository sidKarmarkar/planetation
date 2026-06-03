export type CabinClass = "Economy" | "Premium Economy" | "Business" | "First";

export interface Flight {
  id: string;
  userId: string;
  origin: string;       // IATA code, e.g. "JFK"
  destination: string;  // IATA code, e.g. "LHR"
  airline: string;
  aircraftType: string;
  cabin: CabinClass;
  flightDate: string;   // ISO date string
  scores: FlightScores;
  notes?: string;
  createdAt: string;
}

export interface FlightScores {
  seat: number;   // 0–5
  food: number;
  crew: number;
  ife: number;    // in-flight entertainment
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  memberSince: string;
}

export interface Airport {
  iata: string;
  name: string;
  city: string;
  country: string;
}

export interface Airline {
  iata: string;
  name: string;
  logoUrl?: string;
}
