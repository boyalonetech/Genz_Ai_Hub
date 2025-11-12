// data/blog.ts
import { Article } from '@/app/types/blog';

export const articles: Article[] = [
  {
    id: 1,
    title: "How to Build Your First AI App in 30 Minutes",
    image: "/blog1.jpg",
    date: "March 12, 2025",
    author: "Charles Mark",
    content: {
      prerequisites: [
        "Basic familiarity with JavaScript, Python, or React",
        "A text editor (VS Code)",
        "Node.js installed",
        "An API key from OpenAI"
      ],
      steps: [
        "Step 1: Create Your Project Folder",
        "Step 2: Set Up Your Server",
        "Step 3: Add a Simple Frontend",
        "Step 4: Test Your App",
        "Step 5: Deploy Your AI App"
      ],
      bonusIdeas: [
        "Add a character mode (e.g., 'You are Yoda')",
        "Save conversation history",
        "Add a speech-to-text input or text-to-speech output",
        "Build with React or Next.js for richer UI"
      ]
    }
  },
  {
    id: 2,
    title: "The Future of AI in Education: Trends to Watch",
    image: "/blog2.jpg",
    date: "March 12, 2025",
    author: "Sarah Johnson",
    content: {
      prerequisites: [
        "Understanding of basic AI concepts",
        "Interest in educational technology"
      ],
      steps: [
        "Step 1: Understand Current AI Applications",
        "Step 2: Identify Emerging Trends",
        "Step 3: Implement AI Solutions",
        "Step 4: Evaluate Effectiveness"
      ],
      bonusIdeas: [
        "Explore adaptive learning platforms",
        "Research AI-powered assessment tools",
        "Investigate virtual AI tutors"
      ]
    }
  },
  {
    id: 3,
    title: "Career Growth: Becoming an AI Specialist",
    image: "/blog3.jpg",
    date: "March 12, 2025",
    author: "Michael Chen",
    content: {
      prerequisites: [
        "Basic programming knowledge",
        "Understanding of mathematics and statistics",
        "Curiosity about machine learning"
      ],
      steps: [
        "Step 1: Learn Fundamentals of AI",
        "Step 2: Master Programming Languages",
        "Step 3: Build Practical Projects",
        "Step 4: Network with Professionals",
        "Step 5: Pursue Certifications"
      ],
      bonusIdeas: [
        "Contribute to open-source AI projects",
        "Attend AI conferences and meetups",
        "Create a portfolio of AI projects"
      ]
    }
  },
  {
    id: 4,
    title: "Prompt Engineering: Advanced Techniques",
    image: "/blog4.jpg",
    date: "March 12, 2025",
    author: "Emily Rodriguez",
    content: {
      prerequisites: [
        "Basic understanding of AI models",
        "Experience with language models",
        "Familiarity with NLP concepts"
      ],
      steps: [
        "Step 1: Understand Prompt Structure",
        "Step 2: Learn Advanced Techniques",
        "Step 3: Practice with Real Examples",
        "Step 4: Optimize for Specific Use Cases"
      ],
      bonusIdeas: [
        "Create prompt templates library",
        "Experiment with different model parameters",
        "Develop custom prompt workflows"
      ]
    }
  },
  {
    id: 5,
    title: "AI Ethics: What Every Professional Should Know",
    image: "/blog5.jpg",
    date: "March 12, 2025",
    author: "David Thompson",
    content: {
      prerequisites: [
        "Basic understanding of AI systems",
        "Awareness of social implications",
        "Interest in responsible AI development"
      ],
      steps: [
        "Step 1: Learn Core Ethical Principles",
        "Step 2: Understand Bias and Fairness",
        "Step 3: Implement Ethical Guidelines",
        "Step 4: Conduct Regular Audits"
      ],
      bonusIdeas: [
        "Join AI ethics committees",
        "Participate in responsible AI initiatives",
        "Stay updated with AI regulations"
      ]
    }
  },
  {
    id: 6,
    title: "Machine Learning Deployment Strategies",
    image: "/blog3.jpg",
    date: "March 12, 2025",
    author: "Lisa Wang",
    content: {
      prerequisites: [
        "Experience with ML models",
        "Understanding of cloud platforms",
        "Knowledge of DevOps principles"
      ],
      steps: [
        "Step 1: Choose Deployment Platform",
        "Step 2: Containerize Your Model",
        "Step 3: Set Up CI/CD Pipeline",
        "Step 4: Monitor Performance",
        "Step 5: Scale as Needed"
      ],
      bonusIdeas: [
        "Implement A/B testing for models",
        "Set up automated retraining pipelines",
        "Use feature stores for consistency"
      ]
    }
  },
];