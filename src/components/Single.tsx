'use client'
import { useState } from 'react';

interface CourseData {
  image: string;
  rating: number;
  price: string;
  title: string;
  description: string;
  instructor: string;
  instructorBio: string;
  duration: string;
  students: string;
  curriculum: string[];
  requirements: string[];
  learningObjectives: { text: string; completed: boolean }[];
}

function CoursePage({ courseData }: { courseData: CourseData }) {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'instructor' | 'reviews'>('curriculum');

  // Mock data - in real app, this would come from props
  const course: CourseData = {
    image: 'https://placehold.co/800x450',
    rating: 4.8,
    price: 'Free',
    title: 'AI for Educators',
    description: 'Master AI-powered teaching tools, automatic grading, and create personalized learning experiences for your students.',
    instructor: 'Dr. Sarah Chen',
    instructorBio: 'Former curriculum designer at Khan Academy with a PhD in Educational Technology. 1.5+ years teaching experience.',
    duration: '8 weeks',
    students: '2,400',
    curriculum: ['Introduction to AI in Education', 'AI-Powered Lesson Planning', 'Automated Grading Systems', 'Personalized Learning Paths', 'Ethical AI Implementation'],
    requirements: ['Basic computer literacy', 'Teaching experience (helpful but not required)', 'Openness to trying new tools'],
    learningObjectives: [
      { text: 'Use AI tools to create engaging lesson plans in minutes', completed: true },
      { text: 'Design personalized learning experiences for diverse classrooms', completed: true },
      { text: 'Integrate ChatGPT, Notion AI, and other tools into your workflow', completed: true },
      { text: 'Automate grading and feedback for assignments', completed: true },
      { text: 'Implement AI ethically and responsibly in education', completed: false }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Course Image */}
                <div className="flex-shrink-0">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-80 h-48 rounded-xl object-cover shadow-md"
                  />
                </div>
                
                {/* Course Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-5 h-5">
                          <div className={`w-5 h-5 ${
                            i < Math.floor(course.rating) ? "text-yellow-400" : "text-gray-300"
                          }`}>
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          </div>
                        </div>
                      ))}
                      <span className="ml-2 text-indigo-800 font-semibold">{course.rating}</span>
                    </div>
                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                    <span className="text-indigo-800 text-xl font-semibold">{course.price}</span>
                  </div>

                  <h1 className="text-4xl font-bold text-gray-900 mb-4 font-['Unbounded']">
                    {course.title}
                  </h1>
                  
                  <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-6 text-gray-700">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 relative">
                        <div className="w-4 h-4 absolute left-0.5 top-0.5 border-2 border-gray-600 rounded-sm" />
                        <div className="w-1 h-2 absolute left-3 top-1.5 border-2 border-gray-600" />
                      </div>
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 relative">
                        <div className="w-1.5 h-1.5 absolute left-3 top-1 border border-gray-600 rounded-full" />
                        <div className="w-3.5 h-1.5 absolute left-2.5 top-3.5 border border-gray-600 rounded-sm" />
                      </div>
                      <span>{course.students} students</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white rounded-2xl shadow-lg mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  {[
                    { id: 'curriculum', label: 'Curriculum' },
                    { id: 'instructor', label: 'Instructor' },
                    { id: 'reviews', label: 'Reviews' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`py-4 px-6 text-lg font-medium border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-orange-500 text-orange-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'curriculum' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h3>
                    <div className="space-y-4 mb-8">
                      {course.learningObjectives.map((objective, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            objective.completed 
                              ? 'bg-green-500 border-green-500 text-white' 
                              : 'border-gray-300'
                          }`}>
                            {objective.completed && (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className={`text-lg ${
                            objective.completed ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {objective.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h3>
                    <div className="space-y-3">
                      {course.curriculum.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <span className="text-gray-700">{item}</span>
                          <span className="text-sm text-gray-500">45 min</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'instructor' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Instruction: {course.instructor}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {course.instructorBio}
                    </p>
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2">Teaching Philosophy</h4>
                      <p className="text-blue-800">
                        Focused on practical, implementable strategies that educators can immediately apply in their classrooms.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Student Reviews</h3>
                    <div className="text-center py-12 text-gray-500">
                      <div className="text-6xl mb-4">⭐</div>
                      <p className="text-xl">No reviews yet. Be the first to review this course!</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              {/* Price & Enrollment */}
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-indigo-800 mb-2">{course.price}</div>
                <button className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors mb-4">
                  Enroll Now
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors mb-6">
                  Add to Wishlist
                </button>
              </div>

              {/* Course Features */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>8 weeks self-paced</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Lifetime access</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Certificate of completion</span>
                </div>
              </div>

              {/* Requirements */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Requirements</h4>
                <div className="space-y-2">
                  {course.requirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-600">
                      <div className="w-5 h-5 border-2 border-gray-400 rounded-sm flex items-center justify-center">
                        <div className="w-2 h-2 bg-gray-400 rounded-sm" />
                      </div>
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursePage;