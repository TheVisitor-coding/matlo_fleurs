---
type: project-doc
date: 2026-08-29
project: matlo_fleurs
tags: [contenu, copywriting, figma, page-accueil, seo]
---

# Contenus de la page d'accueil

Textes prêts à coller dans la maquette Figma, block par block, dans l'ordre de la page.
Chaque entrée donne le node cible et le texte exact. Complète `04-page-accueil.md`, qui
reste la source sur la structure et le système de design.

**Frame de référence** : `Homepage` = `297:31806` (1440 × 6424).

## Comment lire ce document

- **État `autonome`** : c'est celui qui sort au lancement. La page d'accueil est seule,
  chaque section fait donc le travail de la page qui n'existe pas encore. Les textes
  ci-dessous sont écrits dans cet état. `04-page-accueil.md` donne les versions `teaser`,
  plus courtes, à basculer quand les pages arriveront.
- **`{TÉLÉPHONE}`** : placeholder. Le numéro réel n'est écrit nulle part dans le projet.
  Il apparaît **7 fois** sur la page une fois tous les blocks en place : barre d'information,
  CTA du header, bouton secondaire du hero, bande deuil, block boutique, message de
  confirmation du formulaire, pied de page. Un seul remplacement global à faire, mais il
  doit être identique partout, au caractère près.
- **`{PRÉNOM}`** : la maquette écrit « Mathilde », les docs écrivent `{Prénom}`. À confirmer.
- Les textes marqués **[reporté]** viennent de `04-page-accueil.md`, à recopier tels quels.
  Ceux marqués **[nouveau]** sont écrits ici.
- Les mentions **[à valider]** signalent une information que je n'ai trouvée dans aucun
  document et que je n'ai pas inventée : soit elle est absente du texte, soit elle est
  marquée comme telle.

## Décisions appliquées dans ce document

1. **`/deuil` ne part pas au lancement.** Le deuil ne peut donc pas rester une carte parmi
   quatre : il lui faut le vocabulaire, les lieux de livraison et le téléphone. Il sort de
   la ligne de cartes et devient une **bande dédiée** (voir section 5). C'est aussi ce que
   demande la règle de projet : le deuil n'est jamais traité comme une occasion parmi
   d'autres.
2. **Les 3 blocks hors spec sont conservés** : bandeau, livraison, réseaux. Conséquences
   traitées dans le texte, notamment la redite de la livraison et le budget Updock.
3. **Le cadratin est proscrit** dans tous les textes. Deux reports de `03-seo-local.md` en
   contenaient : le `<title>` et les plages d'horaires. Ils sont réécrits ci-dessous, la
   substitution est signalée à chaque fois.

---

# 0 · Barre d'information · **block à créer**

Absente de la maquette. C'est la section 1 de `04-page-accueil.md` : elle donne l'horaire,
l'adresse et le téléphone avant le premier scroll. Trois cibles sur quatre viennent
chercher exactement ça.

Fond nuit `#1D1E33`, texte crème, IM Fell DW Pica 14 px, hauteur 36-40 px.

### Variante `info` (permanente) **[reporté]**

```
Ouvert aujourd'hui jusqu'à 19h   ·   30 rue de Saint-Jean-de-Monts, Challans   ·   {TÉLÉPHONE}
```

Le téléphone est cliquable (`tel:`). L'horaire est dynamique : il affiche l'heure de
fermeture du jour, et « Fermé aujourd'hui · ouvert demain à 9h » le lundi.

### Variante `annonce` (quelques semaines après l'ouverture) **[reporté, ponctuation corrigée]**

Fond sauge `#5C6B4F`, texte crème.

```
La boutique du 30 rue de Saint-Jean-de-Monts a changé de mains, bienvenue chez Matlo'Fleurs
```

> `04-page-accueil.md` écrivait cette phrase avec un cadratin avant « bienvenue ».
> Remplacé par une virgule.

### Mobile

Horaire du jour et téléphone uniquement. L'adresse tombe.

---

# 1 · Header · `297:31807`

## Navigation · `297:31809`

Les cinq libellés cibles, avec leurs destinations **au lancement**. Les libellés ne
changeront plus : le jour où une page existe, seule la destination est remplacée.

| Node | Libellé | Destination au lancement | Ensuite |
|---|---|---|---|
| `297:31810` | `Nos créations` | `#creations` | `/nos-creations` |
| `297:31811` | `Mariage` | `#occasions` | `/mariage` |
| `297:31812` | `Deuil` | `#deuil` | `/deuil` |
| `297:31813` | `L'atelier` | `#atelier` | `/l-atelier` |
| `297:31814` | `Contact` | `#contact` | `/contact` |

Trois libellés changent de sens par rapport à la maquette : `Accueil` disparaît (le logo y
mène), `Services` et `A Propos` disparaissent aussi. **Mariage et Deuil entrent dans la
navigation** : ce sont les deux intentions qui rapportent, les enterrer dans un menu
générique revient à les perdre.

`#deuil` est une ancre nouvelle, sur la bande deuil de la section 5. Elle s'ajoute aux
quatre ancres déjà figées et suit la même règle : elle ne bougera plus, elle sera
simplement remplacée par `/deuil` le jour où la page existera.

