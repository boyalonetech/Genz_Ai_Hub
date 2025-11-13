// components/CourseCard.tsx
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Course } from "../app/types/course";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({
  course,
}: CourseCardProps): React.JSX.Element {
  const router = useRouter();

  const handleEnrollClick = (): void => {
    router.push(`/courses/${course.id}`);
  };

  return (
    <div className="w-full max-w-sm flex flex-col rounded-2xl border border-black/60 overflow-hidden bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Course Image */}
      <div className="relative overflow-hidden">
        <Image
          src={course.image || "https://placehold.co/409x283"}
          alt="course image"
          className="w-full h-60 object-cover object-center aspect-square transition-transform duration-300 hover:scale-105"
          width={409}
          height={283}
        />
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col gap-4">
        {/* Rating and Price Section */}
        <div className="flex items-center justify-between">
          {/* Star Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-5 h-5 relative">
                <div
                  className={`w-5 h-5 ${
                    i < Math.floor(course.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
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
            <span className="ml-2 text-indigo-800 text-sm font-medium font-['Unbounded']">
              {course.rating}
            </span>
          </div>

          {/* Price */}
          <span className="text-indigo-800 text-sm font-semibold font-['Unbounded']">
            {course.price}
          </span>
        </div>

        {/* Course Title and Description */}
        <div className="flex flex-col gap-3">
          <h3 className="text-orange-400 text-xl font-semibold font-['Unbounded'] leading-tight line-clamp-2 min-h-[3rem]">
            {course.title}
          </h3>
          <p className="text-black/80 text-base font-normal font-['Lato'] leading-6 line-clamp-2 min-h-[3rem]">
            {course.description}
          </p>
        </div>

        {/* Instructor Info */}
        <div className="text-black/70 text-base font-normal font-['Lato']">
          by <span className="font-semibold">{course.instructor}</span>
        </div>

        {/* Duration and Student Count */}
        <div className="flex items-center gap-4 pt-2">
          {/* Duration */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 relative flex-shrink-0">
              <div className="w-4 h-4 absolute left-0.5 top-0.5 border-2 border-black rounded-sm" />
              <div className="w-1 h-2 absolute left-3 top-1.5 border-2 border-black" />
            </div>
            <span className="text-black text-base font-medium font-['Lato']">
              {course.duration}
            </span>
          </div>

          <div className="w-px h-4 bg-black/30" />

          {/* Student Count */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 relative flex-shrink-0">
              <div className="w-1.5 h-1.5 absolute left-3 top-1 border border-black rounded-full" />
              <div className="w-3.5 h-1.5 absolute left-2.5 top-3.5 border border-black rounded-sm" />
            </div>
            <span className="text-black text-base font-medium font-['Lato']">
              {course.students}
            </span>
          </div>
        </div>

        {/* Enroll Button */}
        <button
          onClick={handleEnrollClick}
          className="w-full px-4 py-3.5 mt-3 rounded-lg border border-neutral-400 text-black/70 text-lg font-semibold font-['Lato'] hover:bg-orange-400 hover:text-white hover:border-orange-400 transition-all duration-200"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
}
