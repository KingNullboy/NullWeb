<?php
$title = "NullWoL – NullWeb";
$navbarLogoRelPath = "../../";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/meta.php"; ?>
</head>
<body>
<main class="wol-shell">
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/navbar.php"; ?>
    <header class="wol-hero">
        <div>
            <p class="eyebrow">LOCAL TOOL / NETWORK</p>
            <h1>Wake a machine remotely.</h1>
            <p class="intro-copy">Send a Wake-on-LAN request to a device you own or administer using its network address and MAC address.</p>
        </div>
        <div class="wol-mark" aria-hidden="true">⌁</div>
    </header>
    <section class="wol-panel">
        <div class="panel-heading">
            <div><span class="section-label">01 / TARGET</span><h2>Device details</h2></div>
            <span class="status-pill">UDP magic packet</span>
        </div>
        <form id="wolForm" class="wol-form">
            <label class="wol-field" for="target">Target hostname or IP
                <input id="target" name="target" type="text" maxlength="253" autocomplete="off" placeholder="myhome.example.net" required>
            </label>
            <label class="wol-field" for="mac">Device MAC address
                <input id="mac" name="mac" type="text" inputmode="text" autocomplete="off" placeholder="00:11:22:33:44:55" required>
            </label>
            <label class="wol-field" for="port">UDP port
                <input id="port" name="port" type="number" min="1" max="65535" value="9" required>
            </label>
            <button id="submitButton" class="primary-button" type="submit">Wake machine <b>→</b></button>
        </form>
        <p id="wolStatus" class="form-status" role="status" aria-live="polite" hidden></p>
    </section>
    <p class="wol-note">The target needs Wake-on-LAN enabled, and the server endpoint must be configured to reach its network. Only send requests to devices you are authorized to manage.</p>
</main>
<script src="script.js?v=2"></script>
</body>
</html>
