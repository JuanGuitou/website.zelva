# Blockers · migración a Tiendanube

Todo lo que **no puedo resolver yo** y frena el lanzamiento. Ordenado por urgencia:
los primeros tienen lead time o bloquean el resto del armado.

Estado al 2026-07-29. Marcá con `[x]` a medida que se resuelven.

---

## 1. Cuenta de Tiendanube — ✅ RESUELTO (2026-07-29)

- [x] La tienda existe: `tiendadejuanguitou.mitiendanube.com`
- [x] Acceso al admin, con contraseña propia (no Google SSO) para poder automatizar
- [x] Plan **Inicial (gratis)**, como estaba recomendado. Pasar a **Esencial ($26.999/mes)**
      al lanzar.

Estado relevado en `ESTADO-TIENDA.md`: la tienda está en cero — 0 productos, 0 categorías,
theme **Morelia** (hay que cambiar a Ipanema, que está disponible).

**Pendiente acá:** autorizar el **Admin MCP** (`https://admin-mcp.tiendanube.com`), ya
configurado en Claude Code. Con eso el catálogo se carga por MCP y el `catalogo.csv` queda
como fuente de verdad versionada, sin depender de que la importación CSV esté habilitada
en el plan Inicial.

---

## 2. Datos de contacto — hoy son todos placeholder

Ninguno de estos datos del prototipo es real. Van en el footer, el WhatsApp flotante,
la página de contacto y los emails automáticos de la tienda.

| Dato | Valor en el prototipo | Necesito |
|---|---|---|
| WhatsApp | `5491155555555` | Número real |
| Email | `hola@zelva.com.ar` | Confirmar que existe y que alguien lo lee |
| Instagram | `instagram.com/zelva` | Handle real |
| Dominio | — | ¿`zelva.com.ar` está comprado y a nombre de quién? |

---

## 3. Precios: el descuento por transferencia rompe con los kits

⚠️ **ACTUALIZADO 2026-07-30.** Juan cargó las botellas a **$49.000**, no a los $45.000 del
prototipo. Los números de abajo se recalcularon sobre el precio real.

**El problema.** En Tiendanube el descuento por medio de pago se configura **a nivel
tienda**: un único porcentaje global.

- Las botellas hoy están a **$49.000**, sin precio de transferencia definido. Si se mantiene
  el 11,11% del prototipo, quedarían en **$43.556**. **Hay que decidirlo de nuevo sobre el
  precio nuevo** — el par $45.000/$40.000 era de la maqueta.
- Los kits **no están cargados todavía**. Precios propuestos en `CATALOGO.md`.

Si se configura un descuento global, **los kits también se descuentan**. Sobre los precios
propuestos ($56.900 / $139.500 / $63.500), un 11,11% los dejaría en $50.578 / $124.000 /
$56.444 pagando por transferencia.

**Decidir una de estas:**

- [ ] **(a)** Aceptar el descuento en los kits. No hay nada que hacer, es el comportamiento
      por defecto. Es lo más simple y lo más coherente para el cliente.
- [ ] **(b)** Subir los precios de lista de los kits para que el precio con transferencia dé
      el número que querés. Ej: si querés que el Kit Gin Tonic quede en $52.000 con
      transferencia, el precio de lista pasa a $58.500.
- [ ] **(c)** No usar el descuento global y manejar la transferencia como precio manual.
      **No lo recomiendo**: perdés el "precio especial por transferencia" que aparece
      automáticamente en listados, detalle de producto y carrito, que es justo el efecto
      que busca el prototipo.

**Además:**

- [x] ~~Confirmar que los precios de $45.000 son reales~~ — **no lo eran**. El precio real
      es **$49.000**, cargado por Juan el 2026-07-30.
- [ ] Definir el **precio de transferencia** sobre $49.000.
- [ ] **Cuotas:** el prototipo promete "hasta 3 cuotas sin interés". Ese costo lo absorbe el
      vendedor. Confirmar que se banca.

---

## 4. Legales y fiscales — sin esto no se puede vender en Argentina

- [ ] Razón social, CUIT y domicilio fiscal del vendedor.
- [ ] **Data Fiscal de AFIP** — obligatorio en el footer. El prototipo ya tiene el lugar
      reservado, pero con un `href="#"` vacío.
      → Ya ubiqué dónde se carga: **Configuración > Códigos externos > AFIP > "Código de
      Data Fiscal"**. Es un campo dedicado, no hay que tocar el theme. Solo falta el código.
- [ ] **Botón de arrepentimiento** — obligatorio para e-commerce en Argentina.
      Tiendanube lo soporta de forma nativa, hay que activarlo y completarlo.
