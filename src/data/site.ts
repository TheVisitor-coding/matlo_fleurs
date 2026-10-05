export type PlageHoraire = {
  readonly jour: string;
  readonly plages: readonly string[];
  readonly iso: number;
};

export const site = {
  nom: "Matlo'Fleurs",
  baseline: 'Artisan Fleuriste',
  metier: 'Fleuriste artisanale à Challans',
  fleuriste: 'Stéphanie ROY',
  tva: 'FR47109840322',
  siret: '10984032200019',
  forme: 'SARL',

  adresse: {
    // Chaîne unique dont dérivent toutes les autres formes : l'adresse doit
    // rester identique caractère pour caractère avec la fiche Google.
    ligne1: '30 rue de Saint-Jean-de-Monts',
    codePostal: '85300',
    ville: 'Challans',
    region: 'Pays de la Loire',
  },

  // Numéro 30 localisé par OpenStreetMap. À caler sur le repère de la fiche
  // Google si les deux divergent : c'est elle que le JSON-LD doit recouper.
  geo: {
    latitude: 46.84453,
    longitude: -1.8866,
  },

  telephone: {
    affiche: '02 51 35 46 37',
    lien: 'tel:0251354637',
  },

  // Doit rester identique à la boîte créée chez Infomaniak et au `DESTINATAIRE`
  // de `public/api/contact.php`, que TypeScript ne peut pas lire.
  email: 'contact@matlofleurs.fr',

  horaires: [
    { jour: 'Lundi', plages: [], iso: 1 },
    { jour: 'Mardi', plages: ['9h-12h30', '14h30-19h'], iso: 2 },
    { jour: 'Mercredi', plages: ['9h-12h30', '14h30-19h'], iso: 3 },
    { jour: 'Jeudi', plages: ['9h-12h30', '14h30-19h'], iso: 4 },
    { jour: 'Vendredi', plages: ['9h-12h30', '14h30-19h30'], iso: 5 },
    { jour: 'Samedi', plages: ['9h-12h30', '15h-19h30'], iso: 6 },
    { jour: 'Dimanche', plages: ['9h-12h30'], iso: 7 },
  ] as const satisfies readonly PlageHoraire[],

  livraison: {
    rayonKm: 20,
    communes: [
      'Sallertaine',
      'Soullans',
      'Le Perrier',
      'Bois-de-Cené',
      'Saint-Christophe-du-Ligneron',
      'Saint-Gervais',
      'Beauvoir-sur-Mer',
      'Commequiers',
      'La Garnache',
      'Froidfond',
    ],
    partenaireNational: 'Florajet',
  },

  reseaux: {
    instagram: 'https://www.instagram.com/matlofleurs/',
    facebook: 'https://www.facebook.com/profile.php?id=61591860977655',
  },

  // Tant qu'un identifiant manque, l'outil n'est ni chargé, ni proposé dans le
  // bandeau de consentement, ni décrit dans la politique de confidentialité.
  mesure: {
    clarity: 'yt0x9lxpa6' as string | null,
  },

  // Figées : chacune sera remplacée par une URL le jour où sa page existera,
  // sans redirection.
  ancres: {
    creations: '#creations',
    occasions: '#occasions',
    deuil: '#deuil',
    atelier: '#atelier',
    boutique: '#boutique',
    contact: '#contact',
  },
} as const;

export const adresseComplete = `${site.adresse.ligne1}\n${site.adresse.codePostal} ${site.adresse.ville}`;

// Sans code postal, réservée à la barre d'information faute de place.
export const adresseCourte = `${site.adresse.ligne1} à ${site.adresse.ville}`;

// Adresse seule (pas le nom du commerce) : fiable pour pointer la carte et le
// JSON-LD même si la fiche Google Business tout juste recréée n'est pas
// encore indexée sous son nom.
export const adresseRequete = encodeURIComponent(
  `${site.adresse.ligne1}, ${site.adresse.codePostal} ${site.adresse.ville}`,
);
