// Contrôles sur les SVG de signature réellement livrés dans public/, pas sur la
// fonction qui les produit : c'est l'artefact commité qui part en production.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { boiteEncre, boiteRacine, figeAnimation } from './svg-boite.mjs';

const FICHIERS = {
  anime: 'public/signature.svg',
  statique: 'public/signature-statique.svg',
};

const lire = (chemin) => readFileSync(new URL(`../${chemin}`, import.meta.url), 'utf8');
const anime = lire(FICHIERS.anime);
const statique = lire(FICHIERS.statique);

const racineBrute = (svg) => svg.match(/^<svg\b[^>]*>/)[0];

test('les deux variantes partagent exactement la même boîte', () => {
  // Elles se relaient dans un <picture> selon prefers-reduced-motion : une
  // boîte différente ferait sauter la mise en page d'un visiteur à l'autre.
  assert.equal(racineBrute(anime), racineBrute(statique));
});

test('la racine est cohérente : viewBox, width et height concordent', () => {
  for (const svg of [anime, statique]) {
    const b = boiteRacine(svg);
    assert.equal(b.attrLargeur, b.largeur);
    assert.equal(b.attrHauteur, b.hauteur);
  }
});

test("la boîte est serrée sur l'encre, sans la rogner", () => {
  for (const [nom, svg] of Object.entries({ anime, statique })) {
    const vb = boiteRacine(svg);
    const encre = boiteEncre(svg);
    const marges = {
      gauche: encre.xMin - vb.x,
      droite: vb.x + vb.largeur - encre.xMax,
      haut: encre.yMin - vb.y,
      bas: vb.y + vb.hauteur - encre.yMax,
    };
    for (const [cote, valeur] of Object.entries(marges)) {
      // Le bord peut tomber pile sur l'encre, à l'erreur de flottant près.
      assert.ok(valeur >= -1e-9, `${nom} : encre rognée à ${cote} (${valeur.toFixed(3)})`);
      assert.ok(valeur <= 0.02, `${nom} : ${valeur.toFixed(3)} de vide à ${cote}`);
    }
  }
});

test('chaque masque porte une région explicite qui couvre la boîte', () => {
  // Sans x/y/width/height, la région par défaut est ancrée sur l'origine de
  // l'espace utilisateur et non sur la viewBox : elle amputerait le tracé.
  const vb = boiteRacine(anime);
  const masques = [...anime.matchAll(/<mask\b[^>]*>/g)].map(([m]) => m);
  assert.ok(masques.length > 0, 'aucun masque trouvé dans la variante animée');

  for (const masque of masques) {
    const n = (attr) => Number(masque.match(new RegExp(`\\b${attr}="([^"]*)"`))?.[1] ?? NaN);
    const [x, y, l, h] = ['x', 'y', 'width', 'height'].map(n);
    assert.ok(Number.isFinite(x + y + l + h), `masque sans région : ${masque}`);
    assert.ok(x <= vb.x && y <= vb.y, 'région de masque décalée du coin de la viewBox');
    assert.ok(x + l >= vb.x + vb.largeur, 'région de masque trop courte en largeur');
    assert.ok(y + h >= vb.y + vb.hauteur, 'région de masque trop courte en hauteur');
  }
});

test('au rendu, le tracé touche les quatre bords sans déborder', async () => {
  // Le seul contrôle qui exerce vraiment le moteur de masques. librsvg rend la
  // SMIL à t=0, d'où le figeage préalable.
  for (const [nom, svg] of Object.entries({ anime, statique })) {
    const vb = boiteRacine(svg);
    const largeur = Math.round(vb.largeur);
    const hauteur = Math.round(vb.hauteur);
    const { data } = await sharp(Buffer.from(figeAnimation(svg)))
      .resize(largeur, hauteur)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    let xMin = Infinity;
    let yMin = Infinity;
    let xMax = -Infinity;
    let yMax = -Infinity;
    for (let y = 0; y < hauteur; y++) {
      for (let x = 0; x < largeur; x++) {
        if (data[(y * largeur + x) * 4 + 3] > 8) {
          if (x < xMin) xMin = x;
          if (x > xMax) xMax = x;
          if (y < yMin) yMin = y;
          if (y > yMax) yMax = y;
        }
      }
    }

    assert.ok(Number.isFinite(xMin), `${nom} : rendu vide`);
    const marges = [xMin, largeur - 1 - xMax, yMin, hauteur - 1 - yMax];
    for (const marge of marges) {
      assert.ok(marge <= 1, `${nom} : ${marge} px de vide au rendu, marges ${marges.join(' ')}`);
    }
  }
});
