"use client";
import CourseCard from "@/components/CourseCard";
import React, { useState, useEffect } from "react";
import { courseService } from "@/services/courseService";
import { Course } from "@/types/course";

interface Filter {
  id: string;
  label: string;
}

export default function CourseFinder(): React.JSX.Element {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filters: Filter[] = [
    { id: "all", label: "All Courses" },
    { id: "everyone", label: "For Everyone" },
    { id: "professionals", label: "For Marketers" },
    { id: "creators", label: "For Creators" },
    // { id: "students", label: "For Students" },
    // { id: "educators", label: "For Educators" },
  ];

  useEffect(() => {
    console.log("CourseFinder mounted, activeFilter:", activeFilter);
    fetchCourses();
  }, [activeFilter]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Starting to fetch courses...");

      const coursesData = await courseService.getPublishedCourses(
        activeFilter === "all" ? undefined : activeFilter
      );

      console.log("Courses data received:", coursesData);
      setCourses(coursesData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      console.error("Error fetching courses:", err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterClick = (filterId: string): void => {
    console.log("Filter clicked:", filterId);
    setActiveFilter(filterId);
  };

  // Filter courses based on search query
  const filteredCourses: Course[] = courses.filter((course: Course) => {
    const matchesSearch: boolean =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getSectionTitle = (): string => {
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

  console.log("Rendering with:", {
    loading,
    coursesCount: courses.length,
    filteredCount: filteredCourses.length,
    error,
  });

  return (
    <div className="w-full min-h-screen relative bg-white overflow-hidden mt-20">
      {/* Decorative background circles */}
      <div className="lg:w-64 lg:h-64 h-48 w-48 lg:-right-30  -right-30 top-40 lg:top-36 absolute opacity-75 bg-orange-400 rounded-full " />
      <div className="lg:w-96 h-48 w-48 lg:h-96 lg:-left-72  -left-40 lg:top-32 absolute opacity-75 bg-orange-400 rounded-full " />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 pt-0 lg:pt-20 pb-16">
        {/* Main Heading */}
        <h1 className="text-center mb-6">
          <span className="block text-indigo-800 text-4xl md:text-7xl font-normal font-['Unbounded'] leading-tight">
            Find Your Perfect
          </span>
          <span className="block text-orange-400 text-4xl md:text-7xl font-normal font-['Unbounded'] leading-tight">
            Course
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-center text-black text-xl font-normal font-['Unbounded'] leading-7 mb-8">
          Industry-tailored AI courses designed for Gen Z professionals
        </p>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto px-5 py-3.5 bg-zinc-300 rounded-lg border border-neutral-400 flex items-center z-50 gap-2.5">
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
      <div className="max-w-7xl mx-auto px-2 py-10">
        {/* Error Message */}
        {/* {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>Error:</strong> {error}
            <button
              onClick={fetchCourses}
              className="ml-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )} */}

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-start items-center gap-6 mb-10">
          {filters.map((filter: Filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterClick(filter.id)}
              className={`px-5 py-2 rounded-3xl text-sm sm:text-lg font-medium font-['Lato'] transition-colors ${
                activeFilter === filter.id
                  ? "bg-orange-400 text-white hover:bg-orange-500"
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
          {getSectionTitle()} ({loading ? "..." : filteredCourses.length})
        </h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg font-['Lato']">
              Loading courses...
            </div>
          </div>
        ) : /* Course Grid */
        filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 justify-items-center">
            {filteredCourses.map((course: Course) => (
              <div key={course.id} className="w-full max-w-sm mx-auto">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg font-['Lato']">
              No courses found matching your criteria. Try a different search or
              filter.
            </p>
            {courses.length === 0 && (
              <button
                onClick={fetchCourses}
                className="mt-4 bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500"
              >
                Try Loading Again
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
