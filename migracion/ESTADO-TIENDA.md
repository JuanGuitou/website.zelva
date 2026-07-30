# Estado real de la tienda

Relevado el **2026-07-29** entrando al admin (`migracion/automation/explorar.mjs`).
Esto es observación directa, no supuestos.

**Tienda:** `tiendadejuanguitou.mitiendanube.com` — el nombre visible ya es **Zelva**
(al 2026-07-30; el 29 todavía decía "Tienda de Juan Guitou").

---

## Qué hay hoy

| | Estado |
|---|---|
| **Plan** | **Inicial (gratis)** — el admin muestra *"Recursos limitados · Subí de plan y explorá todas las funcionalidades por 7 días gratis"* |
| **Productos** | **4** al 2026-07-30 (eran 0 el 29). Los cargó alguien del lado de Juan |
| **Categorías** | Ninguna |
| **Theme actual** | **Morelia**, no Ipanema |
| **Theme borrador** | Otro Morelia, última edición 2 jul |
| **Ipanema** | **Disponible** — el panel de Diseño ofrece *"Probar Ipanema"* |
| **Logo** | Sin subir |

⚠️ **Cambió entre el 29 y el 30.** El 29 la tienda estaba en cero. El 30 aparecieron
**4 productos** cargados por alguien del lado de Juan, con **precio $49.000** y las
descripciones oficiales de ISH.

Eso deja `catalogo.csv` **desactualizado**: fue extraído del prototipo, que era una maqueta
con precios placeholder ($45.000). El trabajo pasa de *cargar* a *reconciliar* —
ver `HANDOFF.md` §5.

**Lo cargado:** ISH London Botanical · Caribbean Spiced Spirit · ISH Sparkling White ·
**ISH Sparkling Rosé** (este último **no existe en el prototipo**: no hay copy, ni foto,
ni recetas para él).

**Lo que falta:** categorías (0), imágenes, variantes y los 3 kits.

**Subdominio:** ahora es `zelva.mitiendanube.com`. El viejo `tiendadejuanguitou` **sigue
resolviendo al mismo admin** — es una sola tienda (id 7919099), no dos.

⚠️ **El storefront público muestra contenido demo de Morelia**, no el catálogo real: la home
es una tienda de ropa de ejemplo y el listado devuelve 27 "Producto de ejemplo". Los 4
productos reales están cargados y publicados (verificado por MCP: 0 despublicados). **Sin
diagnosticar todavía** — probablemente el theme sea la demo sin configurar, pero no está
confirmado.

---

## Correcciones a lo que decía el plan

Tres cosas que había investigado en docs y que la realidad del admin desmiente o matiza:

### 1. Tiendanube SÍ tiene blog nativo

El plan decía que no, basándome en documentación. **Es incorrecto**: el menú lateral tiene
`Tienda online > Blog`.

⚠️ **Pero no funciona.** La pantalla devuelve *"Se produjo un error en la aplicación · No se
pudo cargar la aplicación en este momento"*. Probado **4 veces en 2 días**, con esperas de
hasta 12 s: falla siempre. No es transitorio.

No puedo distinguir si está limitado por el plan Inicial o si es un bug de Tiendanube — el
mensaje es genérico y no menciona el plan. **Se resuelve preguntando a soporte**, o
reintentando cuando la tienda pase a Esencial.

**Impacto:** si el blog funciona, la decisión sobre el recetario se puede reabrir — 8 posts
con categorías reales rankean bastante mejor que una sola página con anclas. Sigue estando
fuera del MVP, pero la v2 tendría una opción mejor. Ver `contenido/recetario-v2.md`.

### 2. El MCP oficial reemplaza el setup de partner app

Tiendanube tiene un **Admin MCP oficial** en `https://admin-mcp.tiendanube.com`, que se
conecta por OAuth y **no requiere ser partner ni crear una app**. Cubre productos, pedidos,
clientes, cupones y stock.

Eso deja obsoleto el plan de registrarse como partner, crear una app y hacer el baile de
OAuth a mano. **Configurado y autorizado el 2026-07-30** — conectado y operativo.

### 3. "Códigos externos" no sirve para la capa de marca

Esperaba poder inyectar CSS/JS por ahí sin FTP. **No se puede**: la sección
`Configuración > Códigos externos` solo acepta pixel de Facebook, metaetiquetas de Google y
Bing, encuestas, códigos de conversión y **Data Fiscal de AFIP**.

**Lo bueno:** ya sé exactamente dónde va el Data Fiscal del blocker §4 — es un campo
dedicado, no hay que tocar el theme.

**Lo malo:** la Fase 3 (capa de marca) depende del editor de diseño de Ipanema y, si hace
falta más, del recurso `Scripts` de la API vía MCP. No hay un cajón de CSS libre.

---

## Cambiar a Ipanema: se puede armar gratis, publicar cuesta

Verificado en la documentación de Tiendanube, y cambia el orden de trabajo:

- **En plan Inicial se puede probar cualquier plantilla en modo borrador.** O sea: **todo el
  armado de Ipanema — secciones, colores, tipografías, contenido — se puede hacer gratis.**
- **Para publicar** un diseño distinto al predeterminado **hace falta plan pago**
  (Esencial, $26.999/mes).
- El cambio es **reversible**: al publicar un diseño nuevo, el anterior se guarda solo como
  borrador.
- **Se pierden al cambiar de plantilla:** carrusel de imágenes, banners, colores y
  tipografías. **Se conservan:** productos, clientes, ventas y páginas.

**Consecuencia práctica:** no hay que pagar nada todavía. Se arma Ipanema entero en borrador
sobre el plan gratuito, y el upgrade a Esencial se hace **solo el día del lanzamiento**.
Como el contenido y el catálogo se conservan, el orden correcto es: catálogo y páginas
primero, diseño después, upgrade último.

⚠️ Hay un **borrador de Morelia editado el 2 jul** que no es mío. Antes de crear el borrador
de Ipanema conviene confirmar que no tenga trabajo que a alguien le importe.

---

## Lo que sigue sin poder verificarse

- Si la **importación por CSV** está habilitada en Inicial. La pantalla de Productos muestra
  un botón *"Importar"*, pero la documentación dice que la carga masiva es solo de planes
  pagos. Con 6 SKUs da igual: se cargan por MCP.
- El alcance real del MCP sobre **páginas de contenido** — la doc menciona productos,
  pedidos, clientes y cupones, pero no páginas. Se confirma al autorizarlo.
