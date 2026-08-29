# ZELVA → Tiendanube · Plan de migración

**Origen:** `JuanGuitou/website.zelva` (prototipo, 1 commit)
**Destino:** tienda Tiendanube con theme Ipanema
**Estrategia elegida:** híbrido — Ipanema sin FTP, empujado con CSS/JS custom. Evaluar plan Impulso solo si al final falta fidelidad en pantallas concretas.
**Fecha:** 2026-07-29

---

## 0. Punto de partida real

El repo actual **no es un sitio web**: es un prototipo de diseño hecho con un runtime interno
(`support.js` = `dc-runtime`, React embebido con sintaxis `{{}}` / `<sc-if>` / `<sc-for>`).

No hay nada que "portar" a nivel código:

| Pieza | Estado en el prototipo |
|---|---|
| Carrito | Estado de React en memoria, se pierde al recargar |
| Checkout | Simulado — `confirmOrder()` genera un `ZLV-xxxx` random |
| Pagos | Inexistentes (dos radio buttons decorativos) |
| Envíos | Hardcodeado "Gratis" |
| Stock | Inexistente |
| Formularios (×4) | Solo cambian un booleano en pantalla, no envían nada |
| Búsqueda, cuentas, cupones | Inexistentes |

Lo que **sí** es valioso y migra: el contenido estructurado y el sistema visual.

### Contenido a migrar

- **3 botellas** — ISH London Botanical (Gin), ISH Caribbean Spiced (Ron), ISH Sparkling White
  (Espumante). Las tres a $45.000 tarjeta / $40.000 transferencia. Cada una con: nota de cata,
  descripción, origen, volumen, "cómo tomarlo", ingredientes.
- **3 kits** — Kit Gin Tonic $52.000, Kit Bar en Casa $128.000, Kit Regalo $58.000.
- **6 FAQs**.
- **8 recetas** → fuera del MVP, ver §7.
- **Copy de marca** — home, Nosotros, Empresas, Sumá tu marca.
- **Sistema visual** — crema `#F5E7C6`, verde oscuro `#1E2A1E`, verde medio `#3E5B40`;
  Newsreader (serif, títulos) + Archivo (sans, texto); botones pill `border-radius:999px`;
  acentos por categoría: Gin `#5B7141`, Ron `#A9631F`, Espumante `#6E9A6B`.

### Lo que NO migra

`uploads/` (14 MB de screenshots pegados y PDFs de trabajo), `scraps/`, `support.js`,
`image-slot.js`, y toda la lógica de `index.html`.

---

## 1. Restricciones de plataforma verificadas

Esto es lo que condiciona el plan (todo verificado en docs oficiales, no supuesto):

1. **Acceso al código fuente (FTP) recién en el plan Impulso — $78.999 ARS/mes.**
   Inicial (gratis) y Esencial ($26.999) no lo tienen.
2. **Abrir el FTP corta las actualizaciones automáticas de Tiendanube** y traslada el
   mantenimiento del diseño a un desarrollador. Es exactamente lo contrario de lo que
   necesitamos para un mantenedor no técnico. Por eso arrancamos sin FTP.
3. **El `fork` de themes vía CLI todavía no está habilitado** (`@tiendanube/cli` responde
   "forking isn't enabled yet"; además es solo para Ipanema). El único camino de código real
   hoy sigue siendo FTP.
4. ~~**Tiendanube no tiene blog nativo.**~~ **CORREGIDO 2026-07-29:** sí tiene. El admin
   muestra `Tienda online > Blog`. La pantalla falló al cargar en dos intentos, así que
   queda por confirmar si funciona en plan Inicial. Ver `migracion/ESTADO-TIENDA.md`.
5. **Los formularios custom no son nativos** — Google Forms embebido o app tipo POWR.
6. **La carga masiva por CSV es solo de planes pagos.** Con 6 SKUs es irrelevante: carga manual.
7. **A favor:** Ipanema trae nativo casi todo lo que usa el home — barra de anuncios, banners,
   productos destacados, testimonios, **FAQ** y **newsletter**, todo drag & drop.
8. **A favor:** el precio diferencial por transferencia **es nativo**
   (medio de pago personalizado + % de descuento, con opción de mostrar el precio con
   descuento en listados, detalle de producto y carrito). Replica exactamente el prototipo.

---

## 2. Decisiones que dependen de Juan (bloqueantes)

Ninguna la puedo resolver yo. Van primero porque varias tienen lead time.

### 2.1 Datos que hoy son placeholder

| Campo | Valor en el prototipo | Necesita |
|---|---|---|
| WhatsApp | `5491155555555` | Número real |
| Email | `hola@zelva.com.ar` | Confirmar que existe y recibe |
| Instagram | `instagram.com/zelva` | Handle real |
| FAQ embarazo | `[Placeholder — requiere validación]` | Redacción validada, o eliminarla |
| Dominio | — | ¿`zelva.com.ar` está comprado? |

