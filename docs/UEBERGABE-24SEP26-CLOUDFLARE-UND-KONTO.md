# Übergabe · 24.09.2026 abends — Call Kevin × Alex: ecomet zieht auf Cloudflare, danach baut Kevin dort die Webapp

Wer hier weitermacht: **diese Datei zuerst.** Danach bei Bedarf
`docs/PLAN-25AUG26-KONTEN-UND-PLATTFORM.md` (Konto-Modell, gilt weiter) und
`docs/UEBERGABE-25AUG26-LIVE-UND-SB7.md` (Stand der Seite).

**Stand: Entschieden ist nur der Weg, gebaut wurde nichts. Nächste Woche (ab 28.09.26)
zeigt Alex Kevin sein Cloudflare, dann wird die Website dort gehostet. Danach bekommt
Kevin mehr Zugriff auf das Konto und baut dort die ecomet-Webapp.**

---

## Was entschieden wurde (Call Kevin × Alex, 24.09.26)

Kevins Notizen aus dem Call, wörtlich:
„meine area: apps sehen die man hat · link für affiliate · alex hat pixel tracking gebaut
was ecomet nutzen könnte (META) · step 1 website auf cloudflare hosten · js datei mit
denen arbeitet cloudflare · cloudflare befassen · step 2" (Step 2 ist laut Kevin leer, „nix").
Im Original stand „gs datei“, Kevin hat bestätigt: gemeint ist „JS-Datei“.

1. **Alex macht alles über Cloudflare** (Workers, KV). Dort laufen schon ecomet.invoices und
   disputes. Alex hat **kein GitHub**, er fügt den Code direkt im Cloudflare-Dashboard ein.
2. **Schritt 1:** e-comet.de zieht von Vercel auf Alex' Cloudflare. Kevin gibt Alex dafür
   den Code. Termin: nächste Woche, Alex zeigt Kevin Cloudflare.
3. **Danach:** Kevin bekommt mehr Zugriff auf den Account und baut dort die ecomet-Webapp:
   ein ecomet-Konto für Website und alle Apps, Kontobereich „meine Area“ mit den Apps, die
   der Kunde hat, und seinem Affiliate-Link.
4. **Alex' Meta-Pixel-Tracking** soll ecomet mitnutzen.

## Was Cee Kevin dazu gesagt hat (Recherche, Quellen im Chat vom 24.09.)

- Next.js 16 läuft auf Cloudflare über den offiziellen **OpenNext-Adapter**
  (`@opennextjs/cloudflare`). Cloudflare ersetzt Vercel komplett.
- Cloudflare ersetzt Supabase **nur halb**: D1 (SQLite, 10 GB je Datenbank), KV, R2 ja,
  aber **keine fertige Kundenanmeldung**. „Cloudflare Access“ ist für Firmen-Logins, nicht
  für Kunden. **Empfehlung: Hosting auf Cloudflare, Konten in Supabase Auth**
  (offizielle Anbindung in den Cloudflare-Docs). Jede App auf Cloudflare prüft denselben
  Supabase-Login, damit ist das übergreifende Konto trotzdem da. **Kevin hat dazu noch
  nicht entschieden.**
- Ein Worker ist eine JS-Datei, die ausgeführt wird. Mit KI hat das nichts zu tun, „der
  Worker weiß Bescheid“ stimmt so nicht.
- Vorschlag an Alex (noch nicht gestellt): ein ecomet-eigenes GitHub-Repo, das Cloudflare
  über „Workers Builds“ automatisch ausspielt. Grund: Heute muss Alex Cees Code von Hand
  einkopieren. `getDashboardHTML` vom 07.09. ist bis heute unbestätigt live.
- Vorgeschlagen: Das Cloudflare-Konto soll ecomet gehören (kontakt@e-comet.de), Alex ist
  Mitglied. Grund: Alex' Anlage-2-Eintrag „Cloudflare Worker App - Building Strategie“
  im Vertrag, siehe `Projekte/Ecomet/LIESMICH.md`.

## In Notion angelegt (24.09.26, Projekt ecomet)

1. „Website e-comet.de von Vercel auf Alex' Cloudflare umziehen“ · bei Cee
2. „Kontobereich auf e-comet.de bauen: der Kunde sieht seine gebuchten Apps und seinen
   Affiliate-Link“ · bei Cee
3. „Alex' Meta-Pixel-Tracking für ecomet übernehmen“

## Was OFFEN ist

1. **Termin mit Alex nächste Woche.** Was er bekommt: das Repo `github.com/BilderAds/ecomet`,
   **Zweig `relaunch-plattform`**. Nur der ist live. `main` ist die alte Seite, darauf darf
   er nicht aufbauen. Dazu die zwei Werte aus `.env.local`, die der Code liest:
   `NEXT_PUBLIC_SUPABASE_URL` und `SUPABASE_SERVICE_ROLE_KEY`. Die bekommt er persönlich im
   Termin, nicht über den Chat.
2. **Konten: Supabase Auth oder eigene Anmeldung in Cloudflare?** Kevin entscheidet,
   Empfehlung siehe oben.
3. **Cee braucht danach Zugriff:** einen Cloudflare-API-Token mit Rechten für Workers und
   DNS, dann kann Cee direkt ausspielen.
4. **Sicherheitsloch `/api/settings` in ecomet.invoices** (gibt den Lexware-Schlüssel jedem,
   der die Shop-Domain kennt). In unserer Kopie
   `/Users/victoria/Projekte/Ecomet/apps/invoice/worker.js` steht es in Zeile 594, ob es live
   noch so ist, weiß nur Alex. Muss beim Umbau aufs Konto zu.

## Fallen

- **Das Repo `BilderAds/ecomet` ist ÖFFENTLICH** (`gh repo view` → `PUBLIC`), inklusive
  `docs/`. `docs/PLAN-25AUG26-KONTEN-UND-PLATTFORM.md` beschreibt das `/api/settings`-Loch.
  Zugangsdaten sind keine drin (`.env*` ist ignoriert, geprüft). Cee hat angeboten, das
  Repo privat zu stellen. **Kevin: „erstmal alles egal“, also nicht angefasst.** Nicht
  eigenmächtig ändern, beim Umzug wieder ansprechen.
- „Konto anlegen“ auf e-comet.de (`src/app/registrieren/page.tsx`) ist nur ein
  Anfrageformular (`AnfrageFormular`, schreibt in Supabase). Ein echtes Konto gibt es nicht.
- Cee hatte gesagt, Cloudflare hole den Code aus GitHub. Das war zu absolut. Es geht auch
  direkt im Dashboard, und genau so arbeitet Alex.

## Wie man prüft, dass nichts kaputt ist

Diese Sitzung hat am Code nichts geändert. Die Seite läuft weiter auf Vercel:

    curl -sI https://e-comet.de | head -1        # erwartet: HTTP/2 200

## Pfade

- Website: `/Users/victoria/Projekte/Website Builder/Websites/ecomet` (Zweig `relaunch-plattform`,
  live geht nur `vercel deploy --prod`, ein Push deployt nichts)
- Zugänge: `.env.local` im selben Ordner (git-ignoriert)
- Alex' Worker (unsere Kopie, nicht zwingend live): `/Users/victoria/Projekte/Ecomet/apps/invoice/worker.js`
