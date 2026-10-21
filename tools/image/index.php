<?php
$title = "NullImg – NullWeb";
$navbarLogoRelPath = "../../";
?>
<!DOCTYPE html>
<html lang="en">
<head><?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/meta.php"; ?><script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.16.105/pdf.min.js"></script></head>
<body>
<main class="image-shell">
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/navbar.php"; ?>
    <header class="image-hero"><div><p class="eyebrow">LOCAL TOOL / MEDIA</p><h1>See it. Mark it. Save it.</h1><p class="intro-copy">Open images or the first page of a PDF, draw on the canvas, and export the result.</p></div><div class="image-mark" aria-hidden="true">▧</div></header>
    <section class="image-workspace"><aside class="image-sidebar"><div class="panel-heading"><div><span class="section-label">01 / FILES</span><h2>Open a file</h2></div></div><label id="imageDrop" class="image-drop" for="imageInput"><input id="imageInput" type="file" accept="image/*,.pdf" multiple><span>↑</span><strong>Choose images or PDF</strong><small>Drop files here or browse</small></label><div id="fileList" class="image-file-list"><div class="list-empty">No files loaded.</div></div><div class="image-tools"><span class="section-label">02 / TOOLS</span><button id="drawButton" class="tool-button" type="button">Draw: off</button><button id="undoButton" class="tool-button" type="button">Undo</button><button id="redoButton" class="tool-button" type="button">Redo</button><label class="tool-field">Color<input id="drawColor" type="color" value="#ff5c5c"></label><label class="tool-field">Brush<input id="brushSize" type="range" min="1" max="30" value="4"></label><label class="tool-field">Zoom<input id="zoomInput" type="range" min="0.25" max="2.5" step="0.05" value="1"></label><button id="downloadButton" class="primary-button" type="button" disabled>Download PNG <b>↓</b></button></div></aside><section class="image-canvas-panel"><div class="canvas-heading"><div><span class="section-label">03 / CANVAS</span><h2 id="canvasTitle">Nothing open</h2></div><span id="canvasStatus" class="status-pill">Waiting</span></div><div id="canvasViewport" class="canvas-viewport"><canvas id="canvas"></canvas><div id="canvasEmpty" class="canvas-empty"><span>▧</span><p>Open an image to begin.</p></div></div></section></section>
</main>
<script src="script.js?v=1"></script>
</body>
</html>
