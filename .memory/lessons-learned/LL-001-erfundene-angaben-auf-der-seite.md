---
title: LL-001 – Erfundene Angaben stehen auf der Seite, bis jemand die Quelle sucht
tags: [lesson-learned, ecomet, ehrlichkeit, rams-6]
datum: 2026-08-23
---

# LL-001 – Erfundene Angaben stehen auf der Seite, bis jemand die Quelle sucht

## Was ist passiert

Beim Durchgehen der fertig gemeldeten Seite fanden sich acht Angaben, für die es
keine Quelle gab:

- zwei Preiszeilen auf `/preise`, die in keiner Preisliste stehen
  („Jeder weitere Artikel 0,36 €", „Wareneingang je Palette 18,45 €")
- sechs Zusagen zum Versand am selben Tag, obwohl der Packsy-Vertrag nicht
  unterschrieben ist und keine Cutoff-Zeit vereinbart wurde
- ein Versprechen, die Pflichten aus dem Verpackungsgesetz zu übernehmen, was
  nach § 9 VerpackG gar nicht zulässig ist
- eine Bewertungszahl „1.475+ Empfehlungen" ohne Beleg
- sechs erfundene Kundenstimmen mit vollen Namen in `testimonials.tsx`, tot im
  Repo, aber auf ecometapp.de live

## Ursache

Beim schnellen Bauen wird Fülltext geschrieben, der plausibel klingt. Er wirft
keinen Fehler. Der Build ist grün, die Seite sieht vollständig aus. Der Wächter,
der genau das hätte finden sollen, war in der Übergabe beschrieben, aber nie
gebaut worden. Und der erste Entwurf des Wächters las nur `zahlen.ts`, während
zwölf Beträge direkt in den Seiten daneben klebten.

## Loesung

- `skripte/zahlen-pruefen.mjs`: importiert `zahlen.ts` wirklich (Node ab 22
  entfernt die Typen selbst) und sucht zusätzlich jeden Geldbetrag in `src/`,
  der nicht aus dieser Datei kommt
- jede Zahl trägt `geprueft` und `quelle`
- `zeigen()` filtert ungeprüfte Zahlen aus der Anzeige, `Bewertung()` gibt ohne
  Beleg `null` zurück. Ein Platzhalter kann gar nicht mehr live gehen
- jede verbliebene Aussage wurde gegen die Originalquelle geprüft: Packsy24
  Infosheet Juli 2026, ecomet Preisliste 21.08.2026, dhl.de

## Regel fuer die Zukunft

**Ein Satz, der eine Leistung zusagt, braucht eine Quelle, genau wie eine Zahl.**
„Versand am selben Tag" ist eine Zusage und gehört geprüft, auch wenn keine
Ziffer darin vorkommt. Vor dem Melden: jede Zusage laut lesen und fragen, in
welchem Dokument sie steht. Steht sie nirgends, fliegt sie raus oder wird auf
das gekürzt, was belegt ist.

**Und: ein Wächter, der nur eine Datei liest, bewacht die Seite nicht.**
Nach dem Bauen gegenprüfen, was er ausschließt.
