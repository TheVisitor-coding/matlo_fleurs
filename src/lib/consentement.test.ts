import { test } from 'node:test';
import assert from 'node:assert/strict';
import { choixComplet, lireChoix, serialiser, DUREE_JOURS } from './consentement.ts';

const JOUR = 24 * 60 * 60 * 1000;
const depot = new Date('2026-10-05T10:00:00Z');

test('un choix enregistré se relit tel quel', () => {
  const brut = serialiser({ cartes: true, audience: false }, depot);
  assert.deepEqual(lireChoix(brut, depot), { cartes: true, audience: false });
});

test('rien, du JSON invalide ou une forme inconnue valent absence de choix', () => {
  assert.deepEqual(lireChoix(null, depot), {});
  assert.deepEqual(lireChoix('{pas du json', depot), {});
  assert.deepEqual(lireChoix('"texte"', depot), {});
  assert.deepEqual(lireChoix(JSON.stringify({ version: 99, date: depot.toISOString(), choix: { cartes: true } }), depot), {});
});

test('une valeur non booléenne est ignorée, pas interprétée', () => {
  const brut = JSON.stringify({ version: 1, date: depot.toISOString(), choix: { cartes: 'oui', audience: false } });
  assert.deepEqual(lireChoix(brut, depot), { audience: false });
});

test('le choix expire après six mois, refus compris', () => {
  const brut = serialiser({ cartes: false }, depot);
  const veille = new Date(depot.getTime() + (DUREE_JOURS - 1) * JOUR);
  const lendemain = new Date(depot.getTime() + (DUREE_JOURS + 1) * JOUR);
  assert.deepEqual(lireChoix(brut, veille), { cartes: false });
  assert.deepEqual(lireChoix(brut, lendemain), {});
});

test('un service ajouté après coup redemande le consentement', () => {
  const choix = lireChoix(serialiser({ cartes: true }, depot), depot);
  assert.equal(choixComplet(choix, ['cartes']), true);
  assert.equal(choixComplet(choix, ['cartes', 'audience']), false);
});

test('sans finalité active, il n\'y a rien à demander', () => {
  assert.equal(choixComplet({}, []), true);
});
