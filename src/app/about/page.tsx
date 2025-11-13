import React from "react";
import Faqs from "@/components/Faqs";
import Image from "next/image";

export default function Page() {
  // Data arrays for reusable content
  const teamMembers = [
    { name: "Charles Mark", role: "CEO & Founder" },
    { name: "Nwoko Elvis", role: "UIUX Designer" },
    { name: "Boy Alone Tech", role: "CTO" },
    { name: "Juanita Flores", role: "CEO & Founder" },
    { name: "Nwoko Elvis", role: "UIUX Designer" },
    { name: "BoyAlone Tech", role: "CTO" },
  ];

  const features = [
    {
      title: "Education",
      desc: "Industry-specific courses designed for real-world application",
      icon: "/education_brain.png",
      width: 50,
      height: 50,
    },
    {
      title: "Mentorship",
      desc: "One-on-one guidance from experienced AI professionals",
      icon: "/mentorship.png",
      width: 50,
      height: 50,
    },
    {
      title: "Innovation Lab",
      desc: "Collaborate on cutting-edge projects with peers",
      icon: "/innovation.png",
      width: 40,
      height: 40,
    },
    {
      title: "Career Growth",
      desc: "Job board and certification programs",
      icon: "/chart.png",
      width: 50,
      height: 50,
    },
    {
      title: "Credentials",
      desc: "Recognized certifications valued by employers",
      icon: "/certificate.png",
      width: 50,
      height: 50,
    },
    {
      title: "Community",
      desc: "Global network of Gen Z AI professionals",
      icon: "/community.png",
      width: 50,
      height: 50,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <div className="w-full h-auto lg:h-[685px] relative bg-white overflow-hidden">
        <div className="hidden lg:block w-64 h-64 absolute right-[-70px] top-36 opacity-75 bg-orange-400 rounded-full shadow-[inset_0px_4px_53px_18px_rgba(0,0,0,0.25)]" />
        <div className="hidden lg:block w-96 h-96 absolute left-[-248px] top-32 opacity-75 bg-orange-400 rounded-full shadow-[inset_0px_4px_53px_18px_rgba(0,0,0,0.25)]" />

        <div className="px-4 sm:px-6 lg:px-8 pt-8 lg:pt-20 text-center">
          <div className="text-indigo-800 text-xl font-normal font-['Unbounded'] leading-7 mb-4">
            Who We Are
          </div>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-normal font-['Unbounded'] leading-tight">
              <span className="text-indigo-800">Empowering </span>
              <span className="text-orange-400">Gen Z </span>
              <span className="text-indigo-800">to lead with </span>
              <span className="text-orange-400">AI</span>
            </h1>
          </div>
          <div className="text-orange-400 text-xl sm:text-2xl font-normal font-['Unbounded'] leading-8 mt-6">
            Trusted by 100+ businesses
          </div>
        </div>

        {/* Logo Carousel */}
        <div className="w-full overflow-hidden mt-8 lg:mt-16">
          <div className="animate-marquee whitespace-nowrap flex gap-12 lg:gap-24 px-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-9 h-10 bg-gray-300 rounded flex-shrink-0"
              />
            ))}
          </div>
        </div>

        <div className="hidden lg:block w-44 h-40 absolute right-5 bottom-0 bg-white/60 backdrop-blur-md" />
        <div className="hidden lg:block w-44 h-44 absolute left-0 bottom-0 bg-white/60 backdrop-blur-md" />
      </div>

      {/* Features Section */}
      <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="px-5 py-2.5 rounded-[50px] outline outline-2 outline-offset-[-2px] outline-indigo-800 inline-flex justify-center items-center gap-2.5 mb-8">
            <div className="text-center text-indigo-800 text-sm font-medium font-['Unbounded'] leading-5 tracking-tight">
              Our Story
            </div>
          </div>

          <div className="text-orange-400 text-2xl sm:text-3xl lg:text-4xl font-normal font-['Unbounded'] leading-tight mb-12">
            GenZ AI Hub was created to bridge the gap between over complicated
            AI theory and shallow tutorials giving Gen Z the practical,
            industry-ready skills schools don&apos;t teach. It&apos;s more than a learning
            platform it&apos;s a movement empowering a generation to lead the AI
            revolution.
          </div>

          {/* Trusted Companies */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-16">
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <Image
                  key={i}
                  src="https://placehold.co/60x60"
                  alt="Company logo"
                  width={56}
                  height={56}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-[30px]"
                />
              ))}
              <div className="w-12 h-12 sm:w-14 sm:h-14 relative bg-gradient-to-b from-orange-400 to-yellow-600 rounded-[30px] overflow-hidden flex items-center justify-center">
                <div className="text-white text-sm sm:text-xl font-normal font-['Unbounded']">
                  1k
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-1.5">
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 bg-orange-400 rounded-sm"
                  />
                ))}
              </div>
              <div className="text-center sm:text-left text-black text-sm sm:text-base font-normal font-['Lato'] leading-6 tracking-wide">
                Trusted by 100+ companies
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border-2 border-orange-400 p-6 h-80 flex flex-col"
              >
                <div className="w-14 h-14 mb-4 flex items-center justify-center">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={feature.width}
                    height={feature.height}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-black text-xl sm:text-2xl font-normal font-['Unbounded'] leading-8 mb-4">
                  {feature.title}
                </h3>
                <p className="text-black/60 text-lg sm:text-xl font-normal font-['Unbounded'] leading-7 flex-1">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <div className="bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl p-8 overflow-hidden aspect-square max-w-lg mx-auto">
                <Image
                  src="/about.jpg"
                  alt="About our company"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="px-5 py-2.5 rounded-[50px] outline outline-2 outline-offset-[-2px] outline-indigo-800 inline-flex justify-center items-center gap-2.5 mb-6">
                <div className="text-center text-indigo-800 text-sm font-medium font-['Unbounded'] leading-5 tracking-tight">
                  About
                </div>
              </div>

              <h2 className="text-orange-400 text-3xl sm:text-4xl font-normal font-['Unbounded'] leading-tight mb-6">
                About Our Company
              </h2>

              <p className="text-black/60 text-lg sm:text-xl font-normal font-['Unbounded'] leading-7 mb-8">
                At GenZ AI Hub, we&apos;re on a mission to empower the next
                generation with practical, future-ready AI skills. Our team
                blends creativity and real-world expertise to deliver hands-on
                learning, industry-focused tools, and community-driven insights
                that help you turn AI into impact. Join us to shape the future
                not just adapt to it.
              </p>

              {/* Trusted Companies */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex gap-3">
                  {[...Array(4)].map((_, i) => (
                    <Image
                      key={i}
                      src="https://placehold.co/60x60"
                      alt="Company logo"
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-[30px]"
                    />
                  ))}
                  <div className="w-12 h-12 relative bg-gradient-to-b from-orange-400 to-yellow-600 rounded-[30px] overflow-hidden flex items-center justify-center">
                    <div className="text-white text-sm font-normal font-['Unbounded']">
                      1k
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center sm:items-start gap-1.5">
                  <div className="flex gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 bg-orange-400 rounded-sm"
                      />
                    ))}
                  </div>
                  <div className="text-center sm:text-left text-black text-sm font-normal font-['Lato'] leading-6 tracking-wide">
                    Trusted by 100+ companies
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-indigo-800 text-xl font-normal font-['Unbounded'] leading-7 mb-4">
            Team
          </div>
          <h2 className="text-orange-400 text-4xl sm:text-5xl lg:text-7xl font-normal font-['Unbounded'] leading-tight mb-16">
            Meet the team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-200 rounded-2xl border-2 border-orange-400 overflow-hidden"
              >
                <Image
                  src="https://placehold.co/400x400"
                  alt={member.name}
                  width={400}
                  height={320}
                  className="w-full h-80 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-black text-xl sm:text-2xl font-normal font-['Unbounded'] leading-8 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-black text-lg font-medium font-['Lato'] leading-5 tracking-tight">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <Faqs />
    </div>
  );
}
