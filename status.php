<?php
$uptime = trim(shell_exec('uptime'));
$temp = str_replace(['temp=', "'C\n"], '', trim(shell_exec('sudo /usr/bin/vcgencmd measure_temp')));
?>

<!DOCTYPE html>
<html>
	<head>
		<title>System Status</title>
		<link rel="stylesheet" href="styles.css">
	</head>
	<body>
		<center>
			<h1><a href="./" style="color: inherit;">System Status</a></h1>
			<p>Uptime: <?= htmlspecialchars($uptime) ?></p>
			<p>CPU Temp: <?= htmlspecialchars($temp) ?></p>
		</center>
	</body>
</html>
<!-- I solemnly swear I am not going to use status.php for everything -->
