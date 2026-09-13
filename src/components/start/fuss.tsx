import Image from "next/image";
import Link from "next/link";

const kanaele = [
  {
    name: "Instagram",
    ziel: "https://www.instagram.com/ecomet.de/",
    pfad: "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 2c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.2.8-.4.4-.6.7-.8 1.2-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.2.4.4.7.6 1.2.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.2-.8.4-.4.6-.7.8-1.2.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.2-.4-.4-.7-.6-1.2-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1zm0 3.4a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8zm0 7.2a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6zm5.6-7.4a1 1 0 1 1-2.1 0 1 1 0 0 1 2.1 0z",
  },
  {
    name: "TikTok",
    ziel: "https://www.tiktok.com/@ecomet.de",
    pfad: "M16.6 2h-3.4v13.4a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.1a6.3 6.3 0 1 0 5.4 6.3V8.6a8 8 0 0 0 4.7 1.5V6.7a4.7 4.7 0 0 1-4.7-4.7z",
  },
  {
    name: "YouTube",
    ziel: "https://www.youtube.com/@ecomet.official",
    pfad: "M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2C.5 9.1.5 12 .5 12s0 2.9.5 4.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-4.8.5-4.8s0-2.9-.5-4.8zM9.7 15.1V8.9l5.8 3.1-5.8 3.1z",
  },
];

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
            <div className="foot-social">
              {kanaele.map((k) => (
                <a key={k.name} href={k.ziel} target="_blank" rel="noopener noreferrer" aria-label={`ecomet auf ${k.name}`} title={k.name}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={k.pfad} />
                  </svg>
                </a>
              ))}
            </div>
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
