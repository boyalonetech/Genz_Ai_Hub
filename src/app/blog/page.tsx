"use client";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { articles } from "../data/blog";

export default function BlogPage() {
  const router = useRouter();

  const handleArticleClick = (articleId: number) => {
    router.push(`/blog/${articleId}`);
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Hero Section with decorative circles and search */}
      <div className="relative w-full bg-white overflow-hidden px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-20">
        {/* Decorative circle - right side (hidden on mobile, visible on large screens) */}
        <div className=" absolute w-48 h-48 xl:w-64 xl:h-64 -right-35 top-0 xl:-right-26 lg:top-16 opacity-75 bg-orange-400 rounded-full shadow-[inset_0px_4px_53px_18px_rgba(0,0,0,0.25)]" />

        {/* Decorative circle - left side (hidden on mobile, visible on large screens) */}
        <div className=" absolute w-64 h-64 xl:w-96 xl:h-96 -left-32 xl:-left-64 top-35 lg:top-16 opacity-75 bg-orange-400 rounded-full shadow-[inset_0px_4px_53px_18px_rgba(0,0,0,0.25)]" />

        {/* Main content container */}
        <div className="relative max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Page title */}
          <h1 className="text-center text-indigo-800 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal font-['Unbounded'] leading-tight">
            AI Resources & Insights
          </h1>

          {/* Page description */}
          <p className="text-center text-black text-base sm:text-lg lg:text-xl font-normal font-['Unbounded'] leading-relaxed max-w-3xl mx-auto">
            Stay updated with the latest AI trends, tutorials, and career advice
          </p>

          {/* Search bar */}
          <div className="max-w-3xl mx-auto px-5 py-3.5 bg-zinc-300 rounded-lg border border-neutral-400 flex items-center gap-2.5">
            <div className="w-6 h-6 relative flex-shrink-0">
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
              placeholder="Search Articles..."
              className="flex-1 bg-transparent text-black text-lg font-medium font-['Lato'] outline-none placeholder:text-black"
            />
          </div>
        </div>
      </div>

      {/* Articles Grid Section */}
      <div className="w-full px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-gray-200 rounded-[20px] cursor-pointer overflow-hidden hover:shadow-lg transition-shadow duration-300"
                onClick={() => handleArticleClick(article.id)}
              >
                {/* Article card content */}
                <div className="p-6 sm:p-8 space-y-4 sm:space-y-6">
                  {/* Article image */}
                  <Image
                    height={600}
                    width={600}
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-[20px]"
                  />

                  {/* Article title */}
                  <h2 className="text-black text-lg sm:text-xl font-normal font-['Unbounded'] leading-tight min-h-[4rem] sm:min-h-[5rem]">
                    {article.title}
                  </h2>

                  {/* Divider line */}
                  <div className="w-full h-0.5 bg-black/40"></div>

                  {/* Article date with icon */}
                  <div className="flex items-center gap-2.5 pt-2">
                    {/* Calendar icon */}
                    <div className="w-5 h-5 sm:w-6 sm:h-6 relative overflow-hidden flex-shrink-0">
                      <Calendar />
                    </div>
                    {/* Date text */}
                    <span className="text-black/50 text-sm sm:text-base font-medium font-['Unbounded'] leading-relaxed">
                      {article.date}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center mt-8 sm:mt-12 lg:mt-16">
            <button className="px-6 sm:px-7 py-3 sm:py-4 bg-orange-500 rounded-[10px] text-white text-base sm:text-lg font-medium font-['Lato'] leading-tight hover:bg-orange-600 transition-colors">
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}