---
type: session-log
date: 2026-08-31
project: matlo_fleurs
tags: [session, astro, css, animation, tegaki, svg, accessibilite, cdp, chrome-headless, performance]
---

# Session : 2026-08-31 — Animations de la page d'accueil et signature manuscrite

## Quick Reference
**Sujets :** socle de motion (tokens, `prefers-reduced-motion`, révélation au défilement) · chorégraphie d'entrée du hero · micro-interactions · signature manuscrite « façonnées à la main » tracée par Tegaki, avec fabrication d'un bundle de glyphes accentués en pilotant le studio en CDP.
**Résultat :** la page d'accueil est animée de bout en bout, la ligne manuscrite s'écrit en 2,3 s avec le vrai ductus de Tangerine, accents compris. Build propre, 13 tests au vert. Le site reste non publiable pour les 4 bloquants durs antérieurs, inchangés.

## Ce qui a été fait

- **Tokens de motion** créés dans `tokens.css` (`--duree-courte/moyenne/longue`, `--easing-sortie`, `--decalage-reveal`) ; les deux `0.25s` en dur de `Header.astro` passent sur `--duree-moyenne`.
- **Garde `prefers-reduced-motion` globale** ajoutée en fin de `base.css`, là où elle passe après les règles qu'elle neutralise. L'ancienne ne couvrait que `scroll-behavior`.
- **Révélation au défilement** : utilitaire global `[data-reveal]` **préfixé par `.js`**, un `IntersectionObserver` unique dans `Base.astro`, décalage entre cartes par `--reveal-index` posé au build. 16 cibles réparties sur 7 composants.
- **`TitreSection` accepte désormais des attributs arbitraires** (`...attrs` sur le `<h2>`), ce qui en fait une cible de révélation partout où il est monté.
- **Chorégraphie d'entrée du hero** en CSS pur, cascade de 0 à 400 ms. `.hero__visuel` volontairement exclu.
- **Micro-interactions** : transitions sur les états de survol de `Bouton`, `Header`, `PiedDePage`, `BarreInfo`, qui existaient déjà mais étaient instantanés.
- **Signature manuscrite** : bundle Tegaki personnalisé fabriqué en pilotant le studio en CDP, `scripts/signature.mjs` + `npm run signature`, deux SVG dans `public/`, servis par `<picture>`.
- **`.claude/CLAUDE.md` complété** : 3 pièges, 2 décisions techniques.

## Décisions prises

- **Tegaki en devDependency, pas en dépendance runtime** : le paquet pèse 44 Mo dépaquetés (10 polices embarquées) et est en 0.x. Les SVG sont committés, donc ni le build ni le déploiement n'en dépendent ; seule la régénération l'exige.
- **Signature servie en `<img>` depuis `public/`, pas inlinée** : 20 Ko gzip n'ont rien à faire dans le HTML de la page qui porte le LCP. Le cache `immutable` du `.htaccess` ne vise que `/_astro/`, `public/` retombe sur une heure, ce qui convient à un fichier qui bouge rarement.
- **Mouvement réduit géré par une seconde image** : l'animation de Tegaki est en **SMIL**, que le CSS n'atteint pas. `<picture><source media="(prefers-reduced-motion: reduce)">` sélectionne la version déjà tracée. Un `animation-duration: 0.01ms !important` n'aurait rien arrêté.
- **Le texte réel reste dans le `<h1>`** en `.hors-ecran`, l'image est décorative (`alt=""`) : le titre continue de lire « Des compositions florales, façonnées à la main » pour les moteurs et les lecteurs d'écran.
- **Garde `.js` sur les révélations** : sans JavaScript, aucune règle d'opacité nulle ne s'applique. Sur un site vitrine à cible senior, une page blanche par échec de script est le pire scénario.
- **`.hero__visuel` jamais animé** : l'arche porte `fetchpriority=high`, c'est le candidat LCP, une opacité nulle en retarderait la mesure d'autant.
- **Aucun survol sur les cartes** : `.creations__carte`, `.occasions__carte` et les vignettes `Reseaux` sont des `<li>` **sans lien**. Un effet de survol y promettrait une interactivité inexistante. À reprendre en T2.
- **Transitions de page (`ClientRouter`) écartées** : non demandées, et elles obligeraient à reprendre le script du burger, qui s'exécute une seule fois au chargement.
- **La carte deuil de la ligne Occasions suit le même traitement que les 3 autres** : sur l'accueil c'est une carte de navigation, pas le parcours de deuil. L'interdiction d'animation de `docs/02:403` vise la page `/deuil`.

