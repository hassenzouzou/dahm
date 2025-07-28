import { NextResponse } from "next/server";
import { AboutResponse } from "@/types/about";

// Mock about numbers data structure
const aboutData: AboutResponse = {
  numbers: ["50+", "95%", "24/7"],
};

// GET endpoint handler
export async function GET() {
  // Log API call for monitoring
  console.log("API About called at:", new Date().toISOString());

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Return JSON response with cache prevention headers
  return NextResponse.json(
    {
      ...aboutData,
      timestamp: new Date().toISOString(), // Add timestamp for tracking
      version: "1.0",
    },
    {
      status: 200,
      headers: {
        // Prevent all types of caching
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "X-Fresh-Data": "true",
        "X-Timestamp": new Date().toISOString(),
      },
    }
  );
}
