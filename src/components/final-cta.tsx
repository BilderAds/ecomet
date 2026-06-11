"use client";

import { Star } from "lucide-react";
import { Reveal } from "./reveal";

export function FinalCta() {
  return (
    <section
      id="kontakt"
      className="relative py-24 overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a0f08] to-[#0a0a0a]" />
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-ecomet/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Bereit für sorgenfreies{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ecomet to-ecomet-light">
              Skalieren?
            </span>
          </h2>
        </Reveal>

        <Reveal>
          <p className="text-white/50 text-lg mb-10 max-w-2xl mx-auto">
            Skaliere sorgenfrei mit 4 bis 8 Tagen Versand & höchster
            Produktqualität.
          </p>
        </Reveal>

        <Reveal className="flex flex-col items-center gap-6">
          <a
            href="https://gtapp.unifydropshipping.com/auth/register?share=B031.2034151326159671297.false&sign=0f3479af09515ce68412ef3ae4d28b8b" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-ecomet hover:bg-ecomet-dark text-white font-semibold px-10 py-5 rounded-full text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-ecomet/30 hover:scale-[1.02]"
          >
            Jetzt kostenlos starten
          </a>

          <div className="flex items-center gap-2 text-sm text-white/40">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="fill-ecomet text-ecomet" />
              ))}
            </div>
            4.8 von 5 Sternen
          </div>
        </Reveal>
      </div>
    </section>
  );
}
