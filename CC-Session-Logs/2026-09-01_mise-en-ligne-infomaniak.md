---
type: session-log
date: 2026-09-01
project: matlo_fleurs
tags: [session, infomaniak, deploiement, ci-cd, github-actions, rsync, php, seo, bug-fix]
---

# Session : 2026-09-01 — Mise en ligne sur Infomaniak

## Quick Reference
**Sujets :** plan de mise en ligne en 7 phases · configuration de l'hébergement Infomaniak · câblage CI/CD par rsync SSH · gardes automatisées de configuration et de publication · première mise en ligne réelle · vérification de bout en bout d'Apache et de PHP.
**Résultat :** le site est **en ligne sur `matlofleurs.fr`**, tenu hors de l'index par un `noindex` verrouillé, avec 15 contrôles au vert dont le premier test réel de `contact.php` et du `.htaccess`. La politique de confidentialité est la première page à sortir de la liste des bloquants.

## Ce qui a été fait

- **Plan de mise en ligne** rédigé en 7 phases, exécuté jusqu'à la Phase 4 incluse. Faits Infomaniak vérifiés en documentation avant d'écrire quoi que ce soit (clé `ed25519` obligatoire, répertoire `/sites/<domaine>`, version PHP au choix, pas d'agent forwarding).
- **`.htaccess`** : exception `.well-known` pour ne pas faire dépendre le renouvellement de certificat d'une redirection, 301 de `www` vers l'apex en une seule étape, `X-Robots-Tag: noindex` d'avant ouverture.
- **`deploy.yml`** : garde de configuration en tête de job, garde de publication à 4 contrôles, input `preversion`, exclusions rsync étendues à `.user.ini` et `.infomaniak-*`, contrôle final dissocié de `SITE_URL`, et bascule complète de `vars.` vers `secrets.`
- **Adresse de contact** posée dans `site.ts`, d'où dérivent les 3 occurrences des pages légales et le destinataire du formulaire. La section « Mesure d'audience » devient une affirmation.
- **`contact.php`** relié à `contact@matlofleurs.fr`.
- **`deploy/deployer.sh` plus `npm run deploy`** : la même chaîne que le workflow, exécutable en local, simulation par défaut.
- **Déploiement réel** puis **15 contrôles HTTP** sur le site servi.

## Décisions prises

- **Découpler la chaîne technique du contenu** : rendre le déploiement opérationnel et vérifié pendant que le contenu se complète, plutôt que de mener les deux chantiers ensemble sous la pression de l'ouverture.
- **Aucune mesure d'audience au lancement** : pas de bannière de consentement à construire, section de la politique remplie en deux lignes. Conséquence assumée, le clic téléphone n'est pas mesuré alors que `docs/03` en fait la conversion n°1.
- **Section « Mesure d'audience » rendue affirmative plutôt que supprimée** : retire le marqueur pareil et constitue un signal de confiance sur une cible senior.
- **Apex canonique, `www` en 301** : cohérent avec le `SITE_URL` déjà en place, le JSON-LD, le sitemap et l'og:url, donc rien à reprendre ailleurs.
- **Protection par mot de passe écartée, `noindex` inconditionnel à la place** : le client juge le risque humain faible sur une boutique sans lien entrant. Le risque d'indexation, lui, coûte zéro à supprimer.
- **La garde de publication refuse tant que le `noindex` est là** : sans ce verrou, l'oublier publierait un site que Google n'indexerait jamais, panne silencieuse et bien plus coûteuse que celle qu'on cherchait à éviter.
- **Toute la configuration en secrets**, y compris ce qui n'est pas sensible : une seule source à maintenir, contrepartie assumée du masquage dans les logs.
- **Garde de configuration en tête de job** : une variable absente arrive comme chaîne vide, et avec `CHEMIN_DISTANT` vide `rsync --delete` viserait le répertoire personnel du compte SSH.
- **`.user.ini` et `.infomaniak-*` exclus du rsync** : posés par l'hébergeur dans la racine web, ils portent la compression PHP et la page du mode maintenance.

## Problèmes résolus

- **Problème** : le build échouait en CI sur `[config] Invalid URL`, avec `SITE_URL:` vide dans l'environnement du job.
- **Cause** : `astro.config.mjs` faisait `process.env.SITE_URL ?? '...'`. `??` ne se déclenche que sur `null` ou `undefined`, et GitHub Actions injecte une **chaîne vide** pour une variable absente. `site` valait `''`.
- **Solution** : `||`. Reproduit en local par `SITE_URL= npm run build`, vérifié dans les deux sens.

- **Problème** : la garde de publication ne détectait pas l'absence de téléphone.
- **Cause** : `grep '"telephone"' dist/index.html` matchait le champ de formulaire `id="telephone"` et `name="telephone"`, présents en toute hypothèse. Le JSON-LD, lui, comptait bien 0 occurrence.
- **Solution** : motif `'"telephone":'`, le deux-points distinguant la clé JSON de l'attribut HTML.

- **Problème** : la même garde refusait « formulaire sans destinataire » alors que l'adresse réelle était en place.
- **Cause** : `grep 'A_COMPLETER' dist/api/contact.php` matchait la **garde défensive du PHP elle-même**, `str_contains(DESTINATAIRE, 'A_COMPLETER')`, désormais inerte mais légitime à conserver.
- **Solution** : cibler la constante, `grep "DESTINATAIRE = 'A_COMPLETER"`.

- **Problème** : le job démarrait avec un environnement entièrement vide.
- **Cause** : les valeurs avaient été saisies dans l'onglet **Secrets**, que `vars.` ne voit pas. Les deux onglets sont distincts et rien n'avertit.
- **Solution** : 21 références basculées en `secrets.`, dont une cachée en milieu d'expression (`secrets.URL_VERIFICATION || vars.SITE_URL`) que le premier passage avait manquée.

- **Problème** : `ssh: connect to host *** port ***: Connection timed out` à l'étape rsync, alors que la connexion passait en 2 secondes depuis le poste de travail avec les mêmes hôte, utilisateur, clé et port.
- **Cause** : **non établie avec certitude.** J'ai d'abord conclu, sur la documentation du pare-feu mutualisé, qu'un rsync depuis GitHub Actions était impossible sur cette offre. **Cette conclusion était fausse** : le client a produit le workflow du projet `adaptours`, qui déploie sur un mutualisé Infomaniak et fonctionne. La différence exploitable était l'hôte, `qw3x0h.ftp.infomaniak.com` là où nous visions l'IP du serveur web. Le DNS montrait pourtant le même serveur (`qw0z78.ftp.infomaniak.com` est un CNAME vers `h2web524.infomaniak.ch`, soit `185.176.225.30`), ce qui ne l'expliquait pas.
- **Solution** : remplacer `SSH_HOTE` par `qw0z78.ftp.infomaniak.com` **et supprimer `SSH_HOTE_CLE`**, dont l'empreinte était enregistrée pour l'IP et ne correspondait pas au nom d'hôte. Le déploiement est passé.

- **Problème** : l'envoi du formulaire renvoyait 200 au lieu du 303 attendu.
- **Cause** : `Uncaught Error: Call to undefined function mail()`. La sonde a montré `disable_functions=exec,mail,passthru,pcntl_exec,popen,proc_open,shell_exec,system` : `mail()` est **désactivée par défaut** sur le mutualisé Infomaniak. `stream_socket_client` et `openssl` étaient disponibles, la voie de repli était donc un envoi SMTP authentifié.
- **Solution** : le client a activé `mail()` dans le manager, ce qui a évité de réécrire l'envoi. Retest immédiat : 303 vers `/message-envoye`.

- **Problème** : le premier déploiement « réussi sans erreur » n'avait rien écrit.
- **Cause** : le workflow s'était exécuté avec `essai: true`, sa valeur par défaut. Le serveur contenait encore les 4 fichiers d'Infomaniak et le domaine servait « Bienvenue sur matlofleurs.fr ».
- **Solution** : diagnostiqué en comparant `last-modified`, `content-length` et le `<title>` servi au contenu réel du répertoire relevé en SSH, plutôt qu'en interprétant les 6 contrôles qui échouaient tous pour cette unique raison.

## Points d'attention

- **La réception de l'e-mail n'est pas confirmée.** Un message de test attend dans `contact@matlofleurs.fr`, sujet `[Site] Autre — Test technique 3`. `mail()` renvoyant `true` prouve seulement que le serveur a accepté le message. Si rien n'arrive, la cause la plus probable est que `site@matlofleurs.fr`, l'expéditeur déclaré dans `contact.php`, n'existe pas comme boîte réelle. Vérifier SPF, DKIM et DMARC.
- **Le site est publiquement visible**, tenu hors de l'index par **une seule ligne** de `.htaccess`. La garde de publication est le seul filet contre son oubli.
- **La cause du timeout SSH reste incomprise.** Le correctif fonctionne mais on ne sait pas pourquoi : si le déploiement se remet à expirer, le nom d'hôte et l'empreinte sont les deux premiers suspects.
- **Le débogage en CI est désormais aveugle** : tout étant en secrets, l'hôte, le chemin et l'URL sortent en `***`. `SSH_PORT` valant `22`, GitHub masque aussi toutes les occurrences de « 22 », y compris les valeurs de repli écrites en dur dans les scripts.
- **La limite par IP du formulaire est atteinte** depuis mon adresse pour une heure après les tests. Le compteur est haché par IP, donc sans effet pour les autres.
- **Le responsive n'a toujours pas été contrôlé**, la maquette n'existant qu'en desktop.

## Tâches en suspens

- [ ] **Confirmer la réception du message de test**, spams compris, et créer `site@matlofleurs.fr` si l'expéditeur n'existe pas
- [ ] **Fournir le téléphone réel** : débloque 6 boutons, le JSON-LD et la conversion principale
- [ ] **Compléter les mentions légales** : forme juridique, SIREN/SIRET, TVA, nom de famille, médiateur
- [ ] Fournir l'**URL Facebook** et les **photos réelles** (séance photo, toujours le blocage n°1)
- [ ] **Retirer le `noindex`** le jour de la bascule, la garde de publication le rappellera
- [ ] Search Console en **propriété de domaine** validée par TXT, puis soumission du sitemap
- [ ] Exécuter la checklist Google Business Profile de `docs/03-seo-local.md:62-89`
- [ ] Passe responsive, animations et signature comprises
- [ ] Enregistrer les 2 pièges du jour dans `CLAUDE.md` via `/mem`

## Fichiers impactés

- `astro.config.mjs` — repli de `SITE_URL` en `||` au lieu de `??`
- `.github/workflows/deploy.yml` — garde de configuration, garde de publication, input `preversion`, exclusions rsync en tableau, bascule vers `secrets.`
- `public/.htaccess` — exception `.well-known`, 301 `www` vers apex, `X-Robots-Tag` d'avant ouverture
- `public/api/contact.php` — `DESTINATAIRE` réel
- `src/data/site.ts` — `email: 'contact@matlofleurs.fr'`
- `src/pages/politique-de-confidentialite.astro` — plus aucun marqueur, section « Mesure d'audience » affirmative, fonction `manquant` retirée devenue morte
- `src/pages/mentions-legales.astro` — adresse de contact
- `deploy/deployer.sh` — nouveau, déploiement local complet
- `deploy/.env.example` — nouveau, modèle de configuration
- `.gitignore` — `deploy/.env`
- `package.json` — script `deploy`

Hors de cette session, committé par le client : `0b04d52 fix: hero sizing`, qui touche la signature, `scripts/signature.mjs`, un nouveau `scripts/svg-boite.mjs` et son test. Non revu ici.

---

## Log détaillé

### Cadrage

La session part de l'achat de l'hébergement. Quatre questions ont été posées avant d'écrire le plan, parce que leurs réponses changeaient tout : l'offre exacte (Hébergement Web payante, donc SSH disponible), le registrar du domaine (Infomaniak), les bloquants levables aujourd'hui (l'e-mail du formulaire seulement) et la stratégie de première mise en ligne (préversion protégée).

