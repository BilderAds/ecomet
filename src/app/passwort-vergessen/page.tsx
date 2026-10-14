import type { Metadata } from "next";
import { AbzockKopf, AbzockFuss } from "@/components/abzock/kopf";
import { AnmeldeFormular } from "@/components/abzock/anmelde-formular";

export const metadata: Metadata = {
  title: "Passwort vergessen | ecomet",
  robots: { index: false },
};

export default function Seite() {
  return (
    <>
      <div className="bg-layer bg-glow" aria-hidden="true" />
      <div className="bg-layer bg-grain" aria-hidden="true" />
      <AbzockKopf />
      <main className="ak-seite">
        <div className="wrap">
          <AnmeldeFormular art="vergessen" />
        </div>
      </main>
      <AbzockFuss />
    </>
  );
}
