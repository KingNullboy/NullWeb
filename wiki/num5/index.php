<!DOCTYPE HTML>
<html>
	<head>
		<?php $title = "KingNullboy's 2025 Christmas List - NullWiki"; include $_SERVER['DOCUMENT_ROOT']."/includes/meta.php"; ?>
		<style>
			.wish-grid button {
				display: block;
				margin: 6px 0;
			}
		</style>
	</head>

	<body>
		<?php $navbarLogoRelPath = "../"; include $_SERVER['DOCUMENT_ROOT']."/includes/navbar.php"; ?>

		<main class="main-wrapper">
			<div class="wiki-container">

				<h1>KingNullboy's 2025 Christmas List</h1>

				<p>
					A highly optimized collection of desired items, mostly games and hardware,
					organized in no particular financial reality.
				</p>

				<div class="wish-grid">

					<button onclick="rd('https://www.amazon.com/hz/wishlist/ls/23B1TEM8Y4V4J')">
						My Amazon Wishlist
					</button>

					<button onclick="rd('https://store.steampowered.com/sub/736589/')">
						Cuphead & The Delicious Last Course
					</button>

					<button onclick="rd('https://store.steampowered.com/app/4000/Garrys_Mod/')">
						Garry's Mod
					</button>

					<button onclick="rd('https://store.steampowered.com/app/361420/ASTRONEER/')">
						ASTRONEER
					</button>

					<button onclick="rd('https://store.steampowered.com/bundle/45751/Planet_Crafter_The_Galactic_Terraformer_Edition/')">
						Planet Crafter
					</button>

					<button onclick="rd('https://store.steampowered.com/app/367520/Hollow_Knight/')">
						Hollow Knight
					</button>

					<button onclick="rd('https://store.steampowered.com/app/504230/Celeste/')">
						Celeste
					</button>
				</div>
			</div>
		</main>

		<?php include "includes/footer.php"; ?>
	</body>
</html>
