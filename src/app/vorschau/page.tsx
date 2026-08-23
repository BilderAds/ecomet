import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/start/navigation";
import { Effekte } from "@/components/start/effekte";
import { Fuss } from "@/components/start/fuss";
import { empfehlungen } from "@/inhalte/zahlen";

export const metadata: Metadata = {
  title: "Vorschau Bühne | ecomet",
  description: "Vergleichsseite, nicht verlinkt.",
  robots: { index: false, follow: false },
};

/**
 * VERGLEICHSSEITE, nirgends verlinkt, `noindex`.
 *
 * Kevin am 23.08. zu mintlify.com: "vorallem diese eine full site bild
 * seite". Der Kern dort: das Produkt steht nicht als brave Karte in der
 * Mitte, sondern übergroß und angeschnitten, es läuft rechts und unten aus
 * dem Bild. Text links in einer schmalen Spalte.
 *
 * Hier mit unserem ECHTEN Dashboard statt mit dem Globus. Der Globus bleibt
 * auf der Startseite unangetastet, bis Kevin entschieden hat.
 *
 * Wird die Bühne übernommen, wandert sie nach `components/start/buehne.tsx`
 * und dieser Ordner wird gelöscht.
 */
export default function VorschauBuehne() {
  return (
    <>
      <div className="bg-layer bg-glow" aria-hidden="true" />
      <div className="bg-layer bg-grain" aria-hidden="true" />
      <Navigation />

      <main>
        <section className="vb">
          <div className="vb-raster" aria-hidden="true" />

          <div className="vb-inhalt">
            <div className="vb-text fx">
              {!empfehlungen.geprueft && (
                <div className="trust-pille">
                  <span className="trust-punkt" aria-hidden="true" />
                  Lager in Deutschland
                  <span className="trust-trenner" aria-hidden="true" />
                  Fehlerquote unter 1 %
                </div>
              )}

              <h1 className="vb-h1">
                Dein Lager in Deutschland.
                <br />
                Dein Einkauf in China.
                <br />
                <span className="accent">Ein Konto.</span>
              </h1>

              <p className="vb-satz">
                Lager, Versand, Rechnungen und PayPal-Fälle an einer Stelle.
                Für <strong>deutsche Shopify-Händler</strong>.
              </p>

              <div className="vb-knoepfe">
                <Link href="/registrieren" className="vb-knopf">
                  Konto erstellen
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link href="/preise" className="vb-knopf zweit">
                  Preise ansehen
                </Link>
              </div>

              <ul className="vb-belege">
                <li>Versand aus Deutschland, 1 bis 2 Werktage</li>
                <li>Jedes Paket wird geprüft</li>
                <li>Keine Grundgebühr, keine Mindestmenge</li>
              </ul>
            </div>

            {/* Angeschnitten: das Bild laeuft rechts und unten aus dem Rahmen. */}
            <div className="vb-bild fx" data-d="2">
              <Image
                src="/apps/dashboard-uebersicht.png"
                alt="Die ecomet App: Übersicht mit Umsatz, Kosten und was am Ende übrig bleibt"
                width={1440}
                height={1700}
                priority
              />
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="wrap">
            <p className="sec-p" style={{ textAlign: "center" }}>
              Diese Seite ist nur zum Vergleichen da und ist nirgends verlinkt.
              Die Startseite mit dem Globus liegt unverändert auf{" "}
              <Link href="/" style={{ color: "var(--a1)" }}>
                der Startseite
              </Link>
              .
            </p>
          </div>
        </section>
      </main>

      <Fuss />
      <Effekte />
    </>
  );
}
