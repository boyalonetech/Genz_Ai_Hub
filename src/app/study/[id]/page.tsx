'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { courseService } from '@/services/courseService';
import { Course } from '@/types/course';
import { PlayIcon, CheckCircle, BookOpen, Clock } from 'lucide-react';
import Image from 'next/image';

export default function StudyPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const courseData = await courseService.getCourseById(courseId);
      setCourse(courseData);
    } catch (err) {
      console.error('Failed to load course:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleLessonCompletion = (lessonIndex: number) => {
    setCompletedLessons(prev => {
      const newSet = new Set(prev);
      if (newSet.has(lessonIndex)) {
        newSet.delete(lessonIndex);
      } else {
        newSet.add(lessonIndex);
      }
      return newSet;
    });
  };

  const getProgressPercentage = () => {
    const totalLessons = course?.modules?.length || 0;
    if (totalLessons === 0) return 0;
    return Math.round((completedLessons.size / totalLessons) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading course content...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-800 mb-4">Course not found</h1>
          <button
            onClick={() => router.push('/courses')}
            className="px-6 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const modules = course.modules || [
    'Week 1: Introduction to AI in Education',
    'Week 2: AI-Powered Lesson Planning',
    'Week 3: Personalized Learning with AI',
    'Week 4: Automated Assessment Tools',
  ];

  const lessons = [
    'Introduction to the Course',
    'Understanding Key Concepts',
    'Practical Applications',
    'Advanced Techniques',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
              <p className="text-gray-600">Study Mode</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Progress</p>
                <p className="font-semibold text-orange-400">{getProgressPercentage()}% Complete</p>
              </div>
              <button
                onClick={() => router.push('/courses')}
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
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Course Content</h2>
              
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
              <div className="space-y-2">
                {modules.map((module, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveModule(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      activeModule === index
                        ? 'bg-orange-50 border border-orange-200 text-orange-700'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Module {index + 1}</span>
                      {completedLessons.has(index) && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                      {module.split(': ')[1]}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              {/* Module Header */}
              <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Module {activeModule + 1}</h2>
                    <p className="text-orange-100 mt-1">{modules[activeModule]}</p>
                  </div>
                  <div className="flex items-center space-x-4 text-orange-100">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>2 hours</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{lessons.length} lessons</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lessons List */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Lessons</h3>
                <div className="space-y-3">
                  {lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lessonIndex}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleLessonCompletion(lessonIndex)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            completedLessons.has(lessonIndex)
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300 text-transparent'
                          }`}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <div className="flex items-center space-x-3">
                          <PlayIcon className="w-5 h-5 text-orange-400" />
                          <span className="font-medium text-gray-800">{lesson}</span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">15 min</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lesson Content */}
              <div className="border-t border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {lessons[0]} {/* First lesson content */}
                </h3>
                
                <div className="prose max-w-none">
                  <p className="text-gray-600 mb-4">
                    Welcome to {course.title}! In this module, we'll explore the fundamental concepts
                    and practical applications that will help you master the subject.
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Learning Objectives</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {course.learning_objectives?.slice(0, 3).map((objective, index) => (
                        <li key={index}>{objective}</li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-gray-600">
                    Take your time with each lesson, complete the exercises, and don't hesitate
                    to revisit concepts if needed. Learning is a journey!
                  </p>
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setActiveModule(Math.max(0, activeModule - 1))}
                    disabled={activeModule === 0}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous Module
                  </button>
                  <button
                    onClick={() => setActiveModule(Math.min(modules.length - 1, activeModule + 1))}
                    disabled={activeModule === modules.length - 1}
                    className="px-6 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next Module
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}