"""
Vorschaubild fuer e-comet.de, zweiter Anlauf.

Warum neu: das erste Bild hatte 84 px Rand. WhatsApp zeigt seine Kachel im
Verhaeltnis 1,42:1, das Bild ist 1,905:1. WhatsApp schneidet also links und
rechts je rund 153 px weg, und damit war das Logo abgeschnitten.

Deshalb gilt jetzt eine SICHERE ZONE: alles Wichtige liegt in den mittleren
630 px (also x von 285 bis 915). Das ist der quadratische Ausschnitt, den
selbst die strengsten Clients noch zeigen. Was ausserhalb liegt, darf
wegfallen, ohne dass die Aussage kaputtgeht.
"""
from PIL import Image, ImageDraw, ImageFont, ImageChops

PUB = "/Users/victoria/Projekte/Website Builder/Websites/ecomet/public"
OUT = "/private/tmp/claude-501/-Users-victoria/7d5e6979-e388-4a59-8344-f6f449bcb9a5/scratchpad"
FONTS = "/Users/victoria/Library/Fonts"

GRUND = (8, 8, 10)
ORANGE = (255, 100, 44)
WEISS = (255, 255, 255)
W, H = 1200, 630
SICHER = 630                      # der quadratische Ausschnitt in der Mitte

bold = lambda s: ImageFont.truetype(f"{FONTS}/Inter_18pt-Bold.ttf", s)
med = lambda s: ImageFont.truetype(f"{FONTS}/Inter_18pt-Medium.ttf", s)


def breite(d, text, font, tr=0):
    return sum(d.textlength(c, font=font) + tr for c in text) - tr


def mittig(d, y, text, font, fill, tr=0):
    x = (W - breite(d, text, font, tr)) / 2
    for ch in text:
        d.text((x, y), ch, font=font, fill=fill)
        x += d.textlength(ch, font=font) + tr


def grund():
    b = Image.new("RGB", (W, H), GRUND)
    schicht = Image.new("RGB", (W, H), (0, 0, 0))
    dd = ImageDraw.Draw(schicht)
    for i in range(60, 0, -1):
        r = 700 * i / 60
        a = 0.30 * (1 - i / 60) ** 2 / 60 * 14
        dd.ellipse([W / 2 - r, H * 0.42 - r, W / 2 + r, H * 0.42 + r],
                   fill=tuple(int(c * a) for c in ORANGE))
    return ImageChops.add(b, schicht).convert("RGBA")


def logo(bild, y, breite_px=250):
    s = Image.open(f"{PUB}/ecomet-schrift-weiss.png").convert("RGBA")
    h = round(s.height * breite_px / s.width)
    bild.alpha_composite(s.resize((breite_px, h), Image.LANCZOS),
                         ((W - breite_px) // 2, y))
    return h


def bauen(name, z1, z2, unter):
    """z1 weiss, z2 orange, unter = Zeile darunter."""
    og = grund()
    d = ImageDraw.Draw(og)
    logo(og, 96, 250)

    f = bold(56)
    mittig(d, 244, z1, f, WEISS, -1.8)
    mittig(d, 244 + 71, z2, f, ORANGE, -1.8)

    fu = med(24)
    mittig(d, 244 + 168, unter, fu, (255, 255, 255, 140))

    og.convert("RGB").save(f"{OUT}/{name}.png", quality=95)

    # Pruefen: passt alles in die sichere Zone?
    grenze_l, grenze_r = (W - SICHER) / 2, (W + SICHER) / 2
    schmal = W - 2 * 153                      # was WhatsApp zeigt
    wa_l, wa_r = (W - schmal) / 2, (W + schmal) / 2
    print(f"\n{name}")
    for label, txt, ft, tr in [("Zeile 1", z1, f, -1.8), ("Zeile 2", z2, f, -1.8),
                               ("Unterzeile", unter, fu, 0)]:
        bt = breite(d, txt, ft, tr)
        l, r = (W - bt) / 2, (W + bt) / 2
        quad = "OK" if l >= grenze_l and r <= grenze_r else "ragt aus dem Quadrat"
        wa = "OK" if l >= wa_l and r <= wa_r else "VON WHATSAPP ANGESCHNITTEN"
        print(f"  {label:11} {bt:6.0f} px   Quadrat: {quad:22} WhatsApp: {wa}")
    return og


# Variante A: Kevins Wunsch, Dropshipping steht ganz vorn
bauen("og-A",
      "Dropshipping und Lager.",
      "Aus einer Hand.",
      "Aus Deutschland in 1-3 Tagen oder direkt aus China.")

# Variante B: das Angebot als Satz, Dropshipping in der Unterzeile
bauen("og-B",
      "Wir lagern, packen und",
      "verschicken für dich.",
      "Dropshipping aus China oder dein Lager in Deutschland.")


def zuschnitte(quelle, name):
    """Zeigt nebeneinander: voll, WhatsApp-Kachel, Quadrat."""
    im = Image.open(f"{OUT}/{quelle}.png")
    schmal = W - 2 * 153
    wa = im.crop(((W - schmal) // 2, 0, (W + schmal) // 2, H))
    qu = im.crop(((W - SICHER) // 2, 0, (W + SICHER) // 2, H))
    hoehe = 300
    teile = [i.resize((round(i.width * hoehe / i.height), hoehe), Image.LANCZOS)
             for i in (im, wa, qu)]
    ges = Image.new("RGB", (sum(t.width for t in teile) + 40, hoehe + 34), (24, 24, 26))
    d = ImageDraw.Draw(ges)
    x = 0
    for t, lab in zip(teile, ["voll (Slack, X, LinkedIn)", "WhatsApp-Kachel", "Quadrat, engster Fall"]):
        ges.paste(t, (x, 30))
        d.text((x + 4, 8), lab, font=med(15), fill=(255, 255, 255, 190))
        x += t.width + 20
    ges.save(f"{OUT}/{name}.png")


zuschnitte("og-A", "vergleich-A")
zuschnitte("og-B", "vergleich-B")
print("\nfertig")
