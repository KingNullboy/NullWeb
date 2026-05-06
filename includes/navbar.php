<header>
	<a href="/">
		<img class="logo" src="<?= $navbarLogoRelPath ?? "" ?>logo.png" alt="logo" width="40px">
	</a>
		
	<h1 id="pagetitle"><?= $title ?? "NullWeb" ?></h1>

	<a class="headerbtn" style="margin-right: 20px;" href="<?= $navbarLogoRelPath ?? "./" ?>">Home</a>
				
	<?php
	if (file_exists("info.php")): 
	?>
		<a class="headerbtn" onclick="info.php">Information</a>
	<?php endif; ?>
</header>