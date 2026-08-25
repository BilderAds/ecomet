/**
 * Kundenstimmen für die laufende Trust-Sektion.
 *
 * ⚠⚠ STAND 25.08.2026: DIE LISTE IST LEER, UND ZWAR ABSICHTLICH. ⚠⚠
 *
 * Bis heute standen hier sechs erfundene Personen (Keanu Fuchs, Lisa Janzen,
 * Daniel Bergmann, Daniel Waimer, Franzi Schneider, Tobias Beyer). Sie kamen
 * wortgleich von ecometapp.de und aus der gelöschten `testimonials.tsx` des
 * alten Repos. Zu keiner gibt es einen echten Menschen, eine Quelle oder eine
 * Freigabe.
 *
 * Warum sie am 25.08. rausgeflogen sind: an diesem Tag hat Alex das DNS von
 * `e-comet.de` auf unser Vercel-Projekt gestellt, und das TLS-Zertifikat kam
 * dazu. Damit ist die Seite ÖFFENTLICH. Die Übergabe vom 24.08. hatte genau
 * das als Bedingung festgehalten: „Sobald die Domain zeigt, ist die Seite
 * öffentlich. Vorher müssen die erfundenen Stimmen und das Impressum weg."
 *
 * Dazu der harte Gegenbeleg vom 25.08.: die ecomet-App IM Shopify App Store
 * (apps.shopify.com/ecomet, Entwickler Alexander Günter) steht dort auf
 * **Rating 0,0 bei 0 Reviews**. Es gibt also nachweislich keine einzige
 * öffentliche Bewertung, während die Seite „1.475+ Empfehlungen" behauptete.
 *
 * Erfundene Bewertungen sind nach § 5b Abs. 3 UWG unlauter und abmahnfähig.
 * Trustpilot hat CJ Dropshipping und Sellvia genau dafür die Bewertung
 * entzogen. `npm run zahlen-pruefen` zeigt jede Stimme ohne Beleg an.
 *
 * SO KOMMEN ECHTE STIMMEN REIN: eine Aussage, die ein echter Kunde wirklich
 * gesagt hat, plus seine Erlaubsnis, plus `beleg` ausgefüllt. Ein
 * WhatsApp-Screenshot reicht als Beleg. Kandidaten: Beni und Malte.
 * Ab vier belegten Stimmen schaltet sich das Laufband von selbst wieder ein,
 * an `stimmen.tsx` muss dafür nichts geändert werden.
 */
export type Stimme = {
  /** was gesagt wurde */
  text: string;
  /** wer */
  name: string;
  /** was er macht */
  rolle: string;
  /** wo es dokumentiert ist, plus Freigabe. Leer = Platzhalter, fliegt raus. */
  beleg: string;
};

/**
 * Nur belegte Stimmen gehören hier rein. Eine Stimme mit leerem `beleg`
 * wird von `stimmen.tsx` gar nicht erst angezeigt.
 */
export const stimmen: Stimme[] = [];

/** Was wirklich angezeigt werden darf: alles mit Beleg. */
export const belegteStimmen = () => stimmen.filter((s) => s.beleg.trim() !== "");
