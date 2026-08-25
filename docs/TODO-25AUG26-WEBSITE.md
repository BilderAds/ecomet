# To-do e-comet.de · Stand 25. August 2026

Alle 13 Seiten am 25.08. live aufgerufen und angesehen. Was hier steht, ist
gemessen oder per Screenshot geprüft, nichts davon geraten.

**Nichts aus dieser Liste wird ohne Kevins Ja gebaut.** Die Reihenfolge ist ein
Vorschlag, kein Beschluss.

---

## Erledigt am 25.08.

| | |
|---|---|
| ✅ | **TLS-Zertifikat.** Die Seite war über `https` gar nicht erreichbar |
| ✅ | **Vorschaubild beim Teilen.** Zeigte das Vercel-Dreieck, siehe unten |
| ✅ | **Made-by-Badge im Impressum.** War unlesbar und 17 px versetzt |
| ✅ | **Stimmen-Laufband.** Riss ab 1300 px Fensterbreite rechts auf |

### Warum überall Vercel stand

Es gab **kein `og:image`**, und `src/app/favicon.ico` war noch das Standardicon
aus `create-next-app`, also das Vercel-Dreieck. WhatsApp und Slack fallen ohne
`og:image` auf das Favicon zurück, und genau das hat Kevin in seiner Vorschau
gesehen.

Gebaut, aus den echten Markendateien, das Logo ist nirgends nachgetippt:

```
src/app/opengraph-image.png   1200×630, dunkler Grund, Logo, die Aussage
src/app/twitter-image.png     dasselbe für X
src/app/icon.png              512×512, das Icon im Browser-Tab
src/app/apple-icon.png        180×180, für den Home-Bildschirm
```

Dazu `metadataBase`, `og:url`, `og:site_name` und `twitter:card:
summary_large_image` gesetzt. Ohne `metadataBase` schreibt Next einen relativen
Pfad ins `og:image`, und daran scheitert jede Vorschau.

> ⚠ **WhatsApp, Slack und LinkedIn merken sich alte Vorschauen.** Ein Link, der
> schon verschickt wurde, kann noch tagelang das alte Bild zeigen. Zum Testen
> einen Zusatz anhängen: `https://e-comet.de/?1`. Bei LinkedIn geht es über den
> Post Inspector, bei Facebook über den Sharing Debugger.

---

## 1. Die Unterseiten haben kein einziges Bild

**Das ist der Grund, warum sie leer wirken.** Gemessen, nicht geschätzt:

| Seite | Bilder | Höhe | Eindruck |
|---|---|---|---|
| `/apps/dashboard` | **großer Produkt-Screenshot** | 4809 px | **gut** |
| `/apps/faelle` | Screenshot | 5469 px | gut |
| `/apps/invoices` | Screenshot | 4239 px | gut |
| `/preise` | **keins** | 2349 px | Tabellen auf Schwarz |
| `/fulfillment/deutschland` | **keins** | 2469 px | eine Lagerseite ohne Lager |
| `/fulfillment/china` | **keins** | 2619 px | dito |
| `/ueber-uns` | **keins** | 2169 px | am schlimmsten, siehe unten |
| `/kontakt` | **keins** | 2169 px | Formular im Nichts |
| `/registrieren` | **keins** | 2169 px | Formular im Nichts |

Die drei App-Seiten funktionieren, **weil sie ein großes Bild haben.** Genau das
fehlt den anderen sechs.

**Was gebraucht wird, in dieser Reihenfolge:**

1. **Lagerfotos aus Deutschland** (Packsy24). Regale, Packtisch, Kartons auf der
   Palette. Kommen für `/fulfillment/deutschland`, `/ueber-uns` und die
   Startseite in Frage.
2. **Fotos aus dem China-Lager**, für `/fulfillment/china`.
3. **Ein Foto von Kevin**, für `/ueber-uns`. „Deutsch geführt" ohne ein Gesicht
   ist eine Behauptung ohne Beleg.
4. **Ein Paketfoto mit eigener Marke** für den Abschnitt „Dein Name auf dem
   Karton".

Ohne echte Fotos bleibt jede Umgestaltung Kosmetik. Es gibt Notlösungen
(Produkt-Screenshots größer, ein Schaubild des Wegs China → Lager → Kunde),
aber sie ersetzen keine echten Bilder.

**→ Frage an Kevin: Kann Packsy24 Fotos aus dem Lager schicken? Und haben wir
welche aus China?**

## 2. „Über uns" ist die schwächste Seite

