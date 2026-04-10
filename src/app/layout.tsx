import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ecomet | Dein Fulfillment Partner für den DACH Raum",
  description:
    "Schluss mit PayPal Fällen und Retouren. 4-8 Tage Versand & höchste Produktqualität. Starte in 3 Schritten komplett kostenlos.",
  openGraph: {
    title: "ecomet | Dein Fulfillment Partner für den DACH Raum",
    description:
      "Schluss mit PayPal Fällen und Retouren. 4-8 Tage Versand & höchste Produktqualität.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
