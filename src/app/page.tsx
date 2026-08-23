import { Effekte } from "@/components/start/effekte";
import { Navigation } from "@/components/start/navigation";
import { Buehne } from "@/components/start/buehne";
import { Vertrauen } from "@/components/start/vertrauen";
import { Wege } from "@/components/start/wege";
import { Ansicht } from "@/components/start/ansicht";
import { Abschluss } from "@/components/start/abschluss";
import { Ablauf } from "@/components/start/ablauf";
import { Leistungen } from "@/components/start/leistungen";
import { Apps } from "@/components/start/apps";
import { Fragen } from "@/components/start/fragen";
import { Fuss, MobileLeiste } from "@/components/start/fuss";

export default function Startseite() {
  return (
    <>
      <div className="bg-layer bg-glow" aria-hidden="true" />
      <div className="bg-layer bg-grain" aria-hidden="true" />

      <Navigation />
      <main>
        <Buehne />
        <Vertrauen />
        <Wege />
        <Apps />
        <Ansicht />
        <Ablauf />
        <Leistungen />
        <Fragen />
        <Abschluss />
      </main>
      <Fuss />
      <MobileLeiste />
      <Effekte />
    </>
  );
}
