import type { Metadata } from "next";
import Link from "next/link";
import { Rahmen, SeitenKopf } from "@/components/start/rahmen";
import { preise } from "@/inhalte/zahlen";

export const metadata: Metadata = {
  title: "Preise | ecomet",
  description:
    "Was Lagerung, Verpackung und Versand aus dem deutschen Lager kosten. Feste Preise pro Bestellung, keine Grundgebühr, keine Mindestlaufzeit.",
};

/** Alle Werte aus der Preisliste vom 21.08.2026, Regel Packsy mal 1,23 abgeschnitten. */
const lager = [
  ["Fulfillment je Bestellung", "2,82 €"],
  ["Jeder weitere Artikel in derselben Bestellung", "0,36 €"],
  ["Verpackungsmaterial", "0,36 €"],
  ["Wareneingang je Palette", "18,45 €"],
  ["Lagerplatz je Palette und Monat", "18,45 €"],
  ["Retoure, geprüft und wieder eingelagert", "3,07 €"],
];

const versand = [
  ["Kleinpaket bis 1 kg, Deutschland", "4,16 €"],
  ["Paket bis 2 kg, Deutschland", "auf Anfrage"],
  ["Österreich und Schweiz", "auf Anfrage"],
  ["Übriges Europa, 43 Länder", "auf Anfrage"],
];

export default function Preise() {
  return (
    <Rahmen>
      <SeitenKopf
        ueber="Preise"
        titel={
          <>
            Eine Bestellung nach Deutschland:{" "}
            <span className="accent">{preise.bestellungDe.wert}</span>
          </>
        }
        satz="Bis 400 Gramm, alles zusammen: Kommissionierung, Verpackung und Porto. Keine Grundgebühr, keine Mindestlaufzeit, keine Einrichtungskosten."
      />

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="zwei" style={{ alignItems: "start" }}>
            <div className="tab-huelle fx">
              <span className="svc-tag">Lager in Deutschland</span>
              <table className="preistab" style={{ marginTop: 16 }}>
                <thead>
                  <tr>
                    <th>Leistung</th>
                    <th>Netto</th>
                  </tr>
                </thead>
                <tbody>
                  {lager.map(([was, preis]) => (
                    <tr key={was}>
                      <td>{was}</td>
                      <td>{preis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="tab-huelle fx" data-d="1">
              <span className="svc-tag">Versand</span>
              <table className="preistab" style={{ marginTop: 16 }}>
                <thead>
                  <tr>
                    <th>Ziel</th>
                    <th>Netto</th>
                  </tr>
                </thead>
                <tbody>
                  {versand.map(([was, preis]) => (
                    <tr key={was}>
                      <td>{was}</td>
                      <td>{preis}</td>
                    </tr>
                  ))}
                  <tr className="hervor">
                    <td>Bestellung 400 g nach Deutschland, alles zusammen</td>
                    <td>{preise.bestellungDe.wert}</td>
                  </tr>
                </tbody>
              </table>
              <p className="feld-hinweis" style={{ marginTop: 14 }}>
                Die vollständige Liste mit allen Gewichtsstufen und 43 Ländern
                schicken wir dir als PDF. Frag sie über{" "}
                <Link href="/kontakt" style={{ color: "var(--a1)" }}>
                  das Kontaktformular
                </Link>{" "}
                an.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="zwei" style={{ alignItems: "start" }}>
            <div className="tab-huelle fx">
              <span className="svc-tag">Import aus China</span>
              <p style={{ margin: "14px 0 0", color: "rgba(255,255,255,.66)", lineHeight: 1.7 }}>
                Hier gibt es keine Liste, weil jedes Produkt anders ist. Du
                schickst uns einen Link oder ein Foto, wir nennen dir Stückpreis
                und Versand, meistens am selben Tag. Erst danach entscheidest du.
              </p>
              <div style={{ marginTop: 20 }}>
                <span className="glass-wrap">
                  <Link href="/kontakt" className="glass-btn sm">
                    <span className="glass-txt">Produkt anfragen</span>
                  </Link>
                  <span className="glass-shadow" />
                </span>
              </div>
            </div>

            <div className="tab-huelle fx" data-d="1">
              <span className="svc-tag">Apps</span>
              <table className="preistab" style={{ marginTop: 16 }}>
                <thead>
                  <tr>
                    <th>App</th>
                    <th>Preis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>die ecomet App</td>
                    <td>kostenlos</td>
                  </tr>
                  <tr>
                    <td>ecomet.invoices</td>
                    <td>{preise.invoicesMonat.wert} / Monat</td>
                  </tr>
                  <tr>
                    <td>ecomet.dispute, ab dem elften Fall im Monat</td>
                    <td>{preise.fallPreis.wert}</td>
                  </tr>
                </tbody>
              </table>
              <p className="feld-hinweis" style={{ marginTop: 14 }}>
                ecomet.invoices sieben Tage kostenlos, danach monatlich kündbar.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="claim fx" style={{ textAlign: "center" }}>
            <h3>Rechnen wir deinen Fall durch.</h3>
            <p>
              Sag uns, was du verkaufst, wie schwer es ist und wohin es geht. Du
              bekommst deinen Preis, keine Verkaufsmasche.
            </p>
            <div style={{ marginTop: 24 }}>
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
