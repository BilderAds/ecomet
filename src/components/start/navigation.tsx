"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const punkte = [
  { text: "Deutsches Lager", ziel: "/fulfillment/deutschland" },
  { text: "Import aus China", ziel: "/fulfillment/china" },
  { text: "Apps", ziel: "/#apps" },
  { text: "Preise", ziel: "/preise" },
];

export function Navigation() {
  const [offen, setOffen] = useState(false);

  return (
    <nav className="nav">
      <div className="wrap-wide nav-in">
        <Link href="/" className="nav-logo" aria-label="ecomet Startseite">
          <Image
            src="/ecomet-schrift-weiss.png"
            alt="ecomet"
            width={120}
            height={28}
            priority
            style={{ height: 24, width: "auto" }}
          />
        </Link>

        <div className="nav-pill">
          {punkte.map((p) => (
            <Link key={p.ziel} href={p.ziel}>
              {p.text}
            </Link>
          ))}
        </div>

        <div className="nav-cta">
          <span className="glass-wrap">
            <Link href="/registrieren" className="glass-btn sm">
              <span className="glass-txt">Konto erstellen</span>
            </Link>
            <span className="glass-shadow" />
          </span>
        </div>

        <button
          className="nav-burger"
          aria-label={offen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={offen}
          onClick={() => setOffen((o) => !o)}
        >
          {offen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {offen && (
        <div className="nav-mobil">
          {punkte.map((p) => (
            <Link key={p.ziel} href={p.ziel} onClick={() => setOffen(false)}>
              {p.text}
            </Link>
          ))}
          <Link href="/kontakt" onClick={() => setOffen(false)}>
            Kontakt
          </Link>
          <Link href="/registrieren" className="nav-mobil-cta" onClick={() => setOffen(false)}>
            Konto erstellen
          </Link>
        </div>
      )}
    </nav>
  );
}
