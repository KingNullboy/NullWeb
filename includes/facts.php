<?php
$fortune_bin = '/usr/games/fortune';
$custom_path = '/home/kingnullboy/Documents/Coding/NullAPIs/nullweb.fortune';

// 1. Read GET parameter if sent via AJAX, otherwise read $_COOKIE
if (isset($_GET['type']) && $_GET['type'] !== '') {
    $cookie_type = trim($_GET['type']);
} else {
    $cookie_type = trim($_COOKIE['fortunetype'] ?? 'nullweb');
}

// 2. Select command based on resolved type
if ($cookie_type === 'fortune') {
    $command = "$fortune_bin 90% /usr/share/games/fortunes/ 10% /home/kingnullboy/.fortunes/kjv_bible 2>&1";
} else {
    $command = "$fortune_bin 90% " . escapeshellarg($custom_path) . " 10%  /home/kingnullboy/.fortunes/kjv_bible 2>&1";
}

$fact = trim(shell_exec($command));

// 3. Output raw text for AJAX requests
if (isset($_GET['ajax'])) {
    header('Cache-Control: no-cache, no-store, must-revalidate');
    header('Content-Type: text/plain; charset=utf-8');
    echo $fact;
    exit;
}
?>

<div class="textbox" id="homepageFact" style="cursor: pointer; background-color: transparent; border: none;" title="Click for a new fact">
    <strong>Did you know?</strong><br>
    <span id="factText"><?php echo nl2br(htmlspecialchars($fact, ENT_QUOTES, 'UTF-8')); ?></span>
</div>

<script>
(function() {
    const factBox = document.getElementById('homepageFact');
    if (!factBox) return;

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return '';
    }

    factBox.addEventListener('click', function() {
        // Ignore clicks if the user is highlighting/selecting text
        const selection = window.getSelection();
        if (selection.toString().length > 0) return;

        const factTextElem = document.getElementById('factText');
        factTextElem.style.opacity = '0.5';

        // Read active cookie with server-side fallback
        const currentType = getCookie('fortunetype') || '<?php echo htmlspecialchars($cookie_type, ENT_QUOTES, 'UTF-8'); ?>';

        fetch('/includes/facts.php?ajax=1&type=' + encodeURIComponent(currentType) + '&_t=' + Date.now())
        .then(res => {
            if (!res.ok) throw new Error('HTTP status ' + res.status);
            return res.text();
        })
        .then(text => {
            factTextElem.innerHTML = text
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;")
                .replace(/\n/g, '<br>');
            factTextElem.style.opacity = '1';
        })
        .catch(err => {
            console.error('Fortune fetch error:', err);
            factTextElem.style.opacity = '1';
        });
    });
})();
</script>
