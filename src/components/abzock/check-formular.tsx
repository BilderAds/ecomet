"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  adsOptionen,
  bestellOptionen,
  fulfillerOptionen,
} from "@/inhalte/abzock-check";

/**
 * Der Klick-Funnel des Abzock-Checks: Shop → Einkauf → Konto.
 *
 * ⚠ Das Konto ist noch NICHT echt (Stand 14.10.2026). Konten baut Alex in
 * Cloudflare. Bis dahin wird das Passwort NICHT verschickt und nirgends
 * gespeichert, nur der Lead landet über /api/abzock-check in Supabase.
 * Wer die Anbindung an Alex' Konto baut, setzt sie in `abschicken` ein.
 */

type Daten = {
  shop_url: string;
  bestellungen: string;
  produkt_url: string;
  preis: string;
  fulfiller: string;
  ads: string[];
  faelle: string;
  faelle_unbekannt: boolean;
  vorname: string;
  email: string;
  passwort: string;
  whatsapp: string;
  einwilligung: boolean;
  webseite: string;
};

const leer: Daten = {
  shop_url: "",
  bestellungen: "",
  produkt_url: "",
  preis: "",
  fulfiller: "",
  ads: [],
  faelle: "",
  faelle_unbekannt: false,
  vorname: "",
  email: "",
  passwort: "",
  whatsapp: "",
  einwilligung: false,
  webseite: "",
};

const SCHRITTE = 3;

function Fehler({ text }: { text?: string }) {
  return text ? <span className="ak-fehler">{text}</span> : null;
}

function istLink(wert: string) {
  return /^(https?:\/\/)?[^\s.]+\.[^\s]{2,}/i.test(wert.trim());
}

