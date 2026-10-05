export type Finalite = 'cartes' | 'audience';
export type Choix = Partial<Record<Finalite, boolean>>;

const VERSION = 1;
const CLE = 'matlo-consentement';
const EVENEMENT = 'consentement';

// Recommandation CNIL : conserver le choix six mois, refus compris, puis le
// redemander.
export const DUREE_JOURS = 182;

export function serialiser(choix: Choix, maintenant: Date): string {
  return JSON.stringify({ version: VERSION, date: maintenant.toISOString(), choix });
}

export function lireChoix(brut: string | null, maintenant: Date): Choix {
  if (!brut) return {};

  let donnees: unknown;
  try {
    donnees = JSON.parse(brut);
  } catch {
    return {};
  }
  if (typeof donnees !== 'object' || donnees === null) return {};

  const { version, date, choix } = donnees as Record<string, unknown>;
  if (version !== VERSION || typeof date !== 'string' || typeof choix !== 'object' || !choix) {
    return {};
  }

  const age = maintenant.getTime() - new Date(date).getTime();
  if (!(age >= 0 && age <= DUREE_JOURS * 24 * 60 * 60 * 1000)) return {};

  const valide: Choix = {};
  for (const [finalite, valeur] of Object.entries(choix)) {
    if (typeof valeur === 'boolean') valide[finalite as Finalite] = valeur;
  }
  return valide;
}

export function choixComplet(choix: Choix, actives: readonly Finalite[]): boolean {
  return actives.every((finalite) => typeof choix[finalite] === 'boolean');
}

// Navigateur uniquement. Le stockage peut être indisponible (navigation privée,
// données bloquées) : on retombe alors sur « aucun choix », jamais sur un accord.

export function choixCourant(): Choix {
  try {
    return lireChoix(localStorage.getItem(CLE), new Date());
  } catch {
    return {};
  }
}

export function enregistrerChoix(nouveau: Choix): Choix {
  const choix = { ...choixCourant(), ...nouveau };
  try {
    localStorage.setItem(CLE, serialiser(choix, new Date()));
  } catch {
    // Le choix vaut alors pour la page en cours seulement.
  }
  document.dispatchEvent(new CustomEvent<Choix>(EVENEMENT, { detail: choix }));
  return choix;
}

export function surChangement(rappel: (choix: Choix) => void): void {
  document.addEventListener(EVENEMENT, (evenement) =>
    rappel((evenement as CustomEvent<Choix>).detail),
  );
}
