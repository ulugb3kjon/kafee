import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { LanguageProvider } from "@/contexts/LanguageContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: CAFE_CONFIG.name,
  description: CAFE_CONFIG.slogan,
  openGraph: {
    title: CAFE_CONFIG.name,
    description: CAFE_CONFIG.slogan,
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: CAFE_CONFIG.name,
      },
    ],
  },
  twitter: { card: "summary_large_image", title: CAFE_CONFIG.name, description: CAFE_CONFIG.slogan },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`${poppins.variable} ${playfair.variable}`}>
      <body className={poppins.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
