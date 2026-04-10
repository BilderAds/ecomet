---
title: Ecomet – Tech-Stack
tags: [kontext, tech, ecomet]
---

# Tech-Stack

## Framework
- Next.js 16.2.2 (Turbopack)
- React 19.2.4

## Styling
- Tailwind CSS 4
- shadcn/ui (base-nova Style, neutral base color)
- CSS Variables fuer Theme Colors

## Animationen
- Framer Motion 12.38
- Cobe 2.0.1 (Globe)

## Sonstiges
- TypeScript 5
- Lucide React (Icons, ACHTUNG: Instagram Icon existiert nicht in dieser Version)
- tw-animate-css 1.4

## Hinweise
- Cobe v2 hat KEIN onRender Callback. Nutze requestAnimationFrame + globe.update() stattdessen
- Typografische Anfuehrungszeichen in JSX Strings koennen Parsing Fehler verursachen
- AGENTS.md verlangt Next.js Docs zu lesen vor dem Coden (node_modules/next/dist/docs/)
