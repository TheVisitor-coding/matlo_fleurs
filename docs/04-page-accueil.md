---
type: project-doc
date: 2026-08-23
project: matlo_fleurs
tags: [design, ui, page-accueil, figma, contenu, copywriting]
---

# 04 — Page d'accueil : spécification complète

> Document de travail Figma. Relevé de l'existant, puis structure section par section
> avec les textes rédigés. Remplace la section « Accueil » du document 02.
>
> **La partie E est déterminante** : la page d'accueil sort **seule** à l'ouverture, les
> autres pages arrivent ensuite. Ça change la navigation, les CTA et la conception de
> chaque section — à lire avant de dessiner.

---

# Partie A — Relevé de la maquette existante

Lu dans Figma le 2026-08-23 (frame `Homepage` 259:1083).

## Tokens réels (à intégrer dans les documents 02 et 03)

| Rôle | Valeur relevée | Écart avec le cadrage initial |
|---|---|---|
| Fond dominant | Crème | **Inversion** : le crème domine, le nuit est l'accent. Le 70/25/5 annoncé ne décrit pas le web. |
| Bleu nuit | `#1D1E33` | Conforme. Bouton primaire, bordure d'arche extérieure. |
| Sauge | **`#5C6B4F`** | **Ce n'est pas `#8A9A82`.** Plus foncée, plus olive. C'est la couleur d'accent unique du site. |
| Bronze | **absent** | `#B8965A` n'apparaît nulle part. Remplacé par la sauge. |
| Ardoise | non utilisée | `#243A47` reste en réserve pour la page `/deuil`. |
| Texte | `#000000` | Noir pur sur les titres et le corps. À basculer sur `#1D1E33`. |

| Rôle typo | Police relevée | Taille |
|---|---|---|
| Titres, boutons | **Cinzel** Regular | H1 48 px · boutons 16 px capitales |
| Ligne script | **Updock** Regular | 76 px, en sauge |
| Corps | **Cormorant Garamond** Regular | 24 px, interligne 32 |
| Micro-labels | **IM Fell DW Pica** Regular | 20 px, en sauge |

Inter n'est pas utilisée. Le système repose donc sur **4 familles**, dont 3 serif
historiques et 1 script.

## Ce qui marche déjà

L'**arche** est la meilleure trouvaille de la maquette. Double filet nuit + sauge, sommet
arrondi : c'est une signature forte, immédiatement identifiable, et parfaitement dans le
registre « boutique de fleurs à l'ancienne » sans passéisme. **Elle doit devenir le motif
structurant de tout le site** — cartes de catégories, portrait de l'atelier, vignettes de
galerie. C'est ce qui remplacera avantageusement toute ornementation ajoutée.

Le déséquilibre Cinzel capitales / Updock script en sauge sur deux lignes fonctionne :
le contraste porte l'émotion sans que la page devienne décorative. À conserver tel quel.

La séparation texte-gauche / arche-droite tient bien, et les 4 micro-infos sous le filet
sauge sont exactement le bandeau de réassurance dont la page a besoin — inutile d'en
ajouter un second plus bas.

## Ce qui doit être corrigé

| # | Problème | Correction |
|---|---|---|
| 1 | **« d'exceptions »** | Faute : `exception` au singulier. |
| 2 | **Micro-info dupliquée** | « Sur-mesure » apparaît deux fois (nœuds `266:1348` et `266:1356`). |
| 3 | **« animons des ateliers créatifs »** dans le chapô | Les ateliers ne sont pas prévus au lancement. À retirer, à reprendre plus tard. |
| 4 | **Aucune mention de Challans** dans le H1 ni le chapô | Faille SEO majeure : c'est *la* requête locale. Voir le H1 proposé en partie C. |
| 5 | **Couleurs en dur** | `get_variable_defs` renvoie vide : aucune variable n'est liée à ce frame. À rebrancher avant de créer d'autres blocks. |
| 6 | **`text-black`** sur H1 et corps | Passer en `#1D1E33`. Le noir pur casse la palette et fatigue la lecture. |
| 7 | **Deux CTA « Nous contacter »** (header + hero) | Le header passe au **numéro de téléphone**. En phase 1, l'appel est la conversion. |
| 8 | **« En savoir plus »** en CTA secondaire | Libellé creux. Remplacer par une destination réelle. |
| 9 | **Nav : Services / Atelier / A Propos** | « Services » est vague, « Atelier » et « A Propos » font doublon, et ni Mariage ni Deuil n'est visible. Voir partie B. |
| 10 | **Pas de barre d'info** | Ni horaires, ni adresse, ni téléphone avant le pied de page. |
| 11 | **Cormorant Garamond en corps** | Police à graisse très fine. Tient à 24 px sur le hero, mais à surveiller sur les textes longs et les formulaires — la cible va jusqu'aux seniors. Voir partie D. |

