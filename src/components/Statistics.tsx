import React from "react";

export default function Statistics() {
  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
        {/* Stat 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-4xl font-semibold text-orange-500 mb-2 md:mb-3">
            500+
          </div>
          <div className="text-lg sm:text-xl md:text-lg text-indigo-800">
            Learners
          </div>
        </div>

        {/* Stat 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-4xl font-semibold text-orange-500 mb-2 md:mb-3">
            12
          </div>
          <div className="text-lg sm:text-xl md:text-lg text-indigo-800">
            Industry Tracks
          </div>
        </div>

        {/* Stat 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-4xl font-semibold text-orange-500 mb-2 md:mb-3">
            50+
          </div>
          <div className="text-lg sm:text-xl md:text-lg text-indigo-800">
            Hours of Content
          </div>
        </div>
      </div>
    </section>
  );
}
