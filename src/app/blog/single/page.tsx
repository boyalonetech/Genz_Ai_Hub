import Image from "next/image";

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white overflow-hidden px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
      {/* Decorative circles */}
      <div className="absolute   w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 -right-16 md:-right-24 lg:right-24 top-20 md:top-32 lg:top-36 opacity-75 bg-orange-400 rounded-full shadow-[inset_0px_4px_53px_18px_rgba(0,0,0,0.25)] pointer-events-none" />
      <div className="absolute w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 -left-24 md:-left-32 lg:-left-72 top-20 md:top-32 lg:top-32 opacity-75 bg-orange-400 rounded-full shadow-[inset_0px_4px_53px_18px_rgba(0,0,0,0.25)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Hero Title */}
        <h1 className="text-center mb-6 md:mb-8">
          <span className="text-indigo-800 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal font-['Unbounded'] leading-tight">
            How to{" "}
          </span>
          <span className="text-orange-400 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal font-['Unbounded'] leading-tight">
            Build
          </span>
          <span className="text-indigo-800 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal font-['Unbounded'] leading-tight">
            {" "}
            Your First{" "}
          </span>
          <span className="text-orange-400 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal font-['Unbounded'] leading-tight">
            AI App
          </span>
          <span className="text-indigo-800 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal font-['Unbounded'] leading-tight">
            {" "}
            in 30 Minutes
          </span>
        </h1>

        {/* Meta info */}
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-5 mb-8 md:mb-12">
          <div className="text-center text-black text-base sm:text-lg md:text-2xl font-normal font-['Unbounded'] leading-tight">
            March 12, 2025
          </div>
          <div className="w-2 h-2 bg-black rounded-full" />
          <div className="text-center text-black text-base sm:text-lg md:text-2xl font-normal font-['Unbounded'] leading-tight">
            Charles Mark
          </div>
        </div>

        {/* Hero Image */}
        <Image
          height={600}
          width={600}
          className="w-full h-auto rounded-[20px] mb-12 md:mb-16 lg:mb-20"
          src="/course1.jpg"
          alt="Blog hero"
        />

        {/* Prerequisites Section */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-orange-400 text-2xl sm:text-3xl md:text-4xl font-normal font-['Unbounded'] leading-tight mb-4 md:mb-6">
            Prerequisites
          </h2>
          <ul className="space-y-3 md:space-y-4">
            <li className="text-black text-base sm:text-lg md:text-xl font-normal font-['Unbounded'] leading-relaxed">
              Basic familiarity with JavaScript, Python, or React
            </li>
            <li className="text-black text-base sm:text-lg md:text-xl font-normal font-['Unbounded'] leading-relaxed">
              A text editor (VS Code)
            </li>
            <li className="text-black text-base sm:text-lg md:text-xl font-normal font-['Unbounded'] leading-relaxed">
              Node.js installed
            </li>
            <li className="text-black text-base sm:text-lg md:text-xl font-normal font-['Unbounded'] leading-relaxed">
              An API key from <span className="underline">OpenAI</span>
            </li>
          </ul>
        </div>

        {/* Steps Section */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <ul className="space-y-3 md:space-y-4">
            <li className="text-black text-base sm:text-lg md:text-xl font-normal font-['Unbounded'] leading-relaxed">
              Step 1: Create Your Project Folder
            </li>
            <li className="text-black text-base sm:text-lg md:text-xl font-normal font-['Unbounded'] leading-relaxed">
              Step 2: Set Up Your Server
            </li>
            <li className="text-black text-base sm:text-lg md:text-xl font-normal font-['Unbounded'] leading-relaxed">
              Step 3: Add a Simple Frontend
            </li>
            <li className="text-black text-base sm:text-lg md:text-xl font-normal font-['Unbounded'] leading-relaxed">
              Step 4: Test Your App
            </li>
            <li className="text-black text-base sm:text-lg md:text-xl font-normal font-['Unbounded'] leading-relaxed">
              Step 5: Deploy Your AI App
            </li>
          </ul>
        </div>

        {/* Bonus Ideas Section */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-orange-400 text-2xl sm:text-3xl md:text-4xl font-normal font-['Unbounded'] leading-tight mb-4 md:mb-6">
            Bonus Ideas
          </h2>
          <ul className="space-y-3 md:space-y-4">
            <li className="text-black text-base sm:text-lg md:text-xl font-normal font-['Unbounded'] leading-relaxed">
              Add a character mode (e.g., &quot;You are Yoda&quot;)
            </li>
            <li className="text-black text-base sm:text-lg md:text-xl font-normal font-['Unbounded'] leading-relaxed">
              Save conversation history
            </li>
            <li className="text-black text-base sm:text-lg md:text-xl font-normal font-['Unbounded'] leading-relaxed">
              Add a speech-to-text input or text-to-speech output
            </li>
            <li className="text-black text-base sm:text-lg md:text-xl font-normal font-['Unbounded'] leading-relaxed">
              Build with React or Next.js for richer UI
            </li>
          </ul>
        </div>

        {/* Related Articles Section */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-center mb-8 md:mb-12">
            <span className="text-indigo-800 text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-normal font-['Unbounded'] leading-tight">
              Explore more guides to your{" "}
            </span>
            <span className="text-orange-400 text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-normal font-['Unbounded'] leading-tight">
              AI
            </span>
            <span className="text-indigo-800 text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-normal font-['Unbounded'] leading-tight">
              {" "}
              Journey
            </span>
          </h2>
        </div>

        {/* Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Card 1 */}
          <div className="bg-gray-200 rounded-[20px] overflow-hidden">
            <Image
              height={600}
              width={600}
              className="w-full h-64 object-cover rounded-t-[20px] p-4 pb-0"
              src="https://placehold.co/360x311"
              alt="Future of AI"
            />
            <div className="p-6">
              <h3 className="text-black text-lg sm:text-xl md:text-2xl font-normal font-['Unbounded'] leading-tight mb-4">
                The Future of AI in Education: Trends to Watch
              </h3>
              <div className="border-t-[3px] border-black/40 pt-4 mt-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 relative overflow-hidden">
                    <div className="w-5 h-5 absolute left-0.5 top-0.5 bg-black/50" />
                  </div>
                  <div className="text-black/50 text-sm md:text-base font-medium font-['Unbounded'] leading-tight tracking-tight">
                    March 12, 2025
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-200 rounded-[20px] overflow-hidden">
            <Image
              height={600}
              width={600}
              className="w-full h-64 object-cover rounded-t-[20px] p-4 pb-0"
              src="https://placehold.co/360x311"
              alt="Career Growth"
            />
            <div className="p-6">
              <h3 className="text-black text-lg sm:text-xl md:text-2xl font-normal font-['Unbounded'] leading-tight mb-4">
                CareerGrowth:Becoming an AI Specialist
              </h3>
              <div className="border-t-[3px] border-black/40 pt-4 mt-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 relative overflow-hidden">
                    <div className="w-5 h-5 absolute left-0.5 top-0.5 bg-black/50" />
                  </div>
                  <div className="text-black/50 text-sm md:text-base font-medium font-['Unbounded'] leading-tight tracking-tight">
                    March 12, 2025
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-200 rounded-[20px] overflow-hidden">
            <Image
              width={360}
              height={311}
              className="w-full h-64 object-cover rounded-t-[20px] p-4 pb-0"
              src="https://placehold.co/360x311"
              alt="AI Ethics"
            />
            <div className="p-6">
              <h3 className="text-black text-lg sm:text-xl md:text-2xl font-normal font-['Unbounded'] leading-tight mb-4">
                AI Ethics: What Every Professional Should Know
              </h3>
              <div className="border-t-[3px] border-black/40 pt-4 mt-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 relative overflow-hidden">
                    <div className="w-5 h-5 absolute left-0.5 top-0.5 bg-black/50" />
                  </div>
                  <div className="text-black/50 text-sm md:text-base font-medium font-['Unbounded'] leading-tight tracking-tight">
                    March 12, 2025
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