---

# Partie B — Ce que change le rachat

**Matlo'Fleurs reprend la boutique secondaire de La Halle aux Fleurs, au 30 rue de
Saint-Jean-de-Monts, 85300 Challans.** Cette information change trois choses.

## 1. La concurrence n'est plus celle que j'avais décrite

La Halle aux Fleurs est le **cédant**, pas un concurrent frontal — mais elle **conserve sa
boutique principale au 24b boulevard Viaud** et son domaine exact-match
`fleurs-challans.com`. Elle reste donc l'acteur dominant localement. La différence, c'est
qu'il n'y a plus de raison de se positionner *contre* elle : le bon angle est la
**continuité assumée** d'un lieu que les habitants connaissent déjà, avec une identité
neuve.

Restent en face : Le Vent des Fleurs, Atome Floral, Floreveur, Pépites de Fleurs.

## 2. Les trois enjeux de reprise — réglés le 2026-08-23

Ils se jouaient pendant la passation et ne se rattrapaient pas. État :

- ✅ **Téléphone fixe conservé.** C'était le levier décisif : le numéro est cité depuis
  des années à cette adresse sur PagesJaunes, Google, Florajet, 123fleurs. On hérite de
  tout ce capital de citations sans rien faire.
- ✅ **Fiche Google créée**, en attente de l'ouverture pour publication.
- ✅ **Ancienne fiche et NAP du cédant supprimés**, passation gérée hors périmètre du site.

**Une conséquence à intégrer au site** : la fiche étant recréée et non renommée, aucun
avis n'est repris. Le bloc « Avis Google » reste donc **masqué jusqu'à 5 avis minimum**
(cf. partie E), et la collecte d'avis devient une priorité du jour 1 — QR code sur le
comptoir et sur le ticket, demande orale systématique.

## 3. Le rachat est un contenu, pas un secret

Les habitants de Challans connaissent ce commerce. Le dire clairement est un accélérateur
de confiance, pas un aveu de faiblesse — et c'est une histoire que la presse locale
(Ouest-France, Le Courrier Vendéen) publie volontiers.

Où le raconter :
- **Barre d'annonce** au lancement, quelques semaines.
- **Un paragraphe** dans le bloc atelier de l'accueil (section 6 ci-dessous).
- **La version longue** sur `/l-atelier`.

Ce qu'il ne faut pas faire : en faire un bloc permanent de la page d'accueil. Au bout de
trois mois, Matlo'Fleurs n'est plus « l'ancienne boutique de », c'est Matlo'Fleurs.

## 4. Réponses intégrées

- **Mariage = bouquets uniquement.** Pas de décoration de lieu. Ça allège la page
  `/mariage`, et ça déplace la cible SEO de `décoration florale mariage` (très concurrentiel,
  et malhonnête si on ne le fait pas) vers **`bouquet de mariée Challans / Vendée`** —
  moins disputé et exact. La carte « Mariage » de l'accueil doit dire *bouquets de mariée
  et fleurs des mariés*, jamais « décoration ».
- **Livraison en propre + Florajet.** Deux services distincts, deux arguments distincts :
  livraison locale autour de Challans, **et envoi partout en France** depuis la boutique.
  Le second est un vrai produit, il mérite d'être dit sur l'accueil.
- **Ateliers floraux : reportés.** Retirés du chapô du hero. Idée conservée dans le
  document 00 — c'est le meilleur levier de contenu local à coût nul quand elle voudra
  s'y mettre.

---

# Partie C — Structure de la page d'accueil

**9 sections pour l'ouverture, 4 ajoutées ensuite.** Le principe : un visiteur doit
pouvoir décider de venir en boutique sans quitter la page, et un visiteur en urgence
(deuil) doit trouver le téléphone sans scroller.

