import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BadgeEuro, Camera, ClipboardCheck, FlaskConical, ScanSearch, ShieldCheck } from "lucide-react";
import { Instrument_Serif } from "next/font/google";
import { Effekte } from "@/components/start/effekte";
import { AbzockKopf, AbzockFuss } from "@/components/abzock/kopf";
import { MargenRechner } from "@/components/abzock/rechner";
import {
  BEWEIS_ZEIGEN,
  PLATZHALTER_ZEIGEN,
  paketeKurz,
  platzhalterStimmen,
} from "@/inhalte/abzock-check";

/**
 * Abzock-Check, zweite Fassung (14.10.2026): nach dem Vorbild von Fabios
 * Triolo-Funnel (app.triolo-bildungsakademie.de/firma). Kevin: „Leute lesen
 * nicht, die scannen". Gesicht, Zahl und Klick statt Absätze.
 */

export const metadata: Metadata = {
  title: "Zockt dein Agent dich ab? In 24 Stunden weißt du es. | ecomet",
  description:
    "Der kostenlose Abzock-Check: In 24 Stunden weißt du, ob du deinem Agenten zu viel zahlst. Dazu Shop-Analyse und Bilder-Plan.",
  alternates: { canonical: "/abzock-check" },
};

// Kursiver Akzent wie in Fabios Triolo-Funnel, nur für das eine Wort im H1.
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", display: "swap" });

const symbole = [BadgeEuro, ScanSearch, Camera, ClipboardCheck, FlaskConical, ShieldCheck];

