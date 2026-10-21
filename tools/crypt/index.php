<?php
$title = "NullCrypt – NullWeb";
$navbarLogoRelPath = "../../";
?>
<!DOCTYPE html>
<html lang="en">
<head><?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/meta.php"; ?></head>
<body>
<main class="crypt-shell">
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/navbar.php"; ?>
    <header class="crypt-hero"><div><p class="eyebrow">LOCAL TOOL / TRANSFORM</p><h1>Build a text pipeline.</h1><p class="intro-copy">Chain encoders, formatters, and classic ciphers together, then run the whole recipe in one click.</p></div><div class="crypt-mark" aria-hidden="true">{ }</div></header>
    <div class="crypt-workspace">
        <section class="crypt-main"><div class="panel-heading"><div><span class="section-label">01 / INPUT</span><h2>Start with text</h2></div><span class="status-pill">Runs locally</span></div><textarea id="inputText" class="crypt-textarea" placeholder="Type or paste text here…">Hello, NullWeb!</textarea><div class="pipeline-heading"><div><span class="section-label">02 / PIPELINE</span><h2>Your steps</h2></div><button id="clearSteps" class="quiet-button" type="button">Clear steps</button></div><div id="pipeline" class="pipeline"><div class="pipeline-empty">Add a step from the library to begin.</div></div><div class="run-row"><button id="runPipeline" class="primary-button" type="button">Run pipeline <b>→</b></button><span id="stepSummary" class="step-summary">0 steps</span></div><div class="panel-heading output-heading"><div><span class="section-label">03 / OUTPUT</span><h2>Result</h2></div><span id="outputStatus" class="status-pill">Waiting</span></div><textarea id="outputText" class="crypt-textarea output-text" readonly placeholder="Your transformed text will appear here…"></textarea><div class="output-actions"><button id="copyOutput" class="secondary-button" type="button">Copy output</button><button id="downloadOutput" class="secondary-button" type="button">Download .txt</button></div><p id="cryptError" class="form-error" role="alert" hidden></p></section>
        <aside class="crypt-library"><div class="panel-heading"><div><span class="section-label">LIBRARY</span><h2>Add a step</h2></div></div><label class="crypt-field" for="stepType">Transformation<select id="stepType"><option value="reverse">Reverse text</option><option value="replace">Find and replace</option><option value="case">Change case</option><option value="binary">Binary</option><option value="hex">Hexadecimal</option><option value="decimal">Decimal code points</option><option value="base64">Base64</option><option value="base32">Base32</option><option value="url">URL encoding</option><option value="unicode">Unicode code points</option><option value="rot13">ROT13</option><option value="caesar">Caesar shift</option><option value="vigenere">Vigenère</option><option value="a1z26">A1Z26</option><option value="bacon">Bacon</option></select></label><div id="stepOptions" class="step-options"></div><button id="addStep" class="primary-button add-step" type="button">Add to pipeline <b>+</b></button><div class="library-note"><strong>How it works</strong><p>Steps run top to bottom. Add decoding steps after an encoder when you need to reverse a format.</p></div></aside>
    </div>
</main>
<script src="script.js?v=1"></script>
</body>
</html>
