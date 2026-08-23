---
title: Ecomet – Projektbeschreibung
tags: [projekt, ecomet]
status: deploy-ready
erstellt: 2026-04-04
---

# Ecomet

## Projekttyp
Neubau (Modus A, Approach A)

## Kunde
- **Unternehmen:** Ecomet
- **Branche:** Dropshipping Fulfillment
- **Website:** ecometapp.de

## Ziel der Website
Landing Page fuer Dropshipping Fulfillment Service im DACH Raum. Kunden sollen sich kostenlos registrieren und ihren Shopify Shop verbinden. Hauptargumente: 4-8 Tage Lieferzeit, Qualitaetskontrolle, persoenlicher Agent in China.

## Tech-Stack
- Next.js 16 + React 19
- Tailwind CSS 4
- shadcn/ui (base-nova Style)
- Framer Motion (Animationen)
- Cobe (Globe Animation mit Bestellungs-Popups)
- DiceBear Notionists (Avatare)
- TypeScript

## GitHub
- Repo: https://github.com/BilderAds/ecomet
- Branch: main
- Deploy: Vercel (in Einrichtung)

## Seiten und Sections
### Hauptseite (One-Pager):
1. Navigation (sticky, dark, mobile menu, alle Links funktionieren)
2. Hero (Globe mit "Neue Bestellung" Popups, DiceBear Avatare, getrennte Mobile/Desktop Layouts)
3. Marquee Trust Ticker
4. Pain Points / Solutions (Sticky Scroll Transition, Cards flippen einzeln von rot zu gruen beim Scrollen)
5. Solution Section ("Du verkaufst & wir liefern", 3 Benefits, dark)
6. Steps (3 Schritte zum Start)
7. Testimonials (6 Kundenstimmen Grid)
8. Features (6 Funktionen Cards)
9. FAQ (9 Fragen Accordion)
10. Final CTA (Gradient Background)
11. Footer (Logo, Nav, Social Links, Legal Links)

### Unterseiten:
- /impressum (Firmendaten + Made by BilderAds Badge)
- /datenschutzrichtlinien (von ecometapp.de uebernommen)
- /nutzungsbedingungen

## Brand
- **Primary Color:** #FF642C (Orange, Wert aus dem ecomet-Baukasten kit.js)
- **Dark:** #EF5615
- **Light:** #FF8A50
- Bis 23.08.2026 standen hier faelschlich #F26B2B und #D4571E, damit lagen zwei
  Orangetoene auf einer Seite.
- **Font:** Inter
- **Logo:** icon-logo.png + text-logo-white.png in public/
- **Registrierungs-Link:** gtapp.unifydropshipping.com/auth/register?share=B031...

## Status
Deploy-ready. Auf GitHub gepusht (BilderAds/ecomet). Bereit fuer Vercel.

## Sessions

| Datum | Nr | Zusammenfassung |
|---|---|---|
| 2026-04-04 | 1 | Projektordner und Memory-Struktur erstellt |
| 2026-04-05 | 1 | Komplette Website gebaut: alle Sections, Globe Animation, Orange Theme |
| 2026-04-09 bis 11 | 1 | Scroll Transition, Mobile Optimierung, Unterseiten, Links, GitHub Push |
| 2026-08-23 | 1 | Relaunch als Plattform: 14 Seiten, dark-glass, Anfrageformular auf Supabase |
| 2026-08-23 | 2 | Erfundene Angaben raus, Zahlen an eine Stelle, Waechter gebaut, tote Bauteile geloescht |

## Offene Punkte / Naechste Schritte

Der aktuelle Stand steht in `docs/UEBERGABE-23AUG26-RELAUNCH.md`, dort auch die
neun Punkte, die Kevin entscheiden muss, bevor etwas live geht.

- [ ] Vercel Deploy abschliessen + Custom Domain
- [ ] Mobile Globe Popups Position feintunen
- [ ] OG Images fuer Social Sharing
- [ ] Analytics/Tracking einrichten
- [ ] Performance Check nach Deploy
