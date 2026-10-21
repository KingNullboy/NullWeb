<?php
$title = "NullRNG – NullWeb";
$navbarLogoRelPath = "../../";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/meta.php"; ?>
</head>
<body>
<main class="rng-shell">
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/navbar.php"; ?>
    <header class="rng-hero">
        <div>
            <p class="eyebrow">LOCAL TOOL / RANDOMNESS</p>
            <h1>Roll your own range.</h1>
            <p class="intro-copy">Generate a random integer or decimal, keep a short local history, and copy any result in one click.</p>
        </div>
        <div class="rng-mark" aria-hidden="true">?</div>
    </header>
    <section class="rng-panel">
        <div class="panel-heading">
            <div><span class="section-label">01 / GENERATE</span><h2>Random number</h2></div>
            <span id="rngStatus" class="status-pill">Checking secure randomness…</span>
        </div>
        <div class="rng-form">
            <label for="type">Number type
                <select id="type"><option value="integer">Integer (inclusive)</option><option value="real">Decimal</option></select>
            </label>
            <label for="min">Minimum<input id="min" type="number" value="1" step="any" required></label>
            <label for="max">Maximum<input id="max" type="number" value="100" step="any" required></label>
            <button id="generate" class="primary-button" type="button">Generate <b>→</b></button>
        </div>
        <p id="rngError" class="form-error" role="alert" hidden></p>
        <div class="result-card">
            <span class="section-label">RESULT</span>
            <strong id="result" aria-live="polite">—</strong>
            <button id="copyResult" class="quiet-button" type="button" disabled>Copy</button>
        </div>
        <p id="rngMessage" class="form-status" role="status" aria-live="polite"></p>
    </section>
    <section class="rng-history">
        <div class="panel-heading">
            <div><span class="section-label">02 / HISTORY</span><h2>Recent results</h2></div>
            <button id="clearHistory" class="quiet-button" type="button">Clear history</button>
        </div>
        <div id="history" class="history-list"><div class="list-empty">Your results will appear here.</div></div>
    </section>
    <p class="rng-note">Generated in this browser with the Web Crypto API. The most recent results are stored locally on this device.</p>
</main>
<script src="script.js?v=2"></script>
</body>
</html>
