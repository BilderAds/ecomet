"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Anmelden und Passwort vergessen. Nur Oberfläche (Stand 14.10.2026):
 * die Konten baut Alex in Cloudflare. Bis das steht, sagt das Formular
 * ehrlich, dass die Anmeldung noch nicht frei ist, statt so zu tun als ob.
 * Wer die Anbindung baut, ersetzt `abschicken`.
 */
export function AnmeldeFormular({ art }: { art: "anmelden" | "vergessen" }) {
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const [fehler, setFehler] = useState("");
  const [fertig, setFertig] = useState(false);

  function abschicken(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email.trim())) return setFehler("Diese E-Mail-Adresse sieht nicht richtig aus.");
    if (art === "anmelden" && !passwort) return setFehler("Trag dein Passwort ein.");
    setFehler("");
    setFertig(true);
  }

  return (
    <form className="ak-formular ak-schmal" onSubmit={abschicken} noValidate>
      <h1 className="ak-form-h">{art === "anmelden" ? "Willkommen zurück" : "Neues Passwort"}</h1>
      <p className="ak-form-p">
        {art === "anmelden"
          ? "Melde dich an und sieh deinen Check."
          : "Trag deine E-Mail ein, wir schicken dir einen Link für ein neues Passwort."}
      </p>

      {fertig && (
        <div className="formular-meldung gut">
          Die Anmeldung schalten wir gerade frei. Bis dahin bekommst du deinen Check per WhatsApp und Mail.
        </div>
      )}
      {fehler && <div className="formular-meldung schlecht">{fehler}</div>}

      <div className="feld">
        <label htmlFor="email">E-Mail</label>
        <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      {art === "anmelden" && (
        <div className="feld">
          <div className="ak-label-zeile">
            <label htmlFor="passwort">Passwort</label>
            <Link href="/passwort-vergessen">Passwort vergessen?</Link>
          </div>
          <input id="passwort" type="password" autoComplete="current-password" value={passwort} onChange={(e) => setPasswort(e.target.value)} />
        </div>
      )}
      <button className="formular-knopf" type="submit">
        {art === "anmelden" ? "Anmelden" : "Link schicken"}
      </button>
      <p className="ak-form-unten">
        {art === "anmelden" ? (
          <>Noch kein Konto? <Link href="/abzock-check/start">Check starten</Link></>
        ) : (
          <><Link href="/anmelden">Zurück zur Anmeldung</Link></>
        )}
      </p>
    </form>
  );
}
