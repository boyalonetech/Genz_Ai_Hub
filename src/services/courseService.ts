import { database } from '@/lib/databaseClient';
import { Course, CourseFormData } from '@/types/course';

export const courseService = {
  // Get all courses (for admin dashboard)
  async getCourses(filters?: { status?: string; category?: string }): Promise<Course[]> {
    try {
      let query = database
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.category && filters.category !== 'all') {
        query = query.eq('category', filters.category);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching courses:', error);
        throw new Error(`Failed to fetch courses: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Error in getCourses:', error);
      throw error;
    }
  },

  // Get single course by ID
  async getCourseById(id: string): Promise<Course | null> {
    try {
      const { data, error } = await database
        .from('courses')
        .select(`
          *,
          reviews:course_reviews(*)
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching course:', error);
        throw new Error(`Failed to fetch course: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error in getCourseById:', error);
      throw error;
    }
  },

  // Get published courses (for public pages)
  async getPublishedCourses(category?: string): Promise<Course[]> {
    try {
      let query = database
        .from('courses')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching published courses:', error);
        throw new Error(`Failed to fetch published courses: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Error in getPublishedCourses:', error);
      throw error;
    }
  },

  // Create new course
  async createCourse(courseData: CourseFormData): Promise<Course> {
    try {
      const { data, error } = await database
        .from('courses')
        .insert([{
          ...courseData,
          students: '0',
          rating: 0,
          star_count: 0,
          learning_objectives: courseData.learning_objectives || [],
          requirements: courseData.requirements || [],
          modules: courseData.modules || [],
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating course:', error);
        throw new Error(`Failed to create course: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error in createCourse:', error);
      throw error;
    }
  },

  // Update course
  async updateCourse(id: string, courseData: Partial<CourseFormData>): Promise<Course> {
    try {
      const { data, error } = await database
        .from('courses')
        .update(courseData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating course:', error);
        throw new Error(`Failed to update course: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error in updateCourse:', error);
      throw error;
    }
  },

  // Delete course
  async deleteCourse(id: string): Promise<void> {
    try {
      const { error } = await database
        .from('courses')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting course:', error);
        throw new Error(`Failed to delete course: ${error.message}`);
      }
    } catch (error) {
      console.error('Error in deleteCourse:', error);
      throw error;
    }
  }
};