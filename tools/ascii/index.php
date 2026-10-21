<?php
$title = "NullASCII – NullWeb";
$navbarLogoRelPath = "../../";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/meta.php"; ?>
</head>
<body>
<main class="ascii-shell">
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/navbar.php"; ?>

    <header class="ascii-hero">
        <div>
            <p class="eyebrow">LOCAL TOOL / ASCII</p>
            <h1>Turn pixels into text.</h1>
            <p class="intro-copy">Drop in an image and shape it into readable ASCII art. Everything runs in your browser.</p>
        </div>
        <div class="ascii-mark" aria-hidden="true">@</div>
    </header>

    <div class="ascii-workspace">
        <section class="ascii-controls" aria-labelledby="controls-title">
            <div class="panel-heading">
                <div><span class="section-label">01 / SOURCE</span><h2 id="controls-title">Choose an image</h2></div>
                <span class="local-status"><i></i> Runs locally</span>
            </div>

            <label id="dropZone" class="ascii-drop-zone" for="imageInput">
                <input id="imageInput" type="file" accept="image/*">
                <span class="upload-icon">↑</span>
                <strong>Drop an image here</strong>
                <small>or click to browse. PNG, JPEG, GIF, and WebP are supported.</small>
            </label>
            <p id="fileError" class="form-error" role="alert" hidden></p>

            <div class="ascii-options">
                <span class="section-label">02 / OUTPUT</span>
                <label class="ascii-field" for="widthInput">Width <output id="widthValue">100</output><input id="widthInput" type="range" min="20" max="220" value="100"></label>
                <label class="ascii-field" for="charsetInput">Character set<select id="charsetInput"><option value="dense">Dense · detailed</option><option value="simple">Simple · readable</option><option value="blocks">Blocks · bold</option><option value="binary">Binary · minimal</option></select></label>
                <label class="ascii-check"><input id="colorToggle" type="checkbox"> Keep image colors</label>
                <label class="ascii-check"><input id="invertToggle" type="checkbox"> Invert brightness</label>
                <button id="convertButton" class="primary-button" type="button"><span>Convert image</span><b>→</b></button>
            </div>
        </section>

        <section class="ascii-preview" aria-live="polite" aria-labelledby="preview-title">
            <div class="panel-heading">
                <div><span class="section-label">03 / RESULT</span><h2 id="preview-title">Your ASCII art</h2></div>
                <span id="previewState" class="preview-state">Waiting</span>
            </div>
            <div id="asciiOutput" class="ascii-output"><div class="empty-preview"><span>⌁</span><p>Your converted image will appear here.</p></div></div>
            <div class="ascii-actions">
                <button id="copyButton" class="secondary-button" type="button" disabled>Copy text</button>
                <button id="downloadButton" class="secondary-button" type="button" disabled>Download .txt</button>
            </div>
            <p id="imageSummary" class="data-summary">No image loaded yet.</p>
        </section>
    </div>

    <canvas id="imageCanvas" hidden></canvas>
    <p class="ascii-note">Wider output gives more detail. Use a monospace font when sharing the result.</p>
</main>
<script src="script.js?v=1"></script>
</body>
</html>
