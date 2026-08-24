# DNS-Sicherung `e-comet.de` · 24.08.2026

**Zweck:** Before-State vor einem möglichen Nameserver-Wechsel bei GoDaddy.
Alles hier am 24.08.2026 selbst per `dig @1.1.1.1` gemessen, nicht aus Erinnerung.

## Wie es heute steht

| | Wert |
|---|---|
| Registrar | GoDaddy, Kevins Konto, in der GoDaddy-Venture „ecomet" |
| Nameserver | `braelyn.ns.cloudflare.com`, `nico.ns.cloudflare.com` |
| DENIC `Changed` | 2026-07-07 19:03 |
| Zone liegt damit in | einem **Cloudflare-Konto, das nicht unseres ist** (vermutlich Alex) |

## Die Einträge, die beim Wechsel MIT MÜSSEN

```
e-comet.de.            MX    10 w01c4689.kasserver.com.
e-comet.de.            TXT   "v=spf1 a mx include:spf.kasserver.com ~all"
_dmarc.e-comet.de.     TXT   "v=DMARC1; p=none;"
```

**Daran hängen zwei echte Postfächer bei All-Inkl:**

- **`fulfillment@e-comet.de`** — die Adresse, mit der **Packsy als Absender zu Kunden schreibt**
- `kontakt@e-comet.de` — das Partner-Postfach

**Fällt der MX weg, schreibt Louis ins Leere und eingehende Kundenmails prallen ab.**
Das ist der einzige wirklich gefährliche Punkt am ganzen Umzug.

## Was auf der Domain heute WEB-seitig läuft: nichts

| Hostname | A-Record | Antwort |
|---|---|---|
| `e-comet.de` | 172.67.202.188 / 104.21.85.57 (Cloudflare-Proxy) | http 200 mit Body `error code: 520`, https **525** |
| `www.e-comet.de` | dieselben | https **525** |
| `fulfillment.e-comet.de` | dieselben | **302 auf sich selbst**, Endlos-Schleife, kein Ursprung |

`fulfillment.e-comet.de` ist im Memory als Partner-Portal geführt. **Es lebt nicht.**

## ⚠⚠ NACHTRAG, und er kippt die Empfehlung: ZWEI APPS LEBEN AUF DIESER DOMAIN

| Hostname | Antwort |
|---|---|
| **`invoices.e-comet.de`** | **https 200**, Titel `ecomet.invoices`. Das ist die laufende Rechnungs-App |
| **`dispute.e-comet.de`** | antwortet `Shop fehlt`, lebt also auch |

Beide antworten über Cloudflare, ohne eigenen Ursprung-Header. Das sind mit sehr
hoher Wahrscheinlichkeit **Cloudflare Worker in Alex' Konto**.

**Ein Worker ist kein DNS-Eintrag.** Er lässt sich nicht abschreiben und bei
GoDaddy nachbauen. Werden die Nameserver umgestellt, sind **ecomet.invoices und
ecomet.dispute sofort offline**, und zwar ohne Weg zurück ausser über Alex.

**Damit ist der Nameserver-Wechsel keine Option mehr**, solange die beiden Apps
dort laufen. Der Weg ist: Alex legt in seiner Zone zwei Einträge an.

Gefunden erst im zweiten Durchgang: `invoices` und `dispute` standen nicht in der
Namensliste unten. Genau die Lücke, vor der der Absatz darunter warnt.

## Was ich gesucht und NICHT gefunden habe

Abgefragt und leer: `mail` `autodiscover` `api` `portal` `dashboard` `test` `staging`
`cdn` `ftp` `webmail` `imap` `smtp` `pop` `shop` `app` `www2` `blog` `docs` `status`
`login` `admin` `agent` `partner` `track` `assets` `m` `mobile` `dev` `beta` `neu`
`vercel` `_acme-challenge`, dazu die DKIM-Selektoren `default` `k1` `k2` `s1` `s2`
`mail` `dkim` `selector1` `selector2` `google` `smtp`.

⚠ **Das ist keine vollständige Zone.** Über DNS sieht man nur, wonach man fragt, ein
Zonentransfer geht nicht. Es kann Einträge geben, deren Namen ich nicht geraten habe.
**Vollständig ist die Liste erst mit einem Blick in die Cloudflare-Zone selbst.**

## Der Weg: Alex legt zwei Einträge an

Ziel ist das Vercel-Projekt **`ecomet-website`** im Team `ecomet1` (unser eigenes Konto,
angelegt am 24.08.2026, Projekt `prj_XdERTMqTLP3hSmCoMyWiyKC7Zy6P`).

```
A      e-comet.de   76.76.21.21            Proxy AUS (graue Wolke)
CNAME  www          cname.vercel-dns.com   Proxy AUS (graue Wolke)
```

Beide Werte kommen aus Vercels eigener Domain-Konfiguration, nicht geraten.
**Proxy muss aus sein.** Bleibt die Wolke orange, kommt wieder 525, genau wie heute.

Mail, `invoices`, `dispute` und `fulfillment` werden dabei nicht angefasst.

**Der Nameserver-Wechsel zu GoDaddy ist verworfen**, siehe Nachtrag oben. Er würde
ecomet.invoices und ecomet.dispute abschalten. Er käme erst wieder in Frage, wenn beide
Apps vorher woanders laufen.
