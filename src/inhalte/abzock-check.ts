/**
 * Die Texte des Abzock-Checks. Wortwörtlich aus der Bauvorlage
 * `Projekte/Ecomet/dokumente/leadmagnet/ABZOCK-CHECK-LANDINGPAGE-UND-FUNNEL.md`
 * (Stand 14.10.2026). Wer hier etwas ändert, ändert es auch dort.
 *
 * Abweichungen von der Vorlage, von Cee entschieden (Kevin 14.10.: „entscheid selber"):
 * 1. Wertanker: „bei einer Agentur" statt „bei uns". Die 999 € sind der echte
 *    BilderAds-Preis, BilderAds ist eine Agentur, aber nicht ecomet.
 * 2. Danke-Seite: „Termin anfragen" statt „Termin wählen". Es gibt noch keinen
 *    Kalender-Link, der Knopf öffnet eine Mail. Ein Knopf tut, was draufsteht.
 */

/** Block 2 (Fabios Beweis) bleibt aus, bis Kevin Fabios Screenshot und sein Okay hat. */
export const BEWEIS_ZEIGEN = false;

/** Der Beispiel-Report ist noch nicht anonymisiert. */
export const BEISPIEL_ZEIGEN = false;

/**
 * Platzhalter fürs Design (Kevin 14.10.: „wir faken Bewertungen erstmal für
 * das Design" und „pack direkt live"). Sie stehen live, aber jede trägt sichtbar
 * das Etikett „Platzhalter" und heißt „Platzhalter A/B/C". Das Etikett bleibt
 * dran, bis echte Stimmen sie ersetzen: ohne Etikett wären es erfundene
 * Bewertungen (§ 5b Abs. 3 UWG, abmahnfähig).
 */
export const PLATZHALTER_ZEIGEN = true;

export const platzhalterStimmen = [
  { text: "Hat mir in einem Call gezeigt, dass ich 1,80 € pro Stück zu viel zahle.", name: "Platzhalter A", rolle: "Shop, 40 Bestellungen am Tag" },
  { text: "Die Shop-Analyse war konkreter als alles, was ich bisher bezahlt habe.", name: "Platzhalter B", rolle: "Shop, 15 Bestellungen am Tag" },
  { text: "Neues erstes Produktbild, Klickrate spürbar hoch.", name: "Platzhalter C", rolle: "Shop, 25 Bestellungen am Tag" },
];

export const INVOICE_LINK = "https://apps.shopify.com/ecomet-invoice";
export const TERMIN_LINK =
  "mailto:kontakt@e-comet.de?subject=Termin%20zu%20meinem%20Abzock-Check";

/** Ab hier gibt es den Besprechungs-Call. */
export const CALL_AB = ["10 bis 29", "30 bis 99", "100+"];

/** Kurzfassung für die Landingpage: Leute scannen, sie lesen nicht (Kevin 14.10.). */
export const paketeKurz = [
  { titel: "Preis-Check", zeile: "Zahlst du zu viel pro Stück?" },
  { titel: "Shop-Analyse", zeile: "Jede Seite mit Note und Fix" },
  { titel: "7-Bilder-Plan", zeile: "Plus ein fertiges Bild" },
  { titel: "Angle-Liste", zeile: "Fertig zum Testen" },
  { titel: "Testing-Liste", zeile: "Was du zuerst testest" },
  { titel: "Fälle-Check", zeile: "PayPal und Klarna im Blick" },
];

export const pakete = [
  {
    titel: "Der Abzock-Check.",
    text: "Sag uns, was du für dein Produkt zahlst. Wir prüfen, ob der Preis fair ist. Geht es besser, bekommst du ein Angebot und ein Muster zum Vergleich.",
  },
  {
    titel: "Die Shop-Analyse.",
    text: "Produktseite, Offer, Warenkorb und Handy-Ansicht. Jede Seite angesehen, mit Note und konkretem Fix.",
  },
  {
    titel: "Der 7-Bilder-Plan.",
    text: "Welche 7 Bilder dein Hauptprodukt braucht, was auf jedes gehört und welche dir fehlen. Das wichtigste davon bauen wir dir direkt.",
  },
  {
    titel: "Die Angle-Liste.",
    text: "Die Winkel, über die sich dein Produkt in Ads verkaufen lässt. Fertig zum Testen.",
  },
  {
    titel: "Die Testing-Liste.",
    text: "Was du in welcher Reihenfolge testest, damit jeder Werbe-Euro etwas lernt.",
  },
  {
    titel: "Der Fälle-Check.",
    text: "Wie viele PayPal- und Klarna-Fälle du hast und wie viel Abstand zur Grenze, ab der Zahlungsanbieter Gebühren erhöhen.",
  },
];

export const plan = [
  {
    titel: "Shop eintragen.",
    text: "Link, Bestellungen am Tag und was du für dein Produkt zahlst.",
  },
  {
    titel: "Check läuft.",
    text: "Wir sehen uns deinen Preis, deinen Shop und deine Bilder an.",
  },
  {
    titel: "Ergebnis in 24 Stunden.",
    text: "Alles liegt in deinem ecomet-Konto. Ab 10 Bestellungen am Tag gehen wir es im Call mit dir durch.",
  },
];

export const einsatz = [
  "Ein Agent, der den Preis still erhöht, kostet dich bei jeder einzelnen Bestellung.",
  "Ein schwaches erstes Bild verliert Käufer, bevor sie scrollen.",
  "Ein PayPal-Fall, dessen Frist abläuft, kostet dich Ware und Geld.",
];

export const fuerWen = [
  "Du verkaufst schon und schaltest Ads.",
  "Du willst mehr aus jeder Bestellung holen, nicht nur mehr Bestellungen.",
  "Du kaufst dein Produkt in China ein.",
];

export const fragen = [
  { frage: "Was kostet der Check?", antwort: "Nichts. Kein Vertrag, kein Abo." },
  {
    frage: "Muss ich danach wechseln?",
    antwort: "Nein. Du bekommst deinen Check und entscheidest selbst.",
  },
  {
    frage: "Wie schnell habe ich mein Ergebnis?",
    antwort: "Innerhalb von 24 Stunden in deinem ecomet-Konto.",
  },
  {
    frage: "Wer macht den Check?",
    antwort:
      "Fabio, Kevin und Alex. Den Call machst du mit einem von uns, nicht mit einem Bot.",
  },
  {
    frage: "Wer sieht meine Zahlen?",
    antwort:
      "Nur wir, und nur für deinen Check. Mehr dazu in der Datenschutzerklärung.",
  },
  {
    frage: "Was passiert, wenn ihr günstiger seid?",
    antwort: "Du bekommst ein Angebot und ein Muster. Dann vergleichst du selbst.",
  },
];

export const bestellOptionen = ["noch keine", "1 bis 9", "10 bis 29", "30 bis 99", "100+"];
export const fulfillerOptionen = ["Agent in China", "CJ", "Zendrop", "eigenes Lager", "anderes"];
export const adsOptionen = ["Meta", "Google", "TikTok", "keine"];
