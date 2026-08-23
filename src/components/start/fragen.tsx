import { preise } from "@/inhalte/zahlen";

const fragen = [
  {
    frage: "Was kostet das?",
    antwort: `Du zahlst pro Bestellung, nicht monatlich. Eine Bestellung bis 400 Gramm nach Deutschland kostet ${preise.bestellungDe.wert}, Verpackung und Porto sind darin enthalten. Für China nennen wir dir den Preis, bevor du bestellst.`,
  },
  {
    frage: "Muss ich Ware auf Vorrat kaufen?",
    antwort:
      "Nein. Beim Import aus China schicken wir jedes Paket einzeln los, sobald dein Kunde bestellt. Für das deutsche Lager brauchst du Ware vor Ort, dafür ist sie in ein bis zwei Werktagen beim Kunden.",
  },
  {
    frage: "Sieht mein Kunde, dass die Ware aus China kommt?",
    antwort:
      "Nein. Es liegt keine Rechnung und kein fremder Zettel im Paket. Auf Wunsch kommt deine eigene Verpackung und deine eigene Beilage rein.",
  },
  {
    frage: "Brauche ich ein zweites Konto beim Lager?",
    antwort:
      "Nein. Du meldest dich bei ecomet an, sonst nirgends. Alles läuft über dieses eine Konto.",
  },
  {
    frage: "Wie lange dauert die Einrichtung?",
    antwort:
      "Einen Tag. App installieren, Shop verbinden, Lager wählen. Danach läuft es von selbst.",
  },
  {
    frage: "Was passiert bei einer Retoure?",
    antwort:
      "Die Rücksendung geht an unser deutsches Lager, nicht nach China. Wir sehen sie durch und legen einwandfreie Ware wieder ein.",
  },
];

export function Fragen() {
  return (
    <section className="sec faq-sec" id="fragen">
      <div className="wrap">
        <div className="sec-head fx">
          <h2 className="sec-h2">Häufige Fragen</h2>
          <p className="sec-p">
            Steht deine Frage nicht dabei, schreib uns. Wir antworten am selben Werktag.
          </p>
        </div>
        <div className="faq">
          {fragen.map((f, i) => (
            <div key={f.frage} className={`faq-item fx${i === 0 ? " open" : ""}`} data-d={(i % 3) + 1}>
              <button className="faq-q">
                {f.frage}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
  );
}
