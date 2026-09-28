import { Navigation } from "./navigation";
import { Fuss, MobileLeiste } from "./fuss";
import { Effekte } from "./effekte";

/** Der gemeinsame Rahmen jeder Unterseite: Hintergrund, Navigation, Fuß, Effekte. */
export function Rahmen({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-layer bg-glow" aria-hidden="true" />
      <div className="bg-layer bg-grain" aria-hidden="true" />
      <Navigation />
      <main>{children}</main>
      <Fuss />
      <MobileLeiste />
      <Effekte />
    </>
  );
}

/** Kopf einer Unterseite: Überschrift und ein Satz. Über der Überschrift steht nichts (Kevin, 20.09. und 28.09.2026). */
export function SeitenKopf({
  titel,
  satz,
}: {
  titel: React.ReactNode;
  satz: string;
}) {
  return (
    <section className="seitenkopf">
      <div className="wrap">
        <h1 className="fx">
          {titel}
        </h1>
        <p className="fx" data-d="1">
          {satz}
        </p>
      </div>
    </section>
  );
}