### 2.2 Legales / fiscales (sin esto no se puede vender en AR)

- Razón social, CUIT y domicilio fiscal del vendedor.
- **Data Fiscal AFIP** — obligatorio, va en el footer (el prototipo tiene el placeholder puesto).
- **Botón de arrepentimiento** — obligatorio para e-commerce en Argentina; Tiendanube lo soporta,
  hay que activarlo.
- Términos y condiciones, política de cambios y devoluciones, política de privacidad.
- Definir quién es el vendedor legal: ¿ZELVA importa ISH directo, o revende? Cambia el
  encuadre fiscal y qué se puede afirmar en el copy.

### 2.3 Comercial

- **Inconsistencia a resolver:** el descuento por transferencia en Tiendanube se configura
  **a nivel tienda** (un % global). Las botellas tienen 45.000 → 40.000 = **11,11% off**.
  Los kits, en cambio, tienen un solo precio en el prototipo. Con el descuento global, los kits
  también bajarían 11,11%. Juan decide: (a) acepta el descuento en kits, o (b) ajusta los
  precios de lista de los kits para que el precio final con transferencia sea el que quiere.
- **Envíos:** el prototipo dice "Envío Gratis" siempre. Hay que definir transportistas
  (Nube Envío / Correo Argentino / OCA / Andreani) y si hay envío gratis a partir de $X.
- **Cuotas:** el prototipo promete "hasta 3 cuotas sin interés". Eso lo absorbe el vendedor —
  confirmar que Juan lo quiere bancar.
- **Stock inicial** de las 6 SKUs.

### 2.4 Cuenta

- ¿Ya existe una tienda en Tiendanube o la creamos? Si la creamos, arrancamos en **Inicial
  (gratis)** para construir y pasamos a **Esencial ($26.999)** al lanzar.
- Que Juan me dé acceso de colaborador al admin.

---

## 2 bis. Cómo se ejecuta el trabajo (definido 2026-07-29)

Tres vías, según lo que cubre cada una:

| Vía | Para qué | Estado |
|---|---|---|
| **Admin MCP oficial** (`admin-mcp.tiendanube.com`) | Catálogo: productos, variantes, categorías, stock, precios | Configurado en Claude Code, **falta autorizar OAuth** |
| **Playwright** (`migracion/automation/`) | Lo que el MCP no cubre: páginas de contenido, editor de diseño | ✅ Funcionando, login resuelto |
| **A mano, con paso a paso** | Pagos, envíos, plan | Pendiente |

El MCP no requiere ser partner ni crear una app — eso deja obsoleto el plan original de
armar una app OAuth propia.

**La cuenta de Tiendanube tiene contraseña propia además del SSO de Google**, justamente
para no automatizar nunca el login de Google (detecta el navegador controlado y puede
bloquear la cuenta). Las credenciales viven fuera del repo; ver
`migracion/automation/README.md`.

---

## 3. Fase 1 — Extracción de contenido (yo, sin bloqueos)

Puedo arrancar ya, no depende de nada de §2.

- Extraer `PRODUCTS_DATA`, `KITS_DATA`, `FAQS_DATA`, `RECIPES_DATA` y todo el copy de
  `index.html` a archivos estructurados y legibles.
- Preparar los assets: normalizar a cuadrado con fondo crema horneado (Tiendanube recortea
  a cuadrado en los listados), comprimir.
- **Advertencia sobre los assets:** están al límite. `prod-gin.png` es 1100×1232 (usable),
  pero `ish-gin.png` es 524×654 — bajo para un detalle de producto con zoom. Tiendanube
  recomienda ~1024–2048px. Recomiendo **fotografía nueva** de las 3 botellas antes de lanzar;
  si no, se usa lo que hay y se acepta que el zoom queda pobre.
- Descartar `uploads/` y `scraps/`.

**Entregables** (en la rama del repo de Juan):
```
migracion/
  catalogo.csv          # 6 SKUs listo para importar o para cargar a mano
  contenido/
    home.md  nosotros.md  empresas.md  sumate.md  faqs.md
    productos/{gin,ron,espumante}.md
  assets/               # imágenes normalizadas
  identidad-visual.md   # paleta, tipografías, tokens
```

---

## 4. Fase 2 — Armado de la tienda

Con acceso al admin. Mayormente configuración, no código.

### 4.1 Catálogo

- 3 botellas + 3 kits.
- **Kit Regalo lleva variante**: "1 botella ISH a elección" → variante Gin / Ron / Espumante.
- Categorías: **solo las 3 activas** (Gin, Ron, Espumante) + "Kits y regalos".
  El prototipo listaba 12 categorías con "· pronto" (Tequila, Whisky, Vermut, etc.) — eso era
  un recurso de diseño. En Tiendanube una categoría vacía se ve como una categoría vacía;
  no las creamos hasta que haya producto.
