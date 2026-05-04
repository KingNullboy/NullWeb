<!DOCTYPE html>
<html lang="en">
	<head>
		<?php include "includes/meta.php"; ?>
		<link rel="stylesheet" href="stylemgr.php">
	</head>
	<body>
		<main class="main-wrapper">
			<header>
				<h1 id="pagetitle">Contact NullWeb</h1>
			</header>

			<section class="facts-container" style="text-align: left; max-width: 600px; margin: 20px auto; padding: 20px; border: 2px solid <?= $border ?>; border-radius: 20px;">
				<h2>Get in Touch</h2>
				<p> Got questions, feedback, or bugs to report? Shoot me an email at: </p>
			
				<p style="margin: 15px 0; text-align: center;">
					<a href="mailto:kingnullboy@proton.me" style="color: <?= $text ?>; font-weight: 700; font-size: 1.2rem; text-decoration: underline;">
						kingnullboy@proton.me
					</a>
				</p>
			
				<p>I usually reply pretty fast, so don't be shy!</p>
			</section>

			<a href="/" class="botbtn" style="margin-top: 20px; display: inline-block;">&larr; Back Home</a>
		</main>

		<?php include "includes/footer.php"; ?>
	</body>
</html>