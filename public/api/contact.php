<?php

declare(strict_types=1);

// Le formulaire de la page d'accueil est le seul endroit du site où déposer une
// demande de devis. Une adresse non renseignée doit donc échouer bruyamment,
// jamais perdre un message en silence.
const DESTINATAIRE = 'contact@matlofleurs.fr';
const EXPEDITEUR = 'site@matlofleurs.fr';
const REDIRECTION_SUCCES = '/message-envoye';
const MAX_PAR_HEURE = 5;

const CHAMPS = [
    'nom' => ['libelle' => 'Nom et prénom', 'requis' => true, 'max' => 120],
    'telephone' => ['libelle' => 'Téléphone', 'requis' => true, 'max' => 40],
    'email' => ['libelle' => 'E-mail', 'requis' => false, 'max' => 160],
    'demande' => ['libelle' => 'Demande', 'requis' => true, 'max' => 60],
    'date' => ['libelle' => 'Date souhaitée', 'requis' => false, 'max' => 40],
    'message' => ['libelle' => 'Message', 'requis' => true, 'max' => 4000],
];

function refuser(int $code, string $message): never
{
    http_response_code($code);
    header('Content-Type: text/html; charset=utf-8');
    $echappe = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
    echo <<<HTML
    <!doctype html>
    <html lang="fr"><head><meta charset="utf-8"><title>Envoi impossible</title>
    <style>body{background:#f3ede1;color:#1d1e33;font:1rem/1.5 Georgia,serif;margin:0;
    display:grid;place-items:center;min-height:100vh;padding:2rem;text-align:center}
    a{color:#5c6b4f}</style></head>
    <body><div><h1>Envoi impossible</h1><p>{$echappe}</p>
    <p>Vous pouvez nous appeler ou passer à la boutique, 30 rue de Saint-Jean-de-Monts à
    Challans.</p><p><a href="/#formulaire">Revenir au formulaire</a></p></div></body></html>
    HTML;
    exit;
}

/** Un en-tête de courriel ne doit jamais contenir de retour à la ligne. */
function assainirEntete(string $valeur): string
{
    return trim(str_replace(["\r", "\n", "%0a", "%0d"], ' ', $valeur));
}

function limiteAtteinte(): bool
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'inconnue';
    $fichier = sys_get_temp_dir() . '/matlofleurs-' . sha1($ip);
    $maintenant = time();

    $envois = [];
    if (is_readable($fichier)) {
        $envois = array_filter(
            array_map('intval', explode(',', (string) file_get_contents($fichier))),
            static fn (int $t): bool => $t > $maintenant - 3600,
        );
    }

    if (count($envois) >= MAX_PAR_HEURE) {
        return true;
    }

    $envois[] = $maintenant;
    // En cas d'échec d'écriture on laisse passer : perdre une demande coûte plus
    // cher que d'accepter un envoi de trop.
    @file_put_contents($fichier, implode(',', $envois), LOCK_EX);

    return false;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    refuser(405, 'Cette adresse ne répond qu\'à un envoi de formulaire.');
}

if (str_contains(DESTINATAIRE, 'A_COMPLETER')) {
    refuser(503, 'Le formulaire n\'est pas encore relié à une boîte de réception.');
}

if (trim((string) ($_POST['site_web'] ?? '')) !== '') {
    refuser(400, 'Envoi refusé.');
}

if (limiteAtteinte()) {
    refuser(429, 'Trop d\'envois depuis cette connexion. Réessayez dans une heure.');
}

$valeurs = [];
foreach (CHAMPS as $nom => $regle) {
    $valeur = trim((string) ($_POST[$nom] ?? ''));

    if ($regle['requis'] && $valeur === '') {
        refuser(400, sprintf('Le champ « %s » est obligatoire.', $regle['libelle']));
    }

    if (mb_strlen($valeur) > $regle['max']) {
        refuser(400, sprintf('Le champ « %s » est trop long.', $regle['libelle']));
    }

    $valeurs[$nom] = $valeur;
}

if ($valeurs['email'] !== '' && filter_var($valeurs['email'], FILTER_VALIDATE_EMAIL) === false) {
    refuser(400, 'L\'adresse électronique saisie n\'est pas valide.');
}

$corps = '';
foreach (CHAMPS as $nom => $regle) {
    if ($valeurs[$nom] !== '') {
        $corps .= $regle['libelle'] . " : " . $valeurs[$nom] . "\n\n";
    }
}
$corps .= "---\nEnvoyé depuis le formulaire de matlofleurs.fr\n";

$entetes = [
    'From: Site Matlo\'Fleurs <' . EXPEDITEUR . '>',
    'Content-Type: text/plain; charset=utf-8',
    'X-Mailer: PHP/' . PHP_VERSION,
];

if ($valeurs['email'] !== '') {
    $entetes[] = 'Reply-To: ' . assainirEntete($valeurs['nom']) . ' <' . $valeurs['email'] . '>';
}

$sujet = sprintf('[Site] %s — %s', $valeurs['demande'], assainirEntete($valeurs['nom']));

if (!mail(DESTINATAIRE, $sujet, $corps, implode("\r\n", $entetes))) {
    refuser(500, 'L\'envoi a échoué. Merci de nous appeler.');
}

http_response_code(303);
header('Location: ' . REDIRECTION_SUCCES);
