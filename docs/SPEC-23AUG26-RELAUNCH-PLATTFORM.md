# Spec: ecomet Relaunch als Plattform

**Stand 23.08.2026.** Wer hier weitermacht, liest diese Datei zuerst und danach
`../README.md`. Diese Spec ersetzt jede ältere Planung zur ecomet Website.

Kevins Auftrag am 23.08.: die Website auf den heutigen Stand bringen (Apps, deutsches
Fulfillment, Import), sie zur Webapplikation ausbauen, in der der Händler seine
Shopify-Zahlen sieht, und sie für Werbung tauglich machen mit einer eigenen Seite je App.
Dazu der Domainumzug auf **e-comet.de**. Kevin wörtlich: „je simpler desto besser,
hauptsache alle Funktionen sind am Start".

---

## 1. Ausgangslage, selbst geprüft am 23.08.

| Was | Stand |
|---|---|
| Website `ecometapp.de` | Next 16 auf Vercel, Repo `BilderAds/ecomet`. **Ein Onepager** plus Impressum, Datenschutz, Nutzungsbedingungen |
| Inhalt | reines China Dropshipping. Deutsches Fulfillment kommt mit keinem Wort vor |
| Jeder Knopf | führt live auf `gtapp.unifydropshipping.com/auth/register`, also direkt zum Partner |
| Konto, Anmeldung, Dashboard | gibt es nicht |
| `e-comet.de` | Parkseite, leitet auf `/lander`, über https Fehler 525. Praktisch leer |
| `app.e-comet.de` | existiert nicht, frei |
| `invoices.e-comet.de`, `dispute.e-comet.de` | laufen, Cloudflare Worker von Alex |
| `fulfillment.e-comet.de` | die Haupt-App, Alex' Worker, Shopify Embedded App |

**Apps, die es gibt:** die ecomet App (Händler-Dashboard, neun Ansichten),
ecomet.invoices (Rechnungen, 20 Euro im Monat), ecomet.dispute (PayPal und Klarna),
ecomet.edit (Video, live auf Vercel), eine Mobile-App (Expo).
**Auf die Website kommen nur die ersten drei.** Kevin am 23.08.: Mobile haben wir nicht,
ecomet.edit kommt erstmal nicht mit rein.

**Namensregel:** `ecomet.` und dahinter der App-Name. Also `ecomet.invoices` und
`ecomet.dispute`, die Haupt-App heißt „die ecomet App". Kevin: „das naming system ist clean".

---

## 2. Positionierung

ecomet ist die deutsche Plattform für Händler, die ihre Ware aus China holen oder aus einem
deutschen Lager verschicken, und die dafür nur ein Konto haben wollen.

**Was der Markt hergibt** (Recherche 23.08., acht Anbieter geprüft): Niemand besetzt die
Kombination aus China-Sourcing und deutschem Lager glaubwürdig auf Deutsch. German Drop hat
eine echte Lageradresse in Braunschweig, aber keine deutsche Seite. CJ hat das Lager, aber
maschinelle Übersetzung und eine geheime Adresse. Fulfillment-Box ist sauber deutsch, macht
kein Sourcing und nutzt fremde Portalsoftware. Procware ist deutsch und komplett, aber mit
vier Bewertungen winzig. EcomAgent hat unsere Positionierung und eine Blindtext-Website.

**Unsere fünf Punkte, die keiner zusammen hat:** deutsche Firma, benannte deutsche
Lageradresse, eigenes Sourcing-Team, eigenes Dashboard, echtes Deutsch.

**Der Begriff „deutsches Lager" ist bei keinem Anbieter belegt.** Er wird unser tragendes Wort.

**Copy-Regel:** jedes Fachwort im fertigen Text muss aus dem Mund eines Kunden stammen, nicht
aus einer Marktrecherche. Vor dem Ausliefern jedes tragende Substantiv gegen echte
Kundennachrichten prüfen.

---

## 3. Domains

```
e-comet.de              Marketing-Website          (zieht um von ecometapp.de)
app.e-comet.de          die Webapplikation, Login  (neu)
invoices.e-comet.de     ecomet.invoices            (liegt schon dort)
dispute.e-comet.de      ecomet.dispute             (liegt schon dort)
fulfillment.e-comet.de  Haupt-App und Partner-API  (liegt schon dort)
ecometapp.de            dauerhafte Weiterleitung auf e-comet.de
```

