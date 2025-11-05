import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-white py-12 md:pt-6 md:pb-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Section - Logo and Social */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8 pb-8 border-b-2 border-indigo-800/50">
          {/* Logo */}
          <div className="w-28 h-16 relative flex-shrink-0">
            <Image src="/LOGO.jpg" alt="Logo" sizes="fill" fill quality={100} />
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            {/* FaceBook */}
            <Link href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                className="w-7 h-7 text-indigo-800 rounded hover:text-orange-400 cursor-pointer transition-colors"
              >
                <path
                  fill="currentColor"
                  d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02"
                ></path>
              </svg>
            </Link>

            {/* Whatsapp */}

            <Link href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                className="w-7 h-7 text-indigo-800 rounded hover:text-orange-400 cursor-pointer transition-colors"
              >
                <g fill="none" fillRule="evenodd">
                  <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                  <path
                    fill="currentColor"
                    d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.546 20.2A1.01 1.01 0 0 0 3.8 21.454l3.032-.892A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2M9.738 14.263c2.023 2.022 3.954 2.289 4.636 2.314c1.037.038 2.047-.754 2.44-1.673a.7.7 0 0 0-.088-.703c-.548-.7-1.289-1.203-2.013-1.703a.71.71 0 0 0-.973.158l-.6.915a.23.23 0 0 1-.305.076c-.407-.233-1-.629-1.426-1.055s-.798-.992-1.007-1.373a.23.23 0 0 1 .067-.291l.924-.686a.71.71 0 0 0 .12-.94c-.448-.656-.97-1.49-1.727-2.043a.7.7 0 0 0-.684-.075c-.92.394-1.716 1.404-1.678 2.443c.025.682.292 2.613 2.314 4.636"
                  ></path>
                </g>
              </svg>
            </Link>

            {/* Instagram */}

            <Link href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                className="w-7 h-7 text-indigo-800 rounded hover:text-orange-400 cursor-pointer transition-colors"
              >
                <circle
                  cx={17}
                  cy={7}
                  r={1.5}
                  fill="currentColor"
                  fillOpacity={0}
                >
                  <animate
                    fill="freeze"
                    attributeName="fill-opacity"
                    begin="1.3s"
                    dur="0.15s"
                    values="0;1"
                  ></animate>
                </circle>
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                >
                  <path
                    strokeDasharray={72}
                    strokeDashoffset={72}
                    d="M16 3c2.76 0 5 2.24 5 5v8c0 2.76 -2.24 5 -5 5h-8c-2.76 0 -5 -2.24 -5 -5v-8c0 -2.76 2.24 -5 5 -5h4Z"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      dur="0.6s"
                      values="72;0"
                    ></animate>
                  </path>
                  <path
                    strokeDasharray={28}
                    strokeDashoffset={28}
                    d="M12 8c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="0.7s"
                      dur="0.6s"
                      values="28;0"
                    ></animate>
                  </path>
                </g>
              </svg>
            </Link>

            {/* Twitter */}

            <Link href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                className="w-7 h-7 text-indigo-800 rounded hover:text-orange-400 cursor-pointer transition-colors"
              >
                <path
                  fill="currentColor"
                  d="M8.5 2h2.5L11 2h-2.5zM13 2h2.5L15.5 2h-2.5zM10.5 2h5v0h-5zM8.5 2h5v0h-5zM10 2h3.5L13.5 2h-3.5z"
                >
                  <animate
                    fill="freeze"
                    attributeName="d"
                    dur="0.8s"
                    keyTimes="0;0.3;0.5;1"
                    values="M8.5 2h2.5L11 2h-2.5zM13 2h2.5L15.5 2h-2.5zM10.5 2h5v0h-5zM8.5 2h5v0h-5zM10 2h3.5L13.5 2h-3.5z;M8.5 2h2.5L11 22h-2.5zM13 2h2.5L15.5 22h-2.5zM10.5 2h5v2h-5zM8.5 20h5v2h-5zM10 2h3.5L13.5 22h-3.5z;M8.5 2h2.5L11 22h-2.5zM13 2h2.5L15.5 22h-2.5zM10.5 2h5v2h-5zM8.5 20h5v2h-5zM10 2h3.5L13.5 22h-3.5z;M1 2h2.5L18.5 22h-2.5zM5.5 2h2.5L23 22h-2.5zM3 2h5v2h-5zM16 20h5v2h-5zM18.5 2h3.5L5 22h-3.5z"
                  ></animate>
                </path>
              </svg>
            </Link>

            {/* Youtube */}

            <Link href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                className="w-7 h-7 text-indigo-800 rounded hover:text-orange-400 cursor-pointer transition-colors"
              >
                <mask id="SVGsyA92bmM">
                  <g
                    fill="none"
                    fillOpacity={0}
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  >
                    <path
                      fill="#fff"
                      strokeDasharray={64}
                      strokeDashoffset={64}
                      d="M12 5c9 0 9 0 9 7c0 7 0 7 -9 7c-9 0 -9 0 -9 -7c0 -7 0 -7 9 -7Z"
                    >
                      <animate
                        fill="freeze"
                        attributeName="fill-opacity"
                        begin="0.6s"
                        dur="0.5s"
                        values="0;1"
                      ></animate>
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        dur="0.6s"
                        values="64;0"
                      ></animate>
                    </path>
                    <path fill="#000" stroke="none" d="M12 11L12 12L12 13z">
                      <animate
                        fill="freeze"
                        attributeName="d"
                        begin="1.1s"
                        dur="0.2s"
                        values="M12 11L12 12L12 13z;M10 8.5L16 12L10 15.5z"
                      ></animate>
                      <set
                        fill="freeze"
                        attributeName="fill-opacity"
                        begin="1.1s"
                        to={1}
                      ></set>
                    </path>
                  </g>
                </mask>
                <rect
                  width={24}
                  height={24}
                  fill="currentColor"
                  mask="url(#SVGsyA92bmM)"
                ></rect>
              </svg>
            </Link>
          </div>
        </div>

        {/* Middle Section - Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 pb-8 border-b-2 border-indigo-800/50">
          {/* Pages */}
          <div>
            <h3 className="text-2xl md:text-xl text-orange-400 mb-4">Pages</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-indigo-800 text-[15px] hover:text-orange-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-indigo-800 text-[15px] hover:text-orange-400 transition-colors"
                >
                  Roadmap
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-indigo-800 text-[15px] hover:text-orange-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-indigo-800 text-[15px] hover:text-orange-400 transition-colors"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-indigo-800 text-[15px] hover:text-orange-400 transition-colors"
                >
                  Courses
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-2xl md:text-xl text-orange-400 mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-indigo-800 text-[15px] hover:text-orange-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-indigo-800 text-[15px] hover:text-orange-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Network */}
          <div>
            <h3 className="text-2xl md:text-xl text-orange-400 mb-4">
              Network
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-indigo-800 text-[15px] hover:text-orange-400 transition-colors"
                >
                  Telegram
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-indigo-800 text-[15px] hover:text-orange-400 transition-colors"
                >
                  Discord
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-2xl md:text-xl text-orange-400 mb-4">
              Newsletter
            </h3>
            <p className="text-lg md:text-[15px] text-black mb-4">
              Join our newsletter for exclusive updates and insights.
            </p>
            <div className="flex gap-2 bg-zinc-300 rounded-lg p-1">
              <input
                type="email"
                placeholder="Enter your Email"
                className="flex-1 px-3 py-2 text-[12px]  w-full bg-transparent relative text-black/60 outline-none"
              />
              <button className="w-10 h-10 p-5 bg-orange-400 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors">
                <span className="text-white text-center">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="text-center">
          <p className="text-lg md:text-sm text-black">
            © 2025 Helium. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