Le menu déroulant de `Nos créations` reste **désactivé au lancement** : les 5 catégories
n'existent pas encore. L'entrée est un lien simple.

## CTA du header · `297:31848`

Le `Primary-btn` cesse d'être « Nous contacter ». Il devient le numéro, cliquable :

```
✦  {TÉLÉPHONE}  ✦
```

Deux raisons : en phase 1 la conversion est un appel ou une visite, pas un formulaire ; et
ça supprime le doublon avec le CTA du hero, qui disait déjà « Nous contacter ».

---

# 2 · Hero · `297:31849`

## Titre · `297:31852`

Un seul `<h1>`, trois niveaux typographiques. **Il manque un sur-titre dans la maquette**,
à créer au-dessus de `297:31853`.

| Rôle | Node | Texte | Typo |
|---|---|---|---|
| Sur-titre | *à créer* | `ARTISAN FLEURISTE À CHALLANS` | IM Fell DW Pica, capitales, sauge, ~18 px |
| Ligne 1 | `297:31853` | `Des compositions florales` | Cinzel 48 px, `#1D1E33` |
| Ligne 2 | `297:31854` | `façonnées à la main` | Updock 76 px, sauge `#5C6B4F` |

**[reporté]** Le sur-titre fait entrer « Challans » dans le H1 sans toucher à la
composition. C'est la correction SEO la plus importante de la page : en l'état, ni le H1
ni le chapô ne contiennent la commune.

Au passage, `d'exceptions` disparaît. La faute d'orthographe se règle, et l'affirmation
invérifiable avec.

## Chapô · `297:31855` **[reporté]**

```
Au 30 rue de Saint-Jean-de-Monts, à Challans, nous composons chaque jour des bouquets,
des compositions et des créations en fleurs séchées, au rythme des saisons. Pour un
mariage, un dernier adieu, ou simplement pour le plaisir d'offrir.
```

Trois choses en trois lignes : l'adresse, les univers de produits, les trois grandes
occasions. **Les ateliers créatifs disparaissent** : ils sont reportés, les annoncer serait
une promesse fausse.

## Boutons

| Node | Type | Libellé | Destination |
|---|---|---|---|
| `297:31857` | `Primary-btn` | `✦ DÉCOUVRIR NOS CRÉATIONS ✦` | `#creations` |
| `297:31858` | `Secondary-btn` | `{TÉLÉPHONE}` | `tel:` |

`En savoir plus` disparaît : le libellé ne dit rien et ne mène nulle part. Le vrai second
choix, c'est appeler.

## Micro-infos · `297:31860` **[reporté]**

Quatre emplacements, quatre informations distinctes. La maquette en gâche un en répétant
« Sur-mesure ».

| Node | Actuel | Corrigé |
|---|---|---|
| `297:31863` | Fleurs de saison | `Fleurs de saison` |
| `297:31866` | Sur-mesure | `Sur-mesure` |
| `297:31869` | Sur-mesure *(doublon)* | `Livraison locale` |
| `297:31872` | Livraison | `Envoi partout en France` |

Le quatrième valorise Florajet : c'est un vrai service, et personne ne le met en avant
localement.

## Texte alternatif de la photo · `297:31874`

```
alt : Fleuriste composant un bouquet de tulipes et de renoncules dans l'atelier de Challans
```

Décrire la photo, jamais la requête. Nom de fichier : `atelier-composition-bouquet-challans.webp`.

---

# 3 · Nos créations · `316:31889` · ancre `#creations`

## H2 · `317:31895` **[reporté]**

```
Nos créations, composées chaque jour à l'atelier
```

## Les 5 univers **[nouveau]**

La maquette n'en montre que 3, tous identiques. La spec en demande 5, disposés en
**3 arches en ligne** puis **2 cartes larges** en dessous. Les fleurs séchées sont mises en
avant volontairement : c'est la niche que personne ne travaille à Challans, et elle colle à
l'univers vintage.

Les descriptions ci-dessous sont en état `autonome`, donc en 2-3 lignes : au lancement les
cartes ne sont pas cliquables, elles doivent se suffire à elles-mêmes.

### Arche 1 · Bouquets · `317:31928`

```
Bouquets

À offrir ou à s'offrir, composés à la demande avec les fleurs arrivées le matin.
Vous nous dites l'occasion et le budget, nous composons devant vous.
```

### Arche 2 · Fleurs séchées · `317:31932`

```
Fleurs séchées

Des bouquets qui traversent les saisons. Graminées, immortelles, eucalyptus :
des compositions qui gardent leur tenue des mois durant, sans aucun entretien.
```

### Arche 3 · Plantes · `317:31938`

```
Plantes

Vertes, fleuries, d'intérieur et d'extérieur. Choisies pour tenir chez vous,
avec les conseils d'entretien qui vont avec, en pot simple ou en cache-pot assorti.
```

### Carte large 1 · Compositions florales · *à créer*

```
Compositions florales

Coupes, centres de table, créations piquées. Pour une table de fête, un buffet
ou un lieu à habiller, composées au format et à la hauteur que vous nous indiquez.
```

