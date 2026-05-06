<!DOCTYPE HTML>
<html>
	<head>
		<?php $title = "Installing Snake/Pong Games - NullWiki"; include $_SERVER['DOCUMENT_ROOT']."/includes/meta.php"; ?>
	</head>
	<body>
		<?php $navbarLogoRelPath = "../"; include $_SERVER['DOCUMENT_ROOT']."/includes/navbar.php"; ?>

		<main class="main-wrapper">
			<div class="wiki-container">

				<h1>Installing Snake Game</h1>

				<p>
					This guide shows how to install Snake or Pong games manually using a .deb package.
					Because nothing says “fun” like terminal commands and dependency errors.
				</p>

				<h2>Quick Install (No Repo Needed)</h2>
				<p>
					Run the following commands in your terminal:
				</p>

				<pre><code>
curl -O https://www.null-web.vastserve.com/repo/pool/main/snake.deb
sudo dpkg -i snake.deb
sudo apt-get install -f
				</code></pre>

				<p>
					You can replace <code>snake</code> with <code>pong</code> to install Pong instead.
					Even better, use <code>nullgames-linux</code> to install both at once.
					Because apparently convenience still has conditions.
				</p>

				<h2>Troubleshooting</h2>
				<ul>
					<li>Make sure you actually have internet access before blaming the universe</li>
					<li>If <code>dpkg</code> complains, run <code>sudo apt-get install -f</code> to fix missing dependencies</li>
					<li>You can delete the <code>.deb</code> file after installation to save space</li>
					<li>
						Contact support via
						<a href="https://www.null-web.vastserve.com/contact" target="_blank" rel="noopener noreferrer">
							contact page
						</a>
					</li>
				</ul>

				<h2>Uninstalling Snake Game</h2>
				<p>
					If you decide to remove the game for reasons that defy basic human enjoyment:
				</p>

				<pre><code>
sudo apt remove snake
				</code></pre>

				<p>
					Replace <code>snake</code> with <code>pong</code> to remove Pong,
					or <code>nullgames-linux</code> if you installed the bundled version.
				</p>

			</div>
		</main>
	</body>
</html>