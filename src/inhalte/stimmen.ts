/**
 * Kundenstimmen für die laufende Trust-Sektion.
 *
 * ⚠ ES GIBT NOCH KEINE. Diese Liste ist absichtlich leer.
 *
 * Auf ecometapp.de stehen heute sechs Stimmen mit vollen Namen (Keanu Fuchs,
 * Lisa Janzen, Daniel Bergmann, Daniel Waimer, Franzi Schneider, Tobias
 * Beyer). Sie sind frei erfunden, die Quelldatei lag im alten Repo. Erfundene
 * Bewertungen sind nach § 5b Abs. 3 UWG unlauter und abmahnfähig, und
 * Trustpilot hat CJ Dropshipping und Sellvia genau dafür die Bewertung
 * entzogen.
 *
 * Was hier rein darf: eine Aussage, die ein echter Kunde wirklich gesagt hat
 * und deren Verwendung er erlaubt hat. Ein Screenshot aus WhatsApp reicht als
 * Beleg. Kandidaten wären Beni und Malte.
 *
 * Sobald hier Einträge stehen, erscheint die Sektion von selbst.
 */
export type Stimme = {
  /** was der Kunde gesagt hat, wörtlich */
  text: string;
  /** wer es gesagt hat */
  name: string;
  /** was er macht */
  rolle: string;
  /** wo es dokumentiert ist, plus die Erlaubnis */
  beleg: string;
};

export const stimmen: Stimme[] = [];
