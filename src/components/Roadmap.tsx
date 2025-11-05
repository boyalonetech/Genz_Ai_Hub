export default function Roadmap() {
  return (
    <section
      id="roadmap-section"
      className="w-full bg-white  px-4 md:px-8 py-12 md:py-20  relative overflow-hidden "
    >
      {/* Vertical Progress Bar */}

      {/* Decorative Background Circles */}
      <div className="w-64 h-64 md:w-96 md:h-96 absolute -right-20 md:right-20 top-1/2 opacity-0 lg:opacity-75 bg-orange-400 rounded-full shadow-inner pointer-events-none" />
      <div className="w-48 h-48 md:w-64 md:h-64 absolute -left-10 md:left-0 top-0 opacity-0 lg:opacity-75 bg-orange-400 rounded-full shadow-inner pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-indigo-800 text-md font-medium mb-2">
            What&apos;s Next at GenZ AI Hub
          </p>
          <h2 className="text-2xl md:text-2xl text-orange-400">
            We&apos;re building more than courses we&apos;re building an
            ecosystem.
          </h2>
        </div>

        {/* Timeline Items */}
        <div className="space-y-12 md:space-y-16">
          {/* Q2 2026 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-4 h-4 rounded-full border-2 border-orange-500" />
              <span className="text-indigo-800 text-base">Q2 2026</span>
            </div>
            <h3 className="text-3xl md:text-3xl text-orange-400 mb-4">
              Mentorship Programs
            </h3>
            <p className="text-md text-black max-w-2xl">
              Get matched with real AI experts who mentor you 1-on-1, help you
              build projects that stand out, and show you how to turn AI skills
              into real career moves.
            </p>
            <div className="w-px h-16 bg-orange-400 mt-8" />
          </div>

          {/* Q3 2026 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-4 h-4 rounded-full border-2 border-orange-500" />
              <span className="text-indigo-800 text-base">Q3 2026</span>
            </div>
            <h3 className="text-3xl md:text-3xl text-orange-400 mb-4">
              AI Builders Community
            </h3>
            <p className="text-md text-black max-w-2xl">
              Collaborate with other innovators on real-world AI projects, join
              global hackathons, and contribute to open-source tools that push
              the boundaries of what&apos;s possible with AI.
            </p>
            <div className="w-px h-16 bg-orange-400 mt-8" />
          </div>

          {/* 2027 & Beyond */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-4 h-4 rounded-full border-2 border-orange-500" />
              <span className="text-indigo-800 text-base">2027 & Beyond</span>
            </div>
            <h3 className="text-3xl md:text-3xl text-orange-400 mb-4">
              Innovation Lab
            </h3>
            <p className="text-md text-black max-w-2xl">
              Got an AI idea? Build it, test it, and launch it with us. Our
              accelerator connects you with mentors, developers, and tools to
              bring your innovation to life.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button className="px-6 py-4 bg-orange-400 rounded-lg lg:text-xs text-white text-base hover:bg-orange-500 transition-colors">
            Join Waitlist for Early Access
          </button>
        </div>
      </div>
    </section>
  );
}
