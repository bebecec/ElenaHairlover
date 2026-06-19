import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import "../styles/animations.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-display",
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Elegance by Stoica | Salón de Belleza Premium",
  description: "Tratamientos de medicina estética y belleza de lujo. Descubre una experiencia de consulta de cortesía y resultados reales.",
  keywords: "salón de belleza, medicina estética, botox, tratamientos faciales, elegancia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-[#FAFAF8] text-[#1A1A18]">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
