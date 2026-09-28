/**
 * Kundenstimmen für die laufende Trust-Sektion.
 *
 * ⚠⚠ ALLE SECHS SIND PLATZHALTER UND NICHT BELEGT. ⚠⚠
 *
 * Kevin am 24.08.2026: „digga pack die rein und schreib erstmal Testsachen
 * dahin, oder nimm die von der aktuellen ecomet Seite." Genau das ist es:
 * die sechs Stimmen stehen wortgleich auf ecometapp.de und stammen aus der
 * gelöschten `testimonials.tsx` des alten Repos. Es gibt zu keiner davon
 * einen echten Menschen, eine Quelle oder eine Freigabe.
 *
 * Ich habe dreimal darauf hingewiesen, Kevin will die Sektion trotzdem
 * gefüllt sehen. Sie steht so ohnehin schon live.
 *
 * **Vor dem Livegang der neuen Seite müssen sie raus oder ersetzt werden.**
 * Erfundene Bewertungen sind nach § 5b Abs. 3 UWG unlauter und abmahnfähig.
 * Trustpilot hat CJ Dropshipping und Sellvia genau dafür die Bewertung
 * entzogen. `npm run zahlen-pruefen` zeigt jede Stimme ohne Beleg an.
 *
 * Ersetzen heisst: eine Aussage, die ein echter Kunde wirklich gesagt hat,
 * plus seine Erlaubnis. Ein WhatsApp-Screenshot reicht als Beleg.
 * Kandidaten: Beni und Malte.
 */
export type Stimme = {
  /** was gesagt wurde */
  text: string;
  /** wer */
  name: string;
  /** was er macht */
  rolle: string;
  /** wo es dokumentiert ist, plus Freigabe. Leer = Platzhalter. */
  beleg: string;
};

/**
 * Kevin am 29.09.2026: „nimm bitte mal die fake Bewertungen raus".
 * Die sechs Platzhalter von ecometapp.de (Keanu Fuchs, Lisa Janzen, Daniel
 * Bergmann, Daniel Waimer, Franzi Schneider, Tobias Beyer) sind raus, der
 * Wortlaut steht in der git-Historie. Unter vier Stimmen blendet sich die
 * Sektion von selbst aus. Neu rein nur mit echtem Kunden und `beleg`.
 */
export const stimmen: Stimme[] = [];
