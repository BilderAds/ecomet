# Übergabe · 23. August 2026 — ecomet Relaunch, Block 1 steht und ist entgiftet

Wer hier weitermacht: **diese Datei zuerst**, dann `SPEC-23AUG26-RELAUNCH-PLATTFORM.md`
für den ganzen Plan.

**Stand: Die komplette neue Website ist gebaut, geprüft und von erfundenen Angaben
befreit. Nichts ist live, nichts ist gepusht.**

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

---

## Was am 23.08. nachmittags dazukam

### 1. Der Wächter für die Zahlen gibt es jetzt WIRKLICH

Die letzte Übergabe versprach `npm run zahlen-pruefen`. Das Skript existierte nicht.
Jetzt liegt es in `skripte/zahlen-pruefen.mjs` und prüft zwei Dinge:

- jede Zahl in `src/inhalte/zahlen.ts` ist `geprueft` und hat eine `quelle`
- **kein Geldbetrag steht an dieser Datei vorbei direkt in einer Seite**

Der zweite Punkt war nötig: zwölf Beträge klebten in `/preise` und
`/fulfillment/deutschland` und liefen am Wächter vorbei. Alle sind jetzt in `zahlen.ts`.

### 2. Zwei Preiszeilen waren erfunden und sind raus

| Zeile auf `/preise` | Warum sie flog |
|---|---|
| „Jeder weitere Artikel in derselben Bestellung 0,36 €" | 0,36 € ist der Preis für **Verpackungsmaterial**. Packsy wirbt ausdrücklich mit „ein Pauschalpreis pro Bestellung, egal wie viele Artikel drin sind". Die Zeile hätte unser stärkstes Argument selbst widerlegt |
| „Wareneingang je Palette 18,45 €" | Infosheet Juli 2026: **„Warenannahme & Einlagerung kostenlos"**. 18,45 € ist der Lagerplatz je Palette, die Zeile stand doppelt |

Jetzt steht dort stattdessen „Warenannahme und Einlagerung · kostenlos".

### 3. Zusagen, die in keinem Vertrag stehen, sind weg

Der Packsy-Vertrag ist nicht unterschrieben, **es gibt keine vereinbarte Cutoff-Zeit**
(steht so in `Ecomet/ecomet.partner/Packsy24/preisliste/UEBERGABE-21AUG26.md`, Punkt 3).
Trotzdem versprach die Seite an sechs Stellen Versand am selben Tag:

- `/fulfillment/deutschland`: „Heute bestellt. Morgen beim Kunden.", „Wir packen und
  verschicken am selben Tag", „Versand am selben Tag, wenn die Bestellung bis mittags kommt"
- Startseite: „Bestellt ein Kunde heute, geht das Paket heute raus.",
  „Deine Ware liegt hier und geht am selben Tag raus.",
  „Vom Klick bis zum ersten Paket vergeht ein Tag."

Ersetzt durch das, was belegt ist: **„täglicher Versand"** (Infosheet) und
**„1 bis 2 Werktage"** (dhl.de, Paket national: „In 1-2 Werktagen (i. d. R.) beim
Empfänger", abgerufen 23.08.2026).

### 4. Das Versprechen zum Verpackungsgesetz ist raus

Dort stand „Wir kümmern uns um deine Pflichten beim Verpackungsgesetz". Die Registrierung
im Verpackungsregister LUCID nach § 9 VerpackG **muss der Hersteller höchstpersönlich
machen, die Beauftragung Dritter ist nicht zulässig**. Das konnten wir nie halten.
An der Stelle steht jetzt die belegte Fehlerquote unter 1 %.

### 5. Die Bewertungszeile zeigt sich nur noch mit Beleg

`empfehlungen` steht auf `geprueft: false`, und `Bewertung()` gibt in dem Fall `null`
zurück. Ohne echte Zahl erscheint die Zeile gar nicht erst. Dasselbe gilt für den
Aussage-Kasten, der vorher „000 Bestellungen", „00 % pünktlich" und „0,0 Tage" zeigte.
Dort stehen jetzt drei Zahlen aus dem Infosheet: **unter 1 % Fehlerquote**,
**0 € Grundgebühr und Mindestmenge**, **43 Länder in Europa**.

### 6. Dreizehn tote Bauteile gelöscht

