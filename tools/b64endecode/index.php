<?php
$title = "NullB64 – NullWeb";
$navbarLogoRelPath = "../../";
?>
<!DOCTYPE html>
<html lang="en">
<head><?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/meta.php"; ?></head>
<body>
<main class="b64-shell">
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/navbar.php"; ?>
    <header class="b64-hero"><div><p class="eyebrow">LOCAL TOOL / FILES</p><h1>Base64, without the busywork.</h1><p class="intro-copy">Encode a file into portable text or turn Base64 back into the original download. Files stay in your browser.</p></div><div class="b64-mark" aria-hidden="true">64</div></header>
    <div class="b64-workspace">
        <section class="b64-panel"><div class="panel-heading"><div><span class="section-label">01 / ENCODE</span><h2>File to Base64</h2></div><span class="status-pill">Local</span></div><label id="encodeDrop" class="file-drop" for="encodeInput"><input id="encodeInput" type="file"><span>↑</span><strong>Choose a file</strong><small>Any file type works</small></label><p id="encodeName" class="file-name">No file selected.</p><button id="encodeButton" class="primary-button" type="button">Encode file <b>→</b></button><a id="encodedDownload" class="download-link" hidden>Download .b64</a><p id="encodeStatus" class="tool-status"></p></section>
        <section class="b64-panel"><div class="panel-heading"><div><span class="section-label">02 / DECODE</span><h2>Base64 to file</h2></div><span class="status-pill">Local</span></div><label id="decodeDrop" class="file-drop" for="decodeInput"><input id="decodeInput" type="file" accept=".b64,.txt,text/plain"><span>↓</span><strong>Choose Base64 text</strong><small>A .b64 or plain text file</small></label><p id="decodeName" class="file-name">No file selected.</p><input id="decodedName" class="text-input" placeholder="Output filename (optional)"><button id="decodeButton" class="primary-button" type="button">Decode file <b>→</b></button><a id="decodedDownload" class="download-link" hidden>Download decoded file</a><p id="decodeStatus" class="tool-status"></p></section>
    </div>
    <p class="b64-note">Base64 increases file size by about one third. It is an encoding format, not encryption.</p>
</main>
<script src="script.js?v=1"></script>
</body>
</html>