```
┌─ MINIMUM POUR L'OUVERTURE ────────────────────────────┐
│  1  Barre d'information                    ← à créer  │
│  2  Header                                 ← à ajuster│
│  3  Hero                                   ← à corriger│
│  4  Nos créations — 5 univers              ← à créer  │
│  5  Pour toutes les occasions — 4 cartes   ← à créer  │
│  6  L'atelier & la reprise                 ← à créer  │
│  7  Notre boutique à Challans              ← à créer  │
│  8  CTA final                              ← à créer  │
│  9  Pied de page                           ← à créer  │
└───────────────────────────────────────────────────────┘
┌─ ENSUITE ─────────────────────────────────────────────┐
│ 10  Ce qui est beau en ce moment                      │
│ 11  Livraison & envoi partout en France               │
│ 12  Avis Google                                       │
│ 13  Instagram                                         │
└───────────────────────────────────────────────────────┘
```

---

## 1 — Barre d'information

**Objectif** : donner l'horaire, l'adresse et le téléphone avant le premier scroll.
**Hauteur** : 36-40 px. Fond nuit `#1D1E33`, texte crème, IM Fell DW Pica 14 px.

**Contenu** :
```
Ouvert aujourd'hui jusqu'à 19h   ·   30 rue de Saint-Jean-de-Monts, Challans   ·   02 XX XX XX XX
```

**Variante `annonce`** (fond sauge `#5C6B4F`, texte crème), à afficher les premières
semaines :
```
La boutique du 30 rue de Saint-Jean-de-Monts a changé de mains — bienvenue chez Matlo'Fleurs
```

**Mobile** : horaire du jour + téléphone uniquement.

---

## 2 — Header

À partir de l'existant. Trois ajustements.

**Navigation** — remplacer `Accueil · Services · Atelier · A Propos · Contact` par :

```
Nos créations ▾     Mariage     Deuil     L'atelier     Contact
```

Pourquoi : « Services » ne dit rien et n'est cherché par personne ; « Atelier » et
« A Propos » racontent la même chose ; et surtout, **Mariage et Deuil sont les deux pages
qui rapportent** — les enterrer dans un menu générique, c'est perdre les deux intentions
les plus fortes du métier. « Accueil » est inutile : le logo y mène déjà.

Le menu déroulant « Nos créations » liste les 5 univers de la section 4, avec une
vignette-arche par entrée plutôt qu'une liste de texte.

**CTA** — le bouton `NOUS CONTACTER` devient le **numéro de téléphone**, cliquable :

```
✦  02 XX XX XX XX  ✦
```

En phase 1 la conversion est un appel ou une visite, pas un formulaire. Et ça supprime le
doublon avec le CTA du hero.

**Logo** — la version relevée (rose + logotype + baseline sur une ligne, 184 px) est la
bonne. Ne pas descendre en dessous : la baseline « ARTISAN FLEURISTE » est déjà à la
limite de lisibilité à 10 px.

---

## 3 — Hero

Structure conservée. Seuls les textes changent.

**Titre** — trois niveaux dans un seul `<h1>` :

| Ligne | Police | Texte |
|---|---|---|
| Sur-titre | IM Fell DW Pica, capitales, sauge, ~18 px | `ARTISAN FLEURISTE À CHALLANS` |
| Ligne 1 | Cinzel 48 px, `#1D1E33` | `Des compositions florales` |
| Ligne 2 | Updock 76 px, sauge `#5C6B4F` | `façonnées à la main` |

Le sur-titre règle le problème SEO sans toucher à la composition : « Challans » entre dans
le H1, et la hiérarchie visuelle reste identique. Au passage, `exception` retrouve son
singulier — et disparaît, ce qui règle aussi le fait que c'était une affirmation
invérifiable.

**Chapô** (Cormorant Garamond 24 px) :

> Au 30 rue de Saint-Jean-de-Monts, à Challans, nous composons chaque jour des bouquets,
> des compositions et des créations en fleurs séchées, au rythme des saisons. Pour un
> mariage, un dernier adieu, ou simplement pour le plaisir d'offrir.

Trois choses en trois lignes : l'adresse (signal local), les univers de produits, et les
trois grandes occasions. Les ateliers ont disparu.

