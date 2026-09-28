"use client";

import Link from "next/link";
import { useState } from "react";
import { rechne, STAND, TRANSPORTE, WARENGRUPPEN, type Transport } from "@/inhalte/import-rechnung";

/**
 * Import-Rechner auf /fulfillment/import. Rechnet komplett im Browser, keine
 * Anfrage an einen Server. Logik und Richtwerte: `src/inhalte/import-rechnung.ts`.
 * Startwerte sind Beispielwerte und stehen als solche da.
 */

const euro = (x: number, stellen = 0) =>
  x.toLocaleString("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: stellen, maximumFractionDigits: stellen });

/** Liest deutsche und englische Schreibweise: „2,50“, „2.50“, „1.000“, „1.000,5“. */
export function zahl(roh: string): number {
  const s = roh.trim().replace(/\s/g, "");
  if (s.includes(",")) return Number(s.replace(/\./g, "").replace(",", "."));
  if (/^\d{1,3}(\.\d{3})+$/.test(s)) return Number(s.replace(/\./g, ""));
  return Number(s);
}

function Feld({ id, label, wert, setze, einheit, hinweis }: {
  id: string; label: string; wert: string; setze: (s: string) => void; einheit: string; hinweis?: string;
}) {
  return (
    <div className="feld">
      <label htmlFor={id}>{label}</label>
      <div className="rechner-eingabe">
        <input id={id} inputMode="decimal" value={wert} onChange={(e) => setze(e.target.value)} />
        <span>{einheit}</span>
      </div>
      {hinweis && <span className="feld-hinweis">{hinweis}</span>}
    </div>
  );
}

export function ImportRechner() {
  const [stueckpreis, setStueckpreis] = useState("2,00");
  const [stueck, setStueck] = useState("5000");
  const [gewicht, setGewicht] = useState("1000");
  const [volumen, setVolumen] = useState("5");
  const [transport, setTransport] = useState<Transport>("lcl");
  const [gruppe, setGruppe] = useState(0);
  const [eigenerSatz, setEigenerSatz] = useState("0");
  const [antidumping, setAntidumping] = useState("0");

  const satz = WARENGRUPPEN[gruppe]?.satz;
  const r = rechne({
    stueckpreis: zahl(stueckpreis),
    stueck: zahl(stueck),
    gewichtKg: zahl(gewicht),
    volumenM3: zahl(volumen),
    transport,
    zollProzent: satz ?? zahl(eigenerSatz),
    antidumpingProzent: zahl(antidumping),
  });
  const dauer = TRANSPORTE.find((t) => t.wert === transport)?.dauer;

  const posten: [string, number][] = [
    ["Ware ab Werk", r.ware],
    ["Fracht", r.fracht],
    ["Hafen, Papiere, Verzollung, Lkw", r.nebenkosten],
    ["Zoll", r.zoll],
    ["Antidumpingzoll", r.antidumping],
  ];

  return (
    <div className="rechner">
      <div className="rechner-felder">
        <div className="rechner-paar">
          <Feld id="r-preis" label="Preis pro Stück ab Werk" wert={stueckpreis} setze={setStueckpreis} einheit="€" />
          <Feld id="r-stueck" label="Stückzahl" wert={stueck} setze={setStueck} einheit="Stück" />
        </div>
        <div className="rechner-paar">
          <Feld id="r-kg" label="Gewicht gesamt" wert={gewicht} setze={setGewicht} einheit="kg" />
          <Feld id="r-m3" label="Volumen gesamt" wert={volumen} setze={setVolumen} einheit="m³" />
        </div>
        <div className="feld">
          <label htmlFor="r-transport">Transport</label>
          <select id="r-transport" value={transport} onChange={(e) => setTransport(e.target.value as Transport)}>
            {TRANSPORTE.map((t) => (
              <option key={t.wert} value={t.wert}>{t.label}</option>
            ))}
          </select>
        </div>
        <div className={satz === null ? "rechner-paar" : "rechner-felder"}>
          <div className="feld">
            <label htmlFor="r-gruppe">Warengruppe</label>
            <select id="r-gruppe" value={gruppe} onChange={(e) => setGruppe(Number(e.target.value))}>
              {WARENGRUPPEN.map((g, i) => (
                <option key={g.label} value={i}>
                  {g.satz === null ? g.label : `${g.label} (${g.satz.toLocaleString("de-DE")} %)`}
                </option>
              ))}
            </select>
          </div>
          {satz === null && (
            <Feld id="r-satz" label="Eigener Zollsatz" wert={eigenerSatz} setze={setEigenerSatz} einheit="%" />
          )}
        </div>
        <Feld
          id="r-ad"
          label="Antidumpingzoll"
          wert={antidumping}
          setze={setAntidumping}
          einheit="%"
          hinweis="Gilt nur für bestimmte Waren aus China, z. B. Alufolie in Rollen: 14,2 bis 35,6 % je nach Hersteller."
        />
        <p className="feld-hinweis">Startwerte sind ein Beispiel. Trag deine eigenen ein.</p>
      </div>

      <div className="rechner-ergebnis">
        <span className="rechner-klein">Kostet dich pro Stück, frei Lager Deutschland</span>
        <div className="rechner-gross num">{r.proStueck === null ? "–" : euro(r.proStueck, 2)}</div>
        <span className="rechner-klein num">
          {r.proStueck === null ? "Trag Preis und Stückzahl ein." : `Gesamt ${euro(r.einstand)}${dauer ? ` · unterwegs ${dauer}` : ""}`}
        </span>

        {r.containerZuKlein && (
          <p className="formular-meldung schlecht" style={{ marginTop: 18 }}>
            Das passt nicht in einen Container. Nimm den größeren oder teile die Menge.
          </p>
        )}
        {!r.containerZuKlein && r.containerAuslastung !== null && (
          <span className="rechner-klein num" style={{ marginTop: 6 }}>
            Container zu {Math.round(r.containerAuslastung * 100)} % gefüllt
          </span>
        )}

        <table className="rechner-tab num">
          <tbody>
            {posten.map(([name, wert]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{euro(wert)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="feld-hinweis" style={{ marginTop: 14 }}>
          Dazu kommen 19 % Einfuhrumsatzsteuer ({euro(r.eust)}), die du als Vorsteuer zurückbekommst.
          Richtwerte, Stand {STAND}. Das verbindliche Angebot bekommst du, bevor du bestellst.
        </p>

        <Link href="/kontakt" className="formular-knopf rechner-knopf">
          Verbindliches Angebot anfragen
        </Link>
      </div>
    </div>
  );
}
