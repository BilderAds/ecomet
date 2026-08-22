import type { Metadata } from "next";
import Link from "next/link";
import { Rahmen, SeitenKopf } from "@/components/start/rahmen";

export const metadata: Metadata = {
  title: "Über uns | ecomet",
  description:
    "Deutsch geführt, mit eigenem Team in China und einem Lager in Deutschland. Wer hinter ecomet steht und wie wir arbeiten.",
};

/**
 * ⚠ OFFEN: Namen, Fotos und die Zahl der Mitarbeiter fehlen bewusst.
 * Der Master Brief nennt fünf Partner, ist aber vom Frühjahr und in weiten
 * Teilen überholt. Erfundene Angaben über Menschen gehen nicht.
 * Kevin liefert: wer im Team genannt werden soll, mit Foto und Rolle.
 */
export default function UeberUns() {
  return (
    <Rahmen>
      <SeitenKopf
        ueber="Über uns"
        titel={
          <>
            Deutsch geführt, <span className="accent">nah an der Ware</span>
          </>
        }
        satz="ecomet ist aus dem eigenen Onlinehandel entstanden. Wir haben selbst verkauft, selbst importiert und selbst erlebt, woran es hängt."
      />

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="zwei">
            <div className="fx">
              <h2>Warum es uns gibt</h2>
              <p>
                Wer in Deutschland einen Shop betreibt und aus China einkauft,
                kennt das: Der Lieferant antwortet auf Englisch und nachts, die
                Lieferzeit ist Glückssache, und wenn ein Paket verschwindet,
                erklärt es dir niemand.
              </p>
              <p>
                Wir haben zuerst für uns selbst gelöst, was uns gestört hat, und
                daraus ist ecomet geworden. Heute machen wir es für andere Shops
                mit: Einkauf, Prüfung, Lager und Versand, an einer Stelle und auf
                Deutsch.
              </p>
            </div>
            <div className="fx" data-d="1">
              <h2>Wie wir arbeiten</h2>
              <p>
                Wir sind kein Vermittler, der eine Anfrage weiterleitet. Unser
                Team in China nimmt die Ware in die Hand, unser Lager in
                Deutschland packt und verschickt. Du redest immer mit uns, nicht
                mit einer Kette von Zwischenstellen.
              </p>
              <p>
                Was eine Bestellung kostet, sagen wir vorher. Was nicht geht,
                sagen wir auch.
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
                <span>Zwei Standorte</span>
              </span>
              , eine Verantwortung
            </h2>
          </div>
          <div className="pick">
            <div className="pick-card fx" data-d="1" style={{ cursor: "default" }}>
              <h3>Deutschland</h3>
              <p>
                Lager, Versand und Retouren. Hier sitzt auch, wer dir schreibt und
                wer deine Rechnung stellt.
              </p>
            </div>
            <div className="pick-card alt fx" data-d="2" style={{ cursor: "default" }}>
              <h3>China</h3>
              <p>
                Einkauf, Qualitätskontrolle und Versand direkt an deine Kunden.
                Eigenes Team vor Ort, keine reine Weiterleitung.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="claim fx" style={{ textAlign: "center" }}>
            <h3>Am schnellsten lernst du uns im Gespräch kennen.</h3>
            <p>Zehn Minuten reichen, um zu sehen, ob wir zu deinem Shop passen.</p>
            <div style={{ marginTop: 24 }}>
              <span className="glass-wrap">
                <Link href="/kontakt" className="glass-btn">
                  <span className="glass-txt">Gespräch anfragen</span>
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
