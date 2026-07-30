# Handoff

Para un agente que arranca en frío. Escrito el **2026-07-30**.

Leé esto entero antes de tocar nada. Está ordenado para que puedas empezar a trabajar
en 5 minutos sin re-investigar lo que ya se investigó.

---

## 1. Contexto en 30 segundos

ZELVA vende bebidas espirituosas **sin alcohol** (marca ISH, importada de Copenhague).
Existe un **prototipo de diseño** en la rama `main` de este repo, hecho con un runtime
interno (`dc-runtime`): tiene carrito y checkout **simulados**, formularios que no envían
nada, y cero backend. **No es un sitio funcional.**

El trabajo es **rearmar eso como tienda real en Tiendanube**. No se porta código: se carga
contenido y se reconstruye el sistema visual con las herramientas de la plataforma.

El objetivo de fondo, que ordena todas las decisiones: **quien va a mantener la tienda no es
técnico.** Por eso se evita todo lo que ate el sitio a un desarrollador.

---

## 2. Dónde está todo

| | |
|---|---|
| **Repo** | `JuanGuitou/website.zelva` — **público** |
| **Rama** | `migracion-tiendanube` |
| **Permisos** | push sí, admin **no** (cuenta `sebasfavaron`) |
| **Tienda** | `tiendadejuanguitou.mitiendanube.com` (nombre visible: **Zelva**) |

```
PLAN-MIGRACION-TIENDANUBE.md   Plan completo: fases, estrategia, restricciones verificadas
migracion/
  HANDOFF.md                   Este archivo
  BLOCKERS.md                  Lo que falta definir y frena el lanzamiento ← lo más importante
  ESTADO-TIENDA.md             Estado real del admin + 3 correcciones al plan
  checklist-armado.md          Paso a paso en el admin, en orden
  catalogo.csv                 Los 6 SKUs — fuente de verdad del catálogo
  identidad-visual.md          Paleta, tipografías, componentes
  contenido/                   Copy de cada página, listo para pegar
  assets/                      Imágenes ya normalizadas a 1600x1600
  automation/                  Playwright para el admin
  build_catalogo.py            Regenera catalogo.csv
  build_assets.py              Regenera assets/
```

---

## 3. Cómo se opera la tienda

Tres vías. **Elegí la de más arriba que sirva** para lo que estés haciendo:

### a) Admin MCP oficial ← preferido

`https://admin-mcp.tiendanube.com`, ya configurado en Claude Code (scope user) y
**autorizado**. Cubre **productos, variantes, categorías, stock, precios, pedidos, clientes,
cupones**.

⚠️ Las herramientas MCP se cargan **al iniciar la sesión**. Si autorizaste el MCP a mitad de
una sesión, no van a aparecer hasta reiniciar. Verificá con
`~/.local/bin/claude mcp list` (el binario **no está en el PATH** del sandbox).

### b) Playwright — `migracion/automation/`

Para lo que el MCP no cubre: **páginas de contenido y editor de diseño**.

```bash
cd migracion/automation
npm install          # o symlink a un node_modules con @playwright/test
node explorar.mjs /tmp/tn-estado
```

`tn-auth.mjs` exporta `login()` y `visitar()`. Ya funciona; no lo reescribas sin leer la
sección de trampas del README de esa carpeta.

### c) A mano, por el usuario

**Pagos, envíos y cambio de plan.** Son one-time y tocan plata: automatizarlos es más riesgo
que beneficio. Redactá instrucciones paso a paso, no las ejecutes.

### Credenciales

En **`/tmp/tiendanube`**, formato `email / password`, permisos 600. Los scripts lo leen de
ahí; `TN_CREDS` sobreescribe la ruta.

🚨 **El repo es público. Ninguna credencial puede entrar, nunca.** Antes de cada commit:

```bash
PW=$(cut -d'/' -f2 /tmp/tiendanube | tr -d ' ')
grep -rF "$PW" . --exclude-dir=.git && echo "NO COMMITEAR" || echo OK
```

Si alguna se filtra: **rotarla**. Borrar el commit no alcanza, el historial queda.

⚠️ `/tmp` se limpia al reiniciar la máquina. Si el archivo no está, pedíselo al usuario —
**no intentes recuperarlo ni buscarlo en otro lado**.

---

## 4. Estado: qué está hecho y qué no

| Fase | Estado |
|---|---|
| 1 · Extracción de contenido y assets | ✅ Completa |
| 2 · Armado de la tienda | 🔜 **Acá arrancás** |
| 3 · Capa de marca (diseño) | ⛔ Después de la 2 |
| 4 · Pre-lanzamiento | ⛔ Bloqueada por legales (`BLOCKERS.md` §4) |
| 5 · Handoff al mantenedor | ⛔ Última |
| v2 · Recetario | 📋 Contenido extraído, fuera del MVP |

