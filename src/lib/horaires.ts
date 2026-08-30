export const FUSEAU = 'Europe/Paris';

export type JourOuverture = {
  readonly iso: number;
  readonly plages: readonly string[];
};

const JOURS_COURTS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const JOURS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

export function versMinutes(heure: string): number {
  const [h, m] = heure.split('h');
  return Number(h) * 60 + Number(m || 0);
}

export function versLibelle(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, '0')}`;
}

// Le fuseau de la boutique et non celui du visiteur : sinon un visiteur en
// voyage lit une fausse information.
export function maintenantBoutique(date: Date): { iso: number; minutes: number } {
  const parties = new Intl.DateTimeFormat('en-GB', {
    timeZone: FUSEAU,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);

  const lu = (type: string) => parties.find((p) => p.type === type)?.value ?? '';

  return {
    iso: JOURS_COURTS.indexOf(lu('weekday')) + 1,
    minutes: Number(lu('hour')) * 60 + Number(lu('minute')),
  };
}

// Renvoie `null` si aucun jour n'est ouvert, pour que l'appelant conserve son
// texte de repli plutôt que d'afficher un vide.
export function phraseOuverture(
  horaires: readonly JourOuverture[],
  date: Date = new Date(),
): string | null {
  const { iso, minutes } = maintenantBoutique(date);

  const plages = (horaires.find((j) => j.iso === iso)?.plages ?? []).map((p) => {
    const [debut, fin] = p.split('-');
    return { debut: versMinutes(debut!), fin: versMinutes(fin!) };
  });

  const ouverte = plages.find((p) => minutes >= p.debut && minutes < p.fin);
  if (ouverte) {
    const fermeture = plages[plages.length - 1]!.fin;
    return `Ouvert aujourd'hui jusqu'à ${versLibelle(fermeture)}`;
  }

  const aVenir = plages.find((p) => minutes < p.debut);
  if (aVenir) {
    return `Ouvre aujourd'hui à ${versLibelle(aVenir.debut)}`;
  }

  for (let pas = 1; pas <= 7; pas += 1) {
    const suivantIso = ((iso - 1 + pas) % 7) + 1;
    const suivant = horaires.find((j) => j.iso === suivantIso);
    if (!suivant || suivant.plages.length === 0) continue;

    const quand = pas === 1 ? 'demain' : JOURS[suivantIso - 1];
    const ouverture = versLibelle(versMinutes(suivant.plages[0]!.split('-')[0]!));
    return `Fermé aujourd'hui · ouvert ${quand} à ${ouverture}`;
  }

  return null;
}
