import { Navigation } from "./start/navigation";
import { Fuss } from "./start/fuss";
import { Effekte } from "./start/effekte";

export function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <div className="bg-layer bg-glow" aria-hidden="true" />
      <div className="bg-layer bg-grain" aria-hidden="true" />
      <Navigation />
      <main className="rechtstext">
        <div className="wrap">
          <h1>{title}</h1>
          <div className="rechtstext-inhalt">{children}</div>
        </div>
      </main>
      <Fuss />
      <Effekte />
    </>
  );
}
