# Übergabe · 25. August 2026, Abend

**Wer hier weitermacht: diese Datei zuerst.** Sie löst
`UEBERGABE-25AUG26-DOMAIN-LIVE-UND-UWG.md` ab, die weiter gilt für den
Hergang am Nachmittag. Offene Punkte: `TODO-25AUG26-WEBSITE.md`.

---

## Kurzfassung

**`https://e-comet.de` ist live**, alle 15 Adressen antworten mit 200.
Ursache der Störung war **nicht** das DNS, sondern ein fehlendes
TLS-Zertifikat. Danach wurde die komplette Copy nach StoryBrand
umgeschrieben, „Import aus China" als drittes Angebot gebaut und die
Preisliste als PDF veröffentlicht.

**Zwei Fehler, die Kevin gefunden hat und die niemand wiederholen darf,
stehen unten unter „Gelernt".**

---

## 1. Warum die Seite nicht ging

Alex' DNS war korrekt. Port 80 lieferte die Seite bereits mit 200, nur Port
443 brach ab: Vercel hatte beide Domains als `verified` stehen und trotzdem
**nie ein Zertifikat ausgestellt**. Nachgeholt über `POST /v3/certs`.

```
cert_vpjzfWQi0sSRX8EMZtJGTjK8
Let's Encrypt, 25.08.2026 bis 23.11.2026, autoRenew: true
```

> **Wenn die Domain wieder stumm ist:** `curl` auf Port 80 UND 443 getrennt.
> Geht 80, aber 443 nicht, ist es das Zertifikat, nicht das DNS.

## 2. Vorschaubild und Icons

Jeder geteilte Link zeigte das **Vercel-Dreieck**: es gab kein `og:image`, und
`src/app/favicon.ico` war noch der Default aus `create-next-app`.

Gebaut aus den echten Markendateien, Logo nirgends nachgetippt:
`opengraph-image.png`, `twitter-image.png`, `icon.png`, `apple-icon.png`.
Dazu `metadataBase` (ohne das schreibt Next relative Pfade und jede Vorschau
scheitert), `og:url`, `og:site_name`, `twitter:card: summary_large_image`.

**Die sichere Zone, sonst ist das Logo weg:** das Bild ist 1200×630 (1,905:1),
**WhatsApp zeigt aber 1,42:1 und schneidet links und rechts je ~153 px weg.**
Alles Wichtige steht deshalb mittig in den inneren **630 px**. Das Skript
`skripte/vorschaubild-bauen.py` rechnet jede Zeile gegen beide Zuschnitte und
meldet, wenn eine herausragt.

> WhatsApp cacht Vorschauen. Zum Testen `?1` anhängen.

## 3. Copy nach StoryBrand

Das Regelwerk liegt in `/Users/victoria/Projekte/Donald Miller/COPYWRITING-REGELN-STORYBRAND.md`
(787 Zeilen, aus dem Original-PDF, mit Seitenzahlen). **Es wird vor jedem
Kundentext aufgeschlagen**, siehe „Gelernt".

Gemessen am 25.08.: bilderads.de hat **0 von 34** Überschriften, die mit „Wir"
beginnen, ecomet hatte **4 von 26**, die H1 zuerst.

| alt | neu |
|---|---|
| Wir lagern, packen und verschicken deine Bestellungen. | **Dein Fulfillment-Center in Deutschland und China.** |
| Was wir übernehmen | Was du nie wieder selbst machst |
| Wir finden dein Produkt | Du schickst einen Link, du bekommst einen Preis |
| Jedes Paket wird angesehen | Kein Paket geht ungeprüft zu deinem Kunden |
| Retouren gehen an uns | Deine Retouren bleiben in Deutschland |
| Rechnung und Fälle | Deine Rechnungen schreiben sich selbst |
| Was unsere Kunden sagen | So läuft es für Shops wie deinen |
| Fulfillment aus einer Hand | Dein Lager. Dein Versand. Dein Name auf dem Karton. |

