import type { Metadata } from "next";
import { AppSeite, type AppSeitenInhalt } from "@/components/start/app-seite";
import { preise } from "@/inhalte/zahlen";

export const metadata: Metadata = {
  title: "ecomet.dispute | PayPal- und Klarna-Fälle an einem Ort",
  description:
    "Alle Käuferbeschwerden aus PayPal, Klarna und Shopify Payments in einer Ansicht, mit den Belegen, die dazugehören.",
};

/**
 * Funktionen aus dem Quelltext der App (PayPal- und Klarna-Zugangsdaten
 * hinterlegen, Fälle je Anbieter, Abrechnung über die invoices-Brücke:
 * zehn Fälle im Monat frei, danach 0,50 € je Fall).
 *
 * ⚠ Wie bei ecomet.invoices gehört auch diese App heute Alex.
 * Vor dem Livegang klären, siehe Spec, offener Punkt 3.
 */
const inhalt: AppSeitenInhalt = {
  ueber: "ecomet.dispute",
  titel: (
    <>
      Käuferbeschwerden, <span className="accent">ohne Zettelwirtschaft</span>
    </>
  ),
  satz:
    "PayPal, Klarna und Shopify Payments an einem Ort. Du siehst jeden offenen Fall, seine Frist und die Belege, die du brauchst.",
  bild: {
    pfad: "/apps/dispute-uebersicht.png",
    breite: 1425,
    hoehe: 2595,
    alt: "Übersicht von ecomet.dispute mit offenen Fällen",
  },
  nervt: [
    {
      titel: "Drei Portale, drei Logins",
      text: "PayPal hier, Klarna da, Shopify woanders. Ein Fall bleibt liegen, weil ihn niemand gesehen hat.",
    },
    {
      titel: "Fristen laufen still ab",
      text: "Wer nicht rechtzeitig antwortet, verliert automatisch. Und merkt es erst, wenn das Geld weg ist.",
    },
    {
      titel: "Belege zusammensuchen",
      text: "Sendungsnummer, Zustellnachweis, Schriftverkehr. Jedes Mal von vorn, in jedem Portal anders.",
    },
  ],
  schritte: [
    ["Verbinden", "PayPal und Klarna einmal hinterlegen, danach läuft es."],
    ["Fälle sehen", "Alle offenen Fälle in einer Liste, sortiert nach Frist."],
    ["Antworten", "Die Belege liegen dabei, du schickst sie mit einem Klick."],
    ["Erledigt", "Der Fall verschwindet aus der Liste, sobald er entschieden ist."],
  ],
  funktionen: [
    "PayPal-Fälle in einer Liste, mit Frist",
    "Klarna-Fälle in derselben Liste",
    "Shopify Payments Chargebacks dazu",
    "Sendungsnummer und Zustellnachweis liegen am Fall",
    "Antwortvorschlag, den du prüfst und änderst, bevor er rausgeht",
    "Heller und dunkler Modus",
  ],
  nichtDrin: [
    "Sie entscheidet keinen Fall. Das machen PayPal und Klarna",
    "Sie antwortet nichts ohne dich, jede Antwort geht erst nach deiner Freigabe raus",
  ],
  preis: {
    zeile: "Im Plan enthalten",
    zusatz: `Zehn Fälle im Monat sind in ecomet.invoices enthalten. Jeder weitere kostet ${preise.fallPreis.wert}.`,
  },
  fragen: [
    {
      frage: "Muss ich PayPal-Zugangsdaten herausgeben?",
      antwort:
        "Du hinterlegst einen eigenen Zugang für Anwendungen, kein Passwort. Den kannst du in PayPal jederzeit wieder entziehen.",
    },
    {
      frage: "Antwortet die App von allein?",
      antwort:
        "Nein. Sie schlägt eine Antwort vor, abgeschickt wird sie erst, wenn du sie freigibst.",
    },
    {
      frage: "Was ist, wenn ich nur Klarna nutze?",
      antwort:
        "Dann verbindest du nur Klarna. Jeder Anbieter funktioniert für sich.",
    },
  ],
  knopf: { text: "Konto erstellen", ziel: "/registrieren" },
};

export default function FaelleSeite() {
  return <AppSeite inhalt={inhalt} />;
}
