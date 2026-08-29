// Crea las páginas de contenido de marca en el admin de Tiendanube.
// Idempotente: si ya existe una página con el mismo título, la saltea.
//
// Uso:  node crear-paginas.mjs [--dry]
import { login, STORE } from './tn-auth.mjs';

const DRY = process.argv.includes('--dry');

// El copy va EXACTAMENTE como está en migracion/contenido/nosotros.md, que es
// el del prototipo. No se edita texto preexistente: no es decisión nuestra.
// Las afirmaciones que no pudimos verificar ("primer marketplace argentino",
// "Primeros en el país", "importando") quedan anotadas en BLOCKERS.md §8 para
// que Juan las valide o las cambie él.
const PAGINAS = [
  {
    titulo: 'Nosotros',
    html: `
<p><strong>Otra forma de tomar, no la ausencia de tomar.</strong></p>
<p>ZELVA nace de una convicción: elegir sin alcohol no debería ser resignar nada. Somos el primer marketplace argentino dedicado a las bebidas espirituosas sin alcohol premium, importando marcas internacionales premiadas y curándolas una por una.</p>
<h2>Por qué "selva"</h2>
<p>Una selva es abundancia, no restricción. Es un ecosistema vivo, diverso, donde cada especie tiene su lugar. Así pensamos la categoría: un mundo entero por explorar, no una lista de cosas que no podés tener.</p>
<p>Curamos pocas botellas, muy buenas, para que cada elección valga la pena.</p>
<h2>Sin alcohol, real</h2>
<p>Destilados con cuerpo y complejidad, sin una gota de alcohol.</p>
<h2>Curaduría extrema</h2>
<p>Pocos SKUs, elegidos con criterio. Nada de relleno.</p>
<h2>Primeros en el país</h2>
<p>Traemos a la Argentina marcas que antes no llegaban.</p>
`.trim(),
  },
  {
    titulo: 'Empresas',
    html: `
<p><strong>Bebidas sin alcohol premium para tu carta, tu evento o tu equipo.</strong></p>
<p>Bares, restaurantes, barras de eventos, oficinas y regalos corporativos. Precios por volumen, entrega consolidada y acompañamiento para que la categoría funcione.</p>
<h2>Qué ofrecemos</h2>
<ul>
<li><strong>Precios por volumen.</strong> Escala de descuentos según cantidad y frecuencia.</li>
<li><strong>Entrega consolidada.</strong> Una sola logística para todo tu pedido.</li>
<li><strong>Diferenciá tu carta.</strong> Sumá una categoría que tus clientes ya buscan.</li>
<li><strong>Material para tu barra.</strong> Recetario, capacitación y soporte de servicio.</li>
</ul>
<h2>Pensado para cada tipo de cliente</h2>
<ul>
<li><strong>Bares y restaurantes.</strong> Cartas de coctelería sin alcohol con margen real y rotación asegurada.</li>
<li><strong>Barras de eventos.</strong> Que todos brinden igual: casamientos, corporativos, lanzamientos.</li>
<li><strong>Regalos y employer branding.</strong> Kits corporativos que se recuerdan, para clientes y equipos.</li>
</ul>
<h2>Cotizá para tu empresa</h2>
<p>Escribinos contándonos tu rubro y el volumen estimado y te contactamos a la brevedad.</p>
`.trim(),
  },
  {
    titulo: 'Sumá tu marca',
    html: `
<p><strong>Vendé tu marca sin alcohol a través de ZELVA.</strong></p>
<p>Ponemos el canal, la logística y una audiencia wellness premium. Vos ponés el producto.</p>
<h2>Qué aportamos</h2>
<ul>
<li><strong>Canal de venta.</strong> Ecommerce propio y tráfico calificado.</li>
<li><strong>Red B2B.</strong> Bares, eventos y clientes corporativos.</li>
<li><strong>Logística y curaduría.</strong> Operación y selección editorial de tu catálogo.</li>
<li><strong>Audiencia premium.</strong> Público dispuesto a pagar por calidad.</li>
</ul>
<h2>Qué buscamos</h2>
<ul>
<li>Producto premium, bien construido.</li>
<li>Premios internacionales o un diferencial claro.</li>
<li>Homólogo alcohólico existente en la categoría.</li>
</ul>
<h2>Contanos de tu marca</h2>
<p>Escribinos con el nombre de tu marca, la categoría, el país de origen y si ya tenés importador en Argentina.</p>
`.trim(),
  },
];

const { browser, page } = await login();

// Inventario de páginas existentes, para no duplicar.
await page.goto(`https://${STORE}/admin/pages`, { waitUntil: 'domcontentloaded', timeout: 90000 });
await page.waitForTimeout(7000);
const existentes = await page.evaluate(() => document.body.innerText);

for (const p of PAGINAS) {
  if (existentes.includes(p.titulo)) {
    console.log(`= ${p.titulo}: ya existe, salteo`);
    continue;
  }
  if (DRY) { console.log(`~ ${p.titulo}: crearía (dry-run)`); continue; }

  await page.goto(`https://${STORE}/admin/pages/new`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(7000);

  await page.locator('input[name="title"]').fill(p.titulo);

  // El cuerpo es un TinyMCE dentro de un iframe. Se escribe por su API, que
  // dispara los eventos internos y sincroniza el textarea oculto que se envía.
  // Inyectar HTML preserva encabezados y listas; tipear texto no.
  await page.waitForFunction(
    () => window.tinymce && window.tinymce.activeEditor && window.tinymce.activeEditor.initialized,
    null, { timeout: 30000 },
  ).catch(() => {});

  // OJO: setContent() solo no alcanza. El form es React y valida contra su
  // propio estado, que no se entera de los cambios hechos por la API de
  // TinyMCE: queda "Ingresá contenido para tu página" aunque el texto se vea.
  // Hay que tipear un carácter de verdad dentro del iframe para disparar los
  // eventos que React sí escucha, y recién después reemplazar por el HTML.
  const fr = page.frameLocator('iframe.tox-edit-area__iframe');
  await fr.locator('body').click();
  await page.keyboard.type('x');
  await page.waitForTimeout(1000);

  const ok = await page.evaluate((html) => {
    const ed = window.tinymce && window.tinymce.activeEditor;
    if (!ed) return false;
    ed.setContent(html);
    ed.fire('input'); ed.fire('change'); ed.fire('SetContent');
    ed.save();               // vuelca el contenido al textarea del form
    return true;
  }, p.html);
  if (!ok) { console.log(`! ${p.titulo}: no encontré el editor TinyMCE`); continue; }

  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: /^crear$/i }).click();
  await page.waitForTimeout(6000);

  const creada = !/\/pages\/new/.test(page.url());
  console.log(`${creada ? '+' : '!'} ${p.titulo}: ${creada ? 'creada' : 'FALLÓ'} → ${page.url()}`);
}

await page.goto(`https://${STORE}/admin/pages`, { waitUntil: 'domcontentloaded', timeout: 90000 });
await page.waitForTimeout(6000);
await page.screenshot({ path: '/tmp/paginas-final.png', fullPage: true });
await browser.close();
