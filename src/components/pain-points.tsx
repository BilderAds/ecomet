"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import {
  Ban, Clock, Mail, ThumbsDown, RotateCcw,
  ShieldCheck, Zap, Smile, Award, TrendingDown,
} from "lucide-react";
import type { ComponentType } from "react";

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

function MobileFlipCard({
  pain,
  solution,
  flipped,
}: {
  pain: CardItem;
  solution: CardItem;
  flipped: boolean;
}) {
  const item = flipped ? solution : pain;
  const isRed = !flipped;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={item.label}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3 }}
        className="relative rounded-2xl border overflow-hidden"
        style={{
          background: isRed ? "#fef2f2" : "#f0fdf4",
          borderColor: isRed ? "#fca5a5" : "#86efac",
        }}
      >
        <div className="p-5 flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: isRed ? "#fee2e2" : "#dcfce7" }}
          >
            <item.icon className={isRed ? "text-red-400" : "text-green-500"} size={20} />
          </div>
          <div>
            <span className="text-sm font-semibold text-[#0a0a0a]">{item.label}</span>
            <p className="text-xs text-[#737373] leading-relaxed mt-1">{item.description}</p>
          </div>
        </div>
        <div className={`absolute bottom-0 left-0 right-0 h-1 ${isRed ? "bg-red-100" : "bg-green-100"}`}>
          <motion.div
            className={`h-full rounded-full ${isRed ? "bg-red-400" : "bg-green-500"}`}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "linear" }}
            key={"m-" + item.label}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function PainPoints() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedCount, setFlippedCount] = useState(0); // 0 = all red, 6 = heading + 5 cards all green
  const [headingFlipped, setHeadingFlipped] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  // Mobile: auto flip cards with timer instead of scroll
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 768) return;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step <= 6) {
        setHeadingFlipped(step >= 1);
        setFlippedCount(Math.min(step, 5));
      } else if (step <= 12) {
        const reverseStep = 12 - step;
        setHeadingFlipped(reverseStep < 5);
        setFlippedCount(reverseStep);
      } else {
        step = 0;
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Mobile: Simple auto-rotating, no sticky scroll, no framer-motion */}
      <section id="vorteile" className="md:hidden py-12 bg-white">
        <div className="px-4">
          <div className="text-center mb-8">
            <h2
              className={`text-2xl font-bold transition-all duration-500 ${
                headingFlipped
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500"
                  : "text-[#0a0a0a]"
              }`}
            >
              {headingFlipped ? "Mit ecomet läuft es anders" : "Jeder Dropshipper kennt es:"}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {painPoints.map((pain, i) => {
              const item = i < flippedCount ? solutions[i] : pain;
              const isRed = i >= flippedCount;
              const isLast = i === 4;
              return (
                <div
                  key={i}
                  className={`rounded-2xl border shadow-[0_2px_20px_-4px_rgba(0,0,0,0.1)] transition-colors duration-700 ${isLast ? "col-span-2" : ""}`}
                  style={{
                    background: isRed ? "#fef2f2" : "#f0fdf4",
                    borderColor: isRed ? "#fca5a5" : "#86efac",
                  }}
                >
                  <div className={`p-4 flex flex-col items-center justify-center text-center gap-2 ${isLast ? "py-5 flex-row gap-3" : ""}`}>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-700"
                      style={{ background: isRed ? "#fee2e2" : "#dcfce7" }}
                    >
                      <item.icon className={`transition-colors duration-700 ${isRed ? "text-red-400" : "text-green-500"}`} size={20} />
                    </div>
                    <span className="text-xs font-semibold text-[#0a0a0a]">{item.label}</span>
                  </div>
                </div>
              );
            })}
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
