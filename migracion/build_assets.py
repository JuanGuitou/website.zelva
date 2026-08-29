#!/usr/bin/env python3
"""Normaliza los assets del prototipo para usarlos en Tiendanube.

Los assets del prototipo son de DOS tipos y necesitan tratamientos distintos:

  ish-*.png   Packshot de la botella, fondo liso YA horneado en el pixel.
              No tiene transparencia. Se rellena a cuadrado con su propio
              color de fondo (muestreado de las esquinas) para no meter un
              crema que choque con el fondo original.

  prod-*.png  Foto lifestyle de escena, sin fondo liso. Se recorta al
              cuadrado centrado. Rellenarla sobre un lienzo crema dejaría
              barras laterales y quedaría mal en la grilla.

Tiendanube recorta a cuadrado en los listados, así que todo sale 1600x1600.

OJO: los tres packshots vienen con fondos DISTINTOS entre sí (ver salida del
script). En una grilla de tienda eso se nota. Ver BLOCKERS.md §5.

Correr desde migracion/:  python3 build_assets.py
"""
from PIL import Image
from pathlib import Path

SRC = Path("../assets")
OUT = Path("assets")
LADO = 1600          # Tiendanube recomienda 1024-2048 px
MARGEN = 0.92        # cuánto del lienzo ocupa el packshot al rellenar

# packshot de botella -> imagen PRINCIPAL del producto
PACKSHOTS = {
    "ish-gin.png": "producto-gin.jpg",
    "ish-ron.png": "producto-ron.jpg",
    "ish-espumante.png": "producto-espumante.jpg",
}
# foto de escena -> imagen SECUNDARIA del producto
LIFESTYLE = {
    "prod-gin.png": "ambiente-gin.jpg",
    "prod-ron.png": "ambiente-ron.jpg",
    "prod-espumante.png": "ambiente-espumante.jpg",
}
LOGOS = {
    "logo-cream.png": "logo-crema.png",
    "logo-green.png": "logo-verde.png",
}

avisos = []


def color_de_fondo(im: Image.Image) -> tuple:
    """Color liso del fondo, muestreado de las cuatro esquinas."""
    w, h = im.size
    esquinas = [im.getpixel(p) for p in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1))]
    if len(set(esquinas)) == 1:
        return esquinas[0]
    prom = tuple(sum(c[i] for c in esquinas) // 4 for i in range(3))
    avisos.append("esquinas no uniformes, se promedió el color de fondo")
    return prom + (255,)


def packshot(src: Path, dst: Path) -> str:
    im = Image.open(src).convert("RGBA")
    fondo = color_de_fondo(im)

    objetivo = int(LADO * MARGEN)
    escala = min(objetivo / im.width, objetivo / im.height)
    nuevo = (max(1, round(im.width * escala)), max(1, round(im.height * escala)))
    im_r = im.resize(nuevo, Image.LANCZOS)

    lienzo = Image.new("RGBA", (LADO, LADO), fondo)
    lienzo.paste(im_r, ((LADO - nuevo[0]) // 2, (LADO - nuevo[1]) // 2), im_r)
    lienzo.convert("RGB").save(dst, "JPEG", quality=90, optimize=True)

    if escala > 1.0:
        avisos.append(
            f"{src.name}: {im.width}x{im.height} reescalado x{escala:.2f} "
            f"para llegar a {LADO}px — pierde nitidez con el zoom"
        )
    hexa = "#%02X%02X%02X" % fondo[:3]
    return f"fondo {hexa}"


def lifestyle(src: Path, dst: Path) -> str:
    """Recorte cuadrado centrado, sin rellenar."""
    im = Image.open(src).convert("RGB")
    lado_min = min(im.size)
    izq = (im.width - lado_min) // 2
    arr = (im.height - lado_min) // 2
    im = im.crop((izq, arr, izq + lado_min, arr + lado_min))

    if lado_min < LADO:
        avisos.append(
            f"{src.name}: recorte cuadrado da {lado_min}px, por debajo de {LADO}px"
        )
    im = im.resize((LADO, LADO), Image.LANCZOS)
    im.save(dst, "JPEG", quality=88, optimize=True)
    return f"recorte centrado {lado_min}px"


def logo(src: Path, dst: Path) -> str:
    im = Image.open(src).convert("RGBA")
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    im.save(dst, "PNG", optimize=True)
    return "transparencia intacta"


def main():
    OUT.mkdir(exist_ok=True)
    fondos = {}

    print("PACKSHOTS (imagen principal de producto)")
    for origen, destino in PACKSHOTS.items():
        p = SRC / origen
        if not p.exists():
            print(f"  FALTA {origen}")
            continue
        antes = Image.open(p).size
        nota = packshot(p, OUT / destino)
        fondos[origen] = nota
        print(f"  {origen:22} {antes[0]}x{antes[1]:<5} -> {destino:26} {nota}")

    print("\nLIFESTYLE (imagen secundaria)")
    for origen, destino in LIFESTYLE.items():
        p = SRC / origen
        if not p.exists():
            print(f"  FALTA {origen}")
            continue
        antes = Image.open(p).size
        nota = lifestyle(p, OUT / destino)
        print(f"  {origen:22} {antes[0]}x{antes[1]:<5} -> {destino:26} {nota}")

    print("\nLOGOS")
    for origen, destino in LOGOS.items():
        p = SRC / origen
        if p.exists():
            print(f"  {origen:22} -> {destino:26} {logo(p, OUT / destino)}")

    if len(set(fondos.values())) > 1:
        print("\n  PROBLEMA: los packshots tienen fondos DISTINTOS entre sí:")
        for k, v in fondos.items():
            print(f"    - {k}: {v}")
        print("  En la grilla de la tienda se ve inconsistente. Ver BLOCKERS.md §5.")

    if avisos:
        print("\n  AVISOS:")
        for a in dict.fromkeys(avisos):
            print(f"    - {a}")


if __name__ == "__main__":
    main()
