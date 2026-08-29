# QA report — borrador ZELVA

> **Auditoría hecha por un worker externo (GPT-5.6 Terra) el 2026-07-31.** Abajo, al final,
> están mis verificaciones sobre sus hallazgos: **uno es falso positivo y otro tiene causa
> raíz distinta a la que supuso.**

Auditado: 2026-07-31. Ambiente: `?preview=true&theme_installation_id=13836885`; Chromium headless; desktop 1440 px y mobile 390 px.

El borrador carga, navega, lista los 7 productos, las categorías responden y las búsquedas `ISH`, `gin` y `kit` devuelven resultados. Las páginas de contenido y el formulario de contacto cargan sin 404. Pero no está listo para lanzar: la home conserva casi toda la configuración demo/vacía y el flujo de compra se corta al agregar productos por falta de stock. Los 3 kits tampoco tienen foto y exponen texto interno de placeholder.

## Lista de arreglos priorizada

| Severidad | Dónde (URL + desktop/mobile) | Qué pasa | Qué habría que hacer |
|---|---|---|---|
| **BLOQUEANTE — BUG** | `/productos/ish-london-botanical-13ba3/` — desktop y mobile. También reproducido en `/productos/kit-regalo/`. Capturas: `qa-normal-add-desktop.png`, `qa-cart-added-mobile.png` | El CTA **Agregar al carrito** está habilitado, pero al usarlo muestra **“No hay más stock de este producto.”** No se agrega ni se puede llegar al carrito con un producto nuevo. El Kit Regalo falla igual. | Corregir stock/publicación de variantes y productos en Tiendanube. Reprobar agregar botella, kit, modificar cantidad y borrar desde carrito antes de lanzar. |
| **BLOQUEANTE — CONTENIDO FALTANTE** | `/` — desktop y mobile. Capturas: `qa-home-desktop.png`, `qa-home-mobile.png` | Home con secciones demo/vacías: carrusel sin imagen (“Podés subir imágenes principales…”), categorías sin configurar, texto institucional genérico, 2 banners de promoción vacíos, testimonios genéricos, video vacío, bloque de compra sin datos e Instagram vacío. | Cargar o desactivar cada sección incompleta. Mínimo: hero real, categorías, propuesta institucional y bloques de confianza reales; ocultar banners/testimonios/video/Instagram hasta contar con contenido. |
| **ALTO — CONTENIDO FALTANTE** | `/productos/`, `/productos/kit-gin-tonic/`, `/productos/kit-bar-en-casa/`, `/productos/kit-regalo/` — desktop y mobile. Capturas: `qa-products-desktop.png`, `qa-kit-regalo-desktop.png` | Los 3 kits muestran el ícono gris de cámara en listado, detalle y “productos similares”: no tienen foto. | Subir foto principal real para cada kit; verificar recortes desktop/mobile y cards relacionadas. |
| **ALTO — CONTENIDO FALTANTE** | `/productos/kit-gin-tonic/`, `/productos/kit-bar-en-casa/`, `/productos/kit-regalo/` — desktop y mobile. Captura: `qa-kit-regalo-desktop.png` | Se publica copy interno: `[PLACEHOLDER — … a confirmar por Juan]`. En Kit Gin Tonic falta confirmar contenido; en Bar en Casa queda expuesta la duda sobre Rosé; en Regalo, la decisión de las 4 variantes. | Definir composición comercial final y reemplazar/eliminar los 3 placeholders. Mantener solo variantes que realmente se entregan. |
| **MEDIO — CONTENIDO FALTANTE** | `/` — desktop y mobile. Capturas: `qa-home-desktop.png`, `qa-home-mobile.png` | Las cards de destacados de los 3 kits quedan sin imagen; la home empieza mostrando productos visualmente vacíos. | Después de cargar fotos de kits, validar destacados. Si no habrá fotos al lanzamiento, sacar kits de destacados. |

## No pude verificar

