"use client";

import Image from "next/image";
import { Reveal } from "./reveal";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.21 8.21 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.14Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <Reveal className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/icon-logo.png"
                alt="ecomet"
                width={28}
                height={28}
                className="rounded-lg"
              />
              <span className="text-white font-semibold tracking-tight">
                ecomet
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-6">
              Schluss mit PayPal Fällen & Retouren. Skaliere mit 4 bis 8 Tagen
              Versand & höchster Produktqualität.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/ecomet.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all duration-200"
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="https://www.tiktok.com/@ecomet.de"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all duration-200"
                aria-label="TikTok"
              >
                <TikTokIcon size={16} />
              </a>
            </div>
          </Reveal>

          {/* Navigation */}
          <Reveal delay={80}>
            <h4 className="text-white text-sm font-medium mb-4">Navigation</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Vorteile", href: "/#vorteile" },
                { label: "Starten", href: "/#starten" },
                { label: "Bewertungen", href: "/#bewertungen" },
                { label: "FAQ", href: "/#faq" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Legal */}
          <Reveal delay={160}>
            <h4 className="text-white text-sm font-medium mb-4">
              Rechtsdokumente
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Nutzungsbedingungen", href: "/nutzungsbedingungen" },
                { label: "Datenschutzrichtlinie", href: "/datenschutzrichtlinien" },
                { label: "Impressum", href: "/impressum" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <p className="text-[10px] text-white/20 leading-relaxed max-w-4xl">
            Diese Website ist nicht Teil der Facebook Website oder von Facebook
            Inc. Darüber hinaus wird diese Website in keiner Weise von Facebook
            unterstützt. Facebook ist eine Marke von Facebook, Inc. Wir verwenden
            auf dieser Website Remarketing Pixel/Cookies von Google, um erneut
            mit den Besuchern unserer Website zu kommunizieren und
            sicherzustellen, dass wir sie in Zukunft mit relevanten Nachrichten
            und Informationen erreichen können. Google schaltet unsere Anzeigen
            auf Websites Dritter im Internet, um unsere Botschaft zu
            kommunizieren und die richtigen Personen zu erreichen, die in der
            Vergangenheit Interesse an unseren Informationen gezeigt haben.
          </p>
        </div>
      </div>
    </footer>
  );
}
