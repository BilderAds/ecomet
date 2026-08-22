import type { Metadata } from "next";
import { Rahmen, SeitenKopf } from "@/components/start/rahmen";
import { AnfrageFormular } from "@/components/start/anfrage-formular";

export const metadata: Metadata = {
  title: "Kontakt | ecomet",
  description:
    "Frag uns nach Preisen, nach einem Produkt oder danach, ob dein Fall zu uns passt. Wir antworten am selben Werktag.",
};

export default function Kontakt() {
  return (
    <Rahmen>
      <SeitenKopf
        ueber="Kontakt"
        titel={
          <>
            Frag uns <span className="accent">alles</span>
          </>
        }
        satz="Preise, ein bestimmtes Produkt, oder ob dein Fall überhaupt zu uns passt. Wir antworten am selben Werktag, auf Deutsch, ohne Verkaufsmasche."
      />

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="fx">
            <AnfrageFormular art="kontakt" quelle="/kontakt" />
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="claim fx" style={{ textAlign: "center" }}>
            <h3>Lieber direkt schreiben?</h3>
            <p>
              <a href="mailto:info@e-comet.de" style={{ color: "var(--a1)" }}>
                info@e-comet.de
              </a>
            </p>
          </div>
        </div>
      </section>
    </Rahmen>
  );
}
