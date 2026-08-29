import { chromium } from '@playwright/test';
const b = await chromium.launch({ executablePath:'/usr/bin/chromium', headless:true });
const BASE='https://tiendadejuanguitou.mitiendanube.com';
const vistas = [
  ['borrador-home', `${BASE}/?preview=true&theme_installation_id=13836885`, 1440, 2600],
  ['borrador-productos', `${BASE}/productos/?preview=true&theme_installation_id=13836885`, 1440, 1800],
  ['borrador-nosotros', `${BASE}/nosotros/?preview=true&theme_installation_id=13836885`, 1440, 1500],
  ['vivo-home', `${BASE}/`, 1440, 1400],
];
for (const [n,u,w,h] of vistas) {
  const p = await b.newPage({ viewport:{width:w,height:h}, locale:'es-AR' });
  await p.goto(u,{waitUntil:'domcontentloaded',timeout:90000});
  await p.waitForTimeout(7000);
  // cerrar el banner de cookies para que no tape
  await p.getByText(/^Entendido$/).click({timeout:3000}).catch(()=>{});
  await p.waitForTimeout(1200);
  await p.screenshot({path:`/tmp/cap-${n}.png`});
  console.log(n, 'ok');
  await p.close();
}
await b.close();
