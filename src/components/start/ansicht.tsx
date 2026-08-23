import Image from "next/image";
import Link from "next/link";

/** Derselbe Haken wie auf den Unterseiten, damit die Liste gleich aussieht. */
const Haken = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

/**
 * Das Produkt zeigt sich selbst: unser echtes Dashboard, übergroß und
 * angeschnitten, es läuft rechts aus dem Bild.
 *
 * Kevin am 23.08. zu mintlify.com: "so ein Screenshot sieht mega sexy aus,
 * diese Rechte, aber eben nicht im Heading". Die Bühne behält den Globus,
 * der Screenshot steht hier.
 *
 * Die Zahlen im Bild stammen aus dem Demo-Shop der App, nicht von einem
 * echten Kunden. Deshalb steht es unter der Überschrift auch so da.
 */
export function Ansicht() {
  return (
    <section className="sec ansicht">
      <div className="ansicht-gitter">
        <div className="ansicht-text fx">
          <span className="eyebrow">
            <span className="dot" /> ecomet.app
          </span>
          <h2>
            <span className="block">Du weißt, wie viel du verdienst</span>
            <span className="block accent">und wo deine Produkte sind</span>
          </h2>
          <p>
            Nicht Umsatz. Was nach Steuer, Einkauf, Gebühren und Werbung
            wirklich übrig ist. Die App zieht die Zahlen aus deinem Shop und
            rechnet sie jeden Tag zusammen.
          </p>
          <ul className="haken">
            <li><Haken /> Bestellungen, Sendungsnummern und Rechnungen an einer Stelle</li>
            <li><Haken /> ROAS gegen deinen echten Break-Even, nicht gegen den Umsatz</li>
            <li><Haken /> Kostenlos zur Nutzung des Lagers</li>
          </ul>
          <div className="ansicht-knopf">
            <Link href="/apps/dashboard" className="glass-wrap">
              <span className="glass-btn sm">
                <span className="glass-txt">Die App ansehen</span>
              </span>
              <span className="glass-shadow" />
            </Link>
          </div>
          <p className="ansicht-hinweis">
            Abbildung aus dem Demo-Shop der App. Keine Kundendaten.
          </p>
        </div>

        <div className="ansicht-bild fx" data-d="2">
          <Image
            src="/apps/dashboard-uebersicht.png"
            alt="Die ecomet App: Übersicht mit Umsatz, Kosten und was am Ende übrig bleibt"
            width={1440}
            height={1700}
          />
        </div>
      </div>
    </section>
  );
}
