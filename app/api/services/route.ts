import { NextResponse } from "next/server";
import { ServicesResponse } from "@/types/services";

// Mock services data structure
const servicesData: ServicesResponse = {
  services: [
    {
      title: "خدماتنا في التصوير والإنتاج الفني",
      icon: "Camera",
      items: [
        {
          name: "الإنتاج والإخراج الفني",
          description:
            "كل قصة عظيمة تحتاج لرؤية إبداعية تُخرجها للنور! نحن نحول أفكارك إلى محتوى بصري احترافي يترك أثرًا ويبقى في الذاكرة.",
        },
        {
          name: "التصوير الفوتوغرافي والسينمائي",
          description:
            "الصورة تُحاكي الواقع، والفيديو ينقله بأدق تفاصيله! نضمن لك جودة عالية في التصوير، سواء كان فوتوغرافيًا، سينمائيًا، جويًا، أو عبر تقنيات التوثيق الزمني (تايم لابس).",
        },
        {
          name: "التغطيات والبث المباشر",
          description:
            "الحدث العظيم يستحق أن يُشاهده الجميع! نوفر لك تغطيات احترافية وبث مباشر عالي الجودة ليصل صوتك وصورتك إلى أبعد مدى.",
        },
      ],
    },
    {
      title: "بناء الهوية التجارية والمؤسسية",
      icon: "Palette",
      items: [
        {
          name: "الشعار والهوية البصرية",
          description:
            "الشعار هو أول انطباع عن علامتك، والهوية البصرية هي بصمتها الدائمة! نصمم لك شعارًا يعكس رؤيتك، وهوية بصرية متكاملة تُميزك عن الآخرين.",
        },
        {
          name: "تصميم المطبوعات",
          description:
            "التفاصيل تصنع الفرق! نوفر لك تصاميم احترافية لبطاقات الأعمال، الفواتير، الأوراق الرسمية، والبروشورات، لتترك انطباعًا يعبر عن احترافية علامتك.",
        },
        {
          name: "دليل الهوية البصرية",
          description:
            "لأن الثبات البصري هو سر العلامات القوية! نضع لك دليلًا متكاملًا يحدد استخدام الشعار، الألوان، الخطوط، والأسلوب البصري لضمان اتساق هويتك في كل منصة.",
        },
      ],
    },
    {
      title: "إدارة منصات التواصل الاجتماعي",
      icon: "Smartphone",
      items: [
        {
          name: "تخطيط وإدارة المحتوى",
          description:
            "نوفر لك استراتيجية محتوى أسبوعية وشهرية مدروسة بعناية، لضمان تفاعل مستمر ورسائل تعكس هويتك وأهدافك.",
        },
        {
          name: "تحليلات وتقارير الأداء",
          description:
            "لا تخلي الأرقام للصدفة! نقدم لك تقارير تحليلية شهرية تفصّل أداء منشوراتك، معدل التفاعل، ونقاط القوة لتعزيز نمو حساباتك بذكاء.",
        },
        {
          name: "الردود التفاعلية وإدارة المجتمع",
          description:
            "بناء مجتمع متفاعل حول علامتك يبدأ من هنا! نتابع التعليقات، الرسائل، ونحرص على الردود السريعة والاحترافية لتعزيز علاقتك مع جمهورك.",
        },
      ],
    },
    {
      title: "صناعة المحتوى الترويجي",
      icon: "PenTool",
      items: [
        {
          name: "كتابة المحتوى الإبداعي",
          description:
            "نصنع لك محتوى جذاباً يعكس هوية علامتك التجارية، سواء لمنشورات السوشيال ميديا أو الإعلانات أو المواقع الإلكترونية.",
        },
        {
          name: "تطوير سيناريوهات الحملات الإعلانية",
          description:
            "نصمم لك سيناريوهات ذكية تعزز وصول حملاتك وتترك أثراً لدى جمهورك.",
        },
        {
          name: "إعداد النصوص الإعلانية",
          description:
            "نكتب لك عبارات قصيرة ومؤثرة للإعلانات الرقمية، تعزز معدل النقر والتحويلات.",
        },
      ],
    },
    {
      title: "الحملات الإعلانية والاستشارات التسويقية",
      icon: "Target",
      items: [
        {
          name: "إدارة الحملات الإعلانية المدفوعة",
          description:
            "نطلق لك حملات ذكية على مختلف المنصات، تضمن لك وصولاً مستهدفاً وعائداً فعّالاً على الاستثمار.",
        },
        {
          name: "تقديم الاستشارات التسويقية والاستراتيجية",
          description:
            "نرسم لك خارطة طريق تسويقية متكاملة، بناءً على تحليل عميق للسوق والجمهور.",
        },
        {
          name: "تحليل الأداء والتقارير الدورية",
          description:
            "نتابع أداء حملاتك ونزودك بتقارير دقيقة، تساعدك في اتخاذ قرارات مدروسة لتعزيز النتائج.",
        },
      ],
    },
  ],
};

// GET endpoint handler
export async function GET() {
  // Log API call for monitoring
  console.log("API Services called at:", new Date().toISOString());

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Return JSON response with cache prevention headers
  return NextResponse.json(
    {
      ...servicesData,
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

// POST endpoint handler (not allowed)
export async function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