- Las 4 "ocasiones" (Para regalar / Para tu bar en casa / Para eventos / Sin azúcar) →
  categorías secundarias, que es lo que Ipanema puede filtrar.

### 4.2 Home (mapeo sección por sección)

| Prototipo | Ipanema |
|---|---|
| Barra "Envíos a todo el país · 3 cuotas · precio transferencia" | Barra de anuncios (nativa) |
| Hero "Otra forma de brindar…" | Banner principal |
| "Por qué sin alcohol" (3 columnas) | Sección de beneficios / iconos |
| Nuestras botellas | Productos destacados |
| Kits y packs | Productos destacados (2ª instancia) |
| Historia de ISH (Copenhague) | Banner imagen + texto |
| Recetario (carousel) | — fuera del MVP |
| Empresas / Sumá tu marca (2 bloques) | Banners que linkean a páginas de contenido |
| FAQ (acordeón) | Sección FAQ (nativa) ✓ |
| Newsletter | Sección newsletter (nativa) ✓ |
| Footer + Data Fiscal + leyenda legal | Footer configurable |
| WhatsApp flotante | App gratuita del App Store, o CSS/JS custom |

### 4.3 Páginas de contenido

Nosotros · Empresas · Sumá tu marca · Contacto (Tiendanube tiene página de contacto nativa) ·
Términos y condiciones · Cambios y devoluciones · Privacidad.

Los formularios de Empresas y Sumá tu marca: **Google Forms embebido** (gratis, Juan ve las
respuestas en una planilla) salvo que prefiera pagar una app tipo POWR.

### 4.4 Pagos y envíos

- Pago Nube (tarjetas, hasta 3 cuotas sin interés).
- Medio de pago personalizado "Transferencia bancaria" con **11,11% de descuento**, y activar
  "mostrar el precio con mayor descuento en listados, detalle y carrito" para replicar el
  doble precio del prototipo.
- Transportistas + regla de envío gratis según §2.3.

---

## 5. Fase 3 — Capa de marca (CSS/JS)

Acá es donde se juega el "híbrido". Sin FTP, empujando Ipanema con CSS custom:

- Paleta completa (crema, verde oscuro, verde medio, acentos por categoría).
- Newsreader + Archivo vía Google Fonts.
- Botones pill, radios de tarjetas, tratamiento de la barra de anuncios.
- WhatsApp flotante con la animación de pulso del prototipo.
- Micro-ajustes de tipografía y espaciado hacia el original.

**Checkpoint de decisión.** Al terminar esta fase comparamos contra el prototipo y medimos el
gap real. Ahí, con evidencia y no con especulación, decidimos si vale $52.000/mes extra
(Impulso vs Esencial) más la dependencia permanente de un dev. Mi apuesta es que no hace falta,
pero la decisión queda documentada con capturas lado a lado.

---

## 6. Fase 4 — Pre-lanzamiento

- Data fiscal, botón de arrepentimiento, leyendas legales.
- Conectar dominio.
- SEO básico: títulos, descripciones, URLs de las 6 SKUs.
- **Pedido de prueba end-to-end**: comprar de verdad, pagar de verdad, verificar los emails
  automáticos, el remito y la cancelación.
- Revisión en mobile (el prototipo es responsive, la tienda también tiene que serlo).

---

## 7. Recetario — v2, post-lanzamiento

Sale del MVP por decisión explícita. Cuando entre:

**Una sola página de contenido con las 8 recetas**, con índice de anclas arriba
(Gin / Ron / Cocktails / Sin azúcar). Los filtros dinámicos del prototipo se reemplazan por
agrupación visual — Tiendanube no tiene blog nativo y no vale la pena montar una segunda
plataforma por 8 recetas.

Trade-off aceptado: peor SEO que 8 páginas separadas (no rankea "mojito sin alcohol" por su
cuenta), a cambio de que Juan lo mantenga desde un solo editor visual.

El contenido ya queda extraído en Fase 1, así que la v2 es solo pegar y maquetar.

---

## 8. Fase 5 — Handoff

El objetivo de todo esto: que Juan no me necesite.

`migracion/MANTENIMIENTO.md` en el repo, con capturas: cómo cambiar un precio, cómo cargar un
producto, cómo editar el home, cómo agregar una FAQ, cómo ver los pedidos, cómo cambiar el
descuento por transferencia, a quién escribir si algo se rompe.

---

## 9. Dónde vive esto

Rama nueva en `JuanGuitou/website.zelva` (tengo push, no admin). `main` queda intacto con el
prototipo como referencia visual.

---

## 10. Camino crítico

Lo que puede arrancar hoy: Fase 1 (extracción). No depende de nada.

Lo que bloquea el lanzamiento y tiene lead time: los datos de §2.2 (fiscales/legales) y la
decisión de fotografía de producto. Conviene destrabar eso en paralelo mientras yo extraigo
contenido.
