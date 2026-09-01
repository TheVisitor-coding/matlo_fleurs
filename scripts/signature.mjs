// Régénère la signature manuscrite du hero.
//
// Les squelettes de tracé viennent du studio Tegaki (https://gkurt.com/tegaki/studio/),
// police Tangerine, jeu de caractères saisi à la main. Les bundles livrés avec le
// paquet ne couvrent que 88 glyphes ASCII : `ç`, `é` et `à` n'y existent pas, il faut
// donc passer par un bundle personnalisé. Toute modification du texte impose de
// repasser par le studio pour y ajouter les caractères manquants.
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { boiteEncre, boiteCommune, recadre } from './svg-boite.mjs';

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

// Générer les deux variantes avant d'écrire quoi que ce soit : elles doivent
// partager la même boîte, qui n'est connue qu'une fois les deux mesurées.
const rendus = sorties.map(([mode, chemin, t]) => ({
  mode,
  chemin,
  svg: textToSvg(TEXTE, bundle, { fontSize: 100, mode, color: COULEUR, timing: t }),
}));

const encres = rendus.map((r) => boiteEncre(r.svg));
const boite = boiteCommune(encres);

const ecart = Math.max(
  ...encres.flatMap((e) =>
    ['xMin', 'yMin', 'xMax', 'yMax'].map((c) => Math.abs(e[c] - encres[0][c])),
  ),
);
if (ecart > 0.01) {
  console.warn(`Les deux modes divergent de ${ecart.toFixed(3)} unité : union appliquée.`);
}

for (const { mode, chemin, svg: brutSvg } of rendus) {
  const svg = recadre(brutSvg, boite);
  writeFileSync(chemin, svg);
  const brut = statSync(chemin).size;
  const compresse = gzipSync(svg).length;
  console.log(`${chemin.padEnd(32)} ${mode.padEnd(7)} ${Math.round(brut / 1024)} Ko  (${Math.round(compresse / 1024)} Ko gzip)`);
}

// La largeur en em est ce que `.hero__signature` doit porter dans Hero.astro :
// l'afficher évite d'avoir à la recalculer à la main après chaque régénération.
console.log(
  `\nboîte ${boite.largeur} x ${boite.hauteur} (ratio ${(boite.largeur / boite.hauteur).toFixed(4)})\n` +
    `Hero.astro : width: min(100%, ${boite.largeur / 100}em) et <img width="${Math.round(boite.largeur)}" height="${Math.round(boite.hauteur)}">`,
);
