import React from "react";

export default function Value() {
  return (
    <section className="w-full bg-white py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-indigo-800 text-md font-medium mb-2">
            Value Propositions
          </p>
          <h2 className="text-3xl md:text-3xl text-orange-500">
            Empower Your AI Journey
          </h2>
        </div>

        {/* Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Card 1 */}
          <div className="p-8 rounded-lg outline-1 outline-orange-500 bg-white">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-8">
              <span className="text-2xl text-indigo-800">1</span>
            </div>
            <h3 className="text-2xl md:text-2xl text-black mb-6">
              Industry-Tailored Learning
            </h3>
            <p className="text-lg md:text-[16px] text-black/70">
              Not generic AI courses. Real skills for your actual career from
              healthcare to marketing to education.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-lg outline-1 outline-orange-500 bg-white">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-8">
              <span className="text-2xl text-indigo-800">2</span>
            </div>
            <h3 className="text-2xl md:text-2xl text-black mb-6">
              Practical, Project-Based
            </h3>
            <p className="text-lg md:text-[16px] text-black/70">
              Build portfolios that get you hired or help you launch your
              business. No fluff, just results.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-lg outline-1 outline-orange-500 bg-white">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-8">
              <span className="text-2xl text-indigo-800">3</span>
            </div>
            <h3 className="text-2xl md:text-2xl text-black mb-6">
              Community-Powered Growth
            </h3>
            <p className="text-lg md:text-[16px] text-black/70">
              Learn alongside peers, get mentored by experts, and build the
              future together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
