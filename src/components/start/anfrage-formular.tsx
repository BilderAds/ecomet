"use client";

import { useState } from "react";

type Art = "registrierung" | "kontakt";

export function AnfrageFormular({ art, quelle }: { art: Art; quelle: string }) {
  const [zustand, setZustand] = useState<"leer" | "laeuft" | "fertig" | "fehler">("leer");
  const [meldung, setMeldung] = useState("");

  async function abschicken(ereignis: React.FormEvent<HTMLFormElement>) {
    ereignis.preventDefault();
    const formular = ereignis.currentTarget;
    const daten = Object.fromEntries(new FormData(formular).entries());
    setZustand("laeuft");
    setMeldung("");

    try {
      const antwort = await fetch("/api/anfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...daten, art, quelle }),
      });
      const ergebnis = await antwort.json();
      if (!antwort.ok) {
        setZustand("fehler");
        setMeldung(ergebnis.fehler ?? "Das hat gerade nicht geklappt.");
        return;
      }
      setZustand("fertig");
      formular.reset();
    } catch {
      setZustand("fehler");
      setMeldung("Keine Verbindung. Bist du online?");
    }
  }

  if (zustand === "fertig") {
    return (
      <div className="formular">
        <div className="formular-meldung gut">
          <strong>Angekommen.</strong>
          <br />
          Wir melden uns am selben Werktag bei dir, meistens innerhalb weniger
          Stunden. Wenn es eilig ist, schreib uns direkt an{" "}
          <a href="mailto:info@e-comet.de" style={{ color: "var(--a1)" }}>
            info@e-comet.de
          </a>
          .
        </div>
      </div>
    );
  }

  const laeuft = zustand === "laeuft";

  return (
    <form className="formular" onSubmit={abschicken}>
      {zustand === "fehler" && <div className="formular-meldung schlecht">{meldung}</div>}

      <div className="feld">
        <label htmlFor="name">Dein Name</label>
        <input id="name" name="name" required autoComplete="name" placeholder="Max Mustermann" />
      </div>

      <div className="feld">
        <label htmlFor="email">E-Mail</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="max@deinshop.de"
        />
      </div>

      <div className="feld">
        <label htmlFor="shop_url">Deine Shop-Adresse</label>
        <input
          id="shop_url"
          name="shop_url"
          placeholder="deinshop.de"
          autoComplete="url"
        />
        <span className="feld-hinweis">Damit wir uns vorher ansehen, was du verkaufst.</span>
      </div>

      {art === "registrierung" && (
        <div className="feld">
          <label htmlFor="weg">Was brauchst du?</label>
          <select id="weg" name="weg" defaultValue="unklar">
            <option value="deutschland">Lager in Deutschland</option>
            <option value="china">Import aus China</option>
            <option value="beides">Beides</option>
            <option value="unklar">Weiß ich noch nicht</option>
          </select>
        </div>
      )}

      <div className="feld">
        <label htmlFor="nachricht">
          {art === "registrierung" ? "Was verkaufst du?" : "Deine Nachricht"}
        </label>
        <textarea
          id="nachricht"
          name="nachricht"
          rows={4}
          placeholder={
            art === "registrierung"
              ? "Zum Beispiel: 20 Bestellungen am Tag, Kosmetik, 300 g je Paket."
              : "Worum geht es?"
          }
        />
      </div>

      {/* Honigtopf gegen Maschinen. Für Menschen unsichtbar. */}
      <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <label htmlFor="webseite">Webseite nicht ausfüllen</label>
        <input id="webseite" name="webseite" tabIndex={-1} autoComplete="off" />
      </div>

      <button className="formular-knopf" type="submit" disabled={laeuft}>
        {laeuft ? "Wird gesendet …" : art === "registrierung" ? "Konto anlegen lassen" : "Nachricht senden"}
      </button>

      <span className="feld-hinweis">
        Mit dem Absenden erlaubst du uns, dich zu dieser Anfrage zu kontaktieren.
        Mehr dazu in der Datenschutzerklärung.
      </span>
    </form>
  );
}
