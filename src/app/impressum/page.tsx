import { LegalLayout } from "@/components/legal-layout";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | ecomet",
  description: "Impressum und Angaben gemäß § 5 DDG",
};

export default function Impressum() {
  return (
    <LegalLayout title="Impressum">
      <p className="text-sm text-[#737373] mb-6">
        Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)
      </p>

      <h2>ecomet</h2>
      <p>betrieben durch:</p>
      <p>
        <strong>JYS Trade Co., Limited</strong>
        <br />
        Room 2914, 29th Floor
        <br />
        Ho King Commercial Centre
        <br />
        2–16 Fa Yuen Street
        <br />
        Kowloon
        <br />
        999077
        <br />
        China
      </p>

      <p>
        <strong>Rechtsform:</strong> Private Limited Company
        <br />
        <strong>Vertretungsberechtigter:</strong> Liu Wei, Director
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail:{" "}
        <a href="mailto:info@ecometapp.de" className="text-ecomet hover:underline">
          info@ecometapp.de
        </a>
        <br />
        Kontaktformular:{" "}
        <a href="/kontakt" className="text-ecomet hover:underline">
          www.ecometapp.de/kontakt
        </a>
        <br />
        Website: www.ecometapp.de
      </p>
      <h2>Webdesign & Entwicklung</h2>
      <p>
        <strong>
          <a href="https://bilderads.de" target="_blank" rel="noopener noreferrer" className="text-ecomet hover:underline">
            BilderAds
          </a>
        </strong>
        <br />
        An der Glasfachschule 44
        <br />
        53359 Rheinbach
      </p>
      <p>
        Website:{" "}
        <a href="https://bilderads.de" target="_blank" rel="noopener noreferrer" className="text-ecomet hover:underline">
          www.bilderads.de
        </a>
        <br />
        E-Mail:{" "}
        <a href="mailto:info@bilderads.de" className="text-ecomet hover:underline">
          info@bilderads.de
        </a>
      </p>
      {/*
        Das Badge lag bis zum 25.08.2026 als `made-by-bilderads-light.png`
        hier. Zwei Fehler auf einmal, beide von Kevin an der Live-Seite
        gesehen:

        1. „light" ist die Fassung für HELLE Hintergründe, der Schriftzug
           ist dort fast schwarz (27,27,27). Auf unserem dunklen Grund war
           „Made by BilderAds" praktisch unlesbar.
        2. Die Datei ist 320 px breit, der sichtbare Inhalt beginnt aber
           erst bei Pixel 35. Das sind bei Anzeigebreite 160 rund 17 px
           unsichtbarer Rand links, und genau darum stand das Badge nicht
           bündig unter der Adresse.

        `made-by-bilderads-weiss.png` behebt beides: Schriftzug auf Weiß
        umgefärbt (Alphakanal behalten, dadurch saubere Kanten), das
        Ba-Logo selbst unangetastet, und der transparente Rand
        abgeschnitten. Die Datei ist 252×78, angezeigt in 168×52, also
        exakt zwei Drittel und ohne Verzerrung. Linke Kante = Pixel 0,
        damit sitzt sie bündig auf der Textkante darüber.
      */}
      <a
        href="https://bilderads.de"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block"
      >
        <Image
          src="/made-by-bilderads-weiss.png"
          alt="Made by BilderAds"
          width={168}
          height={52}
        />
      </a>
    </LegalLayout>
  );
}
