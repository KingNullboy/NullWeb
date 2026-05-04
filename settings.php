<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$expire = time() + (86400 * 30);
	$path = "/";

	$defaults = [
		'bg-color' => '#000000',
		'text-color' => '#ffffff',
		'border-color' => '#ffffff',
		'font-family' => 'Lato',
		'ads' => 'true'
	];

	if (isset($_POST['reset'])) {
		foreach ($defaults as $key => $value) {
			setcookie($key, $value, $expire, $path);
		}
	} else {
		setcookie('bg-color', $_POST['bg-color'] ?? $defaults['bg-color'], $expire, $path);
		setcookie('text-color', $_POST['text-color'] ?? $defaults['text-color'], $expire, $path);
		setcookie('border-color', $_POST['border-color'] ?? $defaults['border-color'], $expire, $path);
		setcookie('font-family', $_POST['font-family'] ?? $defaults['font-family'], $expire, $path);
		setcookie('ads', $_POST['ads'] ?? $defaults['ads'], $expire, $path);
	}

	header("Location: settings.php");
	exit;
}

$bg     = $_COOKIE['bg-color'] ?? '#000000';
$text   = $_COOKIE['text-color'] ?? '#ffffff';
$border = $_COOKIE['border-color'] ?? '#ffffff';
$font   = $_COOKIE['font-family'] ?? 'Lato';
$ads    = $_COOKIE['ads'] ?? 'true';
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<?php $title = "NullWeb - Settings"; include "includes/meta.php"; ?>
	</head>
	<body>
		<div class="settings-wrapper">
			<h1>Settings</h1>

			<form method="POST">
				<div class="customizer-box">
					<label>Background Color:</label><br>
					<input type="color" name="bg-color" value="<?php echo htmlspecialchars($bg); ?>">
				</div>

				<div class="customizer-box">
					<label>Text Color:</label><br>
					<input type="color" name="text-color" value="<?php echo htmlspecialchars($text); ?>">
				</div>

				<div class="customizer-box">
					<label>Border Color:</label><br>
					<input type="color" name="border-color" value="<?php echo htmlspecialchars($border); ?>">
				</div>

				<div class="customizer-box">
					<label>Font Family:</label><br>
					<input type="text" name="font-family" class="textbox" value="<?php echo htmlspecialchars($font); ?>">
				</div>

				<div class="customizer-box">
					<label>Ads (true/false):</label><br>
					<input type="text" name="ads" class="textbox" value="<?php echo htmlspecialchars($ads); ?>">
				</div>

				<button class="botbtn" type="submit">Save Changes</button>
				<button class="botbtn" type="submit" name="reset" style="background:#900;">Reset Defaults</button>
			</form><br>

			<button class="botbtn" onclick="window.location.href='/';">Back Home</button>
		</div>
	</body>
</html>