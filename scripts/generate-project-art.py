from pathlib import Path
import colorsys
import math
from PIL import Image, ImageDraw, ImageFont

OUTPUT = Path('public/images')
WIDTH = HEIGHT = 1400
FONT_REGULAR = 'C:/Windows/Fonts/segoeui.ttf'
FONT_BOLD = 'C:/Windows/Fonts/seguisb.ttf'


def hsl(h, s, lightness):
    return tuple(round(channel * 255) for channel in colorsys.hls_to_rgb((h % 360) / 360, lightness / 100, s / 100))


NAVY = hsl(222, 53, 8)
PANEL = hsl(220, 38, 14)
LINE = hsl(216, 25, 32)
FOREGROUND = hsl(214, 32, 94)
MUTED = hsl(216, 17, 69)
CYAN = hsl(193, 91, 62)


def font(size, bold=False):
    return ImageFont.truetype(FONT_BOLD if bold else FONT_REGULAR, size)


def text(draw, x, y, value, size=24, color=FOREGROUND, bold=False):
    draw.text((x, y), value, font=font(size, bold), fill=color)


def rounded(draw, box, radius, fill, outline=LINE, width=2):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def canvas(title, label, hue=193):
    image = Image.new('RGB', (WIDTH, HEIGHT), NAVY)
    draw = ImageDraw.Draw(image)
    draw.ellipse((820, -300, 1600, 500), fill=hsl(hue, 52, 13))
    dot = hsl(215, 22, 24)
    for x in range(46, WIDTH, 48):
        for y in range(46, HEIGHT, 48):
            draw.ellipse((x, y, x + 2, y + 2), fill=dot)
    rounded(draw, (90, 72, 1310, 1328), 32, hsl(223, 45, 10), hsl(217, 25, 27))
    draw.line((92, 166, 1308, 166), fill=hsl(216, 25, 25), width=2)
    for i, color in enumerate((hsl(0, 70, 64), hsl(38, 78, 65), hsl(145, 52, 58))):
        draw.ellipse((128 + i * 26, 114, 142 + i * 26, 128), fill=color)
    text(draw, 225, 103, title, 20, FOREGROUND, True)
    text(draw, 1000, 108, label, 14, MUTED, True)
    return image, draw


# Offline Authenticator: a local encrypted vault, account rows, and readable status.
image, draw = canvas('OFFLINE AUTHENTICATOR', 'PRIVATE BY DESIGN', 193)
rounded(draw, (135, 215, 1265, 380), 22, hsl(219, 39, 14))
draw.ellipse((175, 248, 290, 363), fill=hsl(194, 48, 18), outline=CYAN, width=3)
rounded(draw, (212, 297, 254, 343), 8, hsl(222, 53, 8), CYAN, 3)
draw.arc((220, 270, 246, 317), 180, 360, fill=CYAN, width=5)
text(draw, 330, 254, 'Your vault is unlocked', 36, FOREGROUND, True)
text(draw, 330, 310, 'Everything stays on this device.', 20, MUTED)
rounded(draw, (1035, 265, 1225, 330), 25, hsl(159, 43, 20), hsl(159, 50, 43))
text(draw, 1063, 284, 'ENCRYPTED', 15, hsl(159, 64, 76), True)
for i, (name, domain, code) in enumerate([('GitHub', 'github.com', '482 190'), ('Steam', 'steamcommunity.com', '731 664'), ('Email', 'mail.example.com', '209 558')]):
    y = 425 + i * 225
    rounded(draw, (135, y, 1265, y + 185), 20, PANEL)
    draw.ellipse((175, y + 42, 270, y + 137), fill=hsl(196 + i * 8, 43, 23), outline=hsl(190 + i * 8, 60, 56), width=2)
    text(draw, 210, y + 67, name[0], 32, CYAN, True)
    text(draw, 320, y + 38, name, 29, FOREGROUND, True)
    text(draw, 320, y + 87, domain, 18, MUTED)
    text(draw, 875, y + 62, code, 37, FOREGROUND, True)
    text(draw, 1150, y + 68, 'COPY', 15, CYAN, True)
image.save(OUTPUT / 'offline-authenticator.png')

