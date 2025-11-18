import React, { useState, useEffect } from 'react';
import { courseService } from '@/services/courseService';
import { Course, CourseFormData } from '@/types/course';

const CoursesPage: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const [courseForm, setCourseForm] = useState<CourseFormData>({
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    status: 'draft',
    image: '',
    instructor: '',
    duration: '',
    price: 'Free',
    instructor_image: '',
    learning_objectives: [],
    requirements: [],
    modules: []
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const coursesData = await courseService.getCourses();
      setCourses(coursesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError(null);

      if (editingCourse) {
        await courseService.updateCourse(editingCourse.id, courseForm);
      } else {
        await courseService.createCourse(courseForm);
      }

      setShowCreateForm(false);
      setEditingCourse(null);
      resetForm();
      await fetchCourses();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save course');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      description: course.description,
      category: course.category,
      level: course.level,
      status: course.status,
      image: course.image || '',
      instructor: course.instructor,
      duration: course.duration,
      price: course.price,
      instructor_image: course.instructor_image || '',
      learning_objectives: course.learning_objectives || [],
      requirements: course.requirements || [],
      modules: course.modules || []
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      try {
        await courseService.deleteCourse(id);
        await fetchCourses();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete course');
      }
    }
  };

  const resetForm = () => {
    setCourseForm({
      title: '',
      description: '',
      category: '',
      level: 'beginner',
      status: 'draft',
      image: '',
      instructor: '',
      duration: '',
      price: 'Free',
      instructor_image: '',
      learning_objectives: [],
      requirements: [],
      modules: []
    });
    setEditingCourse(null);
  };

  const handleArrayFieldChange = (field: 'learning_objectives' | 'requirements' | 'modules', value: string, index?: number) => {
    const currentArray = courseForm[field] || [];
    
    if (index !== undefined) {
      const newArray = [...currentArray];
      newArray[index] = value;
      setCourseForm({ ...courseForm, [field]: newArray });
    } else {
      setCourseForm({ ...courseForm, [field]: [...currentArray, value] });
    }
  };

  const removeArrayItem = (field: 'learning_objectives' | 'requirements' | 'modules', index: number) => {
    const currentArray = courseForm[field] || [];
    const newArray = currentArray.filter((_, i) => i !== index);
    setCourseForm({ ...courseForm, [field]: newArray });
  };

  if (loading) {
    return (
      <div className="p-4 lg:p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">Loading courses...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Courses Management</h1>
          <p className="text-gray-600 text-sm lg:text-base">Create and manage your courses</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowCreateForm(true);
          }}
          className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition-colors text-sm lg:text-base w-full sm:w-auto"
        >
          + New Course
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button 
            onClick={() => setError(null)}
            className="ml-4 text-red-800 hover:text-red-900"
          >
            ×
          </button>
        </div>
      )}

      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
              {editingCourse ? 'Edit Course' : 'Create New Course'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Title *</label>
                  <input
                    type="text"
                    required
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                    placeholder="Enter course title"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    required
                    value={courseForm.description}
                    onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                    placeholder="Describe your course..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    required
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                  >
                    <option value="">Select Category</option>
                    <option value="professionals">For Professionals</option>
                    <option value="creators">For Creators</option>
                    <option value="everyone">For Everyone</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level *</label>
                  <select
                    required
                    value={courseForm.level}
                    onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value as any })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructor *</label>
                  <input
                    type="text"
                    required
                    value={courseForm.instructor}
                    onChange={(e) => setCourseForm({ ...courseForm, instructor: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                    placeholder="Enter instructor name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                  <input
                    type="text"
                    required
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                    placeholder="e.g., 8 weeks"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                  <input
                    type="text"
                    required
                    value={courseForm.price}
                    onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                    placeholder="e.g., Free or $99"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                  <select
                    required
                    value={courseForm.status}
                    onChange={(e) => setCourseForm({ ...courseForm, status: e.target.value as | 'draft' | 'published' })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Image URL</label>
                  <input
                    type="url"
                    value={courseForm.image}
                    onChange={(e) => setCourseForm({ ...courseForm, image: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                    placeholder="Enter image URL"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructor Image URL</label>
                  <input
                    type="url"
                    value={courseForm.instructor_image}
                    onChange={(e) => setCourseForm({ ...courseForm, instructor_image: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                    placeholder="Enter instructor image URL"
                  />
                </div>
              </div>

              <div className="space-y-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Learning Objectives</label>
                  <div className="space-y-2">
                    {courseForm.learning_objectives?.map((objective, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={objective}
                          onChange={(e) => handleArrayFieldChange('learning_objectives', e.target.value, index)}
                          className="flex-1 p-2 border border-gray-300 rounded-lg"
                          placeholder="Learning objective"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem('learning_objectives', index)}
                          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleArrayFieldChange('learning_objectives', '')}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                      Add Learning Objective
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
                  <div className="space-y-2">
                    {courseForm.requirements?.map((requirement, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={requirement}
                          onChange={(e) => handleArrayFieldChange('requirements', e.target.value, index)}
                          className="flex-1 p-2 border border-gray-300 rounded-lg"
                          placeholder="Course requirement"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem('requirements', index)}
                          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleArrayFieldChange('requirements', '')}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                      Add Requirement
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Modules</label>
                  <div className="space-y-2">
                    {courseForm.modules?.map((module, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={module}
                          onChange={(e) => handleArrayFieldChange('modules', e.target.value, index)}
                          className="flex-1 p-2 border border-gray-300 rounded-lg"
                          placeholder="Course module"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem('modules', index)}
                          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleArrayFieldChange('modules', '')}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                      Add Module
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setEditingCourse(null);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 disabled:bg-orange-300"
                  disabled={submitting}
                >
                  {submitting ? 'Saving...' : (editingCourse ? 'Update Course' : 'Create Course')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No courses found. Create your first course!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {courses.map((course) => (
              <div key={course.id} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      {course.image && (
                        <img 
                          src={course.image} 
                          alt={course.title}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-800 text-lg">{course.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            course.status === 'published' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {course.status}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            course.level === 'beginner' 
                              ? 'bg-blue-100 text-blue-800'
                              : course.level === 'intermediate'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {course.level}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{course.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>by {course.instructor}</span>
                          <span>•</span>
                          <span>{course.duration}</span>
                          <span>•</span>
                          <span>{course.category}</span>
                          <span>•</span>
                          <span>{course.students} students</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(course)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;