"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { courseService } from "@/services/courseService";
import { Course, Module, Lesson } from "@/types/course";
import {
  PlayIcon,
  CheckCircle,
  BookOpen,
  Clock,
  Lock,
  FileText,
  Video,
} from "lucide-react";
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
  const [activeLesson, setActiveLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set()
  );

  // Video player state and refs
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Resolution state
  const [showResolutionMenu, setShowResolutionMenu] = useState(false);
  const [currentResolution, setCurrentResolution] = useState("auto");

  const resolutionOptions = [
    { label: "Auto", value: "auto" },
    { label: "1080p", value: "hd1080" },
    { label: "720p", value: "hd720" },
    { label: "480p", value: "large" },
    { label: "360p", value: "medium" },
    { label: "240p", value: "small" },
  ];

  // Auto-hide controls
  useEffect(() => {
    if (!showControls) return;

    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showControls, isPlaying, currentTime]);

  // Show controls on mouse move
  const handleMouseMove = () => {
    setShowControls(true);
  };

  // Send play command to YouTube iframe
  const handlePlay = () => {
    setIsPlaying(true);
    setShowControls(true);
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: "playVideo" }),
      "*"
    );
  };

  // Send pause command to YouTube iframe
  const handlePause = () => {
    setIsPlaying(false);
    setShowControls(true);
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: "pauseVideo" }),
      "*"
    );
  };

  // Toggle fullscreen
  const handleFullscreen = () => {
    setShowControls(true);
    const elem = containerRef.current;
    if (!document.fullscreenElement) {
      elem?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // Handle seek
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;

    setShowControls(true);
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const percent = Math.max(
      0,
      Math.min(1, (e.clientX - rect.left) / rect.width)
    );
    const seekTime = percent * duration;

    setCurrentTime(seekTime);
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func: "seekTo",
        args: [seekTime, true],
      }),
      "*"
    );
  };

  // Handle drag seek
  const handleSeekStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsSeeking(true);
    setShowControls(true);
    handleSeek(e);
  };

  const handleSeekMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSeeking) return;
    handleSeek(e);
  };

  const handleSeekEnd = () => {
    setIsSeeking(false);
  };

  // Handle resolution change
  const handleResolutionChange = (resolution: string) => {
    setCurrentResolution(resolution);
    setShowResolutionMenu(false);
    setShowControls(true);

    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func: "setPlaybackQuality",
          args: [resolution === "auto" ? "default" : resolution],
        }),
        "*"
      );
    }
  };

  // Listen for YouTube player state changes
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);

        if (data.event === "infoDelivery" && data.info) {
          // Update current time and duration
          if (data.info.currentTime !== undefined) {
            setCurrentTime(data.info.currentTime);
          }
          if (data.info.duration !== undefined) {
            setDuration(data.info.duration);
          }
          if (data.info.playerState !== undefined) {
            setIsPlaying(data.info.playerState === 1);
          }
        }
      } catch (error) {
        // Not a JSON message or not from YouTube
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Format time (seconds to MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

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
          console.error("Error checking access:", error);
          return false;
        }

        if (data) {
          return true;
        }
      } catch (error) {
        console.error("Error verifying access:", error);
        return false;
      }
    }

    if (user?.user_type === "instructor") return true;

    return false;
  };

  const toggleLessonCompletion = (lessonId: string) => {
    if (!hasAccess) return;

    setCompletedLessons((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(lessonId)) newSet.delete(lessonId);
      else newSet.add(lessonId);
      return newSet;
    });
  };

  const getProgressPercentage = () => {
    if (!course || !course.modules || !Array.isArray(course.modules)) return 0;

    const totalLessons = course.modules.reduce(
      (total: number, module: Module) => {
        return total + (module.lessons?.length || 0);
      },
      0
    );

    return totalLessons === 0
      ? 0
      : Math.round((completedLessons.size / totalLessons) * 100);
  };

  const handleEnrollClick = () => {
    router.push(`/payment/${courseId}`);
  };

  const renderLessonContent = (lesson: Lesson) => {
    const progressPercentage =
      duration > 0 ? (currentTime / duration) * 100 : 0;

    switch (lesson.type) {
      case "video":
        return (
          <div
            ref={containerRef}
            className="relative aspect-video bg-black rounded-lg overflow-hidden group"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setShowControls(true)}
          >
            <iframe
              ref={iframeRef}
              src={
                lesson.content +
                "?enablejsapi=1&playsinline=1&modestbranding=1&controls=0&rel=0&disablekb=1"
              }
              className="w-full h-full pointer-events-none"
              title={lesson.title}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            />

            {/* Progress Bar */}
            <div
              className={`absolute bottom-20 left-4 right-4 h-3 bg-gray-600/80 rounded-full cursor-pointer z-20 transition-opacity duration-300 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
              onClick={handleSeek}
              onMouseDown={handleSeekStart}
              onMouseMove={handleSeekMove}
              onMouseUp={handleSeekEnd}
              onMouseLeave={handleSeekEnd}
            >
              <div
                className="h-full bg-orange-500 rounded-full transition-all duration-100"
                style={{ width: `${progressPercentage}%` }}
              />
              <div
                className={`absolute top-1/2 w-4 h-4 bg-white rounded-full -mt-2 -ml-2 shadow-lg cursor-pointer transition-opacity ${
                  showControls ? "opacity-100" : "opacity-0"
                }`}
                style={{ left: `${progressPercentage}%` }}
              />
            </div>

            {/* Time Display */}
            <div
              className={`absolute bottom-24 left-4 text-white text-sm font-medium z-20 transition-opacity duration-300 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
            >
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            {/* Custom Controls */}
            <div
              className={`absolute bottom-4 left-4 right-4 flex items-center justify-between z-20 transition-opacity duration-300 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex items-center gap-4">
                {!isPlaying ? (
                  <button
                    onClick={handlePlay}
                    className="h-12 w-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white ml-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={handlePause}
                    className="h-12 w-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  </button>
                )}

                <button
                  onClick={handleFullscreen}
                  className="h-12 w-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                  </svg>
                </button>
              </div>

              {/* Resolution Selector */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowResolutionMenu(!showResolutionMenu);
                    setShowControls(true);
                  }}
                  className="h-12 px-4 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors text-white font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 12H9.5v-2h-2v2H6V9h1.5v2.5h2V9H11v6zm2-6h4c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1h-4V9zm1.5 4.5h2v-3h-2v3z" />
                  </svg>
                  {
                    resolutionOptions.find(
                      (opt) => opt.value === currentResolution
                    )?.label
                  }
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 ml-2 transition-transform ${
                      showResolutionMenu ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </button>

                {/* Resolution Dropdown Menu */}
                {showResolutionMenu && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowResolutionMenu(false)}
                    />

                    {/* Menu */}
                    <div className="absolute bottom-14 right-0 z-20 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                      {resolutionOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleResolutionChange(option.value)}
                          className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center justify-between ${
                            currentResolution === option.value
                              ? "bg-orange-50 text-orange-600 font-medium"
                              : "text-gray-700"
                          }`}
                        >
                          <span>{option.label}</span>
                          {currentResolution === option.value && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-orange-500"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Overlay when paused */}
            {!isPlaying && (
              <div
                className="absolute inset-0 bg-black/40 z-10 cursor-pointer flex items-center justify-center"
                onClick={handlePlay}
              >
                <div className="h-20 w-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-black ml-1"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        );

      case "document":
      case "text":
        return (
          <div className="prose max-w-none">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <pre className="whitespace-pre-wrap font-sans text-gray-800">
                {lesson.content}
              </pre>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>No content available for this lesson.</p>
          </div>
        );
    }
  };

  // ... rest of the component code remains the same
  const getCurrentModule = (): Module | null => {
    if (!course?.modules || !Array.isArray(course.modules)) return null;
    return course.modules[activeModule] || null;
  };

  const getCurrentLesson = (): Lesson | null => {
    const module = getCurrentModule();
    if (!module?.lessons || !Array.isArray(module.lessons)) return null;
    return module.lessons[activeLesson] || null;
  };

  const getLessonId = (moduleIndex: number, lessonIndex: number): string => {
    return `${moduleIndex}-${lessonIndex}`;
  };

  // Safe navigation functions
  const getModuleLessonCount = (module: Module): number => {
    return module.lessons?.length || 0;
  };

  const getModuleTotalDuration = (module: Module): number => {
    if (!module.lessons || !Array.isArray(module.lessons)) return 0;

    return module.lessons.reduce((total: number, lesson: Lesson) => {
      const minutes = parseInt(lesson.duration) || 0;
      return total + minutes;
    }, 0);
  };

  const getTotalModules = (): number => {
    return course?.modules?.length || 0;
  };

  const hasLessonsInModule = (moduleIndex: number): boolean => {
    if (!course?.modules || !Array.isArray(course.modules)) return false;
    const module = course.modules[moduleIndex];
    return !!(
      module?.lessons &&
      Array.isArray(module.lessons) &&
      module.lessons.length > 0
    );
  };

  const getLessonsInModule = (moduleIndex: number): Lesson[] => {
    if (!course?.modules || !Array.isArray(course.modules)) return [];
    const module = course.modules[moduleIndex];
    return module?.lessons || [];
  };

  const isAllLessonsCompleted = (moduleIndex: number): boolean => {
    const lessons = getLessonsInModule(moduleIndex);
    if (lessons.length === 0) return false;

    return lessons.every((_, lessonIndex) =>
      completedLessons.has(getLessonId(moduleIndex, lessonIndex))
    );
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

  const currentModule = getCurrentModule();
  const currentLesson = getCurrentLesson();
  const totalModules = getTotalModules();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {course.title}
              </h1>
              <p className="text-gray-600">Study Mode</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Progress</p>
                <p className="font-semibold text-orange-400">
                  {getProgressPercentage()}% Complete
                </p>
              </div>
              <button
                onClick={() => router.push("/courses")}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Back to Courses
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Course Content */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Course Content
              </h2>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Course Progress</span>
                  <span>{getProgressPercentage()}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
              </div>

              {/* Modules List */}
              <div className="space-y-4">
                {course.modules?.map((module, moduleIndex) => (
                  <div
                    key={moduleIndex}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => {
                        setActiveModule(moduleIndex);
                        setActiveLesson(0);
                        setIsPlaying(false); // Reset video state when changing modules
                      }}
                      className={`w-full text-left p-3 transition-colors ${
                        activeModule === moduleIndex
                          ? "bg-orange-50 border-orange-200 text-orange-700"
                          : "bg-white hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">
                          Module {moduleIndex + 1}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {getModuleLessonCount(module)} lessons
                          </span>
                          {isAllLessonsCompleted(moduleIndex) && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                        {module.title}
                      </p>
                    </button>

                    {/* Lessons in this module */}
                    {activeModule === moduleIndex &&
                      hasLessonsInModule(moduleIndex) && (
                        <div className="border-t border-gray-200 bg-gray-50">
                          {getLessonsInModule(moduleIndex).map(
                            (lesson, lessonIndex) => (
                              <div
                                key={lessonIndex}
                                className={`group flex items-center justify-between p-3 text-sm transition-colors ${
                                  activeLesson === lessonIndex
                                    ? "bg-orange-100 text-orange-700"
                                    : "hover:bg-gray-100 text-gray-600"
                                }`}
                              >
                                <button
                                  onClick={() => {
                                    setActiveLesson(lessonIndex);
                                    setIsPlaying(false); // Reset video state when changing lessons
                                  }}
                                  className="flex items-center space-x-2 flex-1 text-left"
                                >
                                  {lesson.type === "video" ? (
                                    <Video className="w-4 h-4 flex-shrink-0" />
                                  ) : (
                                    <FileText className="w-4 h-4 flex-shrink-0" />
                                  )}
                                  <span className="flex-1 truncate">
                                    {lesson.title}
                                  </span>
                                </button>
                                <div className="flex items-center space-x-2 ml-2">
                                  <span className="text-xs text-gray-500">
                                    {lesson.duration}
                                  </span>
                                  <div
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleLessonCompletion(
                                        getLessonId(moduleIndex, lessonIndex)
                                      );
                                    }}
                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                                      completedLessons.has(
                                        getLessonId(moduleIndex, lessonIndex)
                                      )
                                        ? "bg-green-500 border-green-500 text-white"
                                        : "border-gray-300 text-transparent hover:border-green-400"
                                    }`}
                                  >
                                    <CheckCircle className="w-3 h-3" />
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              {/* Module Header */}
              {currentModule && (
                <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">
                        Module {activeModule + 1}: {currentModule.title}
                      </h2>
                      <p className="text-orange-100 mt-1">
                        {currentModule.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 text-orange-100">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{getModuleTotalDuration(currentModule)} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>
                          {getModuleLessonCount(currentModule)} lessons
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Lesson Content */}
              {currentLesson ? (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {currentLesson.title}
                      </h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          {currentLesson.type === "video" ? (
                            <Video className="w-4 h-4" />
                          ) : (
                            <FileText className="w-4 h-4" />
                          )}
                          <span className="capitalize">
                            {currentLesson.type}
                          </span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{currentLesson.duration}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        toggleLessonCompletion(
                          getLessonId(activeModule, activeLesson)
                        )
                      }
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                        completedLessons.has(
                          getLessonId(activeModule, activeLesson)
                        )
                          ? "bg-green-50 border-green-200 text-green-700"
                          : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>
                        {completedLessons.has(
                          getLessonId(activeModule, activeLesson)
                        )
                          ? "Completed"
                          : "Mark Complete"}
                      </span>
                    </button>
                  </div>

                  {/* Lesson Content */}
                  <div className="mb-8">
                    {renderLessonContent(currentLesson)}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between pt-6 border-t border-gray-200">
                    <button
                      onClick={() => {
                        if (activeLesson > 0) {
                          setActiveLesson(activeLesson - 1);
                          setIsPlaying(false); // Reset video state
                        } else if (activeModule > 0) {
                          const prevModule = course.modules?.[activeModule - 1];
                          if (prevModule?.lessons) {
                            setActiveModule(activeModule - 1);
                            setActiveLesson(prevModule.lessons.length - 1);
                            setIsPlaying(false); // Reset video state
                          }
                        }
                      }}
                      disabled={activeModule === 0 && activeLesson === 0}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => {
                        const currentModule = course.modules?.[activeModule];
                        if (
                          activeLesson <
                          (currentModule?.lessons?.length || 0) - 1
                        ) {
                          setActiveLesson(activeLesson + 1);
                          setIsPlaying(false); // Reset video state
                        } else if (
                          activeModule <
                          (course.modules?.length || 0) - 1
                        ) {
                          setActiveModule(activeModule + 1);
                          setActiveLesson(0);
                          setIsPlaying(false); // Reset video state
                        }
                      }}
                      disabled={
                        activeModule === (course.modules?.length || 0) - 1 &&
                        activeLesson ===
                          (course.modules?.[activeModule]?.lessons?.length ||
                            0) -
                            1
                      }
                      className="px-6 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center text-gray-500">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>No lessons available in this module.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
