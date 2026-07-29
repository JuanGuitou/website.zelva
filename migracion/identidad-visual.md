# Identidad visual — tokens del prototipo

Extraído de `index.html` (rama `main`). Es la referencia para la Fase 3 (CSS custom
sobre Ipanema).

---

## Paleta

| Token | Hex | Uso en el prototipo |
|---|---|---|
| Crema | `#F5E7C6` | Fondo general del sitio |
| Crema oscuro | `#EFE0B8` | Tarjetas sobre el fondo crema (resumen de pedido) |
| Verde oscuro | `#1E2A1E` | Texto principal, botones, footer, barra de anuncios |
| Verde medio | `#3E5B40` | Volantas, links |

**Acentos por categoría** (color + tinte de fondo de la tarjeta):

| Categoría | Acento | Tinte |
|---|---|---|
| Gin | `#5B7141` | `#DCE3CE` |
| Ron | `#A9631F` | `#EBD9C2` |
| Espumante | `#6E9A6B` | `#D8E4D3` |

**Transparencias usadas:** `rgba(30,42,30,0.12)` bordes · `rgba(30,42,30,0.25)` bordes de
input · `rgba(30,42,30,0.4)` placeholders · `rgba(245,231,198,0.94)` nav sticky con blur.

---

## Tipografía

Ambas de Google Fonts, ya cargadas en el prototipo:

| Familia | Uso | Pesos |
|---|---|---|
| **Newsreader** (serif) | Todos los títulos `h1`–`h3` | 400, 500, 600, 700 + itálicas 400, 500 |
| **Archivo** (sans) | Texto, botones, navegación | 400, 500, 600, 700 |

```
https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,500&family=Archivo:wght@400;500;600;700&display=swap
```

**Los títulos siempre van en Newsreader peso 500**, nunca bold. Es lo que le da el tono
editorial al sitio. Tamaños fluidos con `clamp()`:

| Elemento | clamp |
|---|---|
| H1 hero | `clamp(36px, 5.2vw, 62px)` — `line-height: 1.06` |
| H1 de página | `clamp(32px, 4.5vw, 52px)` |
| H2 de sección | `clamp(28px, 3.6vw, 44px)` |
| H3 de tarjeta | `22px` |

---

## Componentes

**Botones** — la firma visual más reconocible:

```css
border-radius: 999px;              /* pill, siempre */
padding: 15px 32px;                /* 13px 24px en tarjetas */
text-transform: uppercase;
font-size: 13px;                   /* 12px en tarjetas */
letter-spacing: 0.08em;
font-weight: 600;
font-family: 'Archivo', sans-serif;
```

- Primario: fondo `#1E2A1E`, texto `#F5E7C6`, sin borde.
- Secundario: fondo transparente, texto `#1E2A1E`, borde `1.5px solid #1E2A1E`.

**Volantas** (los textitos arriba de los títulos): uppercase, `12px`,
`letter-spacing: 0.14em`–`0.16em`, color `#3E5B40`, opacidad reducida.

**Tarjetas:** `border-radius: 16px`.

**Badge del carrito:** círculo `border-radius: 999px`, mínimo `19px`, fondo `#1E2A1E`.

---

## Detalles a replicar en Fase 3

- `html { scroll-behavior: smooth; }`
- `::selection { background:#1E2A1E; color:#F5E7C6; }`
- Nav sticky con `backdrop-filter: blur(10px)`.
- Carruseles sin scrollbar visible (`.zscroll`).
- **Pulso del botón de WhatsApp:**

```css
@keyframes zpulse {
  0%   { box-shadow: 0 0 0 0    rgba(30,42,30,0.35); }
  70%  { box-shadow: 0 0 0 14px rgba(30,42,30,0); }
  100% { box-shadow: 0 0 0 0    rgba(30,42,30,0); }
}
/* animation: zpulse 2.6s infinite; */
```

- El link activo del nav se marca subiendo el peso de 500 a 700 (no con color).