Am 25.08. angesehen: nach dem zweispaltigen Text folgt eine **leere Fläche von
rund 250 px**, dann zwei kleine Karten mittig, dann wieder ein großes Loch, dann
der Abschluss. Kein Bild, kein Gesicht, keine Zahl, keine Kundenstimme.

Zu klären: Team-Foto ja oder nein, und ob die belegten Vertragszahlen
(0,5 % Fehlerquote, 99 % Bestandsgenauigkeit, 500.000 € Versicherung, 12-Uhr-
Cutoff) hier als Beleg für „nah an der Ware" auftauchen sollen.

## 3. Die Apps sind im Kopf der Seite nicht erreichbar

Im Menü zeigt **„Apps" auf `/#apps`**, also auf einen Absatz der Startseite. Die
drei echten Seiten `/apps/dashboard`, `/apps/invoices` und `/apps/faelle`
stehen im Menü **gar nicht**, nur unten im Fuß. `/apps` selbst ist **404**.

Wer auf `/preise` steht und „Apps" klickt, landet auf der Startseite statt bei
den Apps. Alle anderen Menüpunkte sind echte Seiten, nur dieser nicht.

**Zwei Wege, Kevin entscheidet:**
* ein Aufklapp-Menü unter „Apps" mit den drei Seiten, oder
* eine echte Übersichtsseite `/apps`, die auf die drei verlinkt.

## 4. Die Knöpfe sind uneinheitlich

Der Haupt-CTA im Kopf ist orange. Auf den Unterseiten sind die Knöpfe im
Abschluss **grau**: „Gespräch anfragen", „Konto erstellen", „Frage stellen",
„Produkt anfragen". Am Ende einer Seite steht damit der leiseste Knopf.

Dazu: auf `/fulfillment/deutschland` stehen **zwei gleich aussehende Knöpfe
nebeneinander**. Einer muss führen, der andere zurücktreten.

## 5. Unterstrichene Überschriften sehen aus wie Links

„Zwei Standorte", „So kommst du rein", „So läuft es" tragen eine Unterstreichung
als Schmuck. Unterstrichen heißt im Web anklickbar. Entweder wegnehmen oder
durch etwas ersetzen, das nicht nach Link aussieht.

## 6. Trust nur auf der Startseite

Die Sektion „Was unsere Kunden sagen" steht **nur auf der Startseite**. Wer über
Google direkt auf `/preise` oder `/fulfillment/deutschland` kommt, sieht keinen
einzigen Beleg. Regel ist: **jede Seite braucht Trust.**

**→ Frage an Kevin: soll die Sektion auf die Unterseiten mit drauf?**

---

## Rechtliches, hier entscheidet Kevin

**Nichts davon wurde angefasst.**

1. **Impressum nennt eine fremde Firma.** Dort steht `JYS Trade Co., Limited`,
   Kowloon, mit `Liu Wei, Director`. Wer soll dort stehen, solange die LLC nicht
   steht?
2. **Falsche Domain in drei Rechtstexten.** Impressum, Datenschutzrichtlinie und
   Nutzungsbedingungen verweisen auf `ecometapp.de`, die Seite läuft auf
   `e-comet.de`. Auf der Kontaktseite steht schon `info@e-comet.de`. Sobald
   Punkt 1 geklärt ist, ziehe ich das in einem Rutsch nach.
3. **Datenschutz und AGB sind vom 13. März 2025** und beschreiben `ecometapp.de`,
   nicht diese Seite.
4. **Zur Information, keine Handlung nötig:** die ecomet-App im Shopify App
   Store (`apps.shopify.com/ecomet`, Entwickler Alexander Günter) steht auf
   **0,0 bei 0 Reviews**. Die Zeile „1.475+ Empfehlungen" und die sechs
   Kundenstimmen bleiben, wie Kevin sie bestellt hat. Sobald es echte Stimmen
   gibt, kommen sie mit Beleg in `src/inhalte/stimmen.ts`, dann schaltet die
   Sektion von selbst um. Kandidaten: **Beni und Malte.**

---

## Vorschlag für die Reihenfolge

| | was | hängt ab von |
|---|---|---|
| 1 | Fotos besorgen (Lager DE, China, Kevin) | Packsy24 und Alex |
| 2 | Impressum klären, dann Domain in allen Rechtstexten ziehen | Kevins Entscheidung |
| 3 | Apps im Menü erreichbar machen | Kevins Wahl: Aufklapp oder `/apps` |
| 4 | Knöpfe vereinheitlichen, Unterstreichungen weg | nichts, kann sofort los |
| 5 | Bilder einbauen, Löcher auf den sechs Seiten schließen | Punkt 1 |
| 6 | Trust auf die Unterseiten | Kevins Ja |
