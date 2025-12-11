// app/dashboard/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { courseService } from "@/services/courseService";
import { Course } from "@/types/course";
import {
  BookOpen,
  Play,
  Clock,
  CheckCircle,
  Heart,
  Users,
  Award,
  BarChart3,
} from "lucide-react";
import Image from "next/image";

const Dashboard: React.FC = () => {
  const { user, loading } = useProtectedRoute();
  const { logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState<
    (Course & { progress: number; lastAccessed: string; completed: boolean })[]
  >([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    inProgressCourses: 0,
    learningTime: "0h 0m",
  });
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    if (user) {
      fetchEnrolledCourses();
    }
  }, [user]);

  const fetchEnrolledCourses = async () => {
    try {
      setLoadingCourses(true);
      // For demo purposes, using sample enrolled courses
      const allCourses = await courseService.getCourses();
      // Simulate enrolled courses (first 2 courses)
      const enrolled = allCourses.slice(0, 2).map((course) => ({
        ...course,
        progress: Math.floor(Math.random() * 100),
        lastAccessed: new Date().toISOString(),
        completed: Math.random() > 0.7,
      }));
      setEnrolledCourses(enrolled);

      // Calculate stats
      setStats({
        totalCourses: enrolled.length,
        completedCourses: enrolled.filter((c) => c.progress === 100).length,
        inProgressCourses: enrolled.filter(
          (c) => c.progress > 0 && c.progress < 100
        ).length,
        learningTime: `${Math.floor(enrolled.length * 2.5)}h ${
          enrolled.length * 15
        }m`,
      });
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    } finally {
      setLoadingCourses(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navigateTo = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const continueLearning = (courseId: string) => {
    router.push(`/study/${courseId}`);
  };

  const viewCourse = (courseId: string) => {
    router.push(`/courses/${courseId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center py-3 sm:py-4">
            {/* Mobile Menu Button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Logo/Title */}
            <div className="flex-1 sm:flex-none">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 text-center sm:text-left">
                Dashboard
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center space-x-4">
              <button
                onClick={() => navigateTo("/courses")}
                className="text-gray-700 hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Browse Courses
              </button>
              <button
                onClick={() => navigateTo("/wishlist")}
                className="text-gray-700 hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Wishlist
              </button>
            </div>

            {/* Desktop User Info & Logout */}
            <div className="hidden sm:flex items-center space-x-3 lg:space-x-4">
              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.first_name[0]}
                    {user.last_name[0]}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 hidden lg:block">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user.user_type}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center px-2 sm:px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 transition-colors"
              >
                <svg
                  className="w-4 h-4 sm:mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>

            {/* Mobile User Avatar */}
            <div className="sm:hidden">
              <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user.first_name[0]}
                {user.last_name[0]}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="sm:hidden border-t border-gray-200 py-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-white font-semibold text-base">
                    {user.first_name[0]}
                    {user.last_name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user.user_type}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <button
                  onClick={() => navigateTo("/courses")}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Browse Courses
                </button>
                <button
                  onClick={() => navigateTo("/wishlist")}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  My Wishlist
                </button>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-4 sm:py-6 px-3 sm:px-4 lg:px-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Welcome Section */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Welcome back, {user.first_name}!
                  </h1>
                  <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                    {user.user_type === "instructor"
                      ? "Manage your courses and track student progress."
                      : "Continue your learning journey."}
                  </p>
                </div>
                <div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      user.user_type === "instructor"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {user.user_type === "instructor"
                      ? "👨‍🏫 Instructor"
                      : "👨‍🎓 Student"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Enrolled Courses Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-4 sm:p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="ml-4 flex-1 min-w-0">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Enrolled Courses
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.totalCourses}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* In Progress Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-4 sm:p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="ml-4 flex-1 min-w-0">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        In Progress
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.inProgressCourses}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Completed Courses Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-4 sm:p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="ml-4 flex-1 min-w-0">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Completed
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.completedCourses}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Time Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-4 sm:p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="ml-4 flex-1 min-w-0">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Learning Time
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.learningTime}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enrolled Courses Section */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-4 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                My Enrolled Courses
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Continue your learning journey
              </p>
            </div>
            <div className="border-t border-gray-200">
              {loadingCourses ? (
                <div className="px-4 py-8 text-center">
                  <div className="text-gray-500">Loading your courses...</div>
                </div>
              ) : enrolledCourses.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    No courses enrolled yet
                  </h4>
                  <p className="text-gray-500 mb-4">
                    Start your learning journey by enrolling in a course
                  </p>
                  <button
                    onClick={() => navigateTo("/courses")}
                    className="bg-orange-400 text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition-colors"
                  >
                    Browse Courses
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {enrolledCourses.map((course) => (
                    <div
                      key={course.id}
                      className="px-4 py-4 sm:px-6 hover:bg-gray-50"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="flex-shrink-0 w-16 h-16 relative">
                            <Image
                              src={course.image || "/course-placeholder.jpg"}
                              alt={course.title}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base font-medium text-gray-900 truncate">
                              {course.title}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                              Progress: {course.progress}%
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <div
                                className="bg-orange-400 h-2 rounded-full"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => continueLearning(course.id)}
                            className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition-colors text-sm font-medium"
                          >
                            Continue
                          </button>
                          <button
                            onClick={() => viewCourse(course.id)}
                            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-4 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Quick Actions
              </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-4 sm:p-6">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
                <button
                  onClick={() => navigateTo("/courses")}
                  className="inline-flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 transition-colors w-full"
                >
                  <BookOpen className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0" />
                  <span className="text-center flex-1">Browse Courses</span>
                </button>
                <button
                  onClick={() => navigateTo("/wishlist")}
                  className="inline-flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 transition-colors w-full"
                >
                  <Heart className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0" />
                  <span className="text-center flex-1">My Wishlist</span>
                </button>
                <button className="inline-flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 transition-colors w-full">
                  <BarChart3 className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0" />
                  <span className="text-center flex-1">Progress</span>
                </button>
                <button className="inline-flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 transition-colors w-full">
                  <Award className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0" />
                  <span className="text-center flex-1">Certificates</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
