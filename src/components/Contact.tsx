import React from "react";
import Arrow from "./Arrow";

export default function Contact() {
  return (
    <section className="w-full bg-zinc-100 py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column - Info */}
        <div>
          <p className="text-indigo-800 text-md font-medium mb-2">
            Get in Touch With
          </p>
          <h2 className="text-4xl md:text-4xl text-orange-400 mb-8">
            Contact Us
          </h2>
          <p className="text-lg md:text-md   text-black mb-8">
            We&apos;re here to support you! Feel free to reach out for
            assistance, feedback, or any questions.
          </p>

          <h3 className="text-2xl md:text-2xl text-black mb-6">
            Let&apos;s Talk About:
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-400 rounded-full  items-center justify-center flex">
                <Arrow className="text-white" />
              </div>
              <span className="text-lg md:text-[15px] text-indigo-800">
                AI for Educators
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-400 rounded-full items-center justify-center flex">
                <Arrow className="text-white" />
              </div>
              <span className="text-lg md:text-[15px] text-indigo-800">
                AI for Marketers
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-400 rounded-full items-center justify-center flex">
                <Arrow className="text-white" />
              </div>
              <span className="text-lg md:text-[15px] text-indigo-800">
                AI for Developers
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-400 rounded-full items-center justify-center flex">
                <Arrow className="text-white" />
              </div>
              <span className="text-lg md:text-[15px] text-indigo-800">
                AI Fundamentals
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="bg-white rounded-3xl outline outline-2 outline-orange-500 p-6 md:p-8 font-[-lato]">
          <form className="space-y-6">
            <div>
              <label className="block text-black text-[16px] font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Kojo Charles"
                className="w-full px-5 py-2.5 bg-zinc-300 rounded-lg text-[16px] font-[400] outline-1 outline-neutral-400"
              />
            </div>

            <div>
              <label className="block text-black text-[16px] font-medium mb-2">
                Company Name
              </label>
              <input
                type="text"
                placeholder="IGHUB"
                className="w-full px-5 py-2.5 bg-zinc-300 rounded-lg text-[16px] font-[400] outline-1 outline-neutral-400"
              />
            </div>

            <div>
              <label className="block text-black text-[16px] font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="nwokoel953@gmail.com"
                className="w-full px-5 py-2.5 bg-zinc-300 rounded-lg text-[16px] font-[400] line-height-[24px] spacing-[0.5px] outline-1 outline-neutral-400"
              />
            </div>

            <div>
              <label className="block text-black text-[16px] font-medium mb-2">
                Message
              </label>
              <textarea
                placeholder="Hello i'd like to learn more about how to use your AI for Developer."
                className="w-full px-5 py-2.5 bg-zinc-300 rounded-lg text-[16px] font-[400] outline-1 outline-neutral-400 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-5 py-4 bg-orange-400 rounded-lg text-white text-[18px] font-[500] line-height-[20px] hover:bg-orange-500 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
