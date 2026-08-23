import Image from "next/image";

/**
 * Die Logoleiste unter der Bühne.
 *
 * Kevin am 24.08.: „das voll der Müll, ich will Trust Section mit Logos
 * oder so." Die Zahlenkacheln aus dem Vertrag sind deshalb wieder raus,
 * hier stehen jetzt echte Logos.
 *
 * Die vier Marken-SVGs kommen aus simple-icons (MIT-Lizenz), einmal geholt
 * und selbst gehostet, einfarbig. Kein fremder Aufruf beim Seitenaufruf.
 * Für Lexware und YunExpress gibt es dort kein Zeichen, die stehen als
 * Wortmarke daneben.
 *
 * Jede Anbindung ist belegt:
 *   Shopify    unsere App liegt im Shopify App Store, apps.shopify.com/ecomet
 *   DHL        Versand aus dem deutschen Lager
 *   PayPal     ecomet.dispute
 *   Klarna     ecomet.dispute
 *   Lexware    ecomet.invoices
 *   YunExpress Tracking aus China, belegt im Partner-Chat 21.07.
 */
const mitZeichen = [
  { name: "Shopify", datei: "/logos/shopify.svg" },
  { name: "DHL", datei: "/logos/dhl.svg" },
  { name: "PayPal", datei: "/logos/paypal.svg" },
  { name: "Klarna", datei: "/logos/klarna.svg" },
];
const nurWort = ["Lexware", "YunExpress"];

export function Vertrauen() {
  return (
    <section className="vertrauen">
      <div className="wrap-wide">
        <p className="vertrauen-ueber">Arbeitet zusammen mit</p>
        <div className="vertrauen-logos">
          {mitZeichen.map((m) => (
            <span key={m.name} className="vertrauen-logo" title={m.name}>
              <Image src={m.datei} alt={m.name} width={28} height={28} />
              <span>{m.name}</span>
            </span>
          ))}
          {nurWort.map((n) => (
            <span key={n} className="vertrauen-logo nurwort">
              <span>{n}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
