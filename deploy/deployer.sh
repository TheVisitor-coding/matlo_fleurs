#!/usr/bin/env bash
#
# Déploiement de matlofleurs.fr vers l'hébergement mutualisé Infomaniak.
# Build local puis rsync-over-SSH de dist/ vers la racine web.
#
# Usage :
#   npm run deploy              simulation, n'écrit rien sur le serveur
#   npm run deploy -- --reel    écrit réellement
#   npm run deploy -- --production   lève la garde d'avant ouverture
#
# Config : deploy/.env (copier deploy/.env.example), jamais commité.
#
# Ce script existe parce que le rsync depuis GitHub Actions n'aboutit pas sur
# cet hébergement : la connexion SSH y expire alors qu'elle passe en deux
# secondes depuis un poste de travail.
set -euo pipefail

REEL=0
PRODUCTION=0
for arg in "$@"; do
  case "$arg" in
    --reel) REEL=1 ;;
    --production) PRODUCTION=1 ;;
    *) echo "Argument inconnu : $arg" >&2; exit 2 ;;
  esac
done

RACINE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FICHIER_ENV="$RACINE/deploy/.env"

[ -f "$FICHIER_ENV" ] || {
  echo "Manquant : deploy/.env (copier deploy/.env.example)" >&2
  exit 1
}
set -a; . "$FICHIER_ENV"; set +a

: "${SSH_HOTE:?SSH_HOTE manquant dans deploy/.env}"
: "${SSH_UTILISATEUR:?SSH_UTILISATEUR manquant dans deploy/.env}"
: "${CHEMIN_DISTANT:?CHEMIN_DISTANT manquant dans deploy/.env}"
SSH_PORT="${SSH_PORT:-22}"

# Un chemin sans slash final ferait viser le répertoire parent par rsync, et
# --delete y effacerait tout ce qui n'est pas dans dist/.
case "$CHEMIN_DISTANT" in
  */) ;;
  *) echo "CHEMIN_DISTANT doit se terminer par un /." >&2; exit 1 ;;
esac

OPTIONS_SSH="-p $SSH_PORT -o StrictHostKeyChecking=accept-new"
[ -n "${SSH_CLE:-}" ] && OPTIONS_SSH="$OPTIONS_SSH -i $SSH_CLE -o IdentitiesOnly=yes"

echo "▶ Tests et build"
( cd "$RACINE" && npm test >/dev/null && npm run check >/dev/null && npm run build >/dev/null )

DIST="$RACINE/dist"
[ -f "$DIST/index.html" ] || { echo "dist/index.html absent, le build a échoué." >&2; exit 1; }

# Mêmes contrôles que la garde du workflow. Ils ne s'appliquent qu'à une mise en
# production : la préversion a justement vocation à montrer un site incomplet.
if [ "$PRODUCTION" -eq 1 ]; then
  echo "▶ Garde de publication"
  echec=0
  if grep -rq 'À COMPLÉTER' "$DIST"/; then
    echo "  ✖ Des marqueurs [À COMPLÉTER] sont encore visibles publiquement." >&2
    echec=1
  fi
  if grep -q "DESTINATAIRE = 'A_COMPLETER" "$DIST/api/contact.php"; then
    echo "  ✖ Le formulaire n'a pas de destinataire, il renverrait un 503." >&2
    echec=1
  fi
  if ! grep -q '"telephone":' "$DIST/index.html"; then
    echo "  ✖ Le téléphone est absent du JSON-LD, donc du site entier." >&2
    echec=1
  fi
  if grep -q 'X-Robots-Tag' "$DIST/.htaccess"; then
    echo "  ✖ Le noindex d'avant ouverture est encore dans .htaccess." >&2
    echec=1
  fi
  [ "$echec" -eq 0 ] || { echo "Publication refusée." >&2; exit 1; }
  echo "  ✔ Rien ne s'oppose à la publication."
fi

# .well-known porte les jetons de renouvellement de certificat, .user.ini la
# compression PHP, et .infomaniak-* la page du mode maintenance : trois choses
# posées par l'hébergeur que --delete effacerait.
ARGS_RSYNC=(
  -az --delete
  --exclude '.well-known'
  --exclude '.git'
  --exclude '.user.ini'
  --exclude '.infomaniak-*'
  -e "ssh $OPTIONS_SSH"
  "$DIST/"
  "$SSH_UTILISATEUR@$SSH_HOTE:$CHEMIN_DISTANT"
)

echo "▶ Simulation vers $SSH_UTILISATEUR@$SSH_HOTE:$CHEMIN_DISTANT"
rsync -n --itemize-changes "${ARGS_RSYNC[@]}"

if [ "$REEL" -eq 0 ]; then
  echo "✔ Simulation terminée, rien n'a été écrit. Relancer avec --reel pour déployer."
  exit 0
fi

echo "▶ Déploiement réel"
rsync "${ARGS_RSYNC[@]}"

echo "▶ Contrôle des pages"
BASE="${SITE_URL:-https://matlofleurs.fr}"
for chemin in / /mentions-legales /politique-de-confidentialite; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "$BASE$chemin")
  echo "  $chemin -> $code"
  [ "$code" = "200" ] || { echo "Page non servie." >&2; exit 1; }
done

echo "✔ Déploiement terminé."
