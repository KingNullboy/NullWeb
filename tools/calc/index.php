<?php
$title = "NullCalc";
$navbarLogoRelPath = "../";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/meta.php"; ?>
</head>
<body>
<main class="calc-shell">
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/navbar.php"; ?>
    <nav class="tool-tabs" aria-label="Calculator tools" role="tablist">
        <button class="tool-tab active" type="button" role="tab" aria-selected="true" data-tab="calculator"><span>01</span> Calculator</button><button class="tool-tab" type="button" role="tab" aria-selected="false" data-tab="graph"><span>02</span> Graph</button><button class="tool-tab" type="button" role="tab" aria-selected="false" data-tab="convert"><span>03</span> Convert</button><button class="tool-tab" type="button" role="tab" aria-selected="false" data-tab="matrix"><span>04</span> Matrix</button><button class="tool-tab" type="button" role="tab" aria-selected="false" data-tab="stats"><span>05</span> Stats</button>
    </nav>
    <div class="workspace">
        <section class="panel tab-panel active" id="calculator" role="tabpanel"><div class="panel-heading"><div><p class="kicker">BASIC + SCIENTIFIC</p><h2>Calculator</h2></div><span class="status-dot">Ready</span></div><div class="calculator-layout"><div class="display-card" aria-live="polite"><div class="display-meta"><span id="calc-memory">M: 0</span><span id="calc-angle">DEG</span></div><div id="calc-expression">0</div><div id="calc-result">Ready when you are</div></div><div class="keypad" id="calc-buttons"></div></div><p class="hint">Tip: use your keyboard. <kbd>Enter</kbd> evaluates, <kbd>Esc</kbd> clears, and <kbd>↑</kbd>/<kbd>↓</kbd> browse history.</p></section>
        <section class="panel tab-panel" id="graph" role="tabpanel" hidden><div class="panel-heading"><div><p class="kicker">VISUAL EXPLORATION</p><h2>Graph a function</h2></div><span class="status-dot">Live plot</span></div><div class="graph-controls"><label>Function<input id="graph-func" value="sin(x)" spellcheck="false"></label><label>Window<select id="graph-window"><option value="10">−10 to 10</option><option value="20">−20 to 20</option><option value="5">−5 to 5</option></select></label></div><div class="graph-wrap"><canvas id="graph-canvas" width="900" height="430" aria-label="Function graph"></canvas></div><p class="hint">Try <code>x^2 / 4</code>, <code>sin(x) * 2</code>, or <code>sqrt(abs(x))</code>.</p></section>
        <section class="panel tab-panel" id="convert" role="tabpanel" hidden><div class="panel-heading"><div><p class="kicker">NUMBER SYSTEMS</p><h2>Base converter</h2></div><span class="status-dot">Synced</span></div><div class="conversion-grid"><label>Decimal<input data-base="10" id="base-dec" inputmode="numeric" value="255"></label><label>Binary<input data-base="2" id="base-bin" value="11111111"></label><label>Octal<input data-base="8" id="base-oct" value="377"></label><label>Hexadecimal<input data-base="16" id="base-hex" value="FF"></label></div><div class="callout"><span>↔</span><p>Edit any field to convert it across all four number systems.</p></div></section>
        <section class="panel tab-panel" id="matrix" role="tabpanel" hidden><div class="panel-heading"><div><p class="kicker">LINEAR ALGEBRA</p><h2>Matrix lab</h2></div><span class="status-dot">2 × 2 / 3 × 3</span></div><div class="matrix-layout"><label>Matrix A<textarea id="matrix-a" spellcheck="false">1, 2
3, 4</textarea></label><label>Matrix B<textarea id="matrix-b" spellcheck="false">5, 6
7, 8</textarea></label></div><div class="action-row"><button class="action-btn active" data-matrix-action="add" type="button">A + B</button><button class="action-btn" data-matrix-action="multiply" type="button">A × B</button><button class="action-btn" data-matrix-action="determinant" type="button">det(A)</button></div><pre class="result-box" id="matrix-output">Choose an operation to begin.</pre></section>
        <section class="panel tab-panel" id="stats" role="tabpanel" hidden><div class="panel-heading"><div><p class="kicker">DESCRIPTIVE DATA</p><h2>Statistics</h2></div><span class="status-dot">Instant readout</span></div><label>Dataset<textarea id="stats-input" spellcheck="false">12, 18, 21, 24, 25, 29, 34</textarea></label><div class="stats-actions"><button class="action-btn active" data-stat="summary" type="button">Summary</button><button class="action-btn" data-stat="spread" type="button">Spread</button></div><div class="stats-grid" id="stats-output"></div></section>
    </div>
    <footer class="calc-footer"><span>NULLCALC <b>v2.0</b></span><span>Runs locally in your browser · No data leaves this page</span></footer>
</main>
<script src="script.js"></script>
</body>
</html>
