// API response structure
export interface WhyDahmResponse {
  reasons: string[];
  timestamp?: string; // Optional timestamp for cache control
  version?: string; // Optional version tracking
}