**Mehrere Zielgruppen, Miller S. 130:** eine Dachbotschaft oben, je eine eigene
Seite darunter. „1 bis 3 Tage" steht deshalb **nicht** mehr auf der Startseite
(für den China-Dropshipper wäre es falsch), sondern auf der Deutschland-Seite.

* Deutschland: „Deine Pakete sind beim Kunden. In 1 bis 3 Tagen."
* Dropshipping: „Du verkaufst, bevor du einkaufst."
* Import: „Du kaufst direkt in China ein. Ohne je dort gewesen zu sein."

**Der Riegel:** `python3 "/Users/victoria/Projekte/Donald Miller/sb7-pruefen.py" <URL|Ordner>`
prüft Überschriften auf „Wir", H1 ohne Kunden, Floskeln, fehlende Zahlen,
Textlänge. Gegengeprüft: bilderads.de grün, ecomet vorher rot, jetzt grün.

## 4. Import aus China, das dritte Angebot

`/fulfillment/import`, im Menü, im Fuß und als Auswahl im Anfrageformular.

| Seite | für wen | Preis |
|---|---|---|
| `/fulfillment/deutschland` | hat Ware, will schnell liefern | feste Liste + PDF |
| `/fulfillment/china` | testet, bindet kein Kapital | pro Produkt |
| `/fulfillment/import` | Produkt läuft, will Menge | pro Anfrage |

⚠ **Auf der Import-Seite steht bewusst KEINE Zahl.** Mindestmengen,
Stückpreise, Transportkosten, Zollsätze, Laufzeiten und Incoterms hat niemand
belegt. **Nichts davon erfinden.** Sobald Kevin sie nennt, gehören sie nach
`src/inhalte/zahlen.ts` mit Quelle.

## 5. Preise und die PDF

* Kopf heißt „Preise · Lager und Versand aus Deutschland", im Untertitel steht
  ausdrücklich, dass **alle** Preise der Seite fürs deutsche Lager gelten.
* „Import aus China" hieß im Preisblock irreführend so und heißt jetzt
  **„Dropshipping aus China"**, mit dem klaren Satz, dass es dafür keine
  Preisliste gibt.
* **`public/ecomet-preisliste.pdf`** ist neu und direkt verlinkt, statt „per
  Formular anfragen". 7 Seiten, alle Gewichtsstufen, AT, CH, 43 Länder.

⚠ **Das Bauskript der PDF enthält den internen Aufschlag 1,23 und die
Packsy-Einkaufspreise.** Es liegt in
`Projekte/Ecomet/ecomet.partner/Packsy24/preisliste/bauen.py` und **darf nie
in ein öffentliches Repo.** Die PDF selbst ist geprüft sauber: kein „Packsy",
kein „1,23", keine Einkaufspreise.

Vor dem Veröffentlichen korrigiert: sie nannte `ECOMETAPP.DE` und siezte
durchgehend, während die Website duzt. Ihr Titel war „Ihr Lager in
Deutschland — **Wir lagern Ihre Ware**", also derselbe SB7-Fehler.

## 6. Mailadresse

Die Seite nannte überall **`info@e-comet.de`, die es nicht gibt.** Kevin muss
sie erst kaufen und mit Google Workspace verbinden. Die laufende Adresse ist
**`kontakt@e-comet.de`** (nutzt auch Louis). Alex kann weitere anlegen.
Umgestellt auf Kontaktseite, im Formular und in der PDF. **Welche Adresse am
Ende gilt, entscheidet Kevin später.**

Die `ecometapp.de`-Adressen in Impressum, Datenschutz und AGB sind
unangetastet, die hängen an der offenen Impressum-Entscheidung.

---

## ⛔ OFFEN UND WICHTIG: das Formular benachrichtigt niemanden

