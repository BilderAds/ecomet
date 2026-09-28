/**
 * Einstandspreis für einen Import aus China, frei deutschem Lager.
 *
 * Kevin am 28.09.2026: „so ein Import-Rechner für ecomet, genau so wie Bertil
 * auf seiner Seite hat". Die Rechenlogik und alle Pauschalen stammen aus Bertils
 * Rechner im Kundenportal von mrchinasupply.de (Datei `ImportRechner`, am
 * 28.09.2026 aus dem ausgelieferten Code gelesen). Gegenprobe Fracht: Drewry
 * World Container Index, Shanghai–Rotterdam 40′ am 24.09.2026 = 3.485 USD.
 *
 * Was Bertils Rechner NICHT hat und hier dazukommt: der Antidumpingzoll als
 * eigenes Feld. Bei Alufolie in Rollen aus China sind das 14,2 bis 35,6 %
 * (VO (EU) 2025/1720, je nach Hersteller), und daran
 * hängt die Marge mehr als an allem anderen.
 *
 * Alle Werte sind Richtwerte (Stand September 2026), kein Angebot.
 */

export const STAND = "September 2026";

export type Transport = "fcl20" | "fcl40" | "fcl40hc" | "lcl" | "bahn" | "luft";

export const TRANSPORTE: { wert: Transport; label: string; dauer: string }[] = [
  { wert: "fcl20", label: "Seefracht, 20-Fuß-Container", dauer: "30 bis 40 Tage" },
  { wert: "fcl40", label: "Seefracht, 40-Fuß-Container", dauer: "30 bis 40 Tage" },
  { wert: "fcl40hc", label: "Seefracht, 40-Fuß-Container hoch", dauer: "30 bis 40 Tage" },
  { wert: "lcl", label: "Seefracht, Sammelcontainer", dauer: "35 bis 50 Tage" },
  { wert: "bahn", label: "Bahn China–Europa", dauer: "18 bis 25 Tage" },
  { wert: "luft", label: "Luftfracht", dauer: "7 bis 12 Tage" },
];

/** Fassungsvermögen laut Bertils Rechner. */
export const CONTAINER: Partial<Record<Transport, { m3: number; kg: number }>> = {
  fcl20: { m3: 33, kg: 21700 },
  fcl40: { m3: 67, kg: 26500 },
  fcl40hc: { m3: 76, kg: 26300 },
};

/** Zollsätze je Warengruppe, aus Bertils Zollrechner. „Eigener Satz“ = null. */
export const WARENGRUPPEN: { label: string; satz: number | null }[] = [
  { label: "Haushalts- und Elektrokleingeräte", satz: 2.7 },
  { label: "Textilien und Bekleidung", satz: 12 },
  { label: "Schuhe und Lederwaren", satz: 11 },
  { label: "Spielzeug und Freizeit", satz: 4.7 },
  { label: "Kunststoff- und Silikonwaren", satz: 6.5 },
  { label: "Leuchten", satz: 3.7 },
  { label: "Sportgeräte", satz: 3.7 },
  { label: "Metallwaren und Werkzeuge", satz: 2.7 },
  { label: "Möbel", satz: 0 },
  { label: "Elektronik und Computerteile", satz: 0 },
  { label: "Eigener Satz", satz: null },
];

export type Eingabe = {
  stueckpreis: number; // € je Stück ab Werk
  stueck: number;
  gewichtKg: number; // gesamt
  volumenM3: number; // gesamt
  transport: Transport;
  zollProzent: number;
  antidumpingProzent: number;
};

export type Ergebnis = {
  ware: number;
  fracht: number;
  nebenkosten: number;
  zoll: number;
  antidumping: number;
  einstand: number; // ohne Einfuhrumsatzsteuer
  proStueck: number | null;
  eust: number; // 19 %, kommt als Vorsteuer zurück
  containerZuKlein: boolean;
  containerAuslastung: number | null; // 0..1, das Engere von Gewicht und Volumen
};

const n = (x: number) => (Number.isFinite(x) && x > 0 ? x : 0);

/** Fracht nach Bertils Pauschalen. */
export function fracht(t: Transport, kg: number, m3: number): number {
  switch (t) {
    case "fcl20":
      return 1600;
    case "fcl40":
      return 2800;
    case "fcl40hc":
      return 3100;
    case "lcl":
      return Math.max(m3 * 55, kg * 0.055) * 5.2 + 180;
    case "bahn":
      return Math.max(m3 * 85, 2200);
    case "luft":
      return Math.max(kg, m3 * 167) * 3.8;
  }
}

/** Hafen, Papiere, Verzollung, Versicherung, Lkw ins Lager. Bertils Posten. */
function nebenkosten(t: Transport, kg: number, m3: number, ware: number) {
  const fcl = t.startsWith("fcl");
  const see = fcl || t === "lcl";
  const luft = t === "luft";
  const thcAbgang = see ? (fcl ? 180 : 85) : luft ? 45 : 60;
  const thcAnkunft = see ? (fcl ? 280 : 120) : luft ? 65 : 80;
  const baf = see ? (fcl ? 350 : Math.max(m3 * 12, 80)) : 0;
  const summe =
    thcAbgang +
    thcAnkunft +
    baf +
    65 + // Papiere
    95 + // Verzollung
    ware * 0.0035 + // Versicherung
    280 + // Lkw vom Hafen ins Lager
    (see ? 50 : 0) + // Lagerrisiko im Hafen
    (luft ? Math.max(kg * 0.06, 25) : 0) + // Sicherheitszuschlag
    (t === "bahn" ? 120 : 0); // Treibstoff
  return { summe, thcAbgang, baf };
}

export function rechne(e: Eingabe): Ergebnis {
  const stueck = n(e.stueck);
  const kg = n(e.gewichtKg);
  const m3 = n(e.volumenM3);
  const ware = n(e.stueckpreis) * stueck;
  const fr = fracht(e.transport, kg, m3);
  const nk = nebenkosten(e.transport, kg, m3, ware);
  // Zollwert wie bei Bertil: Ware + Fracht + Kosten bis zur EU-Grenze
  const zollwert = ware + fr + nk.thcAbgang + nk.baf;
  const zoll = zollwert * (n(e.zollProzent) / 100);
  const antidumping = zollwert * (n(e.antidumpingProzent) / 100);
  const eust = (zollwert + zoll + antidumping) * 0.19;
  const einstand = ware + fr + nk.summe + zoll + antidumping;
  const c = CONTAINER[e.transport];
  const auslastung = c ? Math.max(kg / c.kg, m3 / c.m3) : null;
  return {
    ware,
    fracht: fr,
    nebenkosten: nk.summe,
    zoll,
    antidumping,
    einstand,
    proStueck: stueck > 0 ? einstand / stueck : null,
    eust,
    containerZuKlein: auslastung !== null && auslastung > 1,
    containerAuslastung: auslastung,
  };
}
