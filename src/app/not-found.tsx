import Link from "next/link";
import { Rahmen } from "@/components/start/rahmen";

export default function NichtGefunden() {
  return (
    <Rahmen>
      <section className="seitenkopf" style={{ paddingBottom: 120 }}>
        <div className="wrap">
          <p className="num" style={{ fontSize: "clamp(4rem,12vw,7rem)", fontWeight: 700, color: "var(--a1)", lineHeight: 1 }}>
            404
          </p>
          <h1 style={{ marginTop: 18 }}>Diese Seite gibt es nicht</h1>
          <p>
            Vielleicht hat sich ein Buchstabe verirrt, vielleicht ist die Seite
            umgezogen. Beides halb so wild.
          </p>
          <div style={{ marginTop: 30, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <span className="glass-wrap">
              <Link href="/" className="glass-btn">
                <span className="glass-txt">Zur Startseite</span>
              </Link>
              <span className="glass-shadow" />
            </span>
            <span className="glass-wrap">
              <Link href="/kontakt" className="glass-btn">
                <span className="glass-txt">Uns fragen</span>
              </Link>
              <span className="glass-shadow" />
            </span>
          </div>
        </div>
      </section>
    </Rahmen>
  );
}
