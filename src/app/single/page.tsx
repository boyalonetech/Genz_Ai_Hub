"use client";
import { Check } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function CourseDetailPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8 sm:space-y-10">
            {/* What You'll Learn card */}
            <div className="bg-white rounded-[20px] border-2 border-neutral-400 p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
              <h2 className="text-orange-400 text-xl sm:text-2xl font-semibold font-['Unbounded'] leading-relaxed">
                What You&apos;ll Learn
              </h2>

              {/* Learning objectives list */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 relative overflow-hidden flex-shrink-0 mt-1">
                    <div className="w-6 h-6 sm:w-6 sm:h-6 absolute flex justify-center items-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-400 rounded-full text-white">
                      <Check className="w-5 h-5 text-white font-bold" />
                    </div>
                  </div>
                  <div className="text-black text-base sm:text-lg font-meduim font-['Unbounded'] leading-relaxed">
                    Use AI tools to create engaging lesson plans in minutes
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 relative overflow-hidden flex-shrink-0 mt-1">
                    <div className="w-6 h-6 sm:w-6 sm:h-6 absolute justify-center flex items-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-400 rounded-full text-white">
                      <Check className="w-5 h-5 text-white font-bold" />
                    </div>
                  </div>
                  <div className="text-black text-base sm:text-lg font-meduim font-['Unbounded'] leading-relaxed">
                    Design personalized learning experiences for diverse
                    classrooms
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 relative overflow-hidden flex-shrink-0 mt-1">
                    <div className="w-6 h-6 sm:w-6 sm:h-6 absolute justify-center flex items-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-400 rounded-full text-white">
                      <Check className="w-5 h-5 text-white font-bold" />
                    </div>
                  </div>
                  <div className="text-black text-base sm:text-lg font-meduim font-['Unbounded'] leading-relaxed">
                    Integrate ChatGPT, Notion AI, and other tools into your
                    workflow
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 relative overflow-hidden flex-shrink-0 mt-1">
                    <div className="w-6 h-6 sm:w-6 sm:h-6 absolute justify-center flex items-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-400 rounded-full text-white">
                      <Check className="w-5 h-5 text-white font-bold" />
                    </div>
                  </div>
                  <div className="text-black text-base sm:text-lg font-meduim font-['Unbounded'] leading-relaxed">
                    Automate grading and feedback for assignments
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 relative overflow-hidden flex-shrink-0 mt-1">
                    <div className="w-6 h-6 sm:w-6 sm:h-6 absolute justify-center flex items-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-400 rounded-full text-white">
                      <Check className="w-5 h-5 text-white font-bold" />
                    </div>
                  </div>
                  <div className="text-black text-base sm:text-lg font-meduim font-['Unbounded'] leading-relaxed">
                    Implement AI ethically and responsibly in education
                  </div>
                </div>
              </div>
            </div>

            {/* Requirements card */}
            <div className="bg-white rounded-[20px] border-2 border-neutral-400 p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
              <h2 className="text-orange-400 text-xl sm:text-2xl font-normal font-['Unbounded'] leading-relaxed">
                Requirements
              </h2>

              {/* Requirements list */}
              <div className="space-y-4 sm:space-y-6">
                <div className="text-black text-base sm:text-lg font-meduim font-['Unbounded'] leading-relaxed">
                  Basic computer literacy
                </div>
                <div className="text-black text-base sm:text-lg font-meduim font-['Unbounded'] leading-relaxed">
                  Teaching experience (helpful but not required)
                </div>
                <div className="text-black text-base sm:text-lg font-meduim font-['Unbounded'] leading-relaxed">
                  Openness to trying new tools
                </div>
              </div>
            </div>
          </div>
        );

      case "curriculum":
        return (
          <div className="space-y-8 sm:space-y-10">
            <div className="bg-white rounded-[20px] border-2 border-neutral-400 p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
              <h2 className="text-orange-400 text-xl sm:text-2xl font-normal font-['Unbounded'] leading-relaxed">
                Course Curriculum
              </h2>

              <div className="space-y-4">
                <div className="text-black text-lg font-normal font-['Unbounded']">
                  Week 1: Introduction to AI in Education
                </div>
                <div className="text-black text-lg font-normal font-['Unbounded']">
                  Week 2: AI-Powered Lesson Planning
                </div>
                <div className="text-black text-lg font-normal font-['Unbounded']">
                  Week 3: Personalized Learning with AI
                </div>
                <div className="text-black text-lg font-normal font-['Unbounded']">
                  Week 4: Automated Assessment Tools
                </div>
                <div className="text-black text-lg font-normal font-['Unbounded']">
                  Week 5: Ethical AI Implementation
                </div>
                <div className="text-black text-lg font-normal font-['Unbounded']">
                  Week 6: Advanced AI Teaching Strategies
                </div>
                <div className="text-black text-lg font-normal font-['Unbounded']">
                  Week 7: Building Your AI Toolkit
                </div>
                <div className="text-black text-lg font-normal font-['Unbounded']">
                  Week 8: Capstone Project
                </div>
              </div>
            </div>
          </div>
        );

      case "instructor":
        return (
          <div className="space-y-8 sm:space-y-10">
            <div className="bg-white rounded-[20px] border-2 border-neutral-400 p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
              <h2 className="text-orange-400 text-xl sm:text-2xl font-normal font-['Unbounded'] leading-relaxed">
                About the Instructor
              </h2>

              <div className="flex items-start gap-6">
                <Image
                  height={120}
                  width={120}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex-shrink-0"
                  src="/marcus.jpg"
                  alt="Dr. Sarah Chen"
                />
                <div className="space-y-4">
                  <div>
                    <h3 className="text-black text-xl font-bold font-['Unbounded']">
                      Dr. Sarah Chen
                    </h3>
                    <p className="text-black/60 text-lg font-medium font-['Lato']">
                      PhD in Educational Technology
                    </p>
                  </div>
                  <div className="text-black text-base font-normal font-['Unbounded'] leading-relaxed">
                    Former curriculum designer at Khan Academy with 15+ years of
                    teaching experience. Dr. Chen specializes in integrating
                    technology into educational environments and has published
                    numerous papers on AI in education.
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "reviews":
        return (
          <div className="space-y-8 sm:space-y-10">
            <div className="bg-white rounded-[20px] border-2 border-neutral-400 p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
              <h2 className="text-orange-400 text-xl sm:text-2xl font-normal font-['Unbounded'] leading-relaxed">
                Student Reviews
              </h2>

              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-yellow-500">★★★★</div>
                    <span className="text-black font-medium">4.0/5</span>
                  </div>
                  <p className="text-black text-base font-normal font-['Unbounded'] mb-2">
                    "This course transformed how I approach teaching. The AI
                    tools are game-changers!"
                  </p>
                  <p className="text-black/60 text-sm font-medium">
                    - Maria Rodriguez
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-yellow-500">★★★★★</div>
                    <span className="text-black font-medium">5.0/5</span>
                  </div>
                  <p className="text-black text-base font-normal font-['Unbounded'] mb-2">
                    "Excellent content and practical examples. Dr. Chen is an
                    amazing instructor!"
                  </p>
                  <p className="text-black/60 text-sm font-medium">
                    - James Wilson
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Hero Section with decorative circles */}
      <div className="relative w-full bg-white overflow-hidden px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-16">
        {/* Decorative background circles */}
        <div className="w-64 h-64 -right-35 top-36 hidden lg:block absolute opacity-75 bg-orange-400 rounded-full " />
        <div className="w-96 h-96 -left-72 top-32 hidden lg:block absolute opacity-75 bg-orange-400 rounded-full " />

        {/* Main content container */}
        <div className="relative max-w-7xl mx-auto pt-20 lg:pt-40">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left column - Course information */}
            <div className="flex-1 space-y-4 sm:space-y-6">
              {/* Course category */}
              <div className="text-indigo-800 text-xl sm:text-2xl font-medium font-['Unbounded'] leading-relaxed">
                AI for Educators
              </div>

              {/* Course title and description */}
              <div className="text-black/60 text-base sm:text-lg lg:text-xl font-normal font-['Unbounded'] leading-relaxed max-w-3xl">
                Master AI-powered teaching tools, automate grading, and create
                personalized learning experiences for your students.
              </div>

              {/* Rating and course stats */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                {/* Star rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 sm:w-7 sm:h-7 relative text-yellow-500 overflow-hidden"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={26}
                          height={26}
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="m12 17.275l-4.15 2.5q-.275.175-.575.15t-.525-.2t-.35-.437t-.05-.588l1.1-4.725L3.775 10.8q-.25-.225-.312-.513t.037-.562t.3-.45t.55-.225l4.85-.425l1.875-4.45q.125-.3.388-.45t.537-.15t.537.15t.388.45l1.875 4.45l4.85.425q.35.05.55.225t.3.45t.038.563t-.313.512l-3.675 3.175l1.1 4.725q.075.325-.05.588t-.35.437t-.525.2t-.575-.15z"
                          ></path>
                        </svg>
                      </div>
                    ))}
                  </div>
                  <div className="text-indigo-800 text-lg sm:text-xl font-normal font-['Unbounded'] leading-relaxed">
                    4
                  </div>
                </div>

                {/* Duration and enrollment count */}
                <div className="flex items-center gap-4 sm:gap-6">
                  {/* Duration */}
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 sm:w-6 flex items-center sm:h-6 relative overflow-hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        className="font-bold text-2xl"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="m12.6 11.503l3.891 3.891l-.848.849L11.4 12V6h1.2zM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-1.2a8.8 8.8 0 1 0 0-17.6a8.8 8.8 0 0 0 0 17.6"
                        ></path>
                      </svg>
                    </div>
                    <div className="text-black text-base sm:text-lg font-medium font-['Lato'] leading-tight">
                      8 weeks
                    </div>
                  </div>

                  {/* Students enrolled */}
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 relative flex items-center overflow-hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        >
                          <circle cx={9} cy={9} r={4}></circle>
                          <path d="M16 19c0-3.314-3.134-6-7-6s-7 2.686-7 6m13-6a4 4 0 1 0-3-6.646"></path>
                          <path d="M22 19c0-3.314-3.134-6-7-6c-.807 0-2.103-.293-3-1.235"></path>
                        </g>
                      </svg>
                    </div>
                    <div className="text-black text-base sm:text-lg font-medium font-['Lato'] leading-tight">
                      2,430
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructor information */}
              <div className="flex items-start gap-4 pt-4">
                <Image
                  height={100}
                  width={100}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
                  src="/marcus.jpg"
                  alt="Instructor"
                />
                <div className="space-y-2">
                  <div className="text-black text-lg sm:text-xl font-normal font-['Unbounded'] leading-relaxed">
                    Instructor: Dr. Sarah Chen
                  </div>
                  <div className="text-black text-base sm:text-lg font-medium font-['Lato'] leading-tight max-w-2xl">
                    Former curriculum designer at Khan Academy with a PhD in
                    Educational Technology. 15+ years teaching experience.
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Course card (pricing and enrollment) */}
            <div className="w-full lg:w-96 flex-shrink-0">
              <div className="inline-flex flex-col w-full">
                {/* Course preview image */}
                <img
                  className="w-full h-48 sm:h-64 lg:h-72 object-cover rounded-t-[20px]"
                  src="/course3.jpg"
                  alt="Course preview"
                />

                {/* Card content */}
                <div className="p-4 sm:p-5 rounded-b-[20px] border border-black/60 flex flex-col gap-4 sm:gap-5 bg-white">
                  {/* Price */}
                  <div className="text-indigo-800 text-lg sm:text-xl font-normal font-['Unbounded'] leading-relaxed">
                    Price: Free
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col gap-3 sm:gap-3.5">
                    <button className="w-full px-2.5 py-3 sm:py-3.5 bg-orange-400 rounded-[10px] text-white text-base sm:text-lg font-medium font-['Lato'] leading-tight hover:bg-orange-500 transition-colors">
                      Enroll Now
                    </button>
                    <button className="w-full px-2.5 py-3 sm:py-3.5 rounded-[10px] border border-neutral-400 text-black/60 text-base sm:text-lg font-medium font-['Lato'] leading-tight hover:bg-gray-50 transition-colors">
                      Add to Wishlist
                    </button>
                  </div>

                  {/* Course features */}
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 relative overflow-hidden flex-shrink-0">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60" />
                      </div>
                      <div className="text-black/60 text-base sm:text-lg font-medium font-['Lato'] leading-tight">
                        8 weeks self-paced
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 relative overflow-hidden flex-shrink-0">
                        <div className="w-4 h-4 sm:w-4 sm:h-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60" />
                      </div>
                      <div className="text-black/60 text-base sm:text-lg font-medium font-['Lato'] leading-tight">
                        Lifetime access
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 relative overflow-hidden flex-shrink-0">
                        <div className="w-4 h-4 sm:w-4 sm:h-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60" />
                      </div>
                      <div className="text-black/60 text-base sm:text-lg font-medium font-['Lato'] leading-tight">
                        Certificate of completion
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and Content Section */}
      <div className="w-full bg-white px-4 sm:px-8 lg:px-16 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
          {/* Tab navigation */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-7">
            <button
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-[20px] text-base sm:text-lg font-medium font-['Lato'] leading-tight transition-colors ${
                activeTab === "overview"
                  ? "bg-orange-400 text-white hover:bg-orange-500"
                  : "bg-zinc-300 text-orange-400 hover:bg-zinc-400"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-[20px] text-base sm:text-lg font-medium font-['Lato'] leading-tight transition-colors ${
                activeTab === "curriculum"
                  ? "bg-orange-400 text-white hover:bg-orange-500"
                  : "bg-zinc-300 text-orange-400 hover:bg-zinc-400"
              }`}
              onClick={() => setActiveTab("curriculum")}
            >
              Curriculum
            </button>
            <button
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-[20px] text-base sm:text-lg font-medium font-['Lato'] leading-tight transition-colors ${
                activeTab === "instructor"
                  ? "bg-orange-400 text-white hover:bg-orange-500"
                  : "bg-zinc-300 text-orange-400 hover:bg-zinc-400"
              }`}
              onClick={() => setActiveTab("instructor")}
            >
              Instructor
            </button>
            <button
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-[20px] text-base sm:text-lg font-medium font-['Lato'] leading-tight transition-colors ${
                activeTab === "reviews"
                  ? "bg-orange-400 text-white hover:bg-orange-500"
                  : "bg-zinc-300 text-orange-400 hover:bg-zinc-400"
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>

          {/* Dynamic content based on active tab */}
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
