<?php
// Handle form submission to update cookies
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $expire = time() + (86400 * 30); // 30 days
    $path = "/"; // Available across the whole site

    // If "Reset" was clicked
    if (isset($_POST['reset'])) {
        setcookie('bg-color', '#000000', $expire, $path);
        setcookie('text-color', '#ffffff', $expire, $path);
        setcookie('border-color', '#ffffff', $expire, $path);
        setcookie('font-family', 'Lato', $expire, $path);
        setcookie('click-sound-url', '/click.mp3', $expire, $path);
        setcookie('ads', 'true', $expire, $path);
    } else {
        setcookie('bg-color', $_POST['bg-color'], $expire, $path);
        setcookie('text-color', $_POST['text-color'], $expire, $path);
        setcookie('border-color', $_POST['border-color'], $expire, $path);
        setcookie('font-family', $_POST['font-family'], $expire, $path);
        setcookie('click-sound-url', $_POST['click-sound'], $expire, $path);
        setcookie('ads', $_POST['ads'], $expire, $path);
    }
    
    // Reload to apply changes
    header("Location: styles.php");
    exit;
}

// Get current values for the inputs
$bg     = $_COOKIE['bg-color']     ?? '#000000';
$text   = $_COOKIE['text-color']   ?? '#ffffff';
$border = $_COOKIE['border-color'] ?? '#ffffff';
$font   = $_COOKIE['font-family']   ?? 'Lato';
$sound  = $_COOKIE['click-sound-url'] ?? '/click.mp3';
$ads    = $_COOKIE['ads']           ?? 'true';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Theme Customizer - NullWeb</title>
    <link rel="stylesheet" href="/includes/stylemgr.php">
    <style>
        .customizer-box { margin-bottom: 20px; text-align: left; width: 300px; }
        .textbox { width: 100%; padding: 8px; border-radius: 10px; border: 1px solid var(--border-color); background: #333; color: white; }
        input[type="color"] { width: 50px; height: 30px; border: none; border-radius: 5px; cursor: pointer; }
    </style>
</head>
<body>
    <center>
        <h1><a href="index.php" style="text-decoration: none; color: var(--text-color);">Theme Customizer</a></h1>
        
        <form method="POST">
            <div class="customizer-box">
                <label>Background Color:</label><br>
                <input type="color" name="bg-color" value="<?php echo $bg; ?>">
            </div>

            <div class="customizer-box">
                <label>Text Color:</label><br>
                <input type="color" name="text-color" value="<?php echo $text; ?>">
            </div>

            <div class="customizer-box">
                <label>Border Color:</label><br>
                <input type="color" name="border-color" value="<?php echo $border; ?>">
            </div>

            <div class="customizer-box">
                <label>Font Family:</label><br>
                <input type="text" name="font-family" class="textbox" value="<?php echo htmlspecialchars($font); ?>">
            </div>

            <div class="customizer-box">
                <label>Click Sound URL:</label><br>
                <input type="text" name="click-sound" class="textbox" value="<?php echo htmlspecialchars($sound); ?>">
            </div>

            <div class="customizer-box">
                <label>Ads (true/false):</label><br>
                <input type="text" name="ads" class="textbox" value="<?php echo htmlspecialchars($ads); ?>">
            </div>

            <button type="submit">Save Changes</button>
            <button type="submit" name="reset" style="background: #900;">Reset Defaults</button>
        </form>
        
        <br>
        <button onclick="window.location.href='index.php';">Back Home</button>
    </center>

    <script>
        // Global click sound handler (since styles.js is gone)
        document.addEventListener('click', function() {
            const audio = new Audio('<?php echo $sound; ?>');
            audio.play().catch(() => {}); // Catch block prevents errors if sound is blocked
        });
    </script>
</body>
</html>