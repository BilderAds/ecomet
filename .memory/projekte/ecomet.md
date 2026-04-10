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
- **Primary Color:** #F26B2B (Orange)
- **Dark:** #D4571E
- **Light:** #FF8A50
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

## Offene Punkte / Naechste Schritte
- [ ] Vercel Deploy abschliessen + Custom Domain
- [ ] Mobile Globe Popups Position feintunen
- [ ] OG Images fuer Social Sharing
- [ ] Analytics/Tracking einrichten
- [ ] Performance Check nach Deploy
