<?php
$expire = time() + (86400 * 30);
$path   = "/";

$defaults = [
    'bg-color'    => '#000000',
    'text-color'  => '#ffffff',
    'border-color'=> '#ffffff',
    'font-family' => 'Lato',
    'font-url'    => '',
    'ads'         => 'true',
    'fortunetype' => 'nullweb'
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['reset'])) {
        foreach ($defaults as $key => $value) {
            setcookie($key, $value, $expire, $path);
        }
    } else {
        setcookie('bg-color', $_POST['bg-color'] ?? $defaults['bg-color'], $expire, $path);
        setcookie('text-color', $_POST['text-color'] ?? $defaults['text-color'], $expire, $path);
        setcookie('border-color', $_POST['border-color'] ?? $defaults['border-color'], $expire, $path);
        setcookie('font-family', trim($_POST['font-family'] ?? $defaults['font-family']), $expire, $path);
        setcookie('font-url', trim($_POST['font-url'] ?? $defaults['font-url']), $expire, $path);

        // Sanitize selection inputs
        $ads_val = (strtolower(trim($_POST['ads'] ?? '')) === 'false') ? 'false' : 'true';
        $fortune_val = (strtolower(trim($_POST['fortunetype'] ?? '')) === 'fortune') ? 'fortune' : 'nullweb';

        setcookie('ads', $ads_val, $expire, $path);
        setcookie('fortunetype', $fortune_val, $expire, $path);
    }

    header("Location: settings.php");
    exit;
}

// Read current active values from cookies, falling back to defaults
$bg          = $_COOKIE['bg-color']    ?? $defaults['bg-color'];
$text        = $_COOKIE['text-color']  ?? $defaults['text-color'];
$border      = $_COOKIE['border-color']?? $defaults['border-color'];
$font        = $_COOKIE['font-family'] ?? $defaults['font-family'];
$font_url    = $_COOKIE['font-url']    ?? $defaults['font-url'];
$ads         = $_COOKIE['ads']         ?? $defaults['ads'];
$fortunetype = $_COOKIE['fortunetype'] ?? $defaults['fortunetype'];
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
                <input type="color" name="bg-color" value="<?php echo htmlspecialchars($bg, ENT_QUOTES, 'UTF-8'); ?>">
            </div>

            <div class="customizer-box">
                <label>Text Color:</label><br>
                <input type="color" name="text-color" value="<?php echo htmlspecialchars($text, ENT_QUOTES, 'UTF-8'); ?>">
            </div>

            <div class="customizer-box">
                <label>Border Color:</label><br>
                <input type="color" name="border-color" value="<?php echo htmlspecialchars($border, ENT_QUOTES, 'UTF-8'); ?>">
            </div>

            <div class="customizer-box">
                <label>Font Family:</label><br>
                <input type="text" name="font-family" class="textbox" value="<?php echo htmlspecialchars($font, ENT_QUOTES, 'UTF-8'); ?>">
            </div>

            <div class="customizer-box">
                <label>Font URL (Google Fonts or .woff2/.ttf):</label><br>
                <input type="text" name="font-url" class="textbox" value="<?php echo htmlspecialchars($font_url, ENT_QUOTES, 'UTF-8'); ?>" placeholder="https://fonts.googleapis.com/... or .woff2 link">
            </div>

            <div class="customizer-box">
                <label>Ads:</label><br>
                <select name="ads" class="textbox">
                    <option value="true" <?php echo ($ads === 'true') ? 'selected' : ''; ?>>Enabled</option>
                    <option value="false" <?php echo ($ads === 'false') ? 'selected' : ''; ?>>Disabled</option>
                </select>
            </div>

            <div class="customizer-box">
                <label>Fortune Type:</label><br>
                <select name="fortunetype" class="textbox">
                    <option value="fortune" <?php echo ($fortunetype === 'fortune') ? 'selected' : ''; ?>>Standard Fortune</option>
                    <option value="nullweb" <?php echo ($fortunetype === 'nullweb') ? 'selected' : ''; ?>>NullWeb Fortune</option>
                </select>
            </div>

            <button class="botbtn" type="submit">Save Changes</button>
            <button class="botbtn" type="submit" name="reset" style="background:#900;">Reset Defaults</button>
        </form><br>

        <button class="botbtn" onclick="window.location.href='/';">Back Home</button>
    </div>

    <?php include "includes/footer.php"; ?>
</body>
</html>
