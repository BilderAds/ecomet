import { LegalLayout } from "@/components/legal-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nutzungsbedingungen | ecomet",
  description: "Allgemeine Nutzungsbedingungen von ecomet",
};

export default function Nutzungsbedingungen() {
  return (
    <LegalLayout title="Nutzungsbedingungen">
      <p className="text-sm text-[#737373] mb-6">
        Letzte Aktualisierung: 13. März 2025
      </p>

      <p>
        Diese Nutzungsbedingungen regeln Ihre Nutzung der Website ecometapp.de
        und der von ecomet angebotenen Dienste. Durch die Nutzung unserer
        Website und Dienste erklären Sie sich mit diesen Nutzungsbedingungen
        einverstanden.
      </p>

      <h2>Leistungsbeschreibung</h2>
      <p>
        ecomet bietet Fulfillment-Dienstleistungen für Dropshipper und
        E-Commerce-Händler im DACH-Raum an. Dazu gehören Produktbeschaffung,
        Qualitätskontrolle, Lagerhaltung und Versand von Waren.
      </p>

      <h2>Registrierung und Konto</h2>
      <p>
        Um unsere Dienste nutzen zu können, müssen Sie sich über unsere
        Partnerplattform registrieren. Sie sind für die Richtigkeit der von
        Ihnen angegebenen Daten verantwortlich und verpflichten sich, Ihre
        Zugangsdaten vertraulich zu behandeln.
      </p>

      <h2>Preise und Zahlung</h2>
      <p>
        Die Preise für unsere Dienste werden individuell durch Ihren
        persönlichen Agenten mitgeteilt. Die Zahlung erfolgt über ein
        Balance-System. Sie laden Guthaben auf und bezahlen damit Ihre
        Bestellungen.
      </p>

      <h2>Versand und Lieferung</h2>
      <p>
        Wir bemühen uns, alle Bestellungen innerhalb von 4 bis 8 Werktagen in
        den DACH-Raum zu liefern. Die tatsächliche Lieferzeit kann je nach
        Produkt, Verfügbarkeit und Zielort variieren.
      </p>

      <h2>Rücksendungen und Reklamationen</h2>
      <p>
        Rücksendungen und Reklamationen werden über Ihren persönlichen Agenten
        abgewickelt. Bitte kontaktieren Sie diesen direkt bei Problemen mit
        Ihrer Bestellung.
      </p>

      <h2>Haftungsausschluss</h2>
      <p>
        Unsere Dienste werden „wie besehen" bereitgestellt. Wir übernehmen keine
        Gewährleistung für die ununterbrochene Verfügbarkeit unserer Dienste.
        Unsere Haftung ist im gesetzlich zulässigen Rahmen beschränkt.
      </p>

      <h2>Geistiges Eigentum</h2>
      <p>
        Alle Inhalte auf dieser Website, einschließlich Texte, Grafiken, Logos
        und Software, sind Eigentum von ecomet oder seinen Lizenzgebern und
        durch das Urheberrecht geschützt.
      </p>

      <h2>Änderungen der Nutzungsbedingungen</h2>
      <p>
        Wir behalten uns das Recht vor, diese Nutzungsbedingungen jederzeit zu
        ändern. Änderungen werden auf dieser Seite veröffentlicht. Die
        fortgesetzte Nutzung unserer Dienste nach einer Änderung gilt als
        Zustimmung zu den geänderten Bedingungen.
      </p>

      <h2>Anwendbares Recht</h2>
      <p>
        Auf diese Nutzungsbedingungen findet das Recht der Sonderverwaltungszone
        Hongkong Anwendung.
      </p>

      <h2>Kontakt</h2>
      <p>
        Bei Fragen zu diesen Nutzungsbedingungen kontaktieren Sie uns bitte
        unter{" "}
        <a href="mailto:info@ecometapp.de" className="text-ecomet hover:underline">
          info@ecometapp.de
        </a>
      </p>
    </LegalLayout>
  );
}
