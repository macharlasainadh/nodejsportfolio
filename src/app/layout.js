import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sainadh Macharla",
  description:
    "Full-Stack Developer & AI Enthusiast — Building intelligent, scalable digital solutions with modern technologies.",
  keywords:
    "Sainadh Macharla, Full Stack Developer, AI Developer, React, Next.js, Node.js, Data Science, Web Development",
  authors: [{ name: "Sainadh Macharla" }],
  creator: "Sainadh Macharla",
  openGraph: {
    title: "Sainadh Macharla - Full-Stack & AI Developer",
    description:
      "Full-Stack Developer & AI Enthusiast — Crafting modern, intelligent web and data-driven applications.",
    url: "https://macharlasainadh.vercel.app",
    siteName: "Sainadh Macharla Portfolio",
    images: [
      {
        url: "/profile-icon.png",
        width: 1200,
        height: 630,
        alt: "Sainadh Macharla - Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sainadh Macharla - Full-Stack & AI Developer",
    description:
      "Full-Stack Developer & AI Enthusiast — Building powerful and efficient web applications.",
    images: ["/profile-icon.png"],
  },
  icons: {
    icon: "/profile-icon.png",
    shortcut: "/profile-icon.png",
    apple: "/profile-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ff6b35" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Sainadh Macharla" />
        <link rel="canonical" href="https://macharlasainadh.vercel.app" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
