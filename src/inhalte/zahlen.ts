/**
 * ALLE ZAHLEN DER WEBSITE STEHEN HIER, UND ZWAR NUR HIER.
 *
 * ⚠ ACHTUNG: Alles mit `geprueft: false` ist ein PLATZHALTER und darf nicht live gehen.
 * Kevin am 23.08.2026: "nutz erstmal irgendwelche zahlen ich prüfe später auf richtigkeit".
 *
 * Regel: eine Zahl geht erst live, wenn `geprueft: true` steht UND in `quelle`
 * steht, woher sie kommt. Keine Zahl ohne Quelle. Rams 6, ehrlich sein.
 *
 * Der Wächter `npm run zahlen-pruefen` listet jede ungeprüfte Zahl auf.
 */

export type Zahl = {
  /** was auf der Seite steht */
  wert: string;
  /** die Beschriftung darunter */
  label: string;
  /** false = Platzhalter, darf nicht live */
  geprueft: boolean;
  /** woher die Zahl stammt, Pflicht sobald geprueft */
  quelle?: string;
};

/** Die drei Kennzahlen unter der Bühne auf der Startseite. */
export const buehneZahlen: Zahl[] = [
  { wert: "1 bis 2", label: "Tage bis zum Kunden", geprueft: false },
  { wert: "6,98 €", label: "je Bestellung nach DE", geprueft: true,
    quelle: "Preisliste 21.08.2026, Packsy mal 1,23 abgeschnitten" },
  { wert: "2", label: "Lager, DE und China", geprueft: false },
];

/** Die drei Zahlen im Aussage-Kasten. */
export const aussageZahlen: Zahl[] = [
  { wert: "000", label: "Bestellungen verschickt", geprueft: false },
  { wert: "00 %", label: "pünktlich zugestellt", geprueft: false },
  { wert: "0,0", label: "Tage bis zur Übergabe an den Versand", geprueft: false },
];

/** Preise, die auf der Startseite und auf /preise auftauchen. */
export const preise = {
  bestellungDe: { wert: "6,98 €", label: "Bestellung bis 400 g nach Deutschland", geprueft: true,
    quelle: "Preisliste 21.08.2026" },
  fulfillmentDe: { wert: "2,82 €", label: "Fulfillment je Bestellung", geprueft: true,
    quelle: "Preisliste 21.08.2026, Packsy 2,30 mal 1,23" },
  invoicesMonat: { wert: "20 €", label: "ecomet.invoices im Monat", geprueft: true,
    quelle: "Worker-Quelltext, Plan ecomet.invoices, 7 Tage Test, Deckel 100 €" },
  fallPreis: { wert: "0,50 €", label: "je Fall ab dem elften im Monat", geprueft: true,
    quelle: "Worker-Quelltext, dispute-bridge/usage" },
} satisfies Record<string, Zahl>;

/** Alle Zahlen zusammen, für den Wächter. */
export const alleZahlen: Zahl[] = [
  ...buehneZahlen,
  ...aussageZahlen,
  ...Object.values(preise),
];
