<?php
$title = "NullWeBuild – NullWeb";
$navbarLogoRelPath = "../../";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/meta.php"; ?>
</head>
<body>
<main class="webuild-shell">
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/navbar.php"; ?>
    <header class="webuild-hero">
        <div>
            <p class="eyebrow">LOCAL TOOL / VISUAL BUILDER</p>
            <h1>Build a page, block by block.</h1>
            <p class="intro-copy">Add elements, drag them into place, adjust their properties, and export a ready-to-edit HTML page.</p>
        </div>
        <div class="webuild-mark" aria-hidden="true">&lt;/&gt;</div>
    </header>
    <section class="webuild-workspace">
        <aside class="webuild-sidebar" aria-label="Page builder controls">
            <div class="panel-heading">
                <div><span class="section-label">01 / ELEMENTS</span><h2>Add to canvas</h2></div>
            </div>
            <div class="webuild-add-grid">
                <button type="button" data-add="heading">Heading <b>H</b></button>
                <button type="button" data-add="text">Paragraph <b>¶</b></button>
                <button type="button" data-add="button">Button <b>↗</b></button>
                <button type="button" data-add="image">Image <b>▧</b></button>
            </div>
            <div class="inspector-section">
                <div class="panel-heading">
                    <div><span class="section-label">02 / INSPECTOR</span><h2>Selected element</h2></div>
                    <button id="deleteElement" class="quiet-button" type="button" disabled>Delete</button>
                </div>
                <div id="inspector" class="webuild-inspector">
                    <p class="inspector-empty">Select an element on the canvas to edit it.</p>
                </div>
            </div>
            <div class="webuild-export-actions">
                <button id="exportButton" class="primary-button" type="button">Prepare HTML <b>↓</b></button>
                <button id="clearCanvas" class="quiet-button" type="button">Clear canvas</button>
            </div>
        </aside>
        <section class="webuild-stage-section">
            <div class="stage-heading">
                <div><span class="section-label">03 / CANVAS</span><strong>Drag elements to position them</strong></div>
                <span id="elementCount" class="status-pill">0 elements</span>
            </div>
            <div id="canvas" class="webuild-canvas" aria-label="Page canvas">
                <p id="canvasEmpty" class="canvas-empty">Your page starts here. Choose an element to begin.</p>
            </div>
            <div id="exportPanel" class="webuild-export" hidden>
                <div class="panel-heading">
                    <div><span class="section-label">04 / EXPORT</span><h2>Generated HTML</h2></div>
                    <div class="export-actions">
                        <button id="copyExport" class="quiet-button" type="button">Copy code</button>
                        <button id="downloadExport" class="quiet-button" type="button">Download .html</button>
                    </div>
                </div>
                <textarea id="exportOutput" readonly spellcheck="false" aria-label="Generated HTML"></textarea>
                <p id="exportStatus" class="form-status" role="status" aria-live="polite"></p>
            </div>
        </section>
    </section>
</main>
<script src="script.js?v=1"></script>
</body>
</html>
