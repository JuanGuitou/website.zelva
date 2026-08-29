# Mantenimiento de la tienda

> ⏳ **Pendiente.** Este documento se completa en la Fase 5, con capturas de la tienda ya
> armada. No tiene sentido escribirlo antes: las capturas serían de una tienda que no existe.

El objetivo de todo el proyecto es que este archivo alcance para mantener la tienda sin
ayuda técnica. Va a cubrir, paso a paso y con capturas:

- Cambiar el precio de un producto
- Cargar un producto nuevo
- Actualizar stock
- Editar las secciones del home (mover, agregar, sacar)
- Agregar o editar una pregunta frecuente
- Ver, preparar y despachar un pedido
- Cambiar el porcentaje de descuento por transferencia
- Subir o reemplazar fotos de producto
- Editar una página de contenido (Nosotros, Empresas, etc.)
- Ver las respuestas de los formularios de Empresas y Sumá tu marca
- Qué **no** tocar y por qué
- A quién escribir si algo se rompe (soporte de Tiendanube según el plan contratado)

## Regla general

Todo lo de esta lista se hace **desde el admin de Tiendanube, sin tocar código**. Esa fue la
razón de elegir el camino Ipanema sin FTP: si en algún momento se abre el acceso al código
fuente, la tienda deja de recibir actualizaciones automáticas y el mantenimiento pasa a
depender de un desarrollador. Ver `../PLAN-MIGRACION-TIENDANUBE.md` §1.
