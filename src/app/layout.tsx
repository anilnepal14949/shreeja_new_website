import type { Metadata } from "next";
import { Space_Grotesk, Poppins } from "next/font/google";
import SmoothScrollProvider from "@/components/shared/SmoothScrollProvider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Shreeja Digital Agency | Transform Your Digital Vision",
  description: "Creative solutions for modern brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${poppins.variable} antialiased`}
    >
      <body className="min-h-screen font-body bg-shreeja-light text-shreeja-dark">
        <SmoothScrollProvider>
          <Navigation />
          <main className="w-full">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