- [ ] Términos y condiciones.
- [ ] Política de cambios y devoluciones.
- [ ] Política de privacidad / tratamiento de datos.
- [ ] **Quién es el vendedor legal**: ¿ZELVA importa ISH directo o revende a un importador?
      Cambia el encuadre fiscal y también qué se puede afirmar en el copy. El texto de
      Nosotros dice *"importando marcas internacionales premiadas"* y el de la marca dice
      *"la primera marca que ZELVA trae a la Argentina"* — si en realidad se revende, ese
      copy hay que corregirlo antes de publicarlo.

---

## 5. Fotografía de producto — los assets actuales no alcanzan

Ya normalicé lo que había (`assets/`, generado por `build_assets.py`), pero hay dos
problemas que no se arreglan con procesamiento:

**Los tres packshots tienen fondos distintos entre sí.** Vienen del press kit de ISH y
cada uno trae un fondo liso diferente horneado en el pixel:

| Producto | Fondo original |
|---|---|
| Gin | `#EDCFA8` (tostado) |
| Ron | `#E2DAD7` (gris rosado) |
| Espumante | `#E4DAD3` (gris cálido) |

Ninguno es el crema de ZELVA (`#F5E7C6`). En la grilla de la tienda, los tres productos
uno al lado del otro se van a ver despareados. No los fuerzo al crema por código porque
las sombras de la botella se funden con el fondo y un reemplazo automático deja halos.

**Están por debajo de la resolución recomendada.** Tiendanube recomienda 1024–2048px:

| Archivo | Original | Reescalado |
|---|---|---|
| `ish-gin.png` | 524×654 | **×2,25** |
| `ish-ron.png` | 464×1058 | ×1,39 |
| `ish-espumante.png` | 744×1302 | ×1,13 |

El gin es el peor: al 2,25× se nota en el zoom del detalle de producto.

**Decidir:**

- [ ] **(a)** Fotografía nueva de las 3 botellas sobre fondo crema uniforme. Es lo correcto
      y no es caro para 3 SKUs. **Recomendado.**
- [ ] **(b)** Pedirle a ISH el press kit en alta y recortar los fondos a mano.
- [ ] **(c)** Lanzar con lo que hay y aceptar la inconsistencia. Se puede, pero se ve.

**Además:** no hay ninguna foto de los 3 kits. Hoy el prototipo los dibuja con iconos SVG.
Para vender kits hacen falta fotos reales del kit armado.

---

## 6. Envíos

- [ ] Transportistas a activar (Nube Envío, Correo Argentino, OCA, Andreani…).
- [ ] ¿Hay envío gratis a partir de $X? El prototipo muestra **"Envío: Gratis"** hardcodeado
      en el checkout, cosa que no es sostenible como regla general.
- [ ] **Peso y dimensiones reales** de cada SKU. En `catalogo.csv` puse estimaciones
      (botella 700ml ≈ 1,3 kg; espumante ≈ 1,4 kg; kits 2,0–4,5 kg) **que hay que verificar**:
      de esto sale el costo de envío que paga el cliente, y si está mal se pierde plata en
      cada venta. Las columnas Alto/Ancho/Profundidad están vacías.
- [ ] ¿Hay retiro en algún punto físico?

---

## 7. Stock

- [ ] Stock inicial de las 6 SKUs. En el CSV quedó vacío, que en Tiendanube significa
      **stock infinito**. Si no hay stock real cargado, la tienda vende lo que no tiene.

---

## 8. Contenido a validar antes de publicar

- [ ] **FAQ sobre embarazo.** En el prototipo dice literal
      `[Placeholder — requiere validación]`. Es una pregunta con implicancias de salud:
      o se redacta con respaldo profesional, o se elimina. No la voy a inventar.
- [ ] **"+15 premios en concursos internacionales"** (sección de la marca ISH). Es un dato
      duro y verificable: hay que confirmarlo o sacarlo.
- [ ] **"Fundada en 2018, pionera de la categoría"** — mismo criterio.
- [ ] **"Primer marketplace argentino dedicado a bebidas sin alcohol premium"** (Nosotros).
      Afirmación de primacía; si no es defendible, conviene suavizarla.
- [ ] Las 12 categorías del prototipo (Tequila, Whisky, Vermut, Vino, Cerveza…) figuran como
      "· pronto". **No las voy a crear**: una categoría vacía en Tiendanube se ve como una
      categoría vacía, no como una promesa. Confirmar que se lanzan solo Gin / Ron /
      Espumante / Kits.

---

## 9. Formularios de Empresas y Sumá tu marca

Tiendanube no tiene formularios custom nativos. Los dos formularios del prototipo
(cotización B2B y propuesta de marca) tienen campos específicos, con selects y todo.

- [ ] Elegir: **Google Forms embebido** (gratis, las respuestas caen en una planilla) o una
      **app tipo POWR** (paga, más integrada). Recomiendo Google Forms para arrancar.

Los campos exactos de cada formulario ya están transcriptos en
`contenido/empresas.md` y `contenido/sumate.md`, listos para armarlos.
