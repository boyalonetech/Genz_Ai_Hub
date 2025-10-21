import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GenZ AI Hub",
  description:
    "Empowering the Next Generation with AI Skills and Tools for Education, Marketing, and Development. Join Us Today!",

  icons: {
    icon: "/LOGO.jpg",
    shortcut: "/LOGO.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${unbounded.className} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
