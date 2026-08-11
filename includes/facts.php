<?php
$fortune_bin  = '/usr/games/fortune';
$fortune_path = '/home/kingnullboy/Documents/Coding/NullAPIs/nullweb.fortune';

$command = "$fortune_bin " . escapeshellarg($fortune_path) . " 2>&1";

// AJAX Handler
if (isset($_GET['ajax'])) {
    header('Content-Type: text/plain');
    echo trim(shell_exec($command));
    exit;
}

// Initial Page Load
$initial_fact = trim(shell_exec($command));

if (empty($initial_fact)) {
    $initial_fact = "The word 'set' has the most definitions of any word in the English language.";
}
?>

<div class="textbox" id="homepageFact" style="cursor: pointer; user-select: none; background-color: transparent; border: none;" title="Click for a new fact">
    <strong>Did you know?</strong><br>
    <span id="factText"><?php echo htmlspecialchars($initial_fact, ENT_QUOTES, 'UTF-8'); ?></span>
</div>

<script>
    (function() {
        const factContainer = document.getElementById('homepageFact');
        const factText = document.getElementById('factText');

        if (factContainer && factText) {
            factContainer.addEventListener('click', async function() {
                try {
                    const response = await fetch('/includes/facts.php?ajax=1');
                    if (response.ok) {
                        factText.innerText = await response.text();
                    }
                } catch (err) {
                    console.error('Failed to fetch fortune:', err);
                }
            });
        }
    })();
</script>
