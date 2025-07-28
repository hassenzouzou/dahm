import { NextResponse } from "next/server";
import { TeamResponse } from "@/types/team";

// Mock team data structure
const teamData: TeamResponse = {
  members: [
    {
      name: "حافظ البادي",
      position: "قائد التسويق الاستراتيجي",
      bio: "يمتلك حافظ خبرة واسعة في إدارة الاستراتيجيات التسويقية وإطلاق الحملات الإعلانية الناجحة، حيث قاد مشاريع محلية ودولية، وحقق نتائج ملموسة في السوق.",
      icon: "Target",
      image: "man.png",
      achievements: [
        "قائد الفريق العربي الحائز على ميداليتين ذهبيتين في إنجاز العرب -- الدوحة",
        "شريك مؤسس لشركة يونتاي، الفائزة بالمركز الأول في إنجاز عُمان 2023",
        "مدير استراتيجيات التسويق في 7 شركات من قطاعات مختلفة",
        "تأسيس 9 مشاريع في 4 سنوات، مع خبرة عميقة في التسويق والإدارة",
      ],
    },
    {
      name: "سارة الغافري",
      position: "مديرة العمليات والشراكات الاستراتيجية",
      bio: "بخبرة واسعة في إدارة العمليات والاستراتيجيات التسويقية، تتقن سارة فن تحويل الخطط إلى نتائج ملموسة.",
      icon: "Users",
      image: "woman.png",
      achievements: [
        "مديرة مشاريع في 7 حملات تسويقية ناجحة لعدة شركات",
        "تطوير اتفاقيات وشراكات مع 4 جهات حكومية وشركات محلية ودولية",
        "شريك مؤسس في Smart Real Estate، Enrness، و Uniti",
        "تطوير اتفاقيات مع وزارة الصحة، وزارة الصناعة، وزارة التجارة",
      ],
    },
    {
      name: "طه الزدجالي",
      position: "مسؤول الشراكات",
      bio: "يتمتع طه بخبرة تتجاوز 4 سنوات في تطوير العلاقات الاستراتيجية، إدارة العمليات البيعية، والتوسع في الأسواق.",
      icon: "Award",
      image: "man.png",
      achievements: [
        "بناء شبكة علاقات قوية تضم أكثر من 95 عميلًا وجهة",
        "إتمام 80+ صفقة بيع وتأجير عقاري، محققًا 70% رضا العملاء",
        "إغلاق صفقات عقارية بقيمة تجاوزت 950,000 ريال عماني",
        "تحسين استراتيجيات التسعير، مما ساهم في زيادة عائد الاستثمار بنسبة 15%",
      ],
    },
    {
      name: "ماريا الرحبي",
      position: "المديرة الإبداعية",
      bio: "رؤية متكاملة تجمع بين الفن، التسويق، والتكنولوجيا. بخلفيتها القوية في التصوير الفوتوغرافي، الذكاء الاصطناعي، وريادة الأعمال.",
      icon: "Camera",
      image: "woman.png",
      achievements: [
        "المركز الثاني عالميًا في كأس العالم للتصوير الفوتوغرافي FIAP 2024",
        "الفوز مع فريق جماعة التصوير في بينالي كأس العالم للتصوير 2021",
        "تطوير حملات إعلانية تتجاوز المفهوم التقليدي",
        "شهادة برنامج AI Product Manager Nanodegree",
      ],
    },
    {
      name: "يونس",
      position: "مدير العمليات والابتكار التكنولوجي",
      bio: "يمتلك يونس خبرة واسعة في إدارة العمليات، الابتكار التكنولوجي، وريادة الأعمال، حيث ساهم في تأسيس مشاريع نوعية وقيادة عمليات تشغيلية بكفاءة عالية.",
      icon: "Cog",
      image: "man.png",
    },
    {
      name: "عزيز",
      position: "مصمم جرافيك ومطور الهويات البصرية",
      bio: "عزيز مصمم جرافيك متخصص في تطوير الهويات البصرية والتصميم الإعلاني، حيث استطاع من خلال خبرته العمل مع شركات إبداعية وتحويل الرؤى التجارية إلى تصاميم تنبض بالحياة.",
      icon: "Palette",
      image: "man.png",
    },
  ],
};

// GET endpoint handler
export async function GET() {
  // Log API call for monitoring
  console.log("API Team called at:", new Date().toISOString());

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 150));

  // Return JSON response with cache prevention headers
  return NextResponse.json(
    {
      ...teamData,
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

// POST endpoint handler for single member lookup
export async function POST(request: Request) {
  try {
    const { memberName } = await request.json();

    const member = teamData.members.find(
      (m) => m.name === memberName || m.name.includes(memberName)
    );

    if (!member) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        member,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
          Pragma: "no-cache",
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
