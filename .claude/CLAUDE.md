# CLAUDE.md — Matlo'Fleurs

## Projet
- **Nom** : matlo_fleurs (marque : Matlo'Fleurs)
- **Chemin** : /Users/mat/dev/matlo_fleurs
- **Type** : Site web de boutique de fleuriste artisanale (vitrine locale, évolutive e-commerce)
- **Stack** : **Astro 7 statique** · CSS natif avec tokens · endpoint PHP pour le
  formulaire · déploiement rsync SSH sur Infomaniak mutualisé
- **Repo** : https://github.com/TheVisitor-coding/matlo_fleurs
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
- **Couleurs (web — relevé Figma, fait foi)** : **blanc `#FFFFFF`** (fond de page, 5 blocks) ·
  **crème `#F3EDE1`** (fond de section : header, hero, atelier, livraison) ·
  **nuit `#1D1E33`** (encre, aplats, bandeau, pied de page) ·
  **sauge `#5C6B4F`** (accent unique sur fond clair) ·
  **sauge claire `#97AC96`** (accent sur fond nuit, la sauge normale n'y contraste pas) ·
  **taupe `#9A9182`** (filets, libellés de réseaux) · **gris `#D2D2D2`** (baseline du pied
  de page, seule valeur froide). Ardoise `#243A47` en réserve pour `/deuil`.
  Le **bronze `#B8965A` est abandonné**, et la sauge web n'est PAS `#8A9A82`.
  **Crème web figée à `#F3EDE1`**, le print garde `#F5F0E8` : les deux coexistent.
- **Typo (web — relevé Figma, fait foi)** : **5 familles**. **Cinzel** (titres + boutons) ·
  **Tangerine** (ligne d'accent du hero et du bandeau) · **Updock** (logotype uniquement) ·
  **Cormorant Garamond** Medium (corps) · **IM Fell DW Pica** (sur-titres, micro-labels).
  **Inter n'est pas utilisée.** Cinzel n'a **pas d'italique** et rend ses minuscules en
  petites capitales : ne jamais lui appliquer `text-transform: uppercase`.
- **Motif signature** : l'**arche** (double filet nuit + sauge). Rayon **constant à 180 px**,
  pas proportionnel. Ratios distincts : hero 380/501, carte 361/383. Utilisée partout où il
  y a une image de création ou de personne, nulle part ailleurs. La maquette contredit sa
  propre règle sur la photo de l'atelier, qui est un rectangle arrondi.
- **Principe** : identité graphique sobre, la couleur vient des fleurs.
- **Règle de com'** : les deux étoiles ont une double lecture. Seul le sens public
  (qualité / bonne étoile) est communicable. Le sens intime n'est **jamais** explicité,
  ni dans les textes du site, ni dans aucun livrable client.

## État actuel
- **Phase** : **page d'accueil intégralement intégrée** (12 blocks) plus mentions légales,
  politique de confidentialité, 404 et confirmation d'envoi. Build propre, 13 tests au vert.
  Couche d'animation posée : entrée du hero, révélation au défilement, micro-interactions,
  signature manuscrite tracée.
  **Le site n'est PAS publiable** : voir les 4 bloquants durs dans « Bugs connus ».
- **Branche principale** : `main`

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
  Frame `Homepage` = **297:31806**, 1440 × 6468, 12 blocks, desktop uniquement.
  L'ancien frame 259:1083 est périmé, ne plus s'y référer.
- [2026-08-30] Figma nomme les calques texte d'après leur contenu : `get_metadata` suffit
  à récupérer la copy d'une page, `get_design_context` est inutilement coûteux sur une
  page longue. Pour les couleurs de fond, échantillonner les pixels d'un screenshot.
- [2026-08-30] **PHP absent de la machine de dev** : `public/api/contact.php` n'est ni
  lintable ni testable en local. Il exige **PHP 8.1 minimum** (`never`, `str_contains`),
  à sélectionner dans le manager Infomaniak. Même remarque pour `.htaccess`, qui demande
  Apache : la règle sans slash final n'est vérifiable que sur une préversion.
- [2026-08-30] **`sharp` est disponible via Astro et Chrome est installé.** Aucune
  dépendance à ajouter pour rastériser un SVG ou capturer une page. `npm run og` régénère
  la carte de partage depuis `/og` avec les vraies fontes ; **elle contient l'adresse**,
  donc tout changement de NAP demande de la relancer.
- Chantier design prioritaire hors-repo : système complet de déclinaisons du logo
  (vertical, horizontal, réduit, submark, monogramme, icône) + versions chromatiques.
- [2026-08-31] **`npm run signature`** régénère la signature du hero depuis
  `scripts/tangerine-glyphdata.json`. Exige `tegaki`, devDependency de **44 Mo** jamais
  livrée au navigateur. Les SVG étant committés, ni le build ni le déploiement n'en
  dépendent. Le script refuse de tourner si un caractère du texte manque au bundle.
- Skills marketing installées sur ce projet : `content-strategy`, `customer-research`,
  `marketing-plan`, `marketing-psychology`, `site-architecture`.

## Known Pitfalls
- [2026-08-31] **Tegaki exige un bundle personnalisé pour du texte français.** Les
  bundles livrés avec le paquet ne contiennent que **88 glyphes ASCII** : `ç`, `é`, `à`
  ne produisent aucun tracé, et le composant client les dessine d'un `ctx.fillText` sans
  paramètre de temps, donc pleins dès la première frame. `createBundle` attend des
  glyphes **déjà squelettisés** : l'API publiée ne sait pas les extraire d'un TTF, la
  squelettisation ne vit que dans le studio, en navigateur. Le bundle du projet est donc
  généré au studio (police Tangerine, jeu de caractères **saisi à la main**) et figé dans
  `scripts/tangerine-glyphdata.json`. **Le préréglage du studio est ASCII : un export fait
  sans toucher au champ `Characters` perd les accents sans le signaler.**
- [2026-08-31] **Sans `timing.stagger`, Tegaki étale « façonnées à la main » sur 9,5 s.**
  Le chevauchement des glyphes (`advance: 0.1`, `duration: 0.4`) la ramène à 2,3 s.
- [2026-08-31] **Les captures Chrome en `--virtual-time-budget` mentent sur les
  animations.** L'horloge reste figée pour toute transition déclenchée après le
  chargement : la page paraît vide alors qu'elle est correcte. Vérifier une animation
  passe par le protocole DevTools avec une attente réelle, jamais par le temps virtuel.
- [2026-08-23] **Updock est fragile en petit format** → définir un seuil de taille minimale
  et basculer sur monogramme/icône en dessous. Ne jamais l'utiliser en texte courant
  ni en navigation.
- [2026-08-23] L'IA générative (Gemini, Midjourney) s'est révélée **inexploitable pour
  produire** le logo — utile uniquement pour explorer des concepts.
- [2026-08-30] **`get_variable_defs` renvoie `{}`** sur le frame 297:31806 alors que les
  variables existent bien côté client : elles ne sont pas accessibles via MCP. Ne pas
  attendre de les lire, coder les tokens depuis le relevé de `get_design_context`.
- [2026-08-23] **Cormorant Garamond Regular est trop fin** pour du texte long face à une
  cible senior. Passer en Medium (500) ≥ 20 px, ou basculer sur EB Garamond / Cormorant
  Infant pour les pages longues.
- [2026-08-23] **Conflit NAP** : `fleurs-challans.com` affiche encore le 30 rue de
  Saint-Jean-de-Monts comme sa seconde boutique. Tant que ce n'est pas retiré partout,
  Google voit deux commerces à la même adresse.
- [2026-08-30] La maquette est dessinée en état **`teaser`** alors que c'est **`autonome`**
  qui sort au lancement. Vérifier l'état d'une section avant de la juger complète : une
  section qui paraît finie peut être la mauvaise des deux variantes.
- [2026-08-30] **Un frame Figma sans `bg` repose sur le canevas, qui est blanc.** Il
  n'hérite pas du fond de son parent visuel. « Aucun `bg` » est donc une valeur, pas un
  trou à combler. Relever les fonds bloc par bloc avant de choisir la couleur du `body` :
  l'hypothèse inverse a produit six corrections erronées dispersées dans le code.
- [2026-08-30] **Cinzel rend ses minuscules en petites capitales** et n'a pas d'italique.
  La maquette exploite la casse mixte pour obtenir une grande initiale suivie de petites
  capitales : un `text-transform: uppercase` détruit cette hiérarchie sans qu'aucun outil
  ne le signale. Vérifier les styles réellement disponibles dans les métadonnées de l'API
  Fonts avant d'écrire une décision typographique dans une spec.
- [2026-08-30, étendu 2026-08-31] **Astro supprime des espaces du texte produit, dans
  deux cas distincts.** Devant une expression en fin de ligne : `... km :\n  {liste}`
  produit `km :Sallertaine`. Et **entre deux éléments frères** : le HTML sort `</span><span`,
  ce qui collait « florales,façonnées » dans le `<h1>` du hero. Correctifs : assembler les
  phrases interpolées dans le frontmatter, et insérer un `{' '}` explicite entre deux
  éléments. Dans les deux cas, contrôler le texte visible de la page produite.
- [2026-08-30] **`astro:assets` avec `widths` seul laisse l'original en `src` de repli.**
  Un PNG source de 5,9 Mo sortait un fallback de 380 Ko. Toujours passer `width` en plus.
- [2026-08-30] **`docs/02-blocks-et-maquette.md` n'a jamais été corrigé** sur « mariage =
  bouquets uniquement » : ses blocks B06, B11, B21 et sa FAQ proposent encore décoration
  de lieu, arche, voiture et vases. Ne pas s'en servir tel quel pour `/mariage`.
- [2026-08-23] Le **deuil** est un parcours à part : ton, couleurs (ardoise `#243A47`),
  rapidité de contact et absence de tout ressort commercial. Ne jamais le traiter
  comme une occasion parmi d'autres dans les templates.

## Décisions techniques
- [2026-08-31] **Animations en CSS, JavaScript réduit à l'observation.** Les tokens de
  motion vivent dans `tokens.css` comme les autres. La révélation au défilement est une
  règle globale `[data-reveal]` **préfixée par `.js`** : sans JavaScript aucune opacité
  nulle ne s'applique, la page reste lisible. Le décalage entre cartes passe par
  `--reveal-index` posé au build, donc sans JavaScript supplémentaire. Le hero n'utilise
  aucun observer, il est au-dessus de la ligne de flottaison. `.hero__visuel` n'est jamais
  animé : l'arche porte `fetchpriority=high`, c'est le candidat LCP.
- [2026-08-31] **La signature « façonnées à la main » est un SVG tracé par Tegaki**,
  régénéré par `npm run signature` (comme `npm run og`), servi en `<img>` depuis `public/`.
  Son animation est en **SMIL**, que le CSS n'atteint pas : le mouvement réduit passe par
  une seconde image déjà tracée, choisie par `<picture><source media>`. Le texte réel reste
  dans le `<h1>` en `.hors-ecran`, l'image est décorative. `tegaki` est en devDependency
  (**44 Mo**, jamais livrée au navigateur) et n'est nécessaire qu'à la régénération.
- [2026-08-23] Direction "deux anges portant une fleur" **abandonnée** (trop complexe à
  exécuter en autonomie sans tomber dans le générique) ; sa symbolique est encodée dans
  les deux étoiles.
- [2026-08-23] La fleur signature est assumée comme une **rose ancienne**, pas une pivoine.
- [2026-08-30] **Stack tranchée : Astro 7 statique.** Sur mutualisé, Next se réduirait à
  `output: 'export'`, ce qui désactive Image Optimization, ISR, Server Actions, middleware
  et route handlers : on porterait un framework serveur pour en utiliser une fraction.
  **CSS natif plutôt que Tailwind** : les tokens CSS *sont* les variables Figma, une seule
  source de vérité nommée pareil des deux côtés.
- [2026-08-30] **Trajectoire commerce : Stripe en V2, Shopify headless en V3.** L'API
  Storefront s'appelle depuis le navigateur, le panier vit chez Shopify, le checkout est
  hébergé par Shopify : le site reste statique et **on ne quitte jamais le mutualisé**.
  **Medusa écarté** (process Node permanent + Postgres + Redis, impossible sur mutualisé).
  Migrer le site entier vers Shopify est écarté : ses URLs imposées casseraient `docs/01`.
  Le critère décisif est l'admin, pas la technique : la fleuriste doit gérer produits,
  stock et commandes elle-même.
- [2026-08-30] **Blanc en fond de page, crème en fond de section.** Header, hero, atelier
  et livraison portent le crème ; bandeau et pied de page le nuit ; créations, occasions,
  boutique, réseaux et CTA final restent sur le blanc du `body`.
- [2026-08-30] **`<a>` si navigation, `<button>` sinon.** Un `href` (ancre, `tel:`, URL
  externe) est un lien ; sans destination c'est un bouton, `disabled` tant que le numéro
  réel manque. Jamais de `<span>` stylé en bouton.
- [2026-08-30] **Déploiement manuel uniquement**, simulation rsync activée par défaut.
  Un `push` automatique publierait un site non publiable. `--delete` exclut `.well-known`,
  où Infomaniak dépose les jetons de renouvellement de certificat.
- [2026-08-30] **`docs/05-contenus-accueil.md` fait foi sur les textes** de la page
  d'accueil (node Figma en regard de chaque texte). `docs/04-page-accueil.md` reste la
  source sur la structure, les deux états de section et le système de design.
- [2026-08-30, révisé] **Le deuil est la carte 2 de la ligne Occasions**, pas une bande
  pleine largeur. Arbitré par le client contre la décision précédente, qui prévoyait une
  bande sur fond nuit avec le lexique des 5 compositions. Les 4 occasions intégrées sont
  Mariage, Deuil, Évènement, Abonnement, sur photo avec dégradé. L'ancre `#deuil` pointe
  sur cette carte. Le lexique des compositions reste à replacer, probablement sur `/deuil`.
- [2026-08-30] **Les 3 blocks hors spec de la maquette sont conservés** (bandeau nuit,
  livraison, réseaux sociaux). Trois conséquences actées : le bandeau nuit est requalifié
  en **bandeau signature** (il répétait le H2 situé en dessous), `de la vie` reste en
  **Cinzel normal avec une couleur différente** (Cinzel n'a pas d'italique), et la **zone de
  livraison quitte le block boutique** pour ne vivre que dans le block livraison.

## Bugs connus / Points d'attention
- [2026-08-30] **4 bloquants durs de publication.** (1) Mentions légales incomplètes :
  6 marqueurs `[À COMPLÉTER]` visibles publiquement, 4 sur la confidentialité. Manquent
  SIRET, forme juridique, TVA, adresse de contact, nom du responsable, médiateur.
  (2) Formulaire mort : `DESTINATAIRE` est un placeholder, le handler renvoie un 503.
  (3) Droits d'image : la carte de la boutique est une **capture Google Maps**, les
  13 photos sont des placeholders de maquette à provenance non établie, et l'illustration
  livraison affiche `M Fleurs` sur l'enseigne. (4) Téléphone absent : 6 boutons `disabled`,
  aucun `tel:`, pas de `telephone` dans le JSON-LD.
- [2026-08-30] **Block réseaux : 6 fois la même photo.** `docs/05` interdit sa mise en
  ligne sous 6 vraies publications. Monté uniquement pour valider la mise en page.
- [2026-08-30] **Promesse « 24 h ouvrées »** écrite dans la confirmation d'envoi, jamais
  validée. À confirmer ou à retirer avant publication.
- [2026-08-30] La maquette n'existe **qu'en desktop**. Le responsive est construit en trois
  paliers (1023, 700, 560 px) sans référence visuelle : à revoir avec une passe mobile.
  Les amplitudes d'animation et la largeur de la signature en font partie, aucune des deux
  n'a été contrôlée ailleurs qu'en 1440.

## Conventions de code
- **Les commentaires n'expliquent jamais ce que fait le code.** Uniquement le « pourquoi »
  non déductible : une contrainte externe, un piège, une décision contre-intuitive.
- **Nommage en français**, aligné sur le vocabulaire du projet et de la maquette
  (`BarreInfo`, `Arche`, `TitreSection`, `plages`, `surtitre`).
- **Les tokens CSS sont les variables Figma** : mêmes noms des deux côtés, pas de couche
  de traduction. Tout vit dans `src/styles/tokens.css`. **Seuls les tokens de motion font
  exception** : la maquette ne décrit aucun mouvement, ne pas leur chercher d'équivalent.
- **Une donnée affichée plus d'une fois vit dans `src/data/site.ts`.** L'adresse dérive
  d'une seule chaîne source, condition de l'identité caractère pour caractère avec la
  fiche Google.
- **Tests avec `node:test`**, sans dépendance ajoutée. `npm test` lit le TypeScript
  directement. Toute donnée dupliquée dans un jeu de test porte une garde anti-dérive.
- **Styles scopés dans les composants Astro**, pas de feuille globale hors `base.css`.

## Historique récent
<!-- /mem ajoute ici, archivage auto après 30 jours -->
- [2026-08-31] **Animations de la page d'accueil.** Socle de motion, révélation au
  défilement sur 16 cibles avec garde `.js`, cascade d'entrée du hero, micro-interactions
  limitées aux éléments réellement cliquables. La ligne « façonnées à la main » est un SVG
  tracé par Tegaki en 2,3 s, à partir d'un bundle de glyphes accentués fabriqué en pilotant
  le studio en CDP. 13 tests, build propre. Log :
  `CC-Session-Logs/2026-08-31_animations-et-signature-manuscrite.md`.
- [2026-08-30] **Stack tranchée et landing intégrée.** Astro 7 statique sur Infomaniak
  mutualisé, trajectoire Stripe puis Shopify headless. Les 12 blocks de l'accueil relevés
  bloc par bloc dans Figma et intégrés, plus 4 pages annexes, formulaire PHP, favicon,
  og:image reproductible et workflow de déploiement manuel. 13 tests, build propre.
  Le site n'est pas publiable : 4 bloquants durs. Log :
  `CC-Session-Logs/2026-08-30_stack-et-integration-landing.md`.
- [2026-08-30] Landing finalisée sur Figma (frame 297:31806, 11 blocks). Relevé complet,
  contenus rédigés block par block dans `docs/05-contenus-accueil.md`, plus 22
  recommandations sur la maquette.
