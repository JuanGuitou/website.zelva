# Catálogo — estado canónico

**La fuente de verdad del catálogo es la tienda, no este repo.** Los productos los cargó
Juan con datos reales; `catalogo.csv` quedó obsoleto (salía del prototipo, que era una
maqueta con precios placeholder de $45.000).

Última sincronización: **2026-07-30**, vía Admin MCP.

---

## Productos cargados (4)

Todos a **$49.000**, marca **ISH**, publicados, con las descripciones oficiales de ISH.

| Producto | Categoría | Ocasiones | Imágenes | SEO |
|---|---|---|---|---|
| ISH London Botanical | Gin | Para regalar · Bar en casa · Sin azúcar | ✅ 2 | ✅ |
| Caribbean Spiced Spirit | Ron | Para regalar · Bar en casa | ✅ 2 | ✅ |
| ISH Sparkling White | Espumante | Para regalar · Para eventos | ✅ 2 | ✅ |
| **ISH Sparkling Rosé** | Espumante | Para regalar · Para eventos | ❌ **falta** | ✅ |

### Diferencias con el prototipo — resueltas adoptando lo de Juan

- **Precio $49.000**, no $45.000.
- **ISH Sparkling Rosé no existe en el prototipo.** No hay copy propio, ni foto, ni recetas.
  Se le escribió SEO a partir de su descripción oficial; **falta la imagen**.
- El ron quedó como **"Caribbean Spiced Spirit"**, rompiendo el patrón "ISH X" de los otros
  tres. **Se respeta el nombre de Juan**, no se renombra.
- Las descripciones son las **oficiales de ISH** y son mejores que las extraídas del
  prototipo. Las del CSV se descartan.

---

## Categorías creadas (8)

**Visibles en el menú** — la taxonomía principal:
Gin · Ron · Espumante · Kits y regalos

**Ocultas del menú** — sirven para filtrar sin llenar la navegación con 8 ítems de primer
nivel. Se hacen visibles con un click si se prefiere:
Para regalar · Para tu bar en casa · Para eventos · Sin azúcar

⚠️ "Kits y regalos" está **vacía** hasta que se carguen los kits.

---

## Kits — pendientes de decisión de precio

Los 3 kits no están cargados. Sus precios del prototipo asumían botellas a $45.000.

**Propuesta**, escalando por la misma proporción (×49/45, mantiene el margen relativo):

| Kit | Precio viejo | Propuesto | Contenido |
|---|---|---|---|
| Kit Gin Tonic | $52.000 | **$56.900** | ISH London Botanical + 2 tónicas premium + botánicos |
| Kit Bar en Casa | $128.000 | **$139.500** | Las 3 botellas + recetario impreso |
| Kit Regalo | $58.000 | **$63.500** | 1 botella a elección + copa + caja |

Verificación del Bar en Casa: 3 botellas sueltas = $147.000, el kit a $139.500 son **5% de
descuento** — el prototipo tenía 5,2%, así que la relación se mantiene.

**No los cargué**: el precio es una decisión comercial, no una cuenta. Además hay que
resolver:

- El **Kit Regalo lleva variante** `Botella`. Con el Rosé, ¿son 3 opciones o 4?
- El **Kit Bar en Casa dice "las tres botellas"**. Con 4 productos, ¿sigue siendo 3?
- **No hay fotos de ningún kit.** El prototipo los dibujaba con iconos SVG.

---

## Lo que falta en los productos ya cargados

- **Stock** — sin cargar. En Tiendanube vacío = **stock infinito**: la tienda vende lo que
  no tiene. Ver `BLOCKERS.md` §7.
- **Peso y dimensiones** — sin cargar. De ahí sale el costo de envío que paga el cliente.
  Ver `BLOCKERS.md` §6.
- **Imagen del Rosé.**
- **Precio de transferencia.** Con el descuento de 11,11% del prototipo, $49.000 daría
  **$43.556**. Pero eso hay que redecidirlo sobre el precio nuevo — ver `BLOCKERS.md` §3.
