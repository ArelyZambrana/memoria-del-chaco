// Compila para GitHub Pages: respeta --base-href y deja una copia de index.html como 404.html
// para que las rutas profundas (por ejemplo /batallas/boqueron) funcionen al recargar la página.
import { spawnSync } from 'node:child_process';
import { copyFileSync } from 'node:fs';

const i = process.argv.indexOf('--base-href');
const baseHref = i >= 0 ? process.argv[i + 1] : '/';

const resultado = spawnSync('npx', ['ng', 'build', '--base-href', baseHref], { stdio: 'inherit', shell: process.platform === 'win32' });
if (resultado.status !== 0) process.exit(resultado.status ?? 1);

const salida = 'dist/chaco-enciclopedia/browser';
copyFileSync(`${salida}/index.html`, `${salida}/404.html`);
console.log(`Listo: ${salida} (base href ${baseHref}, con 404.html)`);
