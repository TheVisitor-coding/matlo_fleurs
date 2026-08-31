---
type: session-log
date: 2026-08-30
project: matlo_fleurs
tags: [session, astro, figma, design-to-code, seo, php, deploiement, infomaniak]
---

# Session : 2026-08-30 — Choix de stack et intégration de la landing

## Quick Reference
**Sujets :** cadrage technique de la stack, trajectoire V1/V2/V3, intégration des 12 blocks de la page d'accueil depuis Figma, pages légales, formulaire PHP, favicon et og:image, workflow de déploiement.
**Résultat :** la page d'accueil est intégralement intégrée et buildée sans erreur, mais elle n'est pas publiable : quatre bloquants durs subsistent (mentions légales trouées, formulaire sans destinataire, droits d'image, téléphone absent).

## Ce qui a été fait

- **Stack tranchée** : Astro 7 en sortie statique, CSS natif avec tokens, endpoint PHP pour le formulaire, déploiement rsync SSH sur Infomaniak mutualisé.
- **12 blocks intégrés** dans l'ordre de la maquette : barre d'information, header, hero, créations, bandeau signature, occasions, atelier, livraison, boutique, réseaux, CTA final avec formulaire, pied de page.
- **5 pages** produites : accueil, mentions légales, politique de confidentialité, 404, confirmation d'envoi. Plus une page `/og` utilitaire, en noindex.
- **Formulaire de contact** complet (7 champs, piège à robots, limite par IP) et son handler `public/api/contact.php`.
- **Favicon** en 4 formats et **og:image** 1200x630 rendue par Chrome headless avec les vraies fontes, reproductible par `npm run og`.
- **Workflow GitHub Actions** de déploiement, déclenchement manuel, simulation rsync activée par défaut.
- **13 tests** `node:test` sur la logique d'horaires, sans aucune dépendance ajoutée.
- **Responsive** construit en trois paliers (1023 px, 700 px, 560 px), la maquette n'en fournissait aucun.
- **Corrections dans les docs** : horaires de `docs/04` et `docs/05`, divergence du samedi close.

## Décisions prises

- **Astro plutôt que Next** : sur mutualisé Next se réduit à `output: 'export'`, ce qui désactive Image Optimization, ISR, Server Actions, middleware et route handlers. On porterait le poids d'un framework serveur pour en utiliser une fraction.
- **Medusa écarté** : process Node permanent plus Postgres plus Redis, impossible sur mutualisé, et son admin auto-hébergé transfère une charge d'exploitation permanente.
- **Shopify en headless, pas en remplacement** : l'API Storefront s'appelle depuis le navigateur, le panier vit chez Shopify, le checkout est hébergé par Shopify. Le site Astro reste donc statique et on ne quitte jamais Infomaniak. Migrer le site entier vers Shopify aurait imposé ses URLs (`/products/`, `/collections/`) et cassé le plan d'URL de `docs/01`.
- **Shopify justifié par l'admin, pas par la technique** : la fleuriste devra gérer produits, stock et commandes elle-même. Construire ce back-office est le travail le plus cher du projet.
- **CSS natif plutôt que Tailwind** : les tokens CSS *sont* les variables Figma, une seule source de vérité nommée pareil des deux côtés. Tailwind ajouterait une couche de traduction sur un design entièrement sur mesure.
- **`docs/05` fait foi sur les textes, la maquette fait foi sur le design.**
- **Blanc en fond de page, crème en fond de section** : les frames sans `bg` dans Figma reposent sur le canevas, qui est blanc. Seuls header, hero, atelier et livraison portent le crème ; bandeau et pied de page portent le nuit.
- **`<a>` si navigation, `<button>` sinon** : un `href` (ancre, `tel:`, URL externe) est un lien ; sans `href` il n'y a rien à suivre, donc un bouton, désactivé tant que le numéro réel manque. Aucun span stylé en bouton.
- **Déploiement manuel uniquement** : un `push` automatique publierait un site avec des mentions légales trouées et un formulaire mort.
- **Simulation rsync par défaut** : le premier lancement fait un `--dry-run --itemize-changes`, il faut décocher explicitement pour publier.
- **`--delete` exclut `.well-known`** : Infomaniak y dépose les jetons de renouvellement de certificat, sans l'exclusion le premier déploiement casserait le HTTPS.
- **API Fonts native d'Astro** plutôt que du WOFF2 sous-ensemblé à la main : elle auto-héberge, sous-ensemble, et génère des `@font-face` de repli calibrés métriquement, ce qui protège le CLS pendant le swap.

## Problèmes résolus

- **Problème** : les horaires de `docs/04` et `docs/05` étaient faux.
  **Cause** : la divergence signalée ne portait que sur le samedi, mais la coupure de midi était partout à 13h au lieu de 12h30.
  **Solution** : horaires réels confirmés par la fleuriste, corrigés dans `src/data/site.ts` et dans les deux documents. Six jours sur sept étaient faux.

- **Problème** : le logotype du pied de page retombait sur Georgia.
  **Cause** : après le renommage de `--police-accent` en `--police-logotype`, `Base.astro` n'émettait plus le `<Font>` correspondant, donc aucun `@font-face` Updock.
  **Solution** : ajout du composant manquant. Détecté en inspectant les familles présentes dans le CSS produit.

- **Problème** : `20 km :Sallertaine`, espace manquant dans le texte rendu.
  **Cause** : une expression en fin de ligne perd l'espace qui la précède à la compilation du gabarit.
  **Solution** : phrases assemblées dans le frontmatter. Contrôle automatisé sur le texte visible de la page.

- **Problème** : `/message-envoye` déclarée dans le sitemap alors qu'elle est en `noindex` et bloquée dans `robots.txt`.
  **Cause** : `@astrojs/sitemap` liste toutes les routes par défaut.
  **Solution** : filtre sur `message-envoye`, `404` et `og`.

- **Problème** : `src` de repli de l'image du hero à 380 Ko, au-dessus du plafond de 200 Ko de `docs/03`.
  **Cause** : avec `widths` seul, Astro garde l'original en fallback.
  **Solution** : `width` explicite, le repli descend à 47 Ko.

- **Problème** : 76 Mo de PNG sources dans `src/assets`.
  **Cause** : les exports Figma sont en pleine résolution, et git garde les blobs pour toujours.
  **Solution** : redimensionnés à 1600 px avec `sips`, conformément à `docs/03`. 4,5 Mo.

- **Problème** : la décision « `de la vie` en Cinzel italique » n'est pas implémentable.
  **Cause** : Cinzel n'existe qu'en `normal 400`, vérifié dans les métadonnées de l'API Fonts. Le navigateur synthétiserait une oblique.
  **Solution** : Cinzel normal avec une couleur différente, arbitré par le client.

- **Problème** : mon `text-transform: uppercase` sur les titres écrasait la hiérarchie de la maquette.
  **Cause** : Cinzel dessine ses minuscules en petites capitales. La maquette exploite la casse mixte pour obtenir une grande initiale suivie de petites capitales.
  **Solution** : transformation retirée des titres, conservée sur les boutons et les micro-labels, qui sont en capitales dans la maquette.

- **Problème** : logique d'horaires écrite deux fois, dans le module et dans le script inline de la barre d'information.
  **Cause** : `define:vars` avec `is:inline` interdit l'import.
  **Solution** : script Astro traité, données passées par attribut `data-`, une seule implémentation. Plus une garde de test qui échoue si le jeu de test s'écarte de `site.ts`.

- **Problème** : le bouton du plan et celui d'Instagram avaient perdu `target` et `rel`.
  **Cause** : en les faisant passer par le composant `Bouton`, qui ne gérait pas ces attributs.
  **Solution** : prop `externe`.

- **Problème** : `display: contents` sur le `<nav>` du header.
  **Cause** : raccourci de mise en page. Risque de retirer le repère de navigation de l'arbre d'accessibilité.
  **Solution** : remplacé par un `flex`.

## Points d'attention

- **Le site n'est pas publiable.** Quatre bloquants durs : mentions légales avec 6 marqueurs `[À COMPLÉTER]` visibles publiquement plus 4 sur la confidentialité, formulaire dont le destinataire est un placeholder (renvoie un 503 explicite), carte de la boutique qui est une capture Google Maps, téléphone absent donc 6 boutons désactivés et pas de `telephone` dans le JSON-LD.
- **Les 13 images sont des placeholders de maquette**, provenance non établie. L'illustration livraison affiche `M Fleurs` sur l'enseigne.
- **Block réseaux** : 6 fois la même photo. `docs/05` interdit sa mise en ligne sous 6 vraies publications. Monté pour valider la mise en page.
- **`contact.php` n'a jamais tourné** : pas de PHP sur la machine de dev. Exige PHP 8.1 minimum (`never`, `str_contains`).
- **`.htaccess` jamais exécuté par Apache** : la règle sans slash final, les en-têtes de cache et la 404 sont écrits mais non vérifiés.
- **L'og:image contient l'adresse** : tout changement de NAP demande `npm run og`.
- **`.claude/CLAUDE.md` est périmé sur deux points** : le blanc pur y est déclaré hors palette alors qu'il est le fond de cinq blocks, et la stack y est notée non tranchée.
- La maquette contredit sa propre règle d'arche sur la photo de l'atelier, qui est un rectangle arrondi.
- `docs/02-blocks-et-maquette.md` reste faux sur « mariage = bouquets uniquement ».

## Tâches en suspens

- [ ] Numéro de téléphone réel et adresse de contact — débloquent les 6 boutons, le formulaire, le JSON-LD et une partie des mentions légales
- [ ] Données légales : SIRET, forme juridique, TVA, nom de famille du responsable, médiateur de la consommation, durée de conservation
- [ ] Renseigner `DESTINATAIRE` dans `public/api/contact.php`
- [ ] Séance photo, puis remplacer les 13 placeholders
- [ ] Remplacer la carte Google Maps par une source utilisable, ou une tuile OpenStreetMap
- [ ] Corriger l'enseigne `M Fleurs` de l'illustration livraison
- [ ] Remplir ou retirer le block réseaux
- [ ] Souscrire Hébergement Web Infomaniak, sélectionner PHP 8.1, créer la clé SSH
- [ ] Définir les secrets et variables du workflow, dont `SSH_HOTE_CLE`
- [ ] Recetter le formulaire sur un sous-domaine de préversion
- [ ] Mettre à jour `.claude/CLAUDE.md` : palette, stack tranchée, pièges périmés
- [ ] Choisir et brancher la mesure d'audience sans cookie, configurer Search Console
- [ ] Trancher ou retirer la promesse « 24 h ouvrées »
- [ ] Passe mobile fine sur la maquette Figma, qui n'existe qu'en desktop

## Fichiers impactés

- `astro.config.mjs` — API Fonts pour 5 familles, `trailingSlash: 'never'`, `build.format: 'file'`, filtre de sitemap
- `package.json` — scripts `test`, `og`, dépendances Astro et `@astrojs/check`
- `src/data/site.ts` — source unique du NAP, adresse dérivée d'une seule chaîne
- `src/lib/schema.ts` — JSON-LD `Florist`, omet tout champ manquant
- `src/lib/horaires.ts` + `horaires.test.ts` — phrase d'ouverture et 13 tests
- `src/styles/tokens.css`, `base.css` — palette, planchers typographiques, échelle d'espacement
- `src/layouts/Base.astro`, `PageTexte.astro` — head SEO, og:image, favicons
- `src/components/` — 14 composants : barre d'information, header, hero, arche, bouton, logo, titre de section, créations, bandeau, occasions, bloc texte-image, atelier, livraison, boutique, réseaux, CTA final, formulaire, pied de page
- `src/pages/` — accueil, mentions légales, politique de confidentialité, 404, confirmation, og
- `src/assets/` — 13 images redimensionnées à 1600 px, 9 SVG normalisés en `currentColor`
- `public/` — `.htaccess`, `robots.txt`, `api/contact.php`, favicons, `og-image.png`
- `scripts/og.mjs` — régénération de la carte de partage
- `.github/workflows/deploy.yml` — build, tests, rsync SSH, vérification HTTP
- `docs/04-page-accueil.md`, `docs/05-contenus-accueil.md` — horaires corrigés

---

## Log détaillé

### Cadrage technique

La session a commencé par un cadrage de stack, avec une contrainte posée d'emblée : hébergement Infomaniak mutualisé, pour centraliser avec le domaine et les mails déjà souscrits. Vérification faite sur la documentation Infomaniak : le mutualisé donne SSH, SFTP, `.htaccess`, PHP-FPM et MySQL, mais **aucun runtime Node**, réservé au Cloud Serveur. L'offre Starter offerte avec le domaine est insuffisante : 10 Mo, HTML seul, sans PHP ni SSH. Il faut l'offre Hébergement Web.

Trois hypothèses de départ ont été remises en cause. Medusa est incompatible avec le mutualisé (process Node permanent plus Postgres plus Redis) et son admin auto-hébergé transfère une charge d'exploitation permanente pour une boutique tenue par une personne. Migrer le site entier vers Shopify aurait imposé ses URLs et cassé le plan d'URL de `docs/01`, en plus de refaire l'identité en Liquid. Et la question de fond n'est pas la plateforme mais l'utilité d'un panier : Florajet couvre déjà l'envoi national, les bouquets sont périssables et faits sur commande, le deuil est exclu du e-commerce par décision de marque.

Le client a répondu sur trois points décisifs : contenus rédigés par lui seul au départ, mais la fleuriste aura besoin de gérer produits et commandes pour le e-commerce ; click & collect d'abord, e-commerce livraison bien plus tard ; domaine et mails déjà chez Infomaniak, hébergement pas encore souscrit.

Cette réponse sur l'admin a renversé une partie de l'argumentaire contre Shopify. Le point technique décisif : l'API Storefront s'appelle depuis le navigateur, le panier vit chez Shopify, le checkout est hébergé par Shopify. Le site Astro reste donc statique, les URLs ne bougent pas, et on ne quitte jamais Infomaniak. La trajectoire retenue tient sur le mutualisé aux trois phases.

### Socle et système de design

`git init`, Astro installé en 7.2.9 (le plan mentionnait 5, il était daté). Vérifications faites au build plutôt que supposées : `build.format: 'file'` produit bien `page.html` et non `page/index.html`, `trailingSlash: 'never'` est respecté dans le sitemap, et un `SITE_URL` non défini retombait sur un sentinel visible.

Découverte à l'installation des polices : l'API Fonts d'Astro 7 est stable et top-niveau, elle auto-héberge et sous-ensemble depuis Google Fonts, et elle génère en plus des `@font-face` de repli calibrés métriquement sur Times New Roman, ce qui protège gratuitement le CLS pendant le swap. Le plan prévoyait un sous-ensemblage manuel, inutile.

Les métadonnées de l'API ont aussi permis de constater que **Cinzel n'a pas d'italique** : la décision de `CLAUDE.md` sur « `de la vie` en Cinzel italique » n'était pas implémentable sans oblique synthétique. Arbitré par le client en Cinzel normal avec une couleur différente.

### Relevé de la maquette

Le client a précisé que la maquette fait foi et que les docs ne sont pas à jour. Relevé bloc par bloc avec `get_design_context`, en évitant `get_design_context` sur le frame entier, trop coûteux sur une page de 6468 px.

Cinq divergences structurelles trouvées entre la maquette et les docs, dont trois touchant des décisions déclarées figées : la navigation de la maquette (`Accueil`, `Services`, `A Propos`) est périmée, `docs/05` fixe les cinq libellés définitifs ; le block créations a 3 cartes et non 5 catégories ; le deuil n'apparaissait pas au premier relevé. Le client a arbitré : les liens du header pointent vers les blocks réels, le deuil est une carte du block occasions, et le formulaire s'ajoute sous les deux boutons du CTA final.

Découvertes typographiques importantes. La ligne d'accent du hero est en **Tangerine**, pas Updock ; Updock ne survit que dans le logotype. Cela porte le système à 5 familles, 186 Ko, avec toujours 2 préchargements. Le bandeau introduit une **couleur hors documentation**, `#97ac96`, sauge éclaircie, nécessaire parce que la sauge normale ne contraste pas sur le fond nuit. Le pied de page ajoute un taupe `#9a9182` et un gris `#d2d2d2`, seule valeur froide de la palette.

Le motif d'arche a un **rayon constant de 180 px**, pas proportionnel : sur l'arche de carte à 361 px il forme un dôme exactement semi-circulaire, sur celle du hero à 380 px il laisse un méplat au sommet. Repris en `min(180px, 50%)` pour préserver la forme en responsive. Les ratios diffèrent aussi par variante.

### Deux erreurs de ma part, corrigées par le client

Première erreur, sur les fonds. J'avais supposé que les frames sans `bg` héritaient du crème. Elles reposent en fait sur le canevas Figma, qui est **blanc**. Cinq blocks sont sur blanc : créations, occasions, boutique, réseaux, CTA final. Le relevé des contextes de design déjà en main l'a confirmé sans nouvel appel. Corrigé, et par cohérence j'ai annulé toutes mes substitutions crème-pour-blanc faites au nom de la même hypothèse : texte de la primaire, texte des cartes occasions, rose et logotype du pied de page.

Seconde erreur, sur la casse des titres. J'avais appliqué `text-transform: uppercase` aux `h1`, `h2` et `h3`. Or **Cinzel dessine ses minuscules en petites capitales**, et la maquette exploite la casse mixte pour obtenir une grande initiale suivie de petites capitales. La transformation détruisait cette hiérarchie. Retirée des titres, conservée sur les boutons et les micro-labels qui sont bien en capitales dans la maquette.

Le client a aussi relevé un vrai défaut de sémantique : mes boutons sans destination étaient des `<span>`, ni focusables ni annoncés. Onze occurrences. Corrigé en `<a>` pour toute navigation et `<button type="button" disabled>` sinon, les six cas étant le téléphone.

### Consigne de style

Le client a demandé de ne jamais écrire de commentaires qui paraphrasent le code. Passe faite sur l'ensemble des fichiers existants : il ne reste que des « pourquoi » non déductibles, une dizaine au total (DirectorySlash d'Apache, fuseau de la boutique, planchers de lisibilité, garde anti-dérive des tests, exclusion de `.well-known`).