**Boutons** :

| | Libellé | Destination |
|---|---|---|
| Primaire (nuit) | `✦ DÉCOUVRIR NOS CRÉATIONS ✦` | `/nos-creations` |
| Secondaire (contour sauge) | `02 XX XX XX XX` | `tel:` |

`En savoir plus` ne mène nulle part et ne dit rien. Le vrai second choix, c'est appeler.

**Micro-infos** — corriger le doublon, et utiliser les 4 emplacements à plein :

```
✦ Fleurs de saison      ✦ Sur-mesure      ✦ Livraison locale      ✦ Envoi partout en France
```

Le quatrième valorise Florajet, qui est un vrai service et que personne ne met en avant
localement.

**Photo** — celle en place (la fleuriste au travail, lumière naturelle, arche) est juste.
C'est exactement ce qu'aucun concurrent ne montre. La garder, en vraie photo de ta mère
dès que possible.

---

## 4 — Nos créations

**Objectif** : montrer ce qu'on trouve en boutique, et poser la taxonomie qui deviendra
celle de la boutique en ligne.

**H2** : `Nos créations, composées chaque jour à l'atelier`

**5 univers**, en cartes-arches — le motif du hero devient le système :

| Univers | URL | Une ligne |
|---|---|---|
| **Bouquets** | `/nos-creations/bouquets` | À offrir ou à s'offrir, composés à la demande |
| **Compositions florales** | `/nos-creations/compositions` | Coupes, centres de table, créations piquées |
| **Fleurs séchées** | `/nos-creations/fleurs-sechees` | Des bouquets qui traversent les saisons |
| **Plantes** | `/nos-creations/plantes` | Vertes, fleuries, d'intérieur et d'extérieur |
| **Décoration & accessoires** | `/nos-creations/decoration` | Vases, poteries, objets choisis |

**Disposition** : 3 grandes arches en ligne (Bouquets · Fleurs séchées · Plantes), puis
2 cartes larges en dessous (Compositions · Décoration & accessoires). Les fleurs séchées
sont mises en avant volontairement : c'est la niche que personne ne travaille à Challans,
et elle colle à l'univers vintage.

**Notes Figma** : arche identique au hero mais réduite (~280 px de large), photo à
l'intérieur, nom en Cinzel 24 px sous l'arche, description en Cormorant 18 px. La carte
entière est cliquable. Prévoir dès maintenant l'emplacement d'un prix (`à partir de X €`)
sous la description — il apparaîtra en phase 2 sans redessiner la carte.

---

## 5 — Pour toutes les occasions

**Objectif** : router les 4 intentions à forte valeur. C'est la section la plus rentable
de la page.

**H2** : `Pour toutes les occasions de la vie`

**4 cartes en ligne**, dans cet ordre :

### Carte 1 — Mariage → `/mariage`
> **Bouquets de mariée**
> Le bouquet, les boutonnières et les fleurs des mariés, composés avec vous, pour le
> jour J.
> `Demander un devis`

Dire *bouquets*, jamais *décoration* : elle ne fait pas la décoration de lieu, et promettre
ce qu'on ne fait pas coûte plus cher que de ne pas être trouvé.

### Carte 2 — Deuil → `/deuil`
> **Fleurs de deuil**
> Gerbes, coussins, raquettes et couronnes, livrés au funérarium, à l'église ou au
> cimetière.
> **02 XX XX XX XX**

**La carte deuil porte le numéro de téléphone directement**, pas un lien. Quelqu'un qui
vient de perdre un proche ne doit pas avoir à cliquer pour trouver comment joindre
quelqu'un. C'est le détail qui fait la différence sur ce parcours.

**Traitement visuel** : fond nuit `#1D1E33`, texte crème, pas de photo ou une photo très
sobre — la carte se détache des trois autres sans introduire de couleur supplémentaire.
Garder l'ardoise `#243A47` pour la page `/deuil` elle-même, où elle sera le fond général.

### Carte 3 — Événements → `/evenements`
> **Baptêmes, anniversaires, réceptions**
> Des compositions pour vos tables et vos lieux, à votre image.
> `Nous en parler`

### Carte 4 — Abonnements → `/entreprises`
> **Abonnement floral**
> Des fleurs fraîches renouvelées chaque semaine, chez vous ou dans votre établissement.
> `Voir les formules`

