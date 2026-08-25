import type { Metadata } from "next";
import Link from "next/link";
import { Rahmen, SeitenKopf } from "@/components/start/rahmen";

/**
 * Import aus China, das dritte Angebot neben Dropshipping und deutschem Lager.
 *
 * Kevin am 25.08.2026: „Import wäre ja nochmal was ganz Eigenes, für so
 * Großkunden oder so. Das ist ja auch was, was man machen kann." Und danach:
 * „ich will Import aus China auch direkt als Header-Link haben mit einer
 * eigenen Unterseite."
 *
 * Der Unterschied zu `/fulfillment/china`: dort geht jedes Paket EINZELN an
 * den Endkunden, sobald er bestellt. Hier kauft der Händler eine MENGE, sie
 * kommt gesammelt nach Deutschland und liegt danach im Lager. Andere
 * Zielgruppe, andere Preislogik, deshalb nach Miller (S. 130) eine eigene
 * Seite mit eigenem BrandScript.
 *
 * ⚠ WAS HIER BEWUSST NICHT STEHT, weil es niemand belegt hat:
 * Mindestmengen, Stückpreise, Transportkosten, Zollsätze, Laufzeiten für
 * See- und Luftfracht, Incoterms. **Nichts davon erfinden.** Sobald Kevin die
 * Zahlen nennt, gehören sie nach `src/inhalte/zahlen.ts` mit Quelle, dann
 * zeigt `npm run zahlen-pruefen` sie als belegt an.
 *
 * Belegt ist, was auch auf den anderen Seiten steht und dort seine Quelle
 * hat: eigenes Team vor Ort, Hersteller finden, Qualitätskontrolle, deutsches
 * Lager mit 1 bis 3 Tagen Versand, Retouren im Inland.
 */
export const metadata: Metadata = {
  title: "Import aus China | ecomet",
  description:
    "Du kaufst direkt in China ein, ohne je dort gewesen zu sein. Erst ein Muster, dann die Menge. Unser Team prüft die Ware vor Ort, danach liegt sie im deutschen Lager.",
};