### Carte large 2 · Décoration & accessoires · *à créer*

```
Décoration & accessoires

Vases, poteries, objets choisis. Une sélection qui accompagne les fleurs
et se garde bien après elles, renouvelée au fil des trouvailles.
```

## À prévoir dès maintenant

Sous chaque description, **réserver l'emplacement d'un prix** (`à partir de X €`). Il
apparaîtra en phase 2 sans avoir à redessiner la carte. `04-page-accueil.md` et la spec du
block B04 le demandent tous les deux.

## Textes alternatifs

```
Bouquets              alt : Bouquet de saison en tons crème et rose, emballé en papier kraft
Fleurs séchées        alt : Bouquet de fleurs séchées en graminées et immortelles
Plantes               alt : Plantes vertes d'intérieur en pots de terre cuite
Compositions          alt : Centre de table bas en fleurs fraîches, tons crème et sauge
Décoration            alt : Vases en grès et poteries artisanales sur une étagère de la boutique
```

---

# 4 · Bandeau signature · `317:31896`

Le block répète mot pour mot le H2 de la section suivante, à 200 px d'écart. En l'état
c'est un doublon.

Requalifié en **bandeau signature** : une respiration de marque, une phrase courte en
Updock, encadrée des deux étoiles. Fond nuit conservé.

## Texte retenu **[nouveau]**

```
✦   Jamais deux fois la même   ✦
```

Cinq mots. La phrase reprend la formule du texte de l'atelier (« une création à la fois,
jamais deux fois la même ») et fonctionne comme une signature autonome.

**Variantes si celle-ci ne passe pas :**

```
✦   Une création à la fois   ✦
✦   Ce que la saison donne   ✦
```

## Trois contraintes à respecter

1. **Ce n'est pas un titre.** Le bandeau ne porte aucun `Hn` : il est décoratif. Le H2 de
   la section 5 reste le seul titre de cette zone.
2. **Updock, 48 px minimum, 8 mots maximum.**
3. **Le budget Updock de la page est épuisé.** Deux occurrences maximum : le hero en prend
   une, ce bandeau prend la seconde. Il ne peut donc **pas** y avoir de signature manuscrite
   sous le texte de l'atelier, contrairement à ce qu'autorisait `04-page-accueil.md`.

---

# 5 · Pour toutes les occasions · `362:32000` · ancre `#occasions`

## H2 · `362:32003` + `362:32004` **[reporté]**

```
Pour toutes les occasions          (Cinzel)
de la vie                          (Updock : voir avertissement)
```

> **Attention** : `de la vie` est actuellement en Updock dans la maquette. Avec le hero et
> le bandeau signature, cela ferait **trois** occurrences d'Updock sur la page, alors que
> la règle en autorise deux. Deux sorties possibles : passer `de la vie` en Cinzel italique,
> ou renoncer au bandeau signature. Je recommande la première, le bandeau porte davantage.

## CTA de section · `362:32005`

Il pointe aujourd'hui vers une page contact inexistante.

```
✦ NOUS APPELER ✦        →  tel:
```

## Restructuration de la section

`/deuil` ne part pas au lancement. La carte deuil doit donc porter le minimum vital :
le téléphone, les cinq compositions nommées, et les lieux de livraison. Ça ne tient pas
dans une carte au quart de la largeur.

Et une règle de projet l'impose de toute façon : **le deuil n'est jamais traité comme une
occasion parmi d'autres**. Le sortir de la ligne de cartes règle les deux problèmes d'un
coup.

```
┌──────────────┬──────────────┬──────────────┐
│   Mariage    │  Événements  │  Abonnement  │     3 cartes égales (406 px)
│              │              │              │
└──────────────┴──────────────┴──────────────┘

┌─────────────────────────────────────────────┐
│  DEUIL : bande pleine largeur, fond nuit    │     ancre #deuil
│  5 compositions nommées + téléphone         │
└─────────────────────────────────────────────┘
```

## Carte 1 · Mariage · `362:32012` **[nouveau, base reportée]**

```
MARIAGE

Bouquets de mariée

Le bouquet, les boutonnières et les fleurs des mariés, composés avec vous,
pour le jour J. On se voit à la boutique pour parler style, fleurs de saison
et budget, puis vous repartez avec un devis.

Demander un devis  →        #contact
```

**Dire *bouquets*, jamais *décoration*.** Matlo'Fleurs ne fait pas la décoration de lieu :
promettre ce qu'on ne fait pas coûte plus cher que de ne pas être trouvé. Aucun texte de
cette carte, ni son `alt`, ni son `title`, ne doit contenir le mot « décoration ».

Le CTA pointe vers le formulaire du CTA final, pas vers le téléphone : un couple qui prépare
un mariage dans douze mois n'appelle pas, il écrit.

## Carte 2 · Événements · `362:32043` **[nouveau, base reportée]**

```
ÉVÉNEMENTS

Baptêmes, anniversaires, réceptions

Des compositions pour vos tables et vos lieux, à votre image. Dites-nous la date,
le nombre de tables et l'ambiance, nous composons en fleurs de saison.

Nous en parler  →           #contact
```

