"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HideLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 👇 hide in /admin routes and 404 page
  const hideHeaderAndProfile =
    pathname?.startsWith("/admin") || pathname === "/404";

  return (
    <>
      {!hideHeaderAndProfile && <Header />}
      {children}
      {!hideHeaderAndProfile && <Footer />}
    </>
  );
}
