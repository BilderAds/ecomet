"use client";

import { useMemo, useSyncExternalStore } from "react";
import Image from "next/image";
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

export function KontoAnsicht({ etikett = true }: { etikett?: boolean }) {
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

  // Kevin 14.10.: „zu clumsy, zu viel Text, Bleiwüste". Nur noch: Ziel, Video, Zahl, 3 kurze Schritte.
  return (
    <div className="ak-danke">
      <div className="ak-danke-kopf">
        <Haken />
        <h1>Dein Check läuft.</h1>
        {mitCall ? (
          <>
            <p>Buch dir jetzt deinen Termin.</p>
            <a href={TERMIN_LINK} className="ak-knopf ak-knopf-gross ak-knopf-voll">Termin anfragen →</a>
          </>
        ) : (
          <>
            <p>Sieh deine PayPal- und Klarna-Fälle sofort.</p>
            <a href={INVOICE_LINK} target="_blank" rel="noopener noreferrer" className="ak-knopf ak-knopf-gross ak-knopf-voll">
              ecomet.invoice testen →
            </a>
          </>
        )}
        <p className="ak-klein">Ergebnis in 24 Stunden per WhatsApp.</p>
      </div>

      {/* Vertrauen wie auf der Landingpage. Stimmen sind ausgedacht: live mit Etikett (UWG § 5b). */}
      <div className="ak-beweis">
        <div className="ak-koepfe" aria-hidden="true">
          {["Lisa", "Tom", "Sarah", "Marco", "Felix"].map((k) => (
            <Image key={k} src={`/koepfe/${k}.svg`} alt="" width={36} height={36} />
          ))}
        </div>
        <p>
          <strong>127 Shops</strong> haben uns bewertet {etikett && <em className="ak-platzhalter">Platzhalter</em>}
        </p>
        <div className="ak-sterne-kasten" aria-label="5,0 von 5 Sternen">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} aria-hidden="true">★</span>
          ))}
          <b className="num">5,0</b>
        </div>
      </div>
      <div className="ak-chips">
        <span>✓ Kostenlos</span>
        <span>✓ Ohne Vertrag</span>
      </div>

      <div className="ak-danke-video" aria-label="Video von Kevin">
        <div className="ak-video-play" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
        </div>
      </div>

      {proTag ? (
        <div className="ak-danke-zahl">
          <span className="ak-rechner-zahl num">{(proTag * 365).toLocaleString("de-DE")} €</span>
          <span className="ak-rechner-satz">im Jahr, bei nur 1 € zu viel pro Stück</span>
        </div>
      ) : null}

      <ol className="ak-danke-weg">
        <li className="an"><i />Check läuft</li>
        <li><i />Ergebnis per WhatsApp</li>
        {mitCall && <li><i />Call mit Fabio, Kevin oder Alex</li>}
      </ol>
    </div>
  );
}
