"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Die vier Schritte als Leiter: die Karten sitzen abwechselnd links und
 * rechts, eine Haarlinie verbindet sie von oben nach unten und zeichnet
 * sich beim Scrollen selbst.
 *
 * Die Linie ist keine Deko. Sie zeigt, dass die vier Schritte
 * NACHEINANDER kommen. Das sah man der alten Liste nicht an.
 *
 * Der Weg wird gemessen, nicht geraten: nach dem Aufbau und bei jeder
 * Größenänderung werden die Kartenränder abgefragt und daraus die Kurve
 * gebaut. Feste Pixelwerte würden bei jeder anderen Textlänge brechen.
 */
const schritte = [
  {
    titel: "App installieren",
    text: "Du holst dir die ecomet App in deinem Shopify-Shop. Ein Klick, kein Vertrag, keine Einrichtungsgebühr.",
  },
  {
    titel: "Shop verbinden",
    text: "Deine Produkte und Bestellungen kommen automatisch bei uns an. Du musst nichts abtippen und nichts hochladen.",
  },
  {
    titel: "Lager wählen",
    text: "Deutschland, China oder beides. Wir sagen dir vorher, was eine Bestellung kostet.",
  },
  {
    titel: "Fertig, es läuft",
    text: "Bestellt ein Kunde, packen und verschicken wir. Die Sendungsnummer steht von selbst in deinem Shop.",
  },
];

export function Ablauf() {
  const huelle = useRef<HTMLDivElement>(null);
  const karten = useRef<(HTMLDivElement | null)[]>([]);
  const linie = useRef<SVGPathElement>(null);
  const [weg, setWeg] = useState("");
  const [laenge, setLaenge] = useState(0);
  const [masse, setMasse] = useState({ breite: 0, hoehe: 0 });
  const [gezeichnet, setGezeichnet] = useState(false);

  const messen = useCallback(() => {
    const box = huelle.current;
    if (!box) return;
    // Unter 900 px liegen die Karten untereinander, dort führt keine Kurve.
    if (window.innerWidth < 900) {
      setWeg("");
      return;
    }
    const aussen = box.getBoundingClientRect();
    const punkte = karten.current.filter(Boolean).map((k) => {
      const r = k!.getBoundingClientRect();
      return {
        mitteX: r.left - aussen.left + r.width / 2,
        oben: r.top - aussen.top,
        unten: r.bottom - aussen.top,
      };
    });
    if (punkte.length < 2) return;

    let d = "";
    for (let i = 0; i < punkte.length - 1; i++) {
      const von = punkte[i];
      const nach = punkte[i + 1];
      const abstand = (nach.oben - von.unten) / 2;
      if (i === 0) d += `M ${von.mitteX} ${von.unten}`;
      d += ` C ${von.mitteX} ${von.unten + abstand}, ${nach.mitteX} ${nach.oben - abstand}, ${nach.mitteX} ${nach.oben}`;
    }
    setWeg(d);
    setMasse({ breite: aussen.width, hoehe: aussen.height });
  }, []);

  useEffect(() => {
    messen();
    const beobachter = new ResizeObserver(messen);
    if (huelle.current) beobachter.observe(huelle.current);
    window.addEventListener("resize", messen);
    return () => {
      beobachter.disconnect();
      window.removeEventListener("resize", messen);
    };
  }, [messen]);

  // Die Strichlänge wird gemessen. Ein geratener Wert schneidet die Linie
  // bei jeder anderen Fensterbreite an einer anderen Stelle ab.
  useEffect(() => {
    if (linie.current) setLaenge(linie.current.getTotalLength());
  }, [weg]);

  // Die Linie zeichnet sich einmal, sobald der Abschnitt im Bild ist.
  useEffect(() => {
    const box = huelle.current;
    if (!box) return;
    const beobachter = new IntersectionObserver(
      ([eintrag]) => {
        if (eintrag.isIntersecting) {
          setGezeichnet(true);
          beobachter.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    beobachter.observe(box);
    return () => beobachter.disconnect();
  }, []);

  return (
    <section className="sec" id="ablauf">
      <div className="wrap">
        <div className="sec-head fx">
          <h2 className="sec-h2">
            <span className="mark glow">
              <span>In vier Schritten</span>
            </span>{" "}
            angeschlossen
          </h2>
          <p className="sec-p">Ohne Vertrag, ohne Einrichtungsgebühr, ohne Mindestmenge.</p>
        </div>

        <div className="leiter" ref={huelle}>
          {weg && (
            <svg
              className={`leiter-weg${gezeichnet ? " gezeichnet" : ""}`}
              width={masse.breite}
              height={masse.hoehe}
              viewBox={`0 0 ${masse.breite} ${masse.hoehe}`}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="leiterVerlauf" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--a1)" stopOpacity=".9" />
                  <stop offset="100%" stopColor="var(--a1)" stopOpacity=".25" />
                </linearGradient>
              </defs>
              <path
                ref={linie}
                d={weg}
                fill="none"
                stroke="url(#leiterVerlauf)"
                strokeWidth="1.5"
                strokeLinecap="round"
                style={
                  laenge
                    ? { strokeDasharray: laenge, strokeDashoffset: gezeichnet ? 0 : laenge }
                    : undefined
                }
              />
            </svg>
          )}

          {schritte.map((s, i) => (
            <div key={s.titel} className={`sprosse ${i % 2 === 0 ? "links" : "rechts"}`}>
              <div
                className="sprosse-karte fx"
                data-d={(i % 4) + 1}
                ref={(el) => {
                  karten.current[i] = el;
                }}
              >
                <span className="sprosse-n num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.titel}</h3>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