🚨 **La tienda YA NO está en cero.** Al 2026-07-30 hay **4 productos cargados** por alguien
del lado de Juan, con datos que **no coinciden** con `catalogo.csv`. Antes de crear nada,
leé la sección 5. Plan Inicial, 0 categorías, theme **Morelia**.

---

## 5. Tu próxima tarea

✅ **La reconciliación de catálogo ya se hizo el 2026-07-30.** Estado completo y
actualizado en **`CATALOGO.md`** — leelo, reemplaza a `catalogo.csv`, que quedó obsoleto.

Lo que queda: **kits** (falta decisión de precio), **stock**, **peso/dimensiones**,
**imagen del Rosé**, y todo lo de diseño/páginas (bloqueado, ver abajo).

### Contexto de cómo se llegó acá

🚨 **No corras una carga masiva.** Crearías duplicados.

Entre el 29 y el 30 de julio alguien del lado de Juan cargó 4 productos con datos reales
(precios y copy oficial de ISH). Eso convierte a `catalogo.csv` en **desactualizado**:
fue extraído del prototipo, que era una maqueta con precios placeholder.

### Qué hay en la tienda hoy

| Producto | Precio | ¿Está en catalogo.csv? |
|---|---|---|
| ISH London Botanical | $49.000 | Sí, pero a $45.000 |
| Caribbean Spiced Spirit | $49.000 | Sí, como "ISH Caribbean Spiced" |
| ISH Sparkling White | $49.000 | Sí, pero a $45.000 |
| **ISH Sparkling Rosé** | $49.000 | **No. No existe en el prototipo** |

Ninguno tiene categoría, imágenes ni variantes. **No hay kits.**

### Diferencias a resolver con el usuario

1. **Precio real: $49.000, no $45.000.** Cambia el descuento por transferencia
   (`BLOCKERS.md` §3) y todos los precios de los kits. **Preguntar antes de tocar.**
2. **Sparkling Rosé es un producto nuevo.** No hay copy, ni foto, ni recetas para él en
   `migracion/contenido/`. Hay que pedírselos.
3. **Naming inconsistente:** tres empiezan con "ISH", el ron es "Caribbean Spiced Spirit".
4. **Las descripciones cargadas son las oficiales de ISH**, no las que se extrajeron del
   prototipo. Las de la tienda son mejores: son de la marca. Descartar las del CSV.
5. **`promotional_price` en 0,00** en Sparkling White, ausente en otros. Revisar que no
   rompa nada.

### Qué sí podés hacer sin esperar

- **Crear las categorías** (no hay ninguna): **Gin**, **Ron**, **Espumante**,
  **Kits y regalos**. **Nada más.** El prototipo listaba 12 con "· pronto"
  (Tequila, Whisky, Vermut…) — era un recurso de diseño. Una categoría vacía en
  Tiendanube se ve como una categoría vacía.
  ⚠️ Ojo: con el Rosé, "Espumante" pasa a tener 2 productos.
- **Categorías secundarias** para las ocasiones: Para regalar · Para tu bar en casa ·
  Para eventos · Sin azúcar.
- **Asignar los 4 productos existentes** a sus categorías.
- **Subir imágenes** desde `migracion/assets/`: `producto-*.jpg` como principal,
  `ambiente-*.jpg` como secundaria. ⚠️ **No hay imagen para el Rosé.**

### Los kits siguen pendientes

Los 3 kits (Gin Tonic, Bar en Casa, Regalo) no están cargados. Sus precios en el CSV
salen del prototipo y asumen botellas a $45.000 — **recalcularlos con el usuario antes**.
El **Kit Regalo lleva variante** `Botella` (Gin / Ron / Espumante), y ahora habría que
decidir si el Rosé entra como cuarta opción.

**Dejá vacíos a propósito, y decilo al reportar:**

- **Stock** (`BLOCKERS.md` §7). En Tiendanube vacío = **stock infinito**: la tienda vendería
  lo que no tiene.
- **Peso y dimensiones.** El CSV trae estimaciones (botella 700ml ≈ 1,3 kg) **sin verificar**.
  De ahí sale el costo de envío que paga el cliente: un número inventado hace perder plata en
  cada venta. Ver §6.

Después del catálogo, seguí por `checklist-armado.md`.

---

## 6. Decisiones ya tomadas — no las reabras

El usuario ya las resolvió. Re-preguntar es hacerle perder el tiempo.

| Decisión | Resuelto |
|---|---|
| **Theme** | Ipanema **sin FTP**, empujado con CSS. Evaluar el plan Impulso ($78.999/mes) **solo después** de medir el gap con capturas lado a lado — nunca antes |
| **Recetario** | **Fuera del MVP.** En v2, una sola página con las 8 recetas |
| **Repo** | Rama en el repo de Juan, no uno nuevo |
| **Login** | Contraseña propia en Tiendanube, **no** Google SSO |
| **Orden** | Catálogo y páginas → diseño en borrador → upgrade a Esencial el día del lanzamiento |

