<?php
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https://" : "http://";
$baseUrl  = $protocol . $_SERVER['HTTP_HOST'];

// Detect current section path (e.g., /wiki/, /gxmes/, /tools/, etc.)
$uri = $_SERVER['REQUEST_URI'] ?? '/';
$segments = array_filter(explode('/', trim($uri, '/')));
$firstDir = $segments[0] ?? '';

// Specific sections that have their own logo.png
$sectionsWithLogos = ['wiki', 'gxmes', 'links', 'socialmedia', 'tools'];

if (in_array($firstDir, $sectionsWithLogos)) {
    $logoPath = "/{$firstDir}/logo.png";
} else {
    $logoPath = "/logo.png";
}

$logoUrl = $baseUrl . $logoPath;
?>
<title><?= $title ?? "NullWeb" ?></title>

<script src="/js/main.js"></script>

<meta name="description" content="Explore NullWeb, your hub for NullMedia, NullWiki, NullLinks, NullG*mes, and NullTools. Fun, facts, and useful apps all in one place.">

<meta property="og:title" content="<?= $title ?? "NullWeb - Social Media, Wiki, Games & Tools" ?>">
<meta property="og:description" content="Explore NullWeb, your hub for NullMedia, NullWiki, NullLinks, NullG*mes, and NullTools. Fun, facts, and useful apps all in one place.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.null-web.vastserve.com/">
<meta property="og:image" content="<?= $logoUrl ?>">

<meta name="twitter:title" content="<?= $title ?? "NullWeb - Social Media, Wiki, Games & Tools" ?>">
<meta name="twitter:description" content="Explore NullWeb, your hub for NullMedia, NullWiki, NullLinks, NullG*mes, and NullTools. Fun, facts, and useful apps all in one place.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="<?= $logoUrl ?>">

<link rel="stylesheet" href="/includes/stylemgr.php">

<link rel="icon" href="<?= $logoPath ?>" type="image/png">
<link rel="apple-touch-icon" href="<?= $logoPath ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta charset="UTF-8">

<link rel="manifest" href="/manifest.json">
<script>
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
    });

    async function installPWA() {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') deferredPrompt = null;
        } else {
            alert("To install, open your browser menu and select 'Add to Home screen'.");
        }
    }
</script>

<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">

<meta name="1c0c5ea3b3bd850dba40170d17be6ebfe83d029c" content="1c0c5ea3b3bd850dba40170d17be6ebfe83d029c">
<meta name="7searchppc" content="ff4b6afbcbb42673ffe95c30f02b4ea8">
