import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://probal-khanra.vercel.app"),
  title: "Probal Khanra | Electrical Engineer & Embedded Systems",
  description: "Portfolio of Probal Khanra - EE Student @ BCREC focusing on Embedded Systems, IoT, PCB Design, and 3D Modeling.",
  keywords: [
    "Probal Khanra",
    "Electrical Engineering",
    "Embedded Systems",
    "IoT",
    "PCB Design",
    "ESP32",
    "3D Modeling",
    "BCREC",
    "Portfolio"
  ],
  authors: [{ name: "Probal Khanra", url: "https://github.com/Probal-Khanra" }],
  creator: "Probal Khanra",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://probal-khanra.vercel.app",
    title: "Probal Khanra | Electrical Engineer & Embedded Systems",
    description: "Engineering physical systems with digital precision. Focused on Embedded Systems, IoT, and PCB Design.",
    siteName: "Probal Khanra Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 800,
        height: 800,
        alt: "Probal Khanra Profile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Probal Khanra | Electrical Engineer & Embedded Systems",
    description: "Engineering physical systems with digital precision. Focused on Embedded Systems, IoT, and PCB Design.",
    images: ["/profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Probal Khanra",
    "url": "https://probal-khanra.vercel.app",
    "image": "https://probal-khanra.vercel.app/profile.jpg",
    "jobTitle": "Electrical Engineer & Embedded Systems Specialist",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Dr. B. C. Roy Engineering College (BCREC)"
    },
    "sameAs": [
      "https://github.com/Probal-Khanra",
      "https://www.linkedin.com/in/probal-khanra"
    ],
    "knowsAbout": [
      "Embedded Systems",
      "IoT",
      "PCB Design",
      "ESP32",
      "3D Modeling",
      "3D Printing",
      "Python",
      "Microcontrollers"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
