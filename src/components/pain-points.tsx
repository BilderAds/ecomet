"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import {
  Ban, Clock, Mail, ThumbsDown, RotateCcw,
  ShieldCheck, Zap, Smile, Award, TrendingDown,
} from "lucide-react";
import type { ComponentType } from "react";
import { Reveal } from "./reveal";

interface CardItem {
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
  description: string;
}

const painPoints: CardItem[] = [
  { icon: Ban, label: "PayPal Freeze", description: "Dein Geld wird eingefroren und du kannst wochenlang nicht darauf zugreifen." },
  { icon: Clock, label: "Lange Lieferzeit", description: "30+ Tage Versand sorgen für ungeduldige Kunden und schlechte Bewertungen." },
  { icon: Mail, label: "Böse Kunden Mails", description: "Beschwerden ohne Ende, weil Pakete nicht ankommen oder beschädigt sind." },
  { icon: ThumbsDown, label: "Miese Produktqualität", description: "Billige Ware die nicht der Beschreibung entspricht und Vertrauen zerstört." },
  { icon: RotateCcw, label: "Retouren", description: "Hohe Retourenquote frisst deine Marge und kostet dich Zeit und Nerven." },
];

const solutions: CardItem[] = [
  { icon: ShieldCheck, label: "Kein PayPal Freeze", description: "Geprüfte Qualität und schneller Versand. Keine Disputes, kein eingefrorenes Geld." },
  { icon: Zap, label: "Kurze Lieferzeit", description: "4-8 Tage in den DACH Raum. Deine Kunden sind happy und bestellen wieder." },
  { icon: Smile, label: "Zufriedene Kunden", description: "Top Qualität und schnelle Lieferung sorgen für positive Bewertungen statt Beschwerden." },
  { icon: Award, label: "Top Produktqualität", description: "Jedes Produkt wird vor dem Versand geprüft. Du lieferst nur einwandfreie Ware." },
  { icon: TrendingDown, label: "Minimale Retouren", description: "Qualitätskontrolle und echte Produktbilder. Kunden bekommen was sie erwarten." },
];

// Thresholds: heading flips first, then each card left to right
const HEADING_THRESHOLD = 0.18;
const CARD_THRESHOLDS = [0.26, 0.34, 0.42, 0.50, 0.58];

