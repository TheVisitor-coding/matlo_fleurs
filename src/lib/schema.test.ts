import { test } from 'node:test';
import assert from 'node:assert/strict';
import { florist, graphe } from './schema.ts';
import { site, adresseRequete } from '../data/site.ts';

const URL_SITE = 'https://matlofleurs.fr';

test('hasMap pointe vers la carte de l\'adresse, pas du nom du commerce', () => {
  const résultat = florist(URL_SITE);
  assert.equal(résultat.hasMap, `https://www.google.com/maps?q=${adresseRequete}`);
});

test('le téléphone est au format international, dérivé du lien tel:', () => {
  const { telephone } = florist(URL_SITE);
  assert.match(telephone!, /^\+33[1-9]\d{8}$/);
  assert.equal(telephone, `+33${site.telephone.lien.replace('tel:0', '')}`);
});

test('les coordonnées tombent sur Challans, latitude et longitude non inversées', () => {
  const { geo } = florist(URL_SITE);
  assert.ok(Math.abs(geo.latitude - 46.846) < 0.03, `latitude ${geo.latitude}`);
  assert.ok(Math.abs(geo.longitude - -1.877) < 0.03, `longitude ${geo.longitude}`);
});

test('le Florist porte identifiant, région, courriel, image et logo absolus', () => {
  const résultat = florist(URL_SITE);
  assert.equal(résultat['@id'], `${URL_SITE}/#boutique`);
  assert.equal(résultat.address.addressRegion, 'Pays de la Loire');
  assert.equal(résultat.email, site.email);
  assert.ok(résultat.image.startsWith(`${URL_SITE}/`));
  assert.ok(résultat.logo.startsWith(`${URL_SITE}/`));
});

test('le graphe relie le site au commerce et déclare la marque sans apostrophe', () => {
  const résultat = graphe(URL_SITE);
  assert.equal(résultat['@context'], 'https://schema.org');

  const [boutique, siteWeb] = résultat['@graph'];
  assert.equal(boutique['@type'], 'Florist');
  assert.equal(siteWeb['@type'], 'WebSite');
  assert.deepEqual(siteWeb.publisher, { '@id': boutique['@id'] });
  assert.ok(siteWeb.alternateName.includes('Matlo Fleurs'));
});