## Carte 3 · Abonnement floral · `362:32051` **[nouveau, base reportée]**

```
ABONNEMENT

Abonnement floral

Des fleurs fraîches renouvelées chaque semaine, chez vous ou dans votre
établissement. Vous choisissez le rythme et le budget, nous adaptons à la saison.

Nous en parler  →           #contact
```

Formuler « chez vous **ou** dans votre établissement » : l'abonnement particulier existe
aussi, et personne ne le propose localement.

## Bande deuil · `362:32047` élargi · ancre `#deuil` **[nouveau]**

Fond nuit `#1D1E33`, texte crème. Pas de photo, ou une photo très sobre. Aucun bouton
d'accent, aucun ressort commercial, aucun emoji.

```
DEUIL

Fleurs de deuil

Nous composons gerbes, coussins, raquettes, couronnes et dessus de cercueil,
livrés au funérarium, à l'église ou au cimetière, à Challans et dans les
communes alentour. Appelez-nous, nous prenons le temps qu'il faut.
```

Puis le lexique, en cinq lignes. C'est le point qui compte : quelqu'un qui organise des
obsèques ne connaît pas ces mots et n'osera pas demander.

```
Gerbe               Composition allongée, posée à plat ou portée.
Coussin             Forme pleine et bombée, posée sur le cercueil.
Raquette            Forme ronde prolongée d'un manche, posée contre le cercueil.
Couronne            Cercle de fleurs, à poser ou à suspendre.
Dessus de cercueil  Composition qui en recouvre toute la longueur.
```

**[à valider]** Ces cinq définitions sont écrites d'après l'usage courant du métier. À
faire relire par la fleuriste avant publication : c'est le seul endroit de la page où une
imprécision serait vue immédiatement par quelqu'un du funéraire.

Enfin, le téléphone. **En clair, en grand, pas derrière un lien.**

```
{TÉLÉPHONE}
```

Taille minimale 32 px, cliquable. Quelqu'un qui vient de perdre un proche ne doit pas avoir
à chercher comment vous joindre.

## Contraste des cartes

Les trois cartes portent aujourd'hui un texte crème posé directement sur une photo claire.
Sur la partie ciel des visuels, c'est illisible. Il faut un voile nuit à 45-55 % sous la
zone de texte, ou un dégradé du bas. La cible monte jusqu'aux seniors : c'est un défaut
d'accessibilité, pas une préférence esthétique.

## Textes alternatifs

```
Mariage      alt : Bouquet de mariée champêtre en tons crème et pêche, tenu par la mariée
Événements   alt : Centre de table fleuri sur une table de réception dressée
Abonnement   alt : Composition fraîche posée sur le comptoir d'un restaurant
Deuil        alt : Coussin de fleurs blanches et de feuillage, composé à l'atelier
```

---

# 6 · L'atelier & la reprise · `317:31899` · ancre `#atelier`

## Sur-titre · `363:32058`

```
L'ATELIER
```

## H2 · `363:32064` **[reporté]**

```
La boutique du 30 rue de Saint-Jean-de-Monts continue
```

**À remplacer par `Derrière Matlo'Fleurs` au bout de 3 ou 4 mois.** Le rachat est un
contenu, pas un secret, mais il ne doit pas devenir un bloc permanent : passé un trimestre,
Matlo'Fleurs n'est plus « l'ancienne boutique de », c'est Matlo'Fleurs.

## Texte · `363:32065` **[nouveau, deux premiers paragraphes reportés]**

État `autonome` : il n'y a pas de page `/l-atelier`, ce texte est donc la seule fois où
l'histoire se raconte. Cinq paragraphes.

```
Vous connaissiez peut-être déjà cette boutique. Elle change de mains, pas d'esprit.

Je m'appelle {PRÉNOM}, et j'y compose désormais chaque jour des fleurs choisies pour
leur saison, dans un métier que j'exerce comme un artisanat : à la main, une création
à la fois, jamais deux fois la même.

Ce qui ne change pas : l'adresse, le numéro de téléphone, et l'habitude de pousser
cette porte pour un bouquet de dernière minute. Ce qui change : un nom, une maison
à moi, et une façon de travailler qui suit ce que la saison donne plutôt qu'un
catalogue.

Les fleurs arrivent plusieurs fois par semaine. C'est ce qui me permet de vous dire,
en vous regardant, ce qui est beau aujourd'hui et ce qui tiendra le mieux chez vous.
Une fleur de saison coûte moins cher, dure plus longtemps, et sent quelque chose.

Bouquets du quotidien, mariages, deuils, abonnements : la boutique est ouverte
du mardi au dimanche matin. Passez, même sans idée précise. C'est souvent comme ça
que naissent les plus beaux bouquets.
```

**[à valider]** « Les fleurs arrivent plusieurs fois par semaine » vient d'un exemple de
`02-blocks-et-maquette.md` (« arrivage 3× / semaine »), pas d'une information confirmée.
Si le rythme réel est différent, corriger ou retirer la phrase : c'est une promesse de
fraîcheur, elle doit être vraie.

