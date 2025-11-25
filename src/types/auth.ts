export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: 'student' | 'instructor';
  avatar_url?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface SignupData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  user_type: 'student' | 'instructor';
  bio?: string;
}

export interface LoginData {
  email: string;
  password: string;
}