---
type: project-doc
date: 2026-08-23
project: matlo_fleurs
tags: [design, ui, blocks, figma, maquette, wireframe]
---

# 02 — Bibliothèque de blocks & composition des pages

> Document de travail pour la maquette Figma. Partie A : les composants à créer.
> Partie B : dans quel ordre les assembler, page par page. Partie C : les règles de
> design système qui s'appliquent à tous les blocks.

---

# Partie A — Bibliothèque de blocks

**28 composants.** Tout le site s'assemble avec ça. Créer chacun comme un composant
Figma avec ses variantes, pas comme un groupe dupliqué.

> ⚠️ **La page d'accueil est spécifiée dans `04-page-accueil.md`, qui fait foi** — sa
> composition en partie B ci-dessous est antérieure au relevé Figma. Les règles de
> couleur et de typographie de la partie C ont été corrigées le 2026-08-23.

## Blocks système

### S01 — Barre d'information
**Rôle** : donner l'info pratique la plus urgente sans faire scroller, et servir de
bandeau d'annonce ponctuel.
**Contenu** : `Ouvert aujourd'hui jusqu'à 19h · 30 rue de Saint-Jean-de-Monts, Challans · 02 XX XX XX XX`
**Variantes** : `info` (défaut) · `annonce` (fond sauge `#5C6B4F` — ouverture, reprise, Saint-Valentin,
fête des mères, fermeture exceptionnelle) · `masquée`
**Notes** : hauteur 36-40 px, IM Fell DW Pica 14 px, crème sur bleu nuit. Sur mobile, ne garder
que l'horaire du jour + le téléphone.

### S02 — En-tête
**Rôle** : navigation permanente + accès téléphone.
**Contenu** : logo (déclinaison horizontale ou submark), 5 entrées, CTA téléphone.
**Variantes** : `desktop` · `desktop-défilé` (compact, fond bleu nuit opaque) ·
`mobile` · `mobile-menu-ouvert` · `sur-hero-transparent` (accueil uniquement)
**Notes** : les libellés de navigation sont en **Cinzel capitales**, jamais en Updock. Le menu
déroulant « Nos créations » affiche une vignette par catégorie, pas une simple liste —
c'est un site visuel.

### S03 — Pied de page
**Rôle** : maillage interne, informations légales, réassurance locale.
**Contenu** : 4 colonnes de liens (cf. `01-architecture-site.md`), logo vertical complet,
baseline « Artisan Fleuriste », réseaux sociaux, ligne légale.
**Variantes** : `défaut` · `deuil` (sans réseaux sociaux, sans Instagram)
**Notes** : **seul endroit du site où le logo vertical complet est utilisé** — il a la
place de respirer. Fond bleu nuit, texte crème.

### S04 — Fil d'Ariane
**Rôle** : orientation + maillage interne gratuit + balisage SEO.
**Contenu** : `Accueil > Nos créations > Bouquets`
**Variantes** : `clair` (sur fond crème) · `sombre` (sur fond nuit)
**Notes** : IM Fell DW Pica 14 px, séparateur discret (chevron ou point médian sauge). Absent de
l'accueil.

## Blocks d'entrée de page

