export type PlageHoraire = {
  readonly jour: string;
  readonly plages: readonly string[];
  readonly iso: number;
};

export const site = {
  nom: "Matlo'Fleurs",
  baseline: 'Artisan Fleuriste',
  metier: 'Fleuriste artisanale à Challans',
  fleuriste: 'Stéphanie',

  adresse: {
    // Chaîne unique dont dérivent toutes les autres formes : l'adresse doit
    // rester identique caractère pour caractère avec la fiche Google.
    ligne1: '30 rue de Saint-Jean-de-Monts',
    codePostal: '85300',
    ville: 'Challans',
  },

  telephone: {
    affiche: '02 XX XX XX XX',
    // `null` tant que le numéro réel est inconnu : un placeholder inerte vaut
    // mieux qu'un `tel:` cassé.
    lien: null as string | null,
  },

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
    facebook: null,
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
export const adresseCourte = `${site.adresse.ligne1}, ${site.adresse.ville}`;
