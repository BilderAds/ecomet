import { NextResponse } from "next/server";

/**
 * Nimmt die Leads aus dem Abzock-Check (/abzock-check/start) entgegen und legt
 * sie in der Supabase-Tabelle `abzock_check` ab. Gleiches Muster wie
 * /api/anfrage: direkt gegen REST, geheimer Schlüssel bleibt auf dem Server.
 *
 * Gespeichert wird, was der Händler angibt, so wie er es angibt
 * („10 bis 29", nicht eine ausgedachte Zahl). Das Passwort kommt hier NIE an,
 * siehe check-formular.tsx: das echte Konto baut Alex in Cloudflare.
 */

type Eingang = Record<string, unknown>;

const bestellOptionen = ["noch keine", "1 bis 9", "10 bis 29", "30 bis 99", "100+"];
const fulfillerOptionen = ["Agent in China", "CJ", "Zendrop", "eigenes Lager", "anderes"];
const adsOptionen = ["Meta", "Google", "TikTok", "keine"];

function sauber(wert: unknown, maxLaenge: number): string | null {
  if (typeof wert !== "string") return null;
  const t = wert.trim();
  return t ? t.slice(0, maxLaenge) : null;
}

const fehler = (text: string, status = 400) => NextResponse.json({ fehler: text }, { status });

export async function POST(anfrage: Request) {
  let d: Eingang;
  try {
    d = await anfrage.json();
  } catch {
    return fehler("Die Anfrage war nicht lesbar.");
  }

  // Honigtopf: ausgefüllt heißt Maschine. Wir tun so, als sei alles gut.
  if (d.webseite) return NextResponse.json({ ok: true });

  const vorname = sauber(d.vorname, 80);
  const email = sauber(d.email, 160);
  const whatsapp = sauber(d.whatsapp, 40);
  const shop_url = sauber(d.shop_url, 300);
  const produkt_url = sauber(d.produkt_url, 500);
  const bestellungen = sauber(d.bestellungen, 20);
  const preis_angabe = sauber(d.preis, 20);
  const fulfiller = sauber(d.fulfiller, 40);
  const ads = Array.isArray(d.ads) ? d.ads.filter((a): a is string => adsOptionen.includes(a as string)) : [];

  if (!vorname) return fehler("Bitte trag deinen Vornamen ein.");
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) return fehler("Diese E-Mail-Adresse sieht nicht richtig aus.");
  if (!whatsapp) return fehler("Bitte trag deine WhatsApp-Nummer ein.");
  if (!shop_url || !produkt_url) return fehler("Bitte trag Shop und Hauptprodukt ein.");
  if (!bestellungen || !bestellOptionen.includes(bestellungen)) return fehler("Bitte wähl deine Bestellungen am Tag aus.");
  if (!preis_angabe) return fehler("Bitte trag deinen Einkaufspreis ein.");
  if (d.einwilligung !== true) return fehler("Bitte bestätige die Datenschutzerklärung.");

  const preis = Number(preis_angabe.replace(",", "."));

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const schluessel = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !schluessel) {
    console.error("[abzock-check] NEXT_PUBLIC_SUPABASE_URL oder SUPABASE_SERVICE_ROLE_KEY fehlt");
    return fehler("Der Check ist gerade nicht erreichbar. Schreib uns bitte an kontakt@e-comet.de.", 503);
  }

  const satz = {
    vorname,
    email,
    whatsapp,
    shop_url,
    produkt_url,
    bestellungen_angabe: bestellungen,
    preis_angabe,
    preis_eur: Number.isFinite(preis) && preis > 0 ? preis : null,
    fulfiller: fulfiller && fulfillerOptionen.includes(fulfiller) ? fulfiller : null,
    ads,
    faelle_angabe: d.faelle_unbekannt === true ? "weiß nicht" : sauber(d.faelle, 10),
    lieferzeit_angabe: sauber(d.lieferzeit, 20),
    retouren_angabe: sauber(d.retouren, 20),
    einwilligung_am: new Date().toISOString(),
    quelle: sauber(d.quelle, 200),
  };

  let antwort: Response;
  try {
    antwort = await fetch(`${url}/rest/v1/abzock_check`, {
      method: "POST",
      headers: {
        apikey: schluessel,
        Authorization: `Bearer ${schluessel}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(satz),
    });
  } catch (e) {
    console.error("[abzock-check] Supabase nicht erreichbar", e);
    return fehler("Das hat gerade nicht geklappt. Versuch es gleich nochmal oder schreib uns an kontakt@e-comet.de.", 502);
  }

  if (!antwort.ok) {
    console.error("[abzock-check] Supabase antwortete", antwort.status, await antwort.text());
    return fehler("Das hat gerade nicht geklappt. Versuch es gleich nochmal oder schreib uns an kontakt@e-comet.de.", 502);
  }

  return NextResponse.json({ ok: true });
}
