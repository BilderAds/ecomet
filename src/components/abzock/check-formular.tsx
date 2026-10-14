"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { adsOptionen, bestellOptionen, fulfillerOptionen } from "@/inhalte/abzock-check";

/**
 * Der Klick-Funnel des Abzock-Checks, zweite Fassung (14.10.2026, Vorbild
 * Triolo /firma): eine Frage je Bildschirm, Klicks statt Tippen, nach Frage 3
 * sieht der Händler seine Zahl, erst danach kommen Links und Kontodaten.
 *
 * ⚠ Das Konto ist noch NICHT echt. Konten baut Alex in Cloudflare. Das
 * Passwort wird nicht verschickt und nirgends gespeichert, nur der Lead landet
 * über /api/abzock-check in Supabase. Die Anbindung kommt in `abschicken`.
 */

const faelleOptionen = ["0", "1 bis 5", "6 bis 20", "über 20", "weiß nicht"];

/** Untergrenze je Auswahl, für die Rechnung „mindestens". */
const untergrenze: Record<string, number> = { "1 bis 9": 1, "10 bis 29": 10, "30 bis 99": 30, "100+": 100 };

type Daten = {
  bestellungen: string;
  preis: string;
  ads: string[];
  fulfiller: string;
  faelle: string;
  shop_url: string;
  produkt_url: string;
  vorname: string;
  email: string;
  passwort: string;
  whatsapp: string;
  einwilligung: boolean;
  webseite: string;
};

const leer: Daten = {
  bestellungen: "", preis: "", ads: [], fulfiller: "", faelle: "",
  shop_url: "", produkt_url: "", vorname: "", email: "", passwort: "",
  whatsapp: "", einwilligung: false, webseite: "",
};

const SCHRITTE = 7;

const istLink = (w: string) => /^(https?:\/\/)?[^\s.]+\.[^\s]{2,}/i.test(w.trim());

function Fehler({ text }: { text?: string }) {
  return text ? <span className="ak-fehler">{text}</span> : null;
}

