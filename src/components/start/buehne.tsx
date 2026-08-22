import Link from "next/link";
import { buehneZahlen } from "@/inhalte/zahlen";

export function Buehne() {
  return (
    <header className="hero" id="start">
      <div className="hero-in">
        <div className="hero-mid">
          <h1 className="hero-h1 fx">
            Alles für deinen Shop.
            <br />
            <span className="accent">Ein Konto.</span>
          </h1>
          <p className="hero-p fx" data-d="1">
            Lager in Deutschland oder Import aus China. Bestellungen, Versand und
            Rechnungen laufen bei uns an einem Ort.
          </p>
          <div className="hero-cta fx" data-d="2">
            <span className="glass-wrap">
              <Link href="/registrieren" className="glass-btn">
                <span className="glass-txt">Konto erstellen</span>
              </Link>
              <span className="glass-shadow" />
            </span>
            <span className="glass-wrap">
              <Link href="/preise" className="glass-btn">
                <span className="glass-txt">Preise ansehen</span>
              </Link>
              <span className="glass-shadow" />
            </span>
          </div>
          <div className="hero-stats fx" data-d="3">
            {buehneZahlen.map((z) => (
              <div key={z.label}>
                <div className="v num">{z.wert}</div>
                <div className="k">{z.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="scroll-hint">
        <span />
      </div>
    </header>
  );
}
