"use client";

import dynamic from "next/dynamic";
import { Clock, ShieldCheck, Package } from "lucide-react";

// Lazy-load the WebGL globe so cobe + its animation code stay off the critical path.
// The hero text paints immediately; the globe pops in once it's loaded.
const GlobeOrders = dynamic(
  () => import("./ui/globe-orders").then((m) => m.GlobeOrders),
  {
    ssr: false,
    loading: () => (
      <div className="w-[300px] md:w-[340px] lg:w-[400px] xl:w-[450px] aspect-square" />
    ),
  }
);

const REGISTER_URL =
  "https://gtapp.unifydropshipping.com/auth/register?share=B031.2034151326159671297.false&sign=0f3479af09515ce68412ef3ae4d28b8b";

const avatarSeeds = ["Felix", "Sarah", "Marco", "Lisa", "Tom"];
const avatarStyle = "notionists";

export function Hero() {
  return (
    <section className="relative bg-[#0a0a0a] overflow-hidden pt-16">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-ecomet/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pt-10 sm:pt-16 pb-16 sm:pb-28">
        {/* Mobile: Globe oben zentriert, dann Text linksbündig */}
        <div className="md:hidden flex flex-col gap-4">
          {/* Real WebGL globe (mobile-optimized branches built into GlobeOrders) */}
          <div className="flex justify-center -mb-2">
            <GlobeOrders className="w-[300px]" />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-1.5">
              {avatarSeeds.map((seed, i) => (
                <img
                  key={i}
                  src={`https://api.dicebear.com/9.x/${avatarStyle}/svg?seed=${seed}&backgroundColor=f26b2b&backgroundType=solid`}
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full border-[1.5px] border-[#0a0a0a]"
                />
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-ecomet text-[10px]">&#9733;</span>
                ))}
              </div>
              <span className="text-white/50 text-[10px]">1,475+ Empfehlungen</span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white leading-[1.2] tracking-tight">
              Schluss mit Retouren
            </h1>
            <p className="mt-2 text-2xl font-bold leading-[1.2] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-ecomet to-ecomet-light">
              4-8 Tage Versand &<br />höchste Produktqualität.
            </p>
          </div>

          <p className="text-sm text-white/50 leading-relaxed">
            Dein Fulfillment Partner für den DACH Raum.
            <br />
            Starte in 3 Schritten komplett kostenlos.
          </p>

          <div>
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-ecomet text-white font-semibold px-6 py-3.5 rounded-full text-base"
            >
              Jetzt kostenlos starten
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          <div className="flex flex-wrap gap-4 pt-1">
            <div className="flex items-center gap-2 text-white/50 text-xs">
              <Clock size={12} className="text-ecomet flex-shrink-0" />
              4-8 Tage Lieferzeit
            </div>
            <div className="flex items-center gap-2 text-white/50 text-xs">
              <ShieldCheck size={12} className="text-ecomet flex-shrink-0" />
              Qualitätskontrolle
            </div>
            <div className="flex items-center gap-2 text-white/50 text-xs">
              <Package size={12} className="text-ecomet flex-shrink-0" />
              Dropshipping und Lagern
            </div>
          </div>
        </div>

        {/* Desktop: Text links, Globe rechts */}
        <div className="hidden md:flex md:flex-row md:items-center gap-8">
          <div className="flex flex-col gap-8 z-10 flex-1 min-w-0">
            <div
              className="hero-rise flex items-center gap-3"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex -space-x-1.5">
                {avatarSeeds.map((seed, i) => (
                  <img
                    key={i}
                    src={`https://api.dicebear.com/9.x/${avatarStyle}/svg?seed=${seed}&backgroundColor=f26b2b&backgroundType=solid`}
                    alt=""
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full border-[1.5px] border-[#0a0a0a]"
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-ecomet text-[10px]">&#9733;</span>
                  ))}
                </div>
                <span className="text-white/50 text-[10px]">1,475+ Empfehlungen</span>
              </div>
            </div>

            <div className="hero-rise" style={{ animationDelay: "0.2s" }}>
              <h1 className="text-3xl lg:text-4xl font-bold text-white leading-[1.2] tracking-tight">
                Schluss mit Paypal-Fällen und Retouren
              </h1>
              <p className="mt-2 text-3xl lg:text-4xl font-bold leading-[1.2] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-ecomet to-ecomet-light">
                4-8 Tage Versand & höchste Produktqualität.
              </p>
            </div>

            <p
              className="hero-rise text-lg text-white/50 max-w-lg leading-relaxed"
              style={{ animationDelay: "0.4s" }}
            >
              Dein Fulfillment Partner für den DACH Raum.
              <br />
              Starte in 3 Schritten komplett kostenlos.
            </p>

            <div className="hero-rise" style={{ animationDelay: "0.5s" }}>
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-ecomet hover:bg-ecomet-dark text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:shadow-xl hover:shadow-ecomet/30 hover:scale-[1.02]"
              >
                Jetzt kostenlos starten
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            <div
              className="hero-rise flex flex-wrap gap-6 pt-2"
              style={{ animationDelay: "0.7s" }}
            >
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <Clock size={14} className="text-ecomet flex-shrink-0" />
                4-8 Tage Lieferzeit
              </div>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <ShieldCheck size={14} className="text-ecomet flex-shrink-0" />
                Qualitätskontrolle
              </div>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <Package size={14} className="text-ecomet flex-shrink-0" />
                Dropshipping und Lagern möglich
              </div>
            </div>
          </div>

          <div className="flex flex-shrink-0 items-center justify-end">
            <GlobeOrders className="w-[340px] lg:w-[400px] xl:w-[450px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
