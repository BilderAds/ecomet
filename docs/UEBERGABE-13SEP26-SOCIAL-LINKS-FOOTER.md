# Übergabe · 13.09.2026 abends — Instagram, TikTok und YouTube im Footer von e-comet.de verlinkt

Wer hier weitermacht: **diese Datei zuerst.** Danach nur bei Bedarf `UEBERGABE-25AUG26-LIVE-UND-SB7.md` und `TODO-25AUG26-WEBSITE.md`.

**Stand: Die drei Profil-Links sind live auf e-comet.de, auf allen Seiten. Offen ist aus dieser Sitzung nichts.**

---

## Was gemacht wurde

1. **Drei Social-Icons in den Footer**, unter dem Beschreibungstext in der ersten Spalte.
   Kevins Auftrag: „unsere tiktok instagram etc da noch verlinken … insta und auch tiktok und auch youtube".
   - `src/components/start/fuss.tsx`: neues Array `kanaele` (Name, Ziel, SVG-Pfad), gerendert als
     `<a target="_blank" rel="noopener noreferrer" aria-label="ecomet auf …">`.
   - `src/app/darkglass.css`: `.foot-social` (36-px-Klickfläche, Farbe wie die Footer-Links, weiß beim Hover,
     `margin-left:-8px`, damit die Icons bündig mit dem Text stehen).
   - Adressen, jede vor dem Einbauen abgerufen:
     - Instagram `https://www.instagram.com/ecomet.de/` → 200
     - TikTok `https://www.tiktok.com/@ecomet.de` → 200, Seite nennt `"uniqueId":"ecomet.de"`
     - YouTube `https://www.youtube.com/@ecomet.official` → 200, Titel „ecomet. - YouTube"
2. **Angesehen:** Screenshot mit headless Chrome bei 1440 px und 390 px. Icons stehen bündig, ruhig, nichts bricht um.
3. **Commit `2d4a898`** „Footer verlinkt Instagram, TikTok und YouTube" auf `relaunch-plattform`, gepusht.
4. **Live:** Deploy `ecomet-website-nn50mswzv-ecomet1.vercel.app` (production). Nachgeprüft auf e-comet.de:
   `/`, `/preise`, `/kontakt`, `/impressum`, `/fulfillment/deutschland`, `/apps/dashboard` enthalten alle drei Links.

## Was OFFEN ist

Aus dieser Sitzung nichts. Die älteren offenen Punkte stehen unverändert in `docs/TODO-25AUG26-WEBSITE.md`
(Kontaktformular schickt keine Mail, Fotos fehlen, Impressum).

## Fallen, die mich in dieser Session erwischt haben

- **YouTube heißt anders als die anderen beiden.** Ich habe `@ecomet.de` und `@ecometde` probiert, beide 404.
  Kevin hat `@ecomet.official` nachgereicht. Nie aus Instagram auf YouTube schließen.
- **Instagram und TikTok liefern auch für fremde Seiten 200 und einen Allerwelts-Titel.** Beweis ist erst der
  Handle im Seiteninhalt (TikTok `uniqueId`), nicht der Statuscode.
- **Ein Push deployt NICHTS.** Das Vercel-Projekt `ecomet-website` hängt nicht an GitHub. Das alte Memory sagte
  noch „Vercel deployt von origin/main", das ist korrigiert.
- **Der erste `vercel deploy --prod` endete mit einer JSON-Rückfrage** (`"command": "vercel deploy --prod --scope ecomet1"`)
  ohne sichtbaren Deploy. Der zweite, identische Aufruf lief durch. Deshalb nach jedem Deploy live greppen.
- **Playwright-MCP war nicht verbunden** (Port 9222). Screenshots gingen mit headless Chrome und einem 9000 px hohen Fenster.

## Wie man prüft, dass nichts kaputt ist

    for r in / /preise /kontakt /impressum; do printf "%s %s\n" "$r" "$(curl -s https://e-comet.de$r | grep -o 'ecomet auf [A-Za-z]*' | sort -u | tr '\n' ' ')"; done
    # erwartet je Zeile: ecomet auf Instagram ecomet auf TikTok ecomet auf YouTube

    for u in https://www.instagram.com/ecomet.de/ https://www.tiktok.com/@ecomet.de https://www.youtube.com/@ecomet.official; do echo "$u $(curl -sL -A 'Mozilla/5.0 Chrome/128' -o /dev/null -w '%{http_code}' $u)"; done
    # erwartet: dreimal 200

## Wichtige Pfade, Zugänge, Stellschrauben

- Repo lokal (Mac 1): `/Users/victoria/Projekte/Website Builder/Websites/ecomet/`, Zweig `relaunch-plattform`, Remote `github.com/BilderAds/ecomet`
- Links ändern oder ergänzen: Array `kanaele` in `src/components/start/fuss.tsx`
- Live stellen (aus dem Repo-Ordner):

      npm run build
      set -a; source .env.local; set +a
      vercel deploy --prod --yes --token "$VERCEL_TOKEN" --scope "$VERCEL_TEAM_SLUG"

- Token und Team stehen in `.env.local` (von git ignoriert), nicht hier.
- Memory: `reference_ecomet_social_kanaele.md`, `reference_ecomet_website.md`
