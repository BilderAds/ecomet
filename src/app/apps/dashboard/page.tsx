import type { Metadata } from "next";
import { AppSeite, type AppSeitenInhalt } from "@/components/start/app-seite";

export const metadata: Metadata = {
  title: "die ecomet App | Bestellungen, Produkte und dein Rohertrag",
  description:
    "Die App für deinen Shopify-Shop: Bestellungen, Produkte, Sourcing-Anfragen, Werbekosten und dein Rohertrag in einem Fenster.",
};

/**
 * Die Funktionsliste stammt aus dem Quelltext der App (neun Ansichten,
 * Stand 15.08.2026), nicht aus Erinnerung.
 */
const inhalt: AppSeitenInhalt = {
  ueber: "die ecomet App",
  titel: (
    <>
      Dein Shop und dein Lager <span className="accent">im selben Fenster</span>
    </>
  ),
  satz:
    "Du installierst sie in Shopify. Ab dann laufen Bestellungen, Produkte und Anfragen automatisch durch, und du siehst, was am Ende übrig bleibt.",
  bild: {
    pfad: "/apps/dashboard-uebersicht.png",
    breite: 1440,
    hoehe: 1700,
    alt: "Übersicht der ecomet App mit Rohertrag, Bestellungen und Grafik",
  },
  nervt: [
    {
      titel: "Du rechnest im Kopf",
      text: "Umsatz steht in Shopify, Kosten stehen woanders, Werbung wieder woanders. Was übrig bleibt, weiß niemand genau.",
    },
    {
      titel: "Bestellungen tippst du ab",
      text: "Jede Bestellung wandert von Hand ins Lager. Ein Zahlendreher in der Adresse, und das Paket ist weg.",
    },
    {
      titel: "Du fragst nach Sendungsnummern",
      text: "Der Kunde will wissen, wo sein Paket ist. Du schreibst dem Lager und wartest.",
    },
  ],
  schritte: [
    ["Installieren", "Ein Klick im Shopify App Store. Kein Vertrag, keine Einrichtungsgebühr."],
    ["Verbinden", "Produkte und Bestellungen kommen automatisch an."],
    ["Lager wählen", "Deutschland, China oder beides, je Produkt."],
    ["Zusehen", "Sendungsnummern landen von selbst in Shopify und beim Kunden."],
  ],
  funktionen: [
    "Übersicht mit Rohertrag als größter Zahl, nicht neun gleich laute Kennzahlen",
    "Bestellungen mit Status und Sendungsverfolgung",
    "Produkte samt Einkaufspreisen",
    "Sourcing-Anfragen stellen und Angebote annehmen",
    "Rechnungen des Lagers an einem Ort",
    "Werbekosten aus Meta, damit der Rohertrag stimmt",
    "Support direkt aus der App, ohne Ticketsystem",
    "Heller und dunkler Modus",
  ],
  nichtDrin: [
    "Sie verschickt nichts selbst, das machen unsere Lager",
    "Sie ersetzt keine Buchhaltung, dafür gibt es ecomet.invoices",
  ],
  preis: {
    zeile: "Kostenlos",
    zusatz:
      "Die App selbst kostet nichts. Du zahlst nur, was Lagerung und Versand kosten, und das steht vorher fest.",
  },
  fragen: [
    {
      frage: "Brauche ich Shopify?",
      antwort:
        "Ja, die App ist eine Shopify-App. Für andere Shopsysteme sprich uns an, wir prüfen es im Einzelfall.",
    },
    {
      frage: "Was passiert mit meinen Daten?",
      antwort:
        "Wir lesen Bestellungen, Produkte und Kundenadressen, weil wir sonst nicht verschicken können. Zahlungsdaten sehen wir nicht.",
    },
    {
      frage: "Kann ich die App wieder deinstallieren?",
      antwort:
        "Jederzeit, in Shopify mit einem Klick. Es gibt keine Mindestlaufzeit.",
    },
    {
      frage: "Sehe ich, was eine Bestellung kostet, bevor sie rausgeht?",
      antwort:
        "Für das deutsche Lager ja, dort gilt eine feste Preisliste. Beim Dropshipping aus China nennen wir dir den Preis vorab.",
    },
  ],
  knopf: { text: "Konto erstellen", ziel: "/registrieren" },
};

export default function DashboardSeite() {
  return <AppSeite inhalt={inhalt} />;
}
