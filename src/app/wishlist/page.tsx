// app/wishlist/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { courseService } from '@/services/courseService';
import { Course } from '@/types/course';
import { Heart, Clock, Users, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const WishlistPage: React.FC = () => {
  const { user, loading } = useProtectedRoute();
  const router = useRouter();
  const [wishlistCourses, setWishlistCourses] = useState<Course[]>([]);
  const [loadingWishlist, setLoadingWishlist] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoadingWishlist(true);
      // This would typically come from your API
      const allCourses = await courseService.getCourses();
      // For demo, using first 3 courses as wishlist
      setWishlistCourses(allCourses.slice(0, 3));
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoadingWishlist(false);
    }
  };

  const removeFromWishlist = async (courseId: string) => {
    try {
      // Remove from wishlist logic here
      setWishlistCourses(prev => prev.filter(course => course.id !== courseId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const enrollCourse = (courseId: string) => {
    router.push(`/payment/${courseId}`);
  };

  if (loading || loadingWishlist) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-600 mt-1">Courses you're interested in</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                {wishlistCourses.length} courses
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4">
        {wishlistCourses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6">Start adding courses you're interested in!</p>
            <button
              onClick={() => router.push('/courses')}
              className="bg-orange-400 text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition-colors"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={course.image || '/course-placeholder.jpg'}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => removeFromWishlist(course.id)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
                  >
                    <Heart className="w-5 h-5 text-red-500 fill-current" />
                  </button>
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-orange-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {course.price}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{course.students || 0} students</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => enrollCourse(course.id)}
                      className="flex-1 bg-orange-400 text-white py-2 rounded-lg hover:bg-orange-500 transition-colors text-sm font-medium"
                    >
                      Enroll Now
                    </button>
                    <button
                      onClick={() => router.push(`/courses/${course.id}`)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default WishlistPage;