"use client";
import React, { useState, useEffect } from "react";

export default function Statistics() {
  // Target numbers for each stat
  const stats = [
    { label: "Learners", value: 500 },
    { label: "Industry Tracks", value: 12 },
    { label: "Hours of Content", value: 50 },
  ];

  // Create a state for animated counts
  const [counts, setCounts] = useState(stats.map(() => 0));

  // Counter update function
  useEffect(() => {
    const duration = 2000; // animation duration (ms)
    const frameRate = 30; // frames per second
    const totalFrames = Math.round((duration / 1000) * frameRate);

    stats.forEach((stat, index) => {
      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentValue = Math.floor(stat.value * progress);

        setCounts((prev) => {
          const updated = [...prev];
          updated[index] = currentValue;
          return updated;
        });

        if (frame === totalFrames) clearInterval(counter);
      }, 1000 / frameRate);
    });
  }, [stats]);

  return (
    <section className="w-full  px-4 md:px-8 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center transition-all duration-300"
          >
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-4xl font-semibold text-orange-400 mb-2 md:mb-3">
              {counts[index]}
              {stat.value >= 50 ? "+" : ""}
            </div>
            <div className="text-lg sm:text-xl md:text-lg text-indigo-800">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
