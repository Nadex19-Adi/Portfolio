import type { Metadata, Viewport } from "next";
import { Anton, Cormorant_Garamond, Inter, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const SITE_URL = "https://aditya-jcer-portfolio.vercel.app";

const TITLE = "Aditya Patil — AI Systems Engineer";
const DESCRIPTION =
  "Aditya Patil — AI Systems Engineer. Production multi-agent systems, RL environments, and long-term memory engines. IEEE Student Branch Chair (2026).";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Aditya Patil",
  authors: [{ name: "Aditya Patil" }],
  keywords: [
    "Aditya Patil",
    "AI Systems Engineer",
    "multi-agent systems",
    "reinforcement learning",
    "LangGraph",
    "portfolio",
  ],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE,
    description:
      "AI Systems Engineer. Production multi-agent systems, RL environments, and long-term memory engines. IEEE Student Branch Chair (2026).",
    siteName: "Aditya Patil",
    locale: "en_US",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "AI Systems Engineer. Production multi-agent systems, RL environments, and long-term memory engines. IEEE Student Branch Chair (2026).",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#060606",
  width: "device-width",
  initialScale: 1,
};

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aditya Patil",
  url: SITE_URL,
  jobTitle: "AI Systems Engineer",
  sameAs: [
    "https://github.com/Nadex19-Adi",
    "https://www.linkedin.com/in/aditya-patil-77aab2352/",
  ],
  description:
    "AI Systems Engineer specializing in multi-agent orchestration, reinforcement learning environments, and full-stack AI systems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${anton.variable} ${outfit.variable} ${cormorant.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
