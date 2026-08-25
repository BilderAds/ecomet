import { stimmen } from "@/inhalte/stimmen";

/**
 * Die laufende Trust-Sektion, zwei Reihen in Gegenrichtung, nach dem
 * Vorbild von bilderads.de/en (dort 48 und 56 Sekunden je Runde).
 *
 * ⚠ Die sechs Stimmen in `src/inhalte/stimmen.ts` sind PLATZHALTER von
 * ecometapp.de, keine davon ist belegt. Kevin will die Sektion so sehen.
 * Vor dem Livegang müssen sie ersetzt werden, `npm run zahlen-pruefen`
 * zeigt jede Stimme ohne Beleg an.
 *
 * Zum Austauschen reicht `stimmen.ts`, an dieser Datei ändert sich nichts.
 *
 * ⚠ WARUM JEDE REIHE VIERMAL STEHT (25.08.2026, von Kevin gefunden):
 *
 * Vorher lief jede Reihe zweimal und die Animation schob um `-50%`, also um
 * genau eine der beiden Hälften. Bei drei Stimmen je Reihe ist eine Hälfte
 * 3 × 420 px plus Abstände, rund 1300 px breit. Sobald das Fenster BREITER
 * ist als diese 1300 px, läuft die Reihe leer: rechts kommt nichts mehr nach,
 * und es klafft eine Lücke. Auf Kevins Bildschirm mit rund 1770 px war die
 * zweite Reihe nach „Tobias Beyer" einfach zu Ende.
 *
 * Jetzt stehen VIER Sätze und die Animation schiebt nur um `-25%`, also um
 * genau EINEN Satz. Dahinter warten immer noch drei volle Sätze, rund
 * 3900 px, das deckt auch 4K und Ultrawide. Weil ein Satz ungefähr so breit
 * ist wie früher eine Hälfte, bleibt das Tempo unverändert, an den Sekunden
 * im CSS musste nichts geändert werden.
 *
 * Die Regel dahinter, sie gilt für jedes Laufband: die Strecke, um die
 * geschoben wird, muss KLEINER sein als der Rest, der noch dahinter steht.
 * Sonst reißt es an der breitesten Stelle auf, und genau dort schaut niemand
 * nach, weil es am eigenen Laptop passt.
 */
export function Stimmen() {
  if (stimmen.length < 4) return null;

  const haelfte = Math.ceil(stimmen.length / 2);
  const reihen = [stimmen.slice(0, haelfte), stimmen.slice(haelfte)];
  /** Vier Sätze, passend zu `-25%` in `@keyframes stimmen-links/rechts`. */
  const SAETZE = 4;

  return (
    <section className="sec stimmen">
      <div className="wrap">
        <div className="sec-head fx">
          <h2 className="sec-h2">So läuft es für Shops wie deinen</h2>
        </div>
      </div>
      {reihen.map((reihe, r) => (
        <div className="stimmen-band" key={r}>
          <div className={`stimmen-lauf ${r === 0 ? "links" : "rechts"}`}>
            {Array.from({ length: SAETZE }, () => reihe).flat().map((s, i) => (
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