Formuler « chez vous **ou** dans votre établissement » : l'abonnement particulier existe
aussi, et personne ne le propose localement.

**Notes Figma** : 4 cartes égales, format portrait, pas d'arche ici — la carte est
rectangulaire à angles quasi droits, pour trancher avec la section précédente et éviter
que la page devienne un catalogue d'arches. Titre en Cinzel 20 px, corps en Cormorant
17 px, CTA en IM Fell capitales.

---

## 6 — L'atelier & la reprise

**Objectif** : incarner, et raconter le rachat. C'est le bloc qui installe la confiance
auprès des clients de l'ancienne boutique.

**H2** : `La boutique du 30 rue de Saint-Jean-de-Monts continue`
*(à remplacer par `Derrière Matlo'Fleurs` au bout de 3-4 mois)*

**Disposition** : portrait en arche à gauche, texte à droite.

**Texte** :

> Vous connaissiez peut-être déjà cette boutique. Elle change de mains, pas d'esprit.
>
> Je m'appelle {Prénom}, et j'y compose désormais chaque jour des fleurs choisies pour
> leur saison, dans un métier que j'exerce comme un artisanat : à la main, une création
> à la fois, jamais deux fois la même.
>
> `Découvrir l'atelier →`

**Notes Figma** : un **vrai portrait photo**, pas une illustration, pas une banque
d'images. C'est le seul élément que ni La Halle aux Fleurs ni Le Vent des Fleurs ne
montrent — c'est l'avantage entier, il ne coûte qu'une séance photo. Le prénom en
signature Updock sous le texte est possible, mais **une seule Updock supplémentaire sur
la page maximum** (voir partie D).

---

## 7 — Notre boutique à Challans

**Objectif** : convertir en visite. **La section la plus importante de la page en phase 1.**

**H2** : `Notre boutique à Challans`

**Disposition** : carte à gauche (50 %), informations à droite (50 %).

**Contenu de la colonne droite** :

```
30 rue de Saint-Jean-de-Monts
85300 Challans

Lundi        fermé
Mardi        9h-12h30 · 14h30-19h
Mercredi     9h-12h30 · 14h30-19h
Jeudi        9h-12h30 · 14h30-19h
Vendredi     9h-12h30 · 14h30-19h30
Samedi       9h-12h30 · 15h-19h30
Dimanche     9h-12h30

02 XX XX XX XX

[ Itinéraire ]   [ Nous appeler ]

Nous livrons à Challans et dans un rayon de 20 km — Sallertaine, Soullans,
Le Perrier, Bois-de-Céné, Saint-Christophe-du-Ligneron, Saint-Gervais,
Beauvoir-sur-Mer, Commequiers, La Garnache, Froidfond.
Et partout en France par notre réseau Florajet.
```

**Notes techniques** :
- Les horaires doivent être du **texte HTML**, jamais une image. C'est ce que Google lit
  et recoupe avec la fiche Google Business Profile.
- Le jour en cours est mis en évidence (sauge).
- L'adresse ici, celle du pied de page, celle de la barre d'info et celle de la fiche
  Google doivent être **identiques caractère pour caractère**.
- Charger la carte **au clic** (image statique + bouton). Une carte Google embarquée en
  chargement direct détruit le LCP.
- Les communes sont en texte : elles deviendront les liens `/livraison/{commune}` en
  phase 3.

---

## 8 — CTA final

**H2** : `Une envie, une date, une question ?`
**Sous-titre** : `Passez à la boutique, ou appelez-nous — on compose avec vous.`

Deux boutons, toujours deux : `✦ NOUS APPELER ✦` (primaire nuit) et `NOUS ÉCRIRE`
(secondaire contour sauge). Sur mobile, l'appel passe en premier.

Fond nuit pleine largeur, ou photo assombrie de la boutique.

---

## 9 — Pied de page

4 colonnes, fond nuit, texte crème.

| Nos créations | Occasions | La maison | Infos pratiques |
|---|---|---|---|
| Bouquets | Mariage | L'atelier | 30 rue de Saint-Jean-de-Monts, 85300 Challans |
| Compositions | Deuil | Journal | Horaires |
| Fleurs séchées | Événements | Contact | 02 XX XX XX XX |
| Plantes | Abonnement floral | | Livraison & zone desservie |
| Décoration & accessoires | | | |