### Publiabilité et infrastructure

Audit de publiabilité demandé en fin de session. Réponse : le build est déployable, le site n'est pas publiable. Constats vérifiés plutôt qu'estimés : 6 marqueurs `[À COMPLÉTER]` visibles sur `/mentions-legales` et 4 sur la confidentialité, `DESTINATAIRE` encore en placeholder, aucun favicon, aucune `og:image`, aucun commit, aucun workflow.

Favicon et og:image produits ensuite. `sharp` est disponible via Astro et Chrome est installé, ce qui a permis deux choses : rastériser le logo en 4 formats sans dépendance ajoutée, et **rendre l'og:image avec les vraies fontes** par capture Chrome headless sur une page Astro dédiée. La carte pèse 25 Ko en PNG à palette indexée, deux fois moins qu'en JPEG à qualité équivalente. Le processus est reproductible par `npm run og`, ce qui compte parce que la carte contient l'adresse.

Le workflow de déploiement est en déclenchement manuel avec simulation rsync par défaut, précisément parce que le site n'est pas publiable. Il enchaîne checkout, Node 22 avec cache, `npm ci`, tests, `astro check`, build, clé SSH, rsync, puis vérification HTTP 200 sur les trois pages du lancement.

### Chiffres finaux

`dist` à 1,67 Mo sur 66 fichiers et 6 pages. HTML de l'accueil à 114 Ko brut, 28 Ko gzip. CSS 27 Ko. Toutes les images sous 200 Ko. JSON-LD `Florist` valide avec 11 plages horaires et 11 communes. Sitemap à 3 URLs. Aucun lien mort, les 7 ancres présentes et pointées. 13 tests au vert, `astro check` sans erreur ni avertissement ni indication.
