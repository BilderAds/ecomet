import Image from "next/image";
import Link from "next/link";

/**
 * Kopf der Abzock-Check-Seiten. Bauvorlage: Logo links, rechts genau EIN Knopf
 * „Check starten". Daneben klein „Anmelden" für alle, die schon ein Konto haben.
 * Auf den Formular- und Kontoseiten fällt der Knopf weg (`knopf={false}`).
 */
export function AbzockKopf({ knopf = true }: { knopf?: boolean }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#08080a]/80 backdrop-blur-xl border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="ecomet Startseite">
          <Image
            src="/ecomet-schrift-weiss.png"
            alt="ecomet"
            width={120}
            height={28}
            priority
            style={{ height: 22, width: "auto" }}
          />
        </Link>
        <div className="flex items-center gap-5">
          <Link href="/anmelden" className="text-sm text-white/60 hover:text-white transition-colors">
            Anmelden
          </Link>
          {knopf && (
            <Link href="/abzock-check/start" className="ak-knopf ak-knopf-klein">
              Check starten
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

/** Schlichter Fuß: nur das Pflichtige. */
export function AbzockFuss() {
  return (
    <footer className="ak-fuss">
      <div className="wrap">
        <span>© {new Date().getFullYear()} ecomet</span>
        <nav>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutzrichtlinien">Datenschutz</Link>
          <Link href="/kontakt">Kontakt</Link>
        </nav>
      </div>
    </footer>
  );
}
