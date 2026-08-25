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

/**
 * ⚠ Das Vorschaubild beim Teilen (25.08.2026).
 *
 * Bis heute zeigte jeder geteilte Link das **Vercel-Dreieck**. Grund: es gab
 * kein `og:image`, und `src/app/favicon.ico` war noch das Standard-Icon aus
 * `create-next-app`. WhatsApp und Slack fallen dann auf das Favicon zurück.
 * Kevin hatte den Link schon verschickt, als es auffiel.
 *
 * Behoben über die Dateikonventionen des App Routers, die Next selbst
 * einliest und verlinkt, deshalb steht hier kein `icons`-Block:
 *   src/app/opengraph-image.png   1200×630, das Bild in der Vorschau
 *   src/app/twitter-image.png     dasselbe Bild für X
 *   src/app/icon.png              512×512, das Favicon im Tab
 *   src/app/apple-icon.png        180×180, für den Home-Bildschirm
 *
 * Gebaut aus den echten Markendateien (`public/ecomet-schrift-weiss.png` und
 * `public/icon-logo.png`), das Logo ist nirgends nachgetippt.
 *
 * `metadataBase` MUSS gesetzt sein, sonst schreibt Next relative Pfade ins
 * `og:image`, und daran scheitern alle Vorschauen, weil die Dienste eine
 * vollständige Adresse brauchen.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://e-comet.de"),
  title: "ecomet | Lager, Versand und Import aus einer Hand",
  description:
    "Ein Konto für dein ganzes Fulfillment. Lager in Deutschland mit 1 bis 3 Tagen Lieferzeit oder Import aus China. Bestellungen, Versand und Rechnungen an einem Ort.",
  openGraph: {
    title: "ecomet | Lager, Versand und Import aus einer Hand",
    description:
      "Ein Konto für dein ganzes Fulfillment. Lager in Deutschland oder Import aus China.",
    url: "https://e-comet.de",
    siteName: "ecomet",
    type: "website",
    locale: "de_DE",
  },
  twitter: {
    // Ohne das bleibt die Vorschau die kleine Kachel mit Mini-Bild daneben.
    card: "summary_large_image",
    title: "ecomet | Lager, Versand und Import aus einer Hand",
    description:
      "Ein Konto für dein ganzes Fulfillment. Lager in Deutschland oder Import aus China.",
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
