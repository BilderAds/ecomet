"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

/**
 * Der Kopf der alten Seite, den Kevin am 23.08. zurückhaben wollte:
 * durchgehende Leiste mit Unschärfe, Logo links, Links mittig, oranger
 * Knopf rechts. Neu sind nur die Ziele: sie führen jetzt zu uns und nicht
 * mehr zur Registrierung beim Partner.
 */
const punkte = [
  { text: "Deutsches Lager", ziel: "/fulfillment/deutschland" },
  { text: "Dropshipping", ziel: "/fulfillment/china" },
  { text: "Apps", ziel: "/#apps" },
  { text: "Preise", ziel: "/preise" },
  { text: "Über uns", ziel: "/ueber-uns" },
];

export function Navigation() {
  const [offen, setOffen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#08080a]/80 backdrop-blur-xl border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="ecomet Startseite">
          <Image
            src="/ecomet-schrift-weiss.png"
            alt="ecomet"
            width={120}
            height={28}
            priority
            style={{ height: 22, width: "auto" }}
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {punkte.map((p) => (
            <Link
              key={p.ziel}
              href={p.ziel}
              className="text-sm text-white/60 hover:text-white transition-colors duration-200 relative group"
            >
              {p.text}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-ecomet group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="https://apps.shopify.com/ecomet"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-ecomet hover:bg-ecomet-dark text-white text-sm font-medium px-5 py-2.5 rounded-[12px] transition-all duration-200 hover:shadow-lg hover:shadow-ecomet/25"
          >
            ecomet App laden
          </Link>

          <button
            onClick={() => setOffen(!offen)}
            className="md:hidden text-white p-2"
            aria-label={offen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={offen}
          >
            {offen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {offen && (
        <div className="md:hidden bg-[#08080a]/95 backdrop-blur-xl border-b border-white/5">
          <div className="px-4 py-4 flex flex-col gap-3">
            {punkte.map((p) => (
              <Link
                key={p.ziel}
                href={p.ziel}
                onClick={() => setOffen(false)}
                className="text-sm text-white/70 hover:text-white py-2 transition-colors"
              >
                {p.text}
              </Link>
            ))}
            <Link
              href="/kontakt"
              onClick={() => setOffen(false)}
              className="text-sm text-white/70 hover:text-white py-2 transition-colors"
            >
              Kontakt
            </Link>
            <Link
              href="https://apps.shopify.com/ecomet"
            target="_blank"
            rel="noopener noreferrer"
              onClick={() => setOffen(false)}
              className="bg-ecomet hover:bg-ecomet-dark text-white text-sm font-medium px-5 py-2.5 rounded-[12px] text-center transition-all duration-200 mt-2"
            >
              ecomet App laden
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
