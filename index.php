<?php
// 1. MUST BE FIRST: Logic for the "1 in 50" random redirect
if (rand(1, 50) === 1) {
    header("Location: /tools/nsfw/?instant=true");
    exit;
}

// 2. Detection for button visibility
$ua = $_SERVER['HTTP_USER_AGENT'];
$isIOS = stripos($ua, 'iPhone') !== false || stripos($ua, 'iPad') !== false;
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>NullWeb</title>

        <?php include "includes/meta.php"; ?>

        <script src="/js/main.js" defer></script>
        <script>
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/offline-sw.js');
            }
        </script>
    </head>

    <body>
        <center>
            <h1>NullWeb</h1>

            <button class="navbtn" onclick="window.location = 'socialmedia/';">
                <img src="socialmedia/logo.png" width="40px"><br>NullMedia
            </button>
            <button class="navbtn" onclick="window.location = 'wiki/';">
                <img src="wiki/logo.png" width="40px"><br>NullWiki
            </button>
            <button class="navbtn" onclick="window.location = 'links/';">
                <img src="links/logo.png" width="40px"><br>NullLinks
            </button>
            <button class="navbtn" onclick="window.location = 'gxmes/';">
                <img src="gxmes/logo.png" width="40px"><br>NullG*mes
            </button>
            <button class="navbtn" onclick="window.location = 'tools/';">
                <img src="tools/logo.png" width="30px"><br>NullTools
            </button>

            <br><br>
            <?php include "includes/facts.php"; ?>
            <br><br>

            <button class="botbtn" onclick="window.location.href='settings.php';">Settings</button>
            <button class="botbtn" onclick="window.open('https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=' + encodeURIComponent(window.location.href) + '&choe=UTF-8');">QR Code</button>
            <button class="botbtn" onclick="window.location.href='contact.php';">Contact Me</button>
            <button class="botbtn" onclick="window.location.href='donate.php';">Donate</button>
            <button class="botbtn" onclick="window.location.href='status.php';">Status</button>
            
            <?php if ($isIOS): ?>
                <button id="installButton" class="botbtn" onclick="window.location.href='/ios_installer.php';">Download iOS App</button>
            <?php else: ?>
                <button class="botbtn" onclick="installPWA();">Install NullWeb App</button>
            <?php endif; ?>
        </center>
    </body>
</html>