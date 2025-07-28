import { NextResponse } from "next/server";
import { WhyDahmResponse } from "@/types/whyDahm";

// Mock why dahm reasons data structure
const whyDahmData: WhyDahmResponse = {
  reasons: [
    "نتائج قابلة للقياس وتحقق أهدافك التجارية",
    "فريق من الخبراء والمبدعين",
    "حلول تسويقية متكاملة ومبتكرة",
    "دعم مستمر ومتابعة دورية",
  ],
};

// GET endpoint handler
export async function GET() {
  // Log API call for monitoring
  console.log("API Why Dahm called at:", new Date().toISOString());

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Return JSON response with cache prevention headers
  return NextResponse.json(
    {
      ...whyDahmData,
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
