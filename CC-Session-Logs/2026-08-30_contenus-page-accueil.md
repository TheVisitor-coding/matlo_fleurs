---
type: session-log
date: 2026-08-30
project: matlo_fleurs
tags: [session, figma, copywriting, contenu, seo-local, page-accueil, ux-review]
---

# Session : 2026-08-30 — Rédaction des contenus de la page d'accueil

## Quick Reference
**Sujets :** relevé de la nouvelle maquette Figma de la landing · rédaction du contenu réel block par block · revue UX et écart maquette/spécification
**Résultat :** `docs/05-contenus-accueil.md` produit (5 900 mots), tous les placeholders de la landing remplacés par du contenu rédigé, plus 22 recommandations sur la maquette et la liste des informations qui bloquent encore la mise au propre.

## Ce qui a été fait

- Accès et relevé complet de la nouvelle maquette : frame `Homepage` = `297:31806`, 1440 × 6424, 11 blocks, desktop uniquement.
- Relecture des 5 documents de cadrage. Constat central : `04-page-accueil.md` contenait déjà la majorité des textes de la page, rédigés, mais la maquette a été dessinée sans les reprendre.
- Mesures faites directement sur le rendu : crème réel `#F3EDE1`, et 4 blocks sur blanc pur `#FFFFFF` hors palette.
- Rédaction de `docs/05-contenus-accueil.md` : contenu block par block avec le node Figma en regard, balises SEO, plan des titres, ancres, récapitulatif des informations manquantes, 22 recommandations sur la maquette.
- Vérification chiffrée des contraintes : `<title>` 48 caractères, meta description portée de 134 à 152, bandeau signature à 5 mots, 7 emplacements du téléphone recensés, 6 ancres figées, zéro cadratin dans le document.

## Décisions prises

- **Livrable en document seul, pas d'écriture dans Figma** : le report se fait à la main, aucune modification automatique de la maquette.
- **`/deuil` ne part pas au lancement** : la carte deuil doit donc porter le minimum vital (lexique des 5 compositions, lieux de livraison, téléphone en clair). Ça ne tient pas au quart de la largeur, donc le deuil sort de la ligne de cartes et devient une bande pleine largeur sur fond nuit, avec sa propre ancre `#deuil`. La règle de projet le demandait de toute façon : le deuil n'est jamais traité comme une occasion parmi d'autres.
- **Les 3 blocks hors spécification sont conservés** (bandeau nuit, block livraison, block réseaux sociaux), avec les conséquences résolues dans le contenu.
- **Le bandeau nuit est requalifié en bandeau signature** : en l'état il répétait mot pour mot le H2 situé 200 px plus bas.
- **`de la vie` repasse en Cinzel italique** : avec le hero et le bandeau signature, la page aurait porté 3 occurrences d'Updock alors que la règle en autorise 2.
- **La zone de livraison quitte le block boutique** : le block livraison étant conservé, la même liste de communes serait apparue deux fois à 400 px d'écart.
- **Le CTA mariage pointe vers le formulaire, pas vers le téléphone** : un couple qui prépare un mariage dans douze mois écrit, il n'appelle pas.
- **Une ancre nouvelle, `#deuil`**, s'ajoute aux cinq déjà figées, conséquence directe du fait que la page ne sort pas.
- **`<title>` et horaires réécrits sans cadratin** : point médian pour le titre, traits d'union simples pour les plages horaires.

## Problèmes résolus

