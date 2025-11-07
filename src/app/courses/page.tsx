"use client";
import CourseCard from "@/components/CourseCard";
import Image from "next/image";
import React, { useState } from "react";
import allCourses from "../data/courses";

interface CourseFilterProps {
  onFilterChange?: (filter: string) => void;
}

export default function CourseFinder({ onFilterChange }: CourseFilterProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = [
    { id: "all", label: "All Courses" },
    { id: "professionals", label: "For Professionals" },
    { id: "creators", label: "For Creators" },
    { id: "everyone", label: "For Everyone" },
  ];

  // Sample course data for all categories

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
    onFilterChange?.(filterId);
  };

  // Filter courses based on active filter and search query
  const filteredCourses = allCourses.filter((course) => {
    const matchesCategory =
      activeFilter === "all" || course.category === activeFilter;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getSectionTitle = () => {
    switch (activeFilter) {
      case "professionals":
        return "For Professionals";
      case "creators":
        return "For Creators";
      case "everyone":
        return "For Everyone";
      default:
        return "All Courses";
    }
  };

  return (
    <div className="w-full min-h-screen relative bg-white overflow-hidden mt-20">
      {/* Decorative background circles */}
      <div className="w-64 h-64 -right-30 top-36 absolute opacity-75 bg-orange-500 rounded-full " />
      <div className="w-96 h-96 -left-72 top-32 absolute opacity-75 bg-orange-500 rounded-full " />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-16">
        {/* Main Heading */}
        <h1 className="text-center mb-6">
          <span className="block text-indigo-800 text-6xl md:text-7xl font-normal font-['Unbounded'] leading-tight">
            Find Your Perfect
          </span>
          <span className="block text-orange-400 text-6xl md:text-7xl font-normal font-['Unbounded'] leading-tight">
            Course
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-center text-black text-xl font-normal font-['Unbounded'] leading-7 mb-8">
          Industry-tailored AI courses designed for Gen Z professionals
        </p>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto px-5 py-3.5 bg-zinc-300 rounded-lg border border-neutral-400 flex items-center gap-2.5">
          <div className="w-6 h-6 relative flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              className="cursor-pointer"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth={2}
                d="m21 21l-4.486-4.494M19 10.5a8.5 8.5 0 1 1-17 0a8.5 8.5 0 0 1 17 0Z"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search Courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-black text-lg font-medium font-['Lato'] outline-none placeholder:text-black"
          />
        </div>
      </div>

      {/* Course Categories and Listing Section */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-start items-center gap-6 mb-10">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterClick(filter.id)}
              className={`px-5 py-2 rounded-3xl text-lg font-medium font-['Lato'] transition-colors ${
                activeFilter === filter.id
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "bg-zinc-300 text-orange-400 hover:bg-zinc-400"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-black/50 mb-10" />

        {/* Section Title */}
        <h2 className="text-black text-xl font-normal font-['Unbounded'] leading-7 mb-7">
          {getSectionTitle()} ({filteredCourses.length})
        </h2>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                image={course.image}
                rating={course.rating}
                price={course.price}
                title={course.title}
                description={course.description}
                instructor={course.instructor}
                duration={course.duration}
                students={course.students}
                starCount={course.starCount}
                category={course.category}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg font-['Lato']">
              No courses found matching your criteria. Try a different search or
              filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
