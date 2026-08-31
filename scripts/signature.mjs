// Régénère la signature manuscrite du hero.
//
// Les squelettes de tracé viennent du studio Tegaki (https://gkurt.com/tegaki/studio/),
// police Tangerine, jeu de caractères saisi à la main. Les bundles livrés avec le
// paquet ne couvrent que 88 glyphes ASCII : `ç`, `é` et `à` n'y existent pas, il faut
// donc passer par un bundle personnalisé. Toute modification du texte impose de
// repasser par le studio pour y ajouter les caractères manquants.
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';

const TEXTE = 'façonnées à la main';
const COULEUR = '#5c6b4f'; // sauge

let textToSvg;
try {
  ({ textToSvg } = await import('tegaki/core'));
} catch {
  console.error('tegaki absent. Installer : npm i -D tegaki@0.22.1');
  process.exit(1);
}

const glyphData = JSON.parse(readFileSync(new URL('./tangerine-glyphdata.json', import.meta.url), 'utf8'));
const manquants = [...new Set(TEXTE.replace(/ /g, ''))].filter((c) => !(c in glyphData));
if (manquants.length) {
  console.error(`Glyphes absents du bundle : ${manquants.join(' ')}. Les régénérer au studio.`);
  process.exit(1);
}

const bundle = {
  version: 0,
  family: 'Tangerine',
  lineCap: 'round',
  fontUrl: '',
  fontFaceCSS: '',
  unitsPerEm: 1000,
  ascender: 750,
  descender: -250,
  glyphData,
};

// Sans stagger, Tegaki étale l'écriture sur 9,5 s. Le chevauchement des glyphes
// ramène la ligne à ~2,3 s, la seule durée tenable pour une entrée de page.
const timing = { wordGap: 0.08, stagger: { advance: 0.1, duration: 0.4 } };

const sorties = [
  ['once', 'public/signature.svg', timing],
  ['static', 'public/signature-statique.svg', {}],
];

for (const [mode, chemin, t] of sorties) {
  const svg = textToSvg(TEXTE, bundle, { fontSize: 100, mode, color: COULEUR, timing: t });
  writeFileSync(chemin, svg);
  const brut = statSync(chemin).size;
  const compresse = gzipSync(svg).length;
  console.log(`${chemin.padEnd(32)} ${mode.padEnd(7)} ${Math.round(brut / 1024)} Ko  (${Math.round(compresse / 1024)} Ko gzip)`);
}
