import type { Metadata } from "next";
import Link from "next/link";
import { Rahmen, SeitenKopf } from "@/components/start/rahmen";
import { preise } from "@/inhalte/zahlen";

export const metadata: Metadata = {
  title: "Lager in Deutschland | ecomet",
  description:
    "Deine Ware liegt in Deutschland und ist in 1 bis 3 Werktagen beim Kunden. Deutsche Rechnung, deutscher Ansprechpartner, Retouren im Inland.",
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
            Deine Pakete sind beim Kunden.{" "}
            <span className="accent">In 1 bis 3 Tagen.</span>
          </>
        }
        satz="Deine Ware liegt in Deutschland. Deutsche Rechnung, Retouren im Inland, und ein Ansprechpartner, der deine Sprache spricht."
      />

      <section className="sec">
        <div className="wrap">
          <div className="zwei">
            <div className="fx">
              <h2>Warum das den Unterschied macht</h2>
              <p>
                Ein Paket aus China braucht vier bis acht Tage. Aus unserem Lager
                ist es ein bis drei. Deine Kunden bestellen wieder, deine
                Bewertungen bleiben oben, und du bekommst weniger Nachfragen.
              </p>
              <ul className="haken">
                <li><Haken /> Bis 12 Uhr bestellt, am selben Werktag versandt</li>
                <li><Haken /> Retouren sind in zwei Werktagen bearbeitet</li>
                <li><Haken /> Retouren gehen nach Deutschland zurück, nicht nach China</li>
                <li><Haken /> Höchstens 0,5 % Fehler im Lager, vertraglich zugesagt</li>
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
                    <td>{preise.verpackung.label}</td>
                    <td>{preise.verpackung.wert}</td>
                  </tr>
                  <tr>
                    <td>{preise.kleinpaketDe.label}</td>
                    <td>{preise.kleinpaketDe.wert}</td>
                  </tr>
                  <tr>
                    <td>{preise.retoure.label}</td>
                    <td>{preise.retoure.wert}</td>
                  </tr>
                  <tr>
                    <td>{preise.lagerplatz.label}</td>
                    <td>{preise.lagerplatz.wert}</td>
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
              ["Gespräch mit deinem Lagerpartner", "Anders als beim Import läuft das nicht allein über die App. Du sprichst einmal mit dem Partner, der dein Lager führt."],
              ["Ware anmelden und anliefern", "Was kommt, wie viel, wie es verpackt ist. Du schickst die Ware ans Lager oder wir holen sie in China ab."],
              ["Shop verbinden", "Die ecomet App verbindet deinen Shop. Bestellungen kommen automatisch an."],
              ["Versenden", "Bis 12 Uhr bestellt, am selben Werktag raus. Ab jetzt ohne dein Zutun."],
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