**Die Weiterleitung von ecometapp.de wird nie abgeschaltet.** `ecometapp.de` steht in
23 Dateien, darunter zwei, die schon beim Kunden liegen: die `ecomet Preisliste.pdf` und der
`ecomet Leitfaden Verpackungsrecht.pdf`, beide bei Malte. Wird die Weiterleitung abgeschaltet,
laufen Kundendokumente ins Leere.

**Beide Kundendokumente werden neu gebaut**, sobald die Domain steht. Quelle sind die beiden
`bauen.py` in `Projekte/Ecomet/`.

**Zwei Abhängigkeiten, ohne die der Umzug nicht geht:**

1. Das DNS von `e-comet.de` liegt bei Cloudflare (`nico.ns`, `braelyn.ns`), das von
   `ecometapp.de` bei GoDaddy. Dort hängen Alex' Worker, das Konto ist vermutlich seins.
   **Ohne Zugriff auf diese Zone kann die Website nicht umziehen.**
2. Die Mail zieht nicht mit. `ecometapp.de` läuft über Microsoft 365, `e-comet.de` hat Mail bei
   All-Inkl. Steht auf der Website e-comet.de und im Impressum eine Adresse @ecometapp.de,
   sieht das nach zwei Firmen aus. **Vor dem Livegang entscheiden, welche Postfächer gelten.**

---

## 4. Seitenbaum

```
e-comet.de
│
├─ /                                Startseite
│
├─ /fulfillment/deutschland         DE-Lager: 1 bis 2 Tage, Verpackungsrecht,
│                                   Retouren, Preise
├─ /fulfillment/china               Sourcing, Agent, Qualitätskontrolle,
│                                   Branding, 4 bis 8 Tage
│
├─ /apps/dashboard                  die ecomet App
├─ /apps/invoices                   ecomet.invoices
├─ /apps/faelle                     ecomet.dispute
│
├─ /preise                          eine Tabelle DE, eine China
├─ /ueber-uns                       Team, Standorte, warum deutsch geführt
├─ /kontakt                         Formular und Termin
└─ /impressum · /datenschutz · /agb
```

**Warum echte Unterseiten und keine Anker:** nur so kann eine Anzeige direkt auf eine App
zeigen, und nur so ist messbar, welche App zieht.

**Deutschland und China werden getrennt.** Heute findet ein Händler, der ein deutsches Lager
sucht, auf der ganzen Seite kein Wort dazu und ist weg.

**Werbeseiten und Produktseiten sind dasselbe.** Keine zweiten Landingpages im Schatten, die
niemand pflegt. Braucht eine Anzeige eine Fassung ohne Menü, macht das ein Schalter in der
Adresse (`?ad=1`), keine zweite Seite.

---

## 5. Die Seiten im Einzelnen

### 5.1 Startseite

```
1  HERO          Eine Zeile, was wir sind. Ein Konto für Sourcing, Lager
                 und Versand, dazu die Apps. EIN Knopf: Konto erstellen.
2  ZAHLEN        Drei harte Belege. Nur Zahlen, die wir wirklich haben.
3  DER WEG       Produkt finden, Lager (DE oder China), Kunde bestellt,
                 wir packen und versenden, du siehst alles im Konto.
4  ZWEI WEGE     Die Weiche: „Lager in Deutschland" und „Import aus China".
                 Zwei große Karten, jede führt auf ihre Unterseite.
5  DIE APPS      Drei Karten mit echten Bildschirmen, kein Symbol.
6  DAS PROBLEM   Bleibt aus der alten Seite, gekürzt. Läuft heute gut.
7  PREISE        Ein Ausschnitt, Rest auf /preise.
8  STIMMEN       Bewertungen wie heute.
9  FAQ + CTA
```

Block 4 ist die Weiche und der wichtigste neue Teil der Seite.

### 5.2 Die drei App-Seiten, gleicher Bauplan

```
1  HERO       Was die App abnimmt, in einer Zeile. Echter Bildschirm.
2  DAS NERVT  Drei Sätze zum Zustand ohne die App.
3  SO GEHT'S  Drei Schritte mit Bild.
4  FUNKTIONEN Nur was die App WIRKLICH kann, aus dem Quelltext gelesen.
5  PREIS      Klar hingeschrieben.
6  FAQ        Vier Fragen vor dem Installieren.
7  CTA        Konto erstellen oder App installieren.
```

