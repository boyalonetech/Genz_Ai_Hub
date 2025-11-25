"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { courseService } from "@/services/courseService";
import { Course } from "@/types/course";

export default function PaymentSuccessPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const courseData = await courseService.getCourseById(courseId);
      setCourse(courseData);
    } catch (error) {
      console.error("Failed to fetch course:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Enrollment Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            You have successfully enrolled in <strong>{course?.title}</strong>
          </p>

          <div className="space-y-3">
            <button
              onClick={() => router.push(`/courses/${courseId}`)}
              className="w-full bg-orange-400 text-white py-3 px-4 rounded-lg hover:bg-orange-500 transition-colors font-semibold"
            >
              Start Learning
            </button>

            <button
              onClick={() => router.push("/courses")}
              className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Browse More Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
