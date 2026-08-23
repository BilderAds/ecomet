const schritte = [
  {
    titel: "App installieren",
    text: "Du holst dir die ecomet App in deinem Shopify-Shop. Ein Klick, kein Vertrag, keine Einrichtungsgebühr.",
  },
  {
    titel: "Shop verbinden",
    text: "Deine Produkte und Bestellungen kommen automatisch bei uns an. Du musst nichts abtippen und nichts hochladen.",
  },
  {
    titel: "Lager wählen",
    text: "Deutschland, China oder beides. Wir sagen dir vorher, was eine Bestellung kostet.",
  },
  {
    titel: "Fertig, es läuft",
    text: "Bestellt ein Kunde, packen und verschicken wir. Die Sendungsnummer steht von selbst in deinem Shop.",
  },
];

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
        <div className="steps">
          {schritte.map((s, i) => (
            <div key={s.titel} className={`step fx${i === 0 ? " active" : ""}`} data-d={i + 1}>
              <div className="step-n num">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h3>{s.titel}</h3>
                <p>{s.text}</p>
                <div className="step-line">
                  <i />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
