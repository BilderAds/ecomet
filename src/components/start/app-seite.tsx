import Image from "next/image";
import Link from "next/link";
import { Rahmen, SeitenKopf } from "./rahmen";

export type AppSeitenInhalt = {
  ueber: string;
  titel: React.ReactNode;
  satz: string;
  bild: { pfad: string; breite: number; hoehe: number; alt: string };
  nervt: { titel: string; text: string }[];
  schritte: [string, string][];
  funktionen: string[];
  /** Was die App NICHT tut. Ehrlichkeit schlägt Vollständigkeit. */
  nichtDrin?: string[];
  preis: { zeile: string; zusatz?: string };
  fragen: { frage: string; antwort: string }[];
  knopf: { text: string; ziel: string };
};

const Haken = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export function AppSeite({ inhalt }: { inhalt: AppSeitenInhalt }) {
  return (
    <Rahmen>
      <SeitenKopf ueber={inhalt.ueber} titel={inhalt.titel} satz={inhalt.satz} />

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="zwei-bild fx">
            <Image
              src={inhalt.bild.pfad}
              alt={inhalt.bild.alt}
              width={inhalt.bild.breite}
              height={inhalt.bild.hoehe}
              priority
            />
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head fx">
            <h2 className="sec-h2">Ohne die App sieht das so aus</h2>
          </div>
          <div className="svc">
            {inhalt.nervt.map((n, i) => (
              <div key={n.titel} className="svc-card fx" data-d={(i % 3) + 1}>
                <h3>{n.titel}</h3>
                <p>{n.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head fx">
            <h2 className="sec-h2">
              <span className="mark glow">
                <span>So läuft es</span>
              </span>{" "}
              mit der App
            </h2>
          </div>
          <div className="steps">
            {inhalt.schritte.map(([titel, text], i) => (
              <div key={titel} className={`step fx${i === 0 ? " active" : ""}`} data-d={i + 1}>
                <div className="step-n num">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3>{titel}</h3>
                  <p>{text}</p>
                  <div className="step-line">
                    <i />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="zwei">
            <div className="fx">
              <h2>Was drin ist</h2>
              <ul className="haken">
                {inhalt.funktionen.map((f) => (
                  <li key={f}>
                    <Haken /> {f}
                  </li>
                ))}
              </ul>
              {inhalt.nichtDrin && inhalt.nichtDrin.length > 0 && (
                <>
                  <p style={{ marginTop: 28, marginBottom: 6, fontWeight: 600, color: "#fff" }}>
                    Was sie nicht tut
                  </p>
                  <ul className="haken">
                    {inhalt.nichtDrin.map((n) => (
                      <li key={n} style={{ color: "rgba(255,255,255,.5)" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: "rgba(255,255,255,.3)" }}>
                          <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                        {n}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div className="tab-huelle fx" data-d="1" style={{ alignSelf: "start" }}>
              <span className="svc-tag">Preis</span>
              <p style={{ fontSize: "2rem", fontWeight: 700, margin: "10px 0 6px", letterSpacing: "-.02em" }}>
                {inhalt.preis.zeile}
              </p>
              {inhalt.preis.zusatz && (
                <p style={{ color: "rgba(255,255,255,.6)", fontSize: ".9375rem", lineHeight: 1.6 }}>
                  {inhalt.preis.zusatz}
                </p>
              )}
              <div style={{ marginTop: 22 }}>
                <span className="glass-wrap">
                  <Link href={inhalt.knopf.ziel} className="glass-btn">
                    <span className="glass-txt">{inhalt.knopf.text}</span>
                  </Link>
                  <span className="glass-shadow" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec faq-sec">
        <div className="wrap">
          <div className="sec-head fx">
            <h2 className="sec-h2">Häufige Fragen</h2>
          </div>
          <div className="faq">
            {inhalt.fragen.map((f, i) => (
              <div key={f.frage} className={`faq-item fx${i === 0 ? " open" : ""}`} data-d={(i % 3) + 1}>
                <button className="faq-q">
                  {f.frage}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div className="faq-a">
                  <div>{f.antwort}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Rahmen>
  );
}
