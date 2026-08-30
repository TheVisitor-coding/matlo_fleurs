# CLAUDE.md — Matlo'Fleurs

## Projet
- **Nom** : matlo_fleurs (marque : Matlo'Fleurs)
- **Chemin** : /Users/mat/dev/matlo_fleurs
- **Type** : Site web de boutique de fleuriste artisanale (vitrine locale, évolutive e-commerce)
- **Stack** : non tranchée (décision reportée — voir Décisions techniques)
- **Repo** : aucun (git non initialisé)
- **Vault miroir** : ~/Personal_Vault/02 - Projects/matlo_fleurs/Session-Logs/

## Contexte métier
- Fleuriste artisanale à **Challans (Vendée)**, ouverture imminente. Boutique tenue par ma mère.
- Positionnement **accessible**. Cible : trentenaires → seniors.
- Occasions couvertes : quotidien, mariage, **deuil**.
- Univers de marque : vintage, naturel, artisanal, familial, chaleureux + dimension
  protectrice discrète ("bonne étoile"). Registre : boutique à l'ancienne, léger bond
  dans le temps sans passéisme, modernité conservée.
- Production en autonomie (budget interne, ~2 ans de pratique Adobe/Illustrator).

### Reprise de fonds de commerce — structurant
- Matlo'Fleurs est le **rachat de la boutique secondaire de La Halle aux Fleurs**,
  au **30 rue de Saint-Jean-de-Monts, 85300 Challans**.
- La Halle aux Fleurs **conserve sa boutique principale** (24b bd Viaud) et son domaine
  exact-match `fleurs-challans.com` : elle reste le concurrent dominant, mais l'angle
  n'est pas l'opposition, c'est la **continuité d'un lieu déjà connu**.
- **Passation réglée (2026-08-23, hors périmètre du site)** : téléphone fixe **conservé**
  (on hérite de toutes les citations de l'adresse), fiche Google **recréée** et en attente
  de l'ouverture, ancienne fiche + NAP du cédant supprimés.
- ⚠️ **Conséquence** : fiche recréée = **0 avis au lancement**. Bloc « Avis Google » masqué
  jusqu'à 5 avis ; collecte prioritaire dès le jour 1 (QR code comptoir + ticket).

### Périmètre des prestations (confirmé 2026-08-23)
- **Mariage : bouquets uniquement** (bouquet de mariée, boutonnières, fleurs des mariés).
  **Pas de décoration de lieu.** Ne jamais l'écrire ni le laisser entendre.
- **Livraison** : en propre (Challans + ~20 km) **et** envoi partout en France via
  **Florajet**. Les deux sont des arguments distincts à afficher.
- **Ateliers floraux : reportés**, pas au lancement. Idée conservée.
- Univers produits : bouquets · compositions florales · fleurs séchées · plantes ·
  décoration & accessoires. Occasions : mariage · deuil · événements · abonnements.

### Stratégie de mise en ligne — la page d'accueil sort SEULE
- Ouverture = `/` + `/mentions-legales` + `/politique-de-confidentialite`. **`/deuil` ne
  part PAS au lancement** (tranché 2026-08-30). Les autres pages s'ajoutent une par une.
- **Navigation par ancres** au lancement (`#creations` `#occasions` `#deuil` `#atelier`
  `#boutique` `#contact`), remplacées par les URLs quand les pages existent. Ancres figées.
  `#deuil` ajoutée le 2026-08-30, elle pointe sur la bande deuil de l'accueil.
- **Aucun lien vers une page inexistante. Aucune page vide publiée.**
- Chaque section de l'accueil se conçoit en **2 variantes Figma** : `autonome` (elle fait
  le travail de la page absente) et `teaser` (la page existe, la section raccourcit).
- Détail complet : `docs/04-page-accueil.md`, **partie E**.

### Trajectoire produit (3 temps)
1. **T1 — maintenant** : vitrine + contact/devis. Pas de paiement en ligne.
2. **T2** : ajout du click & collect.
3. **T3** : e-commerce complet (achat + livraison + click & collect).

→ Toute décision d'architecture prise en T1 doit rester compatible T2/T3
  (URLs, taxonomie produits, structure des fiches, données structurées).

### Assets business existants
- Nom de domaine **réservé**
- Fiche **Google Business Profile** créée
- Comptes **réseaux sociaux** créés (Instagram / Facebook)

## Identité visuelle (logo validé)
- **Logo** vertical : rose ancienne stylisée au trait (masses pleines crème sur fond nuit),
  flanquée de deux étoiles à 4 branches (diagonale haut-gauche / bas-droite), au-dessus du
  logotype "Matlo'Fleurs" + baseline "Artisan Fleuriste". Apostrophe conservée.
- **Couleurs (identité / print)** : bleu nuit `#1D1E33` · crème `#F5F0E8` ·
  ardoise `#243A47` (référence deuil).
- **Couleurs (web — relevé Figma 2026-08-23, fait foi)** : **crème dominante** (~70 %),
  bleu nuit `#1D1E33` (~25 %, encre et aplats), **sauge `#5C6B4F`** (~5 %, accent unique).
  Le **bronze `#B8965A` est abandonné**, et la sauge web n'est PAS `#8A9A82`.
  Ardoise `#243A47` en réserve pour la page `/deuil`.
  **Crème web relevé sur la maquette : `#F3EDE1`** (≠ `#F5F0E8` de l'identité print).
  Les deux existent, la valeur à retenir pour le web reste à figer.
- **Typo (web — relevé Figma, fait foi)** : **Cinzel** (titres + boutons, capitales) ·
  **Updock** (ligne d'accent, ≥ 48 px, 2 occurrences max par page) ·
  **Cormorant Garamond** (corps, ≥ 20 px) · **IM Fell DW Pica** (sur-titres, micro-labels).
  **Inter n'est pas utilisée** (contrairement au cadrage initial).
- **Motif signature** : l'**arche** (double filet nuit + sauge, sommet arrondi). Utilisée
  partout où il y a une image de création ou de personne, nulle part ailleurs.
- **Principe** : identité graphique sobre, la couleur vient des fleurs.
- **Règle de com'** : les deux étoiles ont une double lecture. Seul le sens public
  (qualité / bonne étoile) est communicable. Le sens intime n'est **jamais** explicité,
  ni dans les textes du site, ni dans aucun livrable client.

## État actuel
- **Phase** : contenus de la page d'accueil rédigés (`docs/05-contenus-accueil.md`).
  Reste à reporter les textes dans Figma, corriger la maquette, puis développer.
  Cadrage terminé (`docs/00` à `docs/03`), spécification dans `docs/04-page-accueil.md`.
- **Branche principale** : n/a (git non initialisé)

## Règles de travail
<!-- Ces règles sont OBLIGATOIRES. Claude doit les consulter AVANT toute implémentation. -->

### Implémentation
- Toujours implémenter de manière incrémentale : une étape → tests → validation → étape suivante
- Ne JAMAIS livrer un gros batch de modifications multi-fichiers sans validation intermédiaire
- Quand tu implémentes une feature, écris les tests AVANT l'implémentation (TDD)

### Debugging
- Ne JAMAIS sauter directement sur un fix. D'abord diagnostiquer :
  1. Ajouter du logging/observabilité au point de défaillance
  2. Lire les valeurs réelles
  3. Lister les causes possibles par ordre de probabilité
  4. Seulement ensuite proposer un fix
- Si un premier fix ne fonctionne pas, STOP : reprends le diagnostic depuis zéro au lieu
  d'enchaîner les hypothèses

### Environnement
- Figma (maquette courante) :
  https://www.figma.com/design/FTnTb3ln4a9YBQCYqCpxUD/Matlo-fleurs?node-id=297-31806
  Frame `Homepage` = **297:31806**, 1440 × 6424, 11 blocks, desktop uniquement.
  L'ancien frame 259:1083 est périmé, ne plus s'y référer.
- [2026-08-30] Figma nomme les calques texte d'après leur contenu : `get_metadata` suffit
  à récupérer la copy d'une page, `get_design_context` est inutilement coûteux sur une
  page longue. Pour les couleurs de fond, échantillonner les pixels d'un screenshot.
- Chantier design prioritaire hors-repo : système complet de déclinaisons du logo
  (vertical, horizontal, réduit, submark, monogramme, icône) + versions chromatiques.
- Skills marketing installées sur ce projet : `content-strategy`, `customer-research`,
  `marketing-plan`, `marketing-psychology`, `site-architecture`.

## Known Pitfalls
- [2026-08-23] **Updock est fragile en petit format** → définir un seuil de taille minimale
  et basculer sur monogramme/icône en dessous. Ne jamais l'utiliser en texte courant
  ni en navigation.
- [2026-08-23] L'IA générative (Gemini, Midjourney) s'est révélée **inexploitable pour
  produire** le logo — utile uniquement pour explorer des concepts.
- [2026-08-23, confirmé 2026-08-30] **Les variables Figma ne sont liées à rien** sur le
  frame Homepage, vérifié aussi sur le frame courant 297:31806 : `get_variable_defs`
  renvoie `{}`. Couleurs et typos en dur. Les rebrancher AVANT de produire d'autres blocks.
- [2026-08-23] **Cormorant Garamond Regular est trop fin** pour du texte long face à une
  cible senior. Passer en Medium (500) ≥ 20 px, ou basculer sur EB Garamond / Cormorant
  Infant pour les pages longues.
- [2026-08-23] **Conflit NAP** : `fleurs-challans.com` affiche encore le 30 rue de
  Saint-Jean-de-Monts comme sa seconde boutique. Tant que ce n'est pas retiré partout,
  Google voit deux commerces à la même adresse.
- [2026-08-30] La maquette est dessinée en état **`teaser`** alors que c'est **`autonome`**
  qui sort au lancement. Vérifier l'état d'une section avant de la juger complète : une
  section qui paraît finie peut être la mauvaise des deux variantes.
- [2026-08-30] **Blanc pur `#FFFFFF` hors palette** sur 4 blocks de la maquette
  (`block-services`, `block-occasions` liste, les deux `block-contact`). Le blanc pur
  n'existe nulle part dans l'identité, il casse la règle « crème dominante 70 % ».
- [2026-08-30] **`docs/02-blocks-et-maquette.md` n'a jamais été corrigé** sur « mariage =
  bouquets uniquement » : ses blocks B06, B11, B21 et sa FAQ proposent encore décoration
  de lieu, arche, voiture et vases. Ne pas s'en servir tel quel pour `/mariage`.
- [2026-08-23] Le **deuil** est un parcours à part : ton, couleurs (ardoise `#243A47`),
  rapidité de contact et absence de tout ressort commercial. Ne jamais le traiter
  comme une occasion parmi d'autres dans les templates.

## Décisions techniques
- [2026-08-23] Direction "deux anges portant une fleur" **abandonnée** (trop complexe à
  exécuter en autonomie sans tomber dans le générique) ; sa symbolique est encodée dans
  les deux étoiles.
- [2026-08-23] La fleur signature est assumée comme une **rose ancienne**, pas une pivoine.
- [2026-08-23] **Choix de stack reporté** : on produit d'abord l'architecture, les contenus
  et le SEO (indépendants de la techno), la stack sera tranchée ensuite.
- [2026-08-30] **`docs/05-contenus-accueil.md` fait foi sur les textes** de la page
  d'accueil (node Figma en regard de chaque texte). `docs/04-page-accueil.md` reste la
  source sur la structure, les deux états de section et le système de design.
- [2026-08-30] **Le deuil sort de la ligne de cartes** de la section Occasions : bande
  pleine largeur sur fond nuit, lexique des 5 compositions (gerbe, coussin, raquette,
  couronne, dessus de cercueil), lieux de livraison, téléphone en clair ≥ 32 px.
  Conséquence directe du fait que `/deuil` ne part pas au lancement.
- [2026-08-30] **Les 3 blocks hors spec de la maquette sont conservés** (bandeau nuit,
  livraison, réseaux sociaux). Trois conséquences actées : le bandeau nuit est requalifié
  en **bandeau signature** Updock (il répétait le H2 situé en dessous), `de la vie` repasse
  en **Cinzel italique** pour tenir le budget de 2 Updock par page, et la **zone de
  livraison quitte le block boutique** pour ne vivre que dans le block livraison.

## Bugs connus / Points d'attention
- [2026-08-30] **Divergence horaires du samedi** : la maquette affiche
  `9h-13h · 14h30-19h`, `docs/04` écrit `9h-19h`. À trancher, ça part dans le schema et
  la fiche Google où l'incohérence est visible publiquement.
- [2026-08-30] **Divergence liste des communes desservies** : 12 dans `docs/03`, 10 dans
  `docs/04` (manquent Saint-Jean-de-Monts et Saint-Hilaire-de-Riez).
- [2026-08-30] **Contradiction interne à `docs/04`** : Cormorant à 18 px sur les cartes
  création et 17 px sur les cartes occasion, alors que la même partie D pose 20 px comme
  minimum absolu.
- [2026-08-30] **Bloquants contenu** (placeholders explicites dans `docs/05`) : numéro de
  téléphone réel (7 emplacements), prénom de la fleuriste, horaires du samedi, liste des
  communes, URLs Instagram et Facebook.

## Conventions de code
<!-- À remplir manuellement ou via /mem -->

## Historique récent
<!-- /mem ajoute ici, archivage auto après 30 jours -->
- [2026-08-30] Landing finalisée sur Figma (frame 297:31806, 11 blocks). Relevé complet,
  contenus rédigés block par block dans `docs/05-contenus-accueil.md`, plus 22
  recommandations sur la maquette. Prochaine étape : report dans Figma, puis développement.
