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
  title: {
    template: '%s | دهم - وكالة التسويق الرقمي',
    default: "دهم - وكالة التسويق الرقمي الرائدة في عُمان | خدمات تسويق رقمي احترافية"
  },
  description:
    "دهم أفضل وكالة تسويق رقمي في عُمان. نقدم خدمات التسويق الرقمي، تصميم المواقع، تحسين محركات البحث SEO، إدارة وسائل التواصل الاجتماعي، والتجارة الإلكترونية. اتصل بنا الآن لتحويل أعمالك رقمياً.",
  keywords: [
    "وكالة تسويق رقمي عُمان",
    "تسويق رقمي مسقط",
    "تصميم مواقع عُمان",
    "SEO عُمان",
    "إدارة وسائل التواصل الاجتماعي",
    "تجارة إلكترونية",
    "تسويق إلكتروني",
    "إعلانات جوجل",
    "إعلانات فيسبوك",
    "استراتيجية تسويقية",
    "digital marketing Oman",
    "marketing agency Muscat",
    "web design Oman",
    "SEO services",
    "social media marketing",
    "e-commerce solutions",
    "دهم",
    "Dahm",
    "وكالة دهم",
    "شركة تسويق رقمي"
  ],
  authors: [{
    name: "Dahm Digital Marketing Agency",
    url: `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME || 'yourdomain.com'
      }`
  }],
  creator: "Dahm Digital Marketing Agency",
  publisher: "Dahm Digital Marketing Agency",
  applicationName: "Dahm Digital Marketing",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_OM',
    alternateLocale: ['en_US', 'ar_SA'],
    url: `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME || 'yourdomain.com'
      }`,
    siteName: 'دهم - وكالة التسويق الرقمي',
    title: 'دهم - وكالة التسويق الرقمي الرائدة في عُمان | Dahm Digital Marketing Agency',
    description: 'دهم أفضل وكالة تسويق رقمي في عُمان. نحول أفكارك إلى نجاح رقمي حقيقي من خلال حلول تسويقية مبتكرة واحترافية.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'دهم - وكالة التسويق الرقمي في عُمان',
        type: 'image/png',
      },
      {
        url: '/hero-img.jpeg',
        width: 1200,
        height: 800,
        alt: 'خدمات التسويق الرقمي - دهم',
        type: 'image/jpeg',
      },
    ],
    videos: [],
    audio: [],
    determiner: 'auto',
    countryName: 'Oman',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dahm_agency', // Replace with actual Twitter handle
    creator: '@dahm_agency', // Replace with actual Twitter handle
    title: 'دهم - وكالة التسويق الرقمي الرائدة في عُمان',
    description: 'نحول أفكارك إلى نجاح رقمي حقيقي. خدمات تسويق رقمي احترافية في عُمان.',
    images: {
      url: '/logo.png',
      alt: 'دهم - وكالة التسويق الرقمي',
    },
  },
  verification: {
    // google: 'your-google-verification-code', // Uncomment and replace with actual verification code
    // yandex: 'your-yandex-verification-code', // Uncomment and replace with actual verification code
    // other: {
    //   'msvalidate.01': 'your-bing-verification-code', // Uncomment and replace with actual Bing verification code
    // },
  },
  alternates: {
    canonical: `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME || 'yourdomain.com'
      }`,
    languages: {
      'ar-OM': `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME || 'yourdomain.com'
        }`,
      'ar': `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME || 'yourdomain.com'
        }`,
      // 'en-US': 'https://yourdomain.com/en', // Uncomment if you have English version
    },
  },
  category: 'Digital Marketing',
  classification: 'Business',
  other: {
    'google-site-verification': 'your-google-verification-code', // Replace with actual verification code
    'theme-color': '#FF966A',
    'color-scheme': 'light',
    'format-detection': 'telephone=yes',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME || 'yourdomain.com'}/#organization`,
        "name": "دهم - وكالة التسويق الرقمي",
        "alternateName": "Dahm Digital Marketing Agency",
        "url": `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME || 'yourdomain.com'}`,
        "logo": {
          "@type": "ImageObject",
          "url": "https://yourdomain.com/logo.png",
          "width": 300,
          "height": 100
        },
        "image": "https://yourdomain.com/logo.png",
        "description": "دهم أفضل وكالة تسويق رقمي في عُمان تقدم خدمات التسويق الرقمي الاحترافية",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "OM",
          "addressRegion": "مسقط",
          "addressLocality": "عُمان"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+968-1234-5678",
          "contactType": "customer service",
          "availableLanguage": ["Arabic", "English"]
        },
        "sameAs": [
          "https://facebook.com/dahm.agency",
          "https://twitter.com/dahm_agency",
          "https://instagram.com/dahm.agency",
          "https://linkedin.com/company/dahm-agency"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME || 'yourdomain.com'
          }/#website`,
        "url": `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME || 'yourdomain.com'}`,
        "name": "دهم - وكالة التسويق الرقمي",
        "description": "وكالة تسويق رقمي عُمانية تحول الأفكار إلى تأثير حقيقي",
        "publisher": {
          "@id": `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME || 'yourdomain.com'}/#organization`
        },
        "inLanguage": "ar-OM",
        "potentialAction": {
          "@type": "SearchAction",
          "target": `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME || 'yourdomain.com'}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME || 'yourdomain.com'}/#webpage`,
        "url": `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME || 'yourdomain.com'}`,
        "name": "دهم - وكالة التسويق الرقمي الرائدة في عُمان",
        "isPartOf": {
          "@id": `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME || 'yourdomain.com'}/#website`
        },
        "about": {
          "@id": `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME || 'yourdomain.com'}/#organization`
        },
        "description": "دهم أفضل وكالة تسويق رقمي في عُمان. نقدم خدمات التسويق الرقمي، تصميم المواقع، SEO، وإدارة وسائل التواصل الاجتماعي",
        "breadcrumb": {
          "@id": `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME || 'yourdomain.com'}/#breadcrumb`
        },
        "inLanguage": "ar-OM",
        "potentialAction": [
          {
            "@type": "ReadAction",
            "target": [`https://${process.env.NEXT_PUBLIC_DOMAIN_NAME || 'yourdomain.com'
              }`]
          }
        ]
      },
      {
        "@type": "Service",
        "name": "خدمات التسويق الرقمي",
        "description": "خدمات تسويق رقمي شاملة تشمل SEO، إعلانات جوجل، إدارة وسائل التواصل الاجتماعي، وتصميم المواقع",
        "provider": {
          "@id": `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME || 'yourdomain.com'}/#organization`
        },
        "areaServed": {
          "@type": "Country",
          "@id": "https://www.wikidata.org/wiki/Q842",
          "name": "عُمان"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "خدمات التسويق الرقمي",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "تحسين محركات البحث SEO"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "تصميم وتطوير المواقع"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "إدارة وسائل التواصل الاجتماعي"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "إعلانات جوجل و فيسبوك"
              }
            }
          ]
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME || 'yourdomain.com'}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "الرئيسية",
            "item": `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME || 'yourdomain.com'
              }`
          }
        ]
      }
    ]
  };

  return (
    <html lang="ar" dir="rtl" className={cn(cairo.variable)}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#FF966A" />
        <meta name="msapplication-TileColor" content="#FF966A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="دهم" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="دهم" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* <link rel="manifest" href="/manifest.json" /> */}

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Additional SEO meta tags */}
        <meta name="geo.region" content="OM" />
        <meta name="geo.placename" content="Muscat, Oman" />
        <meta name="ICBM" content="23.5859, 58.4059" />
        <meta name="geo.position" content="23.5859;58.4059" />

        {/* Business specific meta tags */}
        <meta name="rating" content="5" />
        <meta name="distribution" content="global" />
        <meta name="coverage" content="Worldwide" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className={cn(cairo.className, "scroll-smooth")}>
        <DahmCursor /> {/* Add the cursor component here */}
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