- **Carrito completo: cambiar cantidad y sacar producto.** No corresponde forzar el flujo: un contexto nuevo ya mostraba contador de carrito `3`, y al intentar sumar una botella o Kit Regalo el storefront devolvió “No hay más stock”. Sin una alta exitosa no hay un carrito de prueba aislado y seguro para modificar/eliminar.
- **Variante Kit Regalo de punta a punta.** El selector muestra las 4 opciones, pero el kit no se puede agregar por el mismo error de stock. No quedó probado que la variante elegida viaje al carrito.
- **Checkout/pago.** Fuera de alcance por instrucción; no se ingresó a pago.
- **Envío del contacto y newsletter.** No enviados por instrucción. La UI/campos cargan.
- **Click físico del overlay del buscador.** Verifiqué las rutas reales de búsqueda para `ISH`, `gin` y `kit` y sus resultados; el trigger visual del overlay no quedó probado en esta pasada automatizada.


---

# Verificación de los hallazgos (2026-07-31)

## ✅ El BLOQUEANTE del carrito es real — pero la causa es otra

El worker lo atribuyó a "stock/publicación de variantes". **No es eso.** Lo reproduje y medí:

- Falla en los **7 productos**, en el borrador **y en el sitio en vivo**, con carrito limpio
  (badge 0). No es un problema del preview.
- Falla **incluso en ISH Sparkling White, que tiene 228 unidades reales cargadas**. Así que
  descartado: no es cantidad de stock ni configuración de variantes.
- La API reporta `stock_availability: "in_stock"` en los 7.

**Causa raíz real:** la tienda **no tiene centro de distribución definido**
(`Configuración > Centros de distribución` dice *"Para empezar, definí el centro de
distribución principal"*) **ni ningún medio de pago activado**. Sin ubicación de
almacenamiento, Tiendanube no puede asignar inventario y el carrito responde "no hay más
stock" aunque el número exista.

**Quién lo arregla:** Juan. El centro de distribución necesita una dirección real y los
medios de pago necesitan sus cuentas. No es algo que se resuelva desde el catálogo.
Ver `BLOCKERS.md` §4 y §6.

## ❌ Las "secciones demo del home" son FALSO POSITIVO

El worker reportó como bloqueante que el home muestra carrusel vacío, testimonios genéricos,
video vacío e Instagram vacío, con textos como *"Podés subir imágenes principales…"*.

**Esos textos existen SOLO en modo preview.** Medido sobre el HTML servido:

| Texto | En vivo | En `?preview=true` |
|---|---|---|
| "Podés subir imágenes" | **0** | 1 |
| "Testimonios" | **0** | 2 |
| "Usá este texto" | **0** | 1 |

Son pistas del editor de diseño para el que está configurando, no contenido publicado. Al
publicar el borrador, las secciones sin contenido simplemente **no se renderizan**.

El worker no podía saberlo: le pedí auditar el preview, que es donde vive la capa de marca.
Queda como aprendizaje para la próxima: **contrastar siempre preview contra vivo antes de
reportar contenido demo.**

## ✅ Arreglado: barra de beneficios

Lo único de la lista que sí me correspondía. El home tenía el bloque de 4 servicios vacío;
lo llené transcribiendo el copy del prototipo: *Marcas premiadas · Importación oficial ·
Envíos a todo el país · Sabor real, cero resaca*, con sus iconos.

⚠️ *"Envíos a todo el país"* e *"Importación oficial"* son promesas que dependen de
`BLOCKERS.md` §6 y §4. Van transcritas del prototipo, no las edité.

## Sigue abierto y NO es mío

- **Fotos de los 3 kits** (ALTO). No existen.
- **Placeholders visibles en las descripciones de los kits** (ALTO). Son **deliberados**:
  marcan lo que Juan tiene que confirmar. Ver `LIBERTADES.md` §2. Se sacan cuando él defina
  la composición, no antes.
