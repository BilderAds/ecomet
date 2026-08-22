import type { Metadata } from "next";
import { Rahmen, SeitenKopf } from "@/components/start/rahmen";
import { AnfrageFormular } from "@/components/start/anfrage-formular";

export const metadata: Metadata = {
  title: "Konto anlegen | ecomet",
  description:
    "Trag dich ein, wir richten dein Konto ein und melden uns am selben Werktag. Kein Vertrag, keine Grundgebühr.",
};

export default function Registrieren() {
  return (
    <Rahmen>
      <SeitenKopf
        ueber="Konto anlegen"
        titel={
          <>
            Ein Konto, <span className="accent">alles drin</span>
          </>
        }
        satz="Wir richten dein Konto ein und melden uns am selben Werktag mit deinen Zugangsdaten. Kein Vertrag, keine Grundgebühr, keine Mindestlaufzeit."
      />

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="fx">
            <AnfrageFormular art="registrierung" quelle="/registrieren" />
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head fx">
            <h2 className="sec-h2">Was danach passiert</h2>
          </div>
          <div className="steps">
            {[
              ["Wir sehen uns deinen Shop an", "Damit wir im Gespräch schon wissen, worum es geht."],
              ["Kurzes Gespräch", "Zehn Minuten am Telefon oder per Nachricht, ganz wie du magst."],
              ["Konto steht", "Du bekommst deine Zugangsdaten und installierst die App in Shopify."],
              ["Erste Bestellung", "Sobald der Shop verbunden ist, läuft es."],
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
    </Rahmen>
  );
}
