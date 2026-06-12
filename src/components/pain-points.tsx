"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
  Ban, Clock, Mail, ThumbsDown, RotateCcw,
  ShieldCheck, Zap, Smile, Award, TrendingDown,
} from "lucide-react";
import type { ComponentType, CSSProperties } from "react";
import { Reveal } from "./reveal";

interface CardItem {
  icon: ComponentType<{ size?: number; className?: string; style?: CSSProperties }>;
  label: string;
  description: string;
}

// Rows don't switch all at once. The heading leads, then each row ripples in after it,
// one by one. Spreads the paint work (color fades) over time instead of one big frame.
const ROW_BASE_DELAY = 280; // ms, lets the heading move first
const ROW_STAGGER = 110; // ms between rows

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

// Mobile transformation row. Driven by a shared `solved` state that auto toggles every
// few seconds. Everything that moves uses only opacity and transform (GPU composited),
// never font-size, max-height or margin. That keeps it off the layout path so it stays
// smooth even on weaker phones like the iPhone 12. The pain and gain sit in a fixed
// height box and cross fade, the strike line draws via scaleX, the colors fade.
function TransformRow({
  pain,
  gain,
  icon: Icon,
  solved,
  delay,
}: {
  pain: string;
  gain: string;
  icon: ComponentType<{ size?: number; className?: string; style?: CSSProperties }>;
  solved: boolean;
  delay: number;
}) {
  const d = `${delay}ms`;
  return (
    <div
      className="flex items-center gap-4 rounded-2xl border px-4 transition-colors duration-500"
      style={{
        minHeight: 76,
        background: solved ? "#f0fdf4" : "#fef2f2",
        borderColor: solved ? "#bbf7d0" : "#fecdd3",
        transitionDelay: d,
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-500"
        style={{ background: solved ? "#dcfce7" : "#fee2e2", transitionDelay: d }}
      >
        <Icon
          size={22}
          className={`transition-colors duration-500 ${solved ? "text-green-600" : "text-red-500"}`}
          style={{ transitionDelay: d }}
        />
      </div>

      <div className="relative h-7 flex-1 min-w-0">
        {/* Pain layer: fades and lifts out, strike line draws across it */}
        <span
          aria-hidden={solved}
          className="absolute inset-0 flex items-center transition-[opacity,transform] duration-500 ease-out will-change-transform"
          style={{ opacity: solved ? 0 : 1, transform: solved ? "translateY(-6px)" : "translateY(0)", transitionDelay: d }}
        >
          <span className="font-semibold text-[17px] leading-tight text-[#b42318] whitespace-nowrap">
            {pain}
          </span>
        </span>

        {/* Gain layer: fades and rises in */}
        <span
          aria-hidden={!solved}
          className="absolute inset-0 flex items-center transition-[opacity,transform] duration-500 ease-out will-change-transform"
          style={{ opacity: solved ? 1 : 0, transform: solved ? "translateY(0)" : "translateY(6px)", transitionDelay: d }}
        >
          <span className="font-bold text-[17px] leading-tight text-green-700 whitespace-nowrap">
            {gain}
          </span>
        </span>
      </div>
    </div>
  );
}

// Mobile only. Owns its own `solved` state so the 4s toggle re-renders just these five
// rows, never the hidden desktop tree.
function PainPointsMobile() {
  const [solved, setSolved] = useState(false);
  const secRef = useRef<HTMLElement>(null);
  const inView = useRef(false);

  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    const id = setInterval(() => {
      if (inView.current) setSolved((s) => !s);
    }, 4000);
    return () => {
      io.disconnect();
      clearInterval(id);
    };
  }, []);

  return (
    <section ref={secRef} id="vorteile" className="md:hidden py-16 bg-white overflow-hidden">
      <div className="px-5">
        <Reveal className="relative mb-9">
          {/* Soft overlapping cross-fade with a gentle slide. Both move at once over the
              same window so there is never a blank moment, which is what made the old
              swap look abrupt and buggy. */}
          <h2
            className="text-center text-[22px] font-bold tracking-tight leading-tight text-[#0a0a0a] whitespace-nowrap transition-[opacity,transform] duration-700 ease-out will-change-transform"
            style={{ opacity: solved ? 0 : 1, transform: solved ? "translateY(-8px)" : "translateY(0)" }}
          >
            Jeder Dropshipper kennt es:
          </h2>
          <h2
            aria-hidden={!solved}
            className="absolute inset-0 text-center text-[22px] font-bold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500 whitespace-nowrap transition-[opacity,transform] duration-700 ease-out will-change-transform"
            style={{ opacity: solved ? 1 : 0, transform: solved ? "translateY(0)" : "translateY(8px)" }}
          >
            Mit ecomet läuft es anders
          </h2>
        </Reveal>

        {/* Auto-switch progress: small centered accent that fills over the cycle so it's
            clear a switch is coming. Kept short on purpose, just a design detail. */}
        <Reveal className="mb-6 mx-auto h-1 w-16 rounded-full bg-[#f1f1f1] overflow-hidden">
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
              delay={ROW_BASE_DELAY + i * ROW_STAGGER}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Desktop only. Sticky scroll with individual card flips. Its scroll listener and rotate
// interval are gated behind a real desktop check so they never re-render on mobile, where
// this whole block is display:none.
function PainPointsDesktop() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedCount, setFlippedCount] = useState(0);
  const [headingFlipped, setHeadingFlipped] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isDesktop = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => {
      isDesktop.current = mq.matches;
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!isDesktop.current) return; // never re-render on mobile scroll
    setHeadingFlipped(v >= HEADING_THRESHOLD);
    let count = 0;
    for (const t of CARD_THRESHOLDS) {
      if (v >= t) count++;
    }
    setFlippedCount(count);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDesktop.current) return;
      setActiveIndex((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
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
  );
}

export function PainPoints() {
  return (
    <>
      <PainPointsMobile />
      <PainPointsDesktop />
    </>
  );
}
