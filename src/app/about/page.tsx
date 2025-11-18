"use client";
import React from "react";
import Faqs from "@/components/Faqs";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Types
interface TeamMember {
  name: string;
  role: string;
  link: string;
  image: string;
  roleIcon: string;
}

interface Feature {
  title: string;
  desc: string;
  icon: string;
  width: number;
  height: number;
}

interface CompanyLogo {
  name: string;
  logo: string;
  alt: string;
}

interface Partner {
  id: number;
  alt: string;
  image: string;
}

export default function Page(): React.JSX.Element {
  const router = useRouter();
  // Data arrays for reusable content
  const teamMembers: TeamMember[] = [
    {
      name: "Charles Mark",
      role: "CEO & Founder",
      image: "/team/charles_mark.jpg",
      link: "/",
      roleIcon: "/roles/founder.jpg",
    },
    {
      name: "Nwoko Elvis",
      role: "UIUX Designer",
      image: "/team/elvis_nwoko.jpg",
      link: "/",
      roleIcon: "/roles/uiux.png",
    },
    {
      name: "Divine Timothy",
      role: "CTO",
      image: "/team/divine_timothy.jpg",
      link: "https://boyalonetechs.onrender.com",
      roleIcon: "/roles/developer.jpg",
    },
    {
      name: "Kelvin Mark",
      role: "Graphic Designer",
      image: "/team/kelvin_mark.jpg",
      link: "/",
      roleIcon: "/roles/designer.png",
    },
    {
      name: "Blessing Ogba",
      role: "Visual Assistant",
      image: "/team/blessing_ogba.jpg",
      link: "/",
      roleIcon: "/roles/designer.png",
    },
    {
      name: "Ogbonna Smart",
      role: "Coo",
      image: "/team/smart_ogbonna.jpg",
      link: "/",
      roleIcon: "/roles/cto.png",
    },
  ];

  const features: Feature[] = [
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

  // Company logos data
  const companyLogos: CompanyLogo[] = [
    {
      name: "Google",
      logo: "/test2.jpg",
      alt: "Google logo",
    },
    {
      name: "Microsoft",
      logo: "/trust1.png",
      alt: "Microsoft logo",
    },
    {
      name: "Amazon",
      logo: "/marcus.jpg",
      alt: "Amazon logo",
    },
    {
      name: "Meta",
      logo: "/test1.jpg",
      alt: "Meta logo",
    },
    {
      name: "Netflix",
      logo: "/test1.jpg",
      alt: "Netflix logo",
    },
    {
      name: "Apple",
      logo: "/test2.jpg",
      alt: "Apple logo",
    },
    {
      name: "Tesla",
      logo: "/test3.jpg",
      alt: "Tesla logo",
    },
    {
      name: "OpenAI",
      logo: "/marcus.jpg",
      alt: "OpenAI logo",
    },
  ];

  const partners: Partner[] = [
    {
      id: 1,
      alt: "",
      image: "/",
    },
  ];

  // Role icon mapping for fallback
  const roleIcons: Record<string, string> = {
    "CEO & Founder": "/roles/ceo.png",
    "UIUX Designer": "/roles/designer.png",
    Developer: "/roles/developer.png",
    "Graphic Designer": "/roles/designer.png",
    CTO: "/roles/cto.png",
  };

  // Helper function to get safe image URL
  const getSafeImageUrl = (url: string): string => {
    // In a real app, you might want to check if the image exists
    // For now, we'll use the provided URLs and rely on proper file management
    return url;
  };

  return (
    <div className="w-full min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <div className="w-full h-auto lg:h-[90vh] relative bg-white overflow-hidden">
        <div className=" lg:block w-36 h-36 lg:w-64 lg:h-64 absolute right-[-70px] -top-12 lg:top-36 opacity-75 bg-orange-400 rounded-full shadow-[inset_0px_4px_53px_18px_rgba(0,0,0,0.1)]" />
        <div className=" lg:block w-64 h-64 lg:w-96 lg:h-96 absolute -left-[180px] lg:left-[-248px] top-32 opacity-75 bg-orange-400 rounded-full shadow-[inset_0px_4px_53px_18px_rgba(0,0,0,0.1)]" />

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
          <div className="animate-marquee whitespace-nowrap flex gap-8 lg:gap-12 px-4">
            {partners.map((partner) => (
              <div key={partner.id} className="flex-shrink-0">
                {/* <Image
                  src={partner.image}
                  alt={partner.alt}
                  width={72}
                  height={72}
                  className="w-16 h-16 lg:w-18 lg:h-18 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                /> */}
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block w-44 h-40 absolute right-5 bottom-0 bg-white/60 backdrop-blur-md" />
        <div className="hidden lg:block w-44 h-44 absolute left-0 bottom-0 bg-white/60 backdrop-blur-md" />
      </div>

      {/* Features Section */}
      <div className="w-full py-5 pb-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="px-5 py-2.5 rounded-[50px] outline outline-2 outline-offset-[-2px] outline-indigo-800 inline-flex justify-center items-center gap-2.5 mb-8">
            <div className="text-center text-indigo-800 text-sm font-medium font-['Unbounded'] leading-5 tracking-tight">
              Our Story
            </div>
          </div>

          <div className="text-orange-400 text-2xl sm:text-2xl xl:text-3xl font-normal font-['Unbounded'] leading-tight mb-12">
            GenZ AI Hub was created to bridge the gap between over complicated
            AI theory and shallow tutorials giving Gen Z the practical,
            industry-ready skills schools don&apos;t teach. It&apos;s more than
            a learning platform it&apos;s a movement empowering a generation to
            lead the AI revolution.
          </div>

          {/* Trusted Companies */}
          <div className="flex flex-col sm:flex-row  items-center gap-6 mb-16">
            <div className="flex gap-4">
              {companyLogos
                .slice(0, 4)
                .map((company: CompanyLogo, index: number) => (
                  <div key={index} className="relative group">
                    <Image
                      src={company.logo}
                      alt={company.alt}
                      width={100}
                      height={100}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-200  group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-orange-300 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  </div>
                ))}
              <div className="w-12  h-12 sm:w-12 sm:h-12 relative bg-gradient-to-br from-orange-400 to-yellow-600 rounded-full overflow-hidden flex items-center justify-center group">
                <div className="text-white text-sm sm:text-lg font-bold font-['Unbounded'] group-hover:scale-110 transition-transform duration-300">
                  1k+
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl" />
              </div>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i: number) => (
                  <div
                    key={i}
                    className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-400 rounded-full"
                  />
                ))}
              </div>
              <div className="text-center sm:text-left text-black text-sm sm:text-base font-normal font-['Lato'] leading-6 tracking-wide">
                Trusted by 100+ companies worldwide
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature: Feature, index: number) => (
              <div
                key={index}
                className="bg-white rounded-2xl border-2 border-orange-400 p-6 h-80 flex flex-col hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 mb-4 flex items-center justify-center bg-orange-50 rounded-2xl">
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
                  {companyLogos
                    .slice(4, 8)
                    .map((company: CompanyLogo, index: number) => (
                      <div key={index} className="relative group">
                        <Image
                          src={company.logo}
                          alt={company.alt}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover border border-gray-200 group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-orange-400 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                      </div>
                    ))}
                  <div className="w-12 h-12 relative bg-gradient-to-br from-orange-400 to-yellow-600 rounded-full overflow-hidden flex items-center justify-center group">
                    <div className="text-white text-xs font-bold font-['Unbounded'] group-hover:scale-110 transition-transform duration-300">
                      1k+
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center sm:items-start gap-1.5">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i: number) => (
                      <div
                        key={i}
                        className="w-3 h-3 bg-orange-400 rounded-full"
                      />
                    ))}
                  </div>
                  <div className="text-center sm:text-left text-black text-sm font-normal font-['Lato'] leading-6 tracking-wide">
                    Trusted by industry leaders
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="w-full py-16 px-2 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-indigo-800 text-xl font-normal font-['Unbounded'] leading-7 mb-4">
            Team
          </div>
          <h2 className="text-orange-400 text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight mb-16">
            Meet the team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member: TeamMember, index: number) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md cursor-pointer lg:border-none lg:border-orange-400 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                onClick={() => router.push(member.link)}
              >
                <div className="relative">
                  <Image
                    src={getSafeImageUrl(member.image)}
                    alt={member.name}
                    width={400}
                    height={320}
                    className="w-full h-80 object-cover"
                  />
                  {/* Role Icon Badge */}
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
                    <Image
                      src={getSafeImageUrl(
                        member.roleIcon || roleIcons[member.role]
                      )}
                      alt={`${member.role} icon`}
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-black text-xl sm:text-2xl font-normal font-['Unbounded'] leading-8 mb-2">
                    {member.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <Image
                      src={getSafeImageUrl(
                        member.roleIcon || roleIcons[member.role]
                      )}
                      alt=""
                      width={20}
                      height={20}
                      className="w-5 h-5 object-contain"
                    />
                    <p className="text-black text-sm font-sm font-['Unbounded'] leading-5 tracking-tight">
                      {member.role}
                    </p>
                  </div>
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
