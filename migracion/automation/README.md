# Automatización del admin

Scripts de Playwright para lo que **no** cubre el MCP ni la API: páginas de contenido,
editor de diseño, configuración.

---

## 🔐 Credenciales — leer esto antes de tocar nada

**Este repo es público.** Ninguna credencial puede entrar acá, nunca.

Los scripts leen usuario y contraseña de un archivo **fuera del repo**:

```bash
# formato: una línea, "email / password"
echo 'tu@email.com / tu-password' > ~/.tiendanube-creds
chmod 600 ~/.tiendanube-creds
```

Se busca en este orden: `$TN_CREDS` → `~/.tiendanube-creds` → `/tmp/tiendanube`.

**No uses `/tmp`.** Se limpia al reiniciar la máquina y ya dejó el proyecto sin credenciales
una vez, a mitad de trabajo.

Si alguna vez una credencial termina commiteada: **rotarla**, no basta con borrar el commit.
El repo es público y el historial queda.

---

## Requisitos

- Node 22+
- `@playwright/test`
- Chromium del sistema (`/usr/bin/chromium`)

Playwright **no distribuye binarios de Chromium para linux-arm64**, así que `tn-auth.mjs`
apunta al Chromium del sistema con `executablePath`. En x86 se puede usar el que baja
`playwright install chromium` y sacar esa línea.

```bash
cd migracion/automation
npm install
node explorar.mjs /tmp/tn-estado
```

`NODE_PATH` **no sirve acá**: no aplica a imports ESM. Hace falta un `node_modules` que
Node encuentre subiendo desde el archivo — o sea, `npm install` en esta carpeta, o un
symlink a un `node_modules` que ya tenga `@playwright/test`.

---

## Scripts

| Script | Qué hace |
|---|---|
| `tn-auth.mjs` | Helper de login. Exporta `login()` y `visitar()` |
| `explorar.mjs` | Releva el estado del admin y saca capturas de cada pantalla |

---

## Detalles del login que costaron sangre

Tres cosas rompen el login si no se manejan, y no son obvias:

1. **El form de e-mail está oculto detrás de un botón.** `#user-mail` y `#pass` existen en
   el DOM desde el arranque pero con `visible: false`. Hay que clickear *"Ingresar con
   e-mail"* primero. Según si el navegador recuerda una cuenta, puede aparecer
   *"Continuar con otra cuenta"* en su lugar.

2. **El redirect al login ocurre después del `load`.** Si se chequea `page.url()` apenas
   termina el `goto`, todavía dice `/admin/` y parece que hay sesión. Hay que esperar a que
   se asiente antes de decidir si hace falta loguearse.

3. **La cookie de sesión se fija en una cadena de redirects** (`auth/new-admin` → dashboard).
   Si el script sigue antes de que termine, cada navegación posterior rebota al login. Por
   eso `login()` verifica pidiendo el dashboard antes de devolver la página.

Hay un campo `g-recaptcha-response` en el form. En las corridas hechas nunca disparó
desafío, pero si algún día el login empieza a fallar sin motivo, mirar por ahí.

---

## Qué NO hacer

**No automatizar el login con Google SSO.** Google detecta el navegador controlado, muestra
*"este navegador puede no ser seguro"* y ante insistencia puede bloquear la cuenta. Por eso
la cuenta de Tiendanube tiene contraseña propia: Google queda afuera del flujo.