function Wahl({ optionen, gewaehlt, waehle }: { optionen: string[]; gewaehlt: (o: string) => boolean; waehle: (o: string) => void }) {
  return (
    <div className="ak-wahl ak-wahl-gross">
      {optionen.map((o) => (
        <button type="button" key={o} className={gewaehlt(o) ? "an" : ""} aria-pressed={gewaehlt(o)} onClick={() => waehle(o)}>
          {o}
        </button>
      ))}
    </div>
  );
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

  const geheZu = (s: number) => {
    setSchritt(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /** Ein Klick genügt: wählen und weiter. */
  const klickWeiter = <K extends "bestellungen" | "fulfiller" | "faelle">(feld: K, wert: string) => {
    setze(feld, wert);
    setTimeout(() => geheZu(schritt + 1), 180);
  };

  function pruefe(s: number) {
    const f: Record<string, string> = {};
    if (s === 2) {
      const preis = Number(d.preis.replace(",", "."));
      if (!d.preis || !Number.isFinite(preis) || preis <= 0) f.preis = "Trag ein, was du je Stück zahlst, zum Beispiel 8,50.";
    }
    if (s === 3 && d.ads.length === 0) f.ads = "Wähl mindestens eins aus.";
    if (s === 6) {
      if (!istLink(d.shop_url)) f.shop_url = "Trag den Link zu deinem Shop ein.";
      if (!istLink(d.produkt_url)) f.produkt_url = "Trag den Link zu deinem Hauptprodukt ein.";
    }
    if (s === 7) {
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
    if (schritt < SCHRITTE) return geheZu(schritt + 1);
    abschicken();
  }

  function toggleAds(wert: string) {
    if (wert === "keine") return setze("ads", d.ads.includes("keine") ? [] : ["keine"]);
    const ohne = d.ads.filter((a) => a !== "keine");
    setze("ads", ohne.includes(wert) ? ohne.filter((a) => a !== wert) : [...ohne, wert]);
  }

  async function abschicken() {
    setLaeuft(true);
    setMeldung("");
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
        sessionStorage.setItem("ecomet-check", JSON.stringify({ vorname: d.vorname.trim(), bestellungen: d.bestellungen }));
      } catch {}
      router.push("/konto");
    } catch {
      setMeldung("Keine Verbindung. Bist du online?");
      setLaeuft(false);
    }
  }

  const min = untergrenze[d.bestellungen];
  const zurueck = schritt > 1 && (
    <button type="button" className="ak-zurueck-link" onClick={() => geheZu(schritt - 1)} disabled={laeuft}>
      ← Zurück
    </button>
  );

  return (
    <form className="ak-formular" onSubmit={weiter} noValidate>
      <div className="ak-fortschritt" aria-label={`Schritt ${schritt} von ${SCHRITTE}`}>
        <div className="ak-fortschritt-zeile">
          {zurueck || <span />}
          <span className="num">{schritt} / {SCHRITTE}</span>
        </div>
        <div className="ak-balken">
          <i style={{ width: `${(schritt / SCHRITTE) * 100}%` }} />
        </div>
      </div>

      {schritt === 1 && (
        <>
          <h1 className="ak-form-h">Wie viele Bestellungen hast du am Tag?</h1>
          <Wahl optionen={bestellOptionen} gewaehlt={(o) => d.bestellungen === o} waehle={(o) => klickWeiter("bestellungen", o)} />
        </>
      )}

      {schritt === 2 && (
        <>
          <h1 className="ak-form-h">Was zahlst du je Stück, mit Versand?</h1>
          <div className="feld">
            <div className="rechner-eingabe ak-gross-eingabe">
              <input id="preis" autoFocus inputMode="decimal" placeholder="8,50" value={d.preis} onChange={(e) => setze("preis", e.target.value)} />
              <span>€</span>
            </div>
            <Fehler text={fehler.preis} />
          </div>
          <button className="formular-knopf" type="submit">Weiter</button>
        </>
      )}

      {schritt === 3 && (
        <>
          <h1 className="ak-form-h">Wo schaltest du Ads?</h1>
          <Wahl optionen={adsOptionen} gewaehlt={(o) => d.ads.includes(o)} waehle={toggleAds} />
          <Fehler text={fehler.ads} />
          <button className="formular-knopf" type="submit">Weiter</button>
        </>
      )}

      {schritt === 4 && (
        <>
          {min ? (
            <div className="ak-zwischen">
              <span className="ak-zwischen-zahl num">{(min * 365).toLocaleString("de-DE")} €</span>
              <span>
                kostet dich jeder Euro, den du pro Stück zu viel zahlst, im Jahr. Mindestens, bei {d.bestellungen} Bestellungen am Tag.
              </span>
            </div>
          ) : null}
          <h1 className="ak-form-h">Über wen läuft dein Fulfillment heute?</h1>
          <Wahl optionen={fulfillerOptionen} gewaehlt={(o) => d.fulfiller === o} waehle={(o) => klickWeiter("fulfiller", o)} />
        </>
      )}

      {schritt === 5 && (
        <>
          <h1 className="ak-form-h">Wie viele PayPal- und Klarna-Fälle hast du im Monat?</h1>
          <Wahl optionen={faelleOptionen} gewaehlt={(o) => d.faelle === o} waehle={(o) => klickWeiter("faelle", o)} />
        </>
      )}

      {schritt === 6 && (
        <>
          <h1 className="ak-form-h">Welchen Shop sehen wir uns an?</h1>
          <div className="feld">
            <label htmlFor="shop_url">Shop-Link</label>
            <input id="shop_url" autoFocus inputMode="url" autoComplete="url" placeholder="deinshop.de" value={d.shop_url} onChange={(e) => setze("shop_url", e.target.value)} />
            <Fehler text={fehler.shop_url} />
          </div>
          <div className="feld">
            <label htmlFor="produkt_url">Link zu deinem Hauptprodukt</label>
            <input id="produkt_url" inputMode="url" placeholder="deinshop.de/products/…" value={d.produkt_url} onChange={(e) => setze("produkt_url", e.target.value)} />
            <Fehler text={fehler.produkt_url} />
          </div>
          <button className="formular-knopf" type="submit">Weiter zu deinem Konto</button>
        </>
      )}

      {schritt === 7 && (
        <>
          <h1 className="ak-form-h">Dein Check wartet auf dich</h1>
          <p className="ak-form-p">Leg dein ecomet-Konto an. Dort liegt dein Ergebnis in spätestens 24 Stunden.</p>
          {meldung && <div className="formular-meldung schlecht">{meldung}</div>}
          <div className="ak-zwei-felder">
            <div className="feld">
              <label htmlFor="vorname">Vorname</label>
              <input id="vorname" autoComplete="given-name" value={d.vorname} onChange={(e) => setze("vorname", e.target.value)} />
              <Fehler text={fehler.vorname} />
            </div>
            <div className="feld">
              <label htmlFor="whatsapp">WhatsApp</label>
              <input id="whatsapp" type="tel" autoComplete="tel" placeholder="+49 170 1234567" value={d.whatsapp} onChange={(e) => setze("whatsapp", e.target.value)} />
              <Fehler text={fehler.whatsapp} />
            </div>
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

          <button className="formular-knopf" type="submit" disabled={laeuft}>
            {laeuft ? "Wird angelegt …" : "Konto anlegen und Check starten"}
          </button>
          <p className="ak-form-unten">
            Schon ein Konto? <Link href="/anmelden">Anmelden</Link>
          </p>
        </>
      )}
    </form>
  );
}
