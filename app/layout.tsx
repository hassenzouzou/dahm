import type React from "react";
import { Cairo } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import DahmCursor from "@/components/DahmCursor"; // Add this import
import "./globals.css";

const cairo = Cairo({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata = {
  title: "دهم - وكالة التسويق الرقمي",
  description:
    "دهم وكالة تسويق رقمي عُمانية تحول الأفكار إلى تأثير حقيقي من خلال حلول تسويقية متكاملة.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={cn(cairo.variable)}>
      <body className={cn(cairo.className, "scroll-smooth")}>
        <DahmCursor /> {/* Add the cursor component here */}
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
