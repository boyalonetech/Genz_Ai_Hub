// types/course.ts
export interface Course {
  id: number;
  image: string;
  rating: number;
  price: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  students: string;
  starCount: number;
  category: string;
  instructorImage?: string;
  modules?: string[];
  learningObjectives?: string[];
  requirements?: string[];
  reviews?: Review[];
}

export interface Review {
  id: number;
  studentName: string;
  date: string;
  rating: number;
  comment: string;
}

export interface CourseContent {
  overview: {
    learningObjectives: string[];
    requirements: string[];
  };
  curriculum: {
    modules: string[];
  };
  instructor: {
    name: string;
    title: string;
    bio: string;
    image: string;
  };
  reviews: Review[];
}

// types/course.ts
export interface Course {
  id: number;
  image: string;
  rating: number;
  price: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  students: string;
  starCount: number;
  category: string;
  instructorImage?: string;
  modules?: string[];
  learningObjectives?: string[];
  requirements?: string[];
  reviews?: Review[];
}

export interface Review {
  id: number;
  studentName: string;
  date: string;
  rating: number;
  comment: string;
} 