"use client";
import Contact from "@/components/Contact";
import Faqs from "@/components/Faqs";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-white px-4 overflow-hidden lg:h-[60vh] sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="absolute w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 -right-16 md:-right-24 lg:-right-30 top-8 md:top-16 lg:top-16 opacity-75 bg-orange-400 rounded-full shadow-[inset_0px_4px_53px_18px_rgba(0,0,0,0.1)] pointer-events-none" />
        <div className="absolute w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 -left-24 md:-left-32 lg:-left-50 top-8 md:top-16 lg:top-32 opacity-75 bg-orange-400 rounded-full shadow-[inset_0px_4px_53px_18px_rgba(0,0,0,0.1)] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-indigo-800 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal font-['Unbounded'] leading-tight mb-4 md:mb-6">
            Contact Us
          </h1>
          <p className="text-black text-base sm:text-lg font-medium leading-relaxed tracking-tight max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you. Send us a message
            and we&apso;ll respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <Contact />

      {/* FAQ Section */}
      <Faqs />
    </div>
  );
}
