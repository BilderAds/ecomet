import type { ReactNode } from "react";

type Leistung = { tag: string; titel: string; text: string; symbol: ReactNode };

const leistungen: Leistung[] = [
  {
    tag: "Einkauf",
    titel: "Wir finden dein Produkt",
    text: "Du schickst uns einen Link oder ein Bild. Wir suchen den Hersteller und nennen dir einen Preis.",
    symbol: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    ),
  },
  {
    tag: "Prüfung",
    titel: "Jedes Paket wird angesehen",
    text: "Bevor etwas rausgeht, prüfen wir die Ware. Was nicht passt, geht nicht zu deinem Kunden.",
    symbol: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
  },
  {
    tag: "Lager",
    titel: "Platz in Deutschland",
    text: "Deine Ware liegt hier, der Versand geht täglich raus. Abgerechnet wird nach Palette, nicht nach Vertrag.",
    symbol: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20V8l8-5 8 5v12" />
        <path d="M9 20v-6h6v6" />
      </svg>
    ),
  },
  {
    tag: "Marke",
    titel: "Dein Name auf dem Karton",
    text: "Eigene Verpackung, eigene Beilage, eigenes Etikett. Der Kunde sieht deine Marke, nicht unsere.",
    symbol: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path d="M3 8l2-4h14l2 4M12 4v17" />
      </svg>
    ),
  },
  {
    tag: "Rücksendung",
    titel: "Retouren gehen an uns",
    text: "Deine Kunden schicken nach Deutschland zurück, nicht nach China. Wir prüfen und lagern wieder ein.",
    symbol: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 4v5h5" />
      </svg>
    ),
  },
  {
    tag: "Papierkram",
    titel: "Rechnung und Fälle",
    text: "Rechnungen und Gutschriften entstehen von selbst. PayPal- und Klarna-Fälle bearbeiten wir mit dir.",
    symbol: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2h9l5 5v15H6z" />
        <path d="M15 2v5h5M9 13h6M9 17h6" />
      </svg>
    ),
  },
];

export function Leistungen() {
  return (
    <section className="sec" id="leistungen">
      <div className="wrap">
        <div className="sec-head fx">
          <h2 className="sec-h2">Was wir übernehmen</h2>
          <p className="sec-p">
            Alles, was zwischen deinem Produkt und deinem Kunden passiert.
          </p>
        </div>
        <div className="svc">
          {leistungen.map((l, i) => (
            <div key={l.titel} className="svc-card fx" data-d={(i % 3) + 1}>
              <div className="svc-ico">{l.symbol}</div>
              <span className="svc-tag">{l.tag}</span>
              <h3>{l.titel}</h3>
              <p>{l.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
