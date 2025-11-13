// app/courses/[id]/page.tsx
"use client";
import { Award, Check, Clock10Icon, PlayIcon, ScrollText } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { allCourses } from "@/app/data/courses";
import { Course, Review } from "@/app/types/course";

export default function CourseDetailPage(): React.JSX.Element {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Get course ID from params and find the course
  const courseId: number = parseInt(params.id as string);
  const course: Course | undefined = allCourses.find(
    (c: Course) => c.id === courseId
  );

  // If course not found, redirect or show error
  if (!course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Course not found
          </h1>
          <button
            onClick={() => router.push("/courses")}
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const renderTabContent = (): React.JSX.Element | null => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            {/* What You'll Learn card */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-neutral-300 sm:border-2 sm:border-neutral-400 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
              <h2 className="text-orange-400 text-lg sm:text-xl lg:text-2xl font-medium font-['Unbounded'] leading-relaxed">
                What You&apos;ll Learn
              </h2>

              {/* Learning objectives list */}
              <div className="space-y-3 sm:space-y-4">
                {(
                  course.learningObjectives || [
                    "Use AI tools to create engaging lesson plans in minutes",
                    "Design personalized learning experiences for diverse classrooms",
                    "Integrate ChatGPT, Notion AI, and other tools into your workflow",
                    "Automate grading and feedback for assignments",
                    "Implement AI ethically and responsibly in education",
                  ]
                ).map((objective: string, index: number) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5 sm:mt-1">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 flex justify-center items-center bg-orange-400 rounded-full text-white">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white font-bold" />
                      </div>
                    </div>
                    <div className="text-black text-sm sm:text-base lg:text-lg font-sm font-['Unbounded'] leading-relaxed flex-1">
                      {objective}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements card */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-neutral-300 sm:border-2 sm:border-neutral-400 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
              <h2 className="text-orange-400 text-lg sm:text-xl lg:text-2xl font-medium font-['Unbounded'] leading-relaxed">
                Requirements
              </h2>

              {/* Requirements list */}
              <div className="space-y-3 sm:space-y-4">
                {(
                  course.requirements || [
                    "Basic computer literacy",
                    "Teaching experience (helpful but not required)",
                    "Openness to trying new tools",
                  ]
                ).map((requirement: string, index: number) => (
                  <div
                    key={index}
                    className="text-black text-sm sm:text-base lg:text-lg font-sm font-['Unbounded'] leading-relaxed"
                  >
                    {requirement}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "curriculum":
        const modules = course.modules || [
          "Week 1: Introduction to AI in Education",
          "Week 2: AI-Powered Lesson Planning",
          "Week 3: Personalized Learning with AI",
          "Week 4: Automated Assessment Tools",
          "Week 5: Ethical AI Implementation",
          "Week 6: Advanced AI Teaching Strategies",
          "Week 7: Building Your AI Toolkit",
          "Week 8: Capstone Project",
        ];

        return (
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-orange-400 text-lg sm:text-xl lg:text-2xl font-normal font-['Unbounded'] leading-relaxed">
              Course Curriculum
            </h2>

            <div className="flex flex-col gap-4 sm:gap-6">
              {modules.map((title: string, index: number) => (
                <div
                  key={index}
                  className="w-full bg-white rounded-xl sm:rounded-2xl border border-neutral-300 sm:border-2 sm:border-neutral-400 p-4 sm:p-6 relative overflow-hidden"
                >
                  {/* Module Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div className="text-orange-400 text-base sm:text-lg font-normal font-['Unbounded']">
                      Module {index + 1}: {title.split(": ")[1]}
                    </div>
                    <div className="px-3 py-1 rounded-lg border border-black/50 inline-flex justify-center items-center self-start">
                      <div className="text-black text-sm font-normal font-['Lato']">
                        2 hours
                      </div>
                    </div>
                  </div>

                  {/* Lesson Items */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <PlayIcon className="text-orange-400" />
                      <div className="text-black text-sm sm:text-base font-normal font-['Unbounded']">
                        {title}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4">
                      <PlayIcon className="text-orange-400" />
                      <div className="text-black text-sm sm:text-base font-normal font-['Unbounded']">
                        Understanding LLMs
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4">
                      <PlayIcon className="text-orange-400" />
                      <div className="text-black text-sm sm:text-base font-normal font-['Unbounded']">
                        Ethics and Best Practices
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "instructor":
        return (
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-neutral-300 sm:border-2 sm:border-neutral-400 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
              <h2 className="text-orange-400 text-lg sm:text-xl lg:text-2xl font-normal font-['Unbounded'] leading-relaxed">
                About the Instructor
              </h2>

              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <Image
                  height={120}
                  width={120}
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full flex-shrink-0 mx-auto sm:mx-0"
                  src={course.instructorImage || "/marcus.jpg"}
                  alt={course.instructor}
                />
                <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
                  <div>
                    <h3 className="text-black text-lg sm:text-xl font-bold font-['Unbounded']">
                      {course.instructor}
                    </h3>
                    <p className="text-black/60 text-sm sm:text-base font-medium font-['Lato']">
                      PhD in Educational Technology
                    </p>
                  </div>
                  <div className="text-black text-sm sm:text-base font-normal font-['Unbounded'] leading-relaxed">
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
        const reviews: Review[] = course.reviews || [
          {
            id: 1,
            studentName: "Jessica Wong",
            date: "March 2025",
            rating: 4,
            comment:
              "This course completely transformed how I approach my work. The practical examples made everything click.",
          },
          {
            id: 2,
            studentName: "David Kim",
            date: "February 2025",
            rating: 5,
            comment:
              "Best AI course I've taken. Clear explanations, great projects, and an amazing community.",
          },
        ];

        return (
          <div className="w-full flex flex-col gap-6 sm:gap-8">
            {/* Main Reviews Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-neutral-300 sm:border-2 sm:border-neutral-400 p-4 sm:p-6 lg:p-8">
              {/* Title */}
              <div className="text-orange-500 text-lg sm:text-xl lg:text-2xl font-normal font-['Unbounded'] mb-6 sm:mb-8">
                Student Reviews
              </div>

              {/* Average Rating */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="text-center sm:text-left">
                  <div className="text-black text-2xl sm:text-3xl lg:text-4xl font-normal font-['Unbounded'] mb-2">
                    {course.rating}
                  </div>
                  <div className="flex justify-center sm:justify-start items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-5 h-5 sm:w-6 sm:h-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                          className={
                            i < Math.floor(course.rating)
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }
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
                </div>
              </div>

              {/* Review Entries */}
              <div className="space-y-6 sm:space-y-8">
                {reviews.map((review: Review) => (
                  <div
                    key={review.id}
                    className="pb-6 sm:pb-8 border-b border-neutral-300 last:border-b-0 last:pb-0"
                  >
                    {/* Review header */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3 sm:mb-4">
                      <div className="text-black text-base sm:text-lg font-normal font-['Unbounded']">
                        {review.studentName}
                      </div>
                      <div className="text-black text-sm sm:text-base font-normal font-['Unbounded']">
                        {review.date}
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-3 sm:mb-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-5 h-5 sm:w-6 sm:h-6">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            className={
                              i < review.rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }
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

                    {/* Review text */}
                    <div className="text-black text-sm sm:text-base font-medium font-['Lato'] leading-relaxed">
                      {review.comment}
                    </div>
                  </div>
                ))}
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
      <div className="relative w-full bg-white overflow-hidden px-4 sm:px-8 lg:px-16 py-8 ">
        {/* Decorative background circles */}
        <div className="w-64 h-64 -right-35 top-36 hidden lg:block absolute opacity-75 bg-orange-400 rounded-full " />
        <div className="w-96 h-96 -left-72 top-32 hidden lg:block absolute opacity-75 bg-orange-400 rounded-full " />

        {/* Main content container */}
        <div className="relative max-w-7xl mx-auto pt-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left column - Course information */}
            <div className="flex-1 space-y-4 sm:space-y-6">
              {/* Course category */}
              <div className="text-indigo-800 text-xl sm:text-2xl font-medium font-['Unbounded'] leading-relaxed">
                {course.title}
              </div>

              {/* Course title and description */}
              <div className="text-black/60 text-base sm:text-lg lg:text-xl font-normal font-['Unbounded'] leading-relaxed max-w-3xl">
                {course.description}
              </div>

              {/* Rating and course stats */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                {/* Star rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
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
                    {course.rating}
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
                      {course.duration}
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
                      {course.students}
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructor information */}
              <div className="flex items-start gap-4 pt-4">
                <Image
                  height={600}
                  width={600}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
                  src={course.instructorImage || "/marcus.jpg"}
                  alt={course.instructor}
                />
                <div className="space-y-2">
                  <div className="text-black text-lg sm:text-xl font-normal font-['Unbounded'] leading-relaxed">
                    Instructor: {course.instructor}
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
                <Image
                  height={600}
                  width={600}
                  className="w-full h-48 sm:h-64 lg:h-72 object-cover rounded-t-[20px]"
                  src={course.image}
                  alt={course.title}
                />

                {/* Card content */}
                <div className="p-4 sm:p-5 rounded-b-[20px] border border-black/60 flex flex-col gap-4 sm:gap-5 bg-white">
                  {/* Price */}
                  <div className="text-indigo-800 text-lg sm:text-xl font-normal font-['Unbounded'] leading-relaxed">
                    Price: {course.price}
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
                        <Clock10Icon />
                      </div>
                      <div className="text-black/60 text-base sm:text-lg font-medium font-['Lato'] leading-tight">
                        {course.duration} self-paced
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 relative overflow-hidden flex-shrink-0">
                        <ScrollText />
                      </div>
                      <div className="text-black/60 text-base sm:text-lg font-medium font-['Lato'] leading-tight">
                        Lifetime access
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 relative overflow-hidden flex-shrink-0">
                        <Award />
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
            {["overview", "curriculum", "instructor", "reviews"].map((tab) => (
              <button
                key={tab}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-[20px] text-base sm:text-lg font-medium font-['Lato'] leading-tight transition-colors ${
                  activeTab === tab
                    ? "bg-orange-400 text-white hover:bg-orange-500"
                    : "bg-zinc-300 text-orange-400 hover:bg-zinc-400"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Dynamic content based on active tab */}
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