function CheckKnopf({ gross = false }: { gross?: boolean }) {
  return (
    <Link href="/abzock-check/start" className={`ak-knopf${gross ? " ak-knopf-gross" : ""}`}>
      Check starten
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

const fragen = [
  { frage: "Was kostet der Check?", antwort: "Nichts. Kein Vertrag, kein Abo." },
  { frage: "Muss ich danach wechseln?", antwort: "Nein. Du bekommst deinen Check und entscheidest selbst." },
  { frage: "Wer sieht meine Zahlen?", antwort: "Nur wir, und nur für deinen Check. Mehr in der Datenschutzerklärung." },
  { frage: "Was, wenn mein Preis schon gut ist?", antwort: "Dann sagen wir dir das. Deinen Check bekommst du trotzdem." },
];

export default function AbzockCheck() {
  return (
    <>
      <div className="bg-layer bg-glow" aria-hidden="true" />
      <div className="bg-layer bg-grain" aria-hidden="true" />
      <AbzockKopf />

      <main>
        {/* Hero nach Fabios Muster: Versprechen, Unterzeile, Knopf, Beweis, Chips, Video */}
        <section className="ak-hero2" id="start">
          <div className="wrap ak-mitte">
            <h1 className="fx">Zockt dein Agent dich ab?</h1>
            <p className="ak-antwort fx" data-d="1">
              In 24 Stunden <span className="ak-nowrap">weißt du es.</span> <span className={`ak-kursiv-inline ${serif.className}`}>Kostenlos.</span>
            </p>
            <div className="ak-knoepfe ak-mitte fx" data-d="2">
              <CheckKnopf gross />
            </div>
            <p className="ak-klein fx" data-d="2">0 € für Shops, die schon verkaufen</p>

            {PLATZHALTER_ZEIGEN && (
              <div className="ak-beweis fx" data-d="3">
                <div className="ak-koepfe" aria-hidden="true">
                  {["Lisa", "Tom", "Sarah", "Marco", "Felix"].map((k) => (
                    <Image key={k} src={`/koepfe/${k}.svg`} alt="" width={36} height={36} />
                  ))}
                </div>
                <p>
                  <strong>[Anzahl] Shops</strong> haben uns bewertet <em className="ak-platzhalter">Platzhalter</em>
                </p>
                <div className="ak-sterne-kasten" aria-label="5,0 von 5 Sternen">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span key={i} aria-hidden="true">★</span>
                  ))}
                  <b className="num">5,0</b>
                </div>
              </div>
            )}

            <div className="ak-chips fx" data-d="3">
              <span>✓ Ergebnis in 24 Stunden</span>
              <span>✓ Für Shops, die schon verkaufen</span>
            </div>

            {PLATZHALTER_ZEIGEN && (
              <div className="ak-video fx" data-d="3" aria-label="Platz für das Video von Kevin">
                <div className="ak-video-play" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </div>
                <span className="ak-platzhalter">Platzhalter: Video von Kevin, 60 bis 90 Sekunden</span>
              </div>
            )}
          </div>
        </section>

        {/* Die eigene Zahl */}
        <section className="sec">
          <div className="wrap ak-mitte">
            <h2 className="sec-h2 fx">Was dich 1 € zu viel kostet</h2>
            <div className="fx" data-d="1">
              <MargenRechner />
            </div>
          </div>
        </section>

        {/* Block 2: Fabios Beweis, aus bis Screenshot und Okay da sind */}
        {BEWEIS_ZEIGEN && (
          <section className="sec">
            <div className="wrap ak-mitte">
              <h2 className="sec-h2 fx">[Zahl aus Fabios Screenshot] Umsatz an einem Tag</h2>
            </div>
          </section>
        )}

        {/* Was du bekommst */}
        <section className="sec">
          <div className="wrap">
            <div className="sec-head fx">
              <h2 className="sec-h2">6 Dinge in 24 Stunden, kostenlos</h2>
            </div>
            <div className="ak-kacheln">
              {paketeKurz.map((p, i) => {
                const Symbol = symbole[i];
                return (
                  <div key={p.titel} className="ak-kachel fx" data-d={(i % 3) + 1}>
                    <Symbol size={22} strokeWidth={1.8} aria-hidden="true" />
                    <h3>{p.titel}</h3>
                    <p>{p.zeile}</p>
                  </div>
                );
              })}
            </div>
            <p className="ak-klein ak-mitte fx">Ab 10 Bestellungen am Tag: Call mit Kevin oder Fabio dazu.</p>
          </div>
        </section>

        {/* 3 Schritte */}
        <section className="sec">
          <div className="wrap">
            <div className="sec-head fx">
              <h2 className="sec-h2">In 3 Schritten zu deinem Check</h2>
            </div>
            <div className="ak-plan">
              {[
                ["Fragen klicken", "Bestellungen, Preis, Ads"],
                ["Check läuft", "Preis, Shop und Bilder"],
                ["Ergebnis in 24 Stunden", "In deinem ecomet-Konto"],
              ].map(([titel, zeile], i) => (
                <div key={titel} className="schritt-karte fx" data-d={i + 1}>
                  <div className="schritt-n">{i + 1}</div>
                  <h3>{titel}</h3>
                  <p>{zeile}</p>
                </div>
              ))}
            </div>
            <div className="ak-mitte ak-luft fx">
              <CheckKnopf />
            </div>
          </div>
        </section>

        {/* Was Kunden zusätzlich bekommen (Bonus-Stapel, Bauvorlage Abschnitt 10) */}
        <section className="sec">
          <div className="wrap">
            <div className="sec-head fx">
              <h2 className="sec-h2">Wirst du ecomet-Kunde, kommt dazu</h2>
            </div>
            <div className="ak-kacheln ak-kacheln-vier">
              {[
                ["Alle 7 Produktbilder", "Fertig für dein Hauptprodukt"],
                ["Lager in Deutschland", "Keine Lagergebühr, solange Ware rausgeht"],
                ["Hilfe beim Skalieren", "Ads, Creatives, Media Buying, Offer"],
                ["Neue Preise", "Mit Muster zum Vergleich"],
              ].map(([titel, zeile], i) => (
                <div key={titel} className="ak-kachel fx" data-d={(i % 4) + 1}>
                  <h3>{titel}</h3>
                  <p>{zeile}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stimmen: Platzhalter, nur in der Vorschau */}
        {PLATZHALTER_ZEIGEN && (
          <section className="sec">
            <div className="wrap">
              <div className="sec-head fx">
                <h2 className="sec-h2">Das sagen Shops nach dem Check</h2>
              </div>
              <div className="ak-stimmen">
                {platzhalterStimmen.map((s, i) => (
                  <figure key={s.name} className="ak-stimme fx" data-d={i + 1}>
                    <div className="ak-sterne" aria-hidden="true">★★★★★</div>
                    <blockquote>„{s.text}“</blockquote>
                    <figcaption>
                      <strong>{s.name}</strong> · {s.rolle}
                    </figcaption>
                    <span className="ak-platzhalter">Platzhalter</span>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Wer den Check macht */}
        <section className="sec">
          <div className="wrap">
            <div className="ak-menschen fx">
              <div className="ak-gesichter">
                <Image src="/team/fabio.png" alt="Fabio" width={88} height={88} />
                <span className="ak-initial" aria-label="Kevin">K</span>
              </div>
              <h2>Moin, wir sind Kevin und Fabio.</h2>
              <p>Den Check macht kein Bot allein. Den Call machst du mit einem von uns.</p>
              <p className="ak-zusage-zeile">Ist dein Preis fair, sagen wir dir das. Ehrlich.</p>
            </div>
          </div>
        </section>

        {/* Fragen */}
        <section className="sec faq-sec">
          <div className="wrap">
            <div className="sec-head fx">
              <h2 className="sec-h2">Fragen</h2>
            </div>
            <div className="faq">
              {fragen.map((f, i) => (
                <div key={f.frage} className={`faq-item fx${i === 0 ? " open" : ""}`} data-d={(i % 3) + 1}>
                  <button className="faq-q" type="button">
                    {f.frage}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  <div className="faq-a">
                    <div>{f.antwort}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Abschluss */}
        <section className="sec abschluss">
          <div className="wrap">
            <div className="abschluss-kasten fx">
              <h2>Dein Check vor Weihnachten</h2>
              <p>Im Dezember verkaufst du schon mit deinen neuen Zahlen.</p>
              <div className="abschluss-knoepfe">
                <CheckKnopf gross />
              </div>
            </div>
          </div>
        </section>
      </main>

      <AbzockFuss />

      <div className="mbar" id="mbar">
        <div className="mbar-in">
          <Link href="/abzock-check/start" className="ak-mbar">
            Check starten
          </Link>
        </div>
      </div>
      <Effekte />
    </>
  );
}
