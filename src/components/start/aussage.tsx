import { aussageZahlen, zeigen } from "@/inhalte/zahlen";

export function Aussage() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="claim fx">
          <h3>Du verkaufst. Den Rest machen wir.</h3>
          <p>
            Kein zweites Konto beim Lager, kein Chat auf Englisch, keine Tabelle,
            die du selbst pflegst.
          </p>
          <div className="claim-nums">
            {zeigen(aussageZahlen).map((z) => (
              <div key={z.label}>
                <p className="v num">{z.wert}</p>
                <p className="k">{z.label}</p>
              </div>
            ))}
          </div>
          <svg className="spark" viewBox="0 0 800 180" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="verlaufAussage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--a1)" stopOpacity=".35" />
                <stop offset="100%" stopColor="var(--a1)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,150 C120,140 200,120 300,100 C420,76 520,60 640,28 L800,10 L800,180 L0,180 Z"
              fill="url(#verlaufAussage)"
            />
            <path
              d="M0,150 C120,140 200,120 300,100 C420,76 520,60 640,28 L800,10"
              fill="none"
              stroke="var(--a1)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
