'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { usePaystackPayment } from 'react-paystack';
import { courseService } from '@/services/courseService';
import { paymentService } from '@/services/paymentService';
import { Course } from '@/types/course';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const courseId = params.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const courseData = await courseService.getCourseById(courseId);
      setCourse(courseData);
    } catch (err) {
      setError('Failed to load course details');
    } finally {
      setLoading(false);
    }
  };

  const config = {
    reference: paymentService.generateReference(),
    email: user?.email || 'student@example.com',
    amount: course ? paymentService.parsePrice(course.price) : 0,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    metadata: {
      custom_fields: [
        {
          display_name: 'Course ID',
          variable_name: 'course_id',
          value: String(courseId),
        },
        {
          display_name: 'Course Title',
          variable_name: 'course_title',
          value: course?.title || '',
        },
        {
          display_name: 'User ID',
          variable_name: 'user_id',
          value: String(user?.id || ''),
        },
      ],
    },
    currency: 'NGN',
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference: any) => {
    setProcessing(true);
    console.log('Payment successful:', reference);
    
    // Redirect to study page after successful payment
    setTimeout(() => {
      router.push(`/study/${courseId}`);
    }, 2000);
  };

  const onClose = () => {
    console.log('Payment modal closed');
    setError('Payment was cancelled');
  };

  const handlePayment = () => {
    setError(null);
    
    if (!user) {
      setError('Please login to enroll in this course');
      return;
    }

    if (course?.price.toLowerCase() === 'free') {
      // Directly redirect to study page for free courses
      router.push(`/study/${courseId}`);
      return;
    }

    try {
      initializePayment({ onSuccess, onClose });
    } catch (err) {
      setError('Failed to initialize payment');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading payment details...</div>
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
        {/* Header */}
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

            {/* User Info */}
            {user && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-700 mb-2">Paying as:</h3>
                <p className="text-gray-800">{user.first_name} {user.last_name}</p>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>
            )}

            {/* Payment Method */}
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
                  You'll be redirected to Paystack to complete your payment securely.
                </p>
              </div>
            </div>

            {/* Payment Button */}
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

            {/* Security Notice */}
            <div className="mt-4 text-center">
              <p className="text-gray-500 text-sm">
                🔒 Your payment is secure and encrypted
              </p>
            </div>

            {/* Terms */}
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

        {/* Support */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Need help? <a href="mailto:support@example.com" className="text-orange-400 hover:text-orange-500">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
}