function FlipCard({
  pain,
  solution,
  flipped,
  isExpanded,
  onClick,
}: {
  pain: CardItem;
  solution: CardItem;
  flipped: boolean;
  isExpanded: boolean;
  onClick: () => void;
}) {
  const item = flipped ? solution : pain;
  const isRed = !flipped;

  return (
    <motion.div
      onClick={onClick}
      animate={{ flex: isExpanded ? 2 : 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="relative rounded-2xl border cursor-pointer overflow-hidden transition-colors duration-500 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.1)]"
      style={{
        background: isExpanded
          ? isRed ? "#fef2f2" : "#f0fdf4"
          : "#fafafa",
        borderColor: isExpanded
          ? isRed ? "#fca5a5" : "#86efac"
          : "#e5e5e5",
      }}
    >
      <div className="p-5 h-full flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-500"
              style={{
                background: isExpanded
                  ? isRed ? "#fee2e2" : "#dcfce7"
                  : "#f5f5f5",
              }}
            >
              <item.icon className={isRed ? "text-red-400" : "text-green-500"} size={24} />
            </div>
            <span className="text-base font-semibold text-[#0a0a0a] whitespace-nowrap">
              {item.label}
            </span>
            <p
              className="text-xs text-[#737373] leading-relaxed mt-2 transition-opacity duration-300 line-clamp-2"
              style={{ opacity: isExpanded ? 1 : 0 }}
            >
              {item.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {isExpanded && (
        <div className={`absolute bottom-0 left-0 right-0 h-1 transition-colors duration-500 ${isRed ? "bg-red-100" : "bg-green-100"}`}>
          <motion.div
            className={`h-full rounded-full transition-colors duration-500 ${isRed ? "bg-red-400" : "bg-green-500"}`}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "linear" }}
            key={item.label}
          />
        </div>
      )}
    </motion.div>
  );
}

// Mobile transformation row. Driven by a shared `solved` state that auto-toggles every
// few seconds: the pain gets struck through (line draws across), the gain rises in,
// the icon lights up from grey to brand orange. Pure CSS transitions (no jank).
function TransformRow({
  pain,
  gain,
  icon: Icon,
  solved,
}: {
  pain: string;
  gain: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  solved: boolean;
}) {
  return (
    <div
      className="flex items-center gap-4 rounded-2xl border px-4 transition-colors duration-500"
      style={{
        minHeight: 76,
        background: solved ? "#f0fdf4" : "#fef2f2",
        borderColor: solved ? "#bbf7d0" : "#fecdd3",
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-500"
        style={{ background: solved ? "#dcfce7" : "#fee2e2" }}
      >
        <Icon
          size={22}
          className={`transition-colors duration-500 ${solved ? "text-green-600" : "text-red-500"}`}
        />
      </div>

      <div className="flex-1 min-w-0">
        <span className="relative inline-block align-top">
          <span
            className={`block font-semibold leading-tight transition-all duration-500 ${
              solved ? "text-[13px] text-[#9ca3af]" : "text-[17px] text-[#b42318]"
            }`}
          >
            {pain}
          </span>
          <span
            className={`pointer-events-none absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-red-400 origin-left transition-transform duration-[600ms] ease-out ${
              solved ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </span>
        <div
          className={`overflow-hidden font-bold leading-tight text-green-700 transition-all duration-500 ${
            solved ? "opacity-100 max-h-12 mt-1 text-[17px]" : "opacity-0 max-h-0 text-[17px]"
          }`}
          style={{ transitionDelay: solved ? "220ms" : "0ms" }}
        >
          {gain}
        </div>
      </div>
    </div>
  );
}

export function PainPoints() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedCount, setFlippedCount] = useState(0); // 0 = all red, 6 = heading + 5 cards all green
  const [headingFlipped, setHeadingFlipped] = useState(false);
  const [solved, setSolved] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const mobileSecRef = useRef<HTMLElement>(null);
  const mobileInView = useRef(false);

  // Mobile: auto-toggle problem <-> solution every few seconds, but only while the
  // section is on screen (so it never burns cycles in the background).
  useEffect(() => {
    const el = mobileSecRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        mobileInView.current = entry.isIntersecting;
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    const id = setInterval(() => {
      if (mobileInView.current) setSolved((s) => !s);
    }, 4000);
    return () => {
      io.disconnect();
      clearInterval(id);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setHeadingFlipped(v >= HEADING_THRESHOLD);
    let count = 0;
    for (const t of CARD_THRESHOLDS) {
      if (v >= t) count++;
    }
    setFlippedCount(count);
  });

  // Auto rotate the active/expanded card
  // Auto rotate active card
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Mobile: auto-toggles problem <-> solution every 4s. The pains get struck
          through, the gains rise in, the heading flips to the brand claim. */}
      <section ref={mobileSecRef} id="vorteile" className="md:hidden py-16 bg-white overflow-hidden">
        <div className="px-5">
          <Reveal className="relative mb-9">
            <h2
              className="text-[26px] font-bold leading-tight text-[#0a0a0a] transition-opacity duration-300"
              style={{ opacity: solved ? 0 : 1, transitionDelay: solved ? "0ms" : "300ms" }}
            >
              Jeder Dropshipper kennt es:
            </h2>
            <h2
              aria-hidden={!solved}
              className="absolute inset-0 text-[26px] font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500 transition-opacity duration-300"
              style={{ opacity: solved ? 1 : 0, transitionDelay: solved ? "300ms" : "0ms" }}
            >
              Mit ecomet läuft es anders
            </h2>
          </Reveal>

          {/* Auto-switch progress: fills over the cycle so it's clear a switch is coming. */}
          <Reveal className="mb-6 h-1 w-full rounded-full bg-[#f1f1f1] overflow-hidden">
            <div
              key={solved ? "s" : "p"}
              className="h-full w-full rounded-full origin-left"
              style={{
                background: solved ? "#22c55e" : "#f87171",
                animation: "progress-fill 4s linear",
              }}
            />
          </Reveal>

          <div className="flex flex-col gap-3">
            {painPoints.map((pain, i) => (
              <TransformRow
                key={i}
                pain={pain.label}
                gain={solutions[i].label}
                icon={solutions[i].icon}
                solved={solved}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Desktop: Sticky scroll with individual card flips */}
      <div ref={sectionRef} className="relative h-[300vh] hidden md:block">
        <div className="sticky top-0 h-screen overflow-hidden bg-white">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full">
              <div className="text-center mb-16 px-4">
                <AnimatePresence mode="wait">
                  {!headingFlipped ? (
                    <motion.h2
                      key="pain"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="text-3xl lg:text-5xl font-bold text-[#0a0a0a]"
                    >
                      Jeder Dropshipper kennt es:
                    </motion.h2>
                  ) : (
                    <motion.h2
                      key="solution"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="text-3xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500"
                    >
                      Mit ecomet läuft es anders
                    </motion.h2>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex gap-4 px-6 sm:px-8 lg:px-12 overflow-hidden">
                {painPoints.map((pain, i) => (
                  <FlipCard
                    key={i}
                    pain={pain}
                    solution={solutions[i]}
                    flipped={i < flippedCount}
                    isExpanded={i === activeIndex}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
