// Aplica la identidad de marca de ZELVA al BORRADOR del diseño:
// paleta de colores + textos del home + migracion/theme/zelva-brand.css
//
// NO toca el diseño publicado. Para que salga en vivo hay que apretar
// "Publicar" en el admin (y eso requiere plan pago).
//
// Uso:  node aplicar-diseno.mjs
import { login, STORE } from './tn-auth.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const CSS = fs.readFileSync(path.join(AQUI, '..', 'theme', 'zelva-brand.css'), 'utf8');

// Paleta del prototipo → campos de color de Morelia.
// Referencia: migracion/identidad-visual.md
const COLORES = {
  'color-background_color': '#F5E7C6',        // crema
  'color-text_color': '#1E2A1E',              // verde oscuro
  'color-accent_color': '#3E5B40',            // verde medio
  'color-button_background_color': '#1E2A1E',
  'color-button_foreground_color': '#F5E7C6',
  'color-label_background_color': '#DCE3CE',  // tinte gin, para etiquetas
};

// Textos del home. Están VACÍOS por defecto y el theme muestra su propio
// placeholder ("Usá este texto para compartir información de tu negocio…").
// Copy del prototipo, con las afirmaciones no validadas ya suavizadas.
const TEXTOS = {
  // OJO: Morelia invierte lo que sugieren los nombres. `welcome_message` es la
  // volanta chica de arriba y `welcome_text` es el titular grande.
  'theme[i18n][welcome_message][es]': 'Bebidas espirituosas sin alcohol · Premium',
  'theme[i18n][welcome_text][es]': 'Otra forma de brindar, la misma forma de disfrutar.',
  'theme[i18n][welcome_button][es]': 'Ver botellas',
  'theme[i18n][welcome_link][es]': '/productos/',
  // Barra de 4 beneficios, transcrita del prototipo. Sin esto Morelia muestra
  // el bloque demo vacío. Los iconos disponibles son:
  // image | shipping | card | security | returns | whatsapp | promotions | cash
  'theme[i18n][banner_services_01_title][es]': 'Marcas premiadas',
  'theme[i18n][banner_services_01_description][es]': 'Reconocidas internacionalmente.',
  'theme[i18n][banner_services_02_title][es]': 'Importación oficial',
  'theme[i18n][banner_services_02_description][es]': 'Directo del productor.',
  'theme[i18n][banner_services_03_title][es]': 'Envíos a todo el país',
  'theme[i18n][banner_services_03_description][es]': 'Llega a tu puerta.',
  'theme[i18n][banner_services_04_title][es]': 'Sabor real, cero resaca',
  'theme[i18n][banner_services_04_description][es]': 'Complejidad sin alcohol.',

  'theme[i18n][home_news_title][es]': 'Sumate al mundo ZELVA',
  'theme[i18n][home_news_text][es]':
    'Recetas, lanzamientos y novedades de la categoría sin alcohol.',
};

// Newsletter en crema oscuro sobre verde, como el bloque del prototipo.
const COLORES_EXTRA = {
  'color-home_news_background_color': '#EFE0B8',
  'color-home_news_foreground_color': '#1E2A1E',
};

// Iconos de la barra de beneficios, para que acompañen al texto de arriba.
const SELECTS = {
  'theme[text][banner_services_01_icon]': 'security',
  'theme[text][banner_services_02_icon]': 'promotions',
  'theme[text][banner_services_03_icon]': 'shipping',
  'theme[text][banner_services_04_icon]': 'returns',
};

const { browser, page } = await login();

await page.goto(`https://${STORE}/admin/themes/settings/draft`, { waitUntil: 'domcontentloaded', timeout: 90000 });
await page.waitForTimeout(12000);

// El editor de diseño es el `instatheme` viejo (jQuery, no React). Su botón
// "Guardar borrador" se habilita desde los widgets custom de color, no desde
// los inputs: escribir en el input o en el textarea por JS no lo despierta, y
// el cambio se pierde al recargar.
//
// La vuelta: los campos viven en un <form> real con ~238 inputs que hace POST.
// Seteamos los valores, sacamos el disabled del submit y dejamos que el form
// se mande con todo lo demás intacto.
const res = await page.evaluate(({ colores, extra, selects, textos, css }) => {
  const out = { seteados: [], faltantes: [] };

  for (const [id, valor] of Object.entries({ ...colores, ...extra })) {
    const el = document.getElementById(id);
    if (el) { el.value = valor; out.seteados.push(id); } else out.faltantes.push(id);
  }

  for (const [name, valor] of Object.entries(selects)) {
    const el = document.querySelector(`[name="${name}"]`);
    if (el) { el.value = valor; out.seteados.push(name.slice(12, -1)); } else out.faltantes.push(name);
  }

  for (const [name, valor] of Object.entries(textos)) {
    const el = document.querySelector(`[name="${name}"]`);
    if (el) { el.value = valor; out.seteados.push(name.slice(12, -4)); } else out.faltantes.push(name);
  }

  const ta = document.querySelector('#text-css_code');
  if (ta) { ta.value = css; out.seteados.push('css_code'); } else out.faltantes.push('css_code');

  const btn = document.querySelector('.js-save-draft-btn');
  if (btn) { btn.disabled = false; btn.removeAttribute('disabled'); out.botonHabilitado = true; }
  return out;
}, { colores: COLORES, extra: COLORES_EXTRA, selects: SELECTS, textos: TEXTOS, css: CSS });

console.log('seteados:', res.seteados.join(', '));
if (res.faltantes.length) console.log('FALTANTES:', res.faltantes.join(', '));

await page.locator('.js-save-draft-btn').click();
await page.waitForTimeout(12000);
console.log('post-submit →', page.url());

// Verificación real: recargar y comprobar que quedó guardado.
await page.goto(`https://${STORE}/admin/themes/settings/draft`, { waitUntil: 'domcontentloaded', timeout: 90000 });
await page.waitForTimeout(12000);
const verif = await page.evaluate(() => ({
  fondo: document.getElementById('color-background_color')?.value,
  texto: document.getElementById('color-text_color')?.value,
  boton: document.getElementById('color-button_background_color')?.value,
  cssLen: (document.querySelector('#text-css_code')?.value || '').length,
  cssTexto: document.querySelector('#text-css_code')?.value || '',
  hero: document.querySelector('[name="theme[i18n][welcome_message][es]"]')?.value,
}));
console.log('tras recargar:', JSON.stringify(verif));
console.log(`CSS enviado ${CSS.length} → guardado ${verif.cssLen} chars`);

// El campo sanitiza: descarta variables CSS y deja reglas vacías. Avisar si
// quedaron, porque significa que esas declaraciones no se aplicaron.
const vacias = (verif.cssTexto.match(/\{\s*\}/g) || []).length;
if (vacias) console.log(`!! ${vacias} reglas quedaron VACÍAS (sanitizadas) — revisar`);
console.log(verif.fondo === '#F5E7C6' && verif.cssLen > 1000 && !vacias ? 'GUARDADO OK' : '!! revisar');

await browser.close();
