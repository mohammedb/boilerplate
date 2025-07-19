import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { clerkAppearance } from "@/lib/clerkTheme";
import Navigation from "@/components/Navigation";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Qyspo - The Fastest Way to Ship Your SaaS",
  description: "Professional Next.js boilerplate with authentication, payments, and database. Focus on your product, not the setup.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={clerkAppearance}>
      <html lang="en" className="dark">
        <body
          className={`${inter.variable} ${playfair.variable} antialiased bg-[#111111] text-[#F9F9F9] min-h-screen`}
        >
          <Navigation />
          <main className="pt-[88px]">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
