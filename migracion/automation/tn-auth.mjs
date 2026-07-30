// Helper de login al admin de Tiendanube.
// Credenciales SIEMPRE desde archivo externo — nunca hardcodeadas ni en el repo.
import { chromium } from '@playwright/test';
import fs from 'node:fs';

export const STORE = process.env.TN_STORE || 'tiendadejuanguitou.mitiendanube.com';

// Ubicaciones por orden de preferencia. ~/.tiendanube-creds primero: /tmp se
// limpia al reiniciar la máquina y ya nos dejó sin credenciales una vez.
const RUTAS_CREDS = [
  process.env.TN_CREDS,
  `${process.env.HOME}/.tiendanube-creds`,
  '/tmp/tiendanube',
].filter(Boolean);

export function leerCreds(path = null) {
  const candidatas = path ? [path] : RUTAS_CREDS;
  const encontrada = candidatas.find(p => { try { return fs.statSync(p).isFile(); } catch { return false; } });
  if (!encontrada) {
    throw new Error(
      `no encontré credenciales. Probé: ${candidatas.join(', ')}\n` +
      `Creá el archivo con:  echo 'email / password' > ~/.tiendanube-creds && chmod 600 ~/.tiendanube-creds`
    );
  }
  const [email, password] = fs.readFileSync(encontrada, 'utf8').trim().split('/').map(s => s.trim());
  if (!email || !password) throw new Error(`credenciales ilegibles en ${encontrada}`);
  return { email, password };
}

export async function login({ headless = true, creds = leerCreds() } = {}) {
  const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', headless });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, locale: 'es-AR' });

  await page.goto(`https://${STORE}/admin/`, { waitUntil: 'domcontentloaded', timeout: 90000 });

  // El redirect al login ocurre DESPUÉS del load, así que hay que dejar que se
  // asiente antes de decidir si hay sesión. Sin esto la URL todavía dice
  // /admin/ y el chequeo de abajo cree que ya estamos adentro.
  await page.waitForURL(/\/login|\/admin\/dashboard/, { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(3000);

  if (!/\/login/.test(page.url())) return { browser, page };

  // El form de e-mail está oculto detrás de un botón. Según si el navegador
  // recuerda una cuenta, el botón es "Ingresar con e-mail" o hay que pasar
  // antes por "Continuar con otra cuenta".
  const campo = page.locator('#user-mail');
  for (const nombre of [/ingresar con e-?mail/i, /continuar con otra cuenta/i, /ingresar con e-?mail/i]) {
    if (await campo.isVisible().catch(() => false)) break;
    const b = page.getByRole('button', { name: nombre });
    if (await b.isVisible().catch(() => false)) {
      await b.click().catch(() => {});
      await page.waitForTimeout(2000);
    }
  }

  await campo.waitFor({ state: 'visible', timeout: 30000 });
  await campo.fill(creds.email);
  await page.locator('#pass').fill(creds.password);
  await page.getByRole('button', { name: /^ingresar$/i }).click();

  // Tras el submit hay una cadena de redirects (auth/new-admin → dashboard) que
  // es la que fija la cookie de sesión. Si se corta antes, las navegaciones
  // siguientes rebotan de vuelta al login.
  await page.waitForURL(/\/admin\/(dashboard|$)/, { timeout: 90000 }).catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 90000 }).catch(() => {});
  await page.waitForTimeout(6000);

  if (/\/login/.test(page.url())) {
    await page.screenshot({ path: '/tmp/tn-login-fallo.png' }).catch(() => {});
    throw new Error('login falló — ver /tmp/tn-login-fallo.png');
  }

  // Verificación real: pedir el dashboard y confirmar que no rebota.
  await page.goto(`https://${STORE}/admin/dashboard`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);
  if (/\/login/.test(page.url())) throw new Error('sesión no persistió tras el login');

  return { browser, page };
}

/** Va a una ruta del admin y devuelve el texto visible. */
export async function visitar(page, ruta, { shot = null, espera = 4000 } = {}) {
  await page.goto(`https://${STORE}${ruta}`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(espera);
  if (shot) await page.screenshot({ path: shot, fullPage: true });
  return page.evaluate(() => document.body.innerText.replace(/\n{2,}/g, '\n'));
}
