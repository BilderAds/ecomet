# Übergabe · 25. August 2026, Nachmittag

**Wer hier weitermacht: diese Datei zuerst**, dann
`PLAN-25AUG26-KONTEN-UND-PLATTFORM.md` für den nächsten Block.
Sie löst `UEBERGABE-24AUG26-DOMAIN-UND-KONTEN.md` ab.

---

## Kurzfassung

**`https://e-comet.de` ist seit heute 14:03 Uhr live und öffentlich.** Alex hat
das DNS umgestellt, das TLS-Zertifikat fehlte noch, das ist jetzt gesetzt.

Beim Nachsehen kam ein zweiter Befund heraus, der wichtiger ist als der erste:
mit dem Livegang standen **sechs erfundene Kundenstimmen mit vollen Namen und
„1.475+ Empfehlungen" öffentlich im Netz.** Beides ist raus und neu deployt.

---

## 1. Warum die Seite nicht ging, und was es wirklich war

Kevins Screenshot zeigte `ERR_CONNECTION_CLOSED`. Gemessen:

| geprüft | Ergebnis |
|---|---|
| `dig A e-comet.de` | `76.76.21.21`, also Vercel. Alex hat geliefert |
| `dig CNAME www` | `cname.vercel-dns.com`, ebenfalls richtig |
| Cloudflare-Proxy | aus, es kommen echte Vercel-IPs zurück |
| CAA-Record am Apex | keiner, also kein Blocker |
| **Port 80 (http)** | **200, unsere Seite kam durch** |
| **Port 443 (https)** | **Verbindung bricht ab** |
| Zertifikate im Team | **keine, `/v4/certs` war leer** |

Alex' Teil war also fertig. Es fehlte allein das TLS-Zertifikat auf unserer
Seite. Vercel hatte beide Domains als `verified: true` stehen und trotzdem nie
eines ausgestellt.

**Behoben** über `POST /v3/certs` mit beiden Namen:

```
cert_vpjzfWQi0sSRX8EMZtJGTjK8
Let's Encrypt, ausgestellt 25.08.2026 12:03 UTC, gültig bis 23.11.2026
autoRenew: true
```

Danach geprüft: `https://e-comet.de` und `https://www.e-comet.de` liefern 200,
`http` leitet mit 308 auf `https` um. Alle **13 Seiten** einzeln aufgerufen,
jede 200, die 404-Seite antwortet auch richtig. Beide Links nach draußen
geklickt.

> **Wenn die Domain nochmal stumm ist:** erst `dig`, dann `curl` auf Port 80
> UND 443 getrennt. Geht 80 und 443 nicht, ist es fast immer das Zertifikat,
> nicht das DNS.

---

## 2. Der eigentliche Fund: die Seite ging mit erfundenen Bewertungen live

Die Übergabe vom 24.08. hatte es als Bedingung notiert: „Sobald die Domain
zeigt, ist die Seite öffentlich. Vorher müssen die erfundenen Stimmen und das
Impressum weg." Die Domain zeigte, die Stimmen standen noch drin.

Live standen:

* **sechs erfundene Personen mit vollem Namen und Rolle** (Keanu Fuchs, Lisa
  Janzen, Daniel Bergmann, Daniel Waimer, Franzi Schneider, Tobias Beyer), je
  mit fünf Sternen. Im Code selbst seit Tagen als „nicht belegt" markiert.
* **„★★★★★ 1.475+ Empfehlungen"**, zweimal auf der Startseite.

Der Wächter im Projekt stand dazu passend auf **rot**: „Erst klären, dann live."

### Der harte Gegenbeleg vom 25.08.

Die Notiz vom 23.08., ecomet liege nicht im Shopify App Store, ist **überholt**.
Die App ist dort:

```
apps.shopify.com/ecomet
Entwickler: Alexander Günter · 5 $/Monat
Rating 0,0  ·  0 Reviews
```

Damit steht es Dokument gegen Dokument: die einzige öffentliche
Bewertungsquelle, die ecomet hat, steht auf **null**, während die Seite
1.475 Empfehlungen über fünf Sternen behauptete. Das ist kein Verdacht mehr.
§ 5b Abs. 3 UWG, abmahnfähig. Trustpilot hat CJ Dropshipping und Sellvia für
genau das die Bewertung entzogen.

### Was gebaut wurde

Es ist nichts leer geräumt worden, die Flächen sind alle noch da:

| Stelle | vorher | jetzt |
|---|---|---|
| Bühne, über der Überschrift | ★★★★★ „1.475+ Empfehlungen" | **„500.000 € Warenversicherung im Lager"**, belegt aus Vertrag § 5.6. Sterne weg, die gezeichneten Köpfe stehen weiter |
| Trust-Sektion, Laufband | 6 erfundene Personen, „Was unsere Kunden sagen" | **„Was wir dir schriftlich zusagen"**, sieben Zeilen aus dem Kooperationsvertrag: 12-Uhr-Cutoff, 99 % Bestandsgenauigkeit, 500.000 €, 1 Mio. € Haftpflicht, 0,5 % Fehlerquote, 0 € Grundgebühr, 2 Werktage Retoure |

Beides ist umschaltbar, ohne dass jemand am Layout arbeiten muss:

