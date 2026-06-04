export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          display_name: string;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          username: string;
          display_name: string;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          display_name?: string;
          avatar_url?: string | null;
        };
      };
      flights: {
        Row: {
          id: string;
          user_id: string;
          origin: string;
          destination: string;
          airline: string;
          aircraft: string;
          cabin: "Economy" | "Premium Economy" | "Business" | "First";
          flight_date: string;
          score_seat: number | null;
          score_food: number | null;
          score_crew: number | null;
          score_ife: number | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          origin: string;
          destination: string;
          airline: string;
          aircraft: string;
          cabin: "Economy" | "Premium Economy" | "Business" | "First";
          flight_date: string;
          score_seat?: number | null;
          score_food?: number | null;
          score_crew?: number | null;
          score_ife?: number | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          origin?: string;
          destination?: string;
          airline?: string;
          aircraft?: string;
          cabin?: "Economy" | "Premium Economy" | "Business" | "First";
          flight_date?: string;
          score_seat?: number | null;
          score_food?: number | null;
          score_crew?: number | null;
          score_ife?: number | null;
          notes?: string | null;
        };
      };
    };
  };
}
