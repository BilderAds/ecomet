"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Clock, ShieldCheck, Package } from "lucide-react";
import { buehneBelege, empfehlungen, zeigen } from "@/inhalte/zahlen";

/**
 * Die Bühne im Aufbau der alten Seite, den Kevin am 23.08. zurückhaben
 * wollte: links Text mit Bewertungszeile, rechts der Globus. Neu sind die
 * Texte und das Ziel der Knöpfe.
 *
 * Der Globus lädt erst im Browser, damit er den ersten Aufbau nicht bremst.
 *
 * Die Überschrift kommt aus dem Offer Brief, Angle 6, Headline 20:
 * "Teste in China. Liefere aus Deutschland." Sie beschreibt, was der Kunde
 * TUT, nicht wie wir organisiert sind, und sie enthält den Übergang, den wir
 * verkaufen. Höchstens ZWEI Zeilen, harte Regel. Aufbau wie auf der alten
 * Seite, weiße Zeile plus orange Zeile.
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

/**
 * Die fünf Köpfe der Trust-Zeile, wie auf der Live-Seite.
 *
 * Dort kommen sie zur Laufzeit von `api.dicebear.com`. Das schickt bei
 * JEDEM Seitenaufruf die IP des Besuchers an einen fremden Server, gehört
 * dann in die Datenschutzerklärung und fällt aus, wenn der Dienst weg ist.
 * Die fünf Bilder liegen deshalb einmal geholt in `public/koepfe/`, im
 * Marken-Orange #FF642C statt im alten #F26B2B.
 *
 * Es sind gezeichnete Figuren, keine Fotos: sie geben niemanden als echte
 * Person aus.
 */
function Koepfe() {
  const namen = ["Felix", "Sarah", "Marco", "Lisa", "Tom"];
  return (
    <div className="flex -space-x-2">
      {namen.map((name) => (
        <Image
          key={name}
          src={`/koepfe/${name}.svg`}
          alt=""
          width={34}
          height={34}
          className="w-[34px] h-[34px] rounded-full border-2 border-[#08080a]"
        />
      ))}
    </div>
  );
}

/**
 * Die Trust-Zeile über der Überschrift, im Aufbau der Live-Seite:
 * fünf Köpfe, fünf Sterne, darunter die Zahl.
 *
 * ⚠ Die ZAHL ist nicht belegt. Es gibt keine Bewertungsquelle: ecomet liegt
 * nicht im Shopify App Store, es gibt kein Trustpilot-Profil. Sie steht in
 * `zahlen.ts` weiter auf `geprueft: false`, damit `npm run zahlen-pruefen`
 * weiter darauf zeigt. Kevin am 23.08. ausdrücklich so gewollt, die Zeile
 * steht wortgleich schon auf ecometapp.de. Sobald eine echte Zahl da ist,
 * wird nur `zahlen.ts` angefasst, hier nichts.
 */
function Trust() {
  return (
    <div className="flex items-center gap-3">
      <Koepfe />
      <div className="flex flex-col gap-0.5">
        <div className="flex gap-1" aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-ecomet text-[13px] leading-none">
              &#9733;
            </span>
          ))}
        </div>
        <span className="text-white/45 text-[13px] leading-none">
          {empfehlungen.wert} {empfehlungen.label}
        </span>
      </div>
    </div>
  );
}

function Belege({ klein = false }: { klein?: boolean }) {
  const symbole = [Clock, ShieldCheck, Package];
  return (
    <div className={`flex flex-wrap ${klein ? "gap-4 pt-1" : "gap-6 pt-2"}`}>
      {zeigen(buehneBelege).map((b, i) => {
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

      <div className="relative w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-10 sm:pb-14">
        {/* Handy: Globus oben, Text darunter */}
        <div className="md:hidden flex flex-col gap-4">
          <div className="flex justify-center -mb-2">
            <GlobeOrders className="w-[300px]" />
          </div>
          <Trust />
          <div>
            <h1 className="text-[1.75rem] font-bold text-white leading-[1.15] tracking-tight">
              Teste in China.
            </h1>
            <p className="mt-1 text-[1.75rem] font-bold leading-[1.15] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-ecomet to-ecomet-light">
              Liefere aus Deutschland.
            </p>
          </div>
          <p className="text-sm text-white/50 leading-relaxed">
            Lager, Versand, Rechnungen und PayPal-Fälle über ein Konto.
            Keine Mindestmenge, kein Vertrag, keine Grundgebühr.
          </p>
          <div>
            <Knopf />
          </div>
          <Belege klein />
        </div>

        {/* Rechner: Text links, Globus rechts */}
        <div className="hidden md:flex md:flex-row md:items-center gap-8">
          <div className="flex flex-col gap-8 z-10 flex-1 min-w-0">
            <Trust />
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-[1.12] tracking-[-0.03em]">
                Teste in China.
              </h1>
              <p className="mt-1 text-4xl lg:text-5xl font-bold leading-[1.12] tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-r from-ecomet to-ecomet-light">
                Liefere aus Deutschland.
              </p>
            </div>
            <p className="text-lg text-white/50 max-w-xl leading-relaxed">
              Lager, Versand, Rechnungen und PayPal-Fälle über ein Konto.
              <strong className="text-white/80 font-semibold"> Keine Mindestmenge, kein Vertrag,
              keine Grundgebühr.</strong>
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