Sous les colonnes : **logo vertical complet** (seul endroit du site où il a la place de
respirer), baseline `ARTISAN FLEURISTE`, Instagram et Facebook, puis
`© 2026 Matlo'Fleurs · Mentions légales · Politique de confidentialité`.

---

## Sections 10 à 13 — après l'ouverture

**10. Ce qui est beau en ce moment** — le mois en cours, 3-5 fleurs de saison, lien vers
les créations. À placer entre les sections 4 et 5. C'est le contenu frais le moins cher à
produire et la meilleure preuve d'artisanat ; à activer dès qu'il y a des photos.

**11. Livraison & envoi partout en France** — développe la double offre (locale en propre,
nationale via Florajet). À placer après la section 7 quand elle deviendra trop chargée.

**12. Avis Google** — **à vérifier en priorité** : si la fiche Google est transférée plutôt
que recréée, il y a peut-être déjà des avis à afficher dès l'ouverture. Sinon, laisser
masqué. Ne jamais afficher « 0 avis ».

**13. Instagram** — 6 dernières publications, chargement différé.

---

# Partie D — Corrections du système de design

## Palette réelle

| Rôle | Valeur | Usage |
|---|---|---|
| Fond dominant | Crème | Fond général de la page. **C'est la dominante, pas le nuit.** |
| Encre & aplats | `#1D1E33` | Titres, texte, boutons primaires, header, footer, carte deuil |
| Accent unique | `#5C6B4F` | Script Updock, bordures, filets, micro-labels, liens, boutons secondaires |
| Réserve deuil | `#243A47` | Page `/deuil` uniquement |
| ~~Bronze~~ | ~~`#B8965A`~~ | **Abandonné.** Ne pas le réintroduire : la sauge fait le travail, et deux accents chauds/froids en concurrence brouilleraient la palette. |

Le ratio réel est plutôt **crème 70 · nuit 25 · sauge 5**. À corriger dans le document 02.

**Bonne nouvelle sur l'accessibilité** : la sauge `#5C6B4F` sur crème atteint environ
**5,9:1** — elle passe le niveau AA pour du texte normal. C'était le problème du bronze
`#B8965A` (~2,3:1, inutilisable en texte). Le changement de teinte a réglé un vrai défaut
sans le chercher.

## Règles typographiques

| Police | Rôle | Garde-fou |
|---|---|---|
| **Cinzel** | H1-H3, boutons, noms de catégories | Capitales uniquement. En dessous de 16 px, illisible : ne jamais l'utiliser en corps ni en mention légale. |
| **Updock** | Ligne d'accent du hero, signature | **Deux occurrences maximum sur toute la page**, à 48 px minimum. Le hero en consomme déjà une. |
| **Cormorant Garamond** | Corps de texte | 20 px minimum sur le web, jamais 16. Voir l'alerte ci-dessous. |
| **IM Fell DW Pica** | Sur-titres, micro-labels, libellés de CTA | 16 px minimum, interlettrage positif, en capitales de préférence. |

### Alerte sur Cormorant Garamond

Cormorant est une Garamond de titrage : ses pleins sont très fins, son axe très contrasté.
À 24 px dans le hero, sur trois lignes, c'est superbe. Sur un paragraphe de vingt lignes,
sur un écran moyen, pour quelqu'un de 70 ans, ça devient pénible — et la cible monte
jusqu'aux seniors.

Trois options, par ordre de préférence :

1. **Cormorant Garamond en `Medium` (500)** plutôt que `Regular` pour tout le texte
   courant, à 20 px minimum. Corrige l'essentiel du problème en gardant l'unité du système.
2. **Cormorant Infant** ou **EB Garamond**, plus robustes en petit corps, pour les pages
   longues uniquement (`/l-atelier`, journal, `/deuil`).
3. Réintroduire une sans-serif discrète (Inter) **uniquement** pour les formulaires, les
   tableaux d'horaires et les mentions légales — là où la lisibilité prime sur le style.

À trancher en testant un vrai paragraphe de 300 mots, pas une ligne de maquette.
Recommandation : commencer par l'option 1, elle ne coûte rien.

### Charge des polices

