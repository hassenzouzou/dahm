import Header from "@/components/header"
import Hero from "@/components/hero"
import Services from "@/components/services"
import CaseStudies from "@/components/case-studies"
import Team from "@/components/team"
import About from "@/components/about"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'دهم - وكالة التسويق الرقمي الرائدة في عُمان',
  description: 'دهم أفضل وكالة تسويق رقمي في عُمان. نقدم خدمات التسويق الرقمي، تصميم المواقع، SEO، وإدارة وسائل التواصل الاجتماعي. اتصل بنا لتحويل أعمالك رقمياً.',
  alternates: {
    canonical: 'https://yourdomain.com',
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Header />
      <main role="main">
        {/* Hero Section - Primary content */}
        <section aria-labelledby="hero-heading">
          <Hero id="home" />
        </section>

        {/* Services Section */}
        <section aria-labelledby="services-heading">
          <Services id="services" />
        </section>

        {/* Portfolio/Case Studies Section */}
        <section aria-labelledby="portfolio-heading">
          <CaseStudies id="portfolio" />
        </section>

        {/* Team Section */}
        <section aria-labelledby="team-heading">
          <Team id="team" />
        </section>

        {/* About Section */}
        <section aria-labelledby="about-heading">
          <About id="about" />
        </section>

        {/* Contact Section */}
        <section aria-labelledby="contact-heading">
          <Contact id="contact" />
        </section>
      </main>
      <Footer />

      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50"
      >
        انتقل إلى المحتوى الرئيسي
      </a>
    </div>
  )
}