### H01 — Hero d'accueil
**Rôle** : poser la marque en 2 secondes et dire où on est.
**Contenu** : H1 `Artisan fleuriste à Challans`, sous-titre court (1 phrase, l'histoire
et le sur-mesure), 2 CTA (`Découvrir nos créations` plein nuit + `02 XX XX XX XX`
contour sauge), photo pleine largeur.
**Variantes** : `image-plein-écran` · `image-décalée` (image à droite, texte sur nuit à
gauche — plus lisible, plus « vintage éditorial »)
**Notes** : hauteur 75-85 vh, jamais 100 vh (il faut voir qu'il y a un dessous).
La photo doit montrer **la boutique ou les mains au travail**, pas un bouquet détouré.
Le mot « Challans » doit être dans le H1 : c'est la requête locale.

### H02 — Hero de page intérieure
**Rôle** : titrer une page, donner le ton, poser l'intro SEO.
**Contenu** : fil d'Ariane, H1, chapô 2-3 lignes, photo bandeau.
**Variantes** : `avec-image` · `sans-image` (fond nuit uni + motif étoile discret) ·
`avec-CTA`
**Notes** : hauteur 40-50 vh maximum. Le chapô est un vrai texte SEO, pas un slogan.

### H03 — Hero sobre (deuil)
**Rôle** : accueillir quelqu'un en deuil sans agression visuelle.
**Contenu** : H1 `Fleurs de deuil à Challans`, une phrase d'accompagnement, le téléphone.
**Variantes** : aucune. Un seul état.
**Notes** : fond **ardoise `#243A47`**, pas de photo spectaculaire (au mieux une texture
ou un détail floral très flou), pas d'animation, aucun bouton d'accent. Typographie
plus grande et plus aérée que partout ailleurs.

## Blocks de contenu

### B01 — Bandeau de réassurance
**Rôle** : répondre aux 4 objections silencieuses en une ligne.
**Contenu** : 4 items icône + libellé court. Ex. `Fleurs fraîches, arrivage 3× / semaine` ·
`Créations sur-mesure` · `Livraison à Challans et 20 km alentour` · `Artisan fleuriste`
**Variantes** : `3-items` · `4-items` · `compact` (une ligne texte)
**Notes** : icônes au trait, style cohérent avec la rose du logo (même épaisseur de trait).
L'étoile à 4 branches sert de puce devant chaque item (déjà en place dans le hero).
Sur l'accueil, ce bandeau est **intégré au hero** — ne pas en ajouter un second plus bas.

### B02 — Grille des catégories de créations
**Rôle** : orienter vers les 5 univers.
**Contenu** : 5 cartes image + nom + une ligne de description + lien.
**Variantes** : `3-arches + 2 cartes larges` (accueil, cf. doc 04) · `2×2` (mobile) ·
`mosaïque asymétrique`
**Notes** : la photo occupe ≥ 70 % de la carte. Le nom de catégorie peut passer en
IM Fell DW Pica capitalisé (taille moyenne, pas Updock).

### B03 — Grille de créations
**Rôle** : lister les créations d'une catégorie.
**Contenu** : grille de cartes B04, 3 colonnes desktop / 2 tablette / 1 mobile.
**Variantes** : `avec-filtres` (occasion, gamme de prix, couleur — utile en phase 2) ·
`sans-filtres` (phase 1) · `carrousel` (pour un extrait sur une autre page)
**Notes** : prévoir dès maintenant l'emplacement du filtre, même masqué en phase 1.

### B04 — Carte création
**Rôle** : brique atomique de la future boutique.
**Contenu** : photo (ratio 4:5 portrait), nom de la création, fourchette de prix
(`à partir de 35 €`), pastille saison optionnelle.
**Variantes** : `phase-1` (pas de bouton, la carte entière est cliquable) ·
`phase-2` (+ bouton `Réserver`) · `mise-en-avant` (grande, 2 colonnes)
**Notes** : **concevoir cette carte comme si le e-commerce existait déjà.** L'ajout du
prix ferme et du bouton ne doit rien casser dans la mise en page.

### B05 — Galerie de réalisations
**Rôle** : preuve visuelle, principalement mariage et événementiel.
**Contenu** : mosaïque de 6-12 photos, ouverture en lightbox.
**Variantes** : `mosaïque` · `carrousel`
**Notes** : pas de légende sur la vignette, légende dans la lightbox (lieu + saison +
type de prestation) — c'est du contenu SEO utile.

### B06 — Texte + image alterné
**Rôle** : raconter, expliquer un savoir-faire, dérouler l'histoire.
**Contenu** : image 50 %, texte 50 % (H2 + 2-3 paragraphes + lien contextuel).
**Variantes** : `image-gauche` · `image-droite` · `fond-crème` · `fond-nuit`
**Notes** : c'est le block le plus réutilisé du site. Alterner systématiquement le sens
pour créer un rythme. Le lien contextuel en fin de paragraphe fait le maillage interne.

### B07 — Bandeau signature
**Rôle** : respiration de marque, ancrer l'univers.
**Contenu** : une phrase courte en **Updock grande taille** (c'est ici que la typo
display gagne sa place), encadrée des deux étoiles à 4 branches.
⚠️ Sur la page d'accueil, le hero consomme déjà l'une des deux Updock autorisées.
**Variantes** : `nuit` · `crème` · `avec-photo-en-fond` (assombrie)
**Notes** : **le seul block où Updock apparaît en dehors du logo.** Minimum 48 px, idéalement
64-96 px. Jamais plus d'un par page. Ne jamais y écrire plus de 8 mots.

### B08 — Avis Google
**Rôle** : preuve sociale, et signal de cohérence avec la fiche Google Business Profile.
**Contenu** : note globale, nombre d'avis, 3 avis en carrousel, lien vers la fiche Google.
**Variantes** : `carrousel` · `3-colonnes` · `compact` (note + nombre seulement)
**Notes** : à l'ouverture il n'y aura pas d'avis. Prévoir un **état vide élégant** :
remplacer par une phrase de la fleuriste ou par le block B26. Ne jamais afficher
« 0 avis ».

### B09 — Témoignage
**Rôle** : rassurer sur une prestation à engagement (mariage, entreprise).
**Contenu** : citation, prénom, contexte (`Camille & Julien, mariage à Sallertaine, juin 2026`),
photo optionnelle.
**Variantes** : `avec-photo` · `sans-photo` · `groupé-3`
**Notes** : la citation en IM Fell DW Pica italique fonctionne bien ici.

### B10 — Process en étapes
**Rôle** : dédramatiser un parcours long ou inconnu.
**Contenu** : 3 à 5 étapes numérotées, chacune avec un titre et 1-2 lignes.
**Variantes** : `horizontal` (desktop) · `vertical-timeline` (mobile) · `4-étapes` · `3-étapes`
**Notes** : le numéro d'étape peut être remplacé par l'étoile à 4 branches. Utilisé sur
`/mariage` (Rendez-vous → Proposition → Validation → Jour J) et `/entreprises`.

### B11 — Tarifs indicatifs
**Rôle** : filtrer les demandes non qualifiées et lever le tabou du prix.
**Contenu** : 3 gammes avec fourchette et ce que ça comprend.
**Variantes** : `3-cartes` · `tableau` · `ligne-simple` (une phrase `à partir de X €`)
**Notes** : afficher des **fourchettes**, jamais des prix fermes en phase 1. Ajouter
systématiquement la mention « à titre indicatif, chaque création est un devis ».
C'est le block que les concurrents locaux n'ont pas — il crée la confiance.

### B12 — Lexique visuel des compositions (deuil)
**Rôle** : donner le vocabulaire à quelqu'un qui ne le connaît pas et n'osera pas demander.
**Contenu** : 6 vignettes — gerbe, coussin, raquette, couronne, dessus de cercueil,
composition pour urne. Photo + nom + une phrase (usage, taille, fourchette de prix).
**Variantes** : `grille-3` · `grille-2` (mobile)
**Notes** : ton neutre et factuel. Palette ardoise. Aucun bouton d'achat, un seul
CTA global sous le block : appeler.

### B13 — FAQ accordéon
**Rôle** : traiter les objections + capter les requêtes en question (position 0 Google).
**Contenu** : 5 à 8 questions/réponses repliées.
**Variantes** : `1-colonne` · `2-colonnes` · `groupée-par-thème`
**Notes** : rédiger les questions **exactement comme les gens les tapent**
(« Combien coûte un bouquet de mariée ? »). Balisage `FAQPage` obligatoire.

### B14 — Ce qui est beau en ce moment
**Rôle** : incarner la saisonnalité — c'est LA preuve qu'on a affaire à un artisan.
**Contenu** : mois en cours, 3-5 fleurs de saison avec photo et une ligne, lien vers
les créations correspondantes.
**Variantes** : `bandeau-horizontal` · `bloc-éditorial` (avec un paragraphe)
**Notes** : contenu à mettre à jour chaque mois — c'est le contenu frais le moins
coûteux à produire et le plus rentable en SEO. Prévoir que ce soit éditable facilement.

### B15 — Instagram
**Rôle** : montrer que la boutique est vivante, transférer l'audience.
**Contenu** : 6 dernières publications, pseudo, bouton `Nous suivre`.
**Variantes** : `6-vignettes` · `carrousel` · `état-vide`
**Notes** : **absent des pages deuil.** Charger en différé (ne doit pas peser sur le LCP).

### B16 — Derniers articles
**Rôle** : maillage interne + preuve d'activité.
**Contenu** : 3 cartes article (image, date, titre, extrait).
**Variantes** : `3-cartes` · `liste-compacte`
**Notes** : masquer tant qu'il y a moins de 3 articles publiés.

### B17 — Teaser entreprises
**Rôle** : rattraper le B2B qui ne va pas chercher dans le pied de page.
**Contenu** : visuel (composition dans un restaurant ou un hall), H2, 2 lignes,
lien vers `/entreprises`.
**Variantes** : `bandeau-pleine-largeur` · `demi-bloc`
**Notes** : ton différent du reste — plus factuel, orienté service et régularité.

### B18 — Infos pratiques
**Rôle** : convertir en visite physique. **Le block le plus important du site en phase 1.**
**Contenu** : carte interactive, adresse complète, horaires en tableau (7 jours,
jour en cours mis en évidence), téléphone en click-to-call, bouton `Itinéraire`,
mention parking/accès.
**Variantes** : `carte-gauche` · `carte-droite` · `pleine-largeur` · `compact` (sans carte)
**Notes** : les horaires doivent être **du texte HTML**, pas une image — c'est ce que
Google lit et recoupe avec la fiche Google Business Profile. Cohérence NAP absolue
(cf. `03-seo-local.md`). Charger la carte au clic (perte de performance sinon).

### B19 — Zone de livraison
**Rôle** : capter les requêtes « livraison fleurs + commune » et rassurer sur la portée.
**Contenu** : carte de la zone, liste des communes desservies en texte, délais,
conditions (montant minimum, horaires de livraison).
**Variantes** : `carte-et-liste` · `liste-seule` · `compact`
**Notes** : **les communes doivent être en texte cliquable**, pas seulement sur la carte.
Ces liens deviendront les pages `/livraison/{commune}` en phase 3.

### B20 — CTA de fin de page
**Rôle** : dernière chance de conversion.
**Contenu** : H2 court, une ligne, 2 boutons (`Nous appeler` / `Nous écrire`).
**Variantes** : `nuit` · `sauge` · `ardoise` (deuil) · `avec-photo-en-fond`
**Notes** : toujours **deux** actions, jamais une seule — certains appellent, d'autres
n'osent pas. Sur mobile, le bouton d'appel passe en premier.

### B21 — Formulaire
**Rôle** : capturer une demande qualifiée.
**Variantes** :
- `contact-général` : nom, e-mail, téléphone, message, consentement RGPD.
- `devis-mariage` : prénoms, date du mariage, lieu/commune, nombre d'invités,
  budget floral estimé (fourchettes à cocher), style souhaité (cases : champêtre,
  romantique, sauvage, coloré, blanc), pièces souhaitées (cases : bouquet de mariée,
  boutonnière, cérémonie, tables, arche, voiture), message libre, upload d'inspirations.
- `professionnel` : société, fonction, type de lieu, fréquence souhaitée, budget mensuel.
- `deuil` : **volontairement minimal** — nom, téléphone, « rappelez-moi » ; le formulaire
  n'est jamais l'action principale sur cette page.
**Notes** : mention RGPD obligatoire sous le bouton d'envoi. Page ou état de confirmation
qui redonne le téléphone et les horaires.

### B22 — Bandeau d'urgence deuil
**Rôle** : afficher le téléphone en très grand, immédiatement.
**Contenu** : `Nous sommes là. Appelez-nous : 02 XX XX XX XX` + horaires + délai de réponse.
**Variantes** : aucune.
**Notes** : placé **au-dessus de la ligne de flottaison** sur `/deuil`. Numéro en 32-40 px
minimum, cliquable. Fond ardoise. Aucun autre élément dans le block.

### B23 — Créations similaires
**Rôle** : éviter les culs-de-sac, maillage interne.
**Contenu** : 3 cartes B04 de la même catégorie ou de la même saison.
**Variantes** : `3-cartes` · `carrousel`
**Notes** : en bas de chaque fiche création. Titre `Dans le même esprit`.

### B24 — Liste d'articles
**Rôle** : index du journal.
**Contenu** : cartes article, éventuellement filtrées par catégorie
(Saison · Conseils · Coulisses · Mariage).
**Variantes** : `grille` · `liste` · `avec-article-à-la-une`

### B25 — Corps d'article
**Rôle** : contenu long lisible.
**Contenu** : H1, date, temps de lecture, image d'en-tête, corps riche (H2/H3, images,
citations, listes), signature de l'autrice, partage, CTA contextuel, articles liés.
**Notes** : largeur de lecture 65-75 caractères. Cormorant Garamond Medium 20 px, interligne 1,6.

