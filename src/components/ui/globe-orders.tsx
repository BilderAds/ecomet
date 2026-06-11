"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import createGlobe from "cobe"
import { motion, AnimatePresence } from "framer-motion"
import { Package } from "lucide-react"

interface OrderMarker {
  id: string
  location: [number, number]
  city: string
  product: string
}

interface GlobeOrdersProps {
  className?: string
  speed?: number
}

const orderLocations: OrderMarker[] = [
  // Deutschland
  { id: "de-1", location: [52.52, 13.41], city: "Berlin", product: "" },
  { id: "de-2", location: [48.14, 11.58], city: "München", product: "" },
  { id: "de-3", location: [50.94, 6.96], city: "Köln", product: "" },
  { id: "de-4", location: [53.55, 9.99], city: "Hamburg", product: "" },
  { id: "de-5", location: [50.11, 8.68], city: "Frankfurt", product: "" },
  { id: "de-6", location: [48.78, 9.18], city: "Stuttgart", product: "" },
  { id: "de-7", location: [51.23, 6.78], city: "Düsseldorf", product: "" },
  { id: "de-8", location: [51.34, 12.37], city: "Leipzig", product: "" },
  { id: "de-9", location: [51.05, 13.74], city: "Dresden", product: "" },
  { id: "de-10", location: [49.45, 11.08], city: "Nürnberg", product: "" },
  { id: "de-11", location: [51.96, 7.63], city: "Münster", product: "" },
  { id: "de-12", location: [49.01, 8.40], city: "Karlsruhe", product: "" },
  { id: "de-13", location: [53.08, 8.80], city: "Bremen", product: "" },
  { id: "de-14", location: [52.27, 10.52], city: "Braunschweig", product: "" },
  { id: "de-15", location: [54.32, 10.14], city: "Kiel", product: "" },
  { id: "de-16", location: [50.78, 6.08], city: "Aachen", product: "" },
  { id: "de-17", location: [47.99, 7.85], city: "Freiburg", product: "" },
  { id: "de-18", location: [49.99, 8.27], city: "Darmstadt", product: "" },
  { id: "de-19", location: [51.43, 6.76], city: "Duisburg", product: "" },
  { id: "de-20", location: [51.51, 7.47], city: "Dortmund", product: "" },
  { id: "de-21", location: [51.48, 7.22], city: "Essen", product: "" },
  { id: "de-22", location: [52.38, 9.73], city: "Hannover", product: "" },
  { id: "de-23", location: [50.36, 7.59], city: "Koblenz", product: "" },
  { id: "de-24", location: [48.40, 10.00], city: "Ulm", product: "" },
  { id: "de-25", location: [54.09, 12.10], city: "Rostock", product: "" },
  { id: "de-26", location: [49.24, 6.99], city: "Saarbrücken", product: "" },
  { id: "de-27", location: [50.07, 8.24], city: "Wiesbaden", product: "" },
  { id: "de-28", location: [47.66, 9.18], city: "Konstanz", product: "" },
  { id: "de-29", location: [48.37, 10.90], city: "Augsburg", product: "" },
  { id: "de-30", location: [51.31, 9.50], city: "Kassel", product: "" },
  // Österreich
  { id: "at-1", location: [48.21, 16.37], city: "Wien", product: "" },
  { id: "at-2", location: [47.07, 15.44], city: "Graz", product: "" },
  { id: "at-3", location: [48.31, 14.29], city: "Linz", product: "" },
  { id: "at-4", location: [47.80, 13.04], city: "Salzburg", product: "" },
  { id: "at-5", location: [47.26, 11.39], city: "Innsbruck", product: "" },
  { id: "at-6", location: [46.62, 14.31], city: "Klagenfurt", product: "" },
  // Schweiz
  { id: "ch-1", location: [47.38, 8.54], city: "Zürich", product: "" },
  { id: "ch-2", location: [46.95, 7.45], city: "Bern", product: "" },
  { id: "ch-3", location: [47.56, 7.59], city: "Basel", product: "" },
  { id: "ch-4", location: [46.52, 6.63], city: "Lausanne", product: "" },
  { id: "ch-5", location: [47.42, 9.37], city: "St. Gallen", product: "" },
  { id: "ch-6", location: [47.05, 8.31], city: "Luzern", product: "" },
]

