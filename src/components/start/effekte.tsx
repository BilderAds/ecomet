"use client";

import { useEffect } from "react";

/**
 * Die drei Effekte der dark-glass-Vorlage, eins zu eins übernommen aus
 * `vorlagen/dark-glass/vorlage.html`: Einblenden beim Scrollen, Fragen
 * auf- und zuklappen, aktiver Schritt beim Überfahren. Dazu die mobile
 * Leiste, die erscheint, sobald die Bühne durch ist.
 *
 * Bewusst zu Fuß mit IntersectionObserver, keine Bibliothek. skaile.de
 * macht es genauso.
 */
export function Effekte() {
  useEffect(() => {
    const einblenden = new IntersectionObserver(
      (eintraege) => {
        eintraege.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            einblenden.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    document.querySelectorAll(".fx").forEach((el) => einblenden.observe(el));

    const beiFrageKlick = (ereignis: Event) => {
      const knopf = (ereignis.target as HTMLElement).closest(".faq-q");
      if (!knopf) return;
      const eintrag = knopf.closest(".faq-item");
      if (!eintrag) return;
      const warOffen = eintrag.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
      if (!warOffen) eintrag.classList.add("open");
    };
    document.addEventListener("click", beiFrageKlick);

    const schritte = Array.from(document.querySelectorAll(".step"));
    const beiSchritt = (ereignis: Event) => {
      const schritt = ereignis.currentTarget as HTMLElement;
      schritte.forEach((x) => x.classList.remove("active"));
      schritt.classList.add("active");
    };
    schritte.forEach((s) => s.addEventListener("mouseenter", beiSchritt));

    const leiste = document.getElementById("mbar");
    const buehne = document.querySelector(".hero");
    let leisteBeobachter: IntersectionObserver | undefined;
    if (leiste && buehne) {
      leisteBeobachter = new IntersectionObserver(
        ([e]) => leiste.classList.toggle("show", !e.isIntersecting),
        { threshold: 0 },
      );
      leisteBeobachter.observe(buehne);
    }

    return () => {
      einblenden.disconnect();
      leisteBeobachter?.disconnect();
      document.removeEventListener("click", beiFrageKlick);
      schritte.forEach((s) => s.removeEventListener("mouseenter", beiSchritt));
    };
  }, []);

  return null;
}
