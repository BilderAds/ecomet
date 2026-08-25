import { belegteStimmen } from "@/inhalte/stimmen";
import { aussageZahlen, zeigen, zusagen } from "@/inhalte/zahlen";

/**
 * Die laufende Trust-Sektion, zwei Reihen in Gegenrichtung, nach dem
 * Vorbild von bilderads.de/en (dort 48 und 56 Sekunden je Runde).
 *
 * Die Sektion hat seit dem 25.08.2026 ZWEI Zustände:
 *
 * 1. Sobald in `src/inhalte/stimmen.ts` mindestens VIER Stimmen MIT Beleg
 *    stehen, laufen die echten Kundenstimmen, genau wie vorher.
 * 2. Solange es die nicht gibt, läuft dieselbe Optik mit dem, was wir
 *    schriftlich zusagen können. Jede Zeile davon ist in `zahlen.ts` mit
 *    Quelle hinterlegt, das meiste steht im Kooperationsvertrag mit Packsy24.
 *
 * Warum: bis zum 25.08. standen hier sechs erfundene Personen. An dem Tag
 * ging die Seite über `e-comet.de` öffentlich. Erfundene Bewertungen sind
 * nach § 5b Abs. 3 UWG abmahnfähig, und die einzige echte Bewertungsquelle,
 * die ecomet hat, steht auf null: apps.shopify.com/ecomet zeigt 0,0 bei
 * 0 Reviews. Die Fläche bleibt, die Behauptung fliegt raus. Rams 6.
 *
 * Zum Zurückschalten reicht `stimmen.ts`, an dieser Datei ändert sich nichts.
 */
export function Stimmen() {
  const echte = belegteStimmen();

  if (echte.length >= 4) {
    const haelfte = Math.ceil(echte.length / 2);
    const reihen = [echte.slice(0, haelfte), echte.slice(haelfte)];

    return (
      <section className="sec stimmen">
        <div className="wrap">
          <div className="sec-head fx">
            <h2 className="sec-h2">Was unsere Kunden sagen</h2>
          </div>
        </div>
        {reihen.map((reihe, r) => (
          <div className="stimmen-band" key={r}>
            <div className={`stimmen-lauf ${r === 0 ? "links" : "rechts"}`}>
              {[...reihe, ...reihe].map((s, i) => (
                <figure className="stimme" key={`${s.name}-${i}`}>
                  <div className="stimme-sterne" aria-hidden="true">
                    {[...Array(5)].map((_, n) => (
                      <span key={n}>&#9733;</span>
                    ))}
                  </div>
                  <blockquote>„{s.text}"</blockquote>
                  <figcaption>
                    <span className="stimme-kreis">{s.name.charAt(0)}</span>
                    <span>
                      <strong>{s.name}</strong>
                      <em>{s.rolle}</em>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </section>
    );
  }

  // Kein Beleg für eine einzige Stimme: dieselbe Fläche, nur mit Zusagen,
  // die schriftlich vereinbart sind.
  const belege = [...zeigen(zusagen), ...zeigen(aussageZahlen)];
  if (belege.length < 4) return null;

  const haelfte = Math.ceil(belege.length / 2);
  const reihen = [belege.slice(0, haelfte), belege.slice(haelfte)];

  return (
    <section className="sec stimmen">
      <div className="wrap">
        <div className="sec-head fx">
          <h2 className="sec-h2">Was wir dir schriftlich zusagen</h2>
        </div>
      </div>
      {reihen.map((reihe, r) => (
        <div className="stimmen-band" key={r}>
          <div className={`stimmen-lauf ${r === 0 ? "links" : "rechts"}`}>
            {[...reihe, ...reihe].map((b, i) => (
              <figure className="stimme" key={`${b.label}-${i}`}>
                <div className="text-ecomet text-[1.75rem] font-semibold leading-none tracking-[-0.02em] tabular-nums mb-3.5">
                  {b.wert}
                </div>
                <blockquote className="!mb-0">{b.label}</blockquote>
              </figure>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
