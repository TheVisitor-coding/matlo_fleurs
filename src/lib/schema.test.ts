import { test } from 'node:test';
import assert from 'node:assert/strict';
import { florist } from './schema.ts';
import { adresseRequete } from '../data/site.ts';

test('hasMap pointe vers la carte de l\'adresse, pas du nom du commerce', () => {
  const résultat = florist('https://matlofleurs.fr');
  assert.equal(résultat.hasMap, `https://www.google.com/maps?q=${adresseRequete}`);
});
