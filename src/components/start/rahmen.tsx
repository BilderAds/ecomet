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

/** Kopf einer Unterseite: Überzeile, Überschrift, ein Satz. */
export function SeitenKopf({
  ueber,
  titel,
  satz,
}: {
  ueber?: string;
  titel: React.ReactNode;
  satz: string;
}) {
  return (
    <section className="seitenkopf">
      <div className="wrap">
        {ueber && (
          <span className="eyebrow fx">
            <span className="dot" /> {ueber}
          </span>
        )}
        <h1 className="fx" data-d="1">
          {titel}
        </h1>
        <p className="fx" data-d="2">
          {satz}
        </p>
      </div>
    </section>
  );
}