Les capacités d'Infomaniak ont été vérifiées en documentation avant rédaction, pas supposées : clé `ed25519` obligatoire et RSA refusée, compte SSH à créer dans le manager, `/sites/<domaine>` par défaut, version PHP au choix dans l'onglet PHP/Apache, préversion réservée aux offres payantes et temporaire.

Trois arbitrages ont ensuite été soumis, tous matériels : l'outil de mesure d'audience, apex contre www, et le mécanisme de protection. Le plan en 7 phases a été approuvé, puis exécuté.

### Phase 2, les correctifs de code

Le relevé du dépôt a servi de base, pas les souvenirs. Deux découvertes utiles : les `tel:` étaient tous correctement gardés par un ternaire, contrairement à ce qu'un premier `grep` tronqué suggérait, et la politique de confidentialité s'est révélée entièrement complétable dans la journée. Ses 4 marqueurs se réduisaient à l'adresse de contact deux fois, une durée de conservation à trancher, et la section « Mesure d'audience » que l'arbitrage venait de vider. La fonction `manquant` y est devenue morte et a été retirée, `astro check` l'aurait signalée.

Un point d'exactitude a été soulevé au passage : `contact.php` conserve une empreinte d'IP une heure pour limiter les envois, alors que la page affirme « Nous ne recueillons aucune autre donnée ». Le client a choisi de laisser en l'état.

