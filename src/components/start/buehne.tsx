"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Clock, ShieldCheck, Package } from "lucide-react";
import { buehneBelege, empfehlungen } from "@/inhalte/zahlen";

/**
 * Die Bühne im Aufbau der alten Seite, den Kevin am 23.08. zurückhaben
 * wollte: links Text mit Bewertungszeile, rechts der Globus. Neu sind die
 * Texte und das Ziel der Knöpfe.
 *
 * Der Globus lädt erst im Browser, damit er den ersten Aufbau nicht bremst.
 */
const GlobeOrders = dynamic(
  () => import("../ui/globe-orders").then((m) => m.GlobeOrders),
  {
    ssr: false,
    loading: () => (
      <div className="w-[300px] md:w-[340px] lg:w-[400px] xl:w-[450px] aspect-square" />
    ),
  },
);

/** Fünf Kreise als Andeutung von Menschen. Bewusst ohne fremden Dienst. */
function Koepfe() {
  const toene = ["#F26B2B", "#FF8A50", "#D4571E", "#FF9E6B", "#C4491A"];
  return (
    <div className="flex -space-x-1.5">
      {toene.map((ton, i) => (
        <span
          key={ton}
          aria-hidden="true"
          className="w-6 h-6 rounded-full border-[1.5px] border-[#08080a] block"
          style={{
            background: `linear-gradient(135deg, ${ton}, ${toene[(i + 2) % toene.length]})`,
          }}
        />
      ))}
    </div>
  );
}

function Bewertung() {
  return (
    <div className="flex items-center gap-3">
      <Koepfe />
      <div className="flex flex-col">
        <div className="flex gap-0.5" aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-ecomet text-[10px]">
              &#9733;
            </span>
          ))}
        </div>
        <span className="text-white/50 text-[10px]">{empfehlungen.wert} {empfehlungen.label}</span>
      </div>
    </div>
  );
}

function Belege({ klein = false }: { klein?: boolean }) {
  const symbole = [Clock, ShieldCheck, Package];
  return (
    <div className={`flex flex-wrap ${klein ? "gap-4 pt-1" : "gap-6 pt-2"}`}>
      {buehneBelege.map((b, i) => {
        const Symbol = symbole[i] ?? Clock;
        return (
          <div
            key={b.label}
            className={`flex items-center gap-2 text-white/50 ${klein ? "text-xs" : "text-sm"}`}
          >
            <Symbol size={klein ? 12 : 14} className="text-ecomet flex-shrink-0" />
            {b.label}
          </div>
        );
      })}
    </div>
  );
}

function Knopf({ gross = false }: { gross?: boolean }) {
  return (
    <Link
      href="/registrieren"
      className={`inline-flex items-center justify-center gap-2 bg-ecomet hover:bg-ecomet-dark text-white font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-ecomet/30 hover:scale-[1.02] ${
        gross ? "px-8 py-4 text-lg" : "px-6 py-3.5 text-base"
      }`}
    >
      Konto erstellen
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

export function Buehne() {
  return (
    <section className="relative overflow-hidden pt-16" id="start">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-ecomet/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pt-10 sm:pt-16 pb-16 sm:pb-28">
        {/* Handy: Globus oben, Text darunter */}
        <div className="md:hidden flex flex-col gap-4">
          <div className="flex justify-center -mb-2">
            <GlobeOrders className="w-[300px]" />
          </div>
          <Bewertung />
          <div>
            <h1 className="text-2xl font-bold text-white leading-[1.2] tracking-tight">
              Alles für deinen Shop.
            </h1>
            <p className="mt-2 text-2xl font-bold leading-[1.2] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-ecomet to-ecomet-light">
              Ein Konto.
            </p>
          </div>
          <p className="text-sm text-white/50 leading-relaxed">
            Lager in Deutschland oder Import aus China. Bestellungen, Versand und
            Rechnungen laufen bei uns an einem Ort.
          </p>
          <div>
            <Knopf />
          </div>
          <Belege klein />
        </div>

        {/* Rechner: Text links, Globus rechts */}
        <div className="hidden md:flex md:flex-row md:items-center gap-8">
          <div className="flex flex-col gap-8 z-10 flex-1 min-w-0">
            <Bewertung />
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white leading-[1.2] tracking-tight">
                Alles für deinen Shop.
              </h1>
              <p className="mt-2 text-3xl lg:text-4xl font-bold leading-[1.2] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-ecomet to-ecomet-light">
                Ein Konto.
              </p>
            </div>
            <p className="text-lg text-white/50 max-w-lg leading-relaxed">
              Lager in Deutschland oder Import aus China. Bestellungen, Versand
              und Rechnungen laufen bei uns an einem Ort.
            </p>
            <div>
              <Knopf gross />
            </div>
            <Belege />
          </div>

          <div className="flex flex-shrink-0 items-center justify-end">
            <GlobeOrders className="w-[340px] lg:w-[400px] xl:w-[450px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
