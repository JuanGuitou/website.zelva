# Home — copy y mapeo a secciones de Ipanema

Copy extraído literal del prototipo (`index.html`, rama `main`). Cada bloque indica con qué
sección nativa de Ipanema se arma.

---

## 1. Barra de anuncios

> Envíos a todo el país · Hasta 3 cuotas sin interés · Precio especial pagando por transferencia

**Ipanema:** barra de anuncios (nativa). Fondo `#1E2A1E`, texto `#F5E7C6`.

---

## 2. Hero

**Volanta:** Bebidas espirituosas sin alcohol · Premium
**Título:** Otra forma de brindar, la misma forma de disfrutar.
**Botón primario:** Ver botellas → catálogo
**Botón secundario:** Soy empresa → página Empresas

**Ipanema:** banner principal. El título va en Newsreader, peso 500.

---

## 3. Por qué sin alcohol

**Título:** Por qué sin alcohol
**Bajada:** No se trata de lo que dejás afuera, sino de todo lo que seguís teniendo.

| Columna | Título | Texto |
|---|---|---|
| 1 | El ritual completo | La copa, el hielo, el garnish, el primer sorbo. Todo el sabor y la ceremonia, intactos. |
| 2 | Rendí al día siguiente | Brindá hoy y despertá entero mañana. Tu semana sigue su curso, sin peajes. |
| 3 | Seguí en la mesa | Elegir sin alcohol ya no es quedarse afuera del brindis. Es estar, y disfrutarlo. |

**Ipanema:** sección de beneficios / iconos, 3 columnas.

---

## 4. Nuestras botellas

**Título:** Nuestras botellas
**Link:** Ver todas → catálogo

**Ipanema:** productos destacados. Las 3 botellas.

---

## 5. Kits y packs

**Volanta:** Regalá y equipá tu barra
**Título:** Kits y packs

**Ipanema:** segunda instancia de productos destacados, filtrada por la categoría
"Kits y regalos".

---

## 6. La marca ISH

**Volanta:** La marca · Copenhague, Dinamarca
**Título:** ISH: destilados sin alcohol, con premios de verdad.

> Nacida en Copenhague, ISH elabora espirituosas sin alcohol que compiten de igual a igual
> con las originales. Su proceso —maceración de botánicos, destilación y balanceo de
> acidez— captura el cuerpo y la complejidad de un gin, un ron o un espumante, sin una gota
> de alcohol.

> Reconocida en competencias internacionales de espirituosas, ISH es la primera marca que
> ZELVA trae a la Argentina.

**Datos destacados:**

| Dato | Texto |
|---|---|
| 2018 | Fundada en Copenhague, pionera de la categoría. |
| 0,0% | De alcohol en cada botella. |
| +15 | Premios en concursos internacionales. |

⚠️ Los tres datos son afirmaciones verificables sin fuente. Ver `BLOCKERS.md` §8.

**Ipanema:** banner de imagen + texto.

---

## 7. Recetario

**FUERA DEL MVP.** Ver `contenido/recetario-v2.md`.

---

## 8. Bloques B2B

| Bloque | Título | Texto | Botón |
|---|---|---|---|
| 1 | ¿Tenés un bar, restaurante o hacés eventos? | Sumá bebidas sin alcohol premium a tu carta. Precios por volumen, entrega consolidada y capacitación para tu barra. | Escribinos → Empresas |
| 2 | ¿Tenés una marca sin alcohol? | *(ver `sumate.md`)* | Contactanos → Sumá tu marca |

**Ipanema:** dos banners que linkean a las páginas de contenido.

---

## 9. Preguntas frecuentes

**Título:** Preguntas frecuentes

**Ipanema:** sección FAQ (nativa, acordeón). Contenido en `contenido/faqs.md`.

---

## 10. Newsletter

**Título:** Sumate al mundo ZELVA
**Placeholder del campo:** Tu email
**Botón:** Suscribirme

**Ipanema:** sección newsletter (nativa).

---

## 11. Footer

**Bajada de marca:**
> Bebidas espirituosas sin alcohol premium. Otra forma de brindar, la misma forma de disfrutar.

**Columnas:**

| Tienda | Marca | Empresas | Contacto |
|---|---|---|---|
| Botellas | Nosotros | Bares y eventos | ⚠️ email |
| Recetario *(v2)* | Contacto | Sumá tu marca | ⚠️ WhatsApp |
| Carrito | | | ⚠️ Instagram |

**Medios de pago mostrados:** Visa · Mastercard · Amex · Transferencia · Mercado Pago

**Legal:**
- ⚠️ Data Fiscal AFIP — hoy es un `href="#"` vacío. Ver `BLOCKERS.md` §4.
- © 2026 ZELVA
- Leyenda: *Beber con moderación. Productos sin alcohol (0,0%). Prohibida su venta a menores de 18 años.*

---

## 12. WhatsApp flotante

Botón circular fijo abajo a la derecha, verde `#1E2A1E`, con animación de pulso.

**Ipanema:** app gratuita del App Store de Tiendanube, o CSS/JS custom en la Fase 3.
⚠️ El número es placeholder. Ver `BLOCKERS.md` §2.
