import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Galaxy Corporation - Global Agro Exporters",
  description: "Leading Exporter & Trader for Agro Commodities in India",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white min-h-screen flex flex-col w-full max-w-full overflow-x-hidden`}
      >
        <Navbar />
        <main className="flex-grow pt-0 mx-auto w-[90%] max-w-screen-xl">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}