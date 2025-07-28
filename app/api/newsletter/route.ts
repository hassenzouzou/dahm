import { NextResponse } from "next/server";
import { NewsletterResponse, SubscriptionResponse } from "@/types/newsletter";

// Mock newsletter content data
const newsletterData: NewsletterResponse = {
  content: {
    title: "اشترك بالنشرة",
    description: "احصل على آخر النصائح التسويقية والعروض الحصرية",
    buttonText: "اشترك",
    placeholder: "بريدك الإلكتروني"
  }
};

// GET endpoint handler for newsletter content
export async function GET() {
  // Log API call for monitoring
  console.log('API Newsletter content called at:', new Date().toISOString());
  
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Return JSON response with cache prevention headers
  return NextResponse.json(
    {
      ...newsletterData,
      timestamp: new Date().toISOString(),
      version: "1.0"
    },
    {
      status: 200,
      headers: {
        // Prevent all types of caching
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Fresh-Data': 'true',
        'X-Timestamp': new Date().toISOString()
      }
    }
  );
}

// POST endpoint handler for newsletter subscription
export async function POST(request: Request) {
  try {
    // Log API call for monitoring
    console.log('API Newsletter subscription called at:', new Date().toISOString());
    
    const { email } = await request.json();
    
    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        {
          success: false,
          message: "يرجى إدخال بريد إلكتروني صحيح",
          timestamp: new Date().toISOString()
        } as SubscriptionResponse,
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock successful subscription
    const response: SubscriptionResponse = {
      success: true,
      message: "تم الاشتراك بنجاح! شكراً لانضمامك إلى نشرتنا الإخبارية",
      email: email,
      timestamp: new Date().toISOString()
    };

    console.log('Newsletter subscription successful for:', email);

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache'
      }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: "حدث خطأ أثناء الاشتراك. يرجى المحاولة مرة أخرى",
        timestamp: new Date().toISOString()
      } as SubscriptionResponse,
      { status: 500 }
    );
  }
}