`hero`, `faq`, `features`, `solution`, `pain-points`, `final-cta`, `footer`, `globe`,
`marquee`, `navigation`, `steps`, `text-scramble` und **`testimonials`** hat niemand mehr
importiert. In `testimonials.tsx` lagen sechs frei erfundene Kundenstimmen mit
erfundenen Namen. Solche Dateien werden irgendwann wiederverwendet, deshalb sind sie weg.

### 7. Marken-Orange war zweimal verschieden

`globals.css` hatte `#F26B2B`, `darkglass.css` `#ff642c`. Auf einer Seite standen also
zwei Orangetöne nebeneinander. Alles auf den Wert des Baukastens **`#FF642C`**
(dunkel `#EF5615`).

### 8. Das Akzentwort war auf JEDER Unterseite weiß

`.accent` war im CSS nur innerhalb `.hero-h1` definiert. Die Unterseiten nutzen
`SeitenKopf`, dort greift die Regel nicht. Auf allen neun Unterseiten stand das
orange gedachte Wort also in Weiß, ohne dass irgendwo ein Fehler auftauchte.
Die Regel gilt jetzt auch für `.seitenkopf h1`, `.sec-h2` und `h2`.

### 9. Laufband, vier Schritte und Trust-Zeile, nach Kevins Rückmeldung

**Das Laufband war kaputt, nicht nur hässlich.** Kevin: „das sieht ja mal komplett
kacke aus". Die weichen Kanten waren zwei Kästen in `var(--bg)`, gerechnet gegen
einen Verlauf. Deshalb lagen links und rechts zwei harte dunkle Rechtecke auf der
Seite. Jetzt läuft das Band weiter endlos, die Kanten kommen aber über
`mask-image`, das funktioniert über jedem Hintergrund. Beim Überfahren hält es an.

**Die vier Schritte laufen jetzt zur Seite, nicht nach unten.** Kevin: „das soll in
1 viewport passen, also nicht scrollen sondern auf einen Blick". Vier gleich breite
Karten nebeneinander, dazwischen je ein kurzer Strich mit Pfeil, der beim
Einblenden wächst. Die Sektion ist 560 px hoch und passt damit in jeden Bildschirm.

Zwischenschritt war eine Leiter mit gemessener Kurve von oben nach unten. Die war
schön, brauchte aber zwei Bildschirme. Weg damit.

**Über der Überschrift steht wieder eine Trust-Zeile.** Sie zeigt zwei belegte
Aussagen: „Lager in Deutschland" und „Fehlerquote unter 1 %". Sobald
`empfehlungen` in `zahlen.ts` auf `geprueft: true` steht, schaltet dieselbe Stelle
automatisch auf die Bewertungszeile mit Köpfen und Sternen um. Bis dahin steht dort
kein erfundener Wert.

### 10. Selbst durchgeklickt

Alle 14 Seiten plus 404 aufgerufen, alle geben 200 bzw. 404. Jeder interne Link und der
einzige Link nach draußen (`bilderads.de`, 200) einzeln geprüft. Handy-Ansicht mit
Playwright nachgemessen: `scrollWidth == clientWidth`, kein waagerechtes Scrollen.
Blur-Test bestanden, eine Sache dominiert.

---

## ⚠ Was auf ecometapp.de HEUTE LIVE steht

Nicht neu, aber es gehört gesagt, weil es die alte Seite betrifft:

1. **Sechs erfundene Kundenstimmen mit vollen Namen** (Keanu Fuchs, Lisa Janzen,
   Daniel Bergmann, Daniel Waimer, Franzi Schneider, Tobias Beyer). Erfundene
   Bewertungen sind nach **§ 5b Abs. 3 UWG** unlauter und abmahnfähig.
2. **„1,475+ Empfehlungen"** ohne jede Quelle, dazu mit englischem Komma.
3. Das Impressum nennt **JYS Trade Co., Limited** in Hongkong als Betreiber.

Die neue Seite hat 1 und 2 nicht mehr. Punkt 3 ist unverändert und braucht eine
Entscheidung.

---

## Sechs Commits liegen bereit, NICHT gepusht

