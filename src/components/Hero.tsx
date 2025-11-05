"use client";
import Image from "next/image";
import React from "react";
import Statistics from "./Statistics";

export default function Hero() {
  return (
    <section className="w-full min-h-screen relative bg-white overflow-hidden px-4 md:px-8 lg:px-16 py-12 md:pt-20 mt-14">
      {/* Decorative Background Circles */}
      <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 absolute top-20 -right-16 sm:right-0 md:-right-20 opacity-75 rotate-animation bg-orange-400 rounded-full shadow-inner pointer-events-none" />
      <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96  top-135 absolute bottom-0 -left-24 sm:-left-20 md:-left-40 opacity-75 bg-orange-400 rounded-full shadow-inner pointer-events-none" />

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Main Headline */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-semibold leading-tight mb-6 md:mb-8"
          style={{ fontFamily: "var(--font-unbounded)" }}
        >
          <span className="text-indigo-800">Master </span>
          <span className="text-orange-400">AI</span>
          <span className="text-indigo-800">
            . Transform <br />
            Your Career. Shape <br />
            the{" "}
          </span>
          <span className="text-orange-400">Future</span>
          <span className="text-indigo-800">.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-sm sm:text-base md:text-lg lg:text-lg text-black max-w-3xl mb-8 md:mb-12 px-4">
          Industry-specific AI education for the next generation of
          professionals, creators, and leaders.
        </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto px-4 sm:px-0">
            <button className="w-full sm:w-auto px-6 py-3 md:py-4 bg-orange-400 rounded-lg text-white text-base md:text-sm font-medium hover:bg-orange-500 transition-colors">
              Explore Courses
            </button>
            <button className="w-full sm:w-auto px-6 py-3 md:pt-4 rounded-lg outline outline-2 outline-indigo-800 text-orange-400 text-base md:text-sm font-medium hover:bg-indigo-50 transition-colors">
              Join Waitlist
            </button>
          </div>
        {/* CTA Buttons */}
        <div className="w-full flex flex-col items-center justify-center lg:-translate-y-10">

          {/* Hero Image */}
          <Image
            className="w-full max-w-sm sm:max-w-md lg:py-0 py-10 pb-12  lg:pb-0 md:max-w-lg h-auto scale-105 lg:scale-90 rounded-lg"
            src="/robot.png"
            alt="AI Learning"
            width={1000}
            quality={100}
            sizes="fill"
            height={1000}
          />
        <Statistics />

        </div>
        <style jsx>{`
          .rotate-animation {
            animation: bounce 2s ease-in-out infinite,
              rotateRight 3s linear infinite;
          }

          @keyframes bounce {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-30px);
            }
          }

          @media (min-width: 768px) {
            @keyframes bounce {
              0%,
              100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-60px);
              }
            }
          }

          @keyframes rotateRight {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
