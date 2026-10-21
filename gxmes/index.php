<?php
$title = "NullG*mes";
$json = json_decode(file_get_contents("gxmes.json"), true);
$gameCount = 0;
foreach (($json['sections'] ?? []) as $section) {
	$gameCount += count($section['items'] ?? []);
}
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<?php include $_SERVER['DOCUMENT_ROOT']."/includes/meta.php"; ?>

		<script src="/gxmes/search.js?v=5" defer></script>
	</head>

	<body>
		<?php include $_SERVER['DOCUMENT_ROOT']."/includes/navbar.php" ?>

		<main class="main-wrapper">
				<input type="text" id="searchInput" placeholder="Search for a g*me..." autocomplete="off">
				<br><br>

				<p>
					This is a quick website made using <a href="https://ruffle.rs">Ruffle</a> and GitHub.
					If you want the original repo to download the g*mes, go to the
					<a href="https://github.com/selenite-cc/flasharchive/">GitHub repo</a>.
				</p>

				<p id="gamenum" aria-live="polite">There are <?= $gameCount ?> g*mes of varying quality!</p>

				<button class="lnkgxmbtn" id="randomGxmeBtn" type="button">Random G*me</button>

				<br><br>

				<div id="noResults" hidden>No g*mes match your search.</div>

				<?php foreach (($json['sections'] ?? []) as $section): ?>
					<section class="game-section">
						<h2 class="game-section-title"><?= htmlspecialchars($section["title"], ENT_QUOTES, 'UTF-8') ?></h2>
						<div class="nav-grid">

						<?php foreach (($section['items'] ?? []) as $game): ?>
							<a
								data-game="1"
								data-search="<?= htmlspecialchars($game["onclick"], ENT_QUOTES, 'UTF-8') ?>"
								class="lnkgxmbtn game-item"
								href="player.php?which=<?= htmlspecialchars($game["onclick"], ENT_QUOTES, 'UTF-8') ?>&amp;name=<?= urlencode($game["name"]) ?>">
								<?= htmlspecialchars($game["text"], ENT_QUOTES, 'UTF-8') ?>
							</a>
						<?php endforeach; ?>
						</div>
					</section>

				<?php endforeach; ?>

				<br><br>

				<p>
					<b>
						Unfortunately, it is hard to find new g*mes to add and will take a while.
						In the meantime, this is what you get.
					</b>
				</p>
		</main>

		<?php include $_SERVER['DOCUMENT_ROOT']."/includes/footer.php"; ?>
	</body>
</html>
