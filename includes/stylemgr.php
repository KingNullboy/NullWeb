<?php
header("Content-Type: text/css; charset=utf-8");

// --- Configuration & Safety ---
$bg     = $_COOKIE['bg-color']     ?? '#000000';
$text   = $_COOKIE['text-color']   ?? '#ffffff';
$border = $_COOKIE['border-color'] ?? '#ffffff';
$font   = $_COOKIE['font-family']  ?? 'Lato';

// Sanitizing font name to prevent CSS injection
$font_safe = preg_replace('/[^a-zA-Z0-9\s\-]/', '', $font);
?>

@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');

/* --- Reset & Global Base --- */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    min-height: 100vh;
    background: <?= $bg ?>;
    color: <?= $text ?>;
    font-family: '<?= $font_safe ?>', sans-serif;
    line-height: 1.5;
}

/* --- Layout Wrappers --- */
.main-wrapper, .settings-wrapper {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
}

.settings-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

/* --- Header System --- */
header {
    border: 5px solid <?= $border ?>;
    border-radius: 100px;
    margin: 10px;
    padding: 0 35px;
    min-height: 130px;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
}

#pagetitle {
    flex-grow: 1;
    text-align: center;
    margin: 0 15px;
}

.nav-group {
    display: flex !important;
    flex-direction: row !important;
    gap: 8px !important;
    justify-content: flex-end !important;
    align-items: center !important;
}

.headerbtn {
    border: 1px solid <?= $border ?>;
    background-color: <?= $bg ?>;
    color: <?= $text ?>;
    padding: 10px 15px;
    border-radius: 20px;
    text-decoration: none;
    display: inline-block !important;
    white-space: nowrap !important;
    transition: background 0.25s, color 0.25s;
}

.headerbtn:hover {
    background: <?= $text ?>;
    color: <?= $bg ?>;
}

/* --- Navigation & Buttons --- */
.nav-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    margin: 20px 0;
}

.navbtn, .lnkgxmbtn {
    background: <?= $bg ?>;
    color: <?= $text ?>;
    border: 2px solid <?= $border ?>;
    border-radius: 20px;
    padding: 15px;
    min-width: 130px;
    font-size: 18px;
    cursor: pointer;
    transition: background 0.3s, color 0.3s;
    text-decoration: none;
    display: inline-block;
}

.navbtn img {
    display: block;
    margin: 0 auto 8px;
}

.navbtn:hover, .lnkgxmbtn:hover {
    background: <?= $text ?>;
    color: <?= $bg ?>;
}

/* --- Search Bar --- */
#searchInput {
    width: 100%;
    max-width: 500px;
    padding: 10px;
    font-size: 16px;
    border: 2px solid <?= $border ?>;
    border-radius: 20px;
    background-color: <?= $bg ?>;
    color: <?= $text ?>;
}

/* --- Post Cards & Social Media --- */
#form, .post-card {
    max-width: 800px;
    width: 95%;
    background: <?= $bg ?>;
    border: 2px solid <?= $border ?>;
    padding: 25px;
    margin: 20px auto;
    border-radius: 20px;
    text-align: left;
}

#form {
	text-align: center;
}

.post-header {
    display: flex;
    align-items: center;
    gap: 15px;
    border-bottom: 1px solid <?= $border ?>;
    padding-bottom: 10px;
    margin-bottom: 15px;
}

.post-pfp {
    width: 45px;
    height: 45px;
    border-radius: 10px;
    border: 1px solid <?= $border ?>;
    object-fit: cover;
}

.nickname { font-weight: 700; color: <?= $text ?>; }
.username { color: <?= $text ?>; opacity: 0.6; font-size: 0.9rem; }

#title, #postContent {
    width: 100%;
    border-radius: 20px;
    padding: 10px;
    color: <?= $text ?>;
    background-color: <?= $bg ?>;
    border: 1px solid <?= $border ?>;
    margin-bottom: 10px;
}

.formatBtn {
    background: <?= $bg ?>;
    color: <?= $text ?>;
    border: 1px solid <?= $border ?>;
    padding: 5px 10px;
    margin-right: 5px;
    border-radius: 8px;
    cursor: pointer;
}

.formatBtn:hover {
    background: <?= $text ?>;
    color: <?= $bg ?>;
}

.delete-btn {
    margin-left: auto;
    background: transparent;
    color: #ff4444;
    border: 1px solid #ff4444;
    padding: 5px 10px;
    border-radius: 10px;
    cursor: pointer;
}

/* --- Customizer & Controls --- */
.customizer-box {
    text-align: center;
    width: 300px;
    margin-bottom: 20px;
}

.textbox {
    width: 100%; 
    padding: 8px; 
    border-radius: 10px; 
    border: 1px solid <?= $border ?>; 
    background: #333; 
    color: white;
}

input[type="color"] {
    width: 50px; 
    height: 30px; 
    border: none; 
    border-radius: 5px; 
    cursor: pointer;
}

/* --- Donation Section --- */
.donate-container {
    max-width: 900px;
    margin: 30px auto;
    padding: 20px;
    border: 2px solid <?= $border ?>;
    border-radius: 20px;
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

/* --- Footer --- */
.site-footer {
    margin-top: 40px;
    border-top: 3px solid <?= $border ?>;
    padding: 25px 0;
    width: 100%;
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
    text-decoration: none;
    display: inline-block;
    margin: 5px;
    transition: 0.25s;
}

.botbtn:hover {
    background: <?= $text ?>;
    color: <?= $bg ?>;
}

#scrollBtn, #submit, .navbtn-styled {
	border-radius: 20px;
	padding: 7px;
	background-color: <?= $bg ?>;
    color: <?= $text ?>;
    border-color: <?= $border ?>;
}

.create-sub-section {
    margin-top: 40px;
    padding: 20px;
    border: 1px dashed <?= $border ?>;
    border-radius: 20px;
    display: inline-block;
}

.create-sub-section h3 {
    font-size: 1.1rem;
    margin-bottom: 5px;
}