export interface Review {
  id: string;
  student_name: string;
  date: string;
  rating: number;
  comment: string;
  course_id: string;
  created_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  price: string;
  instructor: string;
  duration: string;
  students: string;
  star_count: number;
  category: string;
  instructor_image?: string;
  learning_objectives?: string[];
  requirements?: string[];
  modules?: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
  reviews?: Review[];
}

export interface CourseFormData {
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  status: 'draft' | 'published';
  image?: string;
  instructor: string;
  duration: string;
  price: string;
  instructor_image?: string;
  learning_objectives?: string[];
  requirements?: string[];
  modules?: string[];
}