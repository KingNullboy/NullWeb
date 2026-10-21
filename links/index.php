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
		<script>
			document.addEventListener("DOMContentLoaded", () => {
				const input = document.getElementById("searchInput");
				const randomButton = document.getElementById("randomLinkBtn");
				const count = document.getElementById("gamenum");
				const noResults = document.getElementById("noResults");
				const items = Array.from(document.querySelectorAll(".game-item"));

				const normalize = value => value
					.toLocaleLowerCase()
					.normalize("NFD")
					.replace(/[\u0300-\u036f]/g, "");

				const updateResults = () => {
					const query = normalize(input.value.trim());
					let visibleItems = [];

					items.forEach(item => {
						const matches = normalize(item.textContent).includes(query)
							|| normalize(item.href).includes(query);
						item.hidden = !matches;
						if (matches) visibleItems.push(item);
					});

					count.textContent = query
						? `Showing ${visibleItems.length} of ${items.length} links.`
						: `There are ${items.length} links available.`;
					noResults.hidden = visibleItems.length !== 0;
				};

				input.addEventListener("input", updateResults);
				randomButton.addEventListener("click", () => {
					const visibleItems = items.filter(item => !item.hidden);
					if (visibleItems.length) {
						window.location.href = visibleItems[Math.floor(Math.random() * visibleItems.length)].href;
					}
				});
			});
		</script>
	</head>

	<body>

	<?php include $_SERVER['DOCUMENT_ROOT']."/includes/navbar.php"; ?>

	<main class="main-wrapper">

		<div class="links-content">
			<input type="text" id="searchInput" placeholder="Search for a link..." autocomplete="off">

			<br><br>

			<p id="gamenum">
				There are <?php echo $linkCount; ?> links available.
			</p>

			<button class="lnkgxmbtn" id="randomLinkBtn" type="button">Random Link</button>

			<br><br>

			<div class="nav-grid">

				<?php foreach ($links as $item): ?>
					<a class="lnkgxmbtn game-item"
					href="<?php echo htmlspecialchars($item['url'], ENT_QUOTES, 'UTF-8'); ?>">
						<?php echo htmlspecialchars($item["name"], ENT_QUOTES, 'UTF-8'); ?>
					</a>
				<?php endforeach; ?>

			</div>

			<p id="noResults" hidden>No links match your search.</p>

			<br><br>

			<p><b>Search by link name or URL.</b></p>

		</div>

	</main>

	<?php include $_SERVER['DOCUMENT_ROOT']."/includes/footer.php"; ?>

	</body>
</html>
