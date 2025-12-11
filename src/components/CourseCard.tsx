"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Course } from "@/types/course";
import { Clock, Users } from "lucide-react";

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
    <div className="w-full max-w-sm h-[515px] lg:h-[550px] flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative h-60">
        <Image
          src={course.image || "/course-placeholder.jpg"}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          width={409}
          height={283}
        />

        {/* Price */}
        <span className="absolute top-3 left-3 bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg drop-shadow-xl">
         {course.price || "Free"}
        </span>
      </div>

      {/* Content */}
      <div className="lg:p-6 p-4 flex flex-col gap-4 flex-grow">
        {/* Rating */}
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              viewBox="0 0 24 24"
              fill={i < Math.floor(course.rating) ? "#FACC15" : "#E5E7EB"}
              className="w-5 h-5"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
          <span className="text-sm font-medium text-indigo-900">
            {course.rating}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-medium md:text-xl font-semibold text-orange-500 leading-tight line-clamp-1 min-h-[10px] max-h-[38px]">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-[12px] lg:text-[15px] leading-6 line-clamp-3 min-h-[45px] max-h-[15px]">
          {course.description}
        </p>

        {/* Instructor */}
        <p className="text-gray-700 text-[14px] md:text-base">
          by <span className="font-semibold">{course.instructor}</span>
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center text-[12px] gap-1">
            <Clock className="md:w-4 md:h-4 h-3 w-3" />
            <span>{course.duration}</span>
          </div>

          <div className="flex items-center text-[12px] gap-1">
            <Users className="md:w-4 md:h-4 h-3 w-3" />
            <span>{course.students}</span>
          </div>
        </div>

        {/* Button — always at bottom */}
        <button
          onClick={handleEnrollClick}
          className="w-full mt-auto py-3 text-sm rounded-xl text-white lg:text-lg font-semibold bg-orange-500 hover:bg-orange-600 transition-all duration-200"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
}
