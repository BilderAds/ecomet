import type { Metadata } from "next";
import { AbzockKopf, AbzockFuss } from "@/components/abzock/kopf";
import { CheckFormular } from "@/components/abzock/check-formular";

export const metadata: Metadata = {
  title: "Check starten | ecomet",
  description: "Dein kostenloser 24-Stunden-Abzock-Check in drei kurzen Schritten.",
  robots: { index: false },
};

export default function CheckStarten() {
  return (
    <>
      <div className="bg-layer bg-glow" aria-hidden="true" />
      <div className="bg-layer bg-grain" aria-hidden="true" />
      <AbzockKopf nurLogo />
      <main className="ak-seite">
        <div className="wrap">
          <CheckFormular />
        </div>
      </main>
      <AbzockFuss />
    </>
  );
}
