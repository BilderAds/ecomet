import Image from "next/image";
import Link from "next/link";

/**
 * Eigener Abschnitt für ecomet.dispute, weiter unten auf der Startseite.
 *
 * Kevin am 24.08.: „Disputes ist krass, da auf jeden Fall noch so eigene
 * Section auf der Homepage haben, so bisschen weiter unten."
 *
 * Begründung aus der Recherche: PayPal-Fälle und eingefrorene Konten sind
 * der am häufigsten genannte Schmerz von Avatar 1. Kein Wettbewerber ausser
 * ShipSmartify hat dafür überhaupt eine Funktion.
 *
 * Die Preise stehen in zahlen.ts, die Abbildung ist der echte Bildschirm
 * der App.
 */
import { preise } from "@/inhalte/zahlen";

export function Faelle() {
  return (
    <section className="sec faelle">
      <div className="faelle-gitter">
        <div className="faelle-bild fx">
          <Image
            src="/apps/dispute-uebersicht.png"
            alt="ecomet.dispute: PayPal- und Klarna-Fälle mit allen Belegen an einem Ort"
            width={1425}
            height={2595}
          />
        </div>

        <div className="faelle-text fx" data-d="1">
          <span className="eyebrow">
            <span className="dot" /> ecomet.dispute
          </span>
          <h2>
            Ein PayPal-Fall kostet dich sonst{" "}
            <span className="accent">einen halben Tag</span>
          </h2>
          <p>
            Käufer meldet einen Fall, du suchst die Bestellung, die
            Sendungsnummer, den Zustellnachweis, das Foto vom Paket. Bei
            Klarna nochmal von vorn, an einer anderen Stelle.
          </p>
          <ul className="haken">
            <li>
              <Haken /> Jeder Fall aus PayPal und Klarna landet an einem Ort
            </li>
            <li>
              <Haken /> Die Belege hängen schon dran, du musst nichts suchen
            </li>
            <li>
              <Haken /> Du siehst, wie viel Geld gerade im Streit steht
            </li>
          </ul>
          <p className="faelle-preis">
            Zehn Fälle im Monat sind enthalten. Jeder weitere kostet{" "}
            <strong>{preise.fallPreis.wert}</strong>.
          </p>
          <div>
            <Link href="/apps/faelle" className="glass-wrap">
              <span className="glass-btn sm">
                <span className="glass-txt">ecomet.dispute ansehen</span>
              </span>
              <span className="glass-shadow" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const Haken = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
