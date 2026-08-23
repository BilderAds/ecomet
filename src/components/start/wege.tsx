import Link from "next/link";

/**
 * Die Weiche. Der wichtigste neue Block der Startseite: heute findet ein
 * Händler, der ein deutsches Lager sucht, auf der ganzen Seite kein Wort dazu.
 */
export function Wege() {
  return (
    <section className="sec" id="wege">
      <div className="wrap">
        <div className="sec-head fx">
          <h2 className="sec-h2">
            <span className="mark">
              <span>Zwei Wege</span>
            </span>{" "}
            zu deiner Ware
          </h2>
          <p className="sec-p">
            Beide laufen über dasselbe Konto. Du kannst auch beide gleichzeitig nutzen.
          </p>
        </div>

        <div className="pick">
          <Link href="/fulfillment/deutschland" className="pick-card fx" data-d="1">
            <div className="pick-top">
              <div className="pick-ico">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 20V8l8-5 8 5v12" />
                  <path d="M9 20v-6h6v6" />
                </svg>
              </div>
              <div className="pick-meta">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                <span>1 bis 2 Werktage</span>
              </div>
            </div>
            <h3>Lager in Deutschland</h3>
            <p>
              Deine Ware liegt hier, der Versand geht täglich raus. Mit deutscher
              Rechnung und deutschem Ansprechpartner.
            </p>
            <div className="pick-go">
              <span>Ansehen</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </div>
          </Link>

          <Link href="/fulfillment/china" className="pick-card alt fx" data-d="2">
            <span className="badge">Ohne Mindestmenge</span>
            <div className="pick-top">
              <div className="pick-ico">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z" />
                </svg>
              </div>
              <div className="pick-meta">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                <span>4 bis 8 Tage</span>
              </div>
            </div>
            <h3>Import aus China</h3>
            <p>
              Wir suchen das Produkt, prüfen die Qualität und verschicken direkt an
              deinen Kunden. Du kaufst nichts auf Vorrat.
            </p>
            <div className="pick-go">
              <span>Ansehen</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
