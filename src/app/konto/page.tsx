import type { Metadata } from "next";
import { AbzockKopf, AbzockFuss } from "@/components/abzock/kopf";
import { KontoAnsicht } from "@/components/abzock/konto-ansicht";

export const metadata: Metadata = {
  title: "Dein Konto | ecomet",
  robots: { index: false },
};

export default function Konto() {
  return (
    <>
      <div className="bg-layer bg-glow" aria-hidden="true" />
      <div className="bg-layer bg-grain" aria-hidden="true" />
      <AbzockKopf nurLogo />
      <main className="ak-seite">
        <div className="wrap">
          <KontoAnsicht etikett={process.env.VERCEL_ENV === "production"} />
        </div>
      </main>
      <AbzockFuss />
    </>
  );
}
