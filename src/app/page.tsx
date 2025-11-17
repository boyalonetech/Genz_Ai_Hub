import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Roadmap from "@/components/Roadmap";
import Testmonials from "@/components/Testmonials";
import Track from "@/components/Track";
import Value from "@/components/Value";
import React from "react";

export default function Home() {
  return (
    <main className=" ">
      <Hero />
      <Value />
      <Track />
      <Roadmap />
      <Testmonials />
      <Contact />
    </main>
  );
}
