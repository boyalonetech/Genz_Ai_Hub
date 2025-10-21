"use client";
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [lastscrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setLastScrollY(currentScrollY);
    };

    if (lastscrollY > 0) {
      setIsMenuOpen(false);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastscrollY]);

  return (
    <nav className="">
      <div className="left-2 right-2 md:left-5 md:right-5 px-4 md:px-8 lg:px-5 py-3 md:py-3 bg-white flex justify-between items-center fixed shadow-sm top-2 md:top-4 rounded-2xl md:rounded-3xl z-50">
        {/* Logo */}
        <Link
          href="/"
          className="w-20 h-12 md:w-28 md:h-16 relative overflow-hidden flex-shrink-0"
        >
          <Image src="/LOGO.jpg" alt="Logo" sizes="fill" fill quality={100} />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex justify-center items-center gap-12 xl:gap-36">
          <div className="py-2.5 flex justify-start items-center gap-6 xl:gap-12">
            <div className=" py-[5px] flex justify-center items-center gap-2.5 cursor-pointer transition-opacity">
              <Link
                href="/"
                className="text-center justify-start text-indigo-800 text-[10px] xl:text-[13px]  hover:text-orange-500  font-medium leading-tight tracking-tight"
              >
                Courses
              </Link>
            </div>
            <div className="px-2.5 py-[5px] flex justify-center items-center gap-2.5 cursor-pointer transition-opacity">
              <Link
                href="/"
                className="text-center justify-start text-indigo-800 text-[10px] xl:text-[13px]  hover:text-orange-500  font-medium leading-tight tracking-tight"
              >
                Resources
              </Link>
            </div>
            <div className="px-2.5 py-[5px] flex justify-center items-center gap-2.5 cursor-pointer transition-opacity">
              <Link
                href="/"
                className="text-center justify-start text-indigo-800 text-[10px] xl:text-[13px]  hover:text-orange-500  font-medium leading-tight tracking-tight"
              >
                About
              </Link>
            </div>
            <div className="px-2.5 py-[5px] flex justify-center items-center gap-2.5 cursor-pointer transition-opacity">
              <Link
                href="/"
                className="text-center justify-start text-indigo-800 text-[10px] xl:text-[13px]  hover:text-orange-500  font-medium leading-tight tracking-tight"
              >
                Roadmap
              </Link>
            </div>
            <div className="px-2.5 py-[5px] flex justify-center items-center gap-2.5 cursor-pointer transition-opacity">
              <Link
                href="/"
                className="text-center justify-start text-indigo-800 text-[10px] xl:text-[13px]  hover:text-orange-500  font-medium leading-tight tracking-tight"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="p-3 xl:p-4 px-4 xl:px-5 hidden lg:flex bg-orange-500 rounded-[10px]  justify-center items-center gap-2.5 cursor-pointer hover:bg-orange-600 transition-colors">
          <div className="text-center justify-start text-white text-[10px] xl:text-[13px]   font-medium leading-tight tracking-tight">
            Get Started
          </div>
          <ArrowRight className="w-4 h-4 text-white" />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-indigo-800 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-0 md:top-0 w-full bg-black/60  h-full  shadow-lg z-40 p-6">
          <div className="lg:hidden fixed top-22 md:top-24 backdrop:blur-2xl left-2 right-2 md:left-5 md:right-5 bg-white rounded-2xl shadow-lg z-40 p-6">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="px-4 py-3 text-indigo-800 text-base font-medium  hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              >
                Courses
              </Link>
              <Link
                href="/"
                className="px-4 py-3 text-indigo-800 text-base font-medium  hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              >
                Resources
              </Link>
              <Link
                href="/"
                className="px-4 py-3 text-indigo-800 text-base font-medium  hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              >
                About
              </Link>
              <Link
                href="/"
                className="px-4 py-3 text-indigo-800 text-base font-medium  hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              >
                Roadmap
              </Link>
              <Link
                href="/"
                className="px-4 py-3 text-indigo-800 text-base font-medium  hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              >
                Contact
              </Link>
              <div className="mt-2 p-4 bg-orange-500 rounded-[10px] flex justify-center items-center gap-2.5 cursor-pointer hover:bg-orange-600 transition-colors">
                <div className="text-center text-white text-base font-medium">
                  Get Started
                </div>
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
