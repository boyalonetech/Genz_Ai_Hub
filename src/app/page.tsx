import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import Roadmap from "@/components/Roadmap";
import Testmonials from "@/components/Testmonials";
import Track from "@/components/Track";
import Value from "@/components/Value";
import React from "react";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Value />
      <Track />
      <Roadmap />
      <Testmonials />
      <Contact />
      <Footer />
      <Journey />
    </main>
  );
}
