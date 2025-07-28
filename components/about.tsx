import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AboutResponse } from "@/types/about";

interface AboutProps {
  id?: string;
}

// Server-side data fetching function with cache prevention
async function getAboutNumbers(): Promise<AboutResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    const response = await fetch(`${baseUrl}/api/about?t=${timestamp}`, {
      // Prevent all types of caching
      cache: "no-store",
      next: { revalidate: 0 },
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch about numbers: ${response.status}`);
    }

    const data = await response.json();
    console.log(
      "About numbers fetched successfully:",
      new Date().toISOString()
    );

    return data;
  } catch (error) {
    console.error("Error fetching about numbers:", error);
    throw new Error("Failed to load about numbers");
  }
}

export default async function About({ id = "about" }: AboutProps) {
  let data: AboutResponse;
  let error: string | null = null;

  // Static labels that won't change
  const labels = ["مشروع ناجح", "رضا العملاء", "دعم مستمر"];

  // Enhanced error handling
  try {
    data = await getAboutNumbers();
  } catch (err) {
    error = err instanceof Error ? err.message : "An unexpected error occurred";
    // Fallback data
    data = { numbers: ["50+", "95%", "24/7"] };
  }

  return (
    <section id={id} className="py-20 bg-[#F9F9FB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image section */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/whoweare.png?height=600&width=800"
                alt="مكتب دهم للتسويق الرقمي"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#44428C]/20 to-transparent"></div>
            </div>

            {/* Floating stats card */}
            <Card className="absolute -bottom-6 -right-6 bg-white shadow-xl border-0 p-4">
              <CardContent className="p-0 text-center">
                <div className="text-2xl font-bold text-[#44428C]">2024</div>
                <div className="text-sm text-[#8E95BF]">سنة التأسيس</div>
              </CardContent>
            </Card>
          </div>

          {/* Content section */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-[#223059]">
                من نحن
              </h2>
              <p className="text-lg text-[#8E95BF] leading-relaxed">
                دهم مؤسسة رائدة تأسست عام 2024 بهدف تحويل الأفكار إلى تأثير
                حقيقي من خلال الحلول التسويقية المتكاملة. نحن نؤمن بأن الإبداع
                عندما يلتقي بالنتائج القابلة للقياس، تولد حلول تسويقية استثنائية
                تحقق أهدافك التجارية.
              </p>
            </div>

            {/* Mission statement card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-[#44428C] to-[#8E95BF] text-white rounded-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">
                  دهم -- حيث تتحول الفكرة إلى تأثير حقيقي
                </h3>
                <p className="leading-relaxed opacity-90">
                  في 2024، أدركنا فجوة في السوق؛ الكثير من الإبداع، لكن قليل من
                  النتائج الفعلية. وهنا وُلدت دهم، برؤية مختلفة تدمج الفن،
                  الإبداع، والاستراتيجيات المدروسة لتحقيق أثر حقيقي. خلال فترة
                  تجريبية مكثفة، أثبتنا أن التسويق لا يقتصر على المحتوى البصري
                  فقط، بل على النتائج التي تصنع الفرق. واليوم، نُطلق دهم رسميًا
                  كشريك تسويقي متكامل، يضع النتائج أولًا.
                </p>
              </CardContent>
            </Card>

            {/* Dynamic numbers with static labels */}
            {error ? (
              <div className="text-center text-red-500">
                <p>Error loading numbers</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {data.numbers.map((number, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-[#FF966A] mb-2">
                      {number}
                    </div>
                    <div className="text-sm text-[#8E95BF]">
                      {labels[index]}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
