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
Hinter keinem der drei Hostnamen antwortet ein Ursprung.

## Was ich gesucht und NICHT gefunden habe

Abgefragt und leer: `mail` `autodiscover` `api` `portal` `dashboard` `test` `staging`
`cdn` `ftp` `webmail` `imap` `smtp` `pop` `shop` `app` `www2` `blog` `docs` `status`
`login` `admin` `agent` `partner` `track` `assets` `m` `mobile` `dev` `beta` `neu`
`vercel` `_acme-challenge`, dazu die DKIM-Selektoren `default` `k1` `k2` `s1` `s2`
`mail` `dkim` `selector1` `selector2` `google` `smtp`.

⚠ **Das ist keine vollständige Zone.** Über DNS sieht man nur, wonach man fragt, ein
Zonentransfer geht nicht. Es kann Einträge geben, deren Namen ich nicht geraten habe.
**Vollständig ist die Liste erst mit einem Blick in die Cloudflare-Zone selbst.**

## Der Weg, wenn gewechselt wird

1. In Kevins GoDaddy die Domain `e-comet.de` öffnen und prüfen, ob die Nameserver dort
   änderbar sind (sie sollten es sein, die Domain liegt im eigenen Konto).
2. Zielzone anlegen (eigenes Cloudflare oder GoDaddy-DNS) und **zuerst** MX, SPF und
   DMARC aus dieser Datei eintragen.
3. Erst danach die Nameserver bei GoDaddy umstellen.
4. Nach dem Wechsel gegen `dig MX` und eine echte Testmail an `kontakt@e-comet.de`
   prüfen, dass Mail weiter ankommt.
5. Erst dann die Website-Records auf Vercel zeigen lassen.

**Der risikoarme Gegenweg:** Alex legt in seiner Zone einen einzigen Eintrag für uns an.
Dauert für ihn eine Minute und fasst die Mail überhaupt nicht an.
