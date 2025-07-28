// API response structure
export interface AboutResponse {
  numbers: string[];
  timestamp?: string; // Optional timestamp for cache control
  version?: string; // Optional version tracking
}
