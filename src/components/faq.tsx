"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Kann ich ecomet auch als Anfänger nutzen?",
    answer:
      "Ja, absolut! Unser System ist so einfach gestaltet, dass auch Einsteiger sofort loslegen können. Registriere dich kostenlos, verbinde deinen Shop und dein persönlicher Agent kümmert sich um den Rest.",
  },
  {
    question: "Wie funktioniert ecomet?",
    answer:
      "Du registrierst dich kostenlos, verbindest deinen Shopify Shop und bekommst einen persönlichen Agenten zugeteilt. Dieser kümmert sich um Sourcing, Qualitätskontrolle und Versand. Du konzentrierst dich auf den Verkauf.",
  },
  {
    question: "Welche Zahlungsoptionen gibt es?",
    answer:
      "Wir bieten ein flexibles Balance System. Du lädst dein Guthaben auf und zahlst damit deine Bestellungen. Keine täglichen Rechnungen, kein Cashflow Stress.",
  },
  {
    question: "Kann ich mein Produkt individuell branden & verpacken?",
    answer:
      "Ja! Wir bieten individuelle Verpackungen, Logos und personalisierte Produkte an. Mach deine Marke einzigartig und hebe dich von der Konkurrenz ab.",
  },
  {
    question: "Gibt es eine Mindestbestellmenge (MOQ)?",
    answer:
      "Nein, es gibt keine Mindestbestellmenge. Du kannst auch einzelne Produkte bestellen. Perfekt zum Testen neuer Produkte.",
  },
  {
    question: "Wie läuft die Rücksendung ab?",
    answer:
      "Rücksendungen werden über unser System abgewickelt. Dein persönlicher Agent hilft dir bei jedem Schritt und sorgt für eine schnelle Lösung.",
  },
  {
    question: "Sehen Kunden, dass das Produkt aus China kommt?",
    answer:
      "Nein. Durch unsere schnellen Lieferzeiten von 4 bis 8 Tagen und professionelle Verpackung merken deine Kunden keinen Unterschied zu lokalen Sendungen.",
  },
  {
    question: "Bietet ihr Mengenrabatte an?",
    answer:
      "Ja, bei größeren Bestellmengen bekommst du bessere Preise. Dein persönlicher Agent kann dir individuelle Angebote machen.",
  },
  {
    question: "Muss ich meine Bestellungen im Voraus bezahlen?",
    answer:
      "Ja, Bestellungen werden über dein aufgeladenes Balance Guthaben bezahlt. So behältst du immer die volle Kontrolle über deine Ausgaben.",
  },
];

function FaqItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-[#e5e5e5] last:border-b-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-[#0a0a0a] font-medium pr-8 group-hover:text-ecomet transition-colors duration-200">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`text-[#737373] flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-[#737373] text-sm leading-relaxed pb-5">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-center text-[#0a0a0a] mb-16"
        >
          Häufig gestellte Fragen (FAQ)
        </motion.h2>

        <div className="border-t border-[#e5e5e5]">
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              index={i}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex justify-center mt-12"
        >
          <a
            href="https://gtapp.unifydropshipping.com/auth/register?share=B031.2034151326159671297.false&sign=0f3479af09515ce68412ef3ae4d28b8b" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0a0a0a] hover:bg-[#1a1a1a] text-white font-medium px-6 py-3 rounded-full transition-all duration-300"
          >
            Jetzt starten
          </a>
        </motion.div>
      </div>
    </section>
  );
}
