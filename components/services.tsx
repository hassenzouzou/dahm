// components/Services.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Palette, Smartphone, PenTool, Target } from "lucide-react";
import { ServicesResponse } from "@/types/services";

interface ServicesProps {
  id?: string;
}

// Icon mapping for the API data
const iconMap = {
  Camera: Camera,
  Palette: Palette,
  Smartphone: Smartphone,
  PenTool: PenTool,
  Target: Target,
};

// Server-side data fetching function with cache prevention
async function getServices(): Promise<ServicesResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    const response = await fetch(`${baseUrl}/api/services?t=${timestamp}`, {
      // Prevent all types of caching
      cache: "no-store",
      next: { revalidate: 0 },
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch services: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data fetched successfully:", new Date().toISOString());

    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw new Error("Failed to load services");
  }
}

export default async function Services({ id = "services" }: ServicesProps) {
  let data: ServicesResponse;
  let error: string | null = null;

  // Enhanced error handling
  try {
    data = await getServices();
  } catch (err) {
    error = err instanceof Error ? err.message : "حدث خطأ غير متوقع";
    // Fallback data
    data = { services: [] };
  }

  // Display error to user
  if (error && data.services.length === 0) {
    return (
      <section id={id} className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <p className="text-base sm:text-lg font-semibold">
                خطأ في تحميل البيانات
              </p>
              <p className="text-xs sm:text-sm">{error}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#44428C] text-white px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base hover:bg-[#3a3675] transition-colors"
            >
              إعادة المحاولة
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#223059] mb-4 sm:mb-6 leading-tight">
            خدماتنا المتكاملة
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#8E95BF] max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            نقدم مجموعة شاملة من الخدمات التسويقية المتكاملة لتحقيق أهدافك
            التجارية
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {data.services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];

            return (
              <Card
                key={index}
                className="border-0 shadow-md hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 bg-white rounded-lg sm:rounded-xl overflow-hidden transform hover:-translate-y-1"
              >
                {/* Card header with gradient background */}
                <CardHeader className="bg-gradient-to-br from-[#44428C] to-[#8E95BF] text-white p-4 sm:p-5 lg:p-6">
                  <div className="flex items-center space-x-2 sm:space-x-3 space-x-reverse mb-3 sm:mb-4">
                    <div className="text-[#FF966A] flex-shrink-0">
                      {IconComponent && (
                        <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-base sm:text-lg font-bold leading-tight">
                    {service.title}
                  </CardTitle>
                </CardHeader>

                {/* Card content with service items */}
                <CardContent className="p-4 sm:p-5 lg:p-6">
                  <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                    {service.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="space-y-1 sm:space-y-2">
                        <h4 className="font-semibold text-[#223059] text-sm sm:text-base leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-[#8E95BF] text-xs sm:text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
