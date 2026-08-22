/**
 * Laufband unter der Bühne. Bewusst KEINE Kundenlogos, die haben wir nicht
 * und erfundene wären eine Lüge. Stattdessen die Systeme, an die wir wirklich
 * angebunden sind. Jedes einzeln belegt:
 *   Shopify   – unsere App liegt im Shopify App Store
 *   DHL       – Versand aus dem deutschen Lager
 *   YunExpress– Trackingnummern aus China, belegt im Partner-Chat 21.07.
 *   PayPal    – ecomet.dispute
 *   Klarna    – ecomet.dispute
 *   Lexware   – ecomet.invoices
 */
const systeme = ["Shopify", "DHL", "YunExpress", "PayPal", "Klarna", "Lexware"];

export function Partner() {
  return (
    <section className="logos">
      <h3 className="logos-h">Angebunden an</h3>
      <div className="logos-mask">
        <div className="logos-track">
          {[...systeme, ...systeme].map((name, i) => (
            <div key={`${name}-${i}`}>{name}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
