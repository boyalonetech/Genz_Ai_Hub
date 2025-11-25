"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { courseService } from "@/services/courseService";
import { Course } from "@/types/course";
import { PlayIcon, CheckCircle, BookOpen, Clock, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { database } from "@/lib/databaseClient";

export default function StudyPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const courseId = params.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [activeModule, setActiveModule] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    checkUserAccess();
  }, [courseId, user]);

  const checkUserAccess = async () => {
    try {
      setLoading(true);

      // Fetch course details
      const courseData = await courseService.getCourseById(courseId);
      setCourse(courseData);

      if (!user) {
        setHasAccess(false);
        return;
      }

      // Verify access using Supabase
      const userHasAccess = await verifyUserAccess(courseData);
      setHasAccess(userHasAccess);
    } catch (err) {
      console.error("Failed to check access:", err);
      setHasAccess(false);
    } finally {
      setLoading(false);
    }
  };

  const verifyUserAccess = async (
    courseData: Course | null
  ): Promise<boolean> => {
    if (!courseData) return false;

    // Free courses
    if (courseData.price.toLowerCase() === "free") return true;

    // Check Supabase for payments/enrollments
    if (user) {
      try {
        const { data, error } = await database
          .from("user_courses")
          .select("*")
          .eq("user_id", user.id)
          .eq("course_id", courseId)
          .eq("payment_status", "success")
          .single();

        if (error && error.code !== "PGRST116") {
          // PGRST116 is "not found"
          console.error("Error checking access:", error);
          return false;
        }

        // If record exists and payment is successful
        if (data) {
          return true;
        }
      } catch (error) {
        console.error("Error verifying access:", error);
        return false;
      }
    }

    // Optionally, allow instructors
    if (user?.user_type === "instructor") return true;

    return false; // No access
  };

  const toggleLessonCompletion = (lessonIndex: number) => {
    if (!hasAccess) return;

    setCompletedLessons((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(lessonIndex)) newSet.delete(lessonIndex);
      else newSet.add(lessonIndex);
      return newSet;
    });
  };

  const getProgressPercentage = () => {
    const totalLessons = course?.modules?.length || 0;
    return totalLessons === 0
      ? 0
      : Math.round((completedLessons.size / totalLessons) * 100);
  };

  const handleEnrollClick = () => {
    router.push(`/payment/${courseId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
          <div className="text-gray-600">Checking course access...</div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-800 mb-4">
            Course not found
          </h1>
          <button
            onClick={() => router.push("/courses")}
            className="px-6 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg border p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Access Required
          </h1>
          <p className="text-gray-600 mb-6">
            You need to enroll in this course to access the study materials.
          </p>
          <button
            onClick={handleEnrollClick}
            className="w-full bg-orange-400 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-500 transition-colors"
          >
            Enroll Now
          </button>
        </div>
      </div>
    );
  }

  // If user has access, render full course content
  return (
    <div className="flex items-center justify-center  w-full min-h-screen bg-gray-50">
      {/* Render your study page here exactly as in your original code */}
      {/* ... */}
      Study
    </div>
  );
}