## CTA · `363:32067`

Le texte étant complet, `Découvrir l'atelier` n'a pas de destination. Le CTA renvoie vers
l'information qui convertit :

```
✦ VENIR À LA BOUTIQUE ✦     →  #boutique
```

## Photo · `363:32056`

**Un vrai portrait, pas une illustration, pas une banque d'images.** C'est le seul élément
qu'aucun concurrent local ne montre, et il ne coûte qu'une séance photo. En arche, variante
`portrait` 320 px.

```
alt : {PRÉNOM}, artisan fleuriste, dans son atelier du 30 rue de Saint-Jean-de-Monts à Challans
```

## Pas de signature Updock ici

Le budget de deux occurrences est consommé par le hero et le bandeau signature. Si vous
tenez à la signature manuscrite sous le texte, il faut renoncer au bandeau de la section 4.

---

# 7 · Livraison · `363:32188`

`04-page-accueil.md` place ce block après l'ouverture, parce que la zone de livraison
figure déjà dans le block boutique. Le block étant conservé, **l'information est retirée du
block boutique** et ne vit plus qu'ici. Elle apparaît donc deux fois sur la page, pas trois :
deux mots dans les micro-infos du hero, le développement ici.

## Sur-titre · `363:32195`

```
LIVRAISON
```

## H2 · `363:32196` **[nouveau]**

```
Où nous livrons vos fleurs autour de Challans
```

`Livraison locale` seul ne porte aucune requête. Cette formulation est le patron donné par
`03-seo-local.md` pour un H2 de block.

## Texte · `363:32197` **[nouveau]**

```
Nous livrons en personne à Challans et dans un rayon de 20 km : Sallertaine, Soullans,
Le Perrier, Bois-de-Céné, Saint-Christophe-du-Ligneron, Saint-Gervais, Beauvoir-sur-Mer,
Commequiers, La Garnache et Froidfond.

Et partout ailleurs en France, nous expédions vos fleurs par le réseau Florajet :
un fleuriste local les compose et les livre à votre place, où que soit la personne.
```

**[à valider]** Deux points à trancher avant publication :
- La liste des communes diffère entre les documents. `03-seo-local.md` en compte 12,
  `04-page-accueil.md` en compte 10. Manquent dans la seconde : **Saint-Jean-de-Monts** et
  **Saint-Hilaire-de-Riez**. La liste ci-dessus reprend celle de `04`. Elle doit être
  identique au `areaServed` du schema et à la zone desservie de la fiche Google.
- Aucun **délai de commande** n'est documenté. Si une commande passée avant une certaine
  heure part le jour même, c'est un argument fort et il manque. Sinon, ne rien écrire.

Les communes restent du texte simple au lancement. Elles deviendront les liens
`/livraison/{commune}` en phase 3.

## CTA · `381:159`

```
✦ NOUS APPELER ✦        →  tel:
```

## Photo · `363:32190`

```
alt : Bouquet préparé pour la livraison, emballé et prêt à partir
```

---

# 8 · Notre boutique à Challans · `317:31902` · ancre `#boutique`

**Le block le plus important de la page en phase 1.** Le CA de l'ouverture vient du trafic
physique.

## H2 · `317:31904` **[nouveau]**

```
Notre boutique à Challans : adresse et horaires
```

La maquette écrit `Notre boutique à challans`, avec un c minuscule. Et la version complète
porte une requête secondaire au lieu d'un libellé nu.

## Adresse · `379:43` + `379:47` **[reporté]**

```
30 rue de Saint-Jean-de-Monts
85300 Challans
```

**Écriture figée.** Cette chaîne doit être identique, caractère pour caractère, au pied de
page, au JSON-LD et à la fiche Google Business Profile. Pas d'abréviation `r.`, pas de
`Saint Jean de Monts` sans traits d'union, pas de virgule ajoutée.

Seule exception, prévue par `04-page-accueil.md` : la barre d'information affiche la forme
courte `30 rue de Saint-Jean-de-Monts, Challans`, sans le code postal, faute de place sur
une ligne de 36 px. C'est la seule variante tolérée, et elle ne doit pas se propager
ailleurs.

## Horaires · `379:88` **[reporté, tirets corrigés]**

```
Lundi        fermé
Mardi        9h-12h30 · 14h30-19h
Mercredi     9h-12h30 · 14h30-19h
Jeudi        9h-12h30 · 14h30-19h
Vendredi     9h-12h30 · 14h30-19h30
Samedi       9h-12h30 · 15h-19h30
Dimanche     9h-12h30
```

> Les demi-cadratins des plages horaires sont remplacés par des traits d'union
> simples, qui sont l'usage correct pour une plage de valeurs.

**[tranché 2026-08-30]** Horaires confirmés par la fleuriste. Les valeurs
précédentes de ce document et de `04-page-accueil.md` étaient fausses sur **six jours
sur sept** : la coupure de midi est à **12h30**, pas à 13h. Le vendredi ferme à 19h30,
le samedi rouvre à 15h et ferme à 19h30, le dimanche ferme à 12h30.

