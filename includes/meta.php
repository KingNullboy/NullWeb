<meta name="description" content="Explore NullWeb, your hub for NullMedia, NullWiki, NullLinks, NullG*mes, and NullTools. Fun, facts, and useful apps all in one place.">

<meta property="og:title" content="NullWeb - Social Media, Wiki, Games & Tools">
<meta property="og:description" content="Explore NullWeb, your hub for NullMedia, NullWiki, NullLinks, NullG*mes, and NullTools. Fun, facts, and useful apps all in one place.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.null-web.vastserve.com/">
<meta property="og:image" content="https://www.null-web.vastserve.com/logo.png">

<meta name="twitter:title" content="NullWeb - Social Media, Wiki, Games & Tools">
<meta name="twitter:description" content="Explore NullWeb, your hub for NullMedia, NullWiki, NullLinks, NullG*mes, and NullTools. Fun, facts, and useful apps all in one place.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://www.null-web.vastserve.com/logo.png">

<link rel="stylesheet" href="/includes/stylemgr.php">

<link rel="icon" href="logo.png" type="image/png">
<link rel="apple-touch-icon" href="logo.png">

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