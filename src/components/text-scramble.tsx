"use client";

import { useEffect, useState, useCallback } from "react";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface TextScrambleProps {
  text: string;
  delay?: number;
  className?: string;
}

export function TextScramble({ text, delay = 0, className }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState("");
  const [started, setStarted] = useState(false);

  const scramble = useCallback(() => {
    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iteration += 1 / 2;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStarted(true);
      scramble();
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, scramble]);

  if (!started) return <span className={className}>&nbsp;</span>;

  return <span className={className}>{displayText}</span>;
}
