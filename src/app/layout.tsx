import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/satoshi-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Radar de Clientes | Prospecção de Empresas sem Site no Google Maps",
  description:
    "Encontre empresas sem site no Google Maps por nicho e cidade. Analise oportunidades locais e feche novos contratos com scripts de abordagem para WhatsApp.",
};

export const viewport: Viewport = {
  themeColor: "#131313",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${satoshi.variable} dark`}>
      <body className="min-h-screen bg-bg text-text-1 font-sans antialiased selection:bg-purple selection:text-white">
        {children}
      </body>
    </html>
  );
}
