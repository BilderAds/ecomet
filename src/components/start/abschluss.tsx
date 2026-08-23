import Link from "next/link";

/**
 * Der Abschluss-Aufruf am Ende der Startseite. Fehlte komplett, der Knopf
 * stand nur oben.
 *
 * Die fünf Werktage stehen in § 5.5 des Kooperationsvertrags: nach
 * Vertragsende oder auf berechtigtes Verlangen gibt der Partner die
 * Kundenware innerhalb von fünf Werktagen heraus. Das nimmt die grösste
 * Angst der Zielgruppe: einmal drin, nie wieder raus.
 */
export function Abschluss() {
  return (
    <section className="sec abschluss">
      <div className="wrap">
        <div className="abschluss-kasten fx">
          <h2>Fang mit einer Palette an.</h2>
          <p>
            Keine Mindestmenge, kein Vertrag, keine Grundgebühr. Passt es nicht,
            steht deine Ware nach fünf Werktagen zur Abholung bereit. Das ist
            keine Kulanz, das steht im Vertrag mit unserem Lagerpartner.
          </p>
          <div className="abschluss-knoepfe">
            <Link href="/registrieren" className="abschluss-knopf">
              Konto erstellen
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/preise" className="abschluss-knopf zweit">
              Preise ansehen
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
