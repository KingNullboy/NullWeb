<?php
$title = "NullRegex – NullWeb";
$navbarLogoRelPath = "../../";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/meta.php"; ?>
</head>
<body>
<main class="regex-shell">
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/navbar.php"; ?>
    <header class="regex-hero">
        <div>
            <p class="eyebrow">LOCAL TOOL / PATTERNS</p>
            <h1>Find the pattern in the text.</h1>
            <p class="intro-copy">Write a regular expression directly or assemble one from common pieces, then see every match safely highlighted.</p>
        </div>
        <div class="regex-mark" aria-hidden="true">.*</div>
    </header>
    <div class="regex-workspace">
        <section class="regex-builder">
            <div class="panel-heading">
                <div><span class="section-label">01 / PATTERN</span><h2>Write or build</h2></div>
                <button id="clearPattern" class="quiet-button" type="button">Clear</button>
            </div>
            <label class="regex-field" for="patternInput">Regular expression
                <input id="patternInput" type="text" placeholder="e.g. \\b\\w+@\\w+\\.com\\b" spellcheck="false" autocomplete="off">
            </label>
            <div class="builder-row">
                <select id="builder" aria-label="Pattern component">
                    <option value="literal">Literal text</option>
                    <option value="digit">Digit · \d</option>
                    <option value="word">Word · \w</option>
                    <option value="whitespace">Whitespace · \s</option>
                    <option value="any">Any character · .</option>
                    <option value="start">Start · ^</option>
                    <option value="end">End · $</option>
                    <option value="optional">Optional · ?</option>
                    <option value="zeroOrMore">Zero or more · *</option>
                    <option value="oneOrMore">One or more · +</option>
                    <option value="group">Literal group · ( )</option>
                    <option value="or">Alternation · |</option>
                </select>
                <input id="builderInput" type="text" placeholder="Text for literal or group">
                <button id="addElement" class="primary-button" type="button">Add <b>+</b></button>
            </div>
            <label class="regex-field" for="flags">Flags
                <input id="flags" type="text" value="gm" placeholder="gim" spellcheck="false" autocomplete="off">
                <small>Use <code>g</code> for every match, <code>i</code> to ignore case, and <code>m</code> for line boundaries.</small>
            </label>
            <p id="regexError" class="form-error" role="alert" hidden></p>
            <pre id="patternPreview" class="pattern-preview" aria-live="polite">Your pattern will appear here.</pre>
        </section>
        <section class="regex-test">
            <div class="panel-heading">
                <div><span class="section-label">02 / TEST</span><h2>Sample text</h2></div>
                <span id="matchCount" class="status-pill" aria-live="polite">0 matches</span>
            </div>
            <label class="regex-field" for="sample">Text to test
                <textarea id="sample" class="regex-textarea" placeholder="Paste or type text to test…"></textarea>
            </label>
            <div id="output" class="match-output" aria-live="polite">Matches will be highlighted here.</div>
        </section>
    </div>
</main>
<script src="script.js?v=2"></script>
</body>
</html>
