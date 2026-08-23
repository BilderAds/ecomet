/**
 * Woran ecomet angebunden ist. Bewusst KEINE Kundenlogos, die haben wir
 * nicht und erfundene wären eine Lüge. Jedes System einzeln belegt:
 *   Shopify   – unsere App liegt im Shopify App Store
 *   DHL       – Versand aus dem deutschen Lager
 *   YunExpress– Trackingnummern aus China, belegt im Partner-Chat 21.07.
 *   PayPal    – ecomet.dispute
 *   Klarna    – ecomet.dispute
 *   Lexware   – ecomet.invoices
 *
 * Bis 23.08. lief das als Laufband. Das Band bewegte sich ohne Grund und
 * seine Verlaufskanten lagen als harte dunkle Kästen auf dem Verlauf des
 * Hintergrunds. Jetzt steht die Reihe still. Sechs Namen liest man ohnehin
 * auf einen Blick, dafür braucht es keine Bewegung.
 */
const systeme = ["Shopify", "DHL", "YunExpress", "PayPal", "Klarna", "Lexware"];

export function Partner() {
  return (
    <section className="logos">
      <h3 className="logos-h">Angebunden an</h3>
      <div className="logos-reihe">
        {systeme.map((name) => (
          <span key={name} className="logos-chip">
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