# CraftDock: block-world backdrop with readable launcher and modpack shelf.
image, draw = canvas('CRAFTDOCK', 'MODPACKS  /  INSTANCES', 201)
rounded(draw, (135, 210, 1265, 795), 22, hsl(215, 42, 14))
draw.rectangle((138, 430, 1262, 792), fill=hsl(217, 48, 11))
draw.polygon([(138, 535), (375, 315), (610, 526), (840, 280), (1065, 500), (1262, 365), (1262, 790), (138, 790)], fill=hsl(216, 40, 18))
for x, y in [(320, 486), (515, 550), (925, 475), (1100, 540)]:
    draw.rectangle((x + 28, y + 66, x + 53, y + 170), fill=hsl(27, 35, 32))
    draw.rectangle((x, y + 18, x + 82, y + 102), fill=hsl(148, 40, 30))
    draw.rectangle((x + 12, y + 3, x + 70, y + 83), fill=hsl(148, 42, 37))
text(draw, 190, 258, 'YOUR NEXT WORLD', 15, CYAN, True)
text(draw, 190, 305, 'Play your way.', 54, FOREGROUND, True)
text(draw, 190, 382, 'Modpacks, instances and servers in one launcher.', 20, MUTED)
rounded(draw, (190, 665, 385, 730), 17, CYAN, CYAN)
text(draw, 228, 685, 'LAUNCH', 17, NAVY, True)
text(draw, 150, 850, 'Ready to play', 25, FOREGROUND, True)
for i, (name, meta, color) in enumerate([('Better Minecraft', 'FABRIC  /  1.20', hsl(148, 47, 38)), ('Create: A&B', 'FORGE  /  1.16', hsl(35, 66, 47)), ('Vanilla+', 'QUILT  /  1.21', hsl(193, 58, 40))]):
    x = 135 + i * 380
    rounded(draw, (x, 900, x + 350, 1245), 18, PANEL)
    rounded(draw, (x + 14, 914, x + 336, 1125), 13, hsl(216, 40, 16))
    draw.polygon([(x + 14, 1085), (x + 120, 950), (x + 222, 1085), (x + 280, 980), (x + 336, 1072), (x + 336, 1125), (x + 14, 1125)], fill=color)
    text(draw, x + 25, 1150, name, 22, FOREGROUND, True)
    text(draw, x + 25, 1192, meta, 14, MUTED, True)
image.save(OUTPUT / 'craftdock.png')

# mGBA Launcher: a retro game shelf in a restrained navy interface.
image, draw = canvas('mGBA LAUNCHER', 'YOUR GAME LIBRARY', 165)
rounded(draw, (135, 215, 1265, 615), 22, PANEL)
text(draw, 180, 250, 'Recently played', 30, FOREGROUND, True)
text(draw, 180, 295, 'Your collection, ready when you are.', 19, MUTED)
rounded(draw, (180, 350, 730, 575), 16, hsl(223, 42, 17))
draw.rectangle((183, 355, 727, 470), fill=hsl(225, 40, 25))
draw.ellipse((565, 370, 650, 455), fill=hsl(46, 85, 69))
draw.polygon([(183, 485), (340, 402), (442, 488), (555, 418), (727, 490), (727, 572), (183, 572)], fill=hsl(151, 46, 33))
text(draw, 800, 398, 'Continue', 34, FOREGROUND, True)
text(draw, 800, 448, 'Jump back into your last game.', 17, MUTED)
rounded(draw, (800, 510, 1015, 568), 15, CYAN, CYAN)
text(draw, 842, 526, 'OPEN GAME', 15, NAVY, True)
text(draw, 155, 680, 'The shelf', 27, FOREGROUND, True)
for i, (name, color) in enumerate([('Pokemon Emerald', hsl(153, 58, 43)), ('Metroid Fusion', hsl(190, 65, 51)), ('Minish Cap', hsl(44, 73, 56)), ('Kirby Mirror', hsl(338, 55, 57))]):
    x = 135 + i * 285
    rounded(draw, (x, 735, x + 255, 1235), 18, PANEL)
    rounded(draw, (x + 14, 750, x + 241, 1045), 13, hsl(218, 43, 17))
    for row in range(5):
        for col in range(5):
            if (row + col + i) % 3:
                draw.rectangle((x + 36 + col * 34, 786 + row * 34, x + 65 + col * 34, 815 + row * 34), fill=color)
    draw.ellipse((x + 87, 865, x + 164, 942), fill=hsl(214, 30, 42), outline=color, width=4)
    text(draw, x + 20, 1080, name, 17, FOREGROUND, True)
    text(draw, x + 20, 1125, 'GAME BOY ADVANCE', 12, MUTED, True)
    text(draw, x + 20, 1175, 'READY TO PLAY', 13, CYAN, True)
image.save(OUTPUT / 'mgba-launcher.png')