* **Echte Stimmen:** in `src/inhalte/stimmen.ts` eintragen, `beleg` ausfüllen
  (ein WhatsApp-Screenshot reicht). **Ab vier belegten Stimmen schaltet das
  Laufband von selbst auf die Kundenstimmen zurück.** Kandidaten stehen im
  Code: **Beni und Malte.**
* **Echte Bewertungszahl:** in `zahlen.ts` bei `empfehlungen` eintragen,
  `geprueft: true`, Quelle dazu, `geparkt` entfernen, und in `buehne.tsx`
  wieder `empfehlungen` statt `buehneTrust` verwenden.

### Der Wächter kann jetzt „geparkt"

Ohne das stünde er ab sofort dauerhaft auf rot, weil „1.475+" ja noch in der
Datei liegt, und ein Wächter, den man wegen Dauerrot ignoriert, ist keiner.

`geparkt: true` heißt: steht in der Datei, wird nirgends angezeigt. Damit das
kein Freifahrtschein wird, **durchsucht der Wächter jede .tsx nach der
geparkten Variable und wird rot, sobald sie doch irgendwo gerendert wird.**
Gegen den echten Fehler getestet: mit einer Testdatei, die `empfehlungen`
benutzt, schlägt er an; ohne sie ist er grün.

---

## 3. Das „Made by BilderAds"-Badge, von Kevin an der Live-Seite gefunden

Zwei Fehler in einem Element:

1. **Unlesbar.** Eingebunden war `made-by-bilderads-light.png`. „light" ist die
   Fassung für **helle** Hintergründe, der Schriftzug ist dort fast schwarz
   (27,27,27). Auf unserem dunklen Grund war er praktisch unsichtbar.
2. **Nicht bündig.** Die Datei ist 320 px breit, der sichtbare Inhalt beginnt
   aber erst bei **Pixel 35**. Bei Anzeigebreite 160 sind das rund **17 px
   unsichtbarer Rand links** — genau der Versatz, den Kevin gesehen hat.

**Gebaut:** `public/made-by-bilderads-weiss.png`. Schriftzug auf Weiß umgefärbt
(Alphakanal behalten, dadurch saubere Kanten), **das Ba-Logo selbst
unangetastet**, transparenter Rand abgeschnitten. 252×78, angezeigt in 168×52,
also exakt zwei Drittel, keine Verzerrung.

Nachgemessen am Screenshot der Live-Seite, linke Kanten in Pixeln:

```
BilderAds           365
An der Glasfach…    364
53359 Rheinbach     365
Website:            364
E-Mail:             365
Badge               364   ← vorher 17 px daneben
```

---

## 4. Was jetzt LIVE noch falsch ist, und Kevin entscheiden muss

### a) Das Impressum nennt eine fremde Firma

`https://e-comet.de/impressum` zeigt aktuell:

```
ecomet betrieben durch: JYS Trade Co., Limited
Room 2914, Ho King Commercial Centre, Kowloon, China
Vertretungsberechtigter: Liu Wei, Director
E-Mail: info@ecometapp.de
Website: www.ecometapp.de
```

Zwei getrennte Punkte:

* **Wer der Betreiber ist, ist Kevins Entscheidung**, nicht meine. Die Frage
  aus der Übergabe vom 24.08. („Wer ins Impressum, solange die LLC nicht
  steht?") ist weiter offen. Ich habe daran **nichts** geändert.
* **Die Domain darin ist aber schlicht falsch.** Impressum,
  Datenschutzrichtlinie und Nutzungsbedingungen verweisen alle auf
  `ecometapp.de`, die Seite läuft jetzt aber auf `e-comet.de`. Das ist ein
  reiner Faktenfehler und sollte weg, sobald Punkt eins geklärt ist. Auf der
  Kontaktseite steht bereits `info@e-comet.de`, das passt nicht zusammen.

### b) Datenschutz und AGB sind vom 13. März 2025

Beide Seiten tragen „Letzte Aktualisierung: 13. März 2025" und beschreiben
`ecometapp.de`. Sie beschreiben nicht, was diese Seite tut.

### c) Die fünf Köpfe in der Bühne

Sie stehen noch, weil es gezeichnete Figuren sind, die niemanden als echte
Person ausgeben, und weil es Kevins Aufbau von der alten Seite ist. Neben einer
Sachaussage statt einer Bewertung sind sie jetzt allerdings reine Deko. **Sag
Bescheid, wenn sie weg sollen**, das ist ein Einzeiler.

---

## 5. Stand der Technik

| | |
|---|---|
| Domain | `e-comet.de` + `www`, beide verifiziert, beide mit Zertifikat |
| Projekt | `ecomet-website`, Team `ecomet1` |
| Deploy | `dpl_HkitH68EQZWFNa8TaNrvBK9HrLTL`, production, READY |
| Build | grün, 15 Routen |
| Wächter | **grün**, mit sichtbarem Hinweis auf die eine geparkte Zahl |
| Nachgeprüft | alle 13 Seiten live 200, beide Außenlinks 200 und inhaltlich echt |

`invoices.e-comet.de` und `dispute.e-comet.de` laufen unverändert über
Cloudflare in Alex' Konto. Am Nameserver wurde **nichts** angefasst, der
Wechsel bleibt verworfen.
