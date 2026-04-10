"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, MessageCircle } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Blitzschnelle Lieferung\nnur 4 bis 8 Tage",
    description:
      "Deine Kunden erhalten ihre Bestellung schnell. Weniger Beschwerden, bessere Bewertungen, mehr Umsatz.",
  },
  {
    icon: ShieldCheck,
    title: "Beste Qualität\nweniger Retouren",
    description:
      "Jedes Produkt wird vor dem Versand geprüft. Das bedeutet zufriedene Kunden und keine PayPal Fälle.",
  },
  {
    icon: MessageCircle,
    title: "Dein persönlicher Agent in China\nDirekter Kontakt",
    description:
      "Du hast einen festen Ansprechpartner. Per WhatsApp erreichbar, kümmert sich um alles für dich.",
  },
];

export function Solution() {
  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-ecomet/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="block">Du verkaufst</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ecomet to-ecomet-light">
              & wir liefern
            </span>
          </h2>
          <p className="text-white/50 text-lg">
            Von Dropshippern für Dropshipper. So sieht dein Fulfillment ab jetzt aus.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-ecomet/30 hover:bg-white/[0.05] transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-ecomet/10 flex items-center justify-center mb-6 group-hover:bg-ecomet/20 transition-colors duration-300">
                <benefit.icon className="text-ecomet" size={22} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 whitespace-pre-line leading-snug">
                {benefit.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex justify-center mt-12"
        >
          <a
            href="https://gtapp.unifydropshipping.com/auth/register?share=B031.2034151326159671297.false&sign=0f3479af09515ce68412ef3ae4d28b8b" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-ecomet hover:bg-ecomet-dark text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-ecomet/25"
          >
            Jetzt kostenlos starten
          </a>
        </motion.div>
      </div>
    </section>
  );
}
