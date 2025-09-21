import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title:
    "Gee Innovations - Academic Project Consultancy & Research Publication",
  description:
    "Leading academic project consultancy and research publication services. We transform your ideas into groundbreaking solutions with cutting-edge technology including AI, Blockchain, Web Development, and more.",
  keywords:
    "academic projects, research publication, AI projects, blockchain development, web development, machine learning, thesis writing, journal publication",
  authors: [{ name: "Gee Innovations" }],
  creator: "Gee Innovations",
  publisher: "Gee Innovations",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.APP_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Gee Innovations - Academic Project Consultancy & Research Publication",
    description:
      "Leading academic project consultancy and research publication services. We transform your ideas into groundbreaking solutions with cutting-edge technology.",
    url: "/",
    siteName: "Gee Innovations",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gee Innovations - Academic Project Consultancy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Gee Innovations - Academic Project Consultancy & Research Publication",
    description:
      "Leading academic project consultancy and research publication services. We transform your ideas into groundbreaking solutions with cutting-edge technology.",
    images: ["/og-image.jpg"],
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
