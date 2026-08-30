---
type: project-doc
date: 2026-08-23
project: matlo_fleurs
tags: [index]
---

# Documentation — Matlo'Fleurs

Cadrage du site web. À lire dans l'ordre : chaque document découle du précédent.

| # | Document | Contenu | Sert à |
|---|---|---|---|
| 00 | [Cibles & parcours](00-cibles-et-parcours.md) | Paysage concurrentiel local, 4 cibles, ce que le site doit accomplir, infos manquantes | Justifier toutes les décisions qui suivent |
| 01 | [Architecture du site](01-architecture-site.md) | Arborescence, sitemap, table des URLs, navigation, maillage interne, évolutivité T2/T3 | Figer la structure avant de dessiner |
| 02 | [Blocks & maquette](02-blocks-et-maquette.md) | 28 blocks réutilisables, composition page par page, règles de design système | **Travail Figma** |
| 03 | [SEO local & contenu](03-seo-local.md) | Reprise de fonds de commerce, Google Business Profile, mots-clés par page, balises, schema.org, plan éditorial, netlinking | Rédaction et intégration |
| 04 | [Page d'accueil](04-page-accueil.md) | Relevé de la maquette Figma, reprise, structure en 9 sections avec textes rédigés, correction du système de design, **et partie E : ouvrir avec une seule page** | **Travail Figma en cours** |

> **Priorité de lecture** : `04-page-accueil.md` fait foi sur la page d'accueil, la
> navigation, la palette et la typographie. Les documents 01 et 02 ont été corrigés en
> conséquence le 2026-08-23 (le cadrage initial annonçait une dominante bleu nuit, un
> accent bronze et Inter en texte courant — aucun des trois n'est exact).

## Décisions structurantes déjà prises

- **Phase 1 = vitrine + contact.** Pas de paiement en ligne. Phase 2 = click & collect,
  phase 3 = e-commerce complet.
- **Les URLs de la phase 1 ne bougeront pas.** Les fiches création sont conçues dès
  maintenant comme de futures fiches produit, à la même adresse.
- **Le deuil ne passera jamais en e-commerce**, même en phase 3. Téléphone et
  rendez-vous uniquement.
- **La stack technique n'est pas tranchée** — volontairement. Tout ce qui est ici en
  est indépendant.
- **On ne vise pas `fleuriste Challans` de face au lancement** : deux concurrents ont un
  domaine exact-match. On gagne par la fiche Google, le deuil, le mariage et les fleurs
  séchées.
- **Reprise de fonds de commerce** : Matlo'Fleurs rachète la boutique secondaire de
  La Halle aux Fleurs, **30 rue de Saint-Jean-de-Monts, 85300 Challans**. Passation réglée :
  téléphone fixe conservé, fiche Google recréée, NAP du cédant supprimé. Conséquence :
  **0 avis au lancement**, collecte prioritaire dès le jour 1.
- **Ouverture avec la page d'accueil seule** (+ 2 pages légales, et `/deuil` recommandé).
  Navigation par ancres, chaque section conçue en deux états. Voir `04`, partie E.
- **Mariage : bouquets uniquement**, pas de décoration de lieu. Cible SEO
  `bouquet de mariée`, jamais `décoration florale mariage`.
- **Livraison** : en propre (Challans + 20 km) **et** envoi partout en France via Florajet.
- **Ateliers floraux** : reportés, pas au lancement.
- **Système visuel réel** : crème dominante · nuit `#1D1E33` · sauge `#5C6B4F`
  (le bronze est abandonné) · Cinzel, Updock, Cormorant Garamond, IM Fell DW Pica
  (Inter n'est pas utilisée) · l'**arche** est le motif signature.

## Prochaines étapes

1. **Séance photo** avant l'ouverture — blocage numéro un de tout le reste.
2. Décider si `/deuil` part avec l'accueil (recommandé, voir `04` partie E).
3. **Rebrancher les variables Figma** sur le hero existant (aujourd'hui tout est en dur).
4. Composant **Arche** + boutons + cartes, puis les 9 sections de l'accueil
   (document 04, partie C), desktop puis mobile.
5. Rédaction des textes des 3 pages de conversion.
6. Choix de la stack, puis intégration.