**Punkt 4 ist Pflicht aus dem Code, nicht aus Erinnerung.** Sonst steht auf einer Werbeseite
etwas, das die App nicht kann.

Belegte Ausgangspunkte: ecomet.invoices kostet 20 Euro im Monat mit 7 Tagen Test, Deckel 100
Euro, angebunden an Lexware Office, dazu 10 Fälle im Monat frei und danach 0,50 Euro je Fall.
Die ecomet App zeigt Produkte, Bestellungen, Anfragen, Rechnungen, Werbekosten, Support und
führt den Rohertrag als größte Zahl.

**Ein Widerspruch, der vor dem Bau geklärt gehört:** ecomet.invoices läuft heute unter dem
Branding Alexander Günter / Suptrack. Impressum, Haftungstext und Fußzeile im Worker nennen
ihn, die Infrastruktur heißt `suptrack-invoice-kv` und `suptrack-invoices`. Die Website darf
die App nicht als ecomet-Produkt zeigen, solange das so ist.

### 5.3 Preise

DE-Lager aus der bestehenden Preisliste, Regel Packsy mal 1,23 auf den Cent abgeschnitten,
eine deutsche Bestellung bis 400 g kostet 6,98 Euro.

**Für China gibt es heute keine Preisliste**, siehe Abschnitt 7. Solange die fehlt, steht auf
der Seite keine China-Zahl, sondern eine Anfrage. Nichts erfinden.

---

## 6. Die Webapplikation

**Das Ziel, Kevins Wortlaut:** der Kunde meldet sich nur bei uns an, ein Unify-Konto braucht
er nicht.

### 6.1 Was der Händler sieht

```
app.e-comet.de
├─ /registrieren      ein Konto bei uns
├─ /anmelden
├─ /                  Übersicht: Umsatz, Bestellungen, Rohertrag
├─ /bestellungen      mit Sendungsverfolgung
├─ /produkte
├─ /anfragen          Sourcing-Anfragen
├─ /rechnungen        ecomet.invoices im selben Rahmen
├─ /faelle            ecomet.dispute im selben Rahmen
└─ /konto             Shop verbinden, Zahlungen, Team
```

Eine Anmeldung, eine Seitenleiste, eine Oberfläche. Kein zweites Login, kein Partnername, kein
Fachwort. Ob eine Bestellung über China oder Deutschland läuft, geht den Händler nichts an.

### 6.2 Woher die Daten kommen, belegt

| Anzeige | Quelle |
|---|---|
| Umsatz, Bestellungen, Produkte, Kunden | **Shopify Admin API**, über unsere App |
| Rohertrag, Werbekosten | Shopify plus unsere eigene Berechnung |
| Sendungsverfolgung | **Unify-Callback**, ein Ereignis `SHIPPED` mit Trackingnummer |
| Rechnungen, Gutschriften | ecomet.invoices |
| Fälle | ecomet.dispute |
| Preise, Kosten | **unsere eigene Datenbank** |

**Wichtig und in der Doku nachgelesen:** von Unify kommt genau eine Sache zurück, nämlich die
Trackingnummer, ohne Versanddienstleister. Es gibt keinen Endpunkt für Unifys Lagerbestand,
keinen für Preise, keinen für Guthaben, keinen für Rechnungen. Alles andere, was der Händler
sieht, kommt aus Shopify und von uns. Ein Dashboard, das so tut, als käme mehr aus China,
wäre gelogen.

### 6.3 Die Kontoschicht, die heute fehlt

Alex' Apps kennen keinen Nutzer. Für sie ist die Shop-Adresse die Identität, jeder
Speicherschlüssel endet auf die Shop-Domain. Ein Mensch mit zwei Shops ist für sie zwei
getrennte Dinge, ein Shop mit zwei Mitarbeitern ist ein Ding.

**Neu zu bauen:**

```
nutzer            E-Mail, Passwort, Name
 └─ shop          Shopify-Domain, Zugangstoken, Status
     └─ lager     welcher Weg (DE über Packsy, China über Unify)
         └─ unify_shop_id, app_key, app_secret   (nur bei China)
```

Dazu ein sichtbarer Zustand im Onboarding, etwa „Lager wird eingerichtet", solange die
Freigabe des Partners fehlt. Sonst steht der Kunde vor einer App, die stumm nichts tut.

**Zugangsdaten gehören in einen Tresor, nie in ein Repository.** Die heutigen Unify-Schlüssel
stehen im WhatsApp-Chat vom 17.07.

