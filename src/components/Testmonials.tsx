"use client";
import Image from "next/image";
import React from "react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Marcus Rodriguez",
      role: "Student",
      quote:
        "The community aspect is incredible. I found collaborators, mentors, and even my co-founder through GenZ AI Hub.",
      backgroundImage: "/marcus.jpg",
      type: "background",
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "School Teacher",
      quote:
        "GenZ AI Hub gave me the exact skills I needed to transition from teaching to EdTech product management. The industry-specific focus made all the difference.",
      image: "/test1.jpg",
      type: "gradient",
    },
    {
      id: 4,
      name: "Rahul M",
      role: "Data Analys",
      quote:
        "GenZ AI Hub helped me move from data reporting to AI-driven analytics. The hands-on projects gave me real industry confidence.",
      backgroundImage: "/test3.jpg",
      type: "background",
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "Coordinator",
      quote:
        "Finally, AI education that's not just theory. I built three real projects that landed me interviews at top tech companies.",
      image: "/test2.jpg",
      type: "gradient",
    },
    // {
    //   id: 4,
    //   name: "Rahul M",
    //   role: "Data Analyst",
    //   quote:
    //     "GenZ AI Hub helped me move from data reporting to AI-driven analytics. The hands-on projects gave me real industry confidence.",
    //   type: "dark",
    // },
  ];

  return (
    <section className="w-full bg-white py-12 md:py-20 px-4 md:px-8 overflow-hidden -translate-y-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-indigo-800 text-lg font-medium mb-2">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-3xl text-orange-400">
            Trusted by Professionals Worldwide
          </h2>
        </div>

        {/* Testimonials Continuous Slider */}
        <div className="relative">
          <div className="slider-container">
            <div className="slider-track">
              {/* First set of testimonials */}
              {testimonials.map((testimonial) => (
                <div
                  key={`first-${testimonial.id}`}
                  className={`w-80 md:w-80 flex-shrink-0 h-auto rounded-lg p-6  flex flex-col justify-between mx-3 ${
                    testimonial.type === "background"
                      ? "bg-cover bg-center relative before:content-[''] before:absolute before:inset-0 before:bg-black/30 before:rounded-lg"
                      : testimonial.type === "gradient"
                      ? "bg-gradient-to-bl from-orange-500 via-orange-400 to-yellow-800"
                      : "bg-black/50"
                  }`}
                  style={
                    testimonial.backgroundImage
                      ? {
                          backgroundImage: `url('${testimonial.backgroundImage}')`,
                        }
                      : {}
                  }
                >
                  {testimonial.type === "gradient" ? (
                    <>
                      <p className="text-2xl md:text-xl text-white mb-8">
                        {testimonial.quote}
                      </p>
                      <div className="flex items-center gap-4">
                        <Image
                          width={600}
                          height={600}
                          className="w-20 h-20 rounded-full"
                          src={testimonial.image || "/test1.jpg"}
                          alt={testimonial.name}
                        />
                        <div>
                          <h4 className="text-xl md:text-lg text-white">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-white">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative z-10">
                        <h4 className="text-xl md:text-xl text-white mb-2">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-white mb-8">
                          {testimonial.role}
                        </p>
                      </div>
                      <p className="text-2xl md:text-xl text-white relative z-10">
                        {testimonial.quote}
                      </p>
                    </>
                  )}
                </div>
              ))}

              {/* Duplicate set for seamless loop */}
              {testimonials.map((testimonial) => (
                <div
                  key={`first-${testimonial.id}`}
                  className={`w-80 md:w-80 flex-shrink-0 h-auto rounded-lg p-6  flex flex-col justify-between mx-3 ${
                    testimonial.type === "background"
                      ? "bg-cover bg-center relative before:content-[''] before:absolute before:inset-0 before:bg-black/30 before:rounded-lg"
                      : testimonial.type === "gradient"
                      ? "bg-gradient-to-bl from-orange-500 via-orange-400 to-yellow-800"
                      : "bg-black/50"
                  }`}
                  style={
                    testimonial.backgroundImage
                      ? {
                          backgroundImage: `url('${testimonial.backgroundImage}')`,
                        }
                      : {}
                  }
                >
                  {testimonial.type === "gradient" ? (
                    <>
                      <p className="text-2xl md:text-xl text-white mb-8">
                        {testimonial.quote}
                      </p>
                      <div className="flex items-center gap-4">
                        <Image
                          width={600}
                          height={600}
                          className="w-20 h-20 rounded-full"
                          src={testimonial.image || "/test1.jpg"}
                          alt={testimonial.name}
                        />
                        <div>
                          <h4 className="text-xl md:text-lg text-white">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-white">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative z-10">
                        <h4 className="text-xl md:text-xl text-white mb-2">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-white mb-8">
                          {testimonial.role}
                        </p>
                      </div>
                      <p className="text-2xl md:text-xl text-white relative z-10">
                        {testimonial.quote}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider-container {
          overflow: hidden;
          position: relative;
        }

        .slider-track {
          display: flex;
          animation: scroll 30s linear infinite;
          width: fit-content;
        }

        .slider-track:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
