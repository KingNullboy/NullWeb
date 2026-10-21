<?php
$title = "NullPortal – NullWeb";
$navbarLogoRelPath = "../../";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/meta.php"; ?>
</head>
<body>
<main class="portal-shell">
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/navbar.php"; ?>
    <header class="portal-hero">
        <div>
            <p class="eyebrow">LOCAL TOOL / PORTAL</p>
            <h1>Keep a site in one tab.</h1>
            <p class="intro-copy">Open a website in a focused preview, then pop it into its own tab whenever you need the full experience.</p>
        </div>
        <div class="portal-mark" aria-hidden="true">↗</div>
    </header>
    <section class="portal-panel">
        <div class="panel-heading">
            <div><span class="section-label">01 / DESTINATION</span><h2>Where should it go?</h2></div>
            <span class="status-pill">Browser preview</span>
        </div>
        <form id="portalForm" class="portal-form">
            <label for="urlInput">Website URL
                <input id="urlInput" type="text" inputmode="url" placeholder="example.com or https://example.com" autocomplete="url" required>
            </label>
            <button id="openButton" class="primary-button" type="submit">Open portal <b>→</b></button>
        </form>
        <p id="portalError" class="form-error" role="alert" hidden></p>
    </section>
    <section id="previewPanel" class="portal-preview" hidden>
        <div class="panel-heading">
            <div><span class="section-label">02 / PREVIEW</span><h2 id="previewTitle">Portal</h2></div>
            <div class="preview-actions">
                <button id="backButton" class="quiet-button" type="button">Close preview</button>
                <button id="newTabButton" class="quiet-button" type="button">Open new tab</button>
                <button id="fullscreenButton" class="quiet-button" type="button">Full screen</button>
            </div>
        </div>
        <iframe id="portalFrame" title="Portal preview" referrerpolicy="no-referrer" allowfullscreen></iframe>
        <p class="portal-note">Some sites block embedding or require a sign-in in their own tab. Use “Open new tab” for those sites.</p>
    </section>
</main>
<script src="script.js?v=2"></script>
</body>
</html>
