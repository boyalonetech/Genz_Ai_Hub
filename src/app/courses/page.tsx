import React from "react";

export interface Card {
  image: string;
  rating: number;
  price: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  students: string;
  starCount: any;
}

export default function CourseFinder() {
  return (
    <div className="w-full min-h-screen relative bg-white overflow-hidden mt-20">
      {/* Decorative background circles */}
      <div className="w-64 h-64 -right-30 top-36 absolute opacity-75 bg-orange-500 rounded-full " />
      <div className="w-96 h-96 -left-72 top-32 absolute opacity-75 bg-orange-500 rounded-full " />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-16">
        {/* Main Heading */}
        <h1 className="text-center mb-6">
          <span className="block text-indigo-800 text-6xl md:text-7xl font-normal font-['Unbounded'] leading-tight">
            Find Your Perfect
          </span>
          <span className="block text-orange-400 text-6xl md:text-7xl font-normal font-['Unbounded'] leading-tight">
            Course
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-center text-black text-xl font-normal font-['Unbounded'] leading-7 mb-8">
          Industry-tailored AI courses designed for Gen Z professionals
        </p>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto px-5 py-3.5 bg-zinc-300 rounded-lg border border-neutral-400 flex items-center gap-2.5">
          <div className="w-6 h-6 relative flex-shrink-0">
            {/* Search icon placeholder */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              className="cursor-pointer"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth={2}
                d="m21 21l-4.486-4.494M19 10.5a8.5 8.5 0 1 1-17 0a8.5 8.5 0 0 1 17 0Z"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search Courses..."
            className="flex-1 bg-transparent text-black text-lg font-medium font-['Lato'] outline-none placeholder:text-black"
          />
        </div>
      </div>

      {/* Course Categories and Listing Section */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-start items-center gap-6 mb-10">
          <button className="px-5 py-2 bg-orange-500 rounded-3xl text-white text-lg font-medium font-['Lato'] hover:bg-orange-600 transition-colors">
            All Courses
          </button>
          <button className="px-5 py-2 bg-zinc-300 rounded-3xl text-orange-400 text-lg font-medium font-['Lato'] hover:bg-zinc-400 transition-colors">
            For Professionals
          </button>
          <button className="px-5 py-2 bg-zinc-300 rounded-3xl text-orange-400 text-lg font-medium font-['Lato'] hover:bg-zinc-400 transition-colors">
            For Creators
          </button>
          <button className="px-5 py-2 bg-zinc-300 rounded-3xl text-orange-400 text-lg font-medium font-['Lato'] hover:bg-zinc-400 transition-colors">
            For Everyone
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-black/50 mb-10" />

        {/* Section Title */}
        <h2 className="text-black text-xl font-normal font-['Unbounded'] leading-7 mb-7">
          For Professionals
        </h2>

        {/* Course Grid */}
        <div className="space-y-9">
          {/* First Row - 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
            {/* Course Card 1: AI for Educators */}
            <CourseCard
              image="https://placehold.co/409x283"
              rating={4}
              price="Free"
              title="AI for Educators"
              description="Master AI-powered teaching tools, automate grading, and create personalized......"
              instructor="Dr. Sarah Chen"
              duration="8 weeks"
              students="2,430"
              starCount={0}
            />

            {/* Course Card 2: AI for Marketers */}
            <CourseCard
              image="https://placehold.co/409x283"
              rating={4.9}
              price="Free"
              title="AI for Marketers"
              description="Learn to leverage AI for content creation, analytics, campaign optimization, and....."
              instructor="Dr. Sarah Chen"
              duration="5 weeks"
              students="3,120"
              starCount={5}
            />

            {/* Course Card 3: AI for Developers */}
            <CourseCard
              image="https://placehold.co/409x283"
              rating={4}
              price="Free"
              title="AI for Developers"
              description="Build and deploy AI-powered applications using modern frameworks, APIs, and best....."
              instructor="Alex Kim"
              duration="4 weeks"
              students="2,430"
              starCount={0}
            />
          </div>

          {/* Second Row - 1 Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
            <CourseCard
              image="https://placehold.co/409x283"
              rating={4}
              price="Free"
              title="AI for Developers"
              description="Build and deploy AI-powered applications using modern frameworks, APIs, and best....."
              instructor="Alex Kim"
              duration="4 weeks"
              students="2,430"
              starCount={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Course Card Component
function CourseCard({
  image,
  rating,
  price,
  title,
  description,
  instructor,
  duration,
  students,
}: Card) {
  return (
    <div className="w-full flex flex-col rounded-2xl border border-black/60 overflow-hidden bg-white hover:shadow-xl transition-shadow">
      {/* Course Image */}
      <img className="w-full h-72 object-cover" src={image} alt={title} />

      {/* Card Content */}
      <div className="p-5 flex flex-col gap-3.5">
        {/* Rating and Price Section */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Star Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-5 h-5 relative">
                <div
                  className={`w-5 h-5 ${
                    i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-full h-full"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Rating Number and Price */}
          <div className="flex items-center gap-2.5">
            <span className="text-indigo-800 text-xl font-normal font-['Unbounded']">
              {rating}
            </span>
            <div className="w-1.5 h-1.5 bg-black rounded-full" />
            <span className="text-indigo-800 text-xl font-normal font-['Unbounded']">
              {price}
            </span>
          </div>
        </div>

        {/* Course Title and Description */}
        <div className="flex flex-col gap-3.5">
          <h3 className="text-orange-400 text-2xl font-normal font-['Unbounded'] leading-loose">
            {title}
          </h3>
          <p className="text-black text-xl font-normal font-['Unbounded'] leading-7">
            {description}
          </p>
        </div>

        {/* Instructor Info */}
        <div className="text-black text-lg font-medium font-['Lato']">
          by {instructor}
        </div>

        {/* Duration and Student Count */}
        <div className="flex items-center gap-6">
          {/* Duration */}
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 relative">
              <div className="w-4 h-4 absolute left-0.5 top-0.5 border-2 border-black rounded-sm" />
              <div className="w-1 h-2 absolute left-3 top-1.5 border-2 border-black" />
            </div>
            <span className="text-black text-lg font-medium font-['Lato']">
              {duration}
            </span>
          </div>

          {/* Student Count */}
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 relative">
              <div className="w-1.5 h-1.5 absolute left-3 top-1 border border-black rounded-full" />
              <div className="w-3.5 h-1.5 absolute left-2.5 top-3.5 border border-black rounded-sm" />
            </div>
            <span className="text-black text-lg font-medium font-['Lato']">
              {students}
            </span>
          </div>
        </div>

        {/* Enroll Button */}
        <button className="w-full px-2.5 py-3.5 mt-2 rounded-lg border border-neutral-400 text-black/60 text-lg font-medium font-['Lato'] hover:bg-zinc-100 hover:text-black transition-colors">
          Enroll Now
        </button>
      </div>
    </div>
  );
}
