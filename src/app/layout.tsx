import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./darkglass.css";

// next/font lädt die Schrift beim Bauen herunter und liefert sie von unserer
// eigenen Domain aus. Zur Laufzeit geht keine Anfrage an Google. Das ist die
// Bedingung aus dem ecomet-Baukasten: Inter, aber selbst gehostet.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ecomet | Lager, Versand und Import aus einer Hand",
  description:
    "Ein Konto für dein ganzes Fulfillment. Lager in Deutschland mit 1 bis 2 Tagen Lieferzeit oder Import aus China. Bestellungen, Versand und Rechnungen an einem Ort.",
  openGraph: {
    title: "ecomet | Lager, Versand und Import aus einer Hand",
    description:
      "Ein Konto für dein ganzes Fulfillment. Lager in Deutschland oder Import aus China.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
