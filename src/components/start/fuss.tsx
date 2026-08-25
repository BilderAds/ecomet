import Image from "next/image";
import Link from "next/link";

const spalten = [
  {
    titel: "Fulfillment",
    punkte: [
      { text: "Lager in Deutschland", ziel: "/fulfillment/deutschland" },
      { text: "Dropshipping aus China", ziel: "/fulfillment/china" },
      { text: "Import aus China", ziel: "/fulfillment/import" },
      { text: "Preise", ziel: "/preise" },
    ],
  },
  {
    titel: "Apps",
    punkte: [
      { text: "die ecomet App", ziel: "/apps/dashboard" },
      { text: "ecomet.invoices", ziel: "/apps/invoices" },
      { text: "ecomet.dispute", ziel: "/apps/faelle" },
    ],
  },
  {
    titel: "ecomet",
    punkte: [
      { text: "Über uns", ziel: "/ueber-uns" },
      { text: "Kontakt", ziel: "/kontakt" },
      { text: "Konto anlegen", ziel: "/registrieren" },
    ],
  },
  {
    titel: "Rechtliches",
    punkte: [
      { text: "Impressum", ziel: "/impressum" },
      { text: "Datenschutz", ziel: "/datenschutzrichtlinien" },
      { text: "Nutzungsbedingungen", ziel: "/nutzungsbedingungen" },
    ],
  },
];

export function Fuss() {
  return (
    <footer className="foot">
      <div className="wrap-wide">
        <div className="foot-grid">
          <div>
            <div className="foot-logo">
              <Image
                src="/ecomet-schrift-weiss.png"
                alt="ecomet"
                width={120}
                height={28}
                style={{ height: 22, width: "auto" }}
              />
            </div>
            <p className="foot-tag">Dein Lager. Dein Versand. Dein Name auf dem Karton.</p>
            <p className="foot-desc">
              Wir lagern, packen und verschicken für deutschsprachige Onlineshops.
              Aus dem Lager in Deutschland oder direkt aus China.
            </p>
          </div>
          {spalten.map((s) => (
            <div key={s.titel}>
              <h4>{s.titel}</h4>
              <ul>
                {s.punkte.map((p) => (
                  <li key={p.ziel}>
                    <Link href={p.ziel}>{p.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="foot-btm">© {new Date().getFullYear()} ecomet</div>
      </div>
    </footer>
  );
}

/** Die Leiste, die auf dem Handy erscheint, sobald die Bühne durch ist. */
export function MobileLeiste() {
  return (
    <div className="mbar" id="mbar">
      <div className="mbar-in">
        <Link href="/registrieren">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Konto erstellen
        </Link>
      </div>
    </div>
  );
}