Ces horaires sont désormais portés par `src/data/site.ts`, qui alimente le block
boutique, la barre d'information et le `openingHoursSpecification` du schema. Ils
doivent être reportés à l'identique sur la fiche Google Business Profile.

Trois règles techniques : les horaires sont du **texte HTML**, jamais une image, c'est ce
que Google recoupe avec la fiche. Le jour en cours est mis en évidence en sauge. Et la
carte se charge **au clic** (image statique plus bouton), une carte Google embarquée en
chargement direct détruit le LCP.

## Téléphone · `381:150`

```
{TÉLÉPHONE}
```

## Boutons · **à créer**

Absents de la maquette. Ce sont les deux seules actions qui comptent sur ce block.

```
[ ITINÉRAIRE ]              Secondary-btn  →  lien Google Maps de la fiche
[ ✦ NOUS APPELER ✦ ]        Primary-btn    →  tel:
```

Sur mobile, l'appel passe en premier.

## Ce qui sort de ce block

La **zone de livraison** est retirée d'ici. Elle est portée par le block 7, juste
au-dessus. Sans ça, la même liste de communes apparaîtrait deux fois à 400 px d'écart.

## Carte · `379:39`

```
alt : Plan de situation de la boutique Matlo'Fleurs, 30 rue de Saint-Jean-de-Monts à Challans
```

---

# 9 · Réseaux sociaux · `381:227`

## H2 · `381:229` **[nouveau]**

```
Ce qui sort de l'atelier, jour après jour
```

`Nous suivre sur nos réseaux` décrit l'action du visiteur, pas le contenu. La formulation
ci-dessus dit ce qu'on y trouve, et sert la preuve d'activité.

## Intro · `382:303` **[nouveau]**

```
Nous publions sur Instagram et Facebook les créations du jour, les arrivages
et les coulisses de la boutique. C'est le meilleur endroit pour voir ce qui
est beau en ce moment.
```

## CTA · `382:304`

```
NOUS SUIVRE        →  URL Instagram
```

**[à valider]** Les URLs Instagram et Facebook ne sont écrites nulle part dans le projet.
Elles servent aussi au `sameAs` du schema.

## Condition de publication

**Ce block ne doit pas être mis en ligne tant qu'il n'y a pas 6 vraies publications.** Six
vignettes de banque d'images, ou six fois la même photo, valent moins que l'absence du
block : c'est précisément le signal inverse de celui qu'on cherche. Il dépend de la séance
photo et de l'alimentation du compte.

Chargement différé obligatoire, l'embed pèse sur le LCP.

---

# 10 · CTA final · `317:31905` · ancre `#contact`

## H2 · `363:32075` **[reporté]**

```
Une envie, une date, une question ?
```

## Sous-titre · `363:32105` **[reporté, ponctuation corrigée]**

```
Passez à la boutique, ou appelez-nous. On compose avec vous.
```

> `04-page-accueil.md` écrivait un cadratin avant « on compose ». Remplacé par un point.

## Boutons · `363:32108` + `363:32116`

```
✦ NOUS APPELER ✦        Primary-btn    →  tel:
NOUS ÉCRIRE             Secondary-btn  →  ancre vers le formulaire ci-dessous
```

Toujours deux actions, jamais une seule. Sur mobile, l'appel passe en premier.

## Formulaire intégré · **à créer** **[nouveau]**

C'est l'ajout le plus important de cette section. Sans page `/contact`, **il n'existe aucun
endroit sur le site où déposer une demande de devis mariage**, alors que c'est la deuxième
priorité de conversion du projet. Les deux boutons actuels ne suffisent pas.

Un service tiers convient tant que la stack n'est pas choisie.

```
Nom et prénom *                    [                                    ]

Téléphone *                        [                                    ]

E-mail                             [                                    ]

Votre demande *                    ( ) Un bouquet, une composition
                                   ( ) Un mariage
                                   ( ) Des fleurs de deuil
                                   ( ) Un abonnement floral
                                   ( ) Autre

Pour quelle date ?                 [                                    ]

Votre message *                    [                                    ]
                                   [                                    ]
                                   [                                    ]

                                   [ ✦ ENVOYER ✦ ]
```

Mention sous le bouton :

```
Vos coordonnées servent uniquement à répondre à votre demande. Elles ne sont ni
revendues ni utilisées à d'autres fins. Voir notre politique de confidentialité.
```

Message de confirmation :

```
Merci, votre message est parti.

Nous répondons sous 24 h ouvrées. Pour une demande urgente, appelez-nous
au {TÉLÉPHONE} : la boutique est ouverte du mardi au dimanche matin.
```

Trois principes : le téléphone est **obligatoire**, l'e-mail non, parce qu'un rappel
convertit mieux qu'un échange de courriels sur ce métier. Le champ « Votre demande » qualifie
sans imposer un formulaire différent par intention. Et la confirmation redonne toujours le
téléphone et les horaires.

**[à valider]** Le délai de 24 h ouvrées est une promesse. À confirmer avant publication,
ou à retirer.

## Photos du block

