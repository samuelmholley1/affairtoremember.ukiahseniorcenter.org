import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
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
  title: "An Affair to Remember - Ukiah Senior Center",
  description: "Annual fundraising event for the Ukiah Senior Center. Donate auction items or sponsor a table to support vital senior services in our community.",
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="w-full">
          <Image
            src="/aatr_banner.png"
            alt="An Affair to Remember - Ukiah Senior Center"
            width={1200}
            height={300}
            className="w-full h-auto object-cover"
            priority
          />
        </header>
        
        <div className="flex justify-center py-8">
          <Image
            src="/logo.png"
            alt="Ukiah Senior Center Logo"
            width={120}
            height={120}
            className="h-auto"
          />
        </div>
        
        {children}
      </body>
    </html>
  );
}
