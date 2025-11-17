// types/team.ts
export interface TeamMember {
  name: string;
  role: string;
  image: string;
  roleIcon: string;
}

export interface Feature {
  title: string;
  desc: string;
  icon: string;
  width: number;
  height: number;
}

export interface RoadmapItem {
  period: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface FAQItem {
  question: string;
  answer?: string;
  isOpen?: boolean;
}

export interface FooterLinks {
  pages: string[];
  support: string[];
  network: string[];
}

export interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  rating: number;
  duration: string;
  students: string;
  instructor: string;
  instructorImage: string;
  learningObjectives?: string[];
  requirements?: string[];
  modules?: Module[];
  reviews?: Review[];
}

export interface Module {
  title: string;
  duration: string;
  lessons: Lesson[];
}

export interface Lesson {
  title: string;
  videoUrl: string;
  duration: string;
  videoId?: string;
}

export interface Review {
  id: number;
  studentName: string;
  date: string;
  rating: number;
  comment: string;
}

// types/navigation.ts
export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

// types/form.ts
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}

// types/api.ts
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  bio?: string;
  socialLinks?: SocialLink[];
  enrolledCourses?: number[];
  completedCourses?: number[];
}

// types/course.ts
export interface Enrollment {
  id: string;
  userId: string;
  courseId: number;
  enrolledAt: string;
  progress: number;
  completed: boolean;
  lastAccessed?: string;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: number;
  issuedAt: string;
  certificateUrl: string;
  verificationCode: string;
}