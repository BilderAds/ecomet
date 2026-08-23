# Übergabe · 23. August 2026, nachts — ecomet Relaunch, Block 1 steht

Wer hier weitermacht: **diese Datei zuerst**, dann `SPEC-23AUG26-RELAUNCH-PLATTFORM.md`
für den ganzen Plan.

**Stand: Die komplette neue Website ist gebaut und geprüft. Nichts ist live, nichts ist
gepusht.** Kevin am 23.08. um 02:10: „nicht auf ecometapp.de pushen, also einfach alles
lokal speichern, pushen machen wir dann, wenn ich aufgestanden bin."

---

## Zum Ansehen

**Doppelklick auf `ecomet Website ansehen.command` auf dem Schreibtisch.**
Danach öffnet sich `http://localhost:3100` von selbst. Das Fenster zumachen beendet sie.

Wer lieber tippt: `cd "Projekte/Website Builder/Websites/ecomet" && npx next dev -p 3100`.

---

## Was gebaut ist

Aus einem Onepager wurden **vierzehn Seiten**:

```
/                          Startseite
/fulfillment/deutschland   DE-Lager, Preise, Ablauf
/fulfillment/china         Sourcing, Branding, Ablauf
/apps/dashboard            die ecomet App
/apps/invoices             ecomet.invoices
/apps/faelle               ecomet.dispute
/preise                    DE-Tabelle, China auf Anfrage, App-Preise
/ueber-uns
/kontakt                   Formular, funktioniert wirklich
/registrieren              Formular, funktioniert wirklich
/impressum /datenschutzrichtlinien /nutzungsbedingungen
404                        eigene Seite im selben Design
```

**Design:** die `dark-glass`-Vorlage aus `Website Builder/vorlagen/dark-glass/`, als
`src/app/darkglass.css` übernommen und auf Marken-Orange umgefärbt. Kopf und Bühne kommen
aus der alten Seite zurück, weil Kevin sie besser fand.

**Das Formular ist echt.** `/api/anfrage` schreibt nach Supabase, Projekt
**„ecomet website"** (`tkbyvdjcelscradewkgt`), Tabelle `anfrage`, RLS an, nur der Server
schreibt. Im echten Lauf getestet, Prüfeintrag wieder gelöscht.

**Alle Zahlen stehen an einer Stelle:** `src/inhalte/zahlen.ts`, jede mit `geprueft` und
`quelle`.

---

## Zwei Commits liegen bereit, NICHT gepusht

```
f6b6f27  Kevins Rueckmeldung: alter Kopf und alte Buehne zurueck
33b5e29  Relaunch als Plattform: neue Seitenstruktur, dark-glass, Anfrageformular
```

**Warum nicht gepusht:** Das Repo ist `BilderAds/ecomet` und hängt per GitHub-Anbindung an
dem Vercel-Konto, auf dem `ecometapp.de` live liegt. Ein Push auf `main` ersetzt sofort die
laufende Seite, mit Platzhalterzahlen und dem alten Impressum darin.

**Wenn gepusht wird, dann so:** erst auf einen eigenen Zweig, damit Vercel eine
Vorschauadresse baut und die Live-Seite unangetastet bleibt.

```
git switch -c relaunch-plattform
git push -u origin relaunch-plattform
```

---

## Was Kevin entscheiden muss, bevor etwas live geht

| # | Punkt | Warum es blockiert |
|---|---|---|
| 1 | **Die Zahlen** in `src/inhalte/zahlen.ts` mit `geprueft: false` | „1 bis 2 Tage", „2 Lager", „1.475+ Empfehlungen", „000 Bestellungen" sind Platzhalter |
| 2 | **Das Impressum nennt JYS Trade Co., Limited** als Betreiber | Das ist Unify. Wer dort hingehört, ist eine rechtliche Entscheidung |
| 3 | **Rechtsseiten nennen `ecometapp.de` und `info@ecometapp.de`** | Passt nicht zum Umzug auf e-comet.de |
| 4 | **Kundenstimmen** | Keine einzige ist belegt, der Block fehlt deshalb ganz |
| 5 | **Die Bühnen-Überschrift ist geraten** | Kevin: „nimm diesen Text, dein Text ist Arsch". Der gemeinte Text kam nicht mit an. Jetzt steht die alte Überschrift dort, mit „1 bis 2 Tage" statt „4 bis 8 Tage", weil das Hauptversprechen jetzt das deutsche Lager ist |
| 6 | **Das Laufband „Angebunden an"** | Kevin: „das noch hässlich, werde morgen was besseres raussuchen von 21st.dev" |
| 7 | **`ecomet.invoices` trägt Suptrack-Branding** | Die Werbeseite darf so nicht live |

---

## Zugänge, alle geprüft und in `.env.local`

| Dienst | Konto | Stand |
|---|---|---|
| GitHub | **ecometapp** | Token liegt, Rechte repo, workflow, read:org |
| Vercel | **ecometapp**, Team `ecomet` (`ecomet1`) | Token liegt. **Achtung:** in diesem Team liegt nur `ecomet-edit`. Die Website läuft auf einem anderen Konto |
| Supabase | Organisation **ecomet** | Token liegt, Projekt „ecomet website" angelegt, Schlüssel eingetragen |
| Shopify Partner | Alex hat Kevin Zugriff gegeben | **Token fehlt noch**, Felder stehen in der `.env.local` bereit |

`.env.local` wird von git ignoriert, mit `git check-ignore` geprüft.

---

## Stolpersteine, die diese Session gekostet haben

1. **Das `*{margin:0;padding:0}` aus der Vorlage schlug alle Tailwind-Abstände.**
   Tailwind legt Utilities in einen CSS-Layer, ungelayerte Regeln gewinnen unabhängig von
   der Spezifität. Der ganze Text klebte am Bildschirmrand. Reset entfernt.
2. **Ein `.glass-btn` braucht `display:inline-block`, sobald er ein Link ist.**
   Sonst kollabiert das Glas und der Knopf steht als nackter Text da.
3. **Die Supabase Management API antwortet ohne User-Agent mit 403** (Cloudflare 1010).
   Mit `curl` und gesetztem User-Agent geht es, Python `urllib` scheitert.
4. **Eine in TextEdit geöffnete Datei überschreibt Änderungen am Dateisystem.**
   Beim Befüllen der `.env.local` zweimal passiert.
5. **Screenshots aus dem macOS-Zwischenspeicher sind weg, sobald sie eingefügt sind.**
   Kevins vier Bilder waren nicht mehr lesbar. Bilder als Datei schicken lassen.

---

## Was als Nächstes dran ist

**Block 1 ist fertig.** Danach in dieser Reihenfolge:

1. Die sieben Punkte oben mit Kevin klären, dann Zweig pushen und Vorschau ansehen.
2. **Block 2, Umzug auf e-comet.de.** Braucht die Cloudflare-Zone, die vermutlich Alex
   gehört. Dazu die Entscheidung, welche Mailadressen künftig gelten, und die beiden
   Kundendokumente neu bauen.
3. **Block 3, die Webapplikation** unter `app.e-comet.de`. Braucht Alex.
4. **Block 4, Unify.** Feste Preise, Guthaben auf ecomet-Ebene, automatisches Anlegen.
   Das ist eine Frage an die Chefs, der Entwurf der Nachricht steht im Verlauf vom 23.08.