Les quatre visuels débordent du cadre (`x = -108`, et jusqu'à 1264 pour une largeur de
contenu de 1240). Ils sont recadrés par le bord de page, et leur comportement en responsive
n'est pas défini. À rentrer dans la grille ou à assumer explicitement en bleed pleine
largeur.

---

# 11 · Pied de page · `363:32121`

Le footer actuel ne contient que le logo, deux réseaux et la ligne légale. **Il ne maille
rien.** Les quatre colonnes de `04-page-accueil.md` sont à créer.

## Les 4 colonnes, en version lancement **[reporté, destinations adaptées]**

Au lancement, aucune destination n'existe : toutes les entrées pointent vers l'ancre de la
section qui en parle. Les libellés ne changeront plus, seules les destinations basculeront.

| Nos créations → `#creations` | Occasions | La maison | Infos pratiques |
|---|---|---|---|
| Bouquets | Mariage → `#occasions` | L'atelier → `#atelier` | 30 rue de Saint-Jean-de-Monts, 85300 Challans |
| Compositions | Deuil → `#deuil` | Contact → `#contact` | Horaires |
| Fleurs séchées | Événements → `#occasions` | | {TÉLÉPHONE} |
| Plantes | Abonnement floral → `#occasions` | | Livraison & zone desservie → `#boutique` |
| Décoration & accessoires | | | |

`Journal` est retiré de la colonne « La maison » au lancement : la page n'existe pas et
n'existera pas avant trois articles.

## Sous les colonnes **[reporté]**

Logo vertical complet (`363:32122`), c'est le seul endroit du site où il a la place de
respirer. Baseline `ARTISAN FLEURISTE`. Facebook et Instagram. Puis :

```
© 2026 Matlo'Fleurs  ·  Mentions légales  ·  Politique de confidentialité
```

Ces deux liens sont les seuls de toute la page qui sortent vers une vraie URL. Les deux
pages doivent exister le jour de l'ouverture.

---

# Balises et structure SEO

## `<title>` **[reporté, cadratin remplacé]**

```
Matlo'Fleurs · Artisan fleuriste à Challans (85)
```

47 caractères, sous la limite de 60. `03-seo-local.md` écrivait ce titre avec un cadratin,
remplacé par un point médian.

## Meta description **[réécrite]**

La version de `03-seo-local.md` fait 134 caractères, sous le plancher interne de 140.
Version corrigée, **152 caractères**, à écrire sur une seule ligne :

```
Bouquets, compositions et plantes créés à la main à Challans. Mariage, deuil, quotidien. Livraison à 20 km, envoi partout en France. Ouvert le dimanche.
```

Deux ajouts, deux raisons. « Envoi partout en France » comble l'écart de caractères et fait
entrer Florajet dans la SERP, ce qu'aucun concurrent local ne fait. « Ouvert le dimanche »
répond à une des quatre requêtes secondaires de la page, `fleuriste Challans ouvert`.

Variante plus précise, à 158 caractères, donc à la limite haute :

```
Bouquets, compositions et plantes créés à la main à Challans. Mariage, deuil, quotidien. Livraison à 20 km, envoi partout en France. Ouvert le dimanche matin.
```

## Plan des titres

Un seul `H1`, aucun saut de niveau, chaque `H2` en langage naturel portant une requête
secondaire.

```
H1   Artisan fleuriste à Challans · Des compositions florales façonnées à la main
H2   Nos créations, composées chaque jour à l'atelier
     H3   Bouquets · Fleurs séchées · Plantes · Compositions florales · Décoration & accessoires
H2   Pour toutes les occasions de la vie
     H3   Bouquets de mariée
     H3   Baptêmes, anniversaires, réceptions
     H3   Abonnement floral
     H3   Fleurs de deuil
H2   La boutique du 30 rue de Saint-Jean-de-Monts continue
H2   Où nous livrons vos fleurs autour de Challans
H2   Notre boutique à Challans : adresse et horaires
H2   Ce qui sort de l'atelier, jour après jour
H2   Une envie, une date, une question ?
```

Le bandeau signature de la section 4 ne porte **aucun** `Hn` : il est décoratif.

## Ancres figées

`#creations` · `#occasions` · `#deuil` · `#atelier` · `#boutique` · `#contact`

`#deuil` est nouvelle, imposée par le fait que la page `/deuil` ne part pas au lancement.
Les six sont définitives : le jour où une page existe, on remplace l'ancre par l'URL, rien
ne bouge visuellement, aucune redirection.

**Aucun lien de cette page ne sort du site au lancement**, à l'exception des mentions
légales, de la politique de confidentialité, des deux réseaux sociaux et du lien Google Maps.

---

# Récapitulatif des informations manquantes

Tout ce qui suit bloque la mise au propre. Aucune de ces valeurs n'a été inventée.

