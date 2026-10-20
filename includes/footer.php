
<?php
$host = $_SERVER['HTTP_HOST'] ?? 'nullweb.org';
$uri = $_SERVER['REQUEST_URI'] ?? '/';

// Switch between the main site and beta.nullweb.org.
if (strtolower($host) === 'beta.nullweb.org') {
    $toggleHost = 'nullweb.org';
    $toggleLabel = 'Exit Beta';
} else {
    $toggleHost = 'beta.nullweb.org';
    $toggleLabel = 'Enter Beta';
}

// Preserve the current path and query string.
$scheme = 'https://';
$toggleUrl = $scheme . $toggleHost . $uri;

// Build the current page URL for the QR code.
$currentUrl = $scheme . $host . $uri;
?>

<footer class="site-footer">
    <div class="footer-buttons">
        <a class="botbtn" href="/settings.php">Settings</a>
        <a class="botbtn" target="_blank" rel="noopener noreferrer"
           href="/tools/qr/gen.php?data=<?= urlencode($currentUrl) ?>&amp;ec=M&amp;size=8">QR Code</a>
        <a class="botbtn" href="/contact.php">Contact Me</a>
        <a class="botbtn" href="/donate.php">Donate</a>
        <br>

        <a class="botbtn" href="/status.php">Status</a>
        <a class="botbtn" href="/info.php">Info</a>
        <a class="botbtn" href="<?= htmlspecialchars($toggleUrl, ENT_QUOTES, 'UTF-8') ?>"><?= htmlspecialchars($toggleLabel, ENT_QUOTES, 'UTF-8') ?></a>
        <a class="botbtn" href="https://github.com/KingNullboy">My GitHub</a>
        <br>

        <a class="botbtn" href="https://github.com/KingNullboy/NullWeb">Site GitHub</a>
        <a class="botbtn" href="https://youtube.com/@KingNullboy">YouTube</a>
        <a class="botbtn" href="https://www.facebook.com/profile.php?id=61590639261502">Facebook</a>
        <a class="botbtn" href="/includes/ios_installer.php">Download iOS App</a>
        <br>

        <button class="botbtn" type="button" onclick="installPWA();">Install NullWeb App</button>
        <br><br>

        <p>NullWeb is a web platform created by KingNullboy that brings together tools, games, wiki pages, and utilities in one place for fun, learning, and sharing.</p>
        <br>

        <p class="footer-note">
            NullWeb runs on next-generation NVMe technology. With that said, my site needs more storage to securely store user data and the like.
            However, apparently AIs have been eating all the RAM and SSDs, and I am broke, so donations would be appreciated.
        </p>
    </div>
</footer>
