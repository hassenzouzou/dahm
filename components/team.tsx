import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Award, Users, Target, Camera, Palette, Cog } from "lucide-react";
import { TeamResponse } from "@/types/team";

interface TeamProps {
  id?: string;
}

// Icon mapping for the API data
const iconMap = {
  Award: Award,
  Users: Users,
  Target: Target,
  Camera: Camera,
  Palette: Palette,
  Cog: Cog,
};

// Server-side data fetching function with cache prevention
async function getTeamMembers(): Promise<TeamResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    const response = await fetch(`${baseUrl}/api/team?t=${timestamp}`, {
      // Prevent all types of caching
      cache: "no-store",
      next: { revalidate: 0 },
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch team members: ${response.status}`);
    }

    const data = await response.json();
    console.log("Team data fetched successfully:", new Date().toISOString());

    return data;
  } catch (error) {
    console.error("Error fetching team members:", error);
    throw new Error("Failed to load team members");
  }
}

export default async function Team({ id = "team" }: TeamProps) {
  let data: TeamResponse;
  let error: string | null = null;

  // Enhanced error handling
  try {
    data = await getTeamMembers();
  } catch (err) {
    error = err instanceof Error ? err.message : "An unexpected error occurred";
    // Fallback data
    data = { members: [] };
  }

  // Display error to user
  if (error && data.members.length === 0) {
    return (
      <section id={id} className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <p className="text-base sm:text-lg font-semibold">
                Error loading team data
              </p>
              <p className="text-xs sm:text-sm mt-2">{error}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#44428C] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base hover:bg-[#3a3a7a] transition-colors"
            >
              Try Again
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
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#223059] mb-4 sm:mb-6 leading-tight">
            فريق من الخبراء والمبدعين
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#8E95BF] max-w-3xl mx-auto leading-relaxed px-2">
            نجمع أفضل المواهب والخبرات لتحقيق رؤيتك التسويقية
          </p>
        </div>

        {/* Team members grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {data.members.map((member, index) => {
            const IconComponent = iconMap[member.icon as keyof typeof iconMap];

            return (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl overflow-hidden group mx-auto w-full max-w-sm sm:max-w-none"
              >
                <CardContent className="p-0">
                  {/* Member image section */}
                  <div className="relative">
                    <div className="h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-[#44428C] to-[#8E95BF] flex items-center justify-center">
                      <Image
                        src={
                          member.image ||
                          `/placeholder.svg?height=300&width=300&query=professional headshot of ${member.name}`
                        }
                        alt={member.name}
                        width={300}
                        height={300}
                        className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-white shadow-lg transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[#FF966A]">
                      {IconComponent && (
                        <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                      )}
                    </div>
                  </div>

                  {/* Member information section */}
                  <div className="p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
                    <div className="text-center">
                      <h3 className="text-lg sm:text-xl font-bold text-[#223059] mb-1 sm:mb-2 leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-[#FF966A] font-semibold text-sm sm:text-base">
                        {member.position}
                      </p>
                    </div>

                    <p className="text-[#8E95BF] text-xs sm:text-sm leading-relaxed text-center sm:text-right">
                      {member.bio}
                    </p>

                    {/* Achievements section */}
                    {member.achievements && member.achievements.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-[#223059] text-xs sm:text-sm text-right">
                          أبرز الإنجازات:
                        </h4>
                        <ul className="space-y-1">
                          {member.achievements
                            .slice(0, 3)
                            .map((achievement, achIndex) => (
                              <li
                                key={achIndex}
                                className="text-xs text-[#8E95BF] leading-relaxed text-right"
                              >
                                • {achievement}
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
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