### B26 — Encart L'atelier
**Rôle** : incarner. Le différenciateur numéro un face à la concurrence locale.
**Contenu** : portrait de la fleuriste, 2-3 phrases à la première personne, signature
manuscrite ou Updock, lien vers `/l-atelier`.
**Variantes** : `portrait-gauche` · `portrait-droite` · `format-carte`
**Notes** : un **vrai portrait photo**, pas une illustration, pas une banque d'images.
C'est ce que ni La Halle aux Fleurs ni Le Vent des Fleurs ne montrent.

---

# Partie B — Composition des pages

Ordre de haut en bas. Les blocks entre parenthèses sont optionnels au lancement.

## Accueil `/`

```
S01  Barre d'information
S02  En-tête (transparent sur le hero)
H01  Hero — H1 « Artisan fleuriste à Challans »
B01  Réassurance — 4 items
B02  Grille des 5 univers de créations
B14  Ce qui est beau en ce moment            ← différenciation immédiate
B06  Texte + image : les occasions (Mariage / Deuil, 2 cartes ou 2 blocs alternés)
B26  Encart L'atelier — portrait + histoire
B07  Bandeau signature (Updock)
B08  Avis Google (état vide au lancement → remplacé par B09 ou masqué)
B18  Infos pratiques — carte, horaires, adresse, téléphone
B17  Teaser entreprises
(B15) Instagram
(B16) Derniers articles
B20  CTA final
S03  Pied de page
```