La garde de publication a été **éprouvée contre le `dist/` réel**, ce qui a révélé deux motifs de `grep` défectueux, l'un produisant un faux positif et l'autre un faux refus. Les deux auraient survécu à une relecture.

### Phase 3, le câblage et les échecs successifs

La connexion SSH a été prouvée en local avant tout : `/home/clients/d0183e67925b0a52ecad0c74ade97419`, `sites/matlofleurs.fr` existant. Le répertoire cible a été inspecté **avant** tout `rsync --delete`, ce qui a fait apparaître 4 fichiers Infomaniak dont deux à préserver, `.user.ini` et `.infomaniak-maintenance.html`. Les exclusions ont été ajoutées et un `rsync --dry-run` lancé depuis le poste : tout en création, zéro suppression.

Trois échecs ont suivi, chacun diagnostiqué avant correction :

1. **`Invalid URL`** au build. `SITE_URL` arrivait vide. La cause n'était pas la variable manquante mais `??` qui laisse passer la chaîne vide. Reproduit en local en une commande.
2. **Environnement entièrement vide.** Les valeurs étaient dans l'onglet Secrets. Cet incident a motivé une garde de configuration en tête de job, parce que le même mécanisme appliqué à `CHEMIN_DISTANT` aurait fait viser le répertoire personnel du compte par `rsync --delete`. La garde a été éprouvée en bash sur trois cas.
3. **Timeout SSH.** J'ai conclu trop vite à une impossibilité structurelle du mutualisé, en m'appuyant sur la documentation du pare-feu. Le client a produit le workflow `adaptours`, qui fonctionne sur le même hébergeur, ce qui a invalidé la conclusion. La piste tirée de ce workflow était le nom d'hôte `<prefixe>.ftp.infomaniak.com`. Le DNS montrait le même serveur, ce qui semblait la disqualifier, mais le changement d'hôte **plus** la suppression de l'empreinte figée a débloqué la chaîne. La cause exacte reste inconnue.

