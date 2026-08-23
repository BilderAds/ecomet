import { Effekte } from "@/components/start/effekte";
import { Navigation } from "@/components/start/navigation";
import { Buehne } from "@/components/start/buehne";
import { Partner } from "@/components/start/partner";
import { Wege } from "@/components/start/wege";
import { Ansicht } from "@/components/start/ansicht";
import { Ablauf } from "@/components/start/ablauf";
import { Leistungen } from "@/components/start/leistungen";
import { Aussage } from "@/components/start/aussage";
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
        <Partner />
        <Wege />
        <Ansicht />
        <Ablauf />
        <Leistungen />
        <Aussage />
        <Apps />
        <Fragen />
      </main>
      <Fuss />
      <MobileLeiste />
      <Effekte />
    </>
  );
}
