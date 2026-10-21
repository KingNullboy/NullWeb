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
            <h1>A blank tab for any site.</h1>
            <p class="intro-copy">Open a website inside a new <code>about:blank</code> tab instead of navigating the tab to the site’s address.</p>
        </div>
        <div class="portal-mark" aria-hidden="true">↗</div>
    </header>
    <section class="portal-panel">
        <div class="panel-heading">
            <div><span class="section-label">01 / DESTINATION</span><h2>What do you want to open?</h2></div>
            <span class="status-pill">Opens in about:blank</span>
        </div>
        <form id="portalForm" class="portal-form">
            <label for="urlInput">Website URL
                <input id="urlInput" type="text" inputmode="url" placeholder="example.com or https://example.com" autocomplete="url" required>
            </label>
            <button id="openButton" class="primary-button" type="submit">Open in blank tab <b>→</b></button>
        </form>
        <p id="portalError" class="form-error" role="alert" hidden></p>
    </section>
    <section id="portalResult" class="portal-panel portal-result" aria-live="polite" hidden>
        <span class="section-label">PORTAL OPENED</span>
        <h2 id="portalResultTitle">Your site is open in a blank tab.</h2>
        <p id="portalResultText" class="portal-note"></p>
    </section>
    <p class="portal-note">The site is displayed inside the blank tab. Some websites block being embedded; those sites may show an error or blank page instead.</p>
</main>
<script src="script.js?v=3"></script>
</body>
</html>
