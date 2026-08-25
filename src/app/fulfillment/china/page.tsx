import type { Metadata } from "next";
import Link from "next/link";
import { Rahmen, SeitenKopf } from "@/components/start/rahmen";

export const metadata: Metadata = {
  title: "Dropshipping aus China | ecomet",
  description:
    "Wir finden dein Produkt, prüfen die Qualität und verschicken direkt an deinen Kunden. 4 bis 8 Tage in den DACH-Raum, ohne Mindestmenge.",
};

const Haken = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function China() {
  return (
    <Rahmen>
      <SeitenKopf
        ueber="Dropshipping aus China"
        titel={
          <>
            Du verkaufst,{" "}
            <span className="accent">bevor du einkaufst.</span>
          </>
        }
        satz="Dropshipping aus China, ohne Mindestmenge und ohne Vorrat. Du bindest kein Geld, wir suchen den Hersteller, prüfen jedes Paket und schicken es direkt an deinen Kunden."
      />

      <section className="sec">
        <div className="wrap">
          <div className="zwei">
            <div className="fx">
              <h2>Ein Ansprechpartner, kein Übersetzungsbüro</h2>
              <p>
                Du redest auf Deutsch mit uns, wir reden mit den Herstellern. Du
                schickst uns einen Link oder ein Foto, wir kommen mit einem Preis
                zurück.
              </p>
              <ul className="haken">
                <li><Haken /> Eigenes Team vor Ort, das die Ware in die Hand nimmt</li>
                <li><Haken /> Qualitätskontrolle vor jedem Versand</li>
                <li><Haken /> 4 bis 8 Tage in den DACH-Raum</li>
                <li><Haken /> Keine Mindestbestellmenge, auch nicht beim ersten Test</li>
                <li><Haken /> Kein fremder Zettel und keine fremde Rechnung im Paket</li>
              </ul>
            </div>
            <div className="fx" data-d="1">
              <h2>Deine Marke, nicht unsere</h2>
              <p>
                Verpackung, Beilage, Etikett, alles kann deins sein. Dein Kunde
                merkt nicht, woher die Ware kommt, er sieht nur dich.
              </p>
              <ul className="haken">
                <li><Haken /> Eigene Kartons und eigenes Klebeband</li>
                <li><Haken /> Dankeskarte oder Anleitung liegt bei</li>
                <li><Haken /> Etikett mit deinem Logo auf dem Produkt</li>
                <li><Haken /> Fotos deiner echten Ware für deinen Shop</li>
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
                <span>Vom Link</span>
              </span>{" "}
              zum ersten Paket
            </h2>
          </div>
          <div className="steps">
            {[
              ["App installieren", "Die ecomet App in deinem Shopify-Shop. Ein Klick, du brauchst dafür niemanden von uns."],
              ["Produkt anfragen", "Direkt in der App: Link von AliExpress, Foto oder Beschreibung. Wir nennen Stückpreis und Versand."],
              ["Muster prüfen", "Auf Wunsch schicken wir dir erst ein Muster, bevor es losgeht."],
              ["Verkaufen", "Deine Bestellungen kommen automatisch bei uns an, wir verschicken."],
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
          <div className="claim fx" style={{ textAlign: "center" }}>
            <h3>Schick uns dein erstes Produkt.</h3>
            <p>Ein Link genügt. Du bekommst einen Preis, keine Verkaufsmasche.</p>
            <div style={{ marginTop: 24, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <span className="glass-wrap">
                <Link href="/registrieren" className="glass-btn">
                  <span className="glass-txt">Konto erstellen</span>
                </Link>
                <span className="glass-shadow" />
              </span>
              <span className="glass-wrap">
                <Link href="/kontakt" className="glass-btn">
                  <span className="glass-txt">Produkt anfragen</span>
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
