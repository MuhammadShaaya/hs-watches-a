import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "H&S Watches | Luxury Timepieces, Timeless Craftsmanship",
    template: "%s | H&S Watches",
  },
  description:
    "H&S Watches — luxury Swiss-style timepieces. Discover automatic chronographs, dive watches, dress watches, and limited editions, hand-finished and built to last generations.",
  keywords: ["luxury watches", "automatic watches", "chronograph", "dress watch", "dive watch", "H&S Watches"],
  metadataBase: undefined,
  openGraph: {
    title: "H&S Watches | Time, Refined.",
    description: "Luxury timepieces hand-finished for those who measure moments that matter.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body antialiased bg-surface-bg text-luxury-black">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0D0D0D",
              color: "#FAFAFA",
              border: "1px solid #D4AF37",
              borderRadius: "12px",
              fontFamily: "var(--font-inter)",
              fontSize: "14px",
            },
            success: { iconTheme: { primary: "#D4AF37", secondary: "#0D0D0D" } },
          }}
        />
      </body>
    </html>
  );
}