const Haken = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function Import() {
  return (
    <Rahmen>
      <SeitenKopf
        ueber="Import aus China"
        titel={
          <>
            Du kaufst direkt in China ein.{" "}
            <span className="accent">Ohne je dort gewesen zu sein.</span>
          </>
        }
        satz="Du überweist keine fünfstellige Summe an eine Fabrik, die du nie gesehen hast. Unser Team steht vor Ort daneben, du bekommst erst ein Muster, dann geht die Menge in Produktion. Kein Zwischenhändler, kein Aufschlag auf jedes Stück."
      />

      <section className="sec">
        <div className="wrap">
          <div className="zwei">
            <div className="fx">
              <h2>Wann du aufhören solltest, den Zwischenhändler zu bezahlen</h2>
              <p>
                Beim Dropshipping geht jedes Paket einzeln raus, dafür zahlst du
                jedes Mal Stückpreis und Versand. Sobald ein Produkt bei dir
                zuverlässig läuft, wird der Einkauf in Menge günstiger, und die
                Ware liegt danach hier statt in China.
              </p>
              <ul className="haken">
                <li><Haken /> Ein Produkt verkauft sich stabil, nicht nur im Test</li>
                <li><Haken /> Du willst den Stückpreis drücken statt jedes Paket einzeln zu zahlen</li>
                <li><Haken /> Deine Kunden sollen in 1 bis 3 Tagen beliefert werden</li>
                <li><Haken /> Retouren sollen nach Deutschland gehen, nicht nach China</li>
                <li><Haken /> Du brauchst eigene Verpackung in größerer Stückzahl</li>
              </ul>
            </div>
            <div className="fx" data-d="1">
              <h2>Was dir dabei abgenommen wird</h2>
              <p>
                Der Einkauf in China scheitert selten am Preis, sondern daran,
                dass niemand vor Ort ist. Unser Team sitzt dort und nimmt die
                Ware in die Hand, bevor sie auf die Reise geht.
              </p>
              <ul className="haken">
                <li><Haken /> Hersteller suchen und vergleichen, auf Deutsch besprochen</li>
                <li><Haken /> Muster, bevor die große Menge bestellt wird</li>
                <li><Haken /> Qualitätskontrolle vor dem Versand</li>
                <li><Haken /> Transport nach Deutschland und Einlagerung</li>
                <li><Haken /> Danach läuft der Versand über dein Lager hier</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head fx">
            <h2 className="sec-h2">
              <span className="mark glow">
                <span>In fünf Schritten</span>
              </span>{" "}
              zur eigenen Ware
            </h2>
          </div>
          <div className="steps">
            {[
              ["Produkt nennen", "Ein Link, ein Foto oder eine Beschreibung. Dazu die Menge, an die du denkst."],
              ["Angebot bekommen", "Wir suchen den Hersteller und nennen dir Stückpreis, Transport und Dauer. Erst danach entscheidest du."],
              ["Muster prüfen", "Bevor eine große Menge bestellt wird, siehst du die Ware. Was nicht passt, wird nicht bestellt."],
              ["Produktion und Kontrolle", "Unser Team vor Ort sieht sich die Ware an, bevor sie verschickt wird."],
              ["Ankunft im Lager", "Die Ware kommt nach Deutschland und wird eingelagert. Ab da gehen deine Bestellungen in 1 bis 3 Tagen raus."],
            ].map(([titel, text], i) => (
              <div key={titel} className={`step fx${i === 0 ? " active" : ""}`} data-d={i + 1}>
                <div className="step-n num">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3>{titel}</h3>
                  <p>{text}</p>
                  <div className="step-line">
                    <i />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="zwei" style={{ alignItems: "start" }}>
            <div className="tab-huelle fx">
              <span className="svc-tag">Was der Import kostet</span>
              <p style={{ margin: "14px 0 0", color: "rgba(255,255,255,.66)", lineHeight: 1.7 }}>
                Dafür gibt es <strong>keine Preisliste</strong>, und zwar aus
                demselben Grund wie beim Dropshipping: der Preis hängt am
                Produkt, an der Menge und am Gewicht. Du bekommst Stückpreis,
                Transport und Dauer als ein Angebot, bevor du dich entscheidest.
              </p>
              <p style={{ margin: "14px 0 0", color: "rgba(255,255,255,.5)", lineHeight: 1.7, fontSize: ".9375rem" }}>
                Was danach im Lager passiert, steht dagegen fest. Lagerung,
                Kommissionierung und Versand laufen zu den Preisen der{" "}
                <Link href="/preise" style={{ color: "var(--a1)" }}>
                  Preisseite
                </Link>
                .
              </p>
            </div>
            <div className="tab-huelle fx" data-d="1">
              <span className="svc-tag">Import oder Dropshipping</span>
              <p style={{ margin: "14px 0 0", color: "rgba(255,255,255,.66)", lineHeight: 1.7 }}>
                Beides geht, auch gleichzeitig. Viele testen ein Produkt erst im{" "}
                <Link href="/fulfillment/china" style={{ color: "var(--a1)" }}>
                  Dropshipping
                </Link>{" "}
                und importieren es in Menge, sobald es läuft. Danach liegt es im{" "}
                <Link href="/fulfillment/deutschland" style={{ color: "var(--a1)" }}>
                  deutschen Lager
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="claim fx" style={{ textAlign: "center" }}>
            <h3>Sag uns, was du importieren willst.</h3>
            <p>Produkt und ungefähre Menge genügen. Du bekommst ein Angebot, keine Verkaufsmasche.</p>
            <div style={{ marginTop: 24, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <span className="glass-wrap">
                <Link href="/kontakt" className="glass-btn">
                  <span className="glass-txt">Import anfragen</span>
                </Link>
                <span className="glass-shadow" />
              </span>
              <span className="glass-wrap">
                <Link href="/registrieren" className="glass-btn">
                  <span className="glass-txt">Konto erstellen</span>
                </Link>
                <span className="glass-shadow" />
              </span>
            </div>
          </div>
        </div>
      </section>
    </Rahmen>
  );
}
