#!/bin/bash
# Doppelklick, dann laeuft die neue ecomet-Website auf diesem Mac.
# Sie ist NICHT live, sie laeuft nur hier. Fenster zumachen beendet sie.
#
# PORT 3105, nicht 3100. Port 3100 gehoert PostedIn, sonst streiten sich die beiden.
#
# WARUM erst gebaut und dann gestartet wird: baut man, waehrend der Server laeuft,
# zieht der neue Build dem laufenden Prozess seine CSS-Dateien unter den Fuessen weg.
# Die Seite kommt dann ungestylt, mit Serifenschrift und blauen Links, und sieht aus
# wie ein Design-Fehler, obwohl nur die Reihenfolge falsch war.
set -e
cd "$(dirname "$0")"
PORT=3105

PID=$(lsof -ti tcp:$PORT || true)
if [ -n "$PID" ]; then echo "Alten Server beenden ($PID)"; kill -9 $PID; sleep 1; fi

mkdir -p .logs
echo "Bauen ..."
npm run build > .logs/build.log 2>&1 || { echo "BUILD FEHLGESCHLAGEN:"; tail -25 .logs/build.log; echo; echo "Fenster schliessen."; sleep 600; exit 1; }

echo "Gleich oeffnet sich der Browser auf http://localhost:$PORT"
echo "Zum Beenden dieses Fenster schliessen."
echo
( sleep 5; open "http://localhost:$PORT" ) &
npx next start -p $PORT
