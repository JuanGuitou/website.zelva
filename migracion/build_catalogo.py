#!/usr/bin/env python3
"""Genera catalogo.csv en el formato de carga masiva de Tiendanube.

Fuente: PRODUCTS_DATA y KITS_DATA de index.html (el prototipo, rama main).
Correr desde migracion/:  python3 build_catalogo.py
"""
import csv

# Columnas exactas del CSV de carga masiva de Tiendanube (orden oficial).
COLS = [
    "Identificador de URL", "Nombre", "Categorías",
    "Nombre de propiedad 1", "Valor de propiedad 1",
    "Nombre de propiedad 2", "Valor de propiedad 2",
    "Nombre de propiedad 3", "Valor de propiedad 3",
    "Precio", "Precio promocional", "Peso", "Alto", "Ancho", "Profundidad",
    "Stock", "SKU", "Código de barras", "Mostrar en tienda", "Envío sin cargo",
    "Descripción", "Tags", "Título para SEO", "Descripción para SEO",
    "Marca", "Producto físico", "MPN", "Sexo", "Rango de edad", "Costo",
]

# --- Botellas -----------------------------------------------------------
# Precio = precio de lista (tarjeta). El precio de transferencia ($40.000)
# NO va acá: sale del descuento global de 11,11% por medio de pago
# personalizado. Ver BLOCKERS.md §3.
BOTELLAS = [
    {
        "slug": "ish-london-botanical", "nombre": "ISH London Botanical",
        "cat": "Gin", "sku": "ZLV-GIN-700", "precio": 45000,
        "volumen": "700 ml · 0,0% alc.", "peso": 1.3,
        "desc": (
            "Un gin sin alcohol con carácter real: enebro, semillas de coriandro y "
            "cáscara de naranja amarga. Pensado para tu Gin &amp; Tonic o Negroni de "
            "siempre, sin una gota de alcohol."
        ),
        "nota": (
            "Enebro, coriandro y cáscara de naranja amarga, con un final seco y botánico."
        ),
        "como": (
            "Sobre mucho hielo con agua tónica premium y un twist de pomelo o una "
            "rama de romero."
        ),
        "ingr": (
            "Agua, extractos botánicos naturales (enebro, coriandro, cáscara de "
            "cítricos), acidulante natural."
        ),
        "tags": "gin, sin alcohol, ish, para tu bar en casa, para regalar, sin azucar",
        "seo_t": "ISH London Botanical · Gin sin alcohol 0,0% | ZELVA",
        "seo_d": (
            "Gin sin alcohol premium con enebro, coriandro y naranja amarga. "
            "700 ml, 0,0% alc. Envíos a todo el país."
        ),
    },
    {
        "slug": "ish-caribbean-spiced", "nombre": "ISH Caribbean Spiced",
        "cat": "Ron", "sku": "ZLV-RON-700", "precio": 45000,
        "volumen": "700 ml · 0,0% alc.", "peso": 1.3,
        "desc": (
            "Un destilado sin alcohol que captura el calor de un ron especiado: "
            "vainilla de Madagascar, nuez moscada y manzana horneada. Ideal para tu "
            "Cuba Libre o Mojito."
        ),
        "nota": "Vainilla de Madagascar, nuez moscada y roble tostado. Cálido y especiado.",
        "como": "Con cola y una rodaja de lima para un Cuba Libre, o en un Mojito bien fresco.",
        "ingr": (
            "Agua, extractos naturales de especias (vainilla, nuez moscada), notas de "
            "roble, acidulante natural."
        ),
        "tags": "ron, sin alcohol, ish, para tu bar en casa, para regalar",
        "seo_t": "ISH Caribbean Spiced · Ron sin alcohol 0,0% | ZELVA",
        "seo_d": (
            "Ron especiado sin alcohol con vainilla de Madagascar y nuez moscada. "
            "700 ml, 0,0% alc. Envíos a todo el país."
        ),
    },
    {
        "slug": "ish-sparkling-white", "nombre": "ISH Sparkling White",
        "cat": "Espumante", "sku": "ZLV-ESP-750", "precio": 45000,
        "volumen": "750 ml · 0,0% alc.", "peso": 1.4,
        "desc": (
            "Espumante sin alcohol de uvas blancas, con burbuja fina y elegante. Para "
            "brindar sin resignar nada, o como base de cocktails de autor."
        ),
        "nota": "Uvas blancas, burbuja fina y un final fresco y limpio.",
        "como": (
            "Bien frío en copa flauta, solo, o como base de un French 75 o un "
            "Passion Martini."
        ),
        "ingr": "Mosto de uva desalcoholizado, agua carbonatada, acidulante natural.",
        "tags": "espumante, sin alcohol, ish, para regalar, para eventos",
        "seo_t": "ISH Sparkling White · Espumante sin alcohol 0,0% | ZELVA",
        "seo_d": (
            "Espumante sin alcohol de uvas blancas, burbuja fina. 750 ml, 0,0% alc. "
            "Envíos a todo el país."
        ),
    },
]