export function CheckFormular() {
  const router = useRouter();
  const [schritt, setSchritt] = useState(1);
  const [d, setD] = useState<Daten>(leer);
  const [fehler, setFehler] = useState<Record<string, string>>({});
  const [laeuft, setLaeuft] = useState(false);
  const [meldung, setMeldung] = useState("");

  const setze = <K extends keyof Daten>(feld: K, wert: Daten[K]) => {
    setD((alt) => ({ ...alt, [feld]: wert }));
    setFehler((alt) => ({ ...alt, [feld]: "" }));
  };

  function pruefe(s: number) {
    const f: Record<string, string> = {};
    if (s === 1) {
      if (!istLink(d.shop_url)) f.shop_url = "Trag den Link zu deinem Shop ein.";
      if (!d.bestellungen) f.bestellungen = "Wähl aus, wie viele Bestellungen du am Tag hast.";
      if (!istLink(d.produkt_url)) f.produkt_url = "Trag den Link zu deinem Hauptprodukt ein.";
    }
    if (s === 2) {
      const preis = Number(d.preis.replace(",", "."));
      if (!d.preis || !Number.isFinite(preis) || preis <= 0) f.preis = "Trag ein, was du je Stück zahlst, zum Beispiel 8,50.";
      if (!d.fulfiller) f.fulfiller = "Wähl aus, über wen dein Fulfillment läuft.";
      if (d.ads.length === 0) f.ads = "Wähl mindestens eins aus.";
      if (!d.faelle_unbekannt && (d.faelle === "" || Number(d.faelle) < 0)) f.faelle = "Trag eine Zahl ein oder wähl „weiß nicht“.";
    }
    if (s === 3) {
      if (!d.vorname.trim()) f.vorname = "Trag deinen Vornamen ein.";
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(d.email.trim())) f.email = "Diese E-Mail-Adresse sieht nicht richtig aus.";
      if (d.passwort.length < 8) f.passwort = "Mindestens 8 Zeichen.";
      if (d.whatsapp.replace(/[^\d]/g, "").length < 7) f.whatsapp = "Trag deine WhatsApp-Nummer ein.";
      if (!d.einwilligung) f.einwilligung = "Bitte bestätige die Datenschutzerklärung.";
    }
    setFehler(f);
    return Object.keys(f).length === 0;
  }

  function weiter(e: React.FormEvent) {
    e.preventDefault();
    if (!pruefe(schritt)) return;
    if (schritt < SCHRITTE) {
      setSchritt(schritt + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    abschicken();
  }

  function toggleAds(wert: string) {
    if (wert === "keine") return setze("ads", d.ads.includes("keine") ? [] : ["keine"]);
    const ohneKeine = d.ads.filter((a) => a !== "keine");
    setze("ads", ohneKeine.includes(wert) ? ohneKeine.filter((a) => a !== wert) : [...ohneKeine, wert]);
  }

  async function abschicken() {
    setLaeuft(true);
    setMeldung("");
    // Das Passwort bleibt im Browser, bis das echte Konto steht (siehe oben).
    const { passwort: _passwort, ...lead } = d;
    void _passwort;
    try {
      const antwort = await fetch("/api/abzock-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, quelle: "/abzock-check" }),
      });
      const ergebnis = await antwort.json().catch(() => ({}));
      if (!antwort.ok) {
        setMeldung(ergebnis.fehler ?? "Das hat gerade nicht geklappt. Versuch es nochmal.");
        setLaeuft(false);
        return;
      }
      try {
        sessionStorage.setItem(
          "ecomet-check",
          JSON.stringify({ vorname: d.vorname.trim(), bestellungen: d.bestellungen }),
        );
      } catch {}
      router.push("/konto");
    } catch {
      setMeldung("Keine Verbindung. Bist du online?");
      setLaeuft(false);
    }
  }

  return (
    <form className="ak-formular" onSubmit={weiter} noValidate>
      <div className="ak-fortschritt" aria-label={`Schritt ${schritt} von ${SCHRITTE}`}>
        <span className="num">Schritt {schritt} von {SCHRITTE}</span>
        <div className="ak-balken">
          <i style={{ width: `${(schritt / SCHRITTE) * 100}%` }} />
        </div>
      </div>

      {schritt === 1 && (
        <>
          <h1 className="ak-form-h">Dein Shop</h1>
          <div className="feld">
            <label htmlFor="shop_url">Shop-Link</label>
            <input id="shop_url" inputMode="url" autoComplete="url" placeholder="deinshop.de" value={d.shop_url} onChange={(e) => setze("shop_url", e.target.value)} />
            <Fehler text={fehler.shop_url} />
          </div>
          <fieldset className="feld">
            <legend>Bestellungen am Tag</legend>
            <div className="ak-wahl">
              {bestellOptionen.map((o) => (
                <button type="button" key={o} className={d.bestellungen === o ? "an" : ""} aria-pressed={d.bestellungen === o} onClick={() => setze("bestellungen", o)}>
                  {o}
                </button>
              ))}
            </div>
            <Fehler text={fehler.bestellungen} />
          </fieldset>
          <div className="feld">
            <label htmlFor="produkt_url">Link zu deinem Hauptprodukt</label>
            <input id="produkt_url" inputMode="url" placeholder="deinshop.de/products/…" value={d.produkt_url} onChange={(e) => setze("produkt_url", e.target.value)} />
            <Fehler text={fehler.produkt_url} />
          </div>
          <button className="formular-knopf" type="submit">Weiter</button>
        </>
      )}

      {schritt === 2 && (
        <>
          <h1 className="ak-form-h">Dein Einkauf</h1>
          <div className="feld">
            <label htmlFor="preis">Was zahlst du je Stück, mit Versand?</label>
            <div className="rechner-eingabe">
              <input id="preis" inputMode="decimal" placeholder="8,50" value={d.preis} onChange={(e) => setze("preis", e.target.value)} />
              <span>€</span>
            </div>
            <Fehler text={fehler.preis} />
          </div>
          <fieldset className="feld">
            <legend>Über wen läuft dein Fulfillment heute?</legend>
            <div className="ak-wahl">
              {fulfillerOptionen.map((o) => (
                <button type="button" key={o} className={d.fulfiller === o ? "an" : ""} aria-pressed={d.fulfiller === o} onClick={() => setze("fulfiller", o)}>
                  {o}
                </button>
              ))}
            </div>
            <Fehler text={fehler.fulfiller} />
          </fieldset>
          <fieldset className="feld">
            <legend>Schaltest du Ads?</legend>
            <div className="ak-wahl">
              {adsOptionen.map((o) => (
                <button type="button" key={o} className={d.ads.includes(o) ? "an" : ""} aria-pressed={d.ads.includes(o)} onClick={() => toggleAds(o)}>
                  {o}
                </button>
              ))}
            </div>
            <Fehler text={fehler.ads} />
          </fieldset>
          <div className="feld">
            <label htmlFor="faelle">PayPal- und Klarna-Fälle im Monat?</label>
            <div className="ak-zeile">
              <input id="faelle" inputMode="numeric" placeholder="z. B. 12" disabled={d.faelle_unbekannt} value={d.faelle_unbekannt ? "" : d.faelle} onChange={(e) => setze("faelle", e.target.value.replace(/[^\d]/g, ""))} />
              <div className="ak-wahl">
                <button type="button" className={d.faelle_unbekannt ? "an" : ""} aria-pressed={d.faelle_unbekannt} onClick={() => setze("faelle_unbekannt", !d.faelle_unbekannt)}>
                  weiß nicht
                </button>
              </div>
            </div>
            <Fehler text={fehler.faelle} />
          </div>
          <div className="ak-form-knoepfe">
            <button type="button" className="ak-zurueck" onClick={() => setSchritt(1)}>Zurück</button>
            <button className="formular-knopf" type="submit">Weiter zu deinem Konto</button>
          </div>
        </>
      )}

      {schritt === 3 && (
        <>
          <h1 className="ak-form-h">Dein Check wartet auf dich</h1>
          <p className="ak-form-p">Leg dein ecomet-Konto an. Dort liegt dein Ergebnis in spätestens 24 Stunden.</p>
          {meldung && <div className="formular-meldung schlecht">{meldung}</div>}
          <div className="feld">
            <label htmlFor="vorname">Vorname</label>
            <input id="vorname" autoComplete="given-name" value={d.vorname} onChange={(e) => setze("vorname", e.target.value)} />
            <Fehler text={fehler.vorname} />
          </div>
          <div className="feld">
            <label htmlFor="email">E-Mail</label>
            <input id="email" type="email" autoComplete="email" placeholder="du@deinshop.de" value={d.email} onChange={(e) => setze("email", e.target.value)} />
            <Fehler text={fehler.email} />
          </div>
          <div className="feld">
            <label htmlFor="passwort">Passwort</label>
            <input id="passwort" type="password" autoComplete="new-password" value={d.passwort} onChange={(e) => setze("passwort", e.target.value)} />
            <Fehler text={fehler.passwort} />
          </div>
          <div className="feld">
            <label htmlFor="whatsapp">WhatsApp</label>
            <input id="whatsapp" type="tel" autoComplete="tel" placeholder="+49 170 1234567" value={d.whatsapp} onChange={(e) => setze("whatsapp", e.target.value)} />
            <span className="feld-hinweis">Für die Nachricht, wenn dein Check fertig ist.</span>
            <Fehler text={fehler.whatsapp} />
          </div>
          <label className="ak-haken-feld">
            <input type="checkbox" checked={d.einwilligung} onChange={(e) => setze("einwilligung", e.target.checked)} />
            <span>
              Ich bin einverstanden, dass ecomet meine Angaben für meinen Check speichert und mich dazu kontaktiert. Mehr in der{" "}
              <Link href="/datenschutzrichtlinien" target="_blank">Datenschutzerklärung</Link>.
            </span>
          </label>
          <Fehler text={fehler.einwilligung} />

          {/* Honigtopf gegen Maschinen. Für Menschen unsichtbar. */}
          <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
            <label htmlFor="webseite">Webseite nicht ausfüllen</label>
            <input id="webseite" tabIndex={-1} autoComplete="off" value={d.webseite} onChange={(e) => setze("webseite", e.target.value)} />
          </div>

          <div className="ak-form-knoepfe">
            <button type="button" className="ak-zurueck" onClick={() => setSchritt(2)} disabled={laeuft}>Zurück</button>
            <button className="formular-knopf" type="submit" disabled={laeuft}>
              {laeuft ? "Wird angelegt …" : "Konto anlegen und Check starten"}
            </button>
          </div>
          <p className="ak-form-unten">
            Schon ein Konto? <Link href="/anmelden">Anmelden</Link>
          </p>
        </>
      )}
    </form>
  );
}
