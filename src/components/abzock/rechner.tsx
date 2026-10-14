"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Was dich 1 € zu viel pro Stück im Jahr kostet. Reine Multiplikation:
 * Bestellungen am Tag × 365 × 1 €. Verspricht nicht, dass wir günstiger sind.
 */
export function MargenRechner() {
  const [proTag, setProTag] = useState(30);
  const jahr = proTag * 365;

  return (
    <div className="ak-rechner">
      <label htmlFor="pro-tag" className="ak-rechner-label">
        Bestellungen am Tag <strong className="num">{proTag}</strong>
      </label>
      <input
        id="pro-tag"
        type="range"
        min={1}
        max={300}
        value={proTag}
        onChange={(e) => setProTag(Number(e.target.value))}
        style={{ "--wert": `${((proTag - 1) / 299) * 100}%` } as React.CSSProperties}
      />
      <div className="ak-rechner-ergebnis">
        <span className="ak-rechner-zahl num">{jahr.toLocaleString("de-DE")} €</span>
        <span className="ak-rechner-satz">im Jahr, für jeden Euro, den du pro Stück zu viel zahlst</span>
      </div>
      <Link href="/abzock-check/start" className="ak-knopf">Check starten</Link>
    </div>
  );
}
