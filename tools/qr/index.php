<?php
$title = "QR Code Generator – NullWeb";
$navbarLogoRelPath = "../../";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <?php include $_SERVER['DOCUMENT_ROOT']."/includes/meta.php"; ?>
</head>

<body>
<main class="qr-shell">
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/navbar.php"; ?>
    <header class="page-intro"><div><p class="eyebrow">LOCAL TOOL / QR</p><h1>Make something scannable.</h1><p class="intro-copy">Turn a link, message, or Wi‑Fi network into a QR code you can save and share.</p></div><div class="intro-mark" aria-hidden="true">▦</div></header>
    <div class="qr-workspace">
        <form id="qrForm" class="controls-panel" novalidate>
            <div class="panel-heading"><div><span class="section-label">01 / CONTENT</span><h2>What should it contain?</h2></div><span class="local-status"><i></i> Runs locally</span></div>
            <label class="field" for="type">Content type<select id="type"><option value="url">Website link</option><option value="text">Plain text</option><option value="wifi">Wi‑Fi network</option></select></label>
            <div id="field-url" class="content-fields"><label class="field" for="url">URL<input id="url" type="url" placeholder="https://example.com" autocomplete="url"></label></div>
            <div id="field-text" class="content-fields" hidden><label class="field" for="text">Text<textarea id="text" rows="5" placeholder="Write a message..."></textarea></label></div>
            <div id="field-wifi" class="content-fields" hidden><label class="field" for="ssid">Network name (SSID)<input id="ssid" type="text" autocomplete="off"></label><label class="field" for="password">Password<input id="password" type="text" autocomplete="off"></label><label class="field" for="encryption">Security<select id="encryption"><option value="WPA">WPA / WPA2</option><option value="WEP">WEP</option><option value="nopass">No password</option></select></label></div>
            <details class="advanced-options"><summary>Advanced QR settings <span>Size and error correction</span></summary><div class="advanced-grid"><label class="field" for="ec">Error correction<select id="ec"><option value="L">Low · smallest</option><option value="M" selected>Medium · balanced</option><option value="Q">Quartile · durable</option><option value="H">High · most durable</option></select></label><label class="field" for="size">Scale<input id="size" type="number" value="8" min="1" max="20" inputmode="numeric"></label><label class="field" for="margin">Quiet zone<input id="margin" type="number" value="2" min="0" max="10" inputmode="numeric"></label></div></details>
            <p id="formError" class="form-error" role="alert" hidden></p><button id="generate" class="generate-button" type="submit"><span>Generate QR code</span><b>→</b></button>
        </form>
        <section class="preview-panel" aria-live="polite"><div class="panel-heading"><div><span class="section-label">02 / PREVIEW</span><h2>Your QR code</h2></div><span id="previewState" class="preview-state">Waiting</span></div><div id="qr-preview" class="qr-preview"><div class="empty-preview"><span>▦</span><p>Your generated code will appear here.</p></div></div><div id="previewActions" class="preview-actions" hidden><a id="downloadQr" class="secondary-button" download="qr-code.png">Download PNG</a><button id="copyData" class="secondary-button" type="button">Copy content</button></div><p id="dataSummary" class="data-summary">Nothing generated yet.</p></section>
    </div>
    <p class="qr-note">Keep the white space around the code clear so phones can scan it reliably.</p>
</main>
<script src="script.js?v=2"></script>
</body>
</html>
