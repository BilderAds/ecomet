"use client";

import { UserPlus, Link2, MessageSquare } from "lucide-react";
import { Reveal } from "./reveal";

const steps = [
  {
    number: "1",
    icon: UserPlus,
    title: "Kostenlos registrieren",
    description:
      "Du wirst automatisch zu unserer Partnerplattform UnifyDropshipping weitergeleitet. Dort trägst du Name, E-Mail und Passwort ein, fertig.",
  },
  {
    number: "2",
    icon: Link2,
    title: "Shop verbinden",
    description:
      "Die Unify Shopify App installieren. Klicke nach dem Anmelden auf \u201EConnect Shopify\u201C und anschlie\u00DFend auf \u201EAuthorize\u201C. Dann einfach Shopify App installieren.",
  },
  {
    number: "3",
    icon: MessageSquare,
    title: "Agent schreibt dich an",
    description:
      "Dein persönlicher Agent meldet sich per WhatsApp. Du musst ihm nur dein gewünschtes Produkt nennen, er gibt dir den Preis und dann übernehmen wir für dich das Fulfillment.",
  },
];

export function Steps() {
  return (
    <section id="starten" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a0a0a] mb-4">
            In 3 Schritten zu stressfreiem Fulfillment
          </h2>
          <p className="text-[#737373] text-lg">
            Komplett kostenlos & unverbindlich
          </p>
        </Reveal>

        <div className="relative max-w-3xl mx-auto">
          {/* Connecting line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-ecomet/20 via-ecomet/40 to-ecomet/20 hidden sm:block" />

          <div className="flex flex-col gap-12">
            {steps.map((step) => (
              <Reveal key={step.number}>
                <div className="flex gap-6 sm:gap-8 items-start">
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-ecomet flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-ecomet/25">
                      {step.number}
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center gap-3 mb-3">
                      <step.icon size={20} className="text-ecomet" />
                      <h3 className="text-xl font-semibold text-[#0a0a0a]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-[#737373] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="flex justify-center mt-16">
          <a
            href="https://gtapp.unifydropshipping.com/auth/register?share=B031.2034151326159671297.false&sign=0f3479af09515ce68412ef3ae4d28b8b" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-ecomet hover:bg-ecomet-dark text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-ecomet/25"
          >
            Jetzt Shop verbinden
          </a>
        </Reveal>
      </div>
    </section>
  );
}
