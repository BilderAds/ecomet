import type { Metadata } from "next";
import { AppSeite, type AppSeitenInhalt } from "@/components/start/app-seite";
import { preise } from "@/inhalte/zahlen";

export const metadata: Metadata = {
  title: "ecomet.invoices | Rechnungen und Gutschriften für Shopify",
  description:
    "Rechnung und Gutschrift entstehen automatisch, sobald eine Bestellung bezahlt oder erstattet wird. Mit Anbindung an Lexware Office.",
};

/**
 * Funktionen und Preis stammen aus dem Quelltext des Workers
 * (Plan ecomet.invoices, 20 € im Monat, 7 Tage Test, Deckel 100 €;
 * Webhooks orders/paid und orders/refunds/create; Lexware-Anbindung).
 *
 * ⚠ OFFEN vor dem Livegang: die App läuft heute unter dem Branding
 * "Alexander Günter / Suptrack". Impressum, Haftungstext und Fußzeile im
 * Worker nennen ihn. Diese Seite darf erst live, wenn das geklärt ist.
 * Siehe docs/SPEC-23AUG26-RELAUNCH-PLATTFORM.md, offener Punkt 3.
 */
const inhalt: AppSeitenInhalt = {
  ueber: "ecomet.invoices",
  titel: (
    <>
      Rechnungen schreiben sich <span className="accent">von selbst</span>
    </>
  ),
  satz:
    "Sobald eine Bestellung bezahlt ist, liegt die Rechnung beim Kunden. Wird erstattet, liegt die Gutschrift dabei. Du musst dafür nichts tun.",
  bild: {
    pfad: "/apps/invoices-uebersicht.png",
    breite: 2880,
    hoehe: 1800,
    alt: "Übersicht von ecomet.invoices mit Rechnungen und Kennzahlen",
  },
  nervt: [
    {
      titel: "Rechnungen von Hand",
      text: "Jede Bestellung einzeln in ein Programm tippen. Bei dreißig Bestellungen am Tag ist der Abend weg.",
    },
    {
      titel: "Der Steuerberater fragt nach",
      text: "Am Monatsende fehlen Belege, und niemand weiß mehr, zu welcher Bestellung sie gehörten.",
    },
    {
      titel: "Gutschriften vergisst man",
      text: "Erstattet wird schnell, die Gutschrift dazu schreibt später niemand. Das fällt bei der Prüfung auf.",
    },
  ],
  schritte: [
    ["Installieren", "Ein Klick in Shopify, danach sieben Tage kostenlos testen."],
    ["Absender eintragen", "Firma, Steuernummer, Logo. Einmal, danach nie wieder."],
    ["Erste Bestellung", "Sie wird bezahlt, die Rechnung geht raus und liegt im Archiv."],
    ["Monatsende", "Alles liegt beisammen, auf Wunsch direkt in Lexware Office."],
  ],
  funktionen: [
    "Rechnung automatisch, sobald eine Bestellung bezahlt ist",
    "Gutschrift automatisch bei einer Erstattung",
    "Anbindung an Lexware Office",
    "Alle Belege im Archiv, jederzeit als PDF",
    "Zahlungen und Auszahlungen von Shopify Payments im Blick",
    "Bestehende Bestellungen nachträglich holen, monatsweise",
    "Heller und dunkler Modus",
  ],
  nichtDrin: [
    "Sie macht keine Steuererklärung und ersetzt keinen Steuerberater",
    "Sie verschickt keine Mahnungen",
  ],
  preis: {
    zeile: `${preise.invoicesMonat.wert} im Monat`,
    zusatz:
      "Sieben Tage kostenlos testen. Abgerechnet über Shopify, jederzeit kündbar. Zehn PayPal- oder Klarna-Fälle im Monat sind enthalten, jeder weitere kostet 0,50 €.",
  },
  fragen: [
    {
      frage: "Sind die Rechnungen rechtlich sauber?",
      antwort:
        "Sie enthalten alle Pflichtangaben einer Rechnung nach deutschem Recht. Ob sie zu deinem Fall passen, prüft am Ende dein Steuerberater, das können wir dir nicht abnehmen.",
    },
    {
      frage: "Bekomme ich auch Rechnungen für alte Bestellungen?",
      antwort:
        "Ja. Du kannst vergangene Monate nachträglich holen, dann werden die Belege erzeugt.",
    },
    {
      frage: "Was kostet es bei vielen Bestellungen?",
      antwort:
        "Der Monatspreis bleibt gleich, egal wie viele Rechnungen entstehen.",
    },
    {
      frage: "Brauche ich Lexware?",
      antwort:
        "Nein. Ohne Lexware liegen die Belege im Archiv der App und du lädst sie herunter.",
    },
  ],
  knopf: { text: "Sieben Tage testen", ziel: "/registrieren" },
};

export default function InvoicesSeite() {
  return <AppSeite inhalt={inhalt} />;
}
