'use client';

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Linkedin, Twitter, CheckCircle, AlertCircle } from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo.png";
import { useState, useEffect } from "react";
import { NewsletterResponse, SubscriptionResponse } from "@/types/newsletter";

export default function Footer() {
  // Quick links with their corresponding section IDs
  const quickLinks = [
    { name: "الرئيسية", href: "#home" },
    { name: "خدماتنا", href: "#services" },
    { name: "أعمالنا", href: "#about" },
    { name: "فريقنا", href: "#team" },
    { name: "تواصل معنا", href: "#contact" },
  ];

  // Newsletter state
  const [newsletterContent, setNewsletterContent] = useState({
    title: "اشترك بالنشرة",
    description: "احصل على آخر النصائح التسويقية والعروض الحصرية",
    buttonText: "اشترك",
    placeholder: "بريدك الإلكتروني"
  });
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: "" });
  const [contentLoading, setContentLoading] = useState(true);

  // Fetch newsletter content on component mount
  useEffect(() => {
    const fetchNewsletterContent = async () => {
      try {
        const timestamp = new Date().getTime();
        const response = await fetch(`/api/newsletter?t=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        });

        if (response.ok) {
          const data: NewsletterResponse = await response.json();
          setNewsletterContent(data.content);
        }
      } catch (error) {
        console.error('Error fetching newsletter content:', error);
      } finally {
        setContentLoading(false);
      }
    };

    fetchNewsletterContent();
  }, []);

  // Handle newsletter subscription
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setSubscriptionStatus({
        type: 'error',
        message: 'يرجى إدخال بريد إلكتروني صحيح'
      });
      return;
    }

    setIsSubmitting(true);
    setSubscriptionStatus({ type: null, message: "" });

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data: SubscriptionResponse = await response.json();

      if (data.success) {
        setSubscriptionStatus({
          type: 'success',
          message: data.message
        });
        setEmail(""); // Clear email input on success
      } else {
        setSubscriptionStatus({
          type: 'error',
          message: data.message
        });
      }
    } catch (error) {
      setSubscriptionStatus({
        type: 'error',
        message: 'حدث خطأ أثناء الاشتراك. يرجى المحاولة مرة أخرى'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clear status message after 5 seconds
  useEffect(() => {
    if (subscriptionStatus.type) {
      const timer = setTimeout(() => {
        setSubscriptionStatus({ type: null, message: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [subscriptionStatus]);

  return (
    <footer className="bg-[#223059] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 space-x-reverse">
              <Image
                src={logo}
                alt="دهم - شعار الشركة"
                width={150}
                className="object-contain transition-all duration-300"
                priority
              />
            </div>
            <p className="text-[#F2AD85] leading-relaxed">
              حيث تتحول الفكرة إلى تأثير حقيقي من خلال حلول تسويقية متكاملة تحقق
              نتائج قابلة للقياس
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="bg-[#44428C] p-3 rounded-lg hover:bg-[#8E95BF] transition-colors duration-200"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="bg-[#44428C] p-3 rounded-lg hover:bg-[#8E95BF] transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="bg-[#44428C] p-3 rounded-lg hover:bg-[#8E95BF] transition-colors duration-200"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#FF966A]">روابط سريعة</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#F2AD85] hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transform transition-transform"
                    scroll={true}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section with Dynamic Content */}
          <div className="space-y-6">
            {contentLoading ? (
              <div className="animate-pulse">
                <div className="h-6 bg-[#44428C] rounded mb-3"></div>
                <div className="h-4 bg-[#44428C] rounded mb-4"></div>
                <div className="h-10 bg-[#44428C] rounded"></div>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-[#FF966A]">
                  {newsletterContent.title}
                </h3>
                <p className="text-[#F2AD85]">
                  {newsletterContent.description}
                </p>
                
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div className="flex space-x-2 space-x-reverse">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={newsletterContent.placeholder}
                      className="bg-[#44428C] border-[#8E95BF] text-white placeholder:text-[#F2AD85] text-right"
                      disabled={isSubmitting}
                      required
                    />
                    <Button 
                      type="submit"
                      className="bg-[#FF966A] hover:bg-[#F2AD85] text-white px-6 transition-all duration-200 min-w-[80px]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        newsletterContent.buttonText
                      )}
                    </Button>
                  </div>

                  {/* Status Message */}
                  {subscriptionStatus.type && (
                    <div className={`flex items-center space-x-2 space-x-reverse p-3 rounded-lg ${
                      subscriptionStatus.type === 'success' 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-red-500/20 text-red-300'
                    }`}>
                      {subscriptionStatus.type === 'success' ? (
                        <CheckCircle className="h-4 w-4 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      )}
                      <span className="text-sm">{subscriptionStatus.message}</span>
                    </div>
                  )}
                </form>
              </>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#44428C] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[#F2AD85] text-center md:text-right">
              © {new Date().getFullYear()} دهم. جميع الحقوق محفوظة
            </p>
            <p className="text-[#FF966A] text-center md:text-left font-semibold">
              مع دهم، تواجدك الرقمي أقوى، تفاعلك أسرع، ونتائجك أكبر!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}