### 6.4 Anmeldung, ein Vorschlag mit Begründung

Fünf verschiedene Anmeldeverfahren im Bestand lassen sich nicht mit einem Login bedienen.
Die Haupt-App ist eine Shopify Embedded App und funktioniert nur im Shopify-Admin, sie kann
gar nicht in unseren Rahmen. invoices und dispute prüfen heute überhaupt keine Anmeldung,
dort genügt die Shop-Adresse in der Adresszeile.

**Der Weg mit dem wenigsten Neubau:**

1. Die Kontoschicht kommt aus dem Verfahren, das schon steht und das uns gehört, nämlich
   Supabase Auth aus ecomet.edit. Echte Nutzer, Rollen, Einladungen, Löschung nach DSGVO.
2. Alles läuft unter `*.e-comet.de`, damit ein Sitzungs-Cookie für alle Teile gilt.
3. invoices und dispute lernen, unsere Anmeldung zu prüfen. Die Vorlage dafür existiert
   bereits: invoices erzeugt heute einen Einmal-Code, mit dem dispute den Shop übernimmt.
   Das Verfahren wird von shop-bezogen auf nutzer-bezogen umgestellt.
4. Die Haupt-App bleibt in Shopify eingebettet. Aus unserem Konto wird dorthin gesprungen,
   nicht eingebettet.

**Das geht nur mit Alex.** Für `fulfillment.e-comet.de` und `dispute.e-comet.de` liegen hier
nur die Ansichten, nicht das Backend. Die Anmeldung umzubauen heißt, genau die Dateien zu
ändern, die wir nicht haben.

---

## 7. Der Knackpunkt: braucht der Händler ein Unify-Konto

**Technisch nein.** Der Ablauf läuft seit dem 14.08. mit echten Bestellungen: Händler
installiert nur unsere App, wir schieben die Bestellung per `/order/push` zu Unify, Unify
meldet Versand und Trackingnummer zurück, wir setzen sie in Shopify.

**Kaufmännisch verlangt Unify es gerade.** Tom am 21.08. wörtlich: „First, the customer should
have a Unify account, and the order should be pushed to that account. We'll discuss pricing
and payment with the customer, and then fulfill the order." Deshalb liegen Bestellungen eines
echten Kunden seit dem 21.08. unbearbeitet.

Drei Gründe, alle nicht technisch:

1. **Der Preis wird je Bestellung freigegeben**, vom Kontoinhaber.
2. **Bezahlt wird aus dem Guthaben des Kontos**, dem die Bestellung gehört.
3. **After-Sales läuft direkt zwischen Unify und dem Händler.**

Dazu ein offener Fehler: Alex hat nach Doku `/shop/create` je Kunde aufgerufen und die
Shop-Kennung mitgeschickt, trotzdem landete die Bestellung von Kunde B044 unter der
ecomet-Kontonummer B031. Masons Antwort widerspricht der eigenen Doku, in der steht, ein
Schlüssel gelte für alle Shops.

**Mason hat am 21.08. die Lösung zugesagt:** eine Schnittstelle, die beim Anlegen eines Kunden
automatisch ein Unify-Konto samt Schlüssel erzeugt. Kein Termin. Alex hat am 22.08. um
Freigabe von Hand als Zwischenlösung gebeten, **darauf gibt es bis heute keine Antwort.**

### Die eigentliche Frage: Vermittler oder Wiederverkäufer

| | Vermittler, heute | Wiederverkäufer, das Ziel |
|---|---|---|
| Kunde von Unify | der Händler | **ecomet** |
| Konto braucht | der Händler | **nur wir** |
| Preis setzt | Unify, je Bestellung | **wir, fest** |
| Geld fließt | Händler zu Unify, wir bekommen Provision | Händler zu **uns**, wir zu Unify |
| Marke sieht der Händler | Unify | **nur ecomet** |
| Haftung | Unify | **wir** |

**Beim deutschen Lager fährt ecomet das rechte Modell bereits.** Malte hat kein Packsy-Konto
und wird nie eins haben. Eingekauft für 2,30, verkauft für 2,82.

**Was von Unify gebraucht wird, damit der Händler nie ein Konto braucht:**

1. Eine Preisliste statt Angebot je Bestellung.
2. Ein Guthaben oder Zahlungsziel auf ecomet-Ebene statt Vorkasse je Kundenkonto.
3. Klärung, was aus der Provision wird. Sie ist heute die Einnahme, zuletzt rund 50 Euro am
   Tag. Da darf nichts stillschweigend wegbrechen.

