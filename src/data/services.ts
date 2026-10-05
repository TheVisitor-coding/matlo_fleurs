import { site } from './site';
import type { Finalite } from '../lib/consentement';

export type Service = {
  readonly finalite: Finalite;
  readonly nom: string;
  readonly editeur: string;
  readonly usage: string;
  readonly cookies: string;
  readonly confidentialite: string;
};

export const finalites: Record<Finalite, { titre: string; description: string }> = {
  cartes: {
    titre: 'Carte interactive',
    description:
      'Affiche le plan Google Maps de la boutique. Google reçoit alors votre adresse IP et peut déposer des cookies.',
  },
  audience: {
    titre: "Mesure d'audience",
    description:
      'Nous aide à savoir quelles pages sont consultées et comment, pour améliorer le site. Aucune publicité, aucune revente.',
  },
};

const googleMaps: Service = {
  finalite: 'cartes',
  nom: 'Google Maps',
  editeur: 'Google Ireland Limited',
  usage: 'Carte de situation de la boutique.',
  cookies: 'déposés par Google selon ses propres règles.',
  confidentialite: 'https://policies.google.com/privacy',
};

const googleAnalytics: Service = {
  finalite: 'audience',
  nom: 'Google Analytics',
  editeur: 'Google Ireland Limited',
  usage:
    'Statistiques de fréquentation (pages vues, durée de visite, provenance), chargées par Google Tag Manager.',
  cookies: '_ga et _ga_*, 13 mois au plus.',
  confidentialite: 'https://policies.google.com/privacy',
};

const clarity: Service = {
  finalite: 'audience',
  nom: 'Microsoft Clarity',
  editeur: 'Microsoft Ireland Operations Limited',
  usage:
    'Relevé anonymisé de la navigation (clics, défilement) pour repérer ce qui gêne la lecture du site.',
  cookies: '_clck (1 an) et _clsk (1 jour).',
  confidentialite: 'https://privacy.microsoft.com/fr-fr/privacystatement',
};

export const services: readonly Service[] = [
  googleMaps,
  ...(site.mesure.googleTagManager ? [googleAnalytics] : []),
  ...(site.mesure.clarity ? [clarity] : []),
];

export const finalitesActives: readonly Finalite[] = (Object.keys(finalites) as Finalite[]).filter(
  (finalite) => services.some((service) => service.finalite === finalite),
);
