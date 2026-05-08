<?php
$ua = $_SERVER['HTTP_USER_AGENT'];
$title = "NullG*mes";
$json = json_decode(file_get_contents("gxmes.json"), true);
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<?php include $_SERVER['DOCUMENT_ROOT']."/includes/meta.php"; ?>

		<link href="https://fonts.googleapis.com/css2?family=Amaranth&display=swap" rel="stylesheet">

		<script src="search.js"></script>

		<script>
			document.addEventListener('DOMContentLoaded', function () {
				document.getElementById('randomGxmeBtn').addEventListener('click', function () {
					const buttons = Array.from(document.querySelectorAll('button[data-game]'));
					const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
					if (randomButton) randomButton.click();
				});
			});
		</script>
	</head>

	<body>
		<?php include $_SERVER['DOCUMENT_ROOT']."/includes/navbar.php" ?>

		<main class="main-wrapper">
				<br>
				<input type="text" id="searchInput" placeholder="Search for a g*me..."
					style="margin: 10px; padding: 5px; font-size: 16px;">
				<br><br>

				<p>
					This is a quick website made using <a href="https://ruffle.rs">Ruffle</a> and GitHub.
					If you want the original repo to download the g*mes, go to the
					<a href="https://github.com/selenite-cc/flasharchive/">GitHub repo</a>.
				</p>

				<p id="gamenum">There are [Loading...] g*mes of varying quality!</p>

				<button class="lnkgxmbtn" id="randomGxmeBtn">Random G*me</button>

				<br><br>

				<?php foreach ($json["sections"] as $section): ?>
					<h2><?= htmlspecialchars($section["title"]) ?></h2>

					<?php foreach ($section["items"] as $game): ?>
						<a
							data-game="1"
							class="lnkgxmbtn"
							href="player.php?which=<?= htmlspecialchars($game["onclick"]) ?>&name=<?= urlencode($game["name"]) ?>">
							<?= htmlspecialchars($game["text"]) ?>
						</a>
					<?php endforeach; ?>

					<br><br>
				<?php endforeach; ?>

				<br><br>

				<p>
					<b>
						Unfortunately, it is hard to find new g*mes to add and will take a while.
						In the meantime, this is what you get.
					</b>
				</p>
		</main>

		<?php include "includes/footer.php"; ?>
	</body>
</html>