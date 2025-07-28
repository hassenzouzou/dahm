import Header from "@/components/header"
import Hero from "@/components/hero"
import Services from "@/components/services"
import CaseStudies from "@/components/case-studies"
import Team from "@/components/team"
import About from "@/components/about"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Header />
      <main>
        <Hero id="home" />
        <Services id="services" />
        <CaseStudies id="portfolio" />
        <Team id="team" />
        <About id="about" />
        <Contact id="contact" />
      </main>
      <Footer />
    </div>
  )
}
