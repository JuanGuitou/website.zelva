# Estado real de la tienda

Relevado el **2026-07-29** entrando al admin (`migracion/automation/explorar.mjs`).
Esto es observación directa, no supuestos.

**Tienda:** `tiendadejuanguitou.mitiendanube.com`

---

## Qué hay hoy

| | Estado |
|---|---|
| **Plan** | **Inicial (gratis)** — el admin muestra *"Recursos limitados · Subí de plan y explorá todas las funcionalidades por 7 días gratis"* |
| **Productos** | **0** — pantalla vacía, *"Subí tus productos"* |
| **Categorías** | Ninguna |
| **Theme actual** | **Morelia**, no Ipanema |
| **Theme borrador** | Otro Morelia, última edición 2 jul |
| **Ipanema** | **Disponible** — el panel de Diseño ofrece *"Probar Ipanema"* |
| **Logo** | Sin subir |

La tienda está **en cero**. No hay nada que preservar ni que migrar por encima: se arma
desde el principio.

---

## Correcciones a lo que decía el plan

Tres cosas que había investigado en docs y que la realidad del admin desmiente o matiza:

### 1. Tiendanube SÍ tiene blog nativo

El plan decía que no, basándome en documentación. **Es incorrecto**: el menú lateral tiene
`Tienda online > Blog`.

⚠️ **Pero no pude verificar que funcione.** La pantalla devolvió *"Se produjo un error en la
aplicación · No se pudo cargar la aplicación en este momento"* en dos intentos separados. No
sé si es un problema transitorio de Tiendanube o si está limitado por el plan Inicial.

**Impacto:** si el blog funciona, la decisión sobre el recetario se puede reabrir — 8 posts
con categorías reales rankean bastante mejor que una sola página con anclas. Sigue estando
fuera del MVP, pero la v2 tendría una opción mejor. Ver `contenido/recetario-v2.md`.

### 2. El MCP oficial reemplaza el setup de partner app

Tiendanube tiene un **Admin MCP oficial** en `https://admin-mcp.tiendanube.com`, que se
conecta por OAuth y **no requiere ser partner ni crear una app**. Cubre productos, pedidos,
clientes, cupones y stock.

Eso deja obsoleto el plan de registrarse como partner, crear una app y hacer el baile de
OAuth a mano. Ya está configurado en Claude Code; falta autorizarlo.

### 3. "Códigos externos" no sirve para la capa de marca

Esperaba poder inyectar CSS/JS por ahí sin FTP. **No se puede**: la sección
`Configuración > Códigos externos` solo acepta pixel de Facebook, metaetiquetas de Google y
Bing, encuestas, códigos de conversión y **Data Fiscal de AFIP**.

**Lo bueno:** ya sé exactamente dónde va el Data Fiscal del blocker §4 — es un campo
dedicado, no hay que tocar el theme.

**Lo malo:** la Fase 3 (capa de marca) depende del editor de diseño de Ipanema y, si hace
falta más, del recurso `Scripts` de la API vía MCP. No hay un cajón de CSS libre.

---

## Lo que sigue sin poder verificarse

- Si el **blog** funciona en plan Inicial.
- Si la **importación por CSV** está habilitada en Inicial. La pantalla de Productos muestra
  un botón *"Importar"*, pero la documentación dice que la carga masiva es solo de planes
  pagos. Con 6 SKUs da igual: se cargan por MCP.
- El alcance real del MCP sobre **páginas de contenido** — la doc menciona productos,
  pedidos, clientes y cupones, pero no páginas. Se confirma al autorizarlo.
