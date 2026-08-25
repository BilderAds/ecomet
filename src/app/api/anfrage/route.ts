import { NextResponse } from "next/server";

/**
 * Nimmt die Anfragen von /registrieren und /kontakt entgegen und legt sie in
 * Supabase ab. Bewusst ohne Bibliothek, direkt gegen die REST-Schnittstelle,
 * damit das Projekt keine weitere Abhängigkeit bekommt.
 *
 * Der geheime Schlüssel bleibt auf dem Server. Er darf nie im Browser landen,
 * deshalb liegt diese Datei unter app/api und nicht in einer Komponente.
 */

type Eingang = {
  art?: string;
  name?: string;
  email?: string;
  firma?: string;
  shop_url?: string;
  telefon?: string;
  weg?: string;
  nachricht?: string;
  quelle?: string;
  /** Honigtopf: ein Feld, das kein Mensch ausfüllt, nur Maschinen. */
  webseite?: string;
};

const erlaubteArten = ["registrierung", "kontakt"];
// Muss zu den <option>-Werten in `anfrage-formular.tsx` passen. Steht ein Wert
// hier NICHT drin, wird er still auf null gesetzt und die Auswahl des Kunden
// ist weg, ohne dass jemand etwas merkt.
const erlaubteWege = ["deutschland", "china", "import", "beides", "unklar"];

function sauber(wert: unknown, maxLaenge: number): string | null {
  if (typeof wert !== "string") return null;
  const t = wert.trim();
  if (!t) return null;
  return t.slice(0, maxLaenge);
}

export async function POST(anfrage: Request) {
  let daten: Eingang;
  try {
    daten = await anfrage.json();
  } catch {
    return NextResponse.json({ fehler: "Die Anfrage war nicht lesbar." }, { status: 400 });
  }

  // Honigtopf: ausgefüllt heißt Maschine. Wir tun so, als sei alles gut.
  if (daten.webseite) {
    return NextResponse.json({ ok: true });
  }

  const art = erlaubteArten.includes(daten.art ?? "") ? daten.art : "kontakt";
  const name = sauber(daten.name, 120);
  const email = sauber(daten.email, 160);

  if (!name) {
    return NextResponse.json({ fehler: "Bitte trag deinen Namen ein." }, { status: 400 });
  }
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) {
    return NextResponse.json(
      { fehler: "Diese E-Mail-Adresse sieht nicht richtig aus." },
      { status: 400 },
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const schluessel = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !schluessel) {
    console.error("[anfrage] NEXT_PUBLIC_SUPABASE_URL oder SUPABASE_SERVICE_ROLE_KEY fehlt");
    return NextResponse.json(
      { fehler: "Das Formular ist gerade nicht erreichbar. Schreib uns bitte direkt eine Mail." },
      { status: 503 },
    );
  }

  const satz = {
    art,
    name,
    email,
    firma: sauber(daten.firma, 160),
    shop_url: sauber(daten.shop_url, 300),
    telefon: sauber(daten.telefon, 60),
    weg: erlaubteWege.includes(daten.weg ?? "") ? daten.weg : null,
    nachricht: sauber(daten.nachricht, 4000),
    quelle: sauber(daten.quelle, 200),
  };

  const antwort = await fetch(`${url}/rest/v1/anfrage`, {
    method: "POST",
    headers: {
      apikey: schluessel,
      Authorization: `Bearer ${schluessel}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(satz),
  });

  if (!antwort.ok) {
    console.error("[anfrage] Supabase antwortete", antwort.status, await antwort.text());
    return NextResponse.json(
      { fehler: "Das hat gerade nicht geklappt. Versuch es nochmal oder schreib uns eine Mail." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
