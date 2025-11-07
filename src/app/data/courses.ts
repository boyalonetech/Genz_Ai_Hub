interface Course {
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
}

const allCourses: Course[] = [
  // For Professionals
  {
    id: 1,
    image: "/course3.jpg",
    rating: 4.0,
    price: "Free",
    title: "AI for Educators",
    description:
      "Master AI-powered teaching tools, automate grading, and create personalized learning experiences for students.",
    instructor: "Dr. Sarah Chen",
    duration: "8 weeks",
    students: "2,430",
    starCount: 0,
    category: "professionals",
  },
  {
    id: 2,
    image: "/course2.jpg",
    rating: 4.9,
    price: "Free",
    title: "AI for Marketers",
    description:
      "Learn to leverage AI for content creation, analytics, campaign optimization, and customer engagement.",
    instructor: "Dr. Sarah Chen",
    duration: "5 weeks",
    students: "3,120",
    starCount: 5,
    category: "professionals",
  },
  {
    id: 3,
    image: "/course4.jpg",
    rating: 4.0,
    price: "Free",
    title: "AI for Developers",
    description:
      "Build and deploy AI-powered applications using modern frameworks, APIs, and best practices.",
    instructor: "Alex Kim",
    duration: "4 weeks",
    students: "2,430",
    starCount: 0,
    category: "professionals",
  },

  // For Creators
  {
    id: 4,
    image: "/course2.jpg",
    rating: 4.7,
    price: "Free",
    title: "AI for Content Creators",
    description:
      "Create engaging content faster with AI tools for writing, video editing, and social media management.",
    instructor: "Maria Rodriguez",
    duration: "6 weeks",
    students: "1,890",
    starCount: 4,
    category: "creators",
  },
  {
    id: 5,
    image: "/course1.jpg",
    rating: 4.5,
    price: "Free",
    title: "AI Video Production",
    description:
      "Learn AI-powered video editing, automated subtitles, and content optimization techniques.",
    instructor: "James Wilson",
    duration: "4 weeks",
    students: "2,150",
    starCount: 3,
    category: "creators",
  },
  {
    id: 6,
    image: "/course3.jpg",
    rating: 4.8,
    price: "Free",
    title: "AI Music Composition",
    description:
      "Create original music using AI tools and learn composition techniques for digital creators.",
    instructor: "Lisa Thompson",
    duration: "7 weeks",
    students: "1,540",
    starCount: 5,
    category: "creators",
  },

  // For Everyone
  {
    id: 7,
    image: "/course1.jpg",
    rating: 4.2,
    price: "Free",
    title: "AI Basics for Beginners",
    description:
      "Start your AI journey with fundamental concepts and practical applications for everyday use.",
    instructor: "Dr. Michael Brown",
    duration: "3 weeks",
    students: "4,230",
    starCount: 2,
    category: "everyone",
  },
  {
    id: 8,
    image: "/course2.jpg",
    rating: 4.6,
    price: "Free",
    title: "AI in Daily Life",
    description:
      "Discover how AI enhances productivity, entertainment, and personal organization.",
    instructor: "Sarah Johnson",
    duration: "2 weeks",
    students: "3,780",
    starCount: 4,
    category: "everyone",
  },
  {
    id: 9,
    image: "/course3.jpg",
    rating: 4.4,
    price: "Free",
    title: "Ethical AI for All",
    description:
      "Understand AI ethics, privacy concerns, and responsible AI usage in modern society.",
    instructor: "Dr. Robert Lee",
    duration: "4 weeks",
    students: "2,960",
    starCount: 3,
    category: "everyone",
  },
];

export default allCourses;
