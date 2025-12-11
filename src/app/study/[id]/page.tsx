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
  Pause,
  Maximize,
  Settings,
  SkipBack,
  SkipForward,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { database } from "@/lib/databaseClient";

// Declare the global YouTube IFrame API object for TypeScript
declare const YT: {
  Player: any;
  PlayerState: {
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };
};

// Extend the global Window interface so TypeScript knows about the YouTube API callback
declare global {
  interface Window {
    // Make the YT global available on window for TypeScript checks
    YT?: typeof YT;
    onYouTubeIframeAPIReady?: () => void;
  }
}

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Video player state and refs
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isYouTubeReady, setIsYouTubeReady] = useState(false);

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

  // YouTube Player API
  useEffect(() => {
    // Check if YouTube API is already loaded
    if (window.YT && window.YT.Player) {
      setIsYouTubeReady(true);
      return;
    }

    // Load YouTube IFrame API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      setIsYouTubeReady(true);
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  // Initialize YouTube player when iframe is ready and lesson changes
  useEffect(() => {
    if (!isYouTubeReady || !iframeRef.current) return;

    const currentLesson = getCurrentLesson();
    if (!currentLesson) return;

    // Destroy existing player
    if (playerRef.current) {
      playerRef.current.destroy();
    }

    // Extract video ID from YouTube URL
    const getVideoId = (url: string) => {
      const match = url.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
      );
      return match ? match[1] : null;
    };

    const videoId = getVideoId(currentLesson.content);
    if (!videoId) return;

    playerRef.current = new YT.Player(iframeRef.current, {
      videoId: videoId,
      playerVars: {
        enablejsapi: 1,
        playsinline: 1,
        modestbranding: 1,
        controls: 0,
        rel: 0,
        disablekb: 1,
        origin: window.location.origin,
        showinfo: 0,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
        onPlaybackQualityChange: onPlaybackQualityChange,
      },
    });

    // Reset player state
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setShowControls(true);
  }, [isYouTubeReady, activeModule, activeLesson]);

  const onPlayerReady = (event: any) => {
    setDuration(event.target.getDuration());
    resetControlsTimer();
  };

  const onPlayerStateChange = (event: any) => {
    const state = event.data;

    switch (state) {
      case YT.PlayerState.PLAYING:
        setIsPlaying(true);
        startProgressUpdate();
        break;
      case YT.PlayerState.PAUSED:
        setIsPlaying(false);
        stopProgressUpdate();
        break;
      case YT.PlayerState.ENDED:
        setIsPlaying(false);
        stopProgressUpdate();
        setShowControls(true);
        handleVideoEnd();
        break;
      case YT.PlayerState.BUFFERING:
        stopProgressUpdate();
        break;
      case YT.PlayerState.CUED:
        setIsPlaying(false);
        break;
    }
  };

  const onPlaybackQualityChange = (event: any) => {
    console.log("Playback quality:", event.data);
  };

  // Progress update interval
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startProgressUpdate = () => {
    stopProgressUpdate();
    progressIntervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const time = playerRef.current.getCurrentTime();
        setCurrentTime(time);

        // Update duration if it changed
        const newDuration = playerRef.current.getDuration();
        if (newDuration && newDuration !== duration) {
          setDuration(newDuration);
        }
      }
    }, 1000);
  };

  const stopProgressUpdate = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const handleVideoEnd = () => {
    // Auto-mark as completed when video ends
    const lessonId = getLessonId(activeModule, activeLesson);
    if (!completedLessons.has(lessonId)) {
      setCompletedLessons((prev) => new Set(prev).add(lessonId));
    }
  };

  // Improved auto-hide controls with better timer management
  const resetControlsTimer = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying && !isSeeking && !showResolutionMenu) {
        setShowControls(false);
      }
    }, 3000);
  };

  // Handle user interaction
  const handleUserInteraction = () => {
    resetControlsTimer();
  };

  // Player controls
  const handlePlay = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
    }
  };

  const handlePause = () => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
    handleUserInteraction();
  };

  // Enhanced seek functionality
  const handleSeek = (percent: number) => {
    if (!duration || duration === 0) return;

    const seekTime = percent * duration;
    setCurrentTime(seekTime);

    if (playerRef.current) {
      playerRef.current.seekTo(seekTime, true);
    }
  };

  // Handle click seek
  const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = Math.max(
      0,
      Math.min(1, (e.clientX - rect.left) / rect.width)
    );
    handleSeek(percent);
    handleUserInteraction();
  };

  // Handle drag seek
  const handleSeekStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsSeeking(true);
    setShowControls(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = Math.max(
      0,
      Math.min(1, (e.clientX - rect.left) / rect.width)
    );
    handleSeek(percent);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newPercent = Math.max(
        0,
        Math.min(1, (moveEvent.clientX - rect.left) / rect.width)
      );
      handleSeek(newPercent);
    };

    const handleMouseUp = () => {
      setIsSeeking(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      resetControlsTimer();
      if (isPlaying) {
        handlePlay();
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Skip forward/backward
  const handleSkip = (seconds: number) => {
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    setCurrentTime(newTime);

    if (playerRef.current) {
      playerRef.current.seekTo(newTime, true);
    }

    handleUserInteraction();
  };

  // Handle resolution change
  const handleResolutionChange = (resolution: string) => {
    setCurrentResolution(resolution);
    setShowResolutionMenu(false);

    if (playerRef.current) {
      playerRef.current.setPlaybackQuality(
        resolution === "auto" ? "default" : resolution
      );
    }

    handleUserInteraction();
  };

  // Toggle fullscreen
  const handleFullscreen = () => {
    handleUserInteraction();
    const elem = containerRef.current;
    if (!document.fullscreenElement) {
      elem?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Initialize controls timer
  useEffect(() => {
    resetControlsTimer();
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      stopProgressUpdate();
    };
  }, []);

  // Format time (seconds to MM:SS)
  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Close sidebar when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check user access
  useEffect(() => {
    checkUserAccess();
  }, [courseId, user]);

  const checkUserAccess = async () => {
    try {
      setLoading(true);

      const courseData = await courseService.getCourseById(courseId);
      setCourse(courseData);

      if (!user) {
        setHasAccess(false);
        return;
      }

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

    if (courseData.price.toLowerCase() === "free") return true;

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

  // Helper functions
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

  const renderLessonContent = (lesson: Lesson) => {
    const progressPercentage =
      duration > 0 ? (currentTime / duration) * 100 : 0;

    switch (lesson.type) {
      case "video":
        return (
          <div
            ref={containerRef}
            className="relative aspect-video bg-black rounded-lg lg:rounded-2xl overflow-hidden group"
            onMouseMove={handleUserInteraction}
            onMouseEnter={handleUserInteraction}
            onClick={handleUserInteraction}
          >
            <div id="player" ref={iframeRef} className="w-full h-full" />

            {/* Enhanced Progress Bar */}
            <div
              className={`absolute bottom-16 lg:bottom-20 left-4 right-4 lg:left-6 lg:right-6 z-30 transition-all duration-300 ${
                showControls || isSeeking
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div
                className="h-3 flex items-center cursor-pointer group/progress mb-2"
                onClick={handleSeekClick}
                onMouseDown={handleSeekStart}
              >
                <div className="w-full h-1.5 bg-gray-600/80 rounded-full group-hover/progress:h-2 transition-all duration-200">
                  <div
                    className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full relative transition-all duration-100"
                    style={{ width: `${progressPercentage}%` }}
                  >
                    <div
                      className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 lg:w-4 lg:h-4 bg-white rounded-full shadow-lg border-2 border-orange-500 transition-all duration-200 ${
                        showControls || isSeeking
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-50"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Time Display */}
              <div className="flex justify-between text-xs lg:text-sm text-white font-medium">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Enhanced Custom Controls */}
            <div
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 lg:p-6 z-20 transition-all duration-300 ${
                showControls
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex items-center justify-between">
                {/* Left Controls */}
                <div className="flex items-center gap-2 lg:gap-4">
                  <button
                    onClick={handlePlayPause}
                    className="h-10 w-10 lg:h-12 lg:w-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-all duration-200 hover:scale-105 shadow-lg"
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
                    ) : (
                      <PlayIcon className="h-4 w-4 lg:h-6 lg:w-6 text-white ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={() => handleSkip(-10)}
                    className="h-8 w-8 lg:h-10 lg:w-10 text-white/80 hover:text-white transition-all duration-200 hover:scale-110"
                    title="Skip back 10s"
                  >
                    <SkipBack className="h-4 w-4 lg:h-5 lg:w-5" />
                    <span className="sr-only">Skip back 10 seconds</span>
                  </button>

                  <button
                    onClick={() => handleSkip(10)}
                    className="h-8 w-8 lg:h-10 lg:w-10 text-white/80 hover:text-white transition-all duration-200 hover:scale-110"
                    title="Skip forward 10s"
                  >
                    <SkipForward className="h-4 w-4 lg:h-5 lg:w-5" />
                    <span className="sr-only">Skip forward 10 seconds</span>
                  </button>

                  <div className="text-white text-sm lg:text-lg font-medium ml-1 lg:ml-2 hidden sm:block">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-2 lg:gap-3">
                  {/* Resolution Selector */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowResolutionMenu(!showResolutionMenu);
                        handleUserInteraction();
                      }}
                      className="h-8 lg:h-10 px-3 lg:px-4 bg-white/20 hover:bg-white/30 rounded-lg lg:rounded-xl flex items-center justify-center transition-all duration-200 text-white text-xs lg:text-sm font-medium backdrop-blur-sm border border-white/20"
                    >
                      <Settings className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                      <span className="hidden sm:inline">
                        {
                          resolutionOptions.find(
                            (opt) => opt.value === currentResolution
                          )?.label
                        }
                      </span>
                    </button>

                    {showResolutionMenu && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setShowResolutionMenu(false)}
                        />
                        <div className="absolute bottom-10 lg:bottom-12 right-0 z-50 w-32 lg:w-40 bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700 py-2">
                          {resolutionOptions.map((option) => (
                            <button
                              key={option.value}
                              onClick={() =>
                                handleResolutionChange(option.value)
                              }
                              className={`w-full text-left px-3 lg:px-4 py-2 lg:py-3 hover:bg-white/10 transition-colors flex items-center justify-between text-xs lg:text-sm ${
                                currentResolution === option.value
                                  ? "text-orange-400 font-semibold"
                                  : "text-white"
                              }`}
                            >
                              <span>{option.label}</span>
                              {currentResolution === option.value && (
                                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-orange-400 rounded-full" />
                              )}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <button
                    onClick={handleFullscreen}
                    className="h-8 w-8 lg:h-10 lg:w-10 text-white/80 hover:text-white transition-all duration-200 hover:scale-110"
                    title={
                      isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                    }
                  >
                    <Maximize className="h-4 w-4 lg:h-5 lg:w-5" />
                    <span className="sr-only">Toggle fullscreen</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Play Overlay */}
            {!isPlaying && (
              <div
                className="absolute inset-0 bg-black/40 z-10 cursor-pointer flex items-center justify-center"
                onClick={handlePlay}
              >
                <div className="h-16 w-16 lg:h-24 lg:w-24 bg-white/90 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-2xl">
                  <PlayIcon className="h-6 w-6 lg:h-10 lg:w-10 text-black ml-1 lg:ml-2" />
                </div>
              </div>
            )}
          </div>
        );

      case "document":
      case "text":
        return (
          <div className="bg-white rounded-lg lg:rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 lg:p-8">
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-gray-800 text-sm lg:text-lg leading-relaxed bg-gray-50 p-4 lg:p-6 rounded-lg overflow-x-auto">
                  {lesson.content}
                </pre>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8 lg:py-16 text-gray-500 bg-white rounded-lg lg:rounded-2xl border border-gray-200">
            <FileText className="w-12 h-12 lg:w-20 lg:h-20 mx-auto mb-4 text-gray-300" />
            <p className="text-base lg:text-lg">
              No content available for this lesson.
            </p>
          </div>
        );
    }
  };

  // Sidebar Component
  const renderSidebar = () => (
    <div
      className={`
      fixed lg:static inset-y-0 left-0 z-50 w-80 lg:w-96 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full "}
    `}
    >
      <div className="h-full flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg lg:text-xl font-bold text-gray-900">
              Course Content
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress
              </span>
              <span className="text-sm font-semibold text-orange-400">
                {getProgressPercentage()}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>
        </div>

        {/* Modules List */}
        <div className="flex-1 overflow-y-auto">
          {course?.modules?.map((module: Module, moduleIndex: number) => (
            <div
              key={moduleIndex}
              className="border-b border-gray-200 last:border-b-0"
            >
              <button
                onClick={() => {
                  setActiveModule(moduleIndex);
                  setActiveLesson(0);
                  setIsPlaying(false);
                  if (window.innerWidth < 1024) {
                    setSidebarOpen(false);
                  }
                }}
                className={`w-full text-left p-4 lg:p-6 hover:bg-gray-50 transition-colors ${
                  activeModule === moduleIndex
                    ? "bg-orange-50 border-r-2 border-orange-400"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm lg:text-base line-clamp-2">
                      {moduleIndex + 1}. {module.title}
                    </h3>
                    <p className="text-gray-600 text-xs lg:text-sm mt-1 line-clamp-2">
                      {module.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {getModuleLessonCount(module)} lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {getModuleTotalDuration(module)} min
                      </span>
                    </div>
                  </div>
                  {isAllLessonsCompleted(moduleIndex) && (
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 ml-2" />
                  )}
                </div>
              </button>

              {/* Lessons List */}
              {module.lessons?.map((lesson: Lesson, lessonIndex: number) => {
                const lessonId = getLessonId(moduleIndex, lessonIndex);
                const isActive =
                  activeModule === moduleIndex && activeLesson === lessonIndex;
                const isCompleted = completedLessons.has(lessonId);

                return (
                  <button
                    key={lessonIndex}
                    onClick={() => {
                      setActiveModule(moduleIndex);
                      setActiveLesson(lessonIndex);
                      setIsPlaying(false);
                      if (window.innerWidth < 1024) {
                        setSidebarOpen(false);
                      }
                    }}
                    className={`w-full text-left p-3 lg:p-4 pl-8 lg:pl-12 hover:bg-gray-50 transition-colors border-l-2 ${
                      isActive
                        ? "bg-orange-50 border-orange-400"
                        : "border-transparent"
                    } ${isCompleted ? "text-green-700" : "text-gray-700"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isCompleted
                            ? "bg-green-100 border-green-400"
                            : isActive
                            ? "bg-orange-100 border-orange-400"
                            : "bg-gray-100 border-gray-300"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-3 w-3 text-green-600" />
                        ) : (
                          <div
                            className={`h-2 w-2 rounded-full ${
                              isActive ? "bg-orange-400" : "bg-gray-400"
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium line-clamp-2 ${
                            isCompleted ? "text-green-800" : "text-gray-800"
                          }`}
                        >
                          {lesson.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`text-xs ${
                              isCompleted ? "text-green-600" : "text-gray-500"
                            }`}
                          >
                            {lesson.type === "video" ? (
                              <Video className="h-3 w-3 inline mr-1" />
                            ) : (
                              <FileText className="h-3 w-3 inline mr-1" />
                            )}
                            {lesson.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const isAllLessonsCompleted = (moduleIndex: number): boolean => {
    const module = course?.modules?.[moduleIndex];
    if (!module?.lessons) return false;

    return module.lessons.every((_, lessonIndex) =>
      completedLessons.has(getLessonId(moduleIndex, lessonIndex))
    );
  };

  // Loading and access states
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
          <div className="text-gray-600">Checking course access...</div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
            Course not found
          </h1>
          <button
            onClick={() => router.push("/courses")}
            className="px-6 py-3 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors font-medium"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl lg:rounded-2xl shadow-xl border p-6 lg:p-8 text-center">
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
            <Lock className="w-8 h-8 lg:w-10 lg:h-10 text-red-500" />
          </div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-3">
            Access Required
          </h1>
          <p className="text-gray-600 mb-6 text-sm lg:text-base">
            You need to enroll in this course to access the study materials.
          </p>
          <button
            onClick={handleEnrollClick}
            className="w-full bg-orange-400 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-500 transition-colors shadow-lg"
          >
            Enroll Now
          </button>
        </div>
      </div>
    );
  }

  const currentModule = getCurrentModule();
  const currentLesson = getCurrentLesson();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <header className="bg-white shadow-sm border-b h-16">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className=" p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {sidebarOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>

              <div>
                <h1 className="text-sm md:text-base lg:text-xl font-bold text-gray-900 line-clamp-1">
                  {course.title}
                </h1>
                <p className="text-gray-600 text-xs lg:text-sm">Study Mode</p>
              </div>
            </div>

            <div className="flex items-center gap-4 lg:gap-6">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-gray-600 lg:text-sm">Progress</p>
                <p className="font-semibold text-orange-400 text-xs lg:text-sm">
                  {getProgressPercentage()}% Complete
                </p>
              </div>
              <button
                onClick={() => router.push("/courses")}
                className="px-4 lg:px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-xs lg:text-sm font-medium whitespace-nowrap"
              >
                Back to Courses
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        {renderSidebar()}

        {/* Main Content */}
        <div
          className={`flex-1 min-w-0 overflow-auto ${sidebarOpen ? "" : ""}`}
        >
          <div className="max-w-full mx-auto p-4 lg:p-8">
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm border overflow-hidden">
              {currentModule && (
                <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-4 lg:p-8 text-white">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-base lg:text-xl font-bold line-clamp-2 lg:line-clamp-1">
                        Module {activeModule + 1}: {currentModule.title}
                      </h2>
                      <p className="text-orange-100 mt-2 text-xs lg:text-sm line-clamp-2">
                        {currentModule.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 lg:gap-6 text-orange-100 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 lg:w-5 lg:h-5" />
                        <span className="font-medium text-xs lg:text-sm">
                          {getModuleTotalDuration(currentModule)} min
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 lg:w-5 lg:h-5" />
                        <span className="font-medium text-xs lg:text-sm">
                          {getModuleLessonCount(currentModule)} lessons
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentLesson ? (
                <div className="p-4 lg:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 lg:mb-8">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base lg:text-lg font-semibold text-gray-800 line-clamp-2">
                        {currentLesson.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                          {currentLesson.type === "video" ? (
                            <Video className="w-3 h-3 lg:w-4 lg:h-4" />
                          ) : (
                            <FileText className="w-3 h-3 lg:w-4 lg:h-4" />
                          )}
                          <span className="capitalize font-medium text-xs lg:text-sm">
                            {currentLesson.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                          <Clock className="w-3 h-3 lg:w-4 lg:h-4" />
                          <span className="font-medium text-xs lg:text-sm">
                            {currentLesson.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        toggleLessonCompletion(
                          getLessonId(activeModule, activeLesson)
                        )
                      }
                      className={`flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-2 lg:py-3 rounded-lg lg:rounded-xl border transition-all flex-shrink-0 ${
                        completedLessons.has(
                          getLessonId(activeModule, activeLesson)
                        )
                          ? "bg-green-50 border-green-200 text-green-700 shadow-sm"
                          : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:shadow-sm"
                      }`}
                    >
                      <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5" />
                      <span className="font-medium text-sm lg:text-base whitespace-nowrap">
                        {completedLessons.has(
                          getLessonId(activeModule, activeLesson)
                        )
                          ? "Completed"
                          : "Mark Complete"}
                      </span>
                    </button>
                  </div>

                  <div className="mb-6 lg:mb-8">
                    {renderLessonContent(currentLesson)}
                  </div>

                  <div className="flex justify-between gap-4 pt-6 lg:pt-8 border-t border-gray-200">
                    <button
                      onClick={() => {
                        if (activeLesson > 0) {
                          setActiveLesson(activeLesson - 1);
                          setIsPlaying(false);
                        } else if (activeModule > 0) {
                          const prevModule = course.modules?.[activeModule - 1];
                          if (prevModule?.lessons) {
                            setActiveModule(activeModule - 1);
                            setActiveLesson(prevModule.lessons.length - 1);
                            setIsPlaying(false);
                          }
                        }
                      }}
                      disabled={activeModule === 0 && activeLesson === 0}
                      className="flex items-center gap-2 px-4 lg:px-8 py-2 lg:py-3 border border-gray-300 rounded-lg lg:rounded-xl text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-sm lg:text-base flex-1 lg:flex-none justify-center"
                    >
                      <SkipBack className="w-4 h-4 lg:w-5 lg:h-5" />
                      <span>Previous</span>
                    </button>
                    <button
                      onClick={() => {
                        const currentModule = course.modules?.[activeModule];
                        if (
                          activeLesson <
                          (currentModule?.lessons?.length || 0) - 1
                        ) {
                          setActiveLesson(activeLesson + 1);
                          setIsPlaying(false);
                        } else if (
                          activeModule <
                          (course.modules?.length || 0) - 1
                        ) {
                          setActiveModule(activeModule + 1);
                          setActiveLesson(0);
                          setIsPlaying(false);
                        }
                      }}
                      disabled={
                        activeModule === (course.modules?.length || 0) - 1 &&
                        activeLesson ===
                          (course.modules?.[activeModule]?.lessons?.length ||
                            0) -
                            1
                      }
                      className="flex items-center gap-2 px-4 lg:px-8 py-2 lg:py-3 bg-orange-400 text-white rounded-lg lg:rounded-xl hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg text-sm lg:text-base flex-1 lg:flex-none justify-center"
                    >
                      <span>Next</span>
                      <SkipForward className="w-4 h-4 lg:w-5 lg:h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 lg:p-16 text-center text-gray-500">
                  <BookOpen className="w-12 h-12 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 text-gray-300" />
                  <p className="text-base lg:text-lg">
                    No lessons available in this module.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
