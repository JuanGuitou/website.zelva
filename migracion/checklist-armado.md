# Checklist de armado de la tienda

Pasos concretos, en orden, para cuando haya acceso al admin (`BLOCKERS.md` §1).
Todo esto es configuración: no requiere código ni plan Impulso.

---

## A · Base

- [ ] Crear la tienda / obtener acceso de colaborador
- [ ] Instalar el theme **Ipanema**
- [ ] Datos del negocio: nombre, razón social, CUIT, domicilio *(depende de §4)*
- [ ] Moneda ARS, país Argentina, idioma español
- [ ] Subir `assets/logo-verde.png` como logo y `assets/logo-crema.png` para el footer

## B · Catálogo

- [ ] Crear categorías: **Gin**, **Ron**, **Espumante**, **Kits y regalos**
      *(y NADA más — ver `BLOCKERS.md` §8)*
- [ ] Crear categorías secundarias para las ocasiones: Para regalar · Para tu bar en casa ·
      Para eventos · Sin azúcar
- [ ] Cargar los 6 productos desde `catalogo.csv`
      *(a mano si el plan es Inicial; por importación si es pago)*
- [ ] Kit Regalo: verificar que quedó con la **variante Botella** (Gin / Ron / Espumante)
- [ ] Subir imágenes: `producto-*.jpg` como principal, `ambiente-*.jpg` como secundaria
- [ ] Cargar stock real *(depende de §7)*
- [ ] Verificar peso y dimensiones *(depende de §6 — de esto sale el costo de envío)*

## C · Pagos

- [ ] Activar **Pago Nube** (tarjetas)
- [ ] Configurar **hasta 3 cuotas sin interés** *(depende de §3)*
- [ ] Crear medio de pago personalizado **"Transferencia bancaria"** con el descuento
      definido en §3 (11,11% si se mantiene la relación 45.000 → 40.000)
- [ ] Activar *"Mostrar el precio con mayor descuento en los listados, el detalle de producto
      y el carrito"* — es lo que replica el doble precio del prototipo
- [ ] Definir si el descuento se acumula con envío gratis y cupones

## D · Envíos

- [ ] Activar transportistas *(depende de §6)*
- [ ] Configurar regla de envío gratis, si la hay
- [ ] Probar el cálculo con un CP de CABA y uno del interior

## E · Home

Seguir el mapeo sección por sección de `contenido/home.md`:

- [ ] Barra de anuncios
- [ ] Banner hero
- [ ] Sección de beneficios "Por qué sin alcohol" (3 columnas)
- [ ] Productos destacados — botellas
- [ ] Productos destacados — kits
- [ ] Banner de la marca ISH *(datos a validar, §8)*
- [ ] Dos banners B2B → Empresas y Sumá tu marca
- [ ] Sección FAQ *(sin la pregunta del embarazo hasta resolver §8)*
- [ ] Sección newsletter
- [ ] Footer: columnas, medios de pago, Data Fiscal, leyenda legal

## F · Páginas de contenido

- [ ] Nosotros — `contenido/nosotros.md`
- [ ] Empresas — `contenido/empresas.md` + Google Form embebido
- [ ] Sumá tu marca — `contenido/sumate.md` + Google Form embebido
- [ ] Contacto — `contenido/contacto.md` *(usar la página nativa)*
- [ ] Términos y condiciones *(depende de §4)*
- [ ] Cambios y devoluciones *(depende de §4)*
- [ ] Política de privacidad *(depende de §4)*

## G · Marca (Fase 3, CSS custom)

Referencia completa en `identidad-visual.md`:

- [ ] Colores en el editor de diseño
- [ ] Newsreader + Archivo desde Google Fonts
- [ ] Botones pill uppercase
- [ ] Títulos en Newsreader peso 500
- [ ] Volantas uppercase con letter-spacing
- [ ] WhatsApp flotante con pulso *(app del App Store o CSS/JS)*
- [ ] **Checkpoint:** capturas lado a lado contra el prototipo → decidir si hace falta
      Impulso o alcanza con esto

## H · Pre-lanzamiento

- [ ] Data Fiscal AFIP en el footer
- [ ] Botón de arrepentimiento activado
- [ ] Conectar el dominio
- [ ] SEO de las 6 SKUs y de cada página *(los títulos y descripciones ya están en el CSV
      y en los `.md`)*
- [ ] **Pedido de prueba end-to-end**: comprar, pagar de verdad, verificar los mails
      automáticos, y después cancelar y verificar el reembolso
- [ ] Revisión en mobile
- [ ] Revisar que no quedó ningún dato placeholder (§2)

## I · Handoff

- [ ] Completar `MANTENIMIENTO.md` con capturas de la tienda ya armada
- [ ] Pasada en vivo con quien vaya a mantenerla
