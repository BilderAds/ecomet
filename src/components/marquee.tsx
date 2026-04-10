"use client";

import { motion } from "framer-motion";

interface MarqueeProps {
  items: string[];
  speed?: number;
}

export function Marquee({ items, speed = 25 }: MarqueeProps) {
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden py-4 bg-[#0a0a0a] border-y border-white/5">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {duplicatedItems.map((item, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="text-sm font-medium text-white/70 tracking-wide uppercase">
              {item}
            </span>
            <span className="text-ecomet text-lg">&#x2726;</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
