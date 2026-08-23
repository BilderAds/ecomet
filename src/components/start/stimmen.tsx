import { stimmen } from "@/inhalte/stimmen";

/**
 * Die laufende Trust-Sektion, zwei Reihen in Gegenrichtung, nach dem
 * Vorbild von bilderads.de/en (dort 48 und 56 Sekunden je Runde).
 *
 * ⚠ Sie erscheint NUR, wenn in `src/inhalte/stimmen.ts` echte, freigegebene
 * Kundenstimmen stehen. Heute ist die Liste leer, also rendert die Sektion
 * nichts. Kein Platzhalter, keine erfundenen Namen.
 *
 * Sobald Kevin echte Stimmen liefert: in `stimmen.ts` eintragen, fertig.
 * An dieser Datei muss dann nichts geändert werden.
 */
export function Stimmen() {
  if (stimmen.length < 4) return null;

  const haelfte = Math.ceil(stimmen.length / 2);
  const reihen = [stimmen.slice(0, haelfte), stimmen.slice(haelfte)];

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
