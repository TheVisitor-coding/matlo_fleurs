import { site } from '../data/site';

const JOURS_SCHEMA = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

function versHeureIso(heure: string): string {
  const [h, m] = heure.split('h');
  return `${h.padStart(2, '0')}:${(m || '00').padEnd(2, '0')}`;
}

function plagesOuverture() {
  return site.horaires.flatMap((jour) =>
    jour.plages.map((plage) => {
      const [ouverture, fermeture] = plage.split('-');
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${JOURS_SCHEMA[jour.iso - 1]}`,
        opens: versHeureIso(ouverture!),
        closes: versHeureIso(fermeture!),
      };
    }),
  );
}

// `Florist` plutôt que `LocalBusiness` : plus spécifique, donc mieux recoupé
// par Google avec la fiche Business Profile.
export function florist(url: string) {
  const reseaux = [site.reseaux.instagram, site.reseaux.facebook].filter((u) => u !== null);

  return {
    '@context': 'https://schema.org',
    '@type': 'Florist',
    name: site.nom,
    description: site.metier,
    url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.adresse.ligne1,
      postalCode: site.adresse.codePostal,
      addressLocality: site.adresse.ville,
      addressCountry: 'FR',
    },
    openingHoursSpecification: plagesOuverture(),
    areaServed: [site.adresse.ville, ...site.livraison.communes].map((commune) => ({
      '@type': 'City',
      name: commune,
    })),
    ...(site.telephone.lien !== null && { telephone: site.telephone.lien }),
    ...(reseaux.length > 0 && { sameAs: reseaux }),
  };
}