`POST /api/anfrage` schreibt die Anfrage **nur in Supabase**. Es geht **keine
Mail raus**, niemand wird benachrichtigt. Stand 25.08. abends liegen **0
Anfragen**, es ist also noch nichts verloren gegangen. Jetzt, wo die Seite
live ist, versandet die erste echte Anfrage, wenn niemand zufällig in die
Datenbank sieht.

Zwei Wege, Kevin entscheidet: Mailversand anhängen (Resend, kostenlos bis
3.000 Mails im Monat) oder eine tägliche Prüfung auf Mac 2.

**Beim Testen gefunden und behoben:** die Auswahl „Import" wäre gescheitert.
Die API kannte nur vier Wege, und die Tabelle hatte zusätzlich einen
`CHECK`-Constraint `anfrage_weg_check` auf denselben vier Werten. Ein Kunde
hätte entweder eine verschwundene Angabe oder ein 502 bekommen. Constraint
**additiv** erweitert, kein Wert entfernt. Echt durchgetestet: Anfrage mit
`weg=import` abgeschickt, 200, korrekt angekommen, Testdatensatz gezielt
gelöscht, Tabelle wieder bei 0.

## Weiter offen

1. **Fotos.** `Desktop/ecomet-FOTOS-HIER-REIN/` mit vier Unterordnern und
   LIESMICH liegt bereit, **ist noch leer**. Sechs Unterseiten haben null
   Bilder, das ist der größte Hebel. Kevin hat Fotos vom deutschen Lager,
   China-Fotos kann er raussuchen, Packsy-Fotos mit ecomet-Branding müssen
   noch gemacht werden.
   **Ungeklärt:** Kevin sagt „unser ecomet Lager in Deutschland" und getrennt
   davon „Fotos bei Packsy machen". Sind das zwei Orte? Davon hängt ab, ob
   „unser Lager" oder „unser Lagerpartner" geschrieben werden darf.
2. **Impressum.** Steht noch JYS Trade Co., Limited mit Liu Wei. Sobald geklärt,
   in einem Rutsch `ecometapp.de` → `e-comet.de` in Impressum, Datenschutz und
   AGB nachziehen. Beide Rechtstexte sind zudem vom 13. März 2025.
3. **Import-Seite ohne Zahl.** Ab welcher Menge lohnt es sich, wie lange bis
   zur Einlagerung?
4. **Zahlen in Überschriften.** 0 von 26, bilderads hat 10 von 34.
5. Graue statt orange Knöpfe im Seitenabschluss, unterstrichene Überschriften,
   die wie Links aussehen, Trust nur auf der Startseite. Details im TODO.

---

## Gelernt, gilt über ecomet hinaus

1. **Eine bestellte Section wird NIE eigenmächtig ersetzt.** Ich habe die
   Trust-Sektion durch „Was wir dir schriftlich zusagen" getauscht, weil die
   Stimmen unbelegt sind. Kevin hatte sie ausdrücklich so bestellt. Ein Befund
   von mir macht seine Entscheidung nicht zu meiner. Vollständig zurückgedreht.
   Merksatz: melden, weiterbauen was bestellt ist.
2. **Das Regelwerk wird aufgeschlagen, nicht erinnert.** Die StoryBrand-Regeln
   lagen seit dem 20.08. im Ordner, ich habe aus dem Kopf gearbeitet. Es war
   nie ein Wissensproblem, sondern ein fehlender Prüfschritt. Deshalb gibt es
   jetzt `sb7-pruefen.py`.
3. **Ein Filter lässt still Zeilen fallen.** Ich hatte nach „Sie ", „Ihre ",
   „Ihr " gefiltert und Vollständigkeit gemeldet — „**Ihnen**" war nicht in
   der Liste und stand noch in der PDF. Beim Ansehen der gerenderten Seiten
   gefunden, nicht vom Filter.
4. **Ein Laufband reißt rechts auf**, wenn die Verschiebung nicht kleiner ist
   als der Rest dahinter. Bei „zweimal rendern, `-50%`" ab ~1300 px
   Fensterbreite. Formel: Bandbreite ≥ Verschiebung + Fensterbreite.
