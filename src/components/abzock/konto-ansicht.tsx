"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { CALL_AB, INVOICE_LINK, TERMIN_LINK, rechengroesse } from "@/inhalte/abzock-check";

/**
 * Die Danke-Seite nach dem Abzock-Check, zweite Fassung (14.10.2026) nach
 * Fabios Triolo-Danke-Seite und dem Abgleich mit Hormozi und Miller:
 * EIN Ziel je Besucher. Ab 10 Bestellungen am Tag: Termin. Darunter: ecomet.invoice.
 *
 * Solange es kein echtes Konto gibt (Alex, Cloudflare), kommen die Angaben aus
 * sessionStorage, den das Formular nach dem Absenden setzt. Vorschau ohne
 * Formular: /konto?vorschau=10 oder /konto?vorschau=1.
 */

type Check = { vorname: string; bestellungen: string; preis?: string };

const abonnieren = () => () => {};
function lesen() {
  try {
    const vorschau = new URLSearchParams(location.search).get("vorschau");
    if (vorschau) {
      return JSON.stringify({ vorname: "Kevin", bestellungen: vorschau === "1" ? "1 bis 9" : "10 bis 29", preis: "8,50" });
    }
    return sessionStorage.getItem("ecomet-check") ?? "";
  } catch {
    return "";
  }
}

const Haken = () => (
  <div className="ak-danke-haken" aria-hidden="true">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  </div>
);

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

  if (check === undefined) return <div className="ak-danke" aria-busy="true" />;

  if (check === null) {
    return (
      <div className="ak-danke ak-leer">
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
  const proTag = rechengroesse[check.bestellungen];

  return (
    <div className="ak-danke">
      {/* 1. Bestätigung und das EINE Ziel */}
      <div className="ak-danke-kopf">
        <Haken />
        <h1>Dein Check läuft.</h1>
        {mitCall ? (
          <>
            <p>Buch dir direkt deinen Termin. Dort gehen wir dein Ergebnis mit dir durch.</p>
            <a href={TERMIN_LINK} className="ak-knopf ak-knopf-gross ak-knopf-voll">Termin anfragen →</a>
            <p className="ak-klein">Sonst schreiben wir dir per WhatsApp, sobald dein Check fertig ist.</p>
          </>
        ) : (
          <>
            <p>Sieh deine PayPal- und Klarna-Fälle sofort. 7 Tage kostenlos.</p>
            <a href={INVOICE_LINK} target="_blank" rel="noopener noreferrer" className="ak-knopf ak-knopf-gross ak-knopf-voll">
              ecomet.invoice installieren →
            </a>
            <p className="ak-klein">Dein Check kommt in 24 Stunden per WhatsApp.</p>
          </>
        )}
      </div>

      {/* 2. Video */}
      <div className="ak-danke-video" aria-label="Video von Kevin">
        <div className="ak-video-play" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
        </div>
      </div>

      {/* 3. Seine Zahl */}
      {proTag ? (
        <div className="ak-karte ak-danke-zahl">
          <span className="ak-danke-angaben">
            Deine Angaben: {check.bestellungen} Bestellungen am Tag{check.preis ? ` · ${check.preis} € pro Stück` : ""}
          </span>
          <span className="ak-rechner-zahl num">{(proTag * 365).toLocaleString("de-DE")} €</span>
          <span className="ak-rechner-satz">im Jahr, wenn du pro Stück nur 1 € zu viel zahlst. Beispielrechnung mit {proTag} Bestellungen am Tag.</span>
        </div>
      ) : null}

      {/* 4. Was jetzt passiert */}
      <div className="ak-karte ak-danke-schritte">
        <h2>Was jetzt passiert</h2>
        <ol>
          <li><b>1</b><span><strong>Wir prüfen deinen Preis, deinen Shop und deine Bilder.</strong></span></li>
          <li><b>2</b><span><strong>In 24 Stunden kommt dein Ergebnis per WhatsApp.</strong></span></li>
          {mitCall && (
            <li><b>3</b><span><strong>Im Call gehen Fabio, Kevin oder Alex alles mit dir durch.</strong></span></li>
          )}
        </ol>
        <p className="ak-klein">Du musst nichts vorbereiten.</p>
      </div>

      {/* 5. Einwände */}
      <div className="ak-danke-einwaende">
        {[
          ["Kostenlos.", "Kein Abo, kein Vertrag."],
          ["Du musst nicht wechseln.", "Dein Check gehört dir."],
          ["Kein Bot.", "Fabio, Kevin oder Alex."],
        ].map(([titel, zeile]) => (
          <div key={titel} className="ak-karte">
            <h3>{titel}</h3>
            <p>{zeile}</p>
          </div>
        ))}
      </div>

      <p className="ak-zusage-zeile ak-mitte">Ist dein Preis fair, sagen wir dir das.</p>

      {/* 6. Wiederholung des einen Ziels */}
      <div className="ak-mitte">
        {mitCall ? (
          <a href={TERMIN_LINK} className="ak-knopf ak-knopf-gross">Termin anfragen →</a>
        ) : (
          <a href={INVOICE_LINK} target="_blank" rel="noopener noreferrer" className="ak-knopf ak-knopf-gross">ecomet.invoice installieren →</a>
        )}
      </div>

      {mitCall && (
        <p className="ak-klein ak-mitte">
          <a href={INVOICE_LINK} target="_blank" rel="noopener noreferrer" className="ak-link-leise">
            ecomet.invoice: deine PayPal- und Klarna-Fälle in einer Liste
          </a>
        </p>
      )}
    </div>
  );
}
