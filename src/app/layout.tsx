import type { Metadata } from "next";
import { Inter, Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import PremiumNavbar from "./components/PremiumNavbar";
import Footer from "./components/Footer";
import StructuredData from "./components/StructuredData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Galaxy Corporation — Global Agro Exporters | Premium Agricultural Commodities",
    template: "%s | Galaxy Corporation",
  },
  description: "Leading exporter of premium agro commodities from India. Specializing in pulses, spices, cereals, oil seeds, and fresh produce. Global reach with quality assurance.",
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  keywords: ["agro commodities exporter", "agricultural exports India", "spices exporter", "pulses trader", "cereals export", "oil seeds supplier", "fresh vegetables export", "dry fruits exporter", "Pune agro exporters", "international trade", "agricultural commodities", "quality agro products"],
  authors: [{ name: "Galaxy Corporation" }],
  creator: "Galaxy Corporation",
  publisher: "Galaxy Corporation",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://galaxycorporation.co.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://galaxycorporation.co.in",
    siteName: "Galaxy Corporation",
    title: "Galaxy Corporation — Global Agro Exporters",
    description: "Leading exporter of premium agro commodities from India. Specializing in pulses, spices, cereals, oil seeds, and fresh produce.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Galaxy Corporation - Global Agro Exporters",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galaxy Corporation — Global Agro Exporters",
    description: "Leading exporter of premium agro commodities from India",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        <PremiumNavbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
