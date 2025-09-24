import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GEE INNOVIXUS - Academic Project Consultancy & Research Publication",
  description:
    "Leading academic project consultancy and research publication services. We transform your ideas into groundbreaking solutions with cutting-edge technology including AI, Blockchain, Web Development, and more.",
  keywords:
    "academic projects, research publication, AI projects, blockchain development, web development, machine learning, thesis writing, journal publication",
  authors: [{ name: "GEE INNOVIXUS" }],
  creator: "GEE INNOVIXUS",
  publisher: "GEE INNOVIXUS",
  applicationName: "GEE INNOVIXUS",
  category: "Education",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.APP_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title:
      "GEE INNOVIXUS - Academic Project Consultancy & Research Publication",
    description:
      "Leading academic project consultancy and research publication services. We transform your ideas into groundbreaking solutions with cutting-edge technology.",
    url: "/",
    siteName: "GEE INNOVIXUS",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GEE INNOVIXUS - Academic Project Consultancy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "GEE INNOVIXUS - Academic Project Consultancy & Research Publication",
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "GEE INNOVIXUS",
              url: process.env.APP_URL || "http://localhost:3000",
              logo: "/og-image.jpg",
              sameAs: [],
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "18-78/A, FLAT NO 304, KAMALA NIVAS, NEAR METRO PILLAR NO 1558, SAROORNAGAR, DILSUKHNAGAR",
                addressLocality: "Hyderabad",
                addressRegion: "Telangana",
                postalCode: "500060",
                addressCountry: "IN",
              },
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  areaServed: "IN",
                  availableLanguage: ["English", "Telugu", "Hindi"],
                },
              ],
            }),
          }}
        />
        {/* Site Navigation JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SiteNavigationElement",
              name: [
                "Research & Development",
                "Projects",
                "Services",
                "Courses",
                "Training & Workshop",
                "Contact",
              ],
              url: [
                "/research",
                "/projects",
                "/services",
                "/courses",
                "/training",
                "/contact",
              ],
            }),
          }}
        />
        <Providers>{children}</Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
