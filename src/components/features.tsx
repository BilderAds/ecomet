"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Search,
  ShieldCheck,
  Palette,
  Warehouse,
  CreditCard,
  Star,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Blitzschnelles Fulfillment",
    description:
      "4 bis 8 Tage Lieferzeit in den DACH Raum. Glückliche Kunden, weniger Retouren, mehr Umsätze.",
  },
  {
    icon: Search,
    title: "Eigenes Sourcing Team",
    description:
      "Wir finden für dich die besten Produkte zum besten Preis mit direktem Zugang zu den großen Fabriken.",
  },
  {
    icon: ShieldCheck,
    title: "Qualitätskontrolle",
    description:
      "Jede Lieferung wird geprüft, damit du die perfekte Ware erhältst. Weniger PayPal Fälle & Beschwerde Mails.",
  },
  {
    icon: Palette,
    title: "Branding Möglichkeit",
    description:
      "Mach deine Marke einzigartig, individuelle Verpackungen, Logos & personalisierte Produkte.",
  },
  {
    icon: Warehouse,
    title: "Lager",
    description:
      "Lager deine Produkte bei uns kostenlos, du skalierst ohne Risiko & bleibst jederzeit lieferfähig.",
  },
  {
    icon: CreditCard,
    title: "Flexible Zahlung",
    description:
      "Keine täglichen Rechnungen, kein Cashflow Stress. Skaliere sorgenfrei mit unserem Zahlungsmodell (Balance aufladen).",
  },
];

export function Features() {
  return (
    <section id="funktionen" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a0a0a]">
            Liste aller Funktionen
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-8 rounded-2xl bg-[#fafafa] border border-[#e5e5e5] hover:border-ecomet/30 hover:shadow-lg hover:shadow-ecomet/5 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-ecomet/10 flex items-center justify-center mb-6 group-hover:bg-ecomet/20 transition-colors duration-300">
                <feature.icon className="text-ecomet" size={22} />
              </div>
              <h3 className="text-lg font-semibold text-[#0a0a0a] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#737373] text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col items-center gap-4 mt-12"
        >
          <a
            href="https://gtapp.unifydropshipping.com/auth/register?share=B031.2034151326159671297.false&sign=0f3479af09515ce68412ef3ae4d28b8b" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-ecomet hover:bg-ecomet-dark text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-ecomet/25"
          >
            Jetzt kostenlos starten
          </a>
          <div className="flex items-center gap-2 text-sm text-[#737373]">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={
                    i < 5 ? "fill-ecomet text-ecomet" : "text-[#e5e5e5]"
                  }
                />
              ))}
            </div>
            4.8 von 5 (1450 Bewertungen)
          </div>
        </motion.div>
      </div>
    </section>
  );
}
