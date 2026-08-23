/**
 * Wächter für die Zahlen der Website.
 *
 * Er prüft zwei Dinge:
 *   1. Jede Zahl in `src/inhalte/zahlen.ts` ist geprüft und hat eine Quelle.
 *   2. Kein Geldbetrag steht an dieser Datei vorbei direkt in einer Seite.
 *      Sonst bewacht der Wächter nur den halben Baum.
 *
 * Die Datei wird wirklich importiert, nicht mit einem Regex gelesen.
 * Node ab 22 entfernt die Typen dabei von selbst.
 *
 * Aufruf: npm run zahlen-pruefen
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join, relative } from "node:path";

const wurzel = join(dirname(fileURLToPath(import.meta.url)), "..");
const zahlenDatei = join(wurzel, "src", "inhalte", "zahlen.ts");

const { alleZahlen } = await import(pathToFileURL(zahlenDatei).href);
const stimmenDatei = join(wurzel, "src", "inhalte", "stimmen.ts");
const { stimmen } = await import(pathToFileURL(stimmenDatei).href);

let rot = false;

// 1. Jede Zahl geprüft und mit Quelle
const offen = alleZahlen.filter((z) => !z.geprueft);
const ohneQuelle = alleZahlen.filter((z) => z.geprueft && !z.quelle?.trim());
const name = (z) => [z.wert, z.label].filter(Boolean).join("  ");

console.log(`${alleZahlen.length} Zahlen in src/inhalte/zahlen.ts.`);

if (offen.length) {
  rot = true;
  console.log(`\nNICHT GEPRÜFT, darf so nicht live (${offen.length}):`);
  for (const z of offen) console.log(`  · ${name(z)}`);
}
if (ohneQuelle.length) {
  rot = true;
  console.log(`\nGEPRÜFT, aber ohne Quelle (${ohneQuelle.length}):`);
  for (const z of ohneQuelle) console.log(`  · ${name(z)}`);
}

// 1b. Kundenstimmen ohne Beleg
const ohneBeleg = stimmen.filter((st) => !st.beleg?.trim());
if (ohneBeleg.length) {
  rot = true;
  console.log(`\nKUNDENSTIMMEN OHNE BELEG, duerfen so nicht live (${ohneBeleg.length}):`);
  for (const st of ohneBeleg) console.log(`  · ${st.name}, ${st.rolle}`);
  console.log("  Erfundene Bewertungen sind nach § 5b Abs. 3 UWG abmahnfaehig.");
}

// 2. Geldbeträge, die an zahlen.ts vorbeigehen
const dateien = [];
const sammeln = (ordner) => {
  for (const eintrag of readdirSync(ordner)) {
    const pfad = join(ordner, eintrag);
    if (statSync(pfad).isDirectory()) sammeln(pfad);
    else if (/\.tsx?$/.test(pfad) && pfad !== zahlenDatei) dateien.push(pfad);
  }
};
sammeln(join(wurzel, "src"));

const geld = /[0-9]{1,3}(?:[.,][0-9]{2})?\s?€/g;
const streuner = [];
for (const pfad of dateien) {
  const zeilen = readFileSync(pfad, "utf8").split("\n");
  zeilen.forEach((zeile, i) => {
    // Kommentare erklären, sie behaupten nichts auf der Seite.
    if (/^\s*(\*|\/\/)/.test(zeile)) return;
    for (const treffer of zeile.match(geld) ?? []) {
      streuner.push(`${relative(wurzel, pfad)}:${i + 1}  ${treffer.trim()}`);
    }
  });
}

if (streuner.length) {
  rot = true;
  console.log(`\nGELDBETRAG AUSSERHALB von zahlen.ts (${streuner.length}):`);
  for (const s of streuner) console.log(`  · ${s}`);
  console.log("  Diese Beträge hat niemand auf eine Quelle geprüft. Nach zahlen.ts holen.");
}

console.log(rot ? "\nErgebnis: rot. Erst klären, dann live." : "\nErgebnis: grün.");
process.exit(rot ? 1 : 0);