const products = [
  // Elektronik
  "Wireless Earbuds Pro", "Bluetooth Kopfhörer", "TWS Earbuds Mini", "ANC Kopfhörer",
  "Kabellose Earbuds", "In-Ear Monitors", "Gaming Headset", "Sport Earbuds",
  "Bluetooth Speaker", "Mini Lautsprecher", "Soundbar Compact", "Portable Speaker",
  "Smartwatch Ultra", "Fitness Tracker Pro", "Smart Band", "Sport Watch GPS",
  "Powerbank 20000mAh", "Powerbank Mini", "MagSafe Charger", "Wireless Ladepad",
  "Ring Light 10 Zoll", "LED Strip RGB", "Schreibtischlampe LED", "Sunset Lamp",
  "Webcam 4K", "USB Mikrofon", "Kabellose Maus", "Mechanische Tastatur",
  "USB-C Hub 7in1", "HDMI Adapter", "Laptop Ständer", "Monitor Halterung",
  // Handyzubehör
  "iPhone Hülle Clear", "Samsung Case Leder", "Handyhülle Stoßfest", "MagSafe Ring",
  "Panzerglas 3er Pack", "Kamera Schutzglas", "Pop Socket Grip", "Handy Ringhalter",
  "Auto Handyhalterung", "Selfie Stick Stativ", "Gimbal Smartphone", "Handykette Gold",
  // Mode & Accessoires
  "Sonnenbrillen Set UV400", "Polarisierte Sonnenbrille", "Blue Light Brille",
  "Edelstahl Armband", "Leder Geldbörse RFID", "Canvas Rucksack", "Crossbody Bag",
  "Baseball Cap Vintage", "Bucket Hat", "Beanie Mütze", "Seidenschal",
  "Gürtel Leder", "Socken 6er Pack", "Sneaker Einlagen",
  // Sport & Fitness
  "Yoga Matte TPE", "Resistance Bands 5er", "Springseil Speed", "Handgrip Trainer",
  "Faszienrolle Set", "Trinkflasche 1L", "Shaker Bottle", "Gym Handschuhe",
  "Laufgürtel", "Schweißband Set", "Massagepistole Mini", "Akupressurmatte",
  // Haushalt & Küche
  "Eiswürfelform Silikon", "Gewürzglas Set 12er", "Messbecher Set", "Silikonmatte Back",
  "Knoblauchpresse", "Sparschäler 3er", "Thermobecher 500ml", "Bento Box",
  "Vakuum Weinflasche", "Kaffee Tamper", "Matcha Set", "French Press Mini",
  // Beauty & Pflege
  "Jade Roller Set", "Derma Roller 0.5mm", "LED Gesichtsmaske", "Gua Sha Stein",
  "Haarbürste Entwirr", "Silk Scrunchie 6er", "Nagel Set Gel", "Wimpern Curler",
  "Makeup Spiegel LED", "Reise Kosmetiktasche", "Parfüm Zerstäuber", "Bartöl Set",
  // Technik Gadgets
  "AirTag Hülle Leder", "Kabel Organizer", "Webcam Cover 6er", "Phone Stand Holz",
  "Laptop Sleeve 14 Zoll", "Mauspad XXL", "Kabelclips 10er", "USB Ventilator",
  "Mini Projektor", "Bluetooth Tracker", "Smart Steckdose WiFi", "LED Nachttisch",
  // Haustier
  "Hunde Leckerli Tasche", "Katzenspielzeug Set", "Haustier Bürste", "Faltbarer Napf",
  // Auto
  "Auto Duftbaum Set", "Handyhalter Lüftung", "LED Ambientebeleuchtung", "Kofferraum Organizer",
  // Kinder & Baby
  "Baby Lätzchen 5er", "Kinder Nachtlicht", "Magnetische Bausteine", "LCD Maltafel",
  // Schmuck & Uhren
  "Edelstahl Kette Herren", "Perlen Armband Damen", "Minimalist Ring Gold", "Ankerkette Silber",
  "Layered Necklace Set", "Ohrring Creolen Gold", "Charm Armband", "Siegelring Herren",
  "Digital Uhr Retro", "Leder Armbanduhr", "Chronograph Schwarz", "Taschenuhrkette",
  // Taschen & Reise
  "Weekender Tasche", "Laptop Rucksack 15.6", "Bauchtasche Leder", "Kosmetikbeutel Set",
  "Reise Organizer 6er", "Kofferanhänger Leder", "Passport Hülle", "Kompressionspackwürfel",
  "Umhängetasche Canvas", "Shopper Tasche XL", "Clutch Abendtasche", "Rucksack Rolltop",
  // Schreibwaren & Office
  "Notizbuch A5 Leder", "Kugelschreiber Set", "Desk Organizer Holz", "Kalender 2025 Minimal",
  "Stiftehalter Beton", "Lesezeichen Metall 5er", "Washi Tape Set 10er", "Bullet Journal Dotted",
  "Brieföffner Gold", "Schreibtisch Uhr", "Mousepad Leder", "Monitor Lampe LED",
  // Outdoor & Camping
  "Taschenlampe 1000 Lumen", "Survival Armband", "Campingbesteck Set", "Feuerstein Anzünder",
  "Hängematte Ultraleicht", "Trinkblase 2L", "Klappmesser EDC", "Stirnlampe USB",
  "Kompass Metall", "Regencape Poncho", "Isomatte Aufblasbar", "Campingkocher Mini",
  // Gaming
  "Controller Thumbstick Caps", "Headset Ständer RGB", "Gaming Mauspad LED", "Kabelhalter Desk",
  "Stream Deck Mini", "Webcam Ring Light", "Controller Grip Case", "Monitor Riser",
  "Tastatur Handballenauflage", "Gaming Brille", "Mikrofon Arm Tisch", "USB Hub Gaming",
  // Wellness & Entspannung
  "Aromadiffuser 300ml", "Lavendel Kissen", "Augenmaske Seide", "Badebomben 6er Set",
  "Nackenmassager", "Fußmassage Rolle", "Meditationskissen", "Salzlampe Himalaya",
  "Schlafmaske 3D", "Ohrstöpsel Silikon", "Duftkerze Soja", "Wärmflasche Plüsch",
  // Küche Advanced
  "Spiralschneider", "Sous Vide Beutel 30er", "Messerschärfer 3 Stufen", "Kaffeemühle Manuell",
  "Milchaufschäumer USB", "Eierkocher Mini", "Gewürzmühle Elektrisch", "Vakuumierbeutel 50er",
  "Teekanne Glas 1L", "Cocktail Shaker Set", "Pizzastein Rund", "Nudelmaschine Manuell",
  // Smart Home
  "WiFi Steckdose 4er", "LED Lightbar Monitor", "Smart Türklingel", "Temperatur Sensor WiFi",
  "Smart Glühbirne E27", "IR Fernbedienung WiFi", "Bewegungsmelder Smart", "Luftqualität Monitor",
  // Foto & Video
  "Stativ Handy 170cm", "Greenscreen Pop-Up", "Ansteckmikrofon Wireless", "Action Cam Halterung",
  "SD Karten Etui", "Kamera Reinigungsset", "Softbox 2er Set", "Objektivdeckel Universal",
  // Garten
  "Bewässerungssystem Auto", "Pflanzentopf Selbst", "Garten Handschuhe", "LED Solarleuchten 4er",
  "Kräutertopf Set 3er", "Gartensprüher 2L", "Insektenhotel Holz", "Blumenkasten Balkon",
]

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])
  return isMobile
}

