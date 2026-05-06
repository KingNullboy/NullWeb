<?php
// Load the JSON data
$jsonData = file_get_contents("tools.json");
$toolsList = json_decode($jsonData, true);

// Get the count for the display message
$toolsCount = count($toolsList);
?>

<!DOCTYPE HTML> 
<html>
	<head>
		<?php $title = "NullTools"; include $_SERVER['DOCUMENT_ROOT']."/includes/meta.php"; ?>
	</head>
	<body>
		<main class="main-wrapper">
			<?php include $_SERVER['DOCUMENT_ROOT']."/includes/navbar.php"; ?>

			<p>There are <?= $toolsCount ?> tools right now!</p>

            <div class="tools-container">
                <?php foreach ($toolsList as $tool): ?>
                    <a class="lnkgxmbtn" href="<?php echo htmlspecialchars($tool['path']); ?>"><?php echo htmlspecialchars($tool['name']); ?></a>
                <?php endforeach; ?>
            </div>
		</main>
	</body>
</html>