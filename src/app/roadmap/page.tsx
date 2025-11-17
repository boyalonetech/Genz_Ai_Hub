import React from "react";
import Faqs from "@/components/Faqs";

export default function RoadmapPage() {
  // Roadmap data
  const roadmapItems = [
    {
      period: "Q2 2026",
      title: "Mentorship Programs",
      description:
        "Get matched with real AI experts who mentor you 1-on-1, help you build projects that stand out, and show you how to turn AI skills into real career moves.",
      completed: true,
    },
    {
      period: "Q3 2026",
      title: "AI Builders Community",
      description:
        "Collaborate with other innovators on real-world AI projects, join global hackathons, and contribute to open-source tools that push the boundaries of what's possible with AI.",
      completed: false,
    },
    {
      period: "2027 & Beyond",
      title: "Innovation Lab",
      description:
        "Got an AI idea? Build it, test it, and launch it with us. Our accelerator connects you with mentors, developers, and tools to bring your innovation to life.",
      completed: false,
    },
  ];

 


  return (
    <div className="w-full min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <div className="w-full py-12 lg:py-20 px-4 sm:px-6 lg:px-8 relative bg-white overflow-hidden">
        {/* Background circles */}
        <div className="hidden lg:block w-64 h-64 absolute right-[-70px] top-36 opacity-75 bg-orange-400 rounded-full shadow-lg" />
        <div className="hidden lg:block w-96 h-96 absolute left-[-248px] top-32 opacity-75 bg-orange-400 rounded-full shadow-lg" />

        <div className="max-w-7xl mx-auto text-center">
          <div className="text-indigo-800 text-xl font-normal font-['Unbounded'] mb-4">
            Roadmap
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-normal font-['Unbounded'] leading-tight mb-6">
            <span className="text-indigo-800">The Future of </span>
            <span className="text-orange-400">GenZ</span>
            <br />
            <span className="text-orange-400">AI</span>
            <span className="text-indigo-800"> Hub</span>
          </h1>
          <p className="text-black text-lg sm:text-xl font-normal font-['Unbounded'] leading-7 max-w-4xl mx-auto">
            We&apos;re building the most comprehensive AI learning ecosystem for Gen
            Z. Here&apso;s what&apos;s coming.
          </p>
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-orange-400" />

            {roadmapItems.map((item, index) => (
              <div
                key={index}
                className="relative flex items-start mb-32 last:mb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 w-7 h-7 bg-orange-400 rounded-full shadow-lg z-10" />

                {/* Content */}
                <div className="ml-40 flex-1">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-4 h-4 rounded-full border-2 border-orange-400" />
                    <div className="text-indigo-800 text-base font-normal font-['Lato']">
                      {item.period}
                    </div>
                  </div>
                  <div className="space-y-3.5">
                    <h3 className="text-orange-400 text-3xl lg:text-4xl font-normal font-['Unbounded']">
                      {item.title}
                    </h3>
                    <p className="text-black text-lg font-medium font-['Lato'] leading-5 max-w-2xl">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-12">
            {roadmapItems.map((item, index) => (
              <div key={index} className="relative pl-12">
                {/* Timeline dot */}
                <div className="absolute left-0 w-7 h-7 bg-orange-400 rounded-full shadow-lg" />

                {/* Timeline line (between dots) */}
                {index < roadmapItems.length - 1 && (
                  <div className="absolute left-3 top-7 w-0.5 h-16 bg-orange-400" />
                )}

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-orange-400" />
                    <div className="text-indigo-800 text-base font-normal font-['Lato']">
                      {item.period}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-orange-400 text-2xl font-normal font-['Unbounded']">
                      {item.title}
                    </h3>
                    <p className="text-black text-base font-medium font-['Lato'] leading-5">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <Faqs />
    </div>
  );
}