## Problèmes résolus

- **Problème** : Tegaki ne trace aucun caractère accentué. « façonnées à la main » sortait « fa onn es la main ».
- **Cause** : les bundles livrés avec le paquet ne contiennent que **88 glyphes ASCII**, vérifié dans `dist/fonts/tangerine/bundle.mjs`. Ce n'est pas propre à Tangerine (Caveat donne 0 segment sur `éàçè`) ni à l'encodage (le shell transmet bien l'UTF-8, 22 octets, `argv` intact). Côté composant client, `drawFallbackGlyph` dessine les caractères hors sous-ensemble d'un `ctx.fillText` **sans aucun paramètre de temps** : ils seraient pleins dès la première frame. `createBundle` attend des glyphes **déjà squelettisés**, l'API publiée ne sait pas les extraire d'un TTF.
- **Solution** : fabrication d'un bundle personnalisé au studio, en pilotant le navigateur en CDP (clic sur `Tangerine`, saisie du jeu de caractères dans la zone `Characters`, clic sur `Download Bundle (.zip)`). 13 glyphes, `à ç é` compris.

- **Problème** : le premier bundle fourni par le client souffrait du même défaut, 90 glyphes ASCII.
- **Cause** : le studio conserve son préréglage ASCII et n'avertit de rien. La police était pourtant la bonne : `Tangerine Regular`, 211 points de code, accents présents dans la `cmap`.
- **Solution** : refaire l'export en renseignant le champ `Characters`. Le piège est consigné dans `CLAUDE.md`.

- **Problème** : l'écriture s'étalait sur 9,5 s, inutilisable en entrée de page.
- **Cause** : sans `timing.stagger`, chaque glyphe attend la fin du précédent plus `glyphGap`.
- **Solution** : `timing: { wordGap: 0.08, stagger: { advance: 0.1, duration: 0.4 } }` ramène la ligne à 2,3 s.

- **Problème** : les captures headless montraient des pans de page entièrement blancs et `0/16` éléments révélés. J'ai cru à un bug de l'observer.
- **Cause** : sous `--virtual-time-budget`, l'horloge d'animation de Chrome reste figée pour toute transition **déclenchée après le chargement**. L'attribut `data-vu` était bien posé et la règle CSS résolvait bien vers `opacity: 1` — prouvé en injectant `*{transition:none !important}`, qui faisait passer les mêmes éléments de `0,0,0,0` à `1,1,1,1`.
- **Solution** : vérifier par le protocole DevTools avec une attente réelle. Résultat : `vus=5/16 pleinementVisibles=5`, tout ce qui entre à l'écran atteint l'opacité pleine.

- **Problème** : le `<h1>` produisait « Des compositions florales,façonnées à la main », sans espace.
- **Cause** : Astro supprime l'espace source entre deux éléments frères, le HTML sort `</span><span`. Défaut **antérieur** à cette session, même structure de deux spans.
- **Solution** : un `{' '}` explicite entre les deux. Contrôlé sur le HTML produit.

- **Problème** : `npx` réécrit en `npm run` par le hook, et Chrome refusant de démarrer sur un profil verrouillé.
- **Cause** : réécriture de commande sur le jeton `npx` ; `SingletonLock` résiduel d'une instance précédente.
- **Solution** : chemin absolu vers `npx` ; profil isolé et nettoyage des instances entre deux exécutions.

## Points d'attention

- **`tegaki` ajoute 44 Mo à `node_modules`** et sera téléchargé à chaque `npm ci` de la CI, pour un script lancé très rarement. Arbitrage à trancher : le sortir du `package.json` et documenter `npm i -D tegaki@0.22.1` comme prérequis ponctuel reste possible, les SVG étant committés.
- **La signature animée pèse 20 Ko gzip**, servie au-dessus de la ligne de flottaison. Elle ne bloque pas le LCP (l'arche reste le candidat) et l'animation part de rien, donc un chargement légèrement différé ne se voit pas. C'est néanmoins le poste le plus lourd de la page après les photos.
- **Toute modification du texte de la signature impose de repasser par le studio** pour y générer les caractères manquants. `scripts/signature.mjs` refuse de tourner si un caractère manque, plutôt que de produire une ligne trouée en silence.
- **Le responsive n'a pas été contrôlé** : la maquette n'existe qu'en desktop, les amplitudes et la largeur de la signature méritent une passe à 700 et 560 px sur un vrai appareil.
- **Les 4 bloquants durs de publication sont inchangés** : mentions légales trouées, formulaire sans destinataire, droits d'image, téléphone absent.
- **`--virtual-time-budget` est à proscrire** pour toute vérification d'animation sur ce projet.

## Tâches en suspens

- [ ] Passe responsive fine des animations (1023, 700, 560 px), signature comprise
- [ ] Trancher le maintien de `tegaki` en devDependency ou son passage en prérequis ponctuel
- [ ] Mesurer le LCP avant/après sur `/` avec Lighthouse, en conditions réseau réalistes
- [ ] Ajouter les survols de cartes quand elles deviendront cliquables (T2, click & collect)
- [ ] Vérifier `contact.php` et `.htaccess` sur une préversion Infomaniak (toujours jamais exécutés)
- [ ] Les 4 bloquants durs de publication, inchangés depuis le 30/08

## Fichiers impactés

- `src/styles/tokens.css` — bloc de tokens de motion
- `src/styles/base.css` — utilitaire `[data-reveal]` sous `.js`, garde `prefers-reduced-motion` globale en fin de fichier
- `src/layouts/Base.astro` — script `is:inline` posant la classe `js`, `IntersectionObserver` unique en fin de `body`
- `src/components/Hero.astro` — cascade d'entrée, `<picture>` de la signature, `.hero__signature`, correction de l'espace du `<h1>`
- `src/components/TitreSection.astro` — transmission des attributs arbitraires au `<h2>`
- `src/components/Creations.astro`, `Occasions.astro`, `BandeauSignature.astro`, `BlockTexteImage.astro`, `Boutique.astro`, `CtaFinal.astro` — pose de `data-reveal` et `--reveal-index`
- `src/components/Bouton.astro`, `Header.astro`, `PiedDePage.astro`, `BarreInfo.astro` — transitions de survol, tokens de durée
- `scripts/signature.mjs` — génération des deux SVG, garde sur les glyphes manquants
- `scripts/tangerine-glyphdata.json` — squelettes de tracé des 13 glyphes, issus du studio
- `public/signature.svg` (101 Ko, 20 Ko gzip) · `public/signature-statique.svg` (74 Ko, 13 Ko gzip)
- `package.json` — script `signature`, devDependency `tegaki@0.22.1`
- `.claude/CLAUDE.md` — 3 pièges et 2 décisions techniques

---

## Log détaillé

### Cadrage

Départ en mode plan. Deux explorations parallèles ont relevé l'état du terrain : **zéro `@keyframes` dans tout le projet**, une seule `transition` (le menu burger), aucun token de motion, un seul `<script>` client, `prefers-reduced-motion` présent mais ne couvrant que `scroll-behavior`. Deux contraintes trouvées dans les docs : `docs/02:560` impose le respect de `prefers-reduced-motion`, `docs/02:403` interdit toute animation sur le parcours `/deuil`.

Trois arbitrages posés au client : technique d'écriture, intensité (« sobre » retenue : 16 px, 500 ms, décalage 80 ms), périmètre (hero + défilement + micro-interactions, transitions de page écartées). Sur la technique, le client a orienté vers `gkurt/tegaki`.

### Vérification de Tegaki

Conformément à la règle « vérifier un outil externe avant de promettre un livrable » : paquet réel, `tegaki@0.22.1`, MIT, zéro dépendance, **44,6 Mo dépaquetés**, CLI `tegaki`. Tangerine fait partie des polices intégrées. Le CLI a produit un SVG auto-dessinant, technique confirmée : un `<mask>` porté par un tracé animé en `stroke-dashoffset` (**SMIL**, pas de CSS), révélant des `<line>` à épaisseur variable.

La rasterisation via `sharp` a révélé le blocage : « fa onn es la main ». Diagnostic méthodique plutôt que correctif immédiat — encodage écarté (22 octets, `argv` intact), spécificité à Tangerine écartée (Caveat donne 0 segment sur `éàçè`), puis lecture directe de `bundle.mjs` : **88 glyphes ASCII**. `drawFallbackGlyph` lu dans les sources : `ctx.fillText` sans paramètre de temps.

Le socle (tokens, garde, révélation, micro-interactions, cascade du hero) a été livré pendant ce temps, avec un balayage à l'encre CSS en remplacement provisoire de la ligne manuscrite : masque en dégradé glissant mot par mot, durée proportionnelle à la longueur du mot.

### Fabrication du bundle

Le client a fourni un export du studio : `bundle.ts` + `glyphData.json` + `unknown.ttf`. Contrôle : **90 glyphes, toujours ASCII**. Parsing manuel de la table `name` du TTF : `Tangerine Regular`. Parsing de la `cmap` : 211 points de code, `à ç é` **présents dans la police**. Le studio avait donc gardé son préréglage.

Plutôt qu'un quatrième aller-retour, le studio a été piloté en CDP. Reconnaissance de l'interface par téléchargement du chunk `GeneratorApp.CrjdnA5r.js` (le `component-url` de l'`astro-island`), qui a livré les libellés : bouton `Tangerine`, bloc `Characters` avec zone de texte libre et bouton `Select all available`, bouton `Download Bundle (.zip)` — à ne pas confondre avec `Export`, qui concerne l'aperçu et sur lequel j'ai perdu une tentative.

Deux échecs de démarrage de Chrome (`SingletonLock` résiduel) ont imposé un nettoyage des instances et un profil isolé ; le script a été réécrit proprement après trop de correctifs empilés. Séquence finale : clic `Tangerine`, attente 10 s, saisie de `façonnées à la main` dans la première `textarea` via le setter natif plus un événement `input` (React contrôlé), attente 25 s de squelettisation, clic sur le téléchargement. ZIP de 34,8 Ko, 13 glyphes, aucun manquant.

### Réglage et intégration

`textToSvg` avec le bundle personnalisé : rendu complet et fidèle, cédille, accent aigu, accent grave. Durée par défaut mesurée à **9,49 s** en additionnant `begin + dur` sur les `<animate>` — bien trop lent, confirmé visuellement (à 2,6 s on n'était qu'à « faço »). `TimelineConfig` a fourni le levier : `stagger.advance` et `stagger.duration`. Trois variantes mesurées, `0.1 / 0.4` retenu à 2,34 s.

Vérification que **SMIL tourne bien dans une balise `<img>`** avant de s'engager sur ce mode de service : oui, captures à 0,6 / 1,6 / 2,6 s montrant le tracé progresser.

Intégration : `scripts/signature.mjs` sur le modèle de `scripts/og.mjs`, avec une garde qui refuse de générer si un caractère manque au bundle. Le hero abandonne le balayage CSS pour un `<picture>`. Dimensionnement principiel : le SVG étant généré à `fontSize: 100` dans une boîte de 180, `font-size: var(--taille-accent)` avec `width: min(100%, 4.779em)` reproduit exactement l'échelle du texte remplacé.

### Le faux bug

Le moment le plus coûteux de la session. Les captures headless montraient des pans blancs et `0/16` révélés. Deux vérifications antérieures avaient donné le change sans rien prouver : sans JS et en mouvement réduit, la visibilité vient du CSS, pas de l'observer.

Diagnostic progressif : un observer indépendant injecté dans la page renvoyait les **mêmes** résultats que celui du site (`0/16` puis `11/16` selon la hauteur de fenêtre), ce qui disculpait le code. Puis mesure de l'opacité calculée : `vus=11` mais `opacité=0`. Test décisif en injectant `*{transition:none !important}` : les quatre premiers éléments passaient de `0,0,0,0` à `1,1,1,1`. **La règle CSS résolvait donc correctement, c'est l'horloge d'animation qui restait figée.**

Confirmation finale par le protocole DevTools avec défilement et attente réels : `vus=5/16 pleinementVisibles=5`, capture montrant les cartes Créations et le bandeau pleinement rendus.

### Fin

Vérifications finales : 13 tests, `astro check` sans erreur, build propre, `npm run og` toujours fonctionnel, texte du `<h1>` conforme au caractère près, variante mouvement réduit contrôlée. La note que j'avais écrite dans `CLAUDE.md` en cours de session (« Tegaki est inutilisable pour du texte français ») était devenue fausse et a été corrigée en conséquence.
