"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight, Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("الرئيسية");
  const [menuAnimationClass, setMenuAnimationClass] = useState("");

  const navigation = [
    { name: "الرئيسية", href: "#home", id: "home" },
    { name: "خدماتنا", href: "#services", id: "services" },
    { name: "أعمالنا", href: "#portfolio", id: "portfolio" },
    { name: "فريقنا", href: "#team", id: "team" },
    { name: "من نحن", href: "#about", id: "about" },
    { name: "تواصل معنا", href: "#contact", id: "contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);

    if (!element) {
      console.warn(`Element with selector "${href}" not found`);
      return;
    }

    const headerHeight = 80;
    const elementTop = (element as HTMLElement).offsetTop - headerHeight;

    window.scrollTo({
      top: elementTop,
      behavior: "smooth",
    });
  };

  // Handle header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enhanced active section tracking
  const updateActiveSection = useCallback(() => {
    const scrollPosition = window.scrollY + 150;
    let currentSection = "الرئيسية";

    for (let i = navigation.length - 1; i >= 0; i--) {
      const { id, name } = navigation[i];
      const element = document.getElementById(id);

      if (element) {
        const elementTop = element.offsetTop;
        if (scrollPosition >= elementTop) {
          currentSection = name;
          break;
        }
      }
    }

    setActiveSection(currentSection);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    const timer = setTimeout(updateActiveSection, 100);
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [updateActiveSection]);

  // Enhanced menu animation handling
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      setMenuAnimationClass("animate-slide-in");
    } else {
      document.body.style.overflow = "unset";
      setMenuAnimationClass("animate-slide-out");
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        isMenuOpen &&
        !target.closest(".mobile-menu-container") &&
        !target.closest(".menu-toggle")
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // const handleNavItemClick = (item: (typeof navigation)[0]) => {
  //   setActiveSection(item.name);
  //   scrollToSection(item.href);
  //   setIsMenuOpen(false);
  // };
  // const handleNavClick = (item: (typeof navigation)[0]) => {
  //   setActiveSection(item.name);
  //   scrollToSection(item.href);
  // };

  const handleLogoClick = () => {
    setActiveSection("الرئيسية");
    scrollToSection("#home");
  };

  const handleMobileNavClick = (item: (typeof navigation)[0]) => {
    setActiveSection(item.name);
    scrollToSection(item.href);
    setIsMenuOpen(false);
  };

  return (
    <>
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes slideInItem {
          from {
            transform: translateX(30px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slideIn 0.3s ease-out forwards;
        }

        .animate-slide-out {
          animation: slideOut 0.3s ease-in forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scaleIn 0.2s ease-out;
        }

        .animate-item-in {
          animation: slideInItem 0.4s ease-out forwards;
        }

        .menu-item-enter {
          animation-fill-mode: both;
        }

        .glass-effect {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
      `}</style>

      <header
        className={`bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "py-2" : "py-0"
          }`}
        role="banner"
        itemScope
        itemType="https://schema.org/WPHeader"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? "h-16" : "h-20"
              }`}
          >
            {/* Logo Section */}
            <div className="flex items-center" itemScope itemType="https://schema.org/Organization">
              <button
                onClick={handleLogoClick}
                className="flex items-center space-x-2 space-x-reverse group"
                aria-label="دهم - الصفحة الرئيسية"
              >
                <div className="transition-transform duration-200 group-hover:scale-105">
                  <Image
                    src={logo}
                    alt="دهم - شعار وكالة التسويق الرقمي"
                    width={100}
                    className="object-contain transition-all duration-300"
                    priority
                    itemProp="logo"
                  />
                </div>
              </button>
              <meta itemProp="name" content="دهم - وكالة التسويق الرقمي" />
              <meta itemProp="description" content="وكالة تسويق رقمي عُمانية رائدة" />
            </div>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center space-x-8"
              role="navigation"
              aria-label="القائمة الرئيسية"
              itemScope
              itemType="https://schema.org/SiteNavigationElement"
            >
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveSection(item.name);
                    scrollToSection(item.href);
                  }}
                  className={`relative text-[#223059] hover:text-[#44428C] transition-colors duration-200 font-medium py-2 group cursor-pointer ${activeSection === item.name ? "text-[#44428C]" : ""
                    }`}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF966A] group-hover:w-full transition-all duration-300"></span>
                  {activeSection === item.name && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF966A] transition-all duration-300"></span>
                  )}
                </button>
              ))}
            </nav>

            {/* CTA Button and Mobile Menu */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button
                className="bg-[#FF966A] hover:bg-[#F2AD85] text-white px-6 py-2 rounded-md font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
                aria-label="تسجيل حساب جديد"
                itemProp="potentialAction"
                itemScope
                itemType="https://schema.org/RegisterAction"
              >
                <span itemProp="name">سجل الآن</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-gray-100 transition-all duration-200 menu-toggle relative overflow-hidden"
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
                aria-expanded={isMenuOpen}
              >
                <div className="relative">
                  <Menu
                    className={`h-6 w-6 text-[#223059] transition-all duration-300 ${isMenuOpen ? "rotate-180 scale-0" : "rotate-0 scale-100"
                      }`}
                  />
                  <X
                    className={`h-6 w-6 text-[#223059] absolute inset-0 transition-all duration-300 ${isMenuOpen ? "rotate-0 scale-100" : "rotate-180 scale-0"
                      }`}
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Enhanced backdrop with blur */}
          <div
            className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/40 glass-effect animate-fade-in"
            onClick={toggleMenu}
          />

          {/* Enhanced menu panel */}
          <div
            className={`fixed top-0 right-0 w-full max-w-sm h-full bg-white/95 glass-effect shadow-2xl border-l border-white/20 mobile-menu-container ${menuAnimationClass}`}
          >
            <div className="flex flex-col h-full">
              {/* Enhanced header section */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100/50 bg-gradient-to-r from-[#44428C]/5 to-[#FF966A]/5">
                <button
                  onClick={() => {
                    handleLogoClick();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 space-x-reverse group animate-scale-in"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#44428C] to-[#FF966A] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
                    <span className="text-white font-bold text-xl">د</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-xl font-bold text-[#223059] group-hover:text-[#44428C] transition-colors">
                      دهم
                    </span>
                    <span className="block text-xs text-gray-500">
                      منصة التطوير الرقمي
                    </span>
                  </div>
                </button>
              </div>

              {/* Enhanced navigation section */}
              <nav className="flex-1 overflow-y-auto py-6" role="navigation">
                <div className="px-6 space-y-3">
                  {navigation.map((item, index) => (
                    <div
                      key={item.name}
                      className="menu-item-enter animate-item-in"
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      <button
                        onClick={() => handleMobileNavClick(item)}
                        className={`group flex items-center justify-between w-full text-right px-5 py-4 text-[#223059] hover:text-[#44428C] hover:bg-gradient-to-r hover:from-gray-50 hover:to-[#FF966A]/5 rounded-xl transition-all duration-300 font-medium border-2 border-transparent hover:border-[#FF966A]/20 hover:shadow-sm ${activeSection === item.name
                          ? "text-[#44428C] bg-gradient-to-r from-gray-50 to-[#FF966A]/10 border-[#FF966A]/30 shadow-sm"
                          : ""
                          }`}
                      >
                        <span className="text-lg">{item.name}</span>
                        <ChevronRight
                          className={`w-5 h-5 text-gray-400 group-hover:text-[#FF966A] transition-all duration-200 ${activeSection === item.name
                            ? "text-[#FF966A] rotate-90"
                            : "group-hover:translate-x-1"
                            }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </nav>

              {/* Enhanced footer section with contact info */}
              <div className="p-6 border-t border-gray-100/50 bg-gradient-to-r from-gray-50/50 to-white/50 space-y-4">
                {/* Quick contact info */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-3 space-x-reverse hover:text-[#44428C] transition-colors cursor-pointer">
                    <Phone className="w-4 h-4 text-[#FF966A] ml-1" />
                    <span dir="ltr">+213 555 123 456</span>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse hover:text-[#44428C] transition-colors cursor-pointer">
                    <Mail className="w-4 h-4 text-[#FF966A] ml-1" />
                    <span>contact@dahm.com</span>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse hover:text-[#44428C] transition-colors cursor-pointer">
                    <MapPin className="w-4 h-4 text-[#FF966A] ml-1" />
                    <span>سلطنة عمان</span>
                  </div>
                </div>

                {/* Enhanced CTA button */}
                <Button
                  className="w-full bg-gradient-to-r from-[#FF966A] to-[#F2AD85] hover:from-[#F2AD85] hover:to-[#FF966A] text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md"
                  onClick={toggleMenu}
                >
                  <span className="flex items-center justify-center space-x-2 space-x-reverse">
                    <span>سجل الآن</span>
                  </span>
                </Button>

                {/* Social links or additional info */}
                <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-200/50">
                  <p>© {new Date().getFullYear()} دهم - جميع الحقوق محفوظة</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