| Information | Où elle sert | Criticité |
|---|---|---|
| **Numéro de téléphone réel** | 9 emplacements sur la page, plus le JSON-LD, la fiche Google et le pied de page | **Bloquant.** C'est l'actif hérité n°1 de la reprise et la conversion n°1 de la phase 1 |
| **Prénom de la fleuriste** | Texte de l'atelier, à la première personne, et son `alt` | Bloquant pour la section 6 |
| **Horaires du samedi** | Block boutique, barre d'info, schema, fiche Google | Bloquant, divergence entre deux documents |
| **Liste des communes** | Block livraison, `areaServed`, zone Google | Bloquant, 10 ou 12 selon le document |
| **URLs Instagram et Facebook** | Block réseaux, pied de page, `sameAs` | Bloquant pour la section 9 |
| **Date d'ouverture** | Variante `annonce` de la barre d'information | Non bloquant, la variante peut attendre |
| **Nom de domaine exact** | `url` du schema, canoniques | Non bloquant pour la maquette |
| **Délai de réponse réel** | Message de confirmation du formulaire | À confirmer ou à retirer |
| **Délai de commande jour même** | Block livraison | Argument fort s'il existe, à ne pas écrire sinon |
| **Rythme d'arrivage des fleurs** | Paragraphe 4 de l'atelier | À confirmer, c'est une promesse de fraîcheur |
| **Définitions des 5 compositions de deuil** | Bande deuil | À faire relire par la fleuriste |
| **Fourchettes de prix par gamme** | Pas sur l'accueil au lancement | C'est l'objection n°1 de deux cibles sur quatre. À prévoir pour `/mariage` |

---

# Recommandations sur la maquette

Classées par ce qu'elles coûtent à corriger.

## Blocks à créer

1. **Barre d'information.** Absente. Ni horaire, ni adresse, ni téléphone avant le pied de
   page, c'est-à-dire après 6400 px de scroll. Trois cibles sur quatre viennent chercher
   exactement ces trois informations. C'est la correction au meilleur rapport
   effort / effet de toute la page.
2. **Formulaire dans le CTA final.** Sans page contact, aucune demande de devis mariage ne
   peut être déposée nulle part sur le site.
3. **Colonnes du pied de page.** Le footer ne maille rien.
4. **Les 2 univers manquants** dans « Nos créations », et le passage de 3 arches identiques
   à 3 arches plus 2 cartes larges.
5. **Boutons `Itinéraire` et `Nous appeler`** sur le block boutique.
6. **Sur-titre du hero.** Une ligne de texte, qui règle la faille SEO principale de la page.

## Ordre des blocks

7. **Intervertir livraison et boutique.** La zone de livraison est annoncée avant que
   l'adresse de la boutique ait été donnée. Ordre correct : atelier, boutique, livraison.
8. **Sortir le deuil de la ligne de cartes** (voir section 5).
9. **Réseaux sociaux : à ne pas publier** tant que le compte n'a pas 6 vraies publications.

## Contenu

10. **Carte deuil** : elle porte une photo de mariage et un texte de bouquet de mariée.
    C'est l'erreur la plus visible de la maquette, sur le parcours le plus sensible.
11. **Bandeau nuit** : répète le H2 situé 200 px plus bas. À requalifier en signature.
12. **`Notre boutique à challans`** : Challans sans majuscule.
13. **Trois occurrences d'Updock** si le bandeau signature est ajouté sans repasser
    `de la vie` en Cinzel. La règle en autorise deux.
14. **Prévoir l'emplacement du prix** sur les cartes création, pour ne pas les redessiner
    en phase 2.

## UI / UX

15. **Contraste des cartes occasions.** Texte crème sur photo claire, sans voile ni dégradé.
    Illisible sur la partie ciel. Cible senior : c'est un défaut d'accessibilité.
16. **Cartes occasions sans CTA visible.** La spec en demande un par carte.
17. **Blanc pur `#FFFFFF` sur 4 blocks** (`block-services`, `block-occasions` liste, les
    deux `block-contact`). Le blanc pur n'est pas dans la palette et casse la règle
    « crème dominante à 70 % ». Passer en crème.
18. **Photos débordantes du block CTA** (`x = -108`, jusqu'à 1264 sur 1240). Recadrées par
    le bord de page, comportement non défini en responsive.
19. **Pas de version mobile.** Plus de la moitié du trafic d'un commerce local vient du
    téléphone, souvent depuis Google Maps. Le téléphone doit rester accessible en un tap
    depuis l'en-tête mobile, jamais enfoui dans le menu.

## Système de design

20. **Variables Figma non branchées.** `get_variable_defs` renvoie `{}` sur `297:31806` :
    couleurs et typos sont en dur sur tout le frame, comme sur l'ancienne maquette.
    **À rebrancher avant de produire quoi que ce soit d'autre**, sinon chaque nouveau bloc
    reproduit des valeurs en dur.
21. **Crème à figer.** La maquette utilise `#F3EDE1`, l'identité print dit `#F5F0E8`.
    C'est la couleur dominante de tout le site, et le seul token de la palette qui n'a de
    valeur écrite nulle part.
22. **Cormorant Garamond.** `04-page-accueil.md` spécifie 18 px sur les cartes création et
    17 px sur les cartes occasion, alors que la même partie D pose 20 px comme minimum
    absolu. Contradiction interne. Recommandation : Medium (500) à 20 px minimum partout,
    à trancher sur un vrai paragraphe de 300 mots, pas sur une ligne de maquette.
