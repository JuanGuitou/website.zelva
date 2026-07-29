# Migración a Tiendanube

Contenido, assets y documentación para pasar el prototipo de ZELVA a una tienda real
en Tiendanube.

**El prototipo de `main` no es un sitio web funcional**: no tiene carrito real, checkout,
pagos, stock ni formularios que envíen nada. Lo que se migra es el **contenido** y el
**sistema visual**. El detalle está en `../PLAN-MIGRACION-TIENDANUBE.md`.

---

## Por dónde empezar

1. **`../PLAN-MIGRACION-TIENDANUBE.md`** — el plan completo: estrategia, fases, restricciones
   de la plataforma y por qué se eligió cada camino.
2. **`BLOCKERS.md`** — 👈 **empezar acá.** Todo lo que falta definir y frena el lanzamiento.
3. **`checklist-armado.md`** — los pasos concretos en el admin, en orden.

---

## Archivos

| Archivo | Qué es |
|---|---|
| `BLOCKERS.md` | Lo que no puedo resolver yo y bloquea el lanzamiento |
| `checklist-armado.md` | Paso a paso del armado en el admin |
| `catalogo.csv` | Los 6 SKUs en el formato de carga masiva de Tiendanube |
| `identidad-visual.md` | Paleta, tipografías y componentes del prototipo |
| `MANTENIMIENTO.md` | Guía para quien mantenga la tienda *(se completa en Fase 5)* |
| `contenido/` | Copy de cada página, listo para pegar |
| `assets/` | Imágenes normalizadas para Tiendanube |
| `build_catalogo.py` | Regenera `catalogo.csv` |
| `build_assets.py` | Regenera `assets/` desde `../assets/` |

### `contenido/`

| Archivo | Página |
|---|---|
| `home.md` | Home, con el mapeo sección por sección a Ipanema |
| `nosotros.md` | Nosotros |
| `empresas.md` | Empresas (B2B), con los campos del formulario |
| `sumate.md` | Sumá tu marca, con los campos del formulario |
| `contacto.md` | Contacto |
| `faqs.md` | Las 6 preguntas frecuentes |
| `recetario-v2.md` | Las 8 recetas — **fuera del MVP**, para la v2 |

---

## Estado

| Fase | Estado |
|---|---|
| 1 · Extracción de contenido y assets | ✅ Hecho |
| 2 · Armado de la tienda | ⛔ Bloqueado por `BLOCKERS.md` §1 (acceso al admin) |
| 3 · Capa de marca (CSS) | ⛔ Depende de la Fase 2 |
| 4 · Pre-lanzamiento | ⛔ Depende de `BLOCKERS.md` §4 (legales) |
| 5 · Handoff | ⛔ Depende de la Fase 4 |
| v2 · Recetario | 📋 Contenido ya extraído, para después del lanzamiento |

---

## Regenerar

```bash
cd migracion
python3 build_catalogo.py    # -> catalogo.csv
python3 build_assets.py      # -> assets/   (necesita Pillow)
```

`build_assets.py` avisa por consola sobre los problemas de resolución y de fondos
despareados de los packshots. Ver `BLOCKERS.md` §5.

---

## Qué NO se migra

`uploads/` (14 MB de capturas de trabajo y PDFs), `scraps/`, `support.js`, `image-slot.js`
y toda la lógica de `index.html`. El prototipo queda intacto en `main` como referencia visual.
