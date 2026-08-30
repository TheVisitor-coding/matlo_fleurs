import { test } from 'node:test';
import assert from 'node:assert/strict';
import { phraseOuverture, versLibelle, versMinutes, type JourOuverture } from './horaires.ts';
import { site } from '../data/site.ts';

const HORAIRES: JourOuverture[] = [
  { iso: 1, plages: [] },
  { iso: 2, plages: ['9h-12h30', '14h30-19h'] },
  { iso: 3, plages: ['9h-12h30', '14h30-19h'] },
  { iso: 4, plages: ['9h-12h30', '14h30-19h'] },
  { iso: 5, plages: ['9h-12h30', '14h30-19h30'] },
  { iso: 6, plages: ['9h-12h30', '15h-19h30'] },
  { iso: 7, plages: ['9h-12h30'] },
];

const phrase = (iso8601: string) => phraseOuverture(HORAIRES, new Date(iso8601));

test('conversion des heures', () => {
  assert.equal(versMinutes('9h'), 540);
  assert.equal(versMinutes('12h30'), 750);
  assert.equal(versLibelle(540), '9h');
  assert.equal(versLibelle(1170), '19h30');
});

test('lundi, jour de fermeture, renvoie au lendemain', () => {
  assert.equal(phrase('2026-08-31T10:00:00+02:00'), "Fermé aujourd'hui · ouvert demain à 9h");
});

test('avant l’ouverture, annonce l’heure d’ouverture', () => {
  assert.equal(phrase('2026-09-01T08:00:00+02:00'), "Ouvre aujourd'hui à 9h");
});

test('pendant l’ouverture, annonce la fermeture du soir et non celle de midi', () => {
  assert.equal(phrase('2026-09-01T10:00:00+02:00'), "Ouvert aujourd'hui jusqu'à 19h");
});

test('pendant la coupure de midi, annonce la réouverture', () => {
  assert.equal(phrase('2026-09-01T13:00:00+02:00'), "Ouvre aujourd'hui à 14h30");
});

test('après la fermeture, renvoie au lendemain', () => {
  assert.equal(phrase('2026-09-01T20:00:00+02:00'), "Fermé aujourd'hui · ouvert demain à 9h");
});

test('vendredi ferme à 19h30, pas à 19h', () => {
  assert.equal(phrase('2026-09-04T19:15:00+02:00'), "Ouvert aujourd'hui jusqu'à 19h30");
});

test('samedi rouvre à 15h, pas à 14h30', () => {
  assert.equal(phrase('2026-09-05T14:00:00+02:00'), "Ouvre aujourd'hui à 15h");
});

test('dimanche après-midi saute le lundi fermé et annonce mardi', () => {
  assert.equal(phrase('2026-08-30T13:00:00+02:00'), "Fermé aujourd'hui · ouvert mardi à 9h");
});

test('dimanche matin, la fermeture est à 12h30', () => {
  assert.equal(phrase('2026-08-30T10:00:00+02:00'), "Ouvert aujourd'hui jusqu'à 12h30");
});

test('le fuseau de la boutique prime sur celui du visiteur', () => {
  // 23h00 UTC un mardi = mercredi 1h00 à Paris, donc boutique fermée.
  assert.equal(phrase('2026-09-01T23:00:00Z'), "Ouvre aujourd'hui à 9h");
});

test('aucun jour ouvert : null, pour conserver le texte de repli', () => {
  assert.equal(phraseOuverture([{ iso: 1, plages: [] }], new Date('2026-08-31T10:00:00+02:00')), null);
});

test('le jeu de test suit les horaires réels', () => {
  // Sans cette garde, une modification des horaires laisserait les assertions
  // ci-dessus passer sur des valeurs périmées.
  assert.deepEqual(
    HORAIRES,
    site.horaires.map((j) => ({ iso: j.iso, plages: j.plages })),
  );
});