**Por qué ese orden:** en plan Inicial se puede armar cualquier theme **en modo borrador
gratis**; solo *publicar* requiere plan pago. Y productos, clientes, ventas y páginas
**se conservan** al cambiar de plantilla. O sea: no hay que pagar nada todavía.

---

## 7. Trampas conocidas

**Login del admin** — tres cosas lo rompen, las tres ya resueltas en `tn-auth.mjs`:
1. El form de e-mail está **oculto detrás de un botón**. `#user-mail` y `#pass` existen en el
   DOM pero invisibles. Hay que clickear *"Ingresar con e-mail"* (a veces
   *"Continuar con otra cuenta"*).
2. El redirect al login ocurre **después del `load`**. Si chequeás `page.url()` apenas
   termina el `goto`, todavía dice `/admin/` y parece que hay sesión.
3. La cookie se fija en una **cadena de redirects**. Si el script sigue antes de que termine,
   cada navegación posterior rebota al login.

**Playwright en ARM64:** no hay binarios de Chromium para linux-arm64. `tn-auth.mjs` apunta a
`/usr/bin/chromium` con `executablePath`.

**`NODE_PATH` no sirve** para imports ESM. Hace falta un `node_modules` real que Node
encuentre subiendo desde el archivo.

**`.gitignore` con `node_modules/`** (barra final) **no matchea un symlink**. Sin barra sí.

**Assets:** los `prod-*.png` de `main` son fotos **lifestyle**, no packshots; los `ish-*.png`
son los packshots. Los nombres engañan. Ya está resuelto en `build_assets.py` — cada tipo
tiene su tratamiento.

---

## 8. Qué NO hacer

- ❌ **No automatizar el login de Google.** Detecta el navegador controlado y puede bloquear
  la cuenta personal del usuario. Para eso existe la contraseña propia.
- ❌ **No commitear credenciales.** El repo es público.
- ❌ **No abrir el FTP / pasar a Impulso** sin evidencia. Corta las actualizaciones
  automáticas de Tiendanube y ata la tienda a un desarrollador para siempre — lo contrario
  del objetivo del proyecto.
- ❌ **No inventar los datos que faltan.** Especialmente la **FAQ del embarazo** (tiene
  implicancias de salud), los **premios de ISH** y el **peso de los productos**. Si falta,
  se pregunta o se deja vacío y se reporta.
- ❌ **No crear las categorías "· pronto".**
- ❌ **No tocar `main`.** El prototipo queda intacto como referencia visual.
- ⚠️ Hay un **borrador de Morelia editado el 2 jul** que no es nuestro. Confirmá con el
  usuario antes de pisarlo.

---

## 9. Blockers abiertos

Detalle completo con opciones y recomendación en **`BLOCKERS.md`**. Resumen:

| § | Blocker | Frena |
|---|---|---|
| 2 | Datos de contacto (WhatsApp, email, Instagram, dominio) son **todos placeholder** | Footer, contacto, lanzamiento |
| 3 | El **descuento por transferencia es global** y también afecta a los kits. Hay que elegir entre 3 opciones | Configuración de pagos |
| 4 | **Legales/fiscales**: CUIT, Data Fiscal, botón de arrepentimiento, términos | 🚫 **Sin esto no se puede vender** |
| 5 | **Fotografía**: los 3 packshots tienen fondos distintos entre sí y baja resolución. No hay fotos de los kits | Calidad visual |
| 6 | **Envíos**: transportistas, peso y dimensiones reales | Costo de envío |
| 7 | **Stock** inicial | Vender sin tener |
| 8 | Contenido a validar: FAQ embarazo, premios de ISH, "primer marketplace argentino" | Publicación |
| 9 | Formularios de Empresas y Sumá tu marca (Google Forms embebido) | Esas 2 páginas |

**Además, sin resolver:** el **blog nativo** de Tiendanube falla siempre
(*"Se produjo un error en la aplicación"*, 4 intentos en 2 días). No se pudo distinguir si es
límite del plan Inicial o un bug. Va a soporte. Si funcionara, se podría reabrir la decisión
del recetario para la v2.

---

## 10. Cómo trabaja este usuario

- Escribe en **español**, respondele en español.
- Quiere **avance real y blockers documentados**, no pedidos de permiso a cada paso.
- Valora que le digas **cuándo te equivocaste** y qué cambió. Este proyecto ya lleva tres
  correcciones a supuestos del plan; están registradas en `ESTADO-TIENDA.md` y así hay que
  seguir.
- Autorizó explícitamente pushear a `JuanGuitou/website.zelva`.
