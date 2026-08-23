import { preise, wartenKostet, zollBeispiel } from "@/inhalte/zahlen";

/**
 * Was es kostet, NICHT zu handeln. Fehlte auf der ganzen Startseite.
 * Nach StoryBrand der stärkste Hebel, Verlustangst wirkt stärker als
 * Gewinnaussicht.
 *
 * Alle drei Punkte sind belegt, keiner ist ein Werbesatz:
 *  1. Zoll: 150-Euro-Freigrenze weg seit 01.07.2026, 3 € je Warenkategorie
 *     je Sendung. Quellen: zoll.de, Bundesfinanzministerium, IHK Karlsruhe,
 *     abgerufen 23.08.2026.
 *  2. Retouren aus China gehen nach China zurück. Steht so in unserem
 *     eigenen Angebot, die Retoure ins deutsche Lager ist der Unterschied.
 *  3. PPWR gilt seit 12.08.2026, Bußgeld bis 200.000 €. Quelle: der eigene
 *     Leitfaden Verpackungsrecht plus IHK Schleswig-Holstein.
 *
 * Bewusst NICHT drin: die Gegenrechnung "und bei uns kostet es X". Was ein
 * Sammelimport kostet, weiß bei uns niemand. Eine halbe Rechnung überzeugt
 * niemanden, der rechnet.
 */
const texte = [
  // Die Beträge kommen aus zahlen.ts, damit der Wächter sie sieht.
  `Die 150-Euro-Zollfreigrenze ist weg. Jede Sendung aus einem Drittland kostet ${wartenKostet[0].wert} je Warenkategorie. Bei 1.000 Bestellungen im Monat sind das ${zollBeispiel.wert}, jeden Monat.`,
  "Was aus China kommt und zurückgeht, geht nach China zurück. Oder du wirfst es weg und zahlst es trotzdem.",
  "Seit dem 12. August gilt die EU-Verpackungsverordnung. Anmelden kannst du nur, was du in der Hand hattest.",
];

export function Einsatz() {
  return (
    <section className="sec einsatz">
      <div className="wrap">
        <div className="sec-head fx">
          <h2 className="sec-h2">
            Was dich das{" "}
            <span className="mark glow">
              <span>Warten kostet</span>
            </span>
          </h2>
          <p className="sec-p">
            Drei Posten, die heute schon laufen. Keiner davon ist unsere Erfindung.
          </p>
        </div>

        <div className="einsatz-reihe">
          {wartenKostet.map((z, i) => (
            <div key={z.label} className="einsatz-karte fx" data-d={i + 1}>
              <span className="einsatz-wert num">{z.wert}</span>
              <h3>{z.label}</h3>
              <p>{texte[i]}</p>
            </div>
          ))}
        </div>

        <p className="einsatz-preis fx" data-d="4">
          Eine Bestellung bis 400 g nach Deutschland kostet bei uns{" "}
          <strong>{preise.bestellungDe.wert}</strong>. Alles drin, Kommissionierung,
          Verpackung, Porto. Die ganze Liste steht offen auf der Preisseite.
        </p>
      </div>
    </section>
  );
}
