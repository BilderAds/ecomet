import { zeigen, zusagen } from "@/inhalte/zahlen";

/**
 * Die Vertrauensleiste direkt unter der Bühne.
 *
 * Sie ersetzt das Laufband „Angebunden an". Kevin am 24.08.: „das sieht
 * kacke aus, da muss was Besseres sein, etwas das Trust schafft". Und:
 * „was für angebunden an", also der Titel sagte niemandem etwas.
 *
 * Statt sechs Firmennamen stehen hier jetzt vier Zahlen, die unser
 * Lagerpartner im Vertrag zugesagt hat (§ 4.1 und § 5.6). Die kann kein
 * Wettbewerber abschreiben, und sie beantworten den Kernverdacht der
 * Zielgruppe: „alle Agenten betrügen dich."
 */
export function Vertrauen() {
  return (
    <section className="vertrauen">
      <div className="wrap-wide">
        <p className="vertrauen-ueber">Schriftlich zugesagt, nicht geworben</p>
        <div className="vertrauen-reihe">
          {zeigen(zusagen).map((z, i) => (
            <div key={z.label} className="vertrauen-punkt fx" data-d={i + 1}>
              <span className="vertrauen-wert num">{z.wert}</span>
              <span className="vertrauen-label">{z.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
