import { site, adresseRequete } from '../data/site.ts';

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

// Google n'accepte le numéro qu'au format international.
function telephoneInternational(lien: string): string {
  return lien.replace(/^tel:0/, '+33');
}

// `Florist` plutôt que `LocalBusiness` : plus spécifique, donc mieux recoupé
// par Google avec la fiche Business Profile.
export function florist(url: string) {
  const reseaux = [site.reseaux.instagram, site.reseaux.facebook].filter((u) => u !== null);

  return {
    '@type': 'Florist',
    '@id': `${url}/#boutique`,
    name: site.nom,
    description: `Artisan fleuriste à ${site.adresse.ville} (Vendée) : bouquets, compositions, fleurs séchées et plantes, pour le quotidien, le mariage et le deuil.`,
    url,
    image: `${url}/og-image.png`,
    // 192 px : au-dessus des 112 px minimum qu'exige Google pour un logo.
    logo: `${url}/favicon-192.png`,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.adresse.ligne1,
      postalCode: site.adresse.codePostal,
      addressLocality: site.adresse.ville,
      addressRegion: site.adresse.region,
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    openingHoursSpecification: plagesOuverture(),
    hasMap: `https://www.google.com/maps?q=${adresseRequete}`,
    areaServed: [site.adresse.ville, ...site.livraison.communes].map((commune) => ({
      '@type': 'City',
      name: commune,
    })),
    ...(site.telephone.lien !== null && { telephone: telephoneInternational(site.telephone.lien) }),
    ...(reseaux.length > 0 && { sameAs: reseaux }),
  };
}

// Les variantes sans apostrophe sont celles que l'on tape au clavier : sans
// elles, Google ne relie pas « matlo fleurs » au nom du site.
function siteWeb(url: string) {
  return {
    '@type': 'WebSite',
    '@id': `${url}/#site`,
    name: site.nom,
    alternateName: ['Matlo Fleurs', 'Matlofleurs'],
    url,
    inLanguage: 'fr-FR',
    publisher: { '@id': `${url}/#boutique` },
  };
}

export function graphe(url: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [florist(url), siteWeb(url)] as const,
  };
}