DESC_TPL = """<p>{desc}</p>
<h3>Notas de cata</h3>
<p>{nota}</p>
<h3>Cómo tomarlo</h3>
<p>{como}</p>
<h3>Ingredientes</h3>
<p>{ingr}</p>
<p><strong>Origen:</strong> ISH · Copenhague, Dinamarca<br>
<strong>Presentación:</strong> {volumen}</p>"""

# --- Kits ---------------------------------------------------------------
KITS = [
    {
        "slug": "kit-gin-tonic", "nombre": "Kit Gin Tonic", "sku": "ZLV-KIT-GT",
        "precio": 52000, "peso": 2.2,
        "desc": "Todo para el clásico perfecto, listo para servir.",
        "contents": ["ISH London Botanical", "2 aguas tónicas premium",
                     "Botánicos para garnish"],
        "tags": "kit, gin, para regalar, para tu bar en casa",
        "variantes": None,
        "seo_t": "Kit Gin Tonic sin alcohol | ZELVA",
        "seo_d": "Kit completo para tu Gin Tonic sin alcohol: ISH London Botanical, tónicas premium y botánicos.",
    },
    {
        "slug": "kit-bar-en-casa", "nombre": "Kit Bar en Casa", "sku": "ZLV-KIT-BAR",
        "precio": 128000, "peso": 4.5,
        "desc": "Las tres botellas para armar tu barra sin alcohol.",
        "contents": ["ISH London Botanical", "ISH Caribbean Spiced",
                     "ISH Sparkling White", "Recetario impreso"],
        "tags": "kit, para tu bar en casa, para regalar",
        "variantes": None,
        "seo_t": "Kit Bar en Casa · 3 botellas sin alcohol | ZELVA",
        "seo_d": "Las tres botellas ISH sin alcohol más recetario impreso para armar tu barra en casa.",
    },
    {
        "slug": "kit-regalo", "nombre": "Kit Regalo", "sku": "ZLV-KIT-REG",
        "precio": 58000, "peso": 2.0,
        "desc": "Una botella a elección, copa de autor y packaging listo para regalar.",
        "contents": ["1 botella ISH a elección", "Copa de coctelería",
                     "Caja de regalo + tarjeta"],
        "tags": "kit, para regalar, para eventos",
        # "1 botella a elección" del prototipo => variante real en Tiendanube.
        "variantes": ("Botella", ["Gin", "Ron", "Espumante"]),
        "seo_t": "Kit Regalo sin alcohol · botella a elección | ZELVA",
        "seo_d": "Kit de regalo con una botella ISH sin alcohol a elección, copa de coctelería y packaging.",
    },
]

KIT_DESC_TPL = """<p>{desc}</p>
<h3>Qué incluye</h3>
<ul>
{items}
</ul>"""


def row(**kw):
    r = dict.fromkeys(COLS, "")
    r.update(kw)
    return r


def main():
    rows = []

    for b in BOTELLAS:
        rows.append(row(**{
            "Identificador de URL": b["slug"],
            "Nombre": b["nombre"],
            "Categorías": b["cat"],
            "Precio": b["precio"],
            "Peso": b["peso"],
            "Stock": "",                       # BLOCKER: stock inicial sin definir
            "SKU": b["sku"],
            "Mostrar en tienda": "SI",
            "Envío sin cargo": "NO",
            "Descripción": DESC_TPL.format(**b),
            "Tags": b["tags"],
            "Título para SEO": b["seo_t"],
            "Descripción para SEO": b["seo_d"],
            "Marca": "ISH",
            "Producto físico": "SI",
        }))

    for k in KITS:
        items = "\n".join(f"  <li>{c}</li>" for c in k["contents"])
        desc = KIT_DESC_TPL.format(desc=k["desc"], items=items)
        base = {
            "Identificador de URL": k["slug"],
            "Nombre": k["nombre"],
            "Categorías": "Kits y regalos",
            "Precio": k["precio"],
            "Peso": k["peso"],
            "Stock": "",
            "SKU": k["sku"],
            "Mostrar en tienda": "SI",
            "Envío sin cargo": "NO",
            "Descripción": desc,
            "Tags": k["tags"],
            "Título para SEO": k["seo_t"],
            "Descripción para SEO": k["seo_d"],
            "Marca": "ZELVA",
            "Producto físico": "SI",
        }
        if k["variantes"] is None:
            rows.append(row(**base))
        else:
            prop, valores = k["variantes"]
            for i, v in enumerate(valores):
                r = dict(base)
                r["Nombre de propiedad 1"] = prop
                r["Valor de propiedad 1"] = v
                r["SKU"] = f"{k['sku']}-{v[:3].upper()}"
                if i > 0:
                    # Tiendanube repite el identificador de URL y deja el resto
                    # de los campos comunes vacíos en las filas de variante.
                    for campo in ("Nombre", "Categorías", "Descripción", "Tags",
                                  "Título para SEO", "Descripción para SEO",
                                  "Marca", "Producto físico"):
                        r[campo] = ""
                rows.append(row(**r))

    with open("catalogo.csv", "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=COLS)
        w.writeheader()
        w.writerows(rows)

    print(f"catalogo.csv: {len(rows)} filas ({len(BOTELLAS)} botellas, "
          f"{len(KITS)} kits)")


if __name__ == "__main__":
    main()
