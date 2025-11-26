'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { usePaystackPayment } from 'react-paystack';
import { courseService } from '@/services/courseService';
import { paymentService } from '@/services/paymentService';
import { Course } from '@/types/course';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import { database } from '@/lib/databaseClient';

// Service to handle enrollment with Supabase
const enrollmentService = {
  async checkEnrollment(courseId: string, userId?: string): Promise<boolean> {
    if (!userId) return false;
    
    try {
      console.log('Checking enrollment for:', { userId, courseId });
      
      const { data, error } = await database
        .from('user_courses')
        .select('*')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .eq('payment_status', 'success')
        .single();

      if (error) {
        if (error.code === 'PGRST116') { // No record found
          console.log('No enrollment record found');
          return false;
        }
        console.error('Error checking enrollment:', error);
        return false;
      }

      console.log('Enrollment found:', data);
      return !!data;
    } catch (error) {
      console.error('Error checking enrollment:', error);
      return false;
    }
  },

  async markAsEnrolled(courseId: string, userId?: string, paymentData?: any): Promise<void> {
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    try {
      console.log('Marking as enrolled:', { userId, courseId, paymentData });
      
      // Convert price to number for paid courses
      let paymentAmount = 0;
      if (paymentData?.amount) {
        paymentAmount = paymentData.amount / 100; // Paystack amounts are in kobo
      }

      const enrollmentData = {
        user_id: userId,
        course_id: courseId,
        enrolled_at: new Date().toISOString(),
        payment_status: 'success',
        payment_reference: paymentData?.reference || `free_${Date.now()}`,
        payment_amount: paymentAmount,
        payment_currency: paymentData?.currency || 'NGN',
        payment_method: paymentData?.channel || 'free',
        progress: 0,
        last_accessed: new Date().toISOString()
      };

      console.log('Enrollment data:', enrollmentData);

      const { data, error } = await database
        .from('user_courses')
        .upsert(enrollmentData, { 
          onConflict: 'user_id,course_id'
        });

      if (error) {
        console.error('Supabase error details:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        });
        throw new Error(`Failed to save enrollment: ${error.message}`);
      }

      console.log('Enrollment saved successfully:', data);
    } catch (error) {
      console.error('Error in markAsEnrolled:', error);
      throw error;
    }
  }
};

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const courseId = params.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    fetchCourse();
    if (user?.id) {
      checkEnrollmentStatus();
    }
  }, [courseId, user?.id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const courseData = await courseService.getCourseById(courseId);
      setCourse(courseData);
    } catch (err) {
      console.error('Error fetching course:', err);
      setError('Failed to load course details');
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollmentStatus = async () => {
    if (!user?.id) return;
    
    try {
      const enrolled = await enrollmentService.checkEnrollment(courseId, user.id);
      setIsEnrolled(enrolled);
      
      if (enrolled) {
        console.log('User already enrolled, redirecting...');
        setTimeout(() => {
          router.push(`/study/${courseId}`);
        }, 1000);
      }
    } catch (error) {
      console.error('Error checking enrollment status:', error);
    }
  };

  // Only initialize payment config if course is loaded and not free
  const getPaymentConfig = () => {
    if (!course) return null;

    return {
      reference: paymentService.generateReference(),
      email: user?.email || 'student@example.com',
      amount: course.price.toLowerCase() === 'free' ? 0 : paymentService.parsePrice(course.price),
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
      metadata: {
        custom_fields: [
          {
            display_name: 'Course ID',
            variable_name: 'course_id',
            value: courseId,
          },
          {
            display_name: 'Course Title',
            variable_name: 'course_title',
            value: course.title,
          },
          {
            display_name: 'User ID',
            variable_name: 'user_id',
            value: user?.id || '',
          },
        ],
      },
      currency: 'NGN',
    };
  };

  const paymentConfig = getPaymentConfig();
  const initializePayment = paymentConfig ? usePaystackPayment(paymentConfig) : null;

  const onSuccess = async (reference: any) => {
    setProcessing(true);
    console.log('Payment successful:', reference);
    
    try {
      if (user) {
        await enrollmentService.markAsEnrolled(courseId, user.id, reference);
        console.log('Enrollment saved successfully');
      }
      
      setTimeout(() => {
        router.push(`/study/${courseId}`);
      }, 2000);
    } catch (error: any) {
      console.error('Error saving enrollment:', error);
      setError(`Payment successful but failed to save enrollment: ${error.message}`);
      setProcessing(false);
    }
  };

  const onClose = () => {
    console.log('Payment modal closed');
    setError('Payment was cancelled');
  };

  const handlePayment = async () => {
    setError(null);
    
    if (!user) {
      setError('Please login to enroll in this course');
      return;
    }

    if (isEnrolled) {
      router.push(`/study/${courseId}`);
      return;
    }

    if (course?.price.toLowerCase() === 'free') {
      try {
        setProcessing(true);
        await enrollmentService.markAsEnrolled(courseId, user.id);
        console.log('Free enrollment successful');
        router.push(`/study/${courseId}`);
        return;
      } catch (error: any) {
        console.error('Free enrollment error:', error);
        setError(`Failed to enroll in free course: ${error.message}`);
        setProcessing(false);
        return;
      }
    }

    // For paid courses
    if (initializePayment) {
      try {
        initializePayment({ onSuccess, onClose });
      } catch (err) {
        console.error('Payment initialization error:', err);
        setError('Failed to initialize payment');
      }
    } else {
      setError('Payment configuration error');
    }
  };

  // ... rest of your component JSX remains the same
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 mb-4">Loading payment details...</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (isEnrolled) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-green-600 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Already Enrolled!</h2>
            <p className="text-gray-600">Redirecting you to the course...</p>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
        </div>
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Enrollment</h1>
          <p className="text-gray-600 mt-2">Secure payment for {course.title}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Course Summary */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Summary</h2>
            
            <div className="flex items-start space-x-4 mb-6">
              <Image
                src={course.image}
                alt={course.title}
                width={80}
                height={80}
                className="rounded-lg object-cover flex-shrink-0"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{course.title}</h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{course.description}</p>
                <p className="text-orange-400 font-semibold mt-2">by {course.instructor}</p>
              </div>
            </div>

            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Course Price</span>
                <span className="font-semibold text-gray-800">{course.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="text-gray-800">{course.duration}</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-lg font-semibold text-gray-800">Total</span>
                <span className="text-lg font-bold text-orange-400">{course.price}</span>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Payment Details</h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {user && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-700 mb-2">Paying as:</h3>
                <p className="text-gray-800">{user.first_name} {user.last_name}</p>
                <p className="text-gray-600 text-sm">{user.email}</p>
                {user.user_type && (
                  <p className="text-gray-600 text-sm capitalize">Role: {user.user_type}</p>
                )}
              </div>
            )}

            {course.price.toLowerCase() !== 'free' && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">Payment Method</h3>
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-6 bg-green-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">PS</span>
                      </div>
                      <span className="font-medium">Paystack</span>
                    </div>
                    <span className="text-gray-500 text-sm">Secure Payment</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">
                    You&apos;ll be redirected to Paystack to complete your payment securely.
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full bg-orange-400 text-white py-4 px-6 rounded-lg font-semibold hover:bg-orange-500 disabled:bg-orange-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : course.price.toLowerCase() === 'free' ? (
                'Enroll for Free'
              ) : (
                `Pay ${course.price}`
              )}
            </button>

            {course.price.toLowerCase() !== 'free' && (
              <div className="mt-4 text-center">
                <p className="text-gray-500 text-sm">
                  🔒 Your payment is secure and encrypted
                </p>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-xs">
                By completing this purchase, you agree to our{' '}
                <a href="#" className="text-orange-400 hover:text-orange-500">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-orange-400 hover:text-orange-500">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Need help? <a href="mailto:support@example.com" className="text-orange-400 hover:text-orange-500">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
}