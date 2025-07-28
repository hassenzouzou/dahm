import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Zap, Mail, MessageCircle } from "lucide-react";

interface PortfolioProps {
  id?: string;
}

export default function CaseStudies({ id = "portfolio" }: PortfolioProps) {
  const studies = [
    {
      title: "حملة عيادة 'سنك بخير'",
      description:
        "هي حملة توعوية لعيادة أسنان، تهدف إلى تعزيز الوعي بأهمية العناية بصحة الفم والأسنان، وتشجيع الفحص الدوري للحفاظ على ابتسامة صحية وثقة تدوم.",
      intro:
        "دهم تولّت إدارة الحملة، واستطعنا تحقيق نتائج قوية تعكس التأثير الحقيقي للتسويق الذكي!",
      metrics: [
        {
          value: "151K+",
          label: "شخص وصلت إليهم الحملة",
          icon: <Target className="h-6 w-6" />,
        },
        {
          value: "327K+",
          label: "مرة ظهور -- وصول أوسع وتأثير أكبر!",
          icon: <Eye className="h-6 w-6" />,
        },
        {
          value: "78.5K",
          label: "تفاعل حقيقي مع المحتوى",
          icon: <Zap className="h-6 w-6" />,
        },
        {
          value: "200",
          label: "شخص مهتم سجل بياناته مباشرة!",
          icon: <Mail className="h-6 w-6" />,
        },
        {
          value: "137",
          label: "محادثة بدأت -- عملاء محتملون جاهزون للخطوة التالية!",
          icon: <MessageCircle className="h-6 w-6" />,
        },
      ],
      duration: "7 أشهر",
      photography_section:
        "بعدساتنا، حولنا رؤيتهم إلى صورة تنبض بالحياة! من نتائج جلسة تصوير إبداعية للعيادة، حيث أظهرنا أدق التفاصيل وجمال الخدمات بأسلوب فني يعكس الاحترافية والاهتمام.",
    },
    {
      title: "شراكتنا مع تطبيق 'بي هوتيل'",
      description:
        "تعاونّا مع 'بي هوتيل'، التطبيق العقاري العُماني، لإطلاق حملة إعلانية تعزز انتشاره وتواصله مع الجمهور المستهدف. عملنا على تصميم محتوى إبداعي يعكس هويته بأسلوب احترافي، مما ساهم في إبراز ميزاته وجذب المزيد من المستخدمين.",
      metrics: [
        {
          value: "25.7K",
          label: "شخص وصلت إليهم الحملة",
          icon: <Target className="h-6 w-6" />,
        },
        {
          value: "39.3K",
          label: "مرة ظهور -- وصول أوسع وتأثير أكبر!",
          icon: <Eye className="h-6 w-6" />,
        },
        {
          value: "11.5K",
          label: "تفاعل حقيقي مع المحتوى",
          icon: <Zap className="h-6 w-6" />,
        },
        {
          value: "105",
          label: "مزود خدمة مهتم سجل بياناته مباشرة!",
          icon: <Mail className="h-6 w-6" />,
        },
      ],
      duration: "8 أيام فقط",
      visual_identity_section: "هوية متكاملة... تنبض برؤية بي هوتيل",
    },
  ];

  return (
    <section id={id} className="py-12 sm:py-16 lg:py-20 bg-[#F2AD85]/10">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#223059] mb-4 sm:mb-6 leading-tight">
            أرقام تتحدث عن نجاحنا
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#8E95BF] max-w-3xl mx-auto px-2">
            نتائج حقيقية وقابلة للقياس من مشاريعنا الناجحة
          </p>
        </div>

        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {studies.map((study, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg sm:shadow-2xl bg-white rounded-xl sm:rounded-2xl overflow-hidden mx-1 sm:mx-0"
            >
              <CardHeader className="bg-gradient-to-r from-[#44428C] to-[#8E95BF] text-white p-4 sm:p-6 lg:p-8">
                <CardTitle className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 sm:mb-4 leading-tight">
                  {study.title}
                </CardTitle>
                <p className="text-sm sm:text-base lg:text-lg opacity-90 leading-relaxed">
                  {study.description}
                </p>
                {study.intro && (
                  <p className="text-[#FF966A] font-semibold text-sm sm:text-base lg:text-lg mt-3 sm:mt-4 leading-relaxed">
                    {study.intro}
                  </p>
                )}
              </CardHeader>
              <CardContent className="p-4 sm:p-6 lg:p-8">
                {/* Metrics Grid - Responsive Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
                  {study.metrics.map((metric, metricIndex) => (
                    <div
                      key={metricIndex}
                      className="text-center p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-[#F9F9FB] to-white rounded-lg sm:rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="text-[#FF966A] mb-2 sm:mb-3 flex justify-center">
                        <div className="h-5 w-5 sm:h-6 sm:w-6">
                          {metric.icon}
                        </div>
                      </div>
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#44428C] mb-1 sm:mb-2">
                        {metric.value}
                      </div>
                      <div className="text-xs sm:text-sm text-[#8E95BF] leading-tight px-1">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Section - Mobile Optimized */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-lg sm:text-xl font-bold text-[#223059]">
                      مدة الحملة: {study.duration}
                    </h4>
                    {study.photography_section && (
                      <p className="text-sm sm:text-base text-[#8E95BF] leading-relaxed">
                        {study.photography_section}
                      </p>
                    )}
                    {study.visual_identity_section && (
                      <p className="text-sm sm:text-base text-[#8E95BF] leading-relaxed font-semibold">
                        {study.visual_identity_section}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center bg-gradient-to-br from-[#44428C]/5 to-[#FF966A]/5 rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 mt-4 lg:mt-0">
                    <p className="text-xs sm:text-sm text-[#8E95BF] italic leading-relaxed">
                      ملاحظة: هذا المحتوى محمي بموجب سرية وحقوق العميل.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
