import Image from "next/image";
import Link from "next/link";

const apps = [
  {
    name: "die ecomet App",
    ziel: "/apps/dashboard",
    satz: "Bestellungen, Produkte, Anfragen und dein Rohertrag. Alles in einem Fenster.",
    bild: "/apps/dashboard-uebersicht.png",
    breite: 1440,
    hoehe: 1700,
  },
  {
    name: "ecomet.invoices",
    ziel: "/apps/invoices",
    satz: "Rechnung und Gutschrift entstehen von selbst, sobald eine Bestellung bezahlt ist.",
    bild: "/apps/invoices-uebersicht.png",
    breite: 2880,
    hoehe: 1800,
  },
  {
    name: "ecomet.dispute",
    ziel: "/apps/faelle",
    satz: "PayPal- und Klarna-Fälle an einem Ort, mit den Belegen, die dazugehören.",
    bild: "/apps/dispute-uebersicht.png",
    breite: 1425,
    hoehe: 2595,
  },
];

export function Apps() {
  return (
    <section className="sec" id="apps">
      <div className="wrap">
        <div className="sec-head fx">
          <span className="eyebrow">
            <span className="dot" /> Im Konto enthalten
          </span>
          <h2 className="sec-h2">Drei Apps, ein Login</h2>
          <p className="sec-p">
            Keine zweite Anmeldung, keine dritte Rechnung. Du klickst links um.
          </p>
        </div>

        <div className="app-raster">
          {apps.map((a, i) => (
            <Link key={a.name} href={a.ziel} className="app-karte fx" data-d={i + 1}>
              <div className="app-bild">
                <Image
                  src={a.bild}
                  alt={`Bildschirm aus ${a.name}`}
                  width={a.breite}
                  height={a.hoehe}
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
              </div>
              <h3>{a.name}</h3>
              <p>{a.satz}</p>
              <div className="pick-go">
                <span>Ansehen</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