Entre-temps, un script de déploiement local a été livré, `deploy/deployer.sh` et `npm run deploy`, calqué sur le `deploy-theme.sh` d'adaptours et rejouant toute la chaîne du workflow. Il reste le chemin de secours et rejoint la décision déjà inscrite au projet, déploiement manuel uniquement.

### Le faux déploiement

Le premier « réussi sans erreurs » n'avait rien écrit : le workflow tourne en simulation par défaut. Les 6 contrôles HTTP échouaient alors tous, ce qui aurait pu passer pour un problème de `.htaccess`. Le diagnostic a consisté à comparer ce que servait le domaine (`<title>Bienvenue sur matlofleurs.fr</title>`, `content-length: 4448`, `last-modified` de 09h52) au contenu réel du répertoire relevé en SSH : 4 fichiers Infomaniak, aucun des nôtres. Une seule cause, pas six.

### La vérification réelle

Après déploiement, 15 contrôles sont passés : 301 HTTP vers HTTPS, 301 `www` vers apex, accueil en 200 avec le bon titre, `X-Robots-Tag: noindex, nofollow`, réécriture sans `.html`, 301 sur slash final, 404 servant la page du projet, les 4 en-têtes de sécurité, `immutable` sur `/_astro/`, PHP 8.4.21, sitemap en 200.

Le formulaire a ensuite révélé le dernier défaut. `GET` renvoyait bien 405, ce qui prouvait déjà que PHP 8.1+ parsait le `never` de `refuser()`. Mais l'envoi valide renvoyait 200. Lire le corps de la réponse a donné la réponse en une ligne : `Call to undefined function mail()`. Une sonde PHP temporaire, déposée sur le serveur puis supprimée, a listé `disable_functions` et confirmé que `mail` y figure, tout en montrant que `stream_socket_client` et `openssl` étaient disponibles pour un repli SMTP. Le client a activé `mail()` dans le manager, ce qui a rendu le repli inutile. Retest : 303 vers `/message-envoye`, page de confirmation en 200 et en `noindex`, et 429 au 6e envoi dans l'heure.

Reste le seul point non vérifiable à distance : la réception effective du message dans la boîte.
