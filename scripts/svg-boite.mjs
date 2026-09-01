// Mesure et recadrage de la boîte d'un SVG produit par Tegaki.
//
// Tegaki ne recadre que le mode `loop` : `placementsToSvg`, qui sert les modes
// `once` et `static`, écrit un `viewBox="0 0 largeur hauteur"` en dur, où la
// hauteur vaut 1,8 fois le corps. Aucune option ne le change : `padH` et `padV`
// sont figés dans `textToSvg`, et `lineHeight` ne peut pas faire descendre la
// boîte sous 1,8 em. Le recadrage se fait donc après coup.

const ATTRIBUTS = /([\w:-]+)="([^"]*)"/g;
const attributs = (balise) =>
  Object.fromEntries([...balise.matchAll(ATTRIBUTS)].map(([, cle, valeur]) => [cle, valeur]));

// Les flottants de Tegaki traînent des 457.76000000000005 : on cale avant
// d'arrondir vers l'extérieur, sinon on ajoute un centième fantôme.
const cale = (n) => Math.round(n * 1e6) / 1e6;
const versLeBas = (n) => Math.floor(cale(n) * 100) / 100;
const versLeHaut = (n) => Math.ceil(cale(n) * 100) / 100;

/**
 * Boîte de l'encre réellement dessinée.
 *
 * Les `<path>` des `<mask>` sont ignorés à dessein : ils ne dessinent pas, ils
 * révèlent, et Tegaki leur donne une épaisseur volontairement supérieure
 * (`coverW = maxW + 4`). Les compter gonflerait la boîte de ~2,7 unités par
 * côté. Les caps sont ronds, donc la surface balayée par un segment est son
 * rectangle élargi de la demi-épaisseur : la boîte est exacte, pas majorante.
 */
export function boiteEncre(svg) {
  let xMin = Infinity;
  let yMin = Infinity;
  let xMax = -Infinity;
  let yMax = -Infinity;

  const etendre = (x0, y0, x1, y1) => {
    if (x0 < xMin) xMin = x0;
    if (y0 < yMin) yMin = y0;
    if (x1 > xMax) xMax = x1;
    if (y1 > yMax) yMax = y1;
  };

  for (const [balise] of svg.matchAll(/<line\b[^>]*>/g)) {
    const a = attributs(balise);
    const rayon = Number(a['stroke-width']) / 2;
    const x1 = Number(a.x1);
    const y1 = Number(a.y1);
    const x2 = Number(a.x2);
    const y2 = Number(a.y2);
    if (!Number.isFinite(rayon + x1 + y1 + x2 + y2)) {
      throw new Error(`Segment illisible : ${balise}`);
    }
    etendre(
      Math.min(x1, x2) - rayon,
      Math.min(y1, y2) - rayon,
      Math.max(x1, x2) + rayon,
      Math.max(y1, y2) + rayon,
    );
  }

  // Les points isolés (les i, la cédille) sortent en cercles, hors des groupes
  // masqués, avec un rayon qui vaut déjà la demi-épaisseur.
  for (const [balise] of svg.matchAll(/<circle\b[^>]*>/g)) {
    const a = attributs(balise);
    const cx = Number(a.cx);
    const cy = Number(a.cy);
    const r = Number(a.r);
    if (!Number.isFinite(cx + cy + r)) throw new Error(`Cercle illisible : ${balise}`);
    etendre(cx - r, cy - r, cx + r, cy + r);
  }

  if (!Number.isFinite(xMin)) {
    throw new Error('Aucune encre trouvée : Tegaki a changé de sérialisation.');
  }
  return { xMin, yMin, xMax, yMax };
}

/** Boîte de rendu commune, arrondie vers l'extérieur au centième. */
export function boiteCommune(encres, marge = 0) {
  const union = encres.reduce((a, b) => ({
    xMin: Math.min(a.xMin, b.xMin),
    yMin: Math.min(a.yMin, b.yMin),
    xMax: Math.max(a.xMax, b.xMax),
    yMax: Math.max(a.yMax, b.yMax),
  }));
  const x = versLeBas(union.xMin - marge);
  const y = versLeBas(union.yMin - marge);
  return {
    x,
    y,
    largeur: cale(versLeHaut(union.xMax + marge) - x),
    hauteur: cale(versLeHaut(union.yMax + marge) - y),
  };
}

/** Lit la `viewBox`, `width` et `height` de la balise racine. */
export function boiteRacine(svg) {
  const racine = svg.match(/^<svg\b[^>]*>/)?.[0];
  if (!racine) throw new Error('Pas de balise <svg> racine.');
  const a = attributs(racine);
  const [x, y, largeur, hauteur] = a.viewBox.split(/\s+/).map(Number);
  return { x, y, largeur, hauteur, attrLargeur: Number(a.width), attrHauteur: Number(a.height) };
}

/**
 * Réécrit la boîte de la racine, et donne à chaque `<mask>` une région
 * explicite.
 *
 * Tegaki émet `<mask maskUnits="userSpaceOnUse">` sans x/y/width/height. Les
 * valeurs initiales de la spécification, -10% -10% 120% 120%, se résolvent alors
 * contre la TAILLE du viewport mais restent ancrées sur l'origine (0,0) de
 * l'espace utilisateur, pas sur le coin de la `viewBox`. Tant que la boîte
 * commençait en 0 0 la région couvrait tout ; recadrer sans corriger ça
 * effacerait le tiers bas de la signature et sa hampe la plus à gauche. On
 * reproduit la même générosité, correctement ancrée.
 */
export function recadre(svg, { x, y, largeur, hauteur }) {
  const zone =
    ` x="${cale(x - largeur * 0.1)}" y="${cale(y - hauteur * 0.1)}"` +
    ` width="${cale(largeur * 1.2)}" height="${cale(hauteur * 1.2)}"`;

  return svg
    .replace(/^<svg\b[^>]*>/, (racine) =>
      racine
        .replace(/viewBox="[^"]*"/, `viewBox="${x} ${y} ${largeur} ${hauteur}"`)
        .replace(/width="[^"]*"/, `width="${largeur}"`)
        .replace(/height="[^"]*"/, `height="${hauteur}"`),
    )
    .replaceAll('maskUnits="userSpaceOnUse"', `maskUnits="userSpaceOnUse"${zone}`);
}

/**
 * Fige l'animation SMIL pour pouvoir rasteriser le tracé complet : librsvg rend
 * la SMIL à t=0, donc le fichier animé sortirait vide.
 */
export function figeAnimation(svg) {
  return svg
    .replace(/stroke-dashoffset="1"/g, 'stroke-dashoffset="0"')
    .replace(/ opacity="0"/g, '')
    .replace(/<animate[^>]*\/>/g, '');
}
