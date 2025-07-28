import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  id?: string;
}

export default function Hero({ id = "home" }: HeroProps) {
  return (
    <section
      id={id}
      className="bg-[#F9F9FB] py-12 sm:py-16 lg:py-24 overflow-hidden  flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[#223059] leading-tight text-center lg:text-right">
                دهم – حيث تتحول الفكرة إلى تأثير حقيقي
              </h1>
              <h2 className="text-lg sm:text-xl lg:text-2xl text-[#8E95BF] font-medium text-center lg:text-right">
                حلول تسويقية متكاملة تحقق نتائج قابلة للقياس
              </h2>
              <p className="text-base sm:text-lg text-[#8E95BF] leading-relaxed text-center lg:text-right max-w-lg mx-auto lg:mx-0">
                نحن نجمع بين الإبداع والتحليل لتقديم حملات تسويقية تحقق أهدافك
                التجارية بكفاءة عالية
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <a href="#contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#FF966A] hover:bg-[#F2AD85] text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-lg sm:rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  ابدأ مشروعك
                  <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </a>
              <a href="#services" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-[#FF966A] text-[#FF966A] hover:bg-[#FF966A] hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-lg sm:rounded-md transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl"
                >
                  <Play className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  تصفح أعمالنا
                </Button>
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <Image
                src="/hero-img.jpeg?height=600&width=800"
                alt="فريق دهم للتسويق الرقمي"
                width={800}
                height={600}
                className="w-full h-auto object-cover aspect-[4/3] sm:aspect-auto"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#44428C]/30 to-[#FF966A]/10"></div>

              {/* Mobile-specific overlay content */}
              <div className="absolute bottom-4 left-4 right-4 sm:hidden">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <p className="text-[#223059] text-sm font-medium text-center">
                    شركاء النجاح في رحلتك الرقمية
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced floating elements with mobile responsiveness */}
            <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 bg-[#FF966A] rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-20 h-20 sm:w-32 sm:h-32 bg-[#44428C] rounded-full opacity-10 animate-pulse delay-1000"></div>

            {/* Additional mobile floating elements */}
            <div className="absolute top-1/4 -left-3 w-8 h-8 sm:w-12 sm:h-12 bg-[#8E95BF] rounded-full opacity-15 animate-bounce delay-500"></div>
            <div className="absolute bottom-1/4 -right-2 w-6 h-6 sm:w-10 sm:h-10 bg-[#FF966A] rounded-full opacity-25 animate-ping delay-700"></div>
          </div>
        </div>

        {/* Mobile scroll indicator */}
        <div className="flex justify-center mt-8 sm:mt-12 lg:hidden">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-[#8E95BF] rounded-full flex justify-center">
              <div className="w-1 h-3 bg-[#8E95BF] rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