**Intention** : un visiteur doit pouvoir décider de venir en boutique sans jamais
quitter cette page. Elle contient donc l'adresse, les horaires et le téléphone deux fois
(barre d'info + B18).

## Nos créations `/nos-creations`

```
S02 · S04 · H02 (avec image)
B02  Les 5 univers, en mosaïque asymétrique
B03  Extrait : 6 créations mises en avant, toutes catégories
B14  Ce qui est beau en ce moment
B06  Le sur-mesure : « vous ne trouvez pas ? on compose avec vous »
B20  CTA final
S03
```

## Catégorie `/nos-creations/{categorie}`

```
S02 · S04 · H02 (sans image, chapô SEO 2-3 phrases)
B03  Grille de créations (emplacement filtre prévu, masqué en phase 1)
B06  Texte éditorial : quand offrir, comment entretenir, saisonnalité
B23  Créations d'autres catégories
B20  CTA final
S03
```

## Fiche création `/nos-creations/{categorie}/{slug}`

```
S02 · S04
[Bloc fiche]  Galerie (1 photo principale + 2-3 secondaires) · nom (H1) ·
              fourchette de prix · description · tailles disponibles ·
              saisonnalité · composition florale indicative ·
              CTA « Réserver par téléphone » → phase 2 : « Ajouter au panier »
B01  Réassurance compacte
B23  Dans le même esprit
B18  Infos pratiques (compact)
S03
```

**Point de vigilance** : c'est la page qui devient une fiche produit. Sa mise en page
doit accepter l'ajout d'un prix ferme, d'un sélecteur de taille et d'un bouton panier
sans être redessinée.

## Mariage `/mariage`

```
S02 · S04 · H02 (avec image — une vraie réalisation)
[Intro]  H1 « Fleuriste mariage à Challans et en Vendée » + chapô empathique
B05  Galerie de réalisations (8-12 photos, lightbox légendée)
B06  Ce que nous réalisons — bouquet de mariée, boutonnière, cérémonie, tables,
     arche, voiture, fleurs de cheveux (en liste illustrée)
B10  Le déroulé en 4 étapes : Rendez-vous → Proposition → Validation → Jour J
B11  Tarifs indicatifs — 3 fourchettes (essentiel / complet / décoration du lieu)
B09  Témoignages (2-3)
B13  FAQ — 6 questions
B21  Formulaire de devis mariage          ← conversion principale
B20  CTA final (téléphone en secours)
S03
```

**FAQ à couvrir** : combien de temps à l'avance réserver · quel budget prévoir ·
vous déplacez-vous jusqu'à la salle · peut-on choisir hors saison ·
que devient la décoration après · fournissez-vous les vases et supports.

## Deuil `/deuil`

```
S02 (sans barre d'annonce)
S04
H03  Hero sobre, fond ardoise
B22  Bandeau d'urgence — téléphone en très grand      ← au-dessus de la flottaison
[Texte]  Une phrase d'accompagnement, 3-4 lignes maximum, ton juste
B12  Lexique visuel des compositions (6 vignettes)
B06  Livraison et délais — funérarium, église, cimetière, domicile ; délai minimum ;
     ce qu'il faut nous dire (nom du défunt, lieu, heure de la cérémonie)
B06  Le message d'accompagnement — la carte, les formules d'usage
B11  Tarifs indicatifs (ligne simple, discrète)
B13  FAQ courte — 4 questions maximum
B21  Formulaire minimal « rappelez-moi »
B20  CTA final variante ardoise
S03  Pied de page variante deuil (sans réseaux sociaux)
```

**Interdits sur cette page** : bandeau d'annonce, Instagram, avis, bouton d'accent sauge,
animation, emoji, cross-sell, « à partir de » en gros, toute mention promotionnelle.

## Entreprises & abonnements `/entreprises`

```
S02 · S04 · H02
B06  Pour qui — restaurants, hôtels, cabinets, salons, collectivités, salles de réception
B02  Nos formules (3 cartes : hebdomadaire / bimensuelle / événementiel ponctuel)
B10  Comment ça marche — 3 étapes
B11  Tarifs de départ (« à partir de X € / mois »)
B09  Témoignage professionnel (quand disponible)
B21  Formulaire professionnel
B20  CTA final
S03
```

## L'atelier `/l-atelier`

```
S02 · S04 · H02 (photo de la boutique ou des mains au travail)
B06  L'histoire — pourquoi ce métier, pourquoi Challans, à la première personne
B06  Le savoir-faire — comment se compose un bouquet, ce qui distingue l'artisanat
B06  Les fleurs — approvisionnement, saisonnalité, producteurs locaux si applicable
B05  La boutique en images
[Texte] Le nom et le logo — la rose, les deux étoiles (lecture publique uniquement :
        qualité, bonne étoile). **Ne jamais évoquer le sens intime.**
B07  Bandeau signature
B20  CTA final
S03
```

**C'est la page qui porte tout le positionnement.** Elle doit être longue, personnelle,
et abondamment maillée depuis le reste du site.

## Journal `/journal` et `/journal/{slug}`

```
Index :   S02 · S04 · H02 (sans image) · B24 Liste d'articles · B20 · S03
Article : S02 · S04 · B25 Corps d'article · B16 Articles liés · B20 CTA contextuel · S03
```

## Livraison `/livraison`

```
S02 · S04 · H02 (sans image)
B19  Zone de livraison — carte + liste des communes en texte cliquable
B06  Conditions — délais, horaires, montant minimum, livraison en main propre
B13  FAQ — 4 questions
B18  Infos pratiques
B20  CTA final
S03
```

## Contact `/contact`

```
S02 · S04 · H02 (sans image)
B18  Infos pratiques en grand — carte, adresse, horaires, téléphone, itinéraire, accès
B21  Formulaire de contact général
B19  Zone de livraison (compact)
[Liens] Vous cherchez un devis mariage ? → /mariage · Un deuil ? → /deuil
S03
```

---

# Partie C — Règles de design système

> ⚠️ **Corrigé le 2026-08-23 d'après le relevé Figma réel.** Le cadrage initial annonçait
> une dominante bleu nuit, un accent bronze et Inter en texte courant : **rien de tout
> cela n'est vrai dans la maquette**. Les valeurs ci-dessous font foi. Le détail et les
> arbitrages sont dans `04-page-accueil.md`, partie D.

## Application de la couleur (réel : crème 70 / nuit 25 / sauge 5)

| Usage | Couleur |
|---|---|
| **Fond dominant** de la page, sections claires | **Crème — 70 %** |
| Encre (titres, corps), aplats, header, footer, boutons primaires, carte deuil | Bleu nuit `#1D1E33` — **25 %** |
| **Accent unique** : script Updock, filets, bordures, micro-labels, liens, boutons secondaires | **Sauge `#5C6B4F`** — **5 %** |
| Page `/deuil` uniquement | Ardoise `#243A47` |
| ~~Bronze `#B8965A`~~ | **Abandonné.** Ne pas le réintroduire : deux accents en concurrence brouilleraient la palette, et la sauge fait le travail. |

Notes :
- La sauge web est **`#5C6B4F`**, pas `#8A9A82`. Contraste sur crème ≈ **5,9:1** → passe
  AA en texte normal. C'était le défaut du bronze (~2,3:1, inutilisable en texte) ;
  le changement de teinte l'a réglé.
- Le texte est en `#1D1E33`, **jamais en noir pur** — le noir casse la palette et fatigue
  la lecture. (La maquette actuelle utilise `#000000` : à corriger.)
- La couleur vive vient **des photos de fleurs**, jamais de l'interface. Si une section
  paraît terne, il manque une photo, pas une couleur.

## Typographie (4 familles, toutes sur Google Fonts)

| Rôle | Police | Tailles | Garde-fou |
|---|---|---|---|
| Titres H1-H3, boutons, noms de catégories | **Cinzel** Regular | H1 48 · H2 32-36 · H3 24 · boutons 16 | Capitales uniquement. Jamais sous 16 px, jamais en corps ni en mention légale. |
| Ligne d'accent, signature | **Updock** Regular | 48 px minimum, 76 px dans le hero | **2 occurrences maximum par page.** Le hero en consomme déjà une. |
| Corps de texte | **Cormorant Garamond** | 20 px minimum, 24 px dans le hero, interligne 1,4 | Voir l'alerte ci-dessous. |
| Sur-titres, micro-labels, libellés de CTA | **IM Fell DW Pica** Regular | 16-20 px, capitales, interlettrage positif | Jamais en paragraphe long. |

**Inter n'est pas utilisée** dans le système actuel — contrairement à ce que disait le
cadrage initial.

**Alerte Cormorant Garamond** : c'est une Garamond de titrage, à pleins très fins.
Superbe à 24 px sur trois lignes, pénible sur un paragraphe de vingt lignes pour
quelqu'un de 70 ans — et la cible monte jusqu'aux seniors. Par ordre de préférence :
passer en **Medium (500) à 20 px minimum** ; sinon EB Garamond / Cormorant Infant sur les
pages longues ; sinon réintroduire Inter **uniquement** pour formulaires, tableaux
d'horaires et mentions légales. À trancher sur un vrai paragraphe de 300 mots.

**Chargement** : `woff2`, `font-display: swap`, uniquement les graisses utilisées.
Précharger **Cinzel et Updock** (visibles dans le hero), différer les deux autres.

## Le motif d'arche — signature du site

Double filet nuit `#1D1E33` (extérieur) + sauge `#5C6B4F` (intérieur), sommet arrondi de
rayon égal à la moitié de la largeur. Composant Figma à 4 variantes :
`hero` 380 px · `portrait` 320 px · `carte` 280 px · `vignette` 160 px.

À utiliser **partout où il y a une image de création ou de personne, et nulle part
ailleurs**. C'est ce qui remplace toute ornementation ajoutée.

## Images

| Contexte | Ratio | Notes |
|---|---|---|
| Hero | 16:9 ou 21:9 | Point focal décentré pour laisser respirer le texte |
| Carte création | 4:5 portrait | Cadrage serré, fond neutre ou bois |
| Carte catégorie | 3:4 | |
| Galerie mariage | mixte 4:5 et 1:1 | Mosaïque |
| Portrait atelier | 4:5 | Vrai portrait, lumière naturelle |
| Article | 16:9 | |

Toutes en WebP, `loading="lazy"` sauf le hero, largeur maximale 1600 px, poids cible
< 200 Ko. Nommage et texte alternatif : cf. `03-seo-local.md`.

## Espacement et rythme

- Grille 12 colonnes, gouttière 24 px, largeur maximale de contenu 1200-1280 px.
- Espacement vertical entre sections : 96-120 px desktop, 64 px mobile.
- Alterner systématiquement fond nuit / fond crème d'une section à l'autre — c'est ce
  qui donne le rythme « éditorial vintage » sans ajouter d'ornement.
- Coins : légèrement arrondis (4-8 px) ou droits. Pas d'arrondi prononcé — ça casse
  le registre ancien.
- Ombres : quasi inexistantes. Préférer un filet sauge 1 px pour détacher une carte.

## Responsive et accessibilité

- Points de rupture : 480 / 768 / 1024 / 1440.
- Sur mobile, le téléphone est **toujours** accessible en un tap depuis l'en-tête.
- Cibles tactiles ≥ 44 px — cible senior, ne pas faire de boutons fins.
- Contraste : crème sur bleu nuit ≈ 13:1, excellent. Sauge `#5C6B4F` sur crème ≈ 5,9:1,
  conforme AA en texte normal — c'est utilisable en texte, contrairement au bronze
  abandonné (~2,3:1).
- Corps de texte à 20 px minimum en Cormorant Garamond : la cible va jusqu'aux seniors,
  et cette police est plus fine que la moyenne.
- Toute animation doit respecter `prefers-reduced-motion`.

## Ce qu'il faut produire dans Figma, dans l'ordre

1. **Fondations** : variables de couleur (avec les rôles ci-dessus, pas juste les noms
   de teintes), échelle typographique, échelle d'espacement, grille.
2. **Atomes** : bouton (primaire / secondaire / téléphone / ardoise, × états),
   champ de formulaire, carte, badge saison, filet étoile, icônes au trait.
3. **Blocks système** : S01 → S04, en desktop et mobile.
4. **Page d'accueil complète** en desktop, puis en mobile. C'est elle qui valide le
   système — les autres pages ne sont que des recombinaisons.
5. **Les trois pages de conversion** : `/mariage`, `/deuil`, `/nos-creations`.
   `/deuil` est à faire tôt, parce que sa palette ardoise teste la robustesse du système.
6. Le reste par recombinaison.
