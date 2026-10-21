<?php
$title = "NullCrypto – NullWeb";
$navbarLogoRelPath = "../../";
?>
<!DOCTYPE html>
<html lang="en">
<head><?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/meta.php"; ?></head>
<body>
<main class="crypto-shell">
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/navbar.php"; ?>
    <header class="crypto-hero"><div><p class="eyebrow">LOCAL TOOL / PAPER TRADING</p><h1>Practice a portfolio.</h1><p class="intro-copy">Explore a simulated crypto portfolio with live reference prices. No real trades, accounts, or money involved.</p></div><div class="crypto-mark" aria-hidden="true">$</div></header>
    <div class="crypto-summary"><div><span class="section-label">PORTFOLIO VALUE</span><strong id="totalValue">$10,000.00</strong><small id="marketStatus">Loading market data…</small></div><div><span class="section-label">AVAILABLE CASH</span><strong id="cashValue">$10,000.00</strong></div><button id="resetPortfolio" class="quiet-button" type="button">Reset portfolio</button></div>
    <section class="crypto-layout"><div class="market-panel"><div class="panel-heading"><div><span class="section-label">01 / MARKET</span><h2>Assets</h2></div><button id="refreshPrices" class="quiet-button" type="button">Refresh prices</button></div><div id="dashboard" class="coin-grid"><div class="market-empty">Loading prices…</div></div></div><aside class="portfolio-panel"><div class="panel-heading"><div><span class="section-label">02 / HOLDINGS</span><h2>Your portfolio</h2></div></div><div id="holdings" class="holdings"></div><canvas id="portfolioChart" width="700" height="220"></canvas></aside></section>
    <p class="crypto-note">Prices come from CoinGecko when available. NullCoin is a fictional practice asset.</p>
</main>
<script src="script.js?v=1"></script>
</body>
</html>
