import type { Metadata } from "next";
import Link from "next/link";
import { Rahmen, SeitenKopf } from "@/components/start/rahmen";
import { preise } from "@/inhalte/zahlen";

export const metadata: Metadata = {
  title: "Lager in Deutschland | ecomet",
  description:
    "Deine Ware liegt in Deutschland und geht in 1 bis 2 Tagen zum Kunden. Deutsche Rechnung, deutscher Ansprechpartner, Retouren im Inland.",
};

const Haken = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function Deutschland() {
  return (
    <Rahmen>
      <SeitenKopf
        ueber="Deutsches Lager"
        titel={
          <>
            Heute bestellt.{" "}
            <span className="accent">Morgen beim Kunden.</span>
          </>
        }
        satz="Deine Ware liegt in Deutschland. Wir packen und verschicken am selben Tag, mit deutscher Rechnung und einem Ansprechpartner, der deine Sprache spricht."
      />

      <section className="sec">
        <div className="wrap">
          <div className="zwei">
            <div className="fx">
              <h2>Warum das den Unterschied macht</h2>
              <p>
                Ein Paket aus China braucht vier bis acht Tage. Aus unserem Lager
                ist es ein bis zwei. Deine Kunden bestellen wieder, deine
                Bewertungen bleiben oben, und du bekommst weniger Nachfragen.
              </p>
              <ul className="haken">
                <li><Haken /> Versand am selben Tag, wenn die Bestellung bis mittags kommt</li>
                <li><Haken /> Sendungsverfolgung von DHL, kein Umweg über Asien</li>
                <li><Haken /> Retouren gehen nach Deutschland zurück, nicht nach China</li>
                <li><Haken /> Wir kümmern uns um deine Pflichten beim Verpackungsgesetz</li>
                <li><Haken /> Keine Mindestlaufzeit und keine Grundgebühr</li>
              </ul>
            </div>
            <div className="tab-huelle fx" data-d="1">
              <table className="preistab">
                <thead>
                  <tr>
                    <th>Was</th>
                    <th>Preis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Fulfillment je Bestellung</td>
                    <td>{preise.fulfillmentDe.wert}</td>
                  </tr>
                  <tr>
                    <td>Verpackungsmaterial</td>
                    <td>0,36 €</td>
                  </tr>
                  <tr>
                    <td>Kleinpaket bis 1 kg nach DE</td>
                    <td>4,16 €</td>
                  </tr>
                  <tr>
                    <td>Retoure, geprüft und wieder eingelagert</td>
                    <td>3,07 €</td>
                  </tr>
                  <tr>
                    <td>Lagerplatz je Palette und Monat</td>
                    <td>18,45 €</td>
                  </tr>
                  <tr className="hervor">
                    <td>Eine Bestellung 400 g nach Deutschland</td>
                    <td>{preise.bestellungDe.wert}</td>
                  </tr>
                </tbody>
              </table>
              <p className="feld-hinweis" style={{ marginTop: 14 }}>
                Alle Preise netto. Vollständige Liste auf{" "}
                <Link href="/preise" style={{ color: "var(--a1)" }}>
                  der Preisseite
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head fx">
            <h2 className="sec-h2">
              <span className="mark">
                <span>So kommst du rein</span>
              </span>
            </h2>
          </div>
          <div className="steps">
            {[
              ["Ware anmelden", "Du sagst uns, was kommt, wie viel und wie es verpackt ist."],
              ["Anliefern", "Du schickst die Ware ans Lager oder wir holen sie in China ab."],
              ["Verbinden", "Die ecomet App verbindet deinen Shop. Bestellungen kommen automatisch an."],
              ["Versenden", "Ab jetzt geht jedes Paket ohne dein Zutun raus."],
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
            <h3>Fangen wir mit deiner ersten Palette an.</h3>
            <p>Sag uns, was du verkaufst. Wir rechnen dir deinen Preis aus.</p>
            <div style={{ marginTop: 24, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <span className="glass-wrap">
                <Link href="/registrieren" className="glass-btn">
                  <span className="glass-txt">Konto erstellen</span>
                </Link>
                <span className="glass-shadow" />
              </span>
              <span className="glass-wrap">
                <Link href="/kontakt" className="glass-btn">
                  <span className="glass-txt">Frage stellen</span>
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
