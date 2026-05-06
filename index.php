<?php
$ua = $_SERVER['HTTP_USER_AGENT'];
$title = "NullWeb"
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<?php include "includes/meta.php"; ?>
</head>
<body>
	<main class="main-wrapper">
		<h1>NullWeb</h1>

		<nav class="nav-grid">
			<a class="navbtn" href="socialmedia/">
				<img src="socialmedia/logo.png" width="40" alt=""><br>NullMedia
			</a>
			<a class="navbtn" href="wiki/">
				<img src="wiki/logo.png" width="40" alt=""><br>NullWiki
			</a>
			<a class="navbtn" href="links/">
				<img src="links/logo.png" width="40" alt=""><br>NullLinks
			</a>
			<a class="navbtn" href="gxmes/">
				<img src="gxmes/logo.png" width="40" alt=""><br>NullG*mes
			</a>
			<a class="navbtn" href="tools/">
				<img src="tools/logo.png" width="30" alt=""><br>NullTools
			</a>
		</nav>

		<section class="facts-container">
			<?php include "includes/facts.php"; ?>
		</section>
	</main>

	<?php include "includes/footer.php"; ?>
</body>
</html>