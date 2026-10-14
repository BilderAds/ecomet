import type { Metadata } from "next";
import Link from "next/link";
import { Effekte } from "@/components/start/effekte";
import { AbzockKopf, AbzockFuss } from "@/components/abzock/kopf";
import {
  BEISPIEL_ZEIGEN,
  BEWEIS_ZEIGEN,
  einsatz,
  fragen,
  fuerWen,
  pakete,
  plan,
} from "@/inhalte/abzock-check";

export const metadata: Metadata = {
  title: "Der kostenlose 24-Stunden-Abzock-Check | ecomet",
  description:
    "Mehr Marge aus jeder Bestellung. Bessere Einkaufspreise, ein Plan für deine Produktbilder und die größten Hebel in deinem Shop. Kostenlos, in 24 Stunden.",
  alternates: { canonical: "/abzock-check" },
};

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

const Haken = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function AbzockCheck() {
  return (
    <>
      <div className="bg-layer bg-glow" aria-hidden="true" />
      <div className="bg-layer bg-grain" aria-hidden="true" />
      <AbzockKopf />

      <main>
        {/* Block 1: Hero */}
        <section className="ak-hero" id="start">
          <div className="wrap ak-hero-gitter">
            <div className="ak-hero-text">
              <h1 className="fx">
                Mehr <span className="accent">Marge</span> aus jeder Bestellung.
              </h1>
              <p className="ak-unterzeile fx" data-d="1">
                Der kostenlose 24-Stunden-Abzock-Check für Shops, die schon verkaufen. Du bekommst
                bessere Einkaufspreise, einen Plan für deine Produktbilder und die größten Hebel in
                deinem Shop.
              </p>
              <div className="ak-knoepfe fx" data-d="2">
                <CheckKnopf gross />
                {BEISPIEL_ZEIGEN && (
                  <Link href="/abzock-check/beispiel" className="ak-knopf-zweit">
                    Beispiel ansehen
                  </Link>
                )}
              </div>
              <p className="ak-klein fx" data-d="3">
                Kostenlos. Ohne Vertrag. Ehrliche Antwort, auch wenn dein Preis schon gut ist.
              </p>
            </div>

            {/* So sieht der Check im Konto aus. Nur Struktur, keine Zahlen. */}
            <div className="ak-vorschau fx" data-d="2" aria-hidden="true">
              <div className="ak-vorschau-kopf">
                <span>Dein Abzock-Check</span>
                <span className="ak-vorschau-zeit num">24 h</span>
              </div>
              <ul>
                {pakete.map((p, i) => (
                  <li key={p.titel} className={i < 2 ? "fertig" : ""}>
                    <i />
                    {p.titel.replace(/\.$/, "")}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Block 2: Beweis. Aus, bis Fabios Screenshot und Okay da sind. */}
        {BEWEIS_ZEIGEN && (
          <section className="sec">
            <div className="wrap ak-mitte">
              <h2 className="sec-h2 fx">[Zahl aus Fabios Screenshot] Umsatz an einem Tag</h2>
              <p className="sec-p fx" data-d="1">
                Hinter dem Check stehen Leute, deren eigene Stores über 100.000 € an einem Tag
                gemacht haben.
              </p>
            </div>
          </section>
        )}

        {/* Block 3: Was du bekommst */}
        <section className="sec">
          <div className="wrap">
            <div className="sec-head fx">
              <h2 className="sec-h2">6 Dinge in 24 Stunden, kostenlos</h2>
            </div>
            <div className="ak-pakete">
              {pakete.map((p, i) => (
                <div key={p.titel} className="ak-paket fx" data-d={(i % 3) + 1}>
                  <h3>{p.titel}</h3>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
            <div className="ak-zusatz fx">
              <p>
                <strong>Dazu ab 10 Bestellungen am Tag:</strong> ein Besprechungs-Call, in dem wir
                alles mit dir durchgehen.
              </p>
              <p className="ak-anker">
                Ein vergleichbares Paket aus Shop-Analyse, Angles und Produktbildern kostet bei einer
                Agentur sonst 999 €. Für dich kostenlos.
              </p>
              <CheckKnopf />
            </div>
          </div>
        </section>

        {/* Block 4: Der Plan */}
        <section className="sec">
          <div className="wrap">
            <div className="sec-head fx">
              <h2 className="sec-h2">In 3 Schritten zu deinem Check</h2>
            </div>
            <div className="ak-plan">
              {plan.map((s, i) => (
                <div key={s.titel} className="schritt-karte fx" data-d={i + 1}>
                  <div className="schritt-n">{i + 1}</div>
                  <h3>{s.titel}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
            <div className="ak-mitte ak-luft fx">
              <CheckKnopf />
            </div>
          </div>
        </section>

        {/* Block 5: Was auf dem Spiel steht */}
        <section className="sec">
          <div className="wrap">
            <div className="sec-head fx">
              <h2 className="sec-h2">Jede Bestellung kann mehr bringen</h2>
            </div>
            <div className="einsatz-reihe">
              {einsatz.map((satz, i) => (
                <div key={satz} className="einsatz-karte fx" data-d={i + 1}>
                  <p className="ak-einsatz">{satz}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Block 6: Garantie */}
        <section className="sec">
          <div className="wrap">
            <div className="ak-zusage fx">
              <h2>Die Ehrlich-Zusage</h2>
              <p>
                Ist dein Preis fair, sagen wir dir das. Passt ecomet nicht zu deinem Shop, sagen wir
                dir das auch. Deinen Check bekommst du in beiden Fällen.
              </p>
            </div>
          </div>
        </section>

        {/* Block 7: Für wen */}
        <section className="sec">
          <div className="wrap ak-fuerwen">
            <h2 className="sec-h2 fx">Gemacht für Shops ab 10 Bestellungen am Tag</h2>
            <ul className="ak-haken fx" data-d="1">
              {fuerWen.map((z) => (
                <li key={z}>
                  <Haken />
                  {z}
                </li>
              ))}
            </ul>
            <p className="ak-klein fx" data-d="2">
              Noch keine Bestellungen? Dann komm wieder, sobald dein Shop läuft.
            </p>
          </div>
        </section>

        {/* Block 8: Fragen */}
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

        {/* Block 9: Abschluss */}
        <section className="sec abschluss">
          <div className="wrap">
            <div className="abschluss-kasten fx">
              <h2>Dein Check in 24 Stunden</h2>
              <p>
                Starte vor dem Weihnachtsgeschäft, dann verkaufst du im Dezember schon mit deinen
                neuen Zahlen.
              </p>
              <div className="abschluss-knoepfe">
                <CheckKnopf gross />
              </div>
            </div>
          </div>
        </section>
      </main>

      <AbzockFuss />

      {/* Handy: Knopf unten, sobald der Hero durch ist */}
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
