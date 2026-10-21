<?php
$title = "NullColor – NullWeb";
$navbarLogoRelPath = "../../";
?>
<!DOCTYPE html>
<html lang="en">
<head><?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/meta.php"; ?></head>
<body>
<main class="color-shell">
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/navbar.php"; ?>
    <header class="color-hero"><div><p class="eyebrow">LOCAL TOOL / COLOR</p><h1>Find the right color.</h1><p class="intro-copy">Build palettes, translate color formats, and copy values without leaving your browser.</p></div><div class="color-mark" aria-hidden="true">●</div></header>
    <div class="color-workspace">
        <section class="color-panel"><div class="panel-heading"><div><span class="section-label">01 / PALETTE</span><h2>Generate a palette</h2></div><span class="status-pill">Five colors</span></div><div class="palette-controls"><label for="paletteType">Style<select id="paletteType"><option value="random">Random</option><option value="monochrome">Monochrome</option><option value="complementary">Complementary</option><option value="triadic">Triadic</option><option value="analogous">Analogous</option></select></label><label for="baseColor">Base color<input id="baseColor" type="color" value="#7c5cff"></label><button id="generatePalette" class="primary-button" type="button">Generate <b>→</b></button></div><div id="palette" class="palette-grid"></div><button id="copyPalette" class="quiet-button" type="button">Copy palette</button></section>
        <section class="color-panel"><div class="panel-heading"><div><span class="section-label">02 / CONVERTER</span><h2>Translate a color</h2></div><span id="colorStatus" class="status-pill">Valid color</span></div><div class="color-preview" id="colorPreview"><span id="previewHex">#7C5CFF</span></div><div class="color-fields"><label for="hexInput">HEX<input id="hexInput" value="#7c5cff" spellcheck="false"></label><label for="rgbInput">RGB<input id="rgbInput" value="rgb(124, 92, 255)" spellcheck="false"></label><label for="hslInput">HSL<input id="hslInput" value="hsl(251, 100%, 68%)" spellcheck="false"></label></div><button id="copyColor" class="primary-button" type="button">Copy HEX <b>↗</b></button></section>
    </div>
    <p class="color-note">Click any palette swatch to load it into the converter.</p>
</main>
<script src="script.js?v=1"></script>
</body>
</html>