# Steam Streak: the plugin's visit streak and per-game progress, using a small ember accent.
image, draw = canvas('STEAM STREAK', 'MILLENNIUM  /  SPACETHEMES', 28)
ember = hsl(29, 90, 64)
rounded(draw, (135, 215, 1265, 1235), 25, PANEL)
rounded(draw, (170, 250, 1230, 430), 18, hsl(219, 45, 18))
draw.ellipse((205, 290, 320, 405), fill=hsl(208, 54, 33), outline=hsl(194, 75, 64), width=3)
text(draw, 244, 324, 'G', 41, FOREGROUND, True)
text(draw, 365, 290, 'A streak worth keeping.', 33, FOREGROUND, True)
text(draw, 365, 345, 'Your Steam visits and game runs, at a glance.', 19, MUTED)
rounded(draw, (170, 475, 1230, 820), 22, hsl(222, 48, 10))
draw.polygon([(290, 770), (250, 690), (276, 610), (330, 657), (375, 535), (430, 633), (436, 716), (395, 770)], fill=ember)
draw.polygon([(330, 760), (315, 694), (354, 644), (375, 704), (410, 680), (398, 760)], fill=hsl(44, 93, 79))
text(draw, 505, 530, 'DAILY VISIT', 15, ember, True)
text(draw, 505, 575, '12 days', 66, FOREGROUND, True)
text(draw, 510, 665, 'One click keeps the streak alive.', 20, MUTED)
rounded(draw, (925, 630, 1150, 700), 16, ember, ember)
text(draw, 961, 650, 'CLAIM TODAY', 16, NAVY, True)
text(draw, 195, 865, 'Next milestone', 18, FOREGROUND, True)
rounded(draw, (195, 910, 1205, 936), 12, hsl(216, 25, 24), hsl(216, 25, 24))
rounded(draw, (195, 910, 835, 936), 12, ember, ember)
text(draw, 195, 950, '64% to 20 days', 15, MUTED)
for i, (name, days) in enumerate([('Stardew Valley', '8 days'), ('Hades', '5 days'), ('Terraria', '3 days')]):
    x = 195 + i * 330
    rounded(draw, (x, 1015, x + 305, 1175), 15, hsl(219, 34, 18))
    text(draw, x + 18, 1040, name, 19, FOREGROUND, True)
    text(draw, x + 18, 1090, days, 16, ember)
    text(draw, x + 18, 1130, 'GAME STREAK', 12, MUTED, True)
image.save(OUTPUT / 'steam-streak.png')

# Caesar Cipher: before/after panels and a password-keyed alphabet visualization.
image, draw = canvas('CAESAR CIPHER', 'A PYTHON IDEA  /  IN THE BROWSER', 228)
text(draw, 155, 220, 'A key turns into a cipher.', 37, FOREGROUND, True)
text(draw, 155, 272, 'Same password, matching output in Python and JavaScript.', 18, MUTED)
for x, title, value in [(155, 'MESSAGE', 'meet me after class'), (745, 'ENCODED', 'q33t q3 4ft3r cl4ss')]:
    rounded(draw, (x, 340, x + 500, 680), 20, PANEL)
    text(draw, x + 28, 375, title, 15, CYAN, True)
    draw.line((x + 28, 423, x + 472, 423), fill=LINE, width=2)
    text(draw, x + 28, 470, value, 25, FOREGROUND, True)
    text(draw, x + 28, 610, 'PASSWORD KEY', 13, MUTED, True)
    rounded(draw, (x + 28, 645, x + 360, 651), 3, hsl(193, 62, 40), hsl(193, 62, 40))
draw.ellipse((675, 480, 725, 530), fill=CYAN)
text(draw, 689, 480, '>', 28, NAVY, True)
rounded(draw, (155, 740, 1245, 1235), 20, hsl(221, 44, 11))
text(draw, 195, 780, 'THE KEY REORDERS THE ALPHABET', 16, MUTED, True)
text(draw, 195, 835, 'Original', 18, FOREGROUND, True)
text(draw, 195, 875, 'abcdefghijklmnopqrstuvwxyz', 25, MUTED)
text(draw, 195, 950, 'Password key', 18, CYAN, True)
text(draw, 195, 990, 'qwertyuiopasdfghjklzxcvbnm', 25, FOREGROUND, True)
for i in range(26):
    x = 195 + (i % 13) * 76
    y = 1060 + (i // 13) * 52
    rounded(draw, (x, y, x + 58, y + 38), 8, hsl(218, 37, 18), LINE, 1)
    text(draw, x + 19, y + 5, chr(97 + i), 17, CYAN if i % 5 == 0 else MUTED, True)
image.save(OUTPUT / 'caesar-cipher.png')

print('Generated five navy project artwork files.')
