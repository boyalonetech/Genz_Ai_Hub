"use client";
import React, { useState, useEffect } from "react";

export default function Roadmap() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const roadmapSection = document.getElementById("roadmap-section");
      if (!roadmapSection) return;

      const sectionRect = roadmapSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much of the section is visible
      const sectionTop = sectionRect.top;
      const sectionHeight = sectionRect.height;

      let progress = 0;

      if (sectionTop < 0) {
        // Section is partially or fully scrolled past
        const scrolled = Math.abs(sectionTop);
        progress = Math.min(
          (scrolled / (sectionHeight + windowHeight)) * 100,
          100
        );
      }

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScrollProgress);
    window.addEventListener("resize", updateScrollProgress);

    // Initial calculation
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  return (
    <section
      id="roadmap-section"
      className="w-full bg-white py-12 md:py-20 px-4 md:px-8 relative overflow-hidden -translate-y-40"
    >
      {/* Vertical Progress Bar */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col items-center">
          {/* Progress bar container */}
          <div className="w-1 h-64 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="w-full bg-orange-400 transition-all duration-100"
              style={{ height: `${scrollProgress}%` }}
            />
          </div>
          {/* Progress percentage */}
          <span className="text-xs text-gray-600 mt-2 font-medium">
            {Math.round(scrollProgress)}%
          </span>
        </div>
      </div>

      {/* Decorative Background Circles */}
      <div className="w-64 h-64 md:w-96 md:h-96 absolute -right-20 md:right-20 top-1/2 opacity-0 lg:opacity-75 bg-orange-400 rounded-full shadow-inner pointer-events-none" />
      <div className="w-48 h-48 md:w-64 md:h-64 absolute -left-10 md:left-0 top-0 opacity-0 lg:opacity-75 bg-orange-400 rounded-full shadow-inner pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-indigo-800 text-md font-medium mb-2">
            What&apos;s Next at GenZ AI Hub
          </p>
          <h2 className="text-2xl md:text-2xl text-orange-400">
            We&apos;re building more than courses we&apos;re building an
            ecosystem.
          </h2>
        </div>

        {/* Timeline Items */}
        <div className="space-y-12 md:space-y-16">
          {/* Q2 2026 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-4 h-4 rounded-full border-2 border-orange-500" />
              <span className="text-indigo-800 text-base">Q2 2026</span>
            </div>
            <h3 className="text-3xl md:text-3xl text-orange-400 mb-4">
              Mentorship Programs
            </h3>
            <p className="text-md text-black max-w-2xl">
              Get matched with real AI experts who mentor you 1-on-1, help you
              build projects that stand out, and show you how to turn AI skills
              into real career moves.
            </p>
            <div className="w-px h-16 bg-orange-400 mt-8" />
          </div>

          {/* Q3 2026 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-4 h-4 rounded-full border-2 border-orange-500" />
              <span className="text-indigo-800 text-base">Q3 2026</span>
            </div>
            <h3 className="text-3xl md:text-3xl text-orange-400 mb-4">
              AI Builders Community
            </h3>
            <p className="text-md text-black max-w-2xl">
              Collaborate with other innovators on real-world AI projects, join
              global hackathons, and contribute to open-source tools that push
              the boundaries of what&apos;s possible with AI.
            </p>
            <div className="w-px h-16 bg-orange-400 mt-8" />
          </div>

          {/* 2027 & Beyond */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-4 h-4 rounded-full border-2 border-orange-500" />
              <span className="text-indigo-800 text-base">2027 & Beyond</span>
            </div>
            <h3 className="text-3xl md:text-3xl text-orange-400 mb-4">
              Innovation Lab
            </h3>
            <p className="text-md text-black max-w-2xl">
              Got an AI idea? Build it, test it, and launch it with us. Our
              accelerator connects you with mentors, developers, and tools to
              bring your innovation to life.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button className="px-6 py-4 bg-orange-400 rounded-lg lg:text-xs text-white text-base hover:bg-orange-500 transition-colors">
            Join Waitlist for Early Access
          </button>
        </div>
      </div>
    </section>
  );
}
