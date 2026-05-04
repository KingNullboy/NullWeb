<footer class="site-footer">
    <div class="footer-buttons">
        <a class="botbtn" href="/settings.php">Settings</a>
        <a class="botbtn" target="_blank" href="https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=<?= urlencode((isset($_SERVER['HTTPS']) ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']) ?>&choe=UTF-8">QR Code</a>
        <a class="botbtn" href="/contact.php">Contact Me</a>
        <a class="botbtn" href="/donate.php">Donate</a>
        <br>
        <a class="botbtn" href="/status.php">Status</a>
        <a class="botbtn" href="https://github.com/nullmedia-social">My GitHub</a>
        <a class="botbtn" href="https://github.com/nullmedia-social/NullWeb">Site GitHub</a>
        <a class="botbtn" href="/info.php">Info</a>
        <br>
        <?php if ($isIOS): ?>
            <a class="botbtn" href="/ios_installer.php">Download iOS App</a>
        <?php elseif ($isMobile): ?>
            <button class="botbtn" type="button" onclick="installPWA();">Install NullWeb App</button>
        <?php endif; ?>
    </div>
</footer>