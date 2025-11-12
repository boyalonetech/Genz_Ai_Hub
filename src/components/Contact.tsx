"use client";
import React, { useState } from "react";
import Arrow from "./Arrow";

export default function Contact() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Replace with your WhatsApp number (in international format, no + or spaces)
    const phoneNumber = "2348161514098";

    // Encode the message for the WhatsApp URL
    const text = `Hello! My name is ${name} from ${company}.
Email: ${email}
Message: ${message}`;

    const encodedText = encodeURIComponent(text);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedText}`;

    // Open WhatsApp in a new tab
    window.open(whatsappURL, "_blank");
  };

  return (
    <section className="w-full bg-zinc-100 py-12 md:py-20 px-4  md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column - Info */}
        <div>
          <p className="text-indigo-800 text-md font-medium mb-2">
            Get in Touch With
          </p>
          <h2 className="text-4xl md:text-4xl text-orange-400 mb-8">
            Contact Us
          </h2>
          <p className="text-lg md:text-md text-black mb-8">
            We&apos;re here to support you! Feel free to reach out for
            assistance, feedback, or any questions.
          </p>

          <h3 className="text-2xl md:text-2xl text-black mb-6">
            Let&apos;s Talk About:
          </h3>
          <div className="space-y-4">
            {[
              "AI for Educators",
              "AI for Marketers",
              "AI for Developers",
              "AI Fundamentals",
            ].map((topic) => (
              <div key={topic} className="flex items-center gap-3">
                <div className="lg:w-8 lg:h-8 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                  <Arrow className="text-white" />
                </div>
                <span className="text-meduim md:text-[15px] text-indigo-800">
                  {topic}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="lg:bg-white rounded-3xl lg:outline lg:outline-2 outline-orange-400 font-[Lato] py-6  lg:p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-black text-[16px] font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Kojo Charles"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-5 py-2.5 bg-zinc-300 rounded-lg text-[16px] outline-none"
              />
            </div>

            <div>
              <label className="block text-black text-[16px] font-medium mb-2">
                Company Name
              </label>
              <input
                type="text"
                placeholder="IGHUB"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                className="w-full px-5 py-2.5 bg-zinc-300 rounded-lg text-[16px] outline-none"
              />
            </div>

            <div>
              <label className="block text-black text-[16px] font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-2.5 bg-zinc-300 rounded-lg text-[16px] outline-none"
              />
            </div>

            <div>
              <label className="block text-black text-[16px] font-medium mb-2">
                Message
              </label>
              <textarea
                placeholder="Hello, I'd like to learn more about your AI for Developers."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full px-5 py-2.5 bg-zinc-300 rounded-lg text-[16px] outline-none resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-5 py-4 bg-orange-400 rounded-lg text-white text-[18px] font-[500] hover:bg-orange-500 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