```
a2ccd7f  Akzentwort war auf jeder Unterseite weiss, DE-Ueberschrift auf eine Zeile
902b331  Projekt-Memory: Session 2, LL-001, Marken-Orange korrigiert
d4dc30a  Erfundene Angaben raus, Zahlen an eine Stelle, Waechter gebaut
ed51ef4  Buehnentext aus der alten Seite, Uebergabe, Startdatei
f6b6f27  Kevins Rueckmeldung: alter Kopf und alte Buehne zurueck
33b5e29  Relaunch als Plattform: neue Seitenstruktur, dark-glass, Anfrageformular
```

**Warum nicht gepusht:** Das Repo ist `BilderAds/ecomet` und hängt per GitHub-Anbindung an
dem Vercel-Konto, auf dem `ecometapp.de` live liegt. Ein Push auf `main` ersetzt sofort die
laufende Seite.

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
| 1 | **Das Impressum nennt JYS Trade Co., Limited** als Betreiber | Das ist Unify. Wer dort hingehört, ist eine rechtliche Entscheidung |
| 2 | **Rechtsseiten nennen `ecometapp.de` und `info@ecometapp.de`** | Passt nicht zum Umzug auf e-comet.de |
| 3 | **Kundenstimmen** | Keine einzige ist belegt, der Block fehlt deshalb ganz. Echte brauchen wir von echten Kunden |
| 4 | **Die Bewertungszahl** | Sobald es eine echte gibt: in `zahlen.ts` eintragen, `geprueft: true`, Quelle dazu. Dann erscheint die Zeile von selbst wieder |
| 5 | **Die Bühnen-Überschrift ist geraten** | Kevin: „nimm diesen Text, dein Text ist Arsch". Der gemeinte Text kam nicht mit an |
| 6 | **Das Laufband „Angebunden an"** | Kevin: „das noch hässlich, werde morgen was besseres raussuchen von 21st.dev" |
| 7 | **`ecomet.invoices` trägt Suptrack-Branding** | Nicht die Website, sondern die App selbst: Impressum, Haftungstext und Fußzeile im Worker nennen Alexander Günter. Die Werbeseite darf erst live, wenn das geklärt ist |
| 8 | **Die Bestell-Karte am Globus** | Sie zeigt wechselnde erfundene Bestellungen („Faszienrolle Set, Hannover 17:35"). Kommt aus der alten Seite. Deko oder Vortäuschung, das ist Kevins Entscheidung |
| 9 | **„Wir antworten am selben Werktag"** | Steht auf vier Seiten. Ist unsere eigene Zusage, niemand hat sie zugesagt |

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

## Stolpersteine

1. **Das `*{margin:0;padding:0}` aus der Vorlage schlug alle Tailwind-Abstände.**
   Tailwind legt Utilities in einen CSS-Layer, ungelayerte Regeln gewinnen unabhängig von
   der Spezifität. Reset entfernt.
2. **Ein `.glass-btn` braucht `display:inline-block`, sobald er ein Link ist.**
3. **Die Supabase Management API antwortet ohne User-Agent mit 403** (Cloudflare 1010).
4. **Eine in TextEdit geöffnete Datei überschreibt Änderungen am Dateisystem.**
5. **Screenshots aus dem macOS-Zwischenspeicher sind weg, sobald sie eingefügt sind.**
   Bilder als Datei schicken lassen.
6. **Headless Chrome mit `--window-size=390,...` lügt bei der Handy-Ansicht.** Es rendert
   breiter und schneidet ab, das sieht nach kaputtem Layout aus. Für Handy-Prüfungen
   Playwright mit `setViewportSize` nehmen und `scrollWidth` gegen `clientWidth` messen.
7. **Ein Wächter, der nur eine Datei liest, bewacht die Seite nicht.** Der erste Entwurf
   las nur `zahlen.ts` und übersah zwölf Beträge in den Seiten daneben.

---

## Was als Nächstes dran ist

1. Die neun Punkte oben mit Kevin klären, dann Zweig pushen und Vorschau ansehen.
2. **Block 2, Umzug auf e-comet.de.** Braucht die Cloudflare-Zone, die vermutlich Alex
   gehört. Dazu die Entscheidung, welche Mailadressen künftig gelten, und die beiden
   Kundendokumente neu bauen.
3. **Block 3, die Webapplikation** unter `app.e-comet.de`. Braucht Alex.
4. **Block 4, Unify.** Feste Preise, Guthaben auf ecomet-Ebene, automatisches Anlegen.
