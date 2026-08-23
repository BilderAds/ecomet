/**
 * ALLE ZAHLEN DER WEBSITE STEHEN HIER, UND ZWAR NUR HIER.
 *
 * ⚠ ACHTUNG: Alles mit `geprueft: false` ist ein PLATZHALTER.
 * Listen laufen über `zeigen()` und blenden Ungeprüftes aus. EINE Ausnahme
 * gibt es: die Bewertungszahl in der Bühne. Kevin will die Zeile am
 * 23.08.2026 ausdrücklich so, wie sie schon auf ecometapp.de steht. Sie wird
 * angezeigt, bleibt hier aber auf `false`, damit der Wächter weiter darauf
 * zeigt, bis es eine echte Quelle gibt.
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
const VERTRAG =
  "Kooperations- und White-Label-Vertrag ecomet/Packsy24, § 4.1 Servicelevel, Stand August 2026, " +
  "Kernen im Remstal 21.08.2026. Von Kevin am 23.08.2026 als unterschrieben bestätigt";
const KEVIN =
  "Kevin am 23.08.2026: Deutschland 1 bis 3 Tage, China 4 bis 8, Supplements 8 bis 10";
const INFOSHEET = "Packsy24 Infosheet Juli 2026, Seite 2";
const PREISLISTE = "ecomet Preisliste 21.08.2026, Packsy mal 1,23 abgeschnitten";

/**
 * Die Bewertungszeile über der Überschrift.
 * ⚠ NICHT BELEGT. Es gibt keine Bewertungsquelle: ecomet liegt nicht im
 * Shopify App Store (am 23.08.2026 gesucht, kein Eintrag) und hat kein
 * Trustpilot-Profil. Dieselbe Zahl steht seit Monaten auf ecometapp.de.
 * Erfundene Bewertungen sind nach § 5b Abs. 3 UWG abmahnfähig. Sobald eine
 * echte Zahl da ist: hier eintragen, `geprueft: true`, Quelle dazu. An der
 * Bühne muss dann nichts geändert werden.
 */
export const empfehlungen: Zahl = {
  wert: "1.475+",
  label: "Empfehlungen",
  geprueft: false,
};

/** Die drei kurzen Belege unter dem Knopf in der Bühne. */
export const buehneBelege: Zahl[] = [
  { wert: "", label: "Bis 12 Uhr bestellt, am selben Werktag versandt", geprueft: true, quelle: VERTRAG },
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
  { wert: "1 bis 3", label: "Werktage bis zum Kunden", geprueft: true, quelle: `${KEVIN}. Laufzeit DHL: ${DHL}` },
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
  { wert: "0,5 %", label: "Fehlerquote, vertraglich zugesagt", geprueft: true,
    quelle: `${VERTRAG}: „Max. 0,5 % Fehlkommissionierungen je Abrechnungsmonat“. Das Infosheet nennt „unter 1 %“, der Vertrag ist strenger` },
  { wert: "0 €", label: "Grundgebühr und Mindestmenge", geprueft: true,
    quelle: `${INFOSHEET}: „Keine Mindestmengen, keine Vertragslaufzeit, keine monatliche Grundgebühr.“` },
  { wert: "2 Werktage", label: "bis eine Retoure bearbeitet ist", geprueft: true,
    quelle: `${VERTRAG}: „Retourenbearbeitung innerhalb 2 Werktage nach Wareneingang“` },
];

/**
 * Zusagen aus dem Kooperationsvertrag mit Packsy24. Sie sind schriftlich
 * vereinbart, nicht nur Werbung aus dem Infosheet. Deshalb dürfen sie auf
 * der Seite stehen.
 */
export const zusagen: Zahl[] = [
  { wert: "12 Uhr", label: "Cutoff, danach Versand am selben Werktag", geprueft: true, quelle: VERTRAG },
  { wert: "99 %", label: "Bestandsgenauigkeit im Lager", geprueft: true,
    quelle: `${VERTRAG}: „Mind. 99 % Inventurgenauigkeit“` },
  { wert: "500.000 €", label: "Warenversicherung im Lager", geprueft: true,
    quelle: "Vertrag § 5.6: Waren- und Lagerversicherung mindestens 500.000 €" },
  { wert: "1 Mio. €", label: "Betriebshaftpflicht je Fall", geprueft: true,
    quelle: "Vertrag § 5.6: Betriebshaftpflicht mindestens 1.000.000 € je Versicherungsfall" },
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
  ...zusagen,
  ...Object.values(preise),
];
