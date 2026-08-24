# Übergabe · 24. August 2026 abends

**Wer hier weitermacht: diese Datei zuerst**, dann
`PLAN-25AUG26-KONTEN-UND-PLATTFORM.md`. Die Übergabe vom 23.08. gilt weiter für
alles, was die Seite selbst betrifft.

---

## Was heute passiert ist

### 1. Der Domain-Blocker war ein Missverständnis, aber anders als gedacht

**`e-comet.de` liegt bei GoDaddy in Kevins eigenem Konto** (Kevin: „ich habe
e-comet.de domain auf godaddy"). Die alte Notiz „gehört Alex, ohne ihn kein
Umzug" war falsch.

**Der Nameserver-Wechsel ist trotzdem verworfen.** Grund im zweiten Durchgang
gefunden: **`invoices.e-comet.de` läuft (https 200, Titel „ecomet.invoices") und
`dispute.e-comet.de` läuft auch.** Beide sind Cloudflare Worker in Alex' Konto.
Ein Worker ist kein DNS-Eintrag, er lässt sich nicht abschreiben und woanders
nachbauen. Nameserver umstellen heisst: **beide Apps sofort offline.**

Kevin hat es bestätigt: „alex unser dev, der dns ding liegt bei ihm wegen den
ganzen shopify apps".

Alles gemessene DNS plus die Begründung: `DNS-SICHERUNG-e-comet.de-24AUG26.md`.

### 2. Ein eigenes Vercel-Projekt, unabhängig vom fremden Konto

Das Projekt mit `ecometapp.de` gehört uns nicht, unser Token sieht nur Team
`ecomet1`. Deshalb neu angelegt und deployt:

| | |
|---|---|
| Projekt | **`ecomet-website`**, Team `ecomet1` |
| Projekt-ID | `prj_XdERTMqTLP3hSmCoMyWiyKC7Zy6P` |
| Adresse | `https://ecomet-website-fyc1mu1l3-ecomet1.vercel.app` |
| Schutz | `ssoProtection: all_except_custom_domains`, also **Vercel-URL hinter Login, eigene Domain offen** |
| Domains hinterlegt | `e-comet.de` und `www.e-comet.de`, warten auf DNS |
| Env gesetzt | die drei Supabase-Schlüssel, production, preview, development |

Deploy lief aus dem lokalen Ordner, **ohne Git-Anbindung**. `main` und die
Live-Seite sind dadurch nicht berührbar.

⚠ **Sobald die Domain zeigt, ist die Seite öffentlich**, weil der Schutz eigene
Domains ausnimmt. Vorher müssen die erfundenen Stimmen und das Impressum weg.

### 3. Bei Alex angefragt, Stand offen

Kevin hat die Nachricht am 24.08. gesendet. Verlangt sind zwei Einträge:

```
A      @     76.76.21.21            Proxy AUS (graue Wolke)
CNAME  www   cname.vercel-dns.com   Proxy AUS (graue Wolke)
```

**Um 24.08. abends noch nicht gesetzt**, `dig` zeigt weiter die
Cloudflare-Proxy-IPs, `https://e-comet.de` gibt weiter **525**.
Als Erstes morgen: `dig +short A e-comet.de` prüfen.

### 4. Der Plan fürs Konto steht

Kevin: „ein ecomet account macht doch mehr sinn als immer über shopify login".
Richtig, und begründet in `PLAN-25AUG26-KONTEN-UND-PLATTFORM.md`. Kurzfassung:
**ecomet-Konto ist die Wurzel, Shopify ist eine Verbindung darunter.**
Block B (Registrieren, Anmelden, Händler, Mitglieder) braucht niemanden und kann
sofort losgehen.

---

## Was auf ecometapp.de weiterhin LIVE falsch steht

Unverändert seit der letzten Übergabe, heute erneut abgerufen:
**sechs erfundene Kundenstimmen mit vollen Namen und zehnmal „1,475+
Empfehlungen"** ohne Quelle. § 5b Abs. 3 UWG. Dazu das Impressum mit
JYS Trade Co., Limited.

---

## Fünf Fragen an Kevin, gestellt, unbeantwortet

1. Wer ins Impressum, solange die LLC nicht steht?
2. Platzhalter-Stimmen raus oder drin lassen?
3. Erfundene Bestellkarten am Globus: Deko oder raus?
4. Bleibt „Wir antworten am selben Werktag"?
5. Liegt das Konto-System bei uns oder bei Alex?

---

## Nebenbei, gehört nicht zur Website

**Unify-Commission 24.08., 06:00:15 China: 9.621,80 €.** Kurzfenster seit 16.08.
**50,03 €/Tag** gegen 50,79 €/Tag im Vorfenster. Zwei Fenster gleich, der
Einbruch ist damit das neue Niveau, nicht der Ausreisser. Reihe lang fällt von
130,14 auf **113,71 €/Tag**. Bis 10k fehlen 378,20 €, also **31.08. bis 01.09.**
Gepflegt in `Ecomet/ecomet.dokumente/tagesumsatz.md`.
