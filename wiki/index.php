<?php
$jsonData = file_get_contents("wiki.json");
$wikiList = json_decode($jsonData, true);
?>

<!DOCTYPE HTML>
<html>
	<head>
		<?php $title = "NullWiki"; include $_SERVER['DOCUMENT_ROOT']."/includes/meta.php"; ?>
	</head>
	<body>
		<?php include $_SERVER['DOCUMENT_ROOT']."/includes/navbar.php"; ?>
		<main class="main-wrapper">
			<div class="wiki-container">
                <?php foreach ($wikiList as $index => $wiki): ?>
                    <a class="lnkgxmbtn" href="num<?php echo htmlspecialchars($index+1); ?>"><?php echo htmlspecialchars($wiki); ?></a>
                <?php endforeach; ?>
            </div>
		</main>

		<?php include "includes/footer.php"; ?>
	</body>
</html>