/**
 * Endlos laufendes Band unter der Bühne. Bewusst KEINE Kundenlogos, die
 * haben wir nicht und erfundene wären eine Lüge. Stattdessen die Systeme,
 * an die wir wirklich angebunden sind. Jedes einzeln belegt:
 *   Shopify   – unsere App liegt im Shopify App Store
 *   DHL       – Versand aus dem deutschen Lager
 *   YunExpress– Trackingnummern aus China, belegt im Partner-Chat 21.07.
 *   PayPal    – ecomet.dispute
 *   Klarna    – ecomet.dispute
 *   Lexware   – ecomet.invoices
 *
 * Die weichen Kanten laufen über `mask-image`, NICHT über zwei Kästen in
 * der Hintergrundfarbe. Der alte Weg rechnete gegen `var(--bg)`, während
 * dahinter ein Verlauf liegt: dadurch lagen links und rechts zwei harte
 * dunkle Rechtecke auf der Seite.
 */
const systeme = ["Shopify", "DHL", "YunExpress", "PayPal", "Klarna", "Lexware"];

export function Partner() {
  return (
    <section className="logos">
      <h3 className="logos-h">Angebunden an</h3>
      <div className="logos-mask">
        <div className="logos-track">
          {[...systeme, ...systeme, ...systeme].map((name, i) => (
            <span key={`${name}-${i}`} className="logos-name">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