- **Problème** : toute la landing est en placeholder (3 cartes de créations identiques, 4 cartes d'occasions avec le même texte et la même photo, texte du block livraison copié du block boutique, téléphone factice, pastille « Sur-mesure » en double).
  **Cause** : la maquette a été dessinée avant, ou en parallèle, de la spécification `04-page-accueil.md`, sans reprise des textes qui y étaient déjà rédigés.
  **Solution** : document de report block par block, chaque texte associé à son node Figma, en distinguant ce qui est reporté depuis `04` de ce qui est écrit à neuf.

- **Problème** : la spécification donne des textes trop courts pour le lancement.
  **Cause** : `04-page-accueil.md` partie E impose deux états par section, `autonome` (la section fait le travail de la page absente) et `teaser` (la page existe). La maquette et les textes de `04` sont en `teaser`, alors que c'est `autonome` qui sort le jour de l'ouverture.
  **Solution** : rédaction des versions longues, soit les 5 univers de créations en 2-3 lignes chacun, les 3 cartes d'occasions détaillées, les 5 paragraphes de l'atelier, le formulaire intégré au CTA final.

- **Problème** : la carte « Deuil » porte une photo de mariage et un texte de bouquet de mariée.
  **Cause** : les 4 cartes de la section occasions sont des copies du même gabarit, jamais différenciées.
  **Solution** : bande deuil dédiée, fond nuit, lexique des 5 compositions, lieux de livraison, téléphone en clair à 32 px minimum.

- **Problème** : faille SEO sur le H1. Ni le titre ni le chapô ne contiennent « Challans ».
  **Cause** : le sur-titre prévu par `04` n'a pas été dessiné.
  **Solution** : une ligne de texte à créer au-dessus de `297:31853`, `ARTISAN FLEURISTE À CHALLANS`, en IM Fell DW Pica capitales sauge.

- **Problème** : la meta description rédigée dans `03-seo-local.md` fait 134 caractères, sous le plancher interne de 140 fixé par le même document.
  **Cause** : contrainte posée puis non vérifiée au compteur.
  **Solution** : réécriture à 152 caractères, en ajoutant « envoi partout en France » (fait entrer Florajet dans la SERP) et « Ouvert le dimanche » (répond à la requête secondaire `fleuriste Challans ouvert`).

## Points d'attention

- **Variables Figma toujours non branchées** : `get_variable_defs` sur `297:31806` renvoie `{}`, comme sur l'ancien frame. Couleurs et typos en dur sur toute la page. À rebrancher avant de produire quoi que ce soit d'autre, sinon chaque nouveau bloc reproduit des valeurs en dur.
- **Crème jamais figé** : `#F3EDE1` en maquette, `#F5F0E8` en identité print. C'est la couleur dominante du site et le seul token de la palette sans valeur écrite nulle part.
- **4 blocks sur blanc pur `#FFFFFF`** (`block-services`, `block-occasions` liste, les deux `block-contact`), hors palette, contre la règle « crème dominante à 70 % ».
- **Contraste insuffisant sur les cartes occasions** : texte crème posé sur photo claire, sans voile ni dégradé. Illisible sur la partie ciel. Cible senior, c'est un défaut d'accessibilité.
- **Divergence sur les horaires du samedi** : la maquette affiche `9h-13h · 14h30-19h`, `04-page-accueil.md` écrit `9h-19h`. Visible publiquement une fois dans le schema et la fiche Google.
- **Divergence sur la liste des communes desservies** : 12 dans `03-seo-local.md`, 10 dans `04-page-accueil.md` (manquent Saint-Jean-de-Monts et Saint-Hilaire-de-Riez).
- **Contradiction interne à `04`** sur Cormorant Garamond : 18 px sur les cartes création et 17 px sur les cartes occasion, alors que la même partie D pose 20 px comme minimum absolu.
- **Photos débordantes du block CTA** (`x = -108`, jusqu'à 1264 pour une largeur de contenu de 1240), recadrées par le bord de page, comportement non défini en responsive.
- **Pas de version mobile** : plus de la moitié du trafic d'un commerce local vient du téléphone.
- **Le block réseaux ne doit pas être publié** tant qu'il n'y a pas 6 vraies publications. Six visuels de banque valent moins que l'absence du block.
- Trois passages du document sont marqués **[à valider]** parce qu'ils reposent sur une information non confirmée : les définitions des 5 compositions de deuil, le rythme d'arrivage des fleurs, le délai de réponse de 24 h ouvrées.

## Tâches en suspens

- [ ] Fournir le **numéro de téléphone réel** — bloquant, 7 emplacements sur la page plus le JSON-LD, la fiche Google et le pied de page
- [ ] Confirmer le **prénom de la fleuriste** (maquette : « Mathilde », docs : `{Prénom}`)
- [ ] Trancher les **horaires du samedi**
- [ ] Trancher la **liste des communes desservies** (10 ou 12)
- [ ] Fournir les **URLs Instagram et Facebook** (block réseaux, pied de page, `sameAs`)
- [ ] **Séance photo** — toujours le blocage n°1 de tout le reste
- [ ] Rebrancher les **variables Figma** avant de produire d'autres blocks
- [ ] Figer la valeur du **crème**
- [ ] Créer les blocks manquants : barre d'information, formulaire du CTA final, colonnes du pied de page, 2 univers de créations, boutons `Itinéraire` / `Nous appeler`, sur-titre du hero
- [ ] Intervertir les blocks livraison et boutique
- [ ] Corriger le contraste des cartes occasions
- [ ] Passer les 4 blocks blancs en crème
- [ ] Produire la version mobile 375 px
- [ ] Trancher l'arbitrage Cormorant Garamond sur un vrai paragraphe de 300 mots
- [ ] Choisir la stack, puis intégrer

## Fichiers impactés

- `docs/05-contenus-accueil.md` — **créé**. Contenus de la page d'accueil block par block, balises SEO, plan des titres, ancres, informations manquantes, 22 recommandations sur la maquette.

---

## Log détaillé

### Point de départ

Session ouverte sur un `/ctx`. Aucun log de session n'existait encore : `CC-Session-Logs/` et le miroir vault étaient vides, la synthèse venait donc uniquement de `.claude/CLAUDE.md` et de `docs/`. État du projet à l'ouverture : cadrage terminé (`docs/00` à `docs/04`), maquette Figma en cours, rien de codé, stack non tranchée, git non initialisé.

L'utilisateur a ensuite annoncé avoir terminé la landing sur Figma et fourni une nouvelle URL de node : `node-id=297-31806`, différente de celle enregistrée dans `CLAUDE.md` (`259-1083`). Première demande : simplement confirmer l'accès et la capacité à étudier les blocks.

### Relevé de la maquette

`get_metadata` sur `297:31806` a renvoyé l'arbre complet. Frame `Homepage`, 1440 × 6424, desktop uniquement, 11 blocks :

| # | Block | Node |
|---|---|---|
| 1 | Header | `297:31807` |
| 2 | Hero | `297:31849` |
| 3 | block-services | `316:31889` |
| 4 | block-occasions (bandeau nuit) | `317:31896` |
| 5 | block-occasions (liste) | `362:32000` |
| 6 | block-shop (atelier) | `317:31899` |
| 7 | block-shop (livraison) | `363:32188` |
| 8 | block-contact (boutique) | `317:31902` |
| 9 | block-contact (réseaux) | `381:227` |
| 10 | block-cta | `317:31905` |
| 11 | Footer | `363:32121` |

Seuls trois composants sont instanciés : `Primary-btn`, `Secondary-btn`, `Arch`. Tout le reste est en frames nues nommées `Frame 8271xxx`.

Un point utile pour les sessions futures : dans ce fichier, Figma nomme les nœuds texte d'après leur contenu. Le seul `get_metadata` a donc suffi à récupérer l'essentiel du copy existant, sans avoir à appeler `get_design_context`, qui aurait été bien plus coûteux sur une page de 6 424 px.

Screenshots téléchargés puis lus pour la page entière et pour 4 blocks (hero, services, occasions, CTA). Placeholders relevés visuellement : 3 cartes de créations rigoureusement identiques (« Bouquets » ×3, même image), 4 cartes d'occasions avec la même description de bouquet de mariée et la même photo de mariage — y compris la carte « Deuil » —, texte du block livraison copié du block boutique, `02 XX XX XX XX`, pastille « Sur-mesure » en double dans le hero, et mention « animons des ateliers créatifs » dans le chapô alors que les ateliers sont reportés.

`get_variable_defs` sur `297:31806` renvoie `{}` : le pitfall connu du 2026-08-23 persiste sur le nouveau frame.

Les fonds ont été échantillonnés en Python sur les PNG téléchargés plutôt que via l'API Figma, plus rapide et moins coûteux en contexte. Résultat : crème `#F3EDE1` sur header, hero et blocks shop ; blanc pur `#FFFFFF` sur services, occasions et les deux blocks contact ; nuit `#1D1E33` sur le bandeau et le footer. Le blanc pur n'est dans aucun document.

### Lecture du cadrage

Trois agents Explore lancés en parallèle sur `docs/04`, `docs/03`, et le trio `docs/00` + `01` + `02`. Motivation : la règle projet « source de vérité avant production » interdit de rédiger sur un contexte supposé, et `docs/04` était annoncé comme contenant déjà des textes rédigés.

Le retour a confirmé et déplacé le travail. `04-page-accueil.md` contient déjà : la barre d'information et sa variante annonce, la navigation cible, le titre et le chapô du hero, les 4 micro-infos, les H2 de chaque section, le texte de l'atelier, le bloc horaires et adresse, le H2 et le sous-titre du CTA final, les colonnes du pied de page. Le travail n'était donc pas d'inventer mais de reporter.

Le point réellement structurant est venu de la partie E : chaque section doit exister en deux états, `autonome` et `teaser`. La maquette est dessinée en `teaser`, mais c'est `autonome` qui sort au lancement, puisque la page d'accueil part seule. C'est de là que vient tout le manque rédactionnel réel : `04` ne donne que les versions courtes.

L'agent sur `docs/00/01/02` a aussi remonté 16 contradictions résiduelles entre les documents. La plus coûteuse, hors périmètre de cette session mais à traiter : `02-blocks-et-maquette.md` n'a pas été mis à jour sur « mariage = bouquets uniquement » et propose encore, dans ses blocks B06, B11, B21 et sa FAQ, de la décoration de lieu, des arches, des voitures et des vases. C'est frontalement contraire à la décision actée dans `00` et `04`.

### Questions posées

Trois décisions relevaient de l'utilisateur et pas de moi, posées avant rédaction :

1. **Forme du livrable** → document seul, `docs/05-contenus-accueil.md`, pas d'écriture dans Figma.
2. **`/deuil` au lancement ?** → non. Conséquence directe : la carte deuil doit porter le minimum vital.
3. **Sort des 3 blocks hors spécification** → les trois sont conservés.

### Conséquences des réponses, résolues dans le contenu

Le « non » sur `/deuil` a forcé la restructuration de la section 5. J'avais d'abord envisagé une carte deuil élargie sur 2 colonnes dans la même ligne, mais le calcul de grille ne tombait juste sur aucune disposition à 4 cartes (302,5 px chacune sur 1 240 px). La solution retenue est meilleure sur le fond : le deuil sort complètement de la ligne et devient une bande pleine largeur sous les 3 autres cartes, avec son ancre `#deuil`. Cela satisfait aussi la règle de `CLAUDE.md` qui interdit de traiter le deuil comme une occasion parmi d'autres, et laisse la place au lexique des 5 compositions.

La conservation des 3 blocks a créé trois conflits, résolus dans le texte :
- **Budget Updock.** Deux occurrences maximum par page. Le hero en prend une, le bandeau signature la seconde, et `de la vie` dans le H2 des occasions en prenait une troisième. Recommandation : `de la vie` passe en Cinzel italique.
- **Triple redite de la livraison** (micro-info du hero, block livraison, block boutique). Arbitrage : deux mots dans le hero, développement dans le block livraison, rien dans le block boutique.
- **Block réseaux bloqué par la séance photo.** Contenu écrit, mais condition de publication explicite : pas de mise en ligne sous 6 vraies publications.

### Rédaction

`docs/05-contenus-accueil.md` écrit d'un bloc, organisé dans l'ordre de la page, chaque entrée donnant le node cible, le texte exact, et une étiquette `[reporté]` / `[nouveau]` / `[à valider]`.

Rédaction neuve principale : les 5 univers de créations en 2-3 lignes chacun (la maquette n'en montre que 3, la spec en demande 5 en 3 arches plus 2 cartes larges), les 3 cartes d'occasions, la bande deuil avec son lexique, les 5 paragraphes de l'atelier, le block livraison, le block réseaux, le formulaire intégré au CTA final avec ses libellés de champs, sa mention RGPD et son message de confirmation, et les 4 colonnes du pied de page en version ancres.

Le bandeau signature retenu est `Jamais deux fois la même`, 5 mots, repris de la formule du texte de l'atelier. Deux variantes proposées en repli.

### Vérifications exécutées

Contrôles faits en Python sur le fichier produit, pas à l'œil :

- `<title>` : 48 caractères, sous la limite de 60.
- Meta description : les deux premières formulations tombaient à 163 et 161 caractères, au-dessus du plafond de 158. Trois itérations pour atteindre 152, en ajoutant « Ouvert le dimanche ». Une variante à 158 est documentée mais signalée comme étant à la limite haute.
- Bandeau signature : 5 mots, sous le plafond de 8.
- Cadratins : 3 avaient subsisté dans des schémas ASCII et une note. Corrigés, le fichier en compte désormais 0.
- Occurrences du téléphone : le document annonçait « 9 fois », le comptage réel en donne 7. Corrigé, et les 7 emplacements sont désormais nommés.
- NAP : une tension a été relevée entre la règle « identique caractère pour caractère » et le fait que `04` prévoit une forme courte sans code postal dans la barre d'information, faute de place sur 36 px. Documenté comme la seule exception tolérée, avec interdiction de la propager.
- Interdits rédactionnels : `décoration florale`, `0 avis`, `Nos services` absents. Les deux occurrences restantes de « ateliers créatifs » et « En savoir plus » sont dans la prose explicative qui demande précisément de les retirer, pas dans le copy.

### Ce qui n'a pas été fait, et pourquoi

- **Aucune écriture dans Figma**, conformément au choix de l'utilisateur.
- **Aucune skill marketing invoquée.** `content-strategy`, `customer-research`, `marketing-psychology` et `site-architecture` sont installées sur le projet, mais `docs/00` contenait déjà les 4 cibles avec leurs objections et leur vocabulaire, et `docs/03` le ciblage sémantique. Charger les skills aurait dupliqué un travail déjà fait et consommé du contexte sans rien apporter.
- **Aucune valeur inventée.** Toutes les informations manquantes sont en placeholder explicite et récapitulées en fin de document.