export function GlobeOrders({ className = "", speed = 0.002 }: GlobeOrdersProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const isPausedRef = useRef(false)
  const isMobile = useIsMobile()
  const [webglSupported, setWebglSupported] = useState(true)
  const inViewRef = useRef(true)
  const rafRunningRef = useRef(false)

  const [activeOrders, setActiveOrders] = useState<
    { id: string; city: string; product: string; time: string; visible: boolean }[]
  >([])

  // Simulate new orders popping up
  useEffect(() => {
    const mobile = window.innerWidth < 768

    function addOrder() {
      const loc = orderLocations[Math.floor(Math.random() * orderLocations.length)]
      const product = products[Math.floor(Math.random() * products.length)]
      const now = new Date()
      const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`
      const id = `${loc.id}-${Date.now()}`

      setActiveOrders((prev) => {
        const max = mobile ? 2 : 3
        const next = [...prev, { id, city: loc.city, product, time, visible: true }]
        if (next.length > max) return next.slice(-max)
        return next
      })

      setTimeout(() => {
        setActiveOrders((prev) => prev.filter((o) => o.id !== id))
      }, mobile ? 3000 : 4000)
    }

    addOrder()
    const interval = setInterval(addOrder, mobile ? 3000 : 2500)
    return () => clearInterval(interval)
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
    isPausedRef.current = true
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        }
      }
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerUp])

  useEffect(() => {
    // Feature-detect WebGL on a throwaway canvas. Old devices without it get a static image.
    const testCanvas = document.createElement("canvas")
    const hasWebGL = !!(
      testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl")
    )
    if (!hasWebGL) {
      setWebglSupported(false)
      return
    }

    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let globe: ReturnType<typeof createGlobe> | null = null
    let animationId: number
    let phi = 0
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let startLoop: (() => void) | null = null

    const shanghai: [number, number] = [31.23, 121.47]
    const shenzhen: [number, number] = [22.54, 114.06]
    const germany: [number, number] = [51.17, 10.45]
    const austria: [number, number] = [47.52, 14.55]
    const switzerland: [number, number] = [46.82, 8.23]

    function init() {
      const width = canvas.offsetWidth
      if (width === 0 || globe) return

      const mobile = window.innerWidth < 768

      globe = createGlobe(canvas, {
        devicePixelRatio: mobile ? 1 : Math.min(window.devicePixelRatio || 1, 2),
        width: mobile ? width : width * 2,
        height: mobile ? width : width * 2,
        phi: 4.5,
        theta: 0.15,
        dark: 1,
        diffuse: 2,
        mapSamples: mobile ? 6000 : 24000,
        mapBrightness: 8,
        baseColor: [0.4, 0.4, 0.4],
        markerColor: [0.95, 0.42, 0.17],
        glowColor: [0.94, 0.93, 0.91],
        markers: mobile
          ? [
              { location: germany, size: 0.02 },
              { location: shanghai, size: 0.02 },
            ]
          : [
              ...orderLocations.map((m) => ({ location: m.location, size: 0.015 })),
              { location: shanghai, size: 0.02 },
              { location: shenzhen, size: 0.02 },
            ],
        arcs: mobile
          ? [{ from: shanghai, to: germany, color: [0.95, 0.42, 0.17] as [number, number, number] }]
          : [
              { from: shanghai, to: germany, color: [0.95, 0.42, 0.17] as [number, number, number] },
              { from: shenzhen, to: germany, color: [0.8, 0.35, 0.14] as [number, number, number] },
              { from: shanghai, to: austria, color: [0.9, 0.38, 0.15] as [number, number, number] },
              { from: shenzhen, to: switzerland, color: [0.85, 0.35, 0.14] as [number, number, number] },
              { from: shanghai, to: switzerland, color: [0.75, 0.32, 0.12] as [number, number, number] },
            ],
        arcColor: [0.95, 0.42, 0.17],
        arcWidth: 0.3,
        arcHeight: 0.5,
        scale: 1.02,
        opacity: 1,
        markerElevation: 0,
      })

      function animate() {
        // Stop the loop entirely when scrolled out of view to save GPU/battery on weak devices.
        if (!inViewRef.current) {
          rafRunningRef.current = false
          return
        }
        rafRunningRef.current = true
        if (!isPausedRef.current && !reduceMotion) phi += speed
        globe!.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: 0.15 + thetaOffsetRef.current + dragOffset.current.theta,
        })
        animationId = requestAnimationFrame(animate)
      }
      startLoop = animate
      animate()
      setTimeout(() => canvas && (canvas.style.opacity = "1"), 100)
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect()
          init()
        }
      })
      ro.observe(canvas)
    }

    // Pause when off-screen, resume when scrolled back into view.
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? true
        inViewRef.current = visible
        if (visible && !rafRunningRef.current && startLoop) startLoop()
      },
      { threshold: 0 }
    )
    io.observe(canvas)

    return () => {
      io.disconnect()
      if (animationId) cancelAnimationFrame(animationId)
      if (globe) globe.destroy()
    }
  }, [speed])

  if (!webglSupported) {
    return (
      <div className={`relative aspect-square select-none ${className}`}>
        <img
          src="/globe-static.png"
          alt="ecomet liefert in den gesamten DACH-Raum"
          width={300}
          height={300}
          className="w-full h-full object-contain"
        />
      </div>
    )
  }

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.2s ease",
          touchAction: "none",
        }}
      />

      {/* Order notifications */}
      <div className="absolute top-0 left-1/2 md:left-auto md:top-4 md:right-4 flex flex-col gap-1.5 md:gap-2 z-20 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {activeOrders.map((order) => (
            <motion.div
              key={order.id}
              layout={!isMobile}
              initial={isMobile ? { opacity: 0, x: 20 } : { opacity: 0, x: 40, scale: 0.9, filter: "blur(8px)" }}
              animate={isMobile ? { opacity: 1, x: 0 } : { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
              exit={isMobile ? { opacity: 0, x: 10 } : { opacity: 0, x: 20, scale: 0.95, filter: "blur(4px)" }}
              transition={isMobile
                ? { duration: 0.3 }
                : {
                    layout: { type: "spring", stiffness: 400, damping: 30 },
                    opacity: { duration: 0.4 },
                    x: { type: "spring", stiffness: 300, damping: 25 },
                    scale: { duration: 0.3 },
                    filter: { duration: 0.3 },
                  }
              }
              className="flex items-center gap-2 md:gap-3 bg-[#1a1a1a]/90 md:bg-white/[0.07] md:backdrop-blur-md border border-white/10 rounded-lg md:rounded-xl px-2.5 py-2 md:px-4 md:py-3 min-w-[150px] md:min-w-[200px]"
            >
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-md md:rounded-lg bg-ecomet/20 flex items-center justify-center flex-shrink-0">
                <Package size={10} className="text-ecomet md:hidden" />
                <Package size={14} className="text-ecomet hidden md:block" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] md:text-[11px] text-ecomet font-medium">Neue Bestellung</span>
                <span className="text-[10px] md:text-xs text-white font-medium truncate">{order.product}</span>
                <span className="text-[8px] md:text-[10px] text-white/40">{order.city} &middot; {order.time}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
