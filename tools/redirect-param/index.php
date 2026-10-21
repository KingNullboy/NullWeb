<?php
$title = "NullRedirect – NullWeb";
$navbarLogoRelPath = "../../";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/meta.php"; ?>
</head>
<body>
<main class="redirect-shell">
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/navbar.php"; ?>
    <header class="redirect-hero">
        <div>
            <p class="eyebrow">LOCAL TOOL / FIRST-VISIT ROUTING</p>
            <h1>One link. Two destinations.</h1>
            <p class="intro-copy">Welcome someone with a first-visit page, then send that same browser straight to the regular destination next time.</p>
        </div>
        <div class="redirect-mark" aria-hidden="true">↪</div>
    </header>
    <section id="builderPanel" class="redirect-panel">
        <div class="panel-heading">
            <div><span class="section-label">01 / CONFIGURE</span><h2>Create a first-visit link</h2></div>
            <span class="status-pill">Per browser</span>
        </div>
        <form id="redirectForm" class="redirect-form">
            <label class="redirect-field" for="url1">First visit destination
                <input id="url1" type="url" placeholder="https://example.com/welcome" autocomplete="url" required>
                <small>For example: a welcome page, one-time offer, or signup flow.</small>
            </label>
            <label class="redirect-field" for="url2">Every later visit
                <input id="url2" type="url" placeholder="https://example.com/home" autocomplete="url" required>
                <small>The browser remembers that the first visit has happened.</small>
            </label>
            <label class="redirect-field" for="campaignKey">Campaign key <span>(optional)</span>
                <input id="campaignKey" type="text" maxlength="120" placeholder="e.g. october-launch">
                <small>Use the same key for one campaign; a different key creates an independent first visit.</small>
            </label>
            <button id="buildButton" class="primary-button" type="submit">Build redirect link <b>→</b></button>
            <p id="redirectError" class="form-error" role="alert" hidden></p>
        </form>
        <div id="result" class="redirect-result" hidden>
            <div class="panel-heading">
                <div><span class="section-label">02 / SHARE</span><h2>Your redirect link</h2></div>
                <span class="status-pill">Ready to share</span>
            </div>
            <label class="redirect-field" for="generatedLink">Generated link
                <input id="generatedLink" type="url" readonly>
            </label>
            <div class="result-actions">
                <button id="copyLink" class="secondary-button" type="button">Copy link</button>
                <a id="testLink" class="secondary-button" href="#" target="_blank" rel="noopener noreferrer">Test the link</a>
                <button id="resetCampaign" class="secondary-button" type="button">Reset this browser</button>
            </div>
            <p id="copyStatus" class="form-status" role="status" aria-live="polite"></p>
        </div>
    </section>
    <section id="routerMessage" class="router-message" aria-live="polite" hidden>
        <span class="section-label">REDIRECT LINK</span>
        <h2 id="routerHeading">Choosing your destination…</h2>
        <p id="routerText"></p>
        <a id="routerContinue" class="secondary-button" href="#" hidden>Continue to destination</a>
    </section>
    <aside class="redirect-note">
        <strong>How it works</strong>
        <p>The first-visit marker is saved in this browser only. It is not shared across devices or browsers, and clearing site data or using private browsing starts a new first visit.</p>
    </aside>
</main>
<script src="script.js?v=2"></script>
</body>
</html>
