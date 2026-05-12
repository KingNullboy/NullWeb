<?php
$jsonData = file_get_contents("links.json");
$links = json_decode($jsonData, true);

// simple count of everything in the list
$linkCount = count($links);
?>

<!DOCTYPE HTML>
<html lang="en">
	<head>
		<?php $title = "Home - Links"; include $_SERVER['DOCUMENT_ROOT']."/includes/meta.php"; ?>
		<link href="https://fonts.googleapis.com/css2?family=Amaranth&display=swap" rel="stylesheet">

		<script>
			document.addEventListener("DOMContentLoaded", () => {
				const input = document.getElementById("searchInput");

				input.addEventListener("input", () => {
					const q = input.value.toLowerCase();
					const items = document.querySelectorAll(".game-item");

					items.forEach(el => {
						const text = el.innerText.toLowerCase();
						el.style.display = text.includes(q) ? "" : "none";
					});
				});
			});
		</script>
	</head>

	<body>

	<?php include $_SERVER['DOCUMENT_ROOT']."/includes/navbar.php"; ?>

	<main class="main-wrapper">

		<center>
			<br>

			<input type="text" id="searchInput"
				placeholder="Search for a g*me..."
				style="margin: 10px; padding: 5px; font-size: 16px;">

			<br><br>

			<p id="gamenum">
				There are <?php echo $linkCount; ?> links available.
			</p>

			<button id="randomGxmeBtn">Random G*me</button>

			<br><br>

			<div class="gxme-container">

				<?php foreach ($links as $item): ?>
					<a class="lnkgxmnavbtn game-item"
					href="<?php echo htmlspecialchars($item['url']); ?>">
						<?php echo htmlspecialchars($item["name"]); ?>
					</a>
				<?php endforeach; ?>

			</div>

			<br><br>

			<p><b>Yes, the search is still dumb. It’s part of the brand now.</b></p>

		</center>

	</main>

	<?php include $_SERVER['DOCUMENT_ROOT']."/includes/footer.php"; ?>

	</body>
</html>