4 familles, c'est le maximum tenable. Cinzel, Cormorant Garamond et IM Fell DW Pica sont
sur Google Fonts ; Updock aussi. À l'intégration : ne charger que les graisses réellement
utilisées, en `woff2`, avec `font-display: swap`, et **précharger uniquement les deux
polices du hero** (Cinzel et Updock) — les autres en chargement différé.

## Le motif d'arche

À formaliser comme composant Figma avec variantes : `hero` (380 px), `carte` (280 px),
`vignette` (160 px), `portrait` (320 px). Double filet nuit + sauge, rayon du sommet égal
à la moitié de la largeur. C'est la signature du site — l'utiliser partout où il y a une
image de création ou de personne, et nulle part ailleurs.

## Ordre de production Figma

1. **Rebrancher les variables** sur le hero existant (couleurs et typo). Rien d'autre
   avant ça — sinon chaque nouveau bloc reproduit des valeurs en dur.
2. Composant **Arche**, avec ses 4 variantes.
3. Composants **Bouton** (primaire / secondaire / téléphone), **Carte création**,
   **Carte occasion**.
4. Barre d'info + Header corrigé + Hero corrigé.
5. Sections 4 à 9, dans l'ordre.
6. Reprise de la page complète en **mobile** (375 px) — à ne pas repousser : plus de la
   moitié du trafic d'un commerce local vient du téléphone, souvent depuis Google Maps.

---

# Partie E — Ouvrir avec une seule page

> Décision du 2026-08-23 : **la page d'accueil est livrée seule pour l'ouverture**, les
> autres pages arrivent ensuite. Cette contrainte change la conception, elle ne s'ajoute
> pas après coup.

## Le piège à éviter

Une page d'accueil conçue comme une page d'accueil suppose qu'il y a des pages derrière.
Or au lancement il n'y en a aucune. Si la navigation, les cartes et les CTA pointent vers
`/mariage`, `/deuil` ou `/nos-creations`, **le site est un champ de liens morts le jour de
l'ouverture** — et Google indexe des 404 avant d'indexer quoi que ce soit d'utile.

La règle : **aucun lien ne sort de la page tant que sa destination n'existe pas.**

## Ce qui est réellement en ligne le jour J

| Page | Statut | Pourquoi |
|---|---|---|
| `/` | **Obligatoire** | La totalité du site |
| `/mentions-legales` | **Obligatoire** | Obligation légale pour tout site commercial français |
| `/politique-de-confidentialite` | **Obligatoire** | RGPD, dès qu'il y a un formulaire ou une mesure d'audience |
| `/deuil` | **Fortement recommandé** | Voir ci-dessous |

### Pourquoi `/deuil` devrait partir avec l'accueil

C'est la seule intention où l'absence de page coûte immédiatement. Quelqu'un qui cherche
`fleurs deuil Challans` à 22 h la veille d'obsèques a besoin de savoir quoi commander, où
c'est livré et sous quel délai — une carte de 3 lignes sur une page d'accueil ne le fait
pas. C'est aussi **la page la moins chère à produire** : peu de photos, essentiellement du
texte, aucune galerie, aucun formulaire complexe.

Ordre de grandeur : une demi-journée de maquette contre une intention à forte marge
qu'aucun concurrent local ne traite correctement.

