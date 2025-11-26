export interface Lesson {
  title: string;
  type: 'video' | 'document' | 'text';
  content: string; // URL for video, text content for document/text
  duration: string;
  order: number;
}

export interface Module {
  title: string;
  description: string;
  lessons: Lesson[];
  order: number;
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
  category: 'professionals' | 'creators' | 'everyone';
  instructor_image: string;
  learning_objectives: string[];
  requirements: string[];
  modules: Module[];
  level: 'beginner' | 'intermediate' | 'advanced';
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface CourseFormData {
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  status: 'draft' | 'published';
  image: string;
  instructor: string;
  duration: string;
  price: string;
  instructor_image: string;
  learning_objectives: string[];
  requirements: string[];
  modules: Module[];
}