// Releva el estado actual del admin: plan, catálogo, theme, páginas.
// Uso:  node explorar.mjs [carpeta-de-salida]
import { login, visitar } from './tn-auth.mjs';
import fs from 'node:fs';

const OUT = process.argv[2] || '/tmp/tn-estado';
fs.mkdirSync(OUT, { recursive: true });

// Ruido del menú lateral, que aparece en todas las pantallas.
const MENU = /^(Inicio|Estadísticas|Gestión|Ventas|Productos|Lista de productos|Inventario|Categorías|Suscripciones|Tablas de precios|Pago Nube|Envío Nube|Clientes|Descuentos|Marketing|Canales de venta|Tienda online|Diseño|Páginas|Blog|Menús|Filtros|Links de redes sociales|Página en construcción|Punto de Venta|Chat|Instagram y Facebook|Google Shopping|TikTok|Pinterest|Marketplaces|Aplicaciones|Tienda de Aplicaciones|Configuración|Ayuda|Centro de Ayuda|Hablá con nosotros|WhatsApp|Nuevo|Lumi)$/;

const RUTAS = [
  ['dashboard', '/admin/dashboard'],
  ['productos', '/admin/products'],
  ['categorias', '/admin/categories'],
  ['paginas',   '/admin/pages'],
  ['blog',      '/admin/blog'],
  ['diseno',    '/admin/themes/store'],
  ['pagos',     '/admin/settings/payments'],
  ['envios',    '/admin/settings/shipping-methods'],
  ['codigos',   '/admin/settings/external-codes'],
  ['plan',      '/admin/account/plans'],
];

const { browser, page } = await login();
console.log('login OK →', page.url(), '\n');

for (const [nombre, ruta] of RUTAS) {
  try {
    const txt = await visitar(page, ruta, { shot: `${OUT}/${nombre}.png`, espera: 6000 });
    const util = txt.split('\n').map(l => l.trim()).filter(l => l && !MENU.test(l));
    console.log(`===== ${nombre.toUpperCase()} =====`);
    console.log(util.slice(-25).join('\n'), '\n');
  } catch (e) {
    console.log(`===== ${nombre.toUpperCase()} =====\nERROR: ${e.message.slice(0, 120)}\n`);
  }
}

await browser.close();
console.log('capturas →', OUT);
