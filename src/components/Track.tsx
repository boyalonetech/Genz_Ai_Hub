import Image from "next/image";
import React from "react";

export default function Track() {
  return (
    <section className="w-full bg-white py-12 md:py-20 px-4 md:px-8 -translate-y-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-indigo-800 text-md font-medium mb-2">
            Start Your AI Journey
          </p>
          <h2 className="text-2xl md:text-2xl text-orange-400">
            Choose the track that matches your career goals
          </h2>
        </div>

        {/* Course Cards Grid */}
        <div className="space-y-6">
          {/* Top Row - 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* AI for Educators */}
            <div className="bg-gray-200 rounded-2xl overflow-hidden p-6">
              <Image
                width={600}
                height={600}
                quality={100}
                className="w-full h-48 object-cover rounded-2xl mb-4"
                src="/robot1.jpg"
                alt="AI for Educators"
              />
              <h3 className="text-xl text-orange-400 mb-4">AI for Educators</h3>
              <ul className="space-y-2 mb-6 text-black">
                <li className="text-sm">• Design AI-enhanced curricula</li>
                <li className="text-sm">• Automate administrative tasks</li>
                <li className="text-sm">• Launch AI-powered learning tools</li>
              </ul>
              <button className="px-5 py-2.5 bg-orange-400 rounded-lg text-sm text-white hover:bg-orange-500 transition-colors">
                Learn More
              </button>
            </div>

            {/* AI for Marketers */}
            <div className="bg-gray-200 rounded-2xl overflow-hidden p-6">
              <Image
                width={600}
                height={600}
                quality={100}
                className="w-full h-48 object-cover rounded-2xl mb-4"
                src="/robot2.jpg"
                alt="AI for Marketers"
              />
              <h3 className="text-2xl text-orange-400 mb-4">
                AI for Marketers
              </h3>
              <ul className="space-y-2 mb-6 text-black">
                <li className="text-sm">• Create high-converting AI content</li>
                <li className="text-sm">• Build automated marketing systems</li>
                <li className="text-sm">• Master AI analytics and insights</li>
              </ul>
              <button className="px-5 py-2.5 bg-orange-400 rounded-lg text-white text-sm hover:bg-orange-500 transition-colors">
                Learn More
              </button>
            </div>

            {/* AI for Developers */}
            <div className="bg-gray-200 rounded-2xl overflow-hidden p-6">
              <Image
                width={600}
                height={600}
                quality={100}
                className="w-full h-48 object-cover rounded-2xl mb-4"
                src="/robot3.jpg"
                alt="AI for Developers"
              />
              <h3 className="text-2xl text-orange-400 mb-4">
                AI for Developers
              </h3>
              <ul className="space-y-2 mb-6 text-black">
                <li className="text-sm">• Integrate AI APIs and models</li>
                <li className="text-sm">• Build custom AI solutions</li>
                <li className="text-sm">• Deploy and scale AI systems</li>
              </ul>
              <button className="px-5 py-2.5 bg-orange-400 text-sm rounded-lg text-white hover:bg-orange-500 transition-colors">
                Learn More
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-6 lg:gap-8">
            {/* AI Fundamentals */}
            <div className="bg-gray-200 w-full lg:w-[757px] lg:max-w-[60%] rounded-2xl overflow-hidden p-4 sm:p-6 flex flex-col md:flex-row gap-4 md:gap-6">
              <Image
                width={600}
                height={600}
                quality={100}
                className="w-full md:w-[280px] lg:w-[341px] h-[250px] md:h-[280px] lg:h-[324px] object-cover rounded-lg flex-shrink-0"
                src="/robot4.jpg"
                alt="AI Fundamentals"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl text-orange-400 mb-3 md:mb-4">
                    AI Fundamentals
                  </h3>
                  <ul className="space-y-2 mb-4 md:mb-6 text-black text-sm sm:text-base">
                    <li className="text-sm">
                      • Understand how AI actually works
                    </li>
                    <li className="text-sm">• Master prompt engineering</li>
                    <li className="text-sm">
                      • Navigate the AI tools landscape
                    </li>
                  </ul>
                </div>
                <button className="w-full sm:w-auto px-5 py-2.5  bg-orange-400 rounded-lg text-white hover:bg-orange-500 transition-colors text-sm sm:text-base">
                  Learn More
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <Image
              width={600}
              height={600}
              quality={100}
              className="w-full lg:w-[446px] lg:max-w-[37%] h-[300px] sm:h-[375px] object-cover rounded-2xl"
              src="/robot5.jpg"
              alt="AI Learning"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
