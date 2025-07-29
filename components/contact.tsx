import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { WhyDahmResponse } from "@/types/whyDahm";
import { baseUrl } from "@/api/api";

interface ContactProps {
  id?: string;
}

// Server-side data fetching function with cache prevention
async function getWhyDahmReasons(): Promise<WhyDahmResponse> {

  try {

    const response = await fetch(`${baseUrl}/api/why-dahm`, {
      // Prevent all types of caching
      cache: "no-store",
      next: { revalidate: 0 },
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch why dahm reasons: ${response.status}`);
    }

    const data = await response.json();
    console.log(
      "Why Dahm reasons fetched successfully:",
      new Date().toISOString()
    );

    return data;
  } catch (error) {
    console.error("Error fetching why dahm reasons:", error);
    throw new Error("Failed to load why dahm reasons");
  }
}

export default async function Contact({ id = "contact" }: ContactProps) {
  const services = [
    "التصوير والإنتاج الفني",
    "بناء الهوية التجارية والمؤسسية",
    "إدارة منصات التواصل الاجتماعي",
    "صناعة المحتوى الترويجي",
    "الحملات الإعلانية والاستشارات التسويقية",
  ];

  let whyDahmData: WhyDahmResponse;
  let error: string | null = null;

  // Enhanced error handling
  try {
    whyDahmData = await getWhyDahmReasons();
  } catch (err) {
    error = err instanceof Error ? err.message : "An unexpected error occurred";
    // Fallback data
    whyDahmData = { reasons: [] };
  }

  return (
    <section id={id} className="py-20 bg-[#F9F9FB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#223059] mb-6">
            تواصل معنا
          </h2>
          <p className="text-xl text-[#8E95BF] max-w-3xl mx-auto">
            ابدأ رحلتك التسويقية معنا اليوم
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-0 shadow-xl bg-white rounded-2xl">
            <CardHeader className="p-8 pb-6">
              <CardTitle className="text-2xl font-bold text-[#223059]">
                أرسل لنا رسالة
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <form className="space-y-6">
                <div>
                  <Input
                    placeholder="الاسم الكامل"
                    className="w-full p-4 border border-gray-200 rounded-lg text-right focus:border-[#44428C] focus:ring-2 focus:ring-[#44428C]/20"
                    required
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    className="w-full p-4 border border-gray-200 rounded-lg text-right focus:border-[#44428C] focus:ring-2 focus:ring-[#44428C]/20"
                    required
                  />
                </div>

                <div>
                  <Input
                    type="tel"
                    placeholder="رقم الهاتف"
                    className="w-full p-4 border border-gray-200 rounded-lg text-right focus:border-[#44428C] focus:ring-2 focus:ring-[#44428C]/20"
                    required
                  />
                </div>

                <div>
                  <Select dir="rtl">
                    <SelectTrigger className="w-full p-4 border-2 border-gray-200 rounded-xl text-right bg-white hover:border-[#44428C] focus:border-[#44428C] focus:ring-4 focus:ring-[#44428C]/10 transition-all duration-300 shadow-sm hover:shadow-md group">
                      <SelectValue
                        placeholder="نوع الخدمة المطلوبة"
                        className="text-gray-500 group-hover:text-[#223059] transition-colors"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <svg
                          className="w-5 h-5 text-gray-400 group-hover:text-[#44428C] transition-colors duration-300 group-data-[state=open]:rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 border-gray-100 rounded-xl shadow-xl min-w-[var(--radix-select-trigger-width)] overflow-hidden">
                      <div className="p-2">
                        {services.map((service) => (
                          <SelectItem
                            key={service}
                            value={service}
                            className="text-right px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-[#44428C]/5 hover:to-[#8E95BF]/5 focus:bg-gradient-to-r focus:from-[#44428C]/10 focus:to-[#8E95BF]/10 cursor-pointer transition-all duration-200 text-[#223059] hover:text-[#44428C] focus:text-[#44428C] border-none outline-none"
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="font-medium">{service}</span>
                              <div className="w-2 h-2 bg-[#FF966A] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                            </div>
                          </SelectItem>
                        ))}
                      </div>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Textarea
                    placeholder="تفاصيل المشروع"
                    rows={5}
                    className="w-full p-4 border border-gray-200 rounded-lg text-right resize-none focus:border-[#44428C] focus:ring-2 focus:ring-[#44428C]/20"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#FF966A] hover:bg-[#F2AD85] text-white py-4 text-lg font-semibold rounded-lg transition-colors duration-200"
                >
                  إرسال الرسالة
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details Card */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-[#44428C] to-[#8E95BF] text-white rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">معلومات التواصل</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="bg-[#FF966A] p-3 rounded-lg ml-2">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-semibold">واتساب</div>
                      <div className="opacity-90">الطريقة الأساسية للتواصل</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="bg-[#FF966A] p-3 rounded-lg ml-2">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-semibold">البريد الإلكتروني</div>
                      <div className="opacity-90">contact@dahm.com</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="bg-[#FF966A] p-3 rounded-lg ml-2">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-semibold">الموقع</div>
                      <div className="opacity-90">سلطنة عُمان</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Why Choose Dahm Card with dynamic content */}
            <Card className="border-0 shadow-xl bg-white rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-[#223059] mb-4">
                  لماذا تختار دهم؟
                </h3>
                {error ? (
                  <div className="text-center text-red-500">
                    <p>Error loading reasons</p>
                  </div>
                ) : (
                  <ul className="space-y-3 text-[#8E95BF]">
                    {whyDahmData.reasons.map((reason, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-3 space-x-reverse"
                      >
                        <div className="w-2 h-2 bg-[#FF966A] rounded-full mt-2 flex-shrink-0 ml-2"></div>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
