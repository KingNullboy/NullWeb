<?php
$title = "NullHex – NullWeb";
$navbarLogoRelPath = "../../";
?>
<!DOCTYPE html>
<html lang="en">
<head><?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/meta.php"; ?></head>
<body>
<main class="hex-shell">
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/navbar.php"; ?>
    <header class="hex-hero"><div><p class="eyebrow">LOCAL TOOL / BYTES</p><h1>See what a file is made of.</h1><p class="intro-copy">Inspect bytes as hexadecimal and readable text, edit them directly, then export a new file.</p></div><div class="hex-mark" aria-hidden="true">0x</div></header>
    <section class="hex-workspace"><div class="hex-toolbar"><label class="file-picker" for="fileInput"><input id="fileInput" type="file"><span>Choose a file</span></label><span id="fileInfo" class="status-pill">No file loaded</span><button id="downloadButton" class="primary-button" type="button" disabled>Download edited file <b>↓</b></button></div><p id="hexError" class="form-error" hidden></p><textarea id="hexEditor" class="hex-editor" spellcheck="false" placeholder="Load a file to inspect its bytes…"></textarea><div class="hex-footer"><span>Format: hexadecimal bytes, spaces and line breaks ignored</span><span id="byteCount">0 bytes</span></div></section>
</main>
<script src="script.js?v=1"></script>
</body>
</html>
