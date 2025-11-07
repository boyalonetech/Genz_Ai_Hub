import { Timer, Users2 } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Single() {
  return (
    <section className="w-full min-h-screen relative overflow-x-hidden">
      <div className="w-64 h-64 -right-30 top-36 absolute opacity-75 bg-orange-500 rounded-full " />
      <div className="w-96 h-96 -left-72 top-32 absolute opacity-75 bg-orange-500 rounded-full " />

      {/* hero */}
      <div className="flex w-full max-w-7xl mx-auto gap-10  pt-50  justify-between">
        <div className=" flex flex-col gap-10 px-4  pb-16">
          <div className="flex flex-col">
            <h1 className="font-semibold text-2xl text-[#1500B0] mb-4">
              AI for Educators
            </h1>
            <p className="text-[22px] w-[750px] text-[#00000099]">
              Master AI-powered teaching tools, automate grading, and create
              personalized learning experiences for your students.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-10">
              {/* Ratings */}

              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5">
                    <div
                      className={`w-5 h-5 ${
                        i < Math.floor(4.8)
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
                <span className="ml-2 text-indigo-800 font-semibold">4.8</span>
              </div>

              {/* Time */}

              <div className="flex gap-2">
                <Timer />
                <p className="font-[Lato] font-[500] text-lg">8 weeks</p>
              </div>

              {/* People */}

              <div className="flex gap-2">
                <Users2 />
                <p className="text-[18px] font-[Lato] font-[500]">2,430</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl h-[598px]shadow-lg w-full sticky top-8">
          {/* Price & Enrollment */}
          <div className="text-center mb-6">
            <Image
              src="/course1.jpg"
              alt=""
              height={100}
              width={100}
              className="aspect-video w-full"
            />
            <div className="text-3xl font-bold text-indigo-800 mb-2"></div>
            <div className="p-6">
              <button className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors mb-4">
                Enroll Now
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors mb-6">
                Add to Wishlist
              </button>
            </div>
          </div>

          {/* Course Features */}
          <div className="space-y-4 mb-6 p-6">
            <div className="flex items-center gap-3 text-gray-600">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span>8 weeks self-paced</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span>Lifetime access</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span>Certificate of completion</span>
            </div>
          </div>

          {/* Requirements */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Requirements</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-5 h-5 border-2 border-gray-400 rounded-sm flex items-center justify-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-sm" />
                </div>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
