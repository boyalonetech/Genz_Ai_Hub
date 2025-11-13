"use client";

import React from "react";

export interface Faqs {
  id: number;
  question: string;
  answer: string;
}

export default function Faqs() {
  const [activeId, setActiveId] = React.useState<number | null>(null);

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
                    <p className="text-black text-base sm:text-sm xl:text-lg font-sm leading-tight tracking-tight">
                      {faq.question}
                    </p>
                  )}
                  {isActive && (
                    <p className="text-black/90 mt-2 text-base sm:text-sm  xl:text-lg font-sm  leading-relaxed">
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
  );
}
