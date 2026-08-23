/**
 * Die vier Schritte NEBENEINANDER, damit die ganze Sektion auf einen Blick
 * in einen Bildschirm passt. Kevin am 23.08.: "nicht nach unten sondern
 * zur Seite 1234 machen".
 *
 * Zwischen den Karten sitzt je ein kurzer Strich mit Pfeil. Der ist keine
 * Deko: er zeigt, dass die Schritte NACHEINANDER kommen. Er wächst beim
 * Einblenden von links nach rechts.
 *
 * Die Texte sind kurz gehalten, weil vier Karten nebeneinander nur so viel
 * Platz haben. Was hier nicht reinpasst, gehört auf eine Unterseite.
 */
const schritte = [
  {
    titel: "App installieren",
    text: "Ein Klick in deinem Shopify-Shop. Kein Vertrag, keine Einrichtungsgebühr.",
  },
  {
    titel: "Shop verbinden",
    text: "Produkte und Bestellungen kommen automatisch bei uns an.",
  },
  {
    titel: "Lager wählen",
    text: "China läuft direkt in der App. Fürs deutsche Lager sprichst du einmal mit deinem Lagerpartner.",
  },
  {
    titel: "Fertig, es läuft",
    text: "Wir packen und verschicken. Die Sendungsnummer geht in deinen Shop.",
  },
];

const Pfeil = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export function Ablauf() {
  return (
    <section className="sec" id="ablauf">
      <div className="wrap">
        <div className="sec-head fx">
          <h2 className="sec-h2">
            <span className="mark glow">
              <span>In vier Schritten</span>
            </span>{" "}
            angeschlossen
          </h2>
          <p className="sec-p">Ohne Vertrag, ohne Einrichtungsgebühr, ohne Mindestmenge.</p>
        </div>

        <div className="schritte fx" data-d="1">
          {schritte.map((s, i) => (
            <div className="schritt-zelle" key={s.titel}>
              <div className="schritt-karte">
                <span className="schritt-n num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.titel}</h3>
                <p>{s.text}</p>
              </div>
              {i < schritte.length - 1 && (
                <div className="schritt-weg" aria-hidden="true">
                  <i />
                  <Pfeil />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
