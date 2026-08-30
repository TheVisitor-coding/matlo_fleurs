import { createServer } from 'node:http';
import { readFile, stat, mkdtemp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join, extname } from 'node:path';
import { tmpdir } from 'node:os';
import sharp from 'sharp';

const SOURCE = 'dist/og.html';
const SORTIE = 'public/og-image.png';
const TAILLE = { largeur: 1200, hauteur: 630 };

const NAVIGATEURS = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

if (!existsSync(SOURCE)) {
  console.error(`${SOURCE} absent. Lancer d'abord : npm run build`);
  process.exit(1);
}

const navigateur = NAVIGATEURS.find((chemin) => existsSync(chemin));
if (!navigateur) {
  console.error('Aucun Chrome trouvé. Définir CHROME_PATH.');
  process.exit(1);
}

const serveur = createServer(async (requete, reponse) => {
  const chemin = join('dist', decodeURIComponent(new URL(requete.url, 'http://x').pathname));
  try {
    const contenu = await readFile(chemin);
    reponse.writeHead(200, { 'Content-Type': TYPES[extname(chemin)] ?? 'application/octet-stream' });
    reponse.end(contenu);
  } catch {
    reponse.writeHead(404).end();
  }
});

await new Promise((resoudre) => serveur.listen(0, '127.0.0.1', resoudre));
const port = serveur.address().port;
const dossier = await mkdtemp(join(tmpdir(), 'og-'));
const brut = join(dossier, 'og.png');

await new Promise((resoudre, rejeter) => {
  const processus = spawn(navigateur, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    `--window-size=${TAILLE.largeur},${TAILLE.hauteur}`,
    `--screenshot=${brut}`,
    '--virtual-time-budget=4000',
    `http://127.0.0.1:${port}/og.html`,
  ]);
  processus.on('exit', (code) => (code === 0 ? resoudre() : rejeter(new Error(`Chrome ${code}`))));
});

serveur.close();

// Palette indexée : la carte n'a que quelques teintes, elle pèse deux fois moins
// qu'en JPEG à qualité équivalente.
await sharp(brut).png({ palette: true, quality: 90, compressionLevel: 9 }).toFile(SORTIE);
await rm(dossier, { recursive: true, force: true });

const { size } = await stat(SORTIE);
console.log(`${SORTIE} ${TAILLE.largeur}x${TAILLE.hauteur} ${Math.round(size / 1024)} Ko`);
