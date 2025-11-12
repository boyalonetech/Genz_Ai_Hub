"use client";
import Contact from "@/components/Contact";
import { useState } from "react";

export interface Faqs {
  id: number;
  question: string;
  answer: string;
}

export default function ContactPage() {
  const [activeId, setActiveId] = useState<number | null>(null);

  const faqs: Faqs[] = [
    {
      id: 1,
      question: "Are the courses really free",
      answer:
        "Yes, all the courses are free. We are a non-profit organization and we are not charging any fees for our courses. However, we do ask for a donation to our cause. You can donate to our cause by clicking on the donate button on our website.",
    },
    {
      id: 2,
      question: "Do I need prior AI experience",
      answer:
        "No, you don't need prior AI experience to take our courses. However, we recommend that you have some basic knowledge of AI and machine learning.",
    },
    {
      id: 3,
      question: "How long does it take to complete a course?",
      answer:
        "It depends on the course complexity — some take hours, others days or weeks. You can learn at your own pace.",
    },
    {
      id: 4,
      question: "Will I get a certificate?",
      answer:
        "Yes, you will receive a certificate upon completion. You can showcase it to employers or include it in your portfolio.",
    },
    {
      id: 5,
      question: "Can I access it on my mobile phone?",
      answer:
        "Yes, you can access all materials and certificates directly from your mobile device.",
    },
  ];

  const toggleFaq = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

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
      <div className="bg-zinc-100 px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-indigo-800 text-sm sm:text-base font-normal font-['Lato'] leading-6 tracking-wide mb-2">
            Always ready to support you
          </p>
          <h2 className="text-center text-orange-400 text-3xl sm:text-4xl font-normal font-['Unbounded'] leading-tight mb-8 md:mb-12">
            FAQ&apos;s
          </h2>

          <div className="space-y-6 md:space-y-10">
            {faqs.map((faq) => {
              const isActive = activeId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-[10px] outline outline-1 outline-neutral-400 px-4 sm:px-6 py-4 flex justify-between items-center gap-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <div>
                    {!isActive && (
                      <p className="text-black text-base sm:text-lg font-sm leading-tight tracking-tight">
                        {faq.question}
                      </p>
                    )}
                    {isActive && (
                      <p className="text-black/90 mt-2 text-base sm:text-lg font-sm  leading-relaxed">
                        {faq.answer}
                      </p>
                    )}
                  </div>

                  <div className="w-8 h-8 flex-shrink-0 bg-orange-400 rounded-2xl flex items-center justify-center">
                    {isActive ? (
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 12h14"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 5v14m7-7H5"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