**Das ist eine Frage an die Chefs, nicht an den Entwickler-Chat.** Punkt 1 und 2 darf Mason
gar nicht entscheiden. Ein Entwurf der Nachricht liegt im Verlauf vom 23.08.

**Fällt die Antwort negativ aus**, bleibt die ehrliche Fassung: der Händler meldet sich
trotzdem nur bei uns an, wir legen sein Unify-Konto in seinem Namen still im Hintergrund an.
Das kostet eine Zeile im Onboarding, nicht das Produkt.

---

## 8. Technik

**Bestand bleibt:** Next 16, React 19, Tailwind 4, Vercel, Repo `BilderAds/ecomet`. Die
Startseite wird umgebaut, nicht neu erfunden, die vorhandenen Bausteine (Hero, Painpoints,
Marquee, Reveal, Globe) leben weiter.

**Design:** der ecomet-Baukasten aus `Projekte/Ecomet/ecomet.apps/ecomet.dashboard/kit.js` gilt
auch für die Website, damit Website und Apps nicht auseinanderlaufen. Marke `#ff642c`, dunkel
Grund `#08080a`, Inter Variable selbst gehostet, Radien 12 / 20 / 16 / 14, eine Zahl führt.
**In `kit.js` steht das Logo-SVG noch mit `#FF6B00`, das ist falsch und gehört korrigiert.**

**Vor jeder Abnahme:** jede Seite selbst aufrufen, auch in einem abgemeldeten Fenster, auch
die Anmeldung, auch die leeren Zustände und die Fehlerseiten. Jeden Link nach draußen einmal
selbst klicken. Danach `design-check`.

---

## 9. Was NICHT gebaut wird

- Keine Mobile-App auf der Website, kein ecomet.edit. Kevin am 23.08.
- Keine zweiten Landingpages neben den Produktseiten.
- Keine China-Preise, solange es keine Preisliste gibt.
- Kein Blog, kein Hilfe-Center, keine Mehrsprachigkeit in dieser Runde.
- Kein eigenes Bezahlsystem, bevor Abschnitt 7 entschieden ist.

---

## 10. Reihenfolge

**Block 1, geht sofort und hängt an niemandem:** Seitenstruktur, Startseite, beide
Fulfillment-Seiten, drei App-Seiten, Preise, Kontakt, Recht. Werbetauglich, live.

**Block 2, braucht die Cloudflare-Zone:** Umzug auf e-comet.de, Weiterleitung, Mail geklärt,
beide Kundendokumente neu gebaut.

**Block 3, braucht Alex:** Konto und Anmeldung, `app.e-comet.de`, Shopify-Anbindung, Übersicht
mit echten Zahlen.

**Block 4, braucht Unify:** automatisches Anlegen im Hintergrund, feste Preise, Guthaben.

Blöcke 1 und 2 hängen nicht an Block 3 und 4. Es wird gebaut, was baubar ist.

---

## 11. Offene Punkte

| # | Punkt | Wer |
|---|---|---|
| 1 | Zugriff auf die Cloudflare-Zone von e-comet.de | Alex |
| 2 | Welche Mailadressen nach dem Umzug gelten | Kevin |
| 3 | ecomet.invoices trägt Suptrack-Branding, darf es als ecomet-Produkt auf die Website | Alex |
| 4 | Backend von Haupt-App und dispute liegt nicht bei uns | Alex |
| 5 | Feste Preisliste für China | Unify-Chefs |
| 6 | Guthaben auf ecomet-Ebene statt je Kundenkonto | Unify-Chefs |
| 7 | Was aus der Affiliate-Provision wird | Unify-Chefs, Fabio |
| 8 | Automatisches Anlegen von Konto und Schlüssel | Mason, zugesagt 21.08., kein Termin |
| 9 | Freigabe von Hand als Zwischenlösung | Unify, Frage vom 22.08. offen |
| 10 | Zuordnungsfehler bei `/order/push`, B044 landet unter B031 | Unify |
| 11 | Falsche Markenfarbe im Logo-SVG in `kit.js` | wir |
| 12 | Sicherheitslage in invoices: `/api/settings` gibt ohne jede Prüfung den Lexware-Schlüssel heraus | Alex, dringend |

**Punkt 12 gehört geradegezogen, bevor eine Website Werbung dorthin schickt.**
