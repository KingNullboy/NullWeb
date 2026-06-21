<?php
$uri = $_SERVER['REQUEST_URI'];
if (preg_match('#^/beta(/.*)?$#', $uri, $m)) {
    // currently in beta -> strip the prefix
    $toggleUrl = $m[1] ?? '/';
    $toggleLabel = 'Exit Beta';
} else {
    // not in beta -> add the prefix
    $toggleUrl = '/beta' . $uri;
    $toggleLabel = 'Enter Beta';
}
?>

<footer class="site-footer">
    <div class="footer-buttons">
        <a class="botbtn" href="/settings.php">Settings</a>
        <a class="botbtn" target="_blank" href="/tools/qr/gen.php?data=<?= urlencode((isset($_SERVER['HTTPS']) ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']) ?>&ec=M&size=8">QR Code</a>
        <a class="botbtn" href="/contact.php">Contact Me</a>
        <a class="botbtn" href="/donate.php">Donate</a>
        <br>
        <a class="botbtn" href="/status.php">Status</a>
        <a class="botbtn" href="/info.php">Info</a>
		<a class="botbtn" href="<?= htmlspecialchars($toggleUrl) ?>"><?= $toggleLabel ?></a>
        <a class="botbtn" href="https://github.com/nullmedia-social">My GitHub</a>
		<br>
        <a class="botbtn" href="https://github.com/nullmedia-social/NullWeb">Site GitHub</a>
        <a class="botbtn" href="https://youtube.com/@KingNullboy">YouTube</a>
        <a class="botbtn" href="https://www.facebook.com/profile.php?id=61590639261502">Facebook</a>
        
        <a class="botbtn" href="/includes/ios_installer.php">Download iOS App</a>
        <button class="botbtn" type="button" onclick="installPWA();">Install NullWeb App</button><br><br>

		<p>NullWeb is a web platform created by KingNullboy that brings together tools, games, wiki pages, and utilities in one place for fun, learning, and sharing.</p><br>
		<p class="footer-note">
    		Due to unprecedented growth (three users online simultaneously), our infrastructure now requires immediate migration to next-generation NVMe technology.
			This investment will increase performance by approximately "a lot" and move us one step closer to becoming web scale or something.
			However, apparently AIs have been eating all the RAM and SSDs, and I am broke, so donations would be appreciated.
		</p>
    </div>
</footer>
