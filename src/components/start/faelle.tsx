import Image from "next/image";
import Link from "next/link";

/**
 * Eigener Abschnitt für ecomet.dispute, weiter unten auf der Startseite.
 *
 * Kevin am 24.08.: „Disputes ist krass, da auf jeden Fall noch so eigene
 * Section auf der Homepage haben, so bisschen weiter unten."
 *
 * ⚠ Kevin schlug als Überschrift vor: „gewinne automatisch PayPal und Klarna
 * Fälle". Das Wort AUTOMATISCH steht nicht drin, weil unsere eigene App-Seite
 * das Gegenteil sagt: „Sie antwortet nichts ohne dich, jede Antwort geht erst
 * nach deiner Freigabe raus" und „Sie entscheidet keinen Fall". Deshalb
 * „mit einem Klick", das deckt sich mit Schritt 3 auf der App-Seite:
 * „Die Belege liegen dabei, du schickst sie mit einem Klick."
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
            <span className="dot" /> ecomet.disputes
          </span>
          <h2>
            Gewinne PayPal- und Klarna-Fälle{" "}
            <span className="accent">mit einem Klick</span>
          </h2>
          <p>
            Sonst suchst du bei jedem Fall die Bestellung, die Sendungsnummer
            und den Zustellnachweis zusammen. Bei Klarna nochmal von vorn, in
            einem anderen Portal. Hier liegt alles schon am Fall.
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
