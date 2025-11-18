export interface Blog {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  status: 'draft' | 'published';
  createdAt: Date;
}

export type DashboardPage = 'overview' | 'blogs' | 'courses' | 'analytics';