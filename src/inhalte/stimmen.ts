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

export const stimmen: Stimme[] = [
  {
    text: "Ehrlich gesagt dachte ich zuerst: Wo ist der Haken? Aber es gibt keinen. Die Qualität ist top, die Preise unschlagbar und das Ganze kostenlos.",
    name: "Keanu Fuchs",
    rolle: "E-Commerce Gründer",
    beleg: "",
  },
  {
    text: "Wer einmal direkt vom Hersteller kauft, geht nie wieder zurück zu Zwischenhändlern. Beste Qualität, beste Preise.",
    name: "Lisa Janzen",
    rolle: "Dropshipping Expertin",
    beleg: "",
  },
  {
    text: "Ich dachte immer, gute Qualität hat ihren Preis. Stimmt. Aber nur, wenn man den falschen Leuten zahlt.",
    name: "Daniel Bergmann",
    rolle: "Amazon FBA Seller",
    beleg: "",
  },
  {
    text: "Klang zu gut, um wahr zu sein. Habe bestellt und war mega überrascht, wie smooth alles lief.",
    name: "Daniel Waimer",
    rolle: "Online Shop Besitzer",
    beleg: "",
  },
  {
    text: "Ich dachte immer, günstige Preise bedeuten schlechte Qualität. Nope. Die Sachen kommen direkt vom Hersteller.",
    name: "Franzi Schneider",
    rolle: "Start-up Gründerin",
    beleg: "",
  },
  {
    text: "Warum sollte ich überteuerte Zwischenhändler bezahlen, wenn ich direkt an die Quelle komme? Einfach smarteres Business.",
    name: "Tobias Beyer",
    rolle: "Brand Owner",
    beleg: "",
  },
];
