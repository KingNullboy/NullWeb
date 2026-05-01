<?php
/**
 * NullWeb Style Manager
 * Replaces styles.css and styles.js logic
 */

// Tell the browser this is a CSS file
ob_start();
header("Content-type: text/css; charset=utf-8");

// 1. Fetch preferences from Cookies (or use defaults)
// We use the null coalescing operator (??) to provide fallbacks
$bg     = $_COOKIE['bg-color']     ?? '#000000';
$text   = $_COOKIE['text-color']   ?? '#ffffff';
$border = $_COOKIE['border-color'] ?? '#ffffff';
$font   = $_COOKIE['font-family']   ?? 'Lato';
$ads    = $_COOKIE['ads']           ?? 'true';

// Sanitize the font family to prevent CSS injection
$font_sanitized = htmlspecialchars($font, ENT_QUOTES);
?>

/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

/* Define CSS custom properties based on PHP/Cookie variables */
:root {
    --bg-color: <?php echo $bg; ?>;
    --text-color: <?php echo $text; ?>;
    --border-color: <?php echo $border; ?>;
    --font-family: '<?php echo $font_sanitized; ?>', sans-serif;
}

/* Base Elements */
body {
    background-color: var(--bg-color);
    font-family: var(--font-family);
    color: var(--text-color);
    margin: 0;
    padding: 0;
}

h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-family);
    color: var(--text-color);
}

/* Button Styling */
button {
    background-color: var(--bg-color);
    font-family: var(--font-family);
    color: var(--text-color);
    padding: 10px;
    border: 2px solid var(--border-color);
    font-size: 20px;
    border-radius: 20px;
    transition: color 0.3s ease, background-color 0.3s ease;
}

button:hover {
    cursor: pointer;
    background-color: var(--text-color);
    color: var(--bg-color);
}

/* Navigation Specifics */
.navbtn {
    height: 91px;
    vertical-align: middle;
}

.botbtn {
    border-radius: 15px;
    padding: 5px 10px;
    font-size: 14px;
}

/* Header & Containers */
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10%;
    background: var(--bg-color);
    border-radius: 100px;
    border: 10px solid var(--border-color);
}

.textbox {
    background-color: #363636;
    border-radius: 10px;
    color: #FFFFFF;
    border: 1px solid var(--border-color);
    padding: 5px;
}

/* Search UI */
.searchContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

#searchBar {
    padding: 10px;
    font-size: 16px;
    border-radius: 20px 0 0 20px;
    border: 2px solid var(--border-color);
    background-color: var(--bg-color);
    color: var(--text-color);
    width: 500px;
    border-right: 0;
}

#searchButton {
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 0 20px 20px 0;
    border: 2px solid var(--border-color);
    background-color: var(--bg-color);
    color: var(--text-color);
    cursor: pointer;
    border-left: 0;
}

/* Ads Logic: Hide/Show based on user preference */
.ad-section, .ad-container {
    display: <?php echo ($ads === 'false') ? 'none' : 'block'; ?>;
}

/* Mobile Responsiveness (Ported from styles.css) */
@media (max-width: 1080px) and (pointer: coarse) {
    h1 { font-size: 24px; margin: 15px 0; }

    .navbtn {
        width: 100%;
        margin: 5px 0;
        font-size: 16px;
        padding: 8px 0;
    }

    .botbtn {
        font-size: 14px;
        width: 90%;
    }

    #searchBar { width: 80%; }
}