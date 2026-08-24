# Plan · Das ecomet-Konto und der Weg zur Plattform

Stand 24.08.2026 abends. Geschrieben, weil Kevin gesagt hat „ja plane erst,
ich arbeite morgen weiter". **Hier wird nichts gebaut, das ist der Plan.**

---

## 1. Die Entscheidung, auf der alles steht

**Das ecomet-Konto ist die Wurzel, nicht der Shop.** E-Mail und Passwort, bei uns.
Shopify ist eine **Verbindung unter dem Konto**, kein Türsteher davor.

Kevin am 24.08.: „ein ecomet account macht doch mehr sinn als immer über shopify
login alles zu machen ... also shopify klar ist connected aber auch einfach ein
email passwort ding."

⚠ **Angenommen, nicht ausdrücklich bestätigt:** dass das Konto-System **bei uns**
im Website-Projekt liegt und nicht in Alex' Worker. Kevin hat auf die Frage „ja
plane erst" geantwortet. Meine Empfehlung stand daneben und ich plane danach.
**Wenn das falsch ist, kippt Block B.**

### Warum nicht über Shopify anmelden

- Ein Händler mit zwei Shops wäre zwei Kunden.
- Malte hat nur das deutsche Lager und **gar kein Shopify**. Er wäre kein Kunde.
- Kommt später WooCommerce oder Amazon dazu, fängt man von vorne an.
- Es passt zu der Entscheidung, die schon steht: **ein Konto bei uns, der Händler
  sieht Unify nie.**

### Der Sicherheitsgrund, der es dringend macht

**`/api/settings` in ecomet.invoices gibt den Lexware-Schlüssel heraus, wenn man
nur die Shop-Domain kennt.** Keine Anmeldung, keine Prüfung. Das ist kein
Tippfehler, das ist die Folge davon, dass die Shop-Domain als Ausweis gilt.
Shop-Domains sind öffentlich. Mit echten Konten ist diese ganze Klasse von Loch zu.
**Das gehört unabhängig vom Plan geschlossen, bevor Werbung auf invoices läuft.**

---

## 2. Der Aufbau

```
ecomet-Konto  (E-Mail + Passwort, Supabase Auth, unser Projekt)
   │
   ├── Händler      Firma, Rechnungsdaten, Ansprechpartner
   │     ├── Shops      Shopify heute, Plattform-Feld für später
   │     ├── Lager      Packsy-Kundennummer, Bestände, Sendungen
   │     ├── Import     läuft über Unify, für den Händler unsichtbar
   │     └── Abos       invoices, dispute, was noch kommt
   └── Mitglieder   mehrere Menschen dürfen an denselben Händler
```

**Warum „Händler" zwischen Konto und Shop steht:** damit zwei Leute aus derselben
Firma dieselben Zahlen sehen und damit ein Händler mehrere Shops haben kann. Ohne
diese Ebene baut man sich in vier Wochen selbst zu.

**Passwörter bauen wir nicht selbst.** Supabase liegt im Website-Projekt schon
(Projekt „ecomet website", `tkbyvdjcelscradewkgt`). Anmeldung, Zurücksetzen,
Bestätigungsmail und Rechteprüfung per RLS kommen dort fertig mit.

---

## 3. Die zwei Wege hinein, beide enden gleich

| Weg | Ablauf |
|---|---|
| **Aus der Shopify-App** | Händler installiert die App im Admin, beim ersten Öffnen einmal E-Mail eingeben, fertig. Konto ist da, Shop hängt dran |
| **Über e-comet.de** | Konto anlegen, dann „Shop verbinden" drücken, kurz zu Shopify, zurück, fertig |

Zusätzlich **„Mit Shopify anmelden"** als Abkürzung für Leute, die schon in der App
sitzen. Legt im Hintergrund dasselbe ecomet-Konto an. **Abkürzung, nicht Hauptweg.**

**Kein Kunde geht den Weg zweimal.** Wer schon ein Konto mit derselben E-Mail hat,
bekommt den Shop an das bestehende Konto gehängt, kein zweites Konto.

---

## 4. Was von Alex kommen muss

Kevin am 24.08.: „wir sind ein team ich kann uns zugriff auf alles holen." Damit
ist das keine Bitte mehr, sondern eine Aufgabenteilung. Gebraucht wird:

1. **Shopify-Zugriff auch von ausserhalb des Admins.** Die App hat je Shop einen
   Access Token. Damit e-comet.de Zahlen zeigen kann, muss dieser Weg offen sein.
2. **Eine Schnittstelle am Worker**, über die unsere Seite die Zahlen eines Shops
   abfragen darf, mit einem Schlüssel, der zu einem ecomet-Konto gehört.
3. **`/api/settings` in invoices zumachen.** Siehe oben.
4. Später: `invoices` und `dispute` erkennen das ecomet-Konto mit, damit man sich
   einmal anmeldet und nicht dreimal.

**Was NICHT von Alex kommen muss:** das Konto selbst. Das ist der Punkt.

---

## 5. Reihenfolge

| Block | Was | Hängt an |
|---|---|---|
| **A** | Seite live auf e-comet.de: DNS von Alex, erfundene Stimmen raus, Impressum klären | Alex (DNS), Kevin (Impressum) |
| **B** | Konten: Registrieren, Anmelden, Passwort vergessen, Händler und Mitglieder | nichts, kann sofort losgehen |
| **C** | Shop verbinden über Shopify OAuth, Shop hängt am Händler | Shopify-Partner-Token (Feld steht in `.env.local` bereit) |
| **D** | Echte Zahlen im Konto, aus Alex' Worker | Punkt 1 und 2 oben |
| **E** | Ein Login für invoices und dispute mit | Punkt 4 oben |

**A und B laufen nebeneinander.** B braucht niemanden und ist der eigentliche
Unterschied zwischen Website und Plattform.

---

## 6. Was noch offen ist

**Fünf Fragen an Kevin, gestellt am 24.08., unbeantwortet:**

1. Wer steht ins Impressum, solange die LLC nicht steht? Heute steht dort
   **JYS Trade Co., Limited**, also Unify.
2. Die sechs Platzhalter-Kundenstimmen: raus bis es echte gibt, oder drin lassen?
3. Die Bestellkarte am Globus zeigt erfundene Bestellungen. Deko oder raus?
4. Bleibt „Wir antworten am selben Werktag"? Steht auf vier Seiten, ist unsere
   eigene Zusage.
5. Liegt das Konto-System bei uns? Siehe Warnung in Abschnitt 1.

**Dazu offen:** wie ein Lagerkunde ohne Shopify (Malte) im Konto aussieht, und ob
`app.e-comet.de` eine eigene Adresse wird oder ein Bereich unter `e-comet.de`.
