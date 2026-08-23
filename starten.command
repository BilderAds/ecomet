#!/bin/bash
# Doppelklick, dann laeuft die neue ecomet-Website auf diesem Mac.
# Sie ist NICHT live, sie laeuft nur hier. Fenster zumachen beendet sie.
cd "$(dirname "$0")"
echo "ecomet Website wird gestartet ..."
echo "Gleich oeffnet sich der Browser auf http://localhost:3100"
echo "Zum Beenden dieses Fenster schliessen."
echo
( sleep 4; open "http://localhost:3100" ) &
npx next dev -p 3100
