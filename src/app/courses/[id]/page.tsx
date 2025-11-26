"use client";
import { Award, Check, Clock10Icon, PlayIcon, ScrollText } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { courseService } from "@/services/courseService";
import { Course, Module, Lesson } from "@/types/course";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const courseId = params.id as string;

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      setError(null);
      const courseData = await courseService.getCourseById(courseId);
      setCourse(courseData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch course");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-gray-500">Loading course...</div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            {error || "Course not found"}
          </h1>
          <button
            onClick={() => router.push("/courses")}
            className="mt-4 px-6 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors text-sm sm:text-base"
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
            <div className="bg-white rounded-xl sm:rounded-2xl border border-neutral-300 sm:border-2 sm:border-neutral-400 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
              <h2 className="text-orange-400 text-lg sm:text-xl lg:text-2xl font-medium font-['Unbounded'] leading-relaxed">
                What You&apos;ll Learn
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {(
                  course.learning_objectives || [
                    "Use AI tools to create engaging lesson plans in minutes",
                    "Design personalized learning experiences for diverse classrooms",
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

            <div className="bg-white rounded-xl sm:rounded-2xl border border-neutral-300 sm:border-2 sm:border-neutral-400 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
              <h2 className="text-orange-400 text-lg sm:text-xl lg:text-2xl font-medium font-['Unbounded'] leading-relaxed">
                Requirements
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {(
                  course.requirements || [
                    "Basic computer literacy",
                    "Teaching experience (helpful but not required)",
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
        const modules = course.modules || [];

        return (
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-orange-400 text-lg sm:text-xl lg:text-2xl font-normal font-['Unbounded'] leading-relaxed">
              Course Curriculum
            </h2>
            <div className="flex flex-col gap-4 sm:gap-6">
              {modules.length > 0 ? (
                modules.map((module: Module, index: number) => {
                  // Calculate total duration for the module
                  const totalDuration = module.lessons?.reduce((total, lesson) => {
                    const minutes = parseInt(lesson.duration) || 0;
                    return total + minutes;
                  }, 0) || 0;

                  return (
                    <div
                      key={index}
                      className="w-full bg-white rounded-xl sm:rounded-2xl border border-neutral-300 sm:border-2 sm:border-neutral-400 p-4 sm:p-6 relative overflow-hidden"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                        <div className="text-orange-400 text-base sm:text-lg font-normal font-['Unbounded']">
                          Module {index + 1}: {module.title}
                        </div>
                        <div className="px-3 py-1 rounded-lg border border-black/50 inline-flex justify-center items-center self-start">
                          <div className="text-black text-sm font-normal font-['Lato']">
                            {totalDuration} min
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        {module.lessons?.map((lesson: Lesson, lessonIndex: number) => (
                          <div key={lessonIndex} className="flex items-center gap-3 sm:gap-4">
                            <PlayIcon className="text-orange-400 w-5 h-5" />
                            <div className="text-black text-sm sm:text-base font-normal font-['Unbounded']">
                              {lesson.title}
                            </div>
                            <div className="ml-auto text-sm text-gray-500">
                              {lesson.duration}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No curriculum available for this course.</p>
                </div>
              )}
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
                  src={course.instructor_image || "/marcus.jpg"}
                  alt={course.instructor}
                />
                <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
                  <div>
                    <h3 className="text-black text-lg sm:text-xl font-bold font-['Unbounded']">
                      {course.instructor}
                    </h3>
                    <p className="text-black/60 text-sm sm:text-base font-medium font-['Lato']">
                      Expert Instructor
                    </p>
                  </div>
                  <div className="text-black text-sm sm:text-base font-normal font-['Unbounded'] leading-relaxed">
                    {course.instructor} is an experienced professional with
                    practical industry knowledge and teaching expertise.
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "reviews":
        // Use the reviews from course data or empty array
        // const reviews = course.reviews || [];

        return (
          <div className="w-full flex flex-col gap-6 sm:gap-8">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-neutral-300 sm:border-2 sm:border-neutral-400 p-4 sm:p-6 lg:p-8">
              <div className="text-orange-400 text-lg sm:text-xl lg:text-2xl font-normal font-['Unbounded'] mb-6 sm:mb-8">
                Student Reviews
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="text-center sm:text-left">
                  <div className="text-black text-2xl sm:text-3xl lg:text-4xl font-normal font-['Unbounded'] mb-2">
                    {course.rating || 0}
                  </div>
                  <div className="flex justify-center sm:justify-start items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-5 h-5 sm:w-6 sm:h-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                          className={
                            i < Math.floor(course.rating || 0)
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

              {/* <div className="space-y-6 sm:space-y-8">
                {reviews.length > 0 ? (
                  reviews.map((review: any) => (
                    <div
                      key={review.id}
                      className="pb-6 sm:pb-8 border-b border-neutral-300 last:border-b-0 last:pb-0"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3 sm:mb-4">
                        <div className="text-black text-base sm:text-lg font-normal font-['Unbounded']">
                          {review.student_name}
                        </div>
                        <div className="text-black text-sm sm:text-base font-normal font-['Unbounded']">
                          {review.date}
                        </div>
                      </div>
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
                      <div className="text-black text-sm sm:text-base font-medium font-['Lato'] leading-relaxed">
                        {review.comment}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      No reviews yet. Be the first to review this course!
                    </p>
                  </div>
                )}
              </div> */}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Format price display
  const formatPrice = (price: string) => {
    if (price.toLowerCase() === 'free') {
      return 'Free';
    }
    // Check if price is already formatted with ₦
    if (price.includes('₦')) {
      return price;
    }
    // Add ₦ prefix if it's a numeric price
    if (!isNaN(Number(price.replace(/[^0-9.]/g, '')))) {
      return `₦${price}`;
    }
    return price;
  };

  return (
    <div className="w-full min-h-screen bg-white -mt-20 lg:-mt-0">
      <div className="relative w-full bg-white overflow-hidden px-4 sm:px-8 lg:px-16 py-8 ">
        <div className="w-64 h-64 -right-35 top-36 hidden lg:block absolute opacity-75 bg-orange-400 rounded-full " />
        <div className="w-96 h-96 -left-72 top-32 hidden lg:block absolute opacity-75 bg-orange-400 rounded-full " />

        <div className="relative max-w-7xl mx-auto pt-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="flex-1 space-y-4 sm:space-y-6">
              <div className="text-indigo-800 text-xl sm:text-2xl font-medium font-['Unbounded'] leading-relaxed">
                {course.title}
              </div>

              <div className="text-black/60 text-base sm:text-lg lg:text-xl font-normal font-['Unbounded'] leading-relaxed max-w-3xl">
                {course.description}
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
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
                    {course.rating || 0}
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
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

              <div className="flex items-start gap-4 pt-4">
                <Image
                  height={600}
                  width={600}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
                  src={course.instructor_image || "/marcus.jpg"}
                  alt={course.instructor}
                />
                <div className="space-y-2">
                  <div className="text-black text-lg sm:text-xl font-normal font-['Unbounded'] leading-relaxed">
                    Instructor: {course.instructor}
                  </div>
                  <div className="text-black text-base sm:text-lg font-medium font-['Lato'] leading-tight max-w-2xl">
                    Experienced professional with practical industry knowledge
                    and teaching expertise.
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-96 flex-shrink-0">
              <div className="flex flex-col w-full bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Image */}
                <div className="relative h-48 sm:h-64 lg:h-72">
                  <Image
                    height={600}
                    width={600}
                    className="w-full h-full object-cover"
                    src={course.image}
                    alt={course.title}
                  />

                  {/* Price Badge */}
                  <span className="absolute top-3 left-3 bg-orange-400 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg drop-shadow-xl">
                    {formatPrice(course.price)}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col gap-6">
                  {/* CTA Buttons */}
                  <div className="flex flex-col gap-3">
                    <button
                      className="w-full py-3.5 bg-orange-400 rounded-xl text-white text-lg font-semibold hover:bg-orange-500 transition-all duration-200"
                      onClick={() => router.push(`/payment/${course.id}`)}
                    >
                      Enroll Now
                    </button>
                    <button className="w-full py-3.5 border border-gray-300 rounded-xl text-gray-700 text-lg font-medium hover:bg-gray-100 transition-all duration-200">
                      Add to Wishlist
                    </button>
                  </div>

                  {/* Course Info */}
                  <div className="flex flex-col gap-4">
                    {/* Duration */}
                    <div className="flex items-center gap-3">
                      <Clock10Icon className="w-6 h-6 text-gray-700" />
                      <span className="text-gray-700 text-base sm:text-medium font-medium">
                        {course.duration} self-paced
                      </span>
                    </div>

                    {/* Lifetime Access */}
                    <div className="flex items-center gap-3">
                      <ScrollText className="w-6 h-6 text-gray-700" />
                      <span className="text-gray-700 text-base sm:text-medium font-medium">
                        Lifetime access
                      </span>
                    </div>

                    {/* Certificate */}
                    <div className="flex items-center gap-3">
                      <Award className="w-6 h-6 text-gray-700" />
                      <span className="text-gray-700 text-base sm:text-medium font-medium">
                        Certificate of completion
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white px-4 sm:px-8 lg:px-16 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
          <div className="flex flex-wrap items-center gap-4 sm:gap-7">
            {["overview", "curriculum", "instructor", "reviews"].map((tab) => (
              <button
                key={tab}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-[20px] text-base sm:text-lg font-medium font-['Lato'] leading-tight transition-colors ${
                  activeTab === tab
                    ? "bg-orange-400 text-white hover:bg-orange-400"
                    : "bg-zinc-300 text-orange-400 hover:bg-zinc-400"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}