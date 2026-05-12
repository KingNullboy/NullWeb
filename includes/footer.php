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
        <a class="botbtn" href="https://youtube.com/@KingNullboy">My YouTube Channel</a>
        <?php if ($isIOS): ?>
            <a class="botbtn" href="/ios_installer.php">Download iOS App</a>
        <?php elseif ($isMobile): ?>
            <button class="botbtn" type="button" onclick="installPWA();">Install NullWeb App</button>
        <?php endif; ?><br><br>

		<p>NullWeb is a web platform created by KingNullboy that brings together tools, games, wiki pages, and utilities in one place for fun, learning, and sharing.</p><br>
		<p class="footer-note">
    		Due to unprecedented growth (three users online simultaneously), our infrastructure now requires immediate migration to next-generation NVMe technology.
    		This investment will increase performance by approximately "a lot" and move us one step closer to becoming web scale or something.
		</p>
    </div>
</footer>
