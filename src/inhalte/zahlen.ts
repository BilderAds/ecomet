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
  /**
   * GEPARKT: die Zahl steht absichtlich hier, wird aber nirgends angezeigt.
   * Nur für ungeprüfte Zahlen gedacht, die wir nicht verlieren wollen.
   *
   * Das ist kein Freifahrtschein: `npm run zahlen-pruefen` sucht jede
   * geparkte Zahl in allen .tsx und wird ROT, sobald eine davon doch
   * irgendwo gerendert wird. Parken ohne Abschalten fliegt also auf.
   */
  geparkt?: boolean;
  /** Name der Konstante, damit der Wächter sie in den .tsx suchen kann. */
  variable?: string;
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
 *
 * ⚠ SEIT 25.08.2026 WIRD DIESE ZAHL NICHT MEHR ANGEZEIGT. Sie steht nur
 * noch hier, damit der Wächter sie im Blick behält und damit eine echte
 * Zahl später an genau dieser Stelle eingetragen werden kann.
 *
 * Der Grund für das Abschalten: am 25.08. hat Alex das DNS von `e-comet.de`
 * auf unser Vercel-Projekt gestellt, das TLS-Zertifikat kam dazu, die Seite
 * ist damit öffentlich. Und am selben Tag der harte Gegenbeleg: die
 * ecomet-App im Shopify App Store (apps.shopify.com/ecomet, Entwickler
 * Alexander Günter) steht auf **Rating 0,0 bei 0 Reviews**. Es gibt also
 * nachweislich keine einzige öffentliche Bewertung. Die Notiz vom 23.08.
 * („liegt nicht im App Store") war überholt: die App ist dort, sie hat nur
 * keine Bewertungen.
 *
 * „1.475+ Empfehlungen" über fünf Sternen war damit eine Behauptung gegen
 * die eigene Quelle. § 5b Abs. 3 UWG, abmahnfähig.
 *
 * SO KOMMT SIE ZURÜCK: echte Zahl hier eintragen, `geprueft: true`, Quelle
 * dazu (z. B. „apps.shopify.com/ecomet, abgerufen TT.MM.JJJJ"), und in
 * `buehne.tsx` in `Trust()` wieder `empfehlungen` statt `buehneTrust`
 * einsetzen. Die Sterne hängen im selben Block.
 */
export const empfehlungen: Zahl = {
  wert: "1.475+",
  label: "Empfehlungen",
  geprueft: false,
  geparkt: true,
  variable: "empfehlungen",
};

/**
 * Was seit dem 25.08.2026 an der Stelle der Bewertungszeile steht.
 * Kein Superlativ, keine Bewertung, sondern eine Zahl aus dem
 * Kooperationsvertrag. Sie ist belegt und darf deshalb live.
 *
 * Warum nicht „keine Mindestmenge, kein Vertrag": das steht drei Zeilen
 * tiefer schon im Bühnentext. Doppelt gesagt ist nichts gesagt.
 */
export const buehneTrust: Zahl = {
  wert: "500.000 €",
  label: "Warenversicherung im Lager",
  geprueft: true,
  quelle:
    "Kooperations- und White-Label-Vertrag ecomet/Packsy24, § 5.6: Waren- " +
    "und Lagerversicherung mindestens 500.000 €",
};

/**
 * Die drei kurzen Belege unter dem Knopf in der Bühne.
 *
 * Kevin am 24.08.: „auch auf der alten Website sind die Punkte unten im
 * Header besser: 4-8 Tage Lieferzeit, Qualitätskontrolle, Dropshipping und
 * Lagern möglich." Er hat recht, das sind Schlagworte, keine Sätze. Drei
 * kurze Begriffe liest man im Vorbeigehen, drei Sätze nicht.
 *
 * Angepasst ist nur die Lieferzeit, weil es das deutsche Lager damals noch
 * nicht gab.
 */
export const buehneBelege: Zahl[] = [
  { wert: "", label: "1-3 Tage Lieferzeit", geprueft: true, quelle: KEVIN },
  { wert: "", label: "Qualitätskontrolle", geprueft: true,
    quelle: "eigene Prüfung vor jedem Versand, steht so auf der alten Seite seit 2026" },
  { wert: "", label: "Dropshipping und Lagern möglich", geprueft: true,
    quelle: "beide Wege sind im Angebot, China ohne Mindestmenge und deutsches Lager" },
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

/**
 * Was es kostet, NICHT zu handeln. Alle drei sind belegt, keiner ist ein
 * Werbesatz. Sie stehen im Abschnitt "Was dich das Warten kostet".
 */
export const wartenKostet: Zahl[] = [
  { wert: "3 €", label: "je Paket, seit dem 1. Juli", geprueft: true,
    quelle: "Wegfall der 150-Euro-Zollfreigrenze zum 01.07.2026, pauschal 3 € je Warenkategorie je Sendung. " +
      "zoll.de Pressemitteilung, Bundesfinanzministerium, IHK Karlsruhe, abgerufen 23.08.2026. " +
      "Beschluss ECOFIN-Rat 12.12.2025" },
  { wert: "2×", label: "jede Retoure", geprueft: true,
    quelle: "eigenes Angebot: Ware aus China geht nach China zurück, die Retoure ins deutsche Lager ist der Unterschied" },
  { wert: "200.000 €", label: "Bußgeld beim Verpackungsrecht", geprueft: true,
    quelle: "eigener Leitfaden Verpackungsrecht, Stand August 2026: „Bußgeldern bis 200.000 €“. " +
      "PPWR (EU) 2025/40 gilt seit 12.08.2026, bestätigt bei IHK Schleswig-Holstein" },
];

/** Das Rechenbeispiel im Abschnitt „Was dich das Warten kostet". */
export const zollBeispiel: Zahl = {
  wert: "3.000 €", label: "Zoll bei 1.000 Bestellungen im Monat", geprueft: true,
  quelle: "1.000 mal 3 € Pauschalzoll. Reine Multiplikation der belegten Zahl",
};

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
  ...wartenKostet,
  zollBeispiel,
  ...Object.values(preise),
];
