"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { CALL_AB, INVOICE_LINK, TERMIN_LINK, pakete } from "@/inhalte/abzock-check";

type Check = { vorname: string; bestellungen: string };

const abonnieren = () => () => {};
function lesen() {
  try {
    // Vorschau ohne Formular: /konto?vorschau=10 (ab 10 Bestellungen) oder ?vorschau=1 (darunter)
    const vorschau = new URLSearchParams(location.search).get("vorschau");
    if (vorschau) return JSON.stringify({ vorname: "Kevin", bestellungen: vorschau === "1" ? "1 bis 9" : "10 bis 29" });
    return sessionStorage.getItem("ecomet-check") ?? "";
  } catch {
    return "";
  }
}

/**
 * Der Kontobereich direkt nach dem Abzock-Check (Danke-Seite der Bauvorlage).
 * Solange es kein echtes Konto gibt (Alex, Cloudflare), kommt der Inhalt aus
 * sessionStorage, den das Formular nach dem Absenden setzt. Ohne das sieht
 * man den Zustand „nicht angemeldet".
 */
export function KontoAnsicht() {
  // null auf dem Server und beim ersten Zeichnen, "" wenn nichts gespeichert ist.
  const roh = useSyncExternalStore(abonnieren, lesen, () => null);
  const check = useMemo<Check | null | undefined>(() => {
    if (roh === null) return undefined;
    try {
      return roh ? (JSON.parse(roh) as Check) : null;
    } catch {
      return null;
    }
  }, [roh]);

  if (check === undefined) return <div className="ak-konto" aria-busy="true" />;

  if (check === null) {
    return (
      <div className="ak-konto ak-leer">
        <h1>Dein ecomet-Konto</h1>
        <p>Melde dich an, um deinen Check zu sehen.</p>
        <div className="ak-knoepfe ak-mitte">
          <Link href="/anmelden" className="ak-knopf">Anmelden</Link>
          <Link href="/abzock-check" className="ak-knopf-zweit">Noch kein Check? Jetzt starten</Link>
        </div>
      </div>
    );
  }

  const mitCall = CALL_AB.includes(check.bestellungen);

  return (
    <div className="ak-konto">
      <h1>
        Dein Check <span className="accent">läuft.</span>
      </h1>
      <p className="ak-konto-satz">
        {check.vorname ? `${check.vorname}, i` : "I"}n spätestens 24 Stunden liegt dein Ergebnis hier. Wir schreiben dir per WhatsApp.
      </p>

      <div className="ak-status">
        <div className="ak-vorschau-kopf">
          <span>Dein Abzock-Check</span>
          <span className="ak-vorschau-zeit">in Arbeit</span>
        </div>
        <ul>
          {pakete.map((p) => (
            <li key={p.titel}>
              <i />
              {p.titel.replace(/\.$/, "")}
            </li>
          ))}
        </ul>
      </div>

      {mitCall ? (
        <div className="ak-karte ak-karte-haupt">
          <h2>Buch dir jetzt deinen Termin</h2>
          <p>Im Call geht Fabio, Kevin oder Alex dein Ergebnis mit dir durch.</p>
          <a href={TERMIN_LINK} className="ak-knopf">Termin anfragen</a>
        </div>
      ) : (
        <p className="ak-konto-hinweis">Dein Kurz-Check kommt automatisch in dein Konto.</p>
      )}

      <div className="ak-karte">
        <h2>Sieh deine PayPal- und Klarna-Fälle sofort</h2>
        <p>Mit ecomet.invoice siehst du jeden offenen Fall mit seiner Frist in einer Liste. 7 Tage kostenlos.</p>
        <a href={INVOICE_LINK} target="_blank" rel="noopener noreferrer" className={mitCall ? "ak-knopf-zweit" : "ak-knopf"}>
          ecomet.invoice installieren
        </a>
      </div>
    </div>
  );
}
