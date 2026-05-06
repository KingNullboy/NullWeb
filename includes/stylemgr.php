<?php
header("Content-Type: text/css; charset=utf-8");

// Defaults (because users will absolutely break things otherwise)
$bg     = $_COOKIE['bg-color']     ?? '#000000';
$text   = $_COOKIE['text-color']   ?? '#ffffff';
$border = $_COOKIE['border-color'] ?? '#ffffff';
$font   = $_COOKIE['font-family']  ?? 'Lato';
$ads    = $_COOKIE['ads']          ?? 'true';

// Basic sanitizing so someone doesn't inject chaos
$font_safe = preg_replace('/[^a-zA-Z0-9\s\-]/', '', $font);

$isMobile = preg_match('/Mobile|Android|iPhone|iPod|iPad/i', $_SERVER['HTTP_USER_AGENT'] ?? '');
$isIOS = preg_match('/iPhone|iPad|iPod/i', $_SERVER['HTTP_USER_AGENT'] ?? '');
?>

@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');

/* Reset */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

/* Base layout */
body {
    min-height: 100vh;
    background: <?= $bg ?>;
    color: <?= $text ?>;
    font-family: <?= $font ?>;
}

.main-wrapper {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
}

/* Navigation */
.nav-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    margin: 20px 0;
}

.navbtn {
    background: <?= $bg ?>;
    color: <?= $text ?>;
    border: 2px solid <?= $border ?>;
    border-radius: 20px;
    padding: 15px;
    min-width: 130px;
    font-size: 18px;
    cursor: pointer;
    transition: background 0.25s, color 0.25s;
    text-decoration: none;
}

.navbtn img {
    display: block;
    margin: 0 auto 8px;
}

.navbtn:hover {
    background: <?= $text ?>;
    color: <?= $bg ?>;
}

/* Footer */
.site-footer {
    margin-top: 40px;
    border-top: 3px solid <?= $border ?>;
    padding: 25px 0;
    width: 100%;
}

.footer-buttons {
    border: none;
    text-align: center;
}

.botbtn {
    background: <?= $bg ?>;
    color: <?= $text ?>;
    border: 2px solid <?= $border ?>;
    border-radius: 15px;
    padding: 5px 15px;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.25s, color 0.25s;
    text-decoration: none;
    display: inline-block;
    margin: 5px 5px;
}

.botbtn:hover {
    background: <?= $text ?>;
    color: <?= $bg ?>;
}

html, body {
    margin: 0;
	padding: 0;
}

.donate-container {
    max-width: 900px;
    margin: 30px auto;
    padding: 20px;
    border: 2px solid <?= $border ?>;
    border-radius: 20px;
    text-align: center;
}

.donate-links a {
    display: inline-block;
    margin: 10px;
    padding: 10px 15px;
    border-radius: 10px;
    text-decoration: none;
    font-weight: bold;
    color: <?= $text ?>;
    border: 1px solid <?= $border ?>;
}

.donate-frame {
    width: 100%;
    height: 281px;
    border: none;
    border-radius: 15px;
    margin-top: 15px;
}

.customizer-box {
    margin-bottom: 20px; text-align: left; width: 300px;
}
.textbox {
    width: 100%; padding: 8px; border-radius: 10px; border: 1px solid var(--border-color); background: #333; color: white;
}
input[type="color"] {
    width: 50px; height: 30px; border: none; border-radius: 5px; cursor: pointer;
}

.settings-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px;
}

.customizer-box {
    text-align: center;
    width: 300px;
}

.lnkgxmbtn {
    background-color: <?= $bg ?>;
    color: <?= $text ?>;
    font-size: 20px;
    padding: 10px;
    border: 1px solid <?= $border ?>;
    border-radius: 20px;
    transition: color 0.3s ease, background-color 0.3s ease;
    text-decoration: none;
    margin: 5px;
    display: inline-block;
}

.lnkgxmbtn:hover {
    background-color: <?= $text ?>;
    color: <?= $bg ?>;
}

header {
    border: 5px solid <?= $border ?>;
    border-radius: 100px;
    margin: 10px;
    padding: 35px;
    min-height: 130px;
    align-items: center;
    display: flex;
    justify-content: space-between;
}

.headerbtn {
    border: 1px solid <?= $border ?>;
    background-color: <?= $bg ?>;
    color: <?= $text ?>;
    padding: 10px;
    border-radius: 20px;
    text-decoration: none;
}