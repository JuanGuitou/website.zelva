# Libertades tomadas — para revisar con Juan

Instrucción recibida: *"asumí lo mejor y después se corrige"* + *"dejá tus propios
placeholders donde no tengas claro"*.

Esto es todo lo que decidí yo sin confirmación. **Nada de esto está publicado**: el catálogo
sí está en vivo, el diseño está en borrador. Todo se edita desde el admin sin tocar código.

Última actualización: **2026-07-31**

---

## 1. Precios de los kits — ASUMIDOS

Los del prototipo asumían botellas a $45.000; el precio real es $49.000. Los escalé por la
misma proporción (×49/45), que mantiene el margen relativo.

| Kit | Prototipo | **Cargado** |
|---|---|---|
| Kit Gin Tonic | $52.000 | **$56.900** |
| Kit Bar en Casa | $128.000 | **$139.500** |
| Kit Regalo | $58.000 | **$63.500** |

Verificación del Bar en Casa: 3 botellas sueltas = $147.000; el kit a $139.500 son **5% de
descuento**. El prototipo tenía 5,2%, así que la relación se mantiene.

**Dónde se cambia:** Productos → el kit → Precio de venta.

---

## 2. Composición de los kits — ASUMIDA, con placeholder visible

Cada kit tiene en su descripción un `[PLACEHOLDER — …]` que **se ve en la tienda** hasta que
Juan lo edite. Fue a propósito: prefiero que se note a que pase inadvertido.

- **Kit Gin Tonic:** contenido exacto sin confirmar.
- **Kit Bar en Casa:** lo dejé con **3 botellas** (gin, ron, espumante blanco) como el
  prototipo. Con el Rosé ahora hay 4 — falta decidir si entra.
- **Kit Regalo:** la variante `Botella` ofrece **las 4 opciones**, incluido el Rosé. Si alguna
  no va, se borra esa variante.

**Dónde se cambia:** Productos → el kit → Descripción / Variantes.

---

## 3. Peso de los kits — ESTIMADO

2,2 kg / 4,5 kg / 2,0 kg. **Sin verificar.** De acá sale el costo de envío que paga el
cliente: si está mal, se pierde plata en cada venta.

Las 4 botellas siguen en **0,000 kg**, que es lo que Juan cargó. El admin avisa que sin peso
no puede mostrar todos los medios de envío.

---

## 4. Copy: NINGUNA libertad — va tal cual el prototipo

Inicialmente suavicé tres afirmaciones del prototipo que no pude verificar. **Fue un error de
criterio y está revertido** (2026-07-31): editar texto preexistente no es decisión nuestra,
ni siquiera cuando la afirmación es dudosa.

El copy publicado es **exactamente** el de `contenido/nosotros.md`, incluyendo:

- "Somos el **primer** marketplace argentino…"
- "**importando** marcas internacionales premiadas"
- "**Primeros en el país**"

Estas tres siguen **sin verificar** y quedan anotadas en `BLOCKERS.md` §8 para que Juan las
valide o las reescriba. La decisión es suya, no nuestra.

**Regla para adelante:** el texto que ya existe se transcribe, no se corrige. Si algo parece
mal, se marca en `BLOCKERS.md` y se avisa — no se edita.

---

## 5. Categorías de ocasión — OCULTAS del menú

Creé *Para regalar*, *Para tu bar en casa*, *Para eventos* y *Sin azúcar* como categorías
**ocultas**. Sirven igual para filtrar, pero no aparecen en la navegación: con las 4
principales serían 8 ítems de primer nivel y el menú queda ilegible.

**Dónde se cambia:** Productos → Categorías → visibilidad.

---

## 6. Asignación de ocasiones a productos — INFERIDA

Salieron de los tags del prototipo. El **Sparkling Rosé no existe en el prototipo**, así que
le puse las mismas que al Sparkling White (*Para regalar*, *Para eventos*).

---

## 7. Diseño: colores y textos del home

En el **borrador**, no en el diseño publicado.

- Paleta del prototipo: fondo `#F5E7C6`, textos `#1E2A1E`, acento `#3E5B40`, botones
  `#1E2A1E` sobre crema.
- Tipografías: **Newsreader** en títulos, **Archivo** en el cuerpo.
- Hero: volanta *"Bebidas espirituosas sin alcohol · Premium"* + titular *"Otra forma de
  brindar, la misma forma de disfrutar."* + botón *"Ver botellas"*.
- Newsletter: *"Sumate al mundo ZELVA"* y una bajada que **inventé yo**
  (*"Recetas, lanzamientos y novedades de la categoría sin alcohol."*) — el prototipo no
  tenía texto ahí.

**Dónde se cambia:** Tienda online → Diseño → Editar borrador.

---

## 8. SEO de los 4 productos — ESCRITO POR MÍ

Títulos y descripciones SEO redactados a partir de las descripciones oficiales de ISH.
Ninguno estaba cargado. El del **Rosé** salió enteramente de su descripción, porque no hay
material propio para ese producto.

---

## 9. Lo que NO inventé, a propósito

- **Textos legales** (términos, cambios y devoluciones, privacidad). No los escribo.
- **FAQ sobre embarazo.** El prototipo la marcaba `[Placeholder — requiere validación]`.
  Tiene implicancias de salud: o se redacta con respaldo profesional o se elimina.
- **Datos de contacto reales** (WhatsApp, email, Instagram).
- **Stock.** Tres productos quedan en ∞ Infinito, o sea venden sin tener.
- **Fotos de los kits.** No existen; en la tienda se ven con el ícono de cámara.
- **"+15 premios internacionales"** y **"fundada en 2018"** de ISH: datos verificables sin
  fuente, no los publiqué en ningún lado.
