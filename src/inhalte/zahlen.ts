/**
 * ALLE ZAHLEN DER WEBSITE STEHEN HIER, UND ZWAR NUR HIER.
 *
 * ⚠ ACHTUNG: Alles mit `geprueft: false` ist ein PLATZHALTER. Solche Zahlen
 * werden auf der Seite GAR NICHT ERST ANGEZEIGT, siehe `zeigen()` unten.
 *
 * Regel: eine Zahl geht erst live, wenn `geprueft: true` steht UND in `quelle`
 * steht, woher sie kommt. Keine Zahl ohne Quelle. Rams 6, ehrlich sein.
 *
 * Der Wächter `npm run zahlen-pruefen` listet jede ungeprüfte Zahl auf und
 * findet zusätzlich jeden Geldbetrag, der an dieser Datei vorbei direkt in
 * einer Seite steht.
 */

export type Zahl = {
  /** was auf der Seite steht */
  wert: string;
  /** die Beschriftung darunter */
  label: string;
  /** false = Platzhalter, wird nicht angezeigt */
  geprueft: boolean;
  /** woher die Zahl stammt, Pflicht sobald geprueft */
  quelle?: string;
};

/** Filter für die Anzeige: was nicht geprüft ist, wird nicht gezeigt. */
export const zeigen = (zahlen: Zahl[]) => zahlen.filter((z) => z.geprueft);

/** Quellen, damit sie nicht in jeder Zeile ausgeschrieben stehen. */
const DHL =
  "dhl.de, Paket national: „In 1-2 Werktagen (i. d. R.) beim Empfänger“, abgerufen 23.08.2026";
const INFOSHEET = "Packsy24 Infosheet Juli 2026, Seite 2";
const PREISLISTE = "ecomet Preisliste 21.08.2026, Packsy mal 1,23 abgeschnitten";

/**
 * Die Bewertungszeile über der Überschrift.
 * ⚠ NICHT BELEGT, deshalb unsichtbar. Auf ecometapp.de steht dort heute
 * „1,475+ Empfehlungen“, für diese Zahl gibt es keine Quelle. Erfundene
 * Bewertungen sind nach § 5b Abs. 3 UWG abmahnfähig. Erst mit echter Zahl
 * und echter Quelle wieder einschalten.
 */
export const empfehlungen: Zahl = {
  wert: "1.475+",
  label: "Empfehlungen",
  geprueft: false,
};

/** Die drei kurzen Belege unter dem Knopf in der Bühne. */
export const buehneBelege: Zahl[] = [
  { wert: "", label: "Versand aus Deutschland, 1 bis 2 Werktage", geprueft: true, quelle: DHL },
  { wert: "", label: "Jedes Paket wird geprüft", geprueft: true,
    quelle: "eigene Qualitätskontrolle, steht so auf der alten Seite seit 2026" },
  { wert: "", label: "Lagern oder direkt verschicken", geprueft: true,
    quelle: "beide Wege sind im Angebot" },
];

/**
 * Drei Kennzahlen für einen Streifen unter der Bühne.
 * ⚠ WIRD AKTUELL NIRGENDS ANGEZEIGT. Der Streifen fiel weg, als Kevin am
 * 23.08. die alte Bühne zurückhaben wollte. Die Zahlen bleiben stehen, falls
 * er ihn wiederhaben will, behaupten aber gerade nichts auf der Seite.
 */
export const buehneZahlen: Zahl[] = [
  { wert: "1 bis 2", label: "Werktage bis zum Kunden", geprueft: true, quelle: DHL },
  { wert: "6,98 €", label: "je Bestellung nach DE", geprueft: true, quelle: PREISLISTE },
  { wert: "2", label: "Lager, DE und China", geprueft: true,
    quelle: "DE: Packsy24, Kernen im Remstal (Infosheet Juli 2026). China: Partnerlager, Meeting 21.05.2026" },
];

/**
 * Die drei Zahlen im Aussage-Kasten.
 * Vorher standen hier „000 Bestellungen“, „00 % pünktlich“ und „0,0 Tage“.
 * Das waren Platzhalter ohne jede Quelle. Jetzt stehen drei Zahlen, die im
 * Infosheet unseres Lagers wörtlich belegt sind.
 */
export const aussageZahlen: Zahl[] = [
  { wert: "unter 1 %", label: "Fehlerquote im Lager", geprueft: true,
    quelle: `${INFOSHEET}: „Fehlerquote unter 1 %. Sollte ein Fehler passieren, wird die Ware neu versendet.“` },
  { wert: "0 €", label: "Grundgebühr und Mindestmenge", geprueft: true,
    quelle: `${INFOSHEET}: „Keine Mindestmengen, keine Vertragslaufzeit, keine monatliche Grundgebühr.“` },
  { wert: "43", label: "Länder in Europa, plus weltweit", geprueft: true,
    quelle: "Packsy24 Infosheet Juli 2026, Seite 7: „Europa 43 Länder“" },
];

/** Preise. Jede Zeile, die auf der Seite auftaucht, steht hier. */
export const preise = {
  bestellungDe: { wert: "6,98 €", label: "Bestellung bis 400 g nach Deutschland", geprueft: true,
    quelle: `${PREISLISTE}: 2,82 Fulfillment plus 4,16 Kleinpaket` },
  fulfillmentDe: { wert: "2,82 €", label: "Fulfillment je Bestellung", geprueft: true,
    quelle: `${PREISLISTE}: Packsy 2,30` },
  verpackung: { wert: "0,36 €", label: "Verpackungsmaterial, wenn du keines stellst", geprueft: true,
    quelle: `${PREISLISTE}: Packsy 0,30` },
  kleinpaketDe: { wert: "4,16 €", label: "Kleinpaket bis 1 kg nach Deutschland", geprueft: true,
    quelle: `${PREISLISTE}: Packsy 3,39` },
  retoure: { wert: "3,07 €", label: "Retoure, geprüft und wieder eingelagert", geprueft: true,
    quelle: `${PREISLISTE}: Packsy 2,50, Klasse A` },
  lagerplatz: { wert: "18,45 €", label: "Lagerplatz je Palette und Monat", geprueft: true,
    quelle: `${PREISLISTE}: Packsy 15,00. Fällt nur an, wenn im Monat keine Bestellung läuft (${INFOSHEET})` },
  warenannahme: { wert: "kostenlos", label: "Warenannahme und Einlagerung", geprueft: true,
    quelle: `${INFOSHEET}: „Warenannahme & Einlagerung kostenlos“` },
  invoicesMonat: { wert: "20 €", label: "ecomet.invoices im Monat", geprueft: true,
    quelle: "Worker-Quelltext, Plan ecomet.invoices, 7 Tage Test, Deckel 100 €" },
  fallPreis: { wert: "0,50 €", label: "je Fall ab dem elften im Monat", geprueft: true,
    quelle: "Worker-Quelltext, dispute-bridge/usage" },
} satisfies Record<string, Zahl>;

/** Alle Zahlen zusammen, für den Wächter. */
export const alleZahlen: Zahl[] = [
  empfehlungen,
  ...buehneBelege,
  ...buehneZahlen,
  ...aussageZahlen,
  ...Object.values(preise),
];
