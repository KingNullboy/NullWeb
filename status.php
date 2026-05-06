<?php
$uptime = trim(shell_exec('uptime'));
$temp = str_replace(['temp=', "'C\n"], '', trim(shell_exec('sudo /usr/bin/vcgencmd measure_temp')));
?>

<!DOCTYPE html>
<html>
	<head>
		<title>System Status</title>
		<?php include "includes/meta.php"; ?>
	</head>
	<body>
		<main class="main-wrapper">
			<h1><a href="./" style="color: inherit;">System Status</a></h1>
			<p>Uptime: <?= htmlspecialchars($uptime) ?></p>
			<p>CPU Temp: <?= htmlspecialchars($temp) ?></p>
		</main>
		
		<?php include "includes/footer.php"; ?>
	</body>
</html>