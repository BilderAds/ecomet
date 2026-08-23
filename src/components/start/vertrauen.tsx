import Image from "next/image";

/**
 * Die laufende Logowolke unter der Bühne.
 *
 * Kevin am 24.08.: „mache das zu einer infinite scrolling logo cloud" und
 * „über dem Arbeitet muss mehr Platz oben sein, damit es clean aussieht".
 *
 * Die vier Marken-SVGs kommen aus simple-icons (MIT-Lizenz), einmal geholt
 * und selbst gehostet, einfarbig. Kein fremder Aufruf beim Seitenaufruf.
 * Für Lexware und YunExpress gibt es dort kein Zeichen, die laufen als
 * Wortmarke mit.
 *
 * Die weichen Kanten laufen über `mask-image`, nicht über Kästen in der
 * Hintergrundfarbe. Der alte Weg rechnete gegen `var(--bg)`, während
 * dahinter ein Verlauf liegt, dadurch lagen zwei harte Rechtecke auf der
 * Seite.
 *
 * Jede Anbindung ist belegt:
 *   Shopify    unsere App liegt im Shopify App Store, apps.shopify.com/ecomet
 *   DHL        Versand aus dem deutschen Lager
 *   PayPal     ecomet.dispute
 *   Klarna     ecomet.dispute
 *   Lexware    ecomet.invoices
 *   YunExpress Tracking aus China, belegt im Partner-Chat 21.07.
 */
const marken = [
  { name: "Shopify", datei: "/logos/shopify.svg" },
  { name: "DHL", datei: "/logos/dhl.svg" },
  { name: "PayPal", datei: "/logos/paypal.svg" },
  { name: "Klarna", datei: "/logos/klarna.svg" },
  { name: "Lexware", datei: null },
  { name: "YunExpress", datei: null },
];

export function Vertrauen() {
  // Dreimal hintereinander, damit der Sprung am Ende nicht auffällt.
  const lauf = [...marken, ...marken, ...marken];

  return (
    <section className="vertrauen">
      <p className="vertrauen-ueber">Arbeitet zusammen mit</p>
      <div className="vertrauen-maske">
        <div className="vertrauen-lauf">
          {lauf.map((m, i) => (
            <span key={`${m.name}-${i}`} className="vertrauen-logo">
              {m.datei && (
                <Image src={m.datei} alt="" width={26} height={26} aria-hidden="true" />
              )}
              <span>{m.name}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
