"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Vorteile", href: "/#vorteile" },
  { label: "Starten", href: "/#starten" },
  { label: "Bewertungen", href: "/#bewertungen" },
  { label: "Funktionen", href: "/#funktionen" },
  { label: "FAQ", href: "/#faq" },
  { label: "Kontakt", href: "/#kontakt" },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <Image
            src="/icon-logo.png"
            alt="ecomet"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-white font-semibold text-lg tracking-tight">
            ecomet
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-ecomet group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://gtapp.unifydropshipping.com/auth/register?share=B031.2034151326159671297.false&sign=0f3479af09515ce68412ef3ae4d28b8b" target="_blank" rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-ecomet hover:bg-ecomet-dark text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-ecomet/25"
          >
            Jetzt kostenlos starten
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-white/70 hover:text-white py-2 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://gtapp.unifydropshipping.com/auth/register?share=B031.2034151326159671297.false&sign=0f3479af09515ce68412ef3ae4d28b8b" target="_blank" rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="bg-ecomet hover:bg-ecomet-dark text-white text-sm font-medium px-5 py-2.5 rounded-full text-center transition-all duration-200 mt-2"
              >
                Jetzt kostenlos starten
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
