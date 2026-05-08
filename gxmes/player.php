<?php
$ua = $_SERVER['HTTP_USER_AGENT'];

$which = $_GET['which'] ?? '';
$name = $_GET['name'] ?? 'Unknown G*me';

$title = $name . " - NullG*mes Player";
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<?php include $_SERVER['DOCUMENT_ROOT']."/includes/meta.php"; ?>

		<script>
			window.GAME_DATA = {
				which: <?= json_encode($which) ?>,
				name: <?= json_encode($name) ?>
			};
		</script>

		<script src="player.js" defer></script>
		<script src="https://unpkg.com/@ruffle-rs/ruffle"></script>
	</head>

	<body>
		<?php include $_SERVER['DOCUMENT_ROOT']."/includes/navbar.php"; ?>

		<main class="main-wrapper">
			<center>
				<br>

				<h2 id="gameTitle">
					<?= htmlspecialchars($name) ?>
				</h2>

				<br>

				<div id="playerContainer"></div>

				<br><br>

				<button id="fullscreenBtn" class="lnkgxmbtn">Fullscreen</button>
				<button id="saveButton" style="display:none;">Save</button>

				<br><br>
			</center>
		</main>

		<?php include $_SERVER['DOCUMENT_ROOT']."/includes/footer.php"; ?>
	</body>
</html>