**Si elle ne part pas au lancement**, la carte deuil de la section 5 doit être élargie
(2 colonnes au lieu d'1) et contenir : le téléphone, les 5 types de compositions nommés
(gerbe, coussin, raquette, couronne, dessus de cercueil) et la mention
« livré au funérarium, à l'église ou au cimetière ». Le minimum vital.

## Navigation par ancres

La navigation garde **exactement les mêmes libellés** qu'en cible — seules les
destinations changent. Le jour où une page existe, on remplace l'ancre par l'URL : rien
ne bouge visuellement, aucune redirection, aucun travail de maquette.

| Libellé nav | Au lancement | Ensuite |
|---|---|---|
| Nos créations | `#creations` | `/nos-creations` |
| Mariage | `#occasions` | `/mariage` |
| Deuil | `/deuil` *(ou `#occasions`)* | `/deuil` |
| L'atelier | `#atelier` | `/l-atelier` |
| Contact | `#boutique` | `/contact` |

**Identifiants d'ancre à figer maintenant** — ils ne changeront plus :
`#creations` · `#occasions` · `#atelier` · `#boutique` · `#contact`

Le menu déroulant « Nos créations » est **désactivé au lancement** (les 5 catégories
n'existent pas) : l'entrée devient un simple lien vers `#creations`. Le composant garde
sa variante `avec-déroulant`, simplement non utilisée.

## Concevoir chaque section en deux états

C'est le point qui évite de tout redessiner dans trois mois. Chaque section de contenu
existe en **deux variantes Figma** :

- **`autonome`** — la section fait le travail de la page absente : plus de texte, plus de
  détail, le CTA est un téléphone ou une ancre.
- **`teaser`** — la page existe : la section est raccourcie et se termine par un lien
  vers elle.

| Section | État `autonome` (lancement) | État `teaser` (ensuite) |
|---|---|---|
| 4 · Nos créations | 5 cartes, **sans lien**, avec 2-3 lignes de description chacune | 5 cartes cliquables, description sur une ligne |
| 5 · Occasions | 4 cartes détaillées, CTA = téléphone | 4 cartes courtes, CTA = lien vers la page |
| 6 · L'atelier | Texte complet (4-5 paragraphes), l'histoire et la reprise | 2 paragraphes + `Découvrir l'atelier →` |
| 7 · Notre boutique | Adresse, horaires, carte, zone de livraison, conditions | Idem, allégé de la zone de livraison |
| 8 · CTA final | **Formulaire de contact intégré** | Deux boutons vers `/contact` |

Le formulaire dans la section 8 au lancement est important : sans page contact, c'est le
seul endroit où une demande de devis mariage peut être déposée. Un service tiers suffit
(Tally, Formspree) tant que la stack n'est pas choisie — pas besoin d'attendre.

## SEO : une seule page porte tout

- Le balisage `Florist` complet vit sur `/` (cf. `03-seo-local.md`).
- Les **H2 des sections portent les intentions secondaires** — c'est ce qui permet à une
  page unique de se positionner sur plusieurs requêtes. Les formulations de la partie C
  sont écrites pour ça (`Notre boutique à Challans`, `Pour toutes les occasions de la vie`).
- **Le `sitemap.xml` ne liste que les URLs qui existent.** Le mettre à jour à chaque page
  ajoutée. Ne jamais y déclarer une page à venir.
- Pas de `BreadcrumbList` tant qu'il n'y a qu'un niveau.
- Google Search Console configurée **avant** l'ouverture, pour mesurer depuis le jour 1.

## Ordre d'ajout des pages

Par valeur décroissante, une page à la fois, chacune retirant sa section de l'état
`autonome` pour la passer en `teaser` :

| # | Page | Déclencheur | Gain |
|---|---|---|---|
| 1 | `/deuil` | Immédiat | Intention urgente, forte marge, concurrence nulle |
| 2 | `/mariage` | Dès les premières photos de bouquets de mariée | Panier le plus élevé, formulaire de devis |
| 3 | `/nos-creations` + les 5 catégories | Quand il y a 6-10 vraies photos par univers | Socle de la future boutique |
| 4 | `/l-atelier` | Après la séance photo portrait | Différenciation, page la plus maillée |
| 5 | `/contact` | Quand le formulaire de l'accueil sature | Peut rester une ancre longtemps |
| 6 | `/entreprises` · `/evenements` | Quand la demande B2B se manifeste | Revenu récurrent |
| 7 | `/livraison` | Avec la phase 2 | Requêtes « livraison + commune » |
| 8 | `/journal` | Quand 3 articles sont écrits | Longue traîne, autorité |

**Ne jamais publier une page vide pour « avoir la page ».** Une page mince est un signal
négatif ; une ancre qui fonctionne n'en est pas un.

## Conséquence de la fiche Google recréée

L'ancienne fiche étant supprimée plutôt que renommée, **il n'y a aucun avis au lancement**.
Deux effets :

- Le bloc « Avis Google » (section 12) reste **masqué** jusqu'à 5 avis minimum. Ne jamais
  afficher un état vide ni une note sur 1 avis.
- La collecte d'avis devient prioritaire dès le premier jour : QR code sur le comptoir et
  sur le ticket, demande orale à chaque client satisfait. Objectif 15 avis à 3 mois.
