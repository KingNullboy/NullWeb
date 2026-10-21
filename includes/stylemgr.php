<?php
header("Content-Type: text/css; charset=utf-8");

// --- Configuration & Safety ---
function cssColor(string $value, string $fallback): string {
    return preg_match('/^#[0-9a-fA-F]{6}$/', $value) ? $value : $fallback;
}

$bg     = cssColor($_COOKIE['bg-color'] ?? '#000000', '#000000');
$text   = cssColor($_COOKIE['text-color'] ?? '#ffffff', '#ffffff');
$border = cssColor($_COOKIE['border-color'] ?? '#ffffff', '#ffffff');
$font   = $_COOKIE['font-family']  ?? 'Lato';
$font_url = $_COOKIE['font-url'] ?? '';
$tool_page_bg = $bg;
$tool_ink = $text;
$tool_muted = "color-mix(in srgb, {$text} 62%, {$bg})";
$tool_line = $border;
$tool_panel = "color-mix(in srgb, {$bg} 88%, {$text})";
$tool_panel2 = "color-mix(in srgb, {$bg} 78%, {$text})";
$tool_accent = $text;
$tool_orange = $text;
$tool_input = "color-mix(in srgb, {$bg} 72%, {$text})";
$tool_deep = $bg;
$tool_sidebar = "color-mix(in srgb, {$bg} 92%, {$text})";
$tool_hover = "color-mix(in srgb, {$bg} 66%, {$text})";
$tool_selected = "color-mix(in srgb, {$bg} 55%, {$text})";
$tool_dim = "color-mix(in srgb, {$bg} 80%, {$text})";
?>

<?php if ($font_url): ?>
@import url('<?= htmlspecialchars($font_url) ?>');
<?php endif; ?>

@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap');

/* --- Reset & Global Base --- */
*, *::before, *::after {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

[hidden] {
	display: none !important;
}

body {
	min-height: 100vh;
	background: <?= $bg ?>;
	color: <?= $text ?>;
	font-family: '<?= $font ?>', sans-serif;
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

#scrollBtn, #submit, .navbtn-styled, #searchBar, #searchButton {
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

#username, #password {
	color: <?= $text ?>;
	background-color: <?= $bg ?>;
	border-color: <?= $border ?>;
}

/* Keep the migrated tool palette dynamic after each tool's legacy variable block. */
:root {
    --ink: var(--tool-ink);
    --muted: var(--tool-muted);
    --line: var(--tool-line);
    --panel: var(--tool-panel);
    --panel2: var(--tool-panel2);
    --accent: var(--tool-accent);
    --orange: var(--tool-orange);
}

body:has(.twofa-shell),
body:has(.calc-shell),
body:has(.editor-shell),
body:has(.appifier-shell),
body:has(.qr-shell),
body:has(.portal-shell),
body:has(.redirect-shell),
body:has(.regex-shell),
body:has(.wol-shell),
body:has(.rng-shell),
body:has(.webuild-shell) {
    background: var(--tool-page-bg);
    color: var(--tool-ink);
    font-family: 'Space Grotesk', sans-serif;
}

body:not(:has(.twofa-shell)):not(:has(.calc-shell)):not(:has(.editor-shell)):not(:has(.appifier-shell)):not(:has(.qr-shell)):not(:has(.portal-shell)):not(:has(.redirect-shell)):not(:has(.regex-shell)):not(:has(.wol-shell)):not(:has(.rng-shell)):not(:has(.webuild-shell)) {
    background: <?= $bg ?>;
    color: <?= $text ?>;
    font-family: '<?= $font ?>', sans-serif;
}
/* --- Dynamic PHP tool themes --- */
:root {
    --tool-page-bg: <?= $tool_page_bg ?>;
    --tool-ink: <?= $tool_ink ?>;
    --tool-muted: <?= $tool_muted ?>;
    --tool-line: <?= $tool_line ?>;
    --tool-panel: <?= $tool_panel ?>;
    --tool-panel2: <?= $tool_panel2 ?>;
    --tool-accent: <?= $tool_accent ?>;
    --tool-orange: <?= $tool_orange ?>;
    --tool-input: <?= $tool_input ?>;
    --tool-deep: <?= $tool_deep ?>;
    --tool-sidebar: <?= $tool_sidebar ?>;
    --tool-hover: <?= $tool_hover ?>;
    --tool-selected: <?= $tool_selected ?>;
    --tool-dim: <?= $tool_dim ?>;
}

/* tools/2fa/styles.css */
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap');
:root{--ink:var(--tool-ink);--muted:var(--tool-muted);--line:var(--tool-line);--panel:var(--tool-panel);--panel2:var(--tool-panel2);--accent:var(--tool-accent);--orange:var(--tool-orange)}*{box-sizing:border-box}body{margin:0;background:var(--tool-page-bg);color:var(--ink);font-family:'Space Grotesk',sans-serif}.twofa-shell{max-width:1000px;margin:auto;padding:34px 24px 38px}.twofa-shell>header{margin-left:0;margin-right:0}.page-header{display:flex;justify-content:space-between;align-items:end;padding:30px 10px 36px;border-bottom:1px solid var(--line)}.eyebrow,.section-label{color:var(--accent);font:500 11px 'DM Mono';letter-spacing:.16em}.eyebrow{margin:0 0 13px}.page-header h1{font-size:clamp(2.7rem,7vw,5.5rem);line-height:.9;letter-spacing:-.08em;margin:0}.intro{color:var(--muted);font-size:16px;line-height:1.5;max-width:510px;margin:21px 0 0}.security-mark{width:78px;height:78px;border:1px solid var(--line);display:grid;place-items:center;color:var(--accent);font:50px Georgia;transform:rotate(-12deg)}.toolbar{display:flex;justify-content:space-between;align-items:center;padding:24px 4px 18px}.toolbar strong{display:block;color:var(--muted);font:11px 'DM Mono';margin-top:7px}.toolbar-actions{display:flex;gap:8px}.toolbar-actions button,.quiet-button{color:var(--muted);background:transparent;border:1px solid var(--line);padding:10px 12px;cursor:pointer;font:11px 'DM Mono'}.toolbar-actions button:hover,.quiet-button:hover{color:var(--accent);border-color:var(--accent)}.add-panel,.codes-section{background:var(--panel);border:1px solid var(--line)}.add-panel{padding:28px 30px}.panel-heading,.codes-heading{display:flex;justify-content:space-between;align-items:start;margin-bottom:24px}.panel-heading h2,.codes-heading h2{font-size:25px;letter-spacing:-.04em;margin:9px 0 0}.storage-note,.timer{color:var(--muted);font:10px 'DM Mono';border:1px solid var(--line);padding:8px 10px}.storage-note i{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--accent);margin-right:7px}.account-form{display:grid;grid-template-columns:1fr 1.2fr 1fr;gap:16px;align-items:end}.account-form label{display:block;color:var(--muted);font:11px 'DM Mono';letter-spacing:.06em;text-transform:uppercase}.account-form label span{color:#666;text-transform:none;letter-spacing:0}.account-form input{display:block;width:100%;margin-top:8px;background:var(--tool-input);color:var(--ink);border:1px solid var(--line);padding:13px;font:13px 'DM Mono';outline:none}.account-form input:focus{border-color:var(--accent)}.account-form small{display:block;color:#777;font:10px/1.5 'DM Mono';text-transform:none;letter-spacing:0;margin-top:7px}.form-actions{display:flex;gap:8px;justify-content:flex-end;grid-column:1/-1;margin-top:2px}.primary-button{color:#111;background:var(--accent);border:1px solid var(--accent);padding:12px 16px;cursor:pointer;font:500 12px 'Space Grotesk'}.primary-button:hover{background:#d8f58c}.primary-button b{font:18px 'DM Mono';font-weight:400;margin-left:12px}.form-error{color:var(--orange);font:11px 'DM Mono';grid-column:1/-1;margin:0}.codes-section{margin-top:22px;padding:28px 30px}.codes-heading{margin-bottom:22px}.accounts-container{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.account-card{background:var(--tool-dim);border:1px solid var(--line);padding:18px;cursor:pointer;transition:border-color .15s,transform .1s}.account-card:hover{border-color:var(--accent)}.account-card:active{transform:scale(.99)}.account-top{display:flex;justify-content:space-between;gap:12px;align-items:start}.account-label{font-size:16px;font-weight:500;overflow-wrap:anywhere}.account-note{color:#777;font:10px 'DM Mono';margin-top:5px;overflow-wrap:anywhere}.code{color:var(--accent);font:500 clamp(2rem,5vw,3rem) 'DM Mono';letter-spacing:.14em;margin:18px 0 12px}.card-footer{display:flex;justify-content:space-between;align-items:center;color:#777;font:10px 'DM Mono'}.copy-state{color:var(--accent);min-height:15px}.card-actions{display:flex;gap:6px}.card-actions button{color:#777;background:transparent;border:0;padding:4px;cursor:pointer;font:10px 'DM Mono'}.card-actions button:hover{color:var(--ink)}.empty-state{grid-column:1/-1;text-align:center;border:1px dashed #4b5045;padding:42px 20px;color:var(--muted)}.empty-state span{display:block;color:#9ebd5e;font:52px Georgia}.empty-state h3{color:var(--ink);font-size:18px;margin:13px 0 7px}.empty-state p{font:11px 'DM Mono';margin:0}.privacy-note{color:#777;text-align:center;font:10px/1.5 'DM Mono';margin:18px 0 0}@media(max-width:760px){.twofa-shell{padding:16px 12px 26px}.page-header{padding:28px 4px 30px}.security-mark{width:60px;height:60px;font-size:36px}.toolbar{display:block;padding:20px 4px 14px}.toolbar-actions{margin-top:14px}.account-form{display:block}.account-form label{margin-top:15px}.account-form label:first-child{margin-top:0}.form-actions{margin-top:18px}.add-panel,.codes-section{padding:22px 18px}.panel-heading,.codes-heading{display:block}.storage-note,.timer{display:inline-block;margin-top:14px}.accounts-container{grid-template-columns:1fr}}@media(max-width:440px){.toolbar-actions button{flex:1}.toolbar-actions{width:100%}.page-header{display:block}.security-mark{margin-top:24px}.code{font-size:2rem;letter-spacing:.1em}}


/* tools/calc/styles.css */
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap');
:root{--ink:var(--tool-ink);--muted:#9c9a94;--line:#363734;--panel:var(--tool-panel);--panel2:var(--tool-panel2);--accent:var(--tool-accent);--orange:var(--tool-orange)}
*{box-sizing:border-box}body{background:var(--tool-page-bg);color:var(--ink);font-family:'Space Grotesk',sans-serif}.calc-shell{max-width:1120px;margin:auto;padding:0 24px 28px}.calc-shell>header{margin-left:0;margin-right:0}.hero{display:flex;justify-content:space-between;align-items:end;padding:66px 12px 38px;border-bottom:1px solid var(--line)}.eyebrow,.kicker{font:500 11px 'DM Mono',monospace;letter-spacing:.16em;color:var(--accent);margin:0 0 13px}.hero h1{font-size:clamp(2.4rem,6vw,5.2rem);line-height:.96;letter-spacing:-.07em;max-width:700px;margin:0}.hero-copy{color:var(--muted);font-size:16px;max-width:490px;margin:23px 0 0}.hero-mark{width:90px;height:90px;border:1px solid var(--line);display:grid;place-items:center;position:relative;color:var(--accent);font:500 54px Georgia}.hero-mark small{position:absolute;right:8px;top:6px;font:11px 'DM Mono';color:var(--muted)}.tool-tabs{display:flex;gap:7px;overflow:auto;padding:20px 0}.tool-tab{white-space:nowrap;background:transparent;color:var(--muted);border:1px solid var(--line);padding:12px 16px;border-radius:2px;font:500 13px 'Space Grotesk';cursor:pointer}.tool-tab span{font:11px 'DM Mono';color:#666;margin-right:9px}.tool-tab:hover,.tool-tab.active{color:var(--tool-dim);background:var(--accent);border-color:var(--accent)}.tool-tab.active span{color:#667c33}.workspace{background:var(--panel);border:1px solid var(--line);min-height:590px}.panel{padding:32px;max-width:900px;margin:auto}.panel-heading{display:flex;justify-content:space-between;align-items:start;margin-bottom:28px}.panel-heading h2{font-size:30px;letter-spacing:-.04em;margin:0}.status-dot{font:11px 'DM Mono';color:var(--muted);border:1px solid var(--line);padding:7px 10px}.status-dot:before{content:'●';color:var(--accent);margin-right:7px}.calculator-layout{max-width:580px;margin:auto}.display-card{background:var(--tool-deep);border:1px solid var(--line);min-height:136px;padding:19px 22px;display:flex;flex-direction:column;justify-content:end;text-align:right}.display-meta{display:flex;justify-content:space-between;color:#68705e;font:11px 'DM Mono';margin-bottom:auto;text-align:left}.display-card #calc-expression{font:500 34px 'DM Mono';overflow:auto;white-space:nowrap}.display-card #calc-result{color:var(--muted);font:13px 'DM Mono';min-height:20px}.keypad{display:grid;grid-template-columns:repeat(5,1fr);gap:7px;margin-top:7px}.keypad button,.action-btn{font:500 14px 'DM Mono';color:var(--ink);background:var(--panel2);border:1px solid var(--line);min-height:54px;cursor:pointer}.keypad button:hover,.action-btn:hover{border-color:var(--accent);color:var(--accent)}.keypad .operator{color:var(--accent)}.keypad .equals{background:var(--accent);color:#111;border-color:var(--accent);font-size:18px}.keypad .clear{color:var(--orange)}.hint{color:#777;font-size:12px;margin:24px 0 0;text-align:center}.hint kbd,.hint code{font:11px 'DM Mono';color:var(--ink);border:1px solid var(--line);padding:3px 5px;background:var(--panel2)}.graph-controls{display:flex;gap:12px;margin-bottom:16px}.graph-controls label{flex:1}.graph-controls label:last-child{max-width:190px}label{display:block;color:var(--muted);font:11px 'DM Mono';letter-spacing:.06em;text-transform:uppercase}input,textarea,select{display:block;width:100%;margin-top:8px;background:var(--tool-input);color:var(--ink);border:1px solid var(--line);padding:14px;font:14px 'DM Mono';outline:none}input:focus,textarea:focus,select:focus{border-color:var(--accent)}textarea{min-height:130px;resize:vertical}.graph-wrap{border:1px solid var(--line);background:var(--tool-input);padding:8px}.graph-wrap canvas{width:100%;height:auto;display:block}.conversion-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.callout{display:flex;gap:16px;align-items:center;border:1px solid var(--line);padding:16px;margin-top:22px;color:var(--muted);font-size:13px}.callout span{color:var(--accent);font-size:26px}.callout p{margin:0}.matrix-layout{display:grid;grid-template-columns:1fr 1fr;gap:16px}.action-row,.stats-actions{display:flex;gap:8px;margin-top:16px}.action-btn{padding:12px 17px;min-height:auto}.action-btn.active{background:var(--accent);color:#111;border-color:var(--accent)}.result-box{background:var(--tool-input);border:1px solid var(--line);color:var(--accent);min-height:100px;padding:20px;margin-top:16px;font:14px/1.7 'DM Mono';white-space:pre-wrap}.stats-actions{margin-bottom:18px}.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.stat-card{border:1px solid var(--line);padding:18px 14px;background:var(--tool-input)}.stat-card small{display:block;color:var(--muted);font:10px 'DM Mono';margin-bottom:8px}.stat-card strong{font:500 20px 'DM Mono'}.calc-footer{display:flex;justify-content:space-between;color:#64645f;font:10px 'DM Mono';letter-spacing:.06em;padding:22px 4px}.calc-footer b{color:var(--accent);font-weight:400}.tab-panel[hidden]{display:none}@media(max-width:650px){.calc-shell{padding:0 12px 20px}.calc-shell>header{border-radius:20px;min-height:95px;padding:0 17px}.hero{padding:42px 4px 28px}.hero-mark{width:60px;height:60px;font-size:34px}.tool-tabs{padding:14px 0}.panel{padding:20px 14px}.keypad{gap:5px}.keypad button{min-height:48px;font-size:12px}.display-card #calc-expression{font-size:25px}.graph-controls,.matrix-layout{display:block}.graph-controls label+label,.matrix-layout label+label{margin-top:14px}.conversion-grid,.stats-grid{grid-template-columns:1fr 1fr}.calc-footer{display:block;line-height:2.2}.calc-footer span{display:block}}


/* tools/editor/styles.css */
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap');
:root{--ink:var(--tool-ink);--muted:var(--tool-muted);--line:var(--tool-line);--panel:var(--tool-panel);--panel2:var(--tool-panel2);--accent:var(--tool-accent);--orange:var(--tool-orange)}*{box-sizing:border-box}body{margin:0;background:var(--tool-page-bg);color:var(--ink);font-family:'Space Grotesk',sans-serif}.editor-shell{max-width:1360px;margin:auto;padding:0 24px 24px}.editor-shell>header{margin-left:0;margin-right:0}#app{display:flex;height:calc(100vh - 125px);min-height:60vh;border:1px solid var(--line);background:var(--panel);overflow:hidden}#sidebar{width:245px;flex:0 0 245px;background:var(--tool-sidebar);border-right:1px solid var(--line);display:flex;flex-direction:column}.sidebar-title{display:flex;justify-content:space-between;align-items:center;padding:18px 16px 11px;color:var(--accent);font:11px 'DM Mono';letter-spacing:.13em}.sidebar-title small{color:#6d6f68;font-size:10px;letter-spacing:0}.sidebar-actions,#sidebarHeader{display:flex;gap:6px;padding:0 12px 10px}.sidebar-actions{padding-top:0;padding-bottom:15px;border-bottom:1px solid var(--line)}#sidebar button{color:var(--muted);background:var(--panel2);border:1px solid var(--line);padding:9px 10px;font:11px 'DM Mono';cursor:pointer;flex:1}#sidebar button:hover{color:var(--accent);border-color:var(--accent)}#sidebarHeader button:first-child{color:#111;background:var(--accent);border-color:var(--accent)}#fileTree{padding:13px 9px;overflow-y:auto;flex:1}.sidebar-item{padding:8px 9px;color:var(--muted);cursor:pointer;font:12px 'DM Mono';border-left:2px solid transparent}.sidebar-item:hover{color:var(--ink);background:var(--tool-hover)}.sidebar-item.selected{color:var(--accent);background:var(--tool-selected);border-left-color:var(--accent)}.sidebar-item.folder{color:var(--ink)}.sidebar-item.folder:before{content:'▸';color:var(--accent);display:inline-block;width:18px}.sidebar-item.folder>.folder-children{padding-left:12px}.sidebar-item.folder>.folder-children .sidebar-item{padding-left:8px}.sidebar-item.folder>.folder-children .sidebar-item:before{content:'·';color:var(--muted);display:inline-block;width:18px}.sidebar-item.folder>.folder-children[style*="display: block"]~*{display:block}#extensionsPanel{display:none;padding:14px;border-top:1px solid var(--line);max-height:180px;overflow:auto}#extensionsPanel h4{font:11px 'DM Mono';color:var(--accent);margin:0 0 9px}#mainArea{flex:1;display:flex;flex-direction:column;min-width:0;min-height:0}#editorToolbar{min-height:57px;background:#131412;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;padding:9px 15px;gap:15px}.toolbar-group{display:flex;gap:10px;align-items:center}.toolbar-group>button{background:var(--accent);border:0;color:#111;padding:9px 12px;font:11px 'DM Mono';cursor:pointer}.toolbar-group>button span{font-size:9px;margin-left:5px}.toolbar-group label{color:var(--muted);font:10px 'DM Mono';display:flex;align-items:center;gap:7px}.toolbar-group select{background:var(--panel2);color:var(--ink);border:1px solid var(--line);padding:8px;font:11px 'DM Mono'}#editorToolbar .toolbar-meta{display:flex;gap:18px;color:#676961;font:10px 'DM Mono';white-space:nowrap}.toolbar-meta span:first-child{color:var(--ink)}#editorPreviewContainer{display:flex;flex:1;min-height:0;overflow:hidden}.editor-pane,.preview-pane{display:flex;flex-direction:column;min-width:0;flex:1}.editor-pane{border-right:1px solid var(--line)}.pane-label{height:28px;padding:8px 13px 0;color:#72756e;font:10px 'DM Mono';letter-spacing:.1em;background:var(--tool-sidebar)}.CodeMirror{height:100%!important;flex:1;background:var(--tool-dim);color:var(--ink);font:13px/1.6 'DM Mono'}.CodeMirror-gutters{background:var(--tool-dim);border-right:1px solid var(--line)}.CodeMirror-linenumber{color:#4f534d}.CodeMirror-cursor{border-left-color:var(--accent)}#preview{width:100%;height:100%;flex:1;border:0;background:white}#consoleContainer{display:flex;flex-direction:column;gap:6px;background:var(--tool-sidebar)}.console-wrapper{border-top:1px solid var(--line)!important;background:var(--tool-sidebar)!important;color:var(--ink)!important}.console-wrapper button{border-color:var(--line)!important;background:var(--panel2)!important;color:var(--orange)!important}.console-wrapper textarea{background:var(--tool-page-bg)!important;color:var(--ink)!important;border-top:1px solid var(--line)!important}.console-wrapper div{font:11px 'DM Mono'}.editor-footer{display:none}#contextMenu{position:fixed;display:none;z-index:20;background:var(--tool-panel);border:1px solid var(--line);box-shadow:0 10px 30px #000;padding:5px;min-width:160px}#contextMenu div{padding:9px 11px;color:var(--muted);font:11px 'DM Mono';cursor:pointer}#contextMenu div:hover{background:var(--accent);color:#111}@media(max-width:800px){.editor-shell{padding:0 10px 18px}.editor-shell>header{border-radius:20px;min-height:95px;padding:0 17px}#app{height:720px}.sidebar-title{padding-top:14px}.toolbar-meta{display:none!important}#editorPreviewContainer{display:block;overflow:auto}.editor-pane,.preview-pane{height:50%;border-right:0}.editor-pane{border-bottom:1px solid var(--line)}.CodeMirror{height:calc(100% - 28px)!important}.preview-pane{height:50%}}@media(max-width:540px){#sidebar{width:145px;flex-basis:145px}.sidebar-title{padding-left:10px;padding-right:10px}.sidebar-title small{display:none}.sidebar-actions,#sidebarHeader{padding-left:7px;padding-right:7px;gap:4px;flex-wrap:wrap}.sidebar-actions button,#sidebarHeader button{font-size:10px;padding:7px 5px}.toolbar-group{gap:5px}.toolbar-group label{display:none}.editor-footer{display:none}}


/* tools/iosappifier/styles.css */
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap');
:root{--ink:var(--tool-ink);--muted:var(--tool-muted);--line:var(--tool-line);--panel:var(--tool-panel);--panel2:var(--tool-panel2);--accent:var(--tool-accent);--orange:var(--tool-orange)}*{box-sizing:border-box}body{margin:0;background:var(--tool-page-bg);color:var(--ink);font-family:'Space Grotesk',sans-serif}.appifier-shell{max-width:1120px;margin:auto;padding:0 24px 32px}.appifier-shell>header{margin-left:0;margin-right:0}.page-intro{display:flex;justify-content:space-between;align-items:end;padding:58px 10px 38px;border-bottom:1px solid var(--line)}.eyebrow{color:var(--accent);font:500 11px 'DM Mono';letter-spacing:.16em;margin:0 0 13px}.page-intro h1{font-size:clamp(2.5rem,6vw,5rem);line-height:.94;letter-spacing:-.07em;max-width:690px;margin:0}.intro-copy{color:var(--muted);font-size:16px;max-width:510px;margin:22px 0 0}.intro-mark{width:84px;height:84px;border:1px solid var(--line);display:grid;place-items:center;color:var(--accent);font:54px Georgia;transform:rotate(-12deg)}.appifier-workspace{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:1px;background:var(--line);border:1px solid var(--line);margin-top:22px}.form-panel{background:var(--panel);padding:30px}.section-heading{display:flex;gap:15px;align-items:start;margin-bottom:25px}.section-heading>span{color:var(--accent);font:500 12px 'DM Mono';padding-top:4px}.section-heading h2{font-size:25px;letter-spacing:-.04em;margin:0 0 5px}.section-heading p{color:var(--muted);font-size:13px;line-height:1.5;margin:0}.field-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.field-wide{grid-column:1/-1}.field{display:block;color:var(--muted);font:11px 'DM Mono';letter-spacing:.06em;text-transform:uppercase}.field input{display:block;width:100%;margin-top:8px;background:var(--tool-input);color:var(--ink);border:1px solid var(--line);padding:14px;font:14px 'DM Mono';outline:none}.field input:focus{border-color:var(--accent)}.field input:invalid:not(:placeholder-shown){border-color:#9b5d4c}.advanced-options{border-top:1px solid var(--line);margin-top:26px;padding-top:18px}.advanced-options summary{display:flex;justify-content:space-between;align-items:center;color:var(--ink);cursor:pointer;list-style:none;font:500 13px 'Space Grotesk'}.advanced-options summary::-webkit-details-marker{display:none}.advanced-options summary:after{content:'+';color:var(--accent);font:20px 'DM Mono'}.advanced-options[open] summary:after{content:'−'}.advanced-options summary small{color:var(--muted);font:10px 'DM Mono';margin-left:auto;margin-right:16px}.advanced-content{padding-top:18px}.advanced-intro{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:18px}.advanced-intro p{color:var(--muted);font-size:12px;line-height:1.5;margin:0;max-width:420px}.advanced-intro button{white-space:nowrap;color:#111;background:var(--accent);border:0;padding:9px 11px;font:11px 'DM Mono';cursor:pointer}.advanced-intro button:hover{background:#d8f58c}.field-help{display:block;color:#777;text-transform:none;letter-spacing:0;font:10px/1.5 'DM Mono';margin-top:7px}.suggestion-note{color:var(--accent);font:10px/1.5 'DM Mono';margin:15px 0 0}.drop-zone{min-height:220px;border:1px dashed #59604d;background:var(--tool-sidebar);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:28px;cursor:pointer;transition:border-color .15s,background .15s}.drop-zone:hover,.drop-zone.is-dragging{border-color:var(--accent);background:#171d12}.drop-zone input{position:absolute;width:1px;height:1px;opacity:0}.upload-icon{display:grid;place-items:center;width:44px;height:44px;border:1px solid var(--accent);border-radius:50%;color:var(--accent);font:24px 'DM Mono';margin-bottom:15px}.drop-zone strong{font-size:15px}.drop-zone small{color:var(--muted);font:11px/1.5 'DM Mono';max-width:330px;margin-top:9px}.field-error{color:var(--orange);font:11px 'DM Mono';margin-top:10px}.icon-preview{display:flex;align-items:center;gap:12px;border:1px solid var(--line);background:var(--tool-sidebar);padding:10px;margin-top:12px}.icon-preview img{width:48px;height:48px;object-fit:cover;border-radius:11px}.icon-preview div{display:grid;gap:4px;flex:1}.icon-preview strong{font-size:13px}.icon-preview span{color:var(--muted);font:10px 'DM Mono'}.icon-preview button{color:var(--muted);background:transparent;border:0;font:11px 'DM Mono';cursor:pointer}.icon-preview button:hover{color:var(--orange)}.summary-panel{grid-column:2;grid-row:1 / span 2;background:var(--tool-sidebar);padding:30px;display:flex;flex-direction:column;min-height:100%}.summary-icon{width:100px;height:100px;display:grid;place-items:center;background:var(--panel2);border:1px solid var(--line);border-radius:23px;color:var(--accent);font:55px Georgia;overflow:hidden;margin-bottom:20px}.summary-icon img{width:100%;height:100%;object-fit:cover}.summary-copy{display:grid;gap:6px}.summary-label{color:var(--muted);font:10px 'DM Mono';text-transform:uppercase;letter-spacing:.08em}.summary-copy strong{font-size:21px;letter-spacing:-.03em;overflow-wrap:anywhere}.summary-copy small{color:var(--muted);font:11px 'DM Mono';overflow-wrap:anywhere}.download-button{display:flex;justify-content:space-between;align-items:center;margin-top:auto;padding:15px 16px;background:var(--accent);border:1px solid var(--accent);color:#111;cursor:pointer;font:500 13px 'Space Grotesk'}.download-button:hover{background:#d8f58c}.download-button b{font:20px 'DM Mono';font-weight:400}.form-note{grid-column:1/-1;background:var(--tool-sidebar);color:#777;font:11px 'DM Mono';padding:14px 30px;margin:0}.form-note.is-error{color:var(--orange)}@media(max-width:760px){.appifier-shell{padding:0 12px 22px}.page-intro{padding:40px 4px 28px}.intro-mark{width:60px;height:60px;font-size:38px}.appifier-workspace{display:block}.summary-panel{min-height:260px}.form-note{padding:14px 20px}}@media(max-width:540px){.appifier-shell>header{border-radius:20px;min-height:95px;padding:0 17px}.page-intro{display:block}.intro-mark{margin-top:24px}.form-panel,.summary-panel{padding:22px 18px}.field-grid{display:block}.field{margin-top:14px}.field:first-child{margin-top:0}.section-heading{gap:10px}.section-heading h2{font-size:22px}}


/* tools/qr/styles.css */
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap');
:root{--ink:var(--tool-ink);--muted:var(--tool-muted);--line:var(--tool-line);--panel:var(--tool-panel);--panel2:var(--tool-panel2);--accent:var(--tool-accent);--orange:var(--tool-orange)}*{box-sizing:border-box}body{margin:0;background:var(--tool-page-bg);color:var(--ink);font-family:'Space Grotesk',sans-serif}.qr-shell{max-width:1120px;margin:auto;padding:0 24px 32px}.qr-shell>header{margin-left:0;margin-right:0}.page-intro{display:flex;justify-content:space-between;align-items:end;padding:60px 10px 38px;border-bottom:1px solid var(--line)}.eyebrow,.section-label{color:var(--accent);font:500 11px 'DM Mono';letter-spacing:.16em}.eyebrow{margin:0 0 13px}.page-intro h1{font-size:clamp(2.6rem,6vw,5rem);line-height:.94;letter-spacing:-.07em;max-width:700px;margin:0}.intro-copy{color:var(--muted);font-size:16px;line-height:1.5;max-width:520px;margin:22px 0 0}.intro-mark{width:84px;height:84px;border:1px solid var(--line);display:grid;place-items:center;color:var(--accent);font:52px 'DM Mono';transform:rotate(-8deg)}.qr-workspace{display:grid;grid-template-columns:minmax(0,1fr) minmax(300px,.85fr);gap:1px;background:var(--line);border:1px solid var(--line);margin-top:24px}.controls-panel,.preview-panel{background:var(--panel);padding:30px}.preview-panel{background:var(--tool-sidebar)}.panel-heading{display:flex;justify-content:space-between;align-items:start;margin-bottom:28px}.section-label{display:block;margin-bottom:9px}.panel-heading h2{font-size:27px;letter-spacing:-.04em;margin:0}.local-status,.preview-state{color:var(--muted);font:10px 'DM Mono';border:1px solid var(--line);padding:8px 10px}.local-status i{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--accent);margin-right:7px}.field{display:block;color:var(--muted);font:11px 'DM Mono';letter-spacing:.06em;text-transform:uppercase;margin-top:17px}.field:first-child{margin-top:0}.field input,.field textarea,.field select{display:block;width:100%;margin-top:8px;background:var(--tool-input);color:var(--ink);border:1px solid var(--line);padding:13px;font:14px 'DM Mono';outline:none}.field textarea{resize:vertical;line-height:1.5}.field input:focus,.field textarea:focus,.field select:focus{border-color:var(--accent)}.content-fields{margin-top:22px}.content-fields .field{margin-top:0}.advanced-options{border-top:1px solid var(--line);margin-top:26px;padding-top:18px}.advanced-options summary{display:flex;justify-content:space-between;color:var(--ink);cursor:pointer;list-style:none;font:500 13px 'Space Grotesk'}.advanced-options summary::-webkit-details-marker{display:none}.advanced-options summary:after{content:'+';color:var(--accent);font:20px 'DM Mono';margin-left:15px}.advanced-options[open] summary:after{content:'−'}.advanced-options summary span{color:var(--muted);font:10px 'DM Mono';margin-left:auto}.advanced-grid{display:grid;grid-template-columns:1fr 1fr;gap:0 14px;padding-top:14px}.advanced-grid .field:last-child{grid-column:1/-1}.generate-button{display:flex;justify-content:space-between;align-items:center;width:100%;margin-top:28px;padding:15px 16px;background:var(--accent);border:1px solid var(--accent);color:#111;cursor:pointer;font:500 13px 'Space Grotesk'}.generate-button:hover{background:#d8f58c}.generate-button b{font:20px 'DM Mono';font-weight:400}.form-error{color:var(--orange);font:11px 'DM Mono';margin:16px 0 0}.qr-preview{min-height:360px;background:var(--tool-ink);display:grid;place-items:center;padding:28px}.qr-preview img{display:block;width:min(100%,310px);height:auto;image-rendering:pixelated}.empty-preview{text-align:center;color:#777}.empty-preview span{display:block;color:#a3b878;font:72px 'DM Mono';line-height:1}.empty-preview p{font:11px 'DM Mono';margin:18px 0 0}.preview-state{color:#777}.preview-actions{display:flex;gap:8px;margin-top:14px}.secondary-button{flex:1;text-align:center;color:var(--ink);background:var(--panel2);border:1px solid var(--line);padding:11px 10px;cursor:pointer;font:11px 'DM Mono';text-decoration:none}.secondary-button:hover{border-color:var(--accent);color:var(--accent)}.data-summary{color:#777;font:10px/1.5 'DM Mono';margin:14px 0 0;overflow-wrap:anywhere}.qr-note{color:#777;text-align:center;font:11px 'DM Mono';margin:18px 0 0}@media(max-width:760px){.qr-shell{padding:0 12px 22px}.qr-shell>header{border-radius:20px;min-height:95px;padding:0 17px}.page-intro{padding:42px 4px 28px}.intro-mark{width:60px;height:60px;font-size:36px}.qr-workspace{display:block}.preview-panel{border-top:1px solid var(--line)}.qr-preview{min-height:280px}}@media(max-width:500px){.page-intro{display:block}.intro-mark{margin-top:24px}.controls-panel,.preview-panel{padding:22px 18px}.panel-heading{display:block}.local-status,.preview-state{display:inline-block;margin-top:14px}.advanced-grid{display:block}.advanced-grid .field{margin-top:14px}}


/* Final tool variable and page-scope overrides. */
:root{--ink:var(--tool-ink);--muted:var(--tool-muted);--line:var(--tool-line);--panel:var(--tool-panel);--panel2:var(--tool-panel2);--accent:var(--tool-accent);--orange:var(--tool-orange)}
body:has(.twofa-shell),body:has(.calc-shell),body:has(.editor-shell),body:has(.appifier-shell),body:has(.qr-shell){background:var(--tool-page-bg);color:var(--tool-ink);font-family:'Space Grotesk',sans-serif}
body:not(:has(.twofa-shell)):not(:has(.calc-shell)):not(:has(.editor-shell)):not(:has(.appifier-shell)):not(:has(.qr-shell)){background:<?= $bg ?>;color:<?= $text ?>;font-family:'<?= $font ?>',sans-serif}
/* --- Settings page layout --- */
.settings-wrapper{max-width:760px;min-height:100vh;margin:0 auto;padding:52px 24px 40px;text-align:left;display:block}
.settings-wrapper h1{font-size:clamp(2.5rem,6vw,4.5rem);letter-spacing:-.07em;line-height:.95;margin:0 0 28px;text-align:left}
.settings-intro{max-width:560px;margin:-12px 0 28px;color:<?= $text ?>;opacity:.68;font:13px/1.6 '<?= $font ?>',sans-serif}
.settings-wrapper form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.settings-wrapper .customizer-box{width:auto;margin:0;padding:18px;min-height:104px;background:color-mix(in srgb, <?= $bg ?> 88%, <?= $text ?>);border:1px solid <?= $border ?>;border-radius:12px;text-align:left;display:flex;flex-direction:column;justify-content:center}
.settings-wrapper .customizer-box label{display:block;color:<?= $text ?>;font:500 12px '<?= $font ?>',sans-serif;margin-bottom:9px}
.settings-wrapper .customizer-box input[type=color]{width:48px;height:34px;padding:2px;border:1px solid <?= $border ?>;border-radius:6px;background:<?= $bg ?>;cursor:pointer}
.settings-wrapper .customizer-box .textbox{width:100%;padding:10px 12px;border:1px solid <?= $border ?>;border-radius:7px;background:<?= $bg ?>;color:<?= $text ?>;font:13px '<?= $font ?>',sans-serif}
.settings-wrapper form>.botbtn,.settings-wrapper>button.botbtn{width:auto;padding:11px 15px;border:1px solid <?= $border ?>;border-radius:8px;background:<?= $bg ?>;color:<?= $text ?>;font:500 12px '<?= $font ?>',sans-serif;cursor:pointer}
.settings-wrapper form>.botbtn:hover,.settings-wrapper>button.botbtn:hover{background:<?= $text ?>;color:<?= $bg ?>}
.settings-wrapper form>.reset-button{color:#ffb8ad;border-color:#9b5d55}
.settings-wrapper form>.reset-button:hover{background:#9b5d55;color:#fff}
.settings-wrapper>button.botbtn{margin-top:16px}
.settings-wrapper form>h2,.settings-wrapper form>p{grid-column:1/-1}
.settings-wrapper form>h2{font-size:18px;margin:22px 0 0}.settings-wrapper form>p{color:<?= $text ?>;opacity:.7;font-size:13px;margin:0}
@media(max-width:600px){.settings-wrapper{padding:32px 14px}.settings-wrapper form{display:block}.settings-wrapper .customizer-box{margin-top:12px}.settings-wrapper form>.botbtn{margin-top:12px}.settings-wrapper>button.botbtn{margin-top:16px}}

/* NullASCII */
.ascii-shell{max-width:1120px;margin:auto;padding:0 24px 32px;color:var(--tool-ink)}
.ascii-shell>header{margin-left:0;margin-right:0}
.ascii-hero{display:flex;justify-content:space-between;align-items:end;padding:60px 10px 38px;border-bottom:1px solid var(--tool-line)}
.ascii-hero h1{font-size:clamp(2.6rem,6vw,5rem);line-height:.94;letter-spacing:-.07em;max-width:700px;margin:0}
.ascii-hero .intro-copy{color:var(--tool-muted);font-size:16px;line-height:1.5;max-width:520px;margin:22px 0 0}
.ascii-mark{width:84px;height:84px;border:1px solid var(--tool-line);display:grid;place-items:center;color:var(--tool-accent);font:52px 'DM Mono';transform:rotate(-8deg)}
.ascii-workspace{display:grid;grid-template-columns:minmax(0,.86fr) minmax(0,1.14fr);gap:1px;background:var(--tool-line);border:1px solid var(--tool-line);margin-top:24px}
.ascii-controls,.ascii-preview{background:var(--tool-panel);padding:30px;min-width:0}
.ascii-preview{background:var(--tool-sidebar)}
.ascii-shell .panel-heading{display:flex;justify-content:space-between;align-items:start;margin-bottom:26px}
.ascii-shell .panel-heading h2{font-size:27px;letter-spacing:-.04em;margin:0}
.ascii-shell .section-label{display:block;color:var(--tool-accent);font:500 11px 'DM Mono';letter-spacing:.16em;margin-bottom:9px}
.local-status,.preview-state{color:var(--tool-muted);font:10px 'DM Mono';border:1px solid var(--tool-line);padding:8px 10px;white-space:nowrap}
.local-status i{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--tool-accent);margin-right:7px}
.ascii-drop-zone{min-height:220px;border:1px dashed var(--tool-line);background:var(--tool-sidebar);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:28px;cursor:pointer;transition:border-color .15s,background .15s}
.ascii-drop-zone:hover,.ascii-drop-zone.is-dragging{border-color:var(--tool-accent);background:var(--tool-hover)}
.ascii-drop-zone input{position:absolute;width:1px;height:1px;opacity:0}
.ascii-drop-zone strong{font-size:15px}.ascii-drop-zone small{color:var(--tool-muted);font:11px/1.5 'DM Mono';max-width:300px;margin-top:9px}
.upload-icon{display:grid;place-items:center;width:44px;height:44px;border:1px solid var(--tool-accent);border-radius:50%;color:var(--tool-accent);font:24px 'DM Mono';margin-bottom:15px}
.ascii-shell .form-error{color:var(--tool-orange);font:11px 'DM Mono';margin:12px 0 0}
.ascii-options{border-top:1px solid var(--tool-line);margin-top:26px;padding-top:20px;display:grid;gap:16px}
.ascii-field{display:block;color:var(--tool-muted);font:11px 'DM Mono';letter-spacing:.06em;text-transform:uppercase}
.ascii-field output{float:right;color:var(--tool-accent);font:11px 'DM Mono'}
.ascii-field select{display:block;width:100%;margin-top:8px;background:var(--tool-input);color:var(--tool-ink);border:1px solid var(--tool-line);padding:13px;font:14px 'DM Mono';outline:none}
.ascii-field input[type=range]{display:block;width:100%;margin-top:14px;accent-color:var(--tool-accent)}
.ascii-check{display:flex;align-items:center;gap:9px;color:var(--tool-muted);font:12px 'DM Mono';cursor:pointer}
.ascii-check input{width:16px;height:16px;margin:0;accent-color:var(--tool-accent)}
.ascii-shell .primary-button{display:flex;justify-content:space-between;align-items:center;width:100%;margin-top:3px;padding:15px 16px;background:var(--tool-accent);border:1px solid var(--tool-accent);color:#111;cursor:pointer;font:500 13px 'Space Grotesk'}
.ascii-shell .primary-button:hover{filter:brightness(1.12)}.ascii-shell .primary-button b{font:20px 'DM Mono';font-weight:400}
.ascii-output{min-height:430px;max-height:620px;overflow:auto;background:var(--tool-deep);border:1px solid var(--tool-line);padding:20px;color:var(--tool-ink);font:12px/1.05 'DM Mono',monospace;white-space:nowrap;tab-size:2}
.ascii-output span{display:inline}.empty-preview{text-align:center;color:#777;white-space:normal;padding:130px 20px}.empty-preview span{display:block;color:var(--tool-accent);font:72px 'DM Mono';line-height:1}.empty-preview p{font:11px 'DM Mono';margin:18px 0 0}
.ascii-actions{display:flex;gap:8px;margin-top:14px}.ascii-shell .secondary-button{flex:1;color:var(--tool-ink);background:var(--tool-panel2);border:1px solid var(--tool-line);padding:11px 10px;cursor:pointer;font:11px 'DM Mono'}.ascii-shell .secondary-button:hover:not(:disabled){border-color:var(--tool-accent);color:var(--tool-accent)}.ascii-shell .secondary-button:disabled{opacity:.4;cursor:not-allowed}
.ascii-shell .data-summary{color:#777;font:10px/1.5 'DM Mono';margin:14px 0 0;overflow-wrap:anywhere}.ascii-note{color:#777;text-align:center;font:11px 'DM Mono';margin:18px 0 0}
@media(max-width:760px){.ascii-shell{padding:0 12px 22px}.ascii-hero{padding:42px 4px 28px}.ascii-mark{width:60px;height:60px;font-size:36px}.ascii-workspace{display:block}.ascii-preview{border-top:1px solid var(--tool-line)}.ascii-controls,.ascii-preview{padding:22px 18px}.ascii-output{min-height:300px}.empty-preview{padding:90px 20px}}
@media(max-width:500px){.ascii-hero{display:block}.ascii-mark{margin-top:24px}.ascii-shell .panel-heading{display:block}.local-status,.preview-state{display:inline-block;margin-top:14px}.ascii-actions{display:grid;grid-template-columns:1fr 1fr}}

/* Ehko media player */
.ehko-shell{max-width:1120px;margin:auto;padding:0 24px 32px;color:var(--tool-ink)}
.ehko-shell>header{margin-left:0;margin-right:0}
.ehko-hero{display:flex;justify-content:space-between;align-items:end;padding:60px 10px 38px;border-bottom:1px solid var(--tool-line)}
.ehko-hero h1{font-size:clamp(2.6rem,6vw,5rem);line-height:.94;letter-spacing:-.07em;max-width:700px;margin:0}
.ehko-hero .intro-copy{color:var(--tool-muted);font-size:16px;line-height:1.5;max-width:520px;margin:22px 0 0}
.ehko-mark{width:84px;height:84px;border:1px solid var(--tool-line);display:grid;place-items:center;color:var(--tool-accent);font:34px 'DM Mono';transform:rotate(-8deg)}
.ehko-import,.ehko-player,.ehko-queue{background:var(--tool-panel);border:1px solid var(--tool-line);margin-top:24px;padding:30px}
.ehko-import{margin-top:24px}.section-heading,.player-heading,.queue-heading{display:flex;justify-content:space-between;align-items:start;margin-bottom:24px}.section-heading{justify-content:flex-start;gap:15px}.section-heading h2,.player-heading h2,.queue-heading h2{font-size:27px;letter-spacing:-.04em;margin:0}.section-heading p{color:var(--tool-muted);font-size:13px;line-height:1.5;margin:5px 0 0}.ehko-shell .section-label{display:block;color:var(--tool-accent);font:500 11px 'DM Mono';letter-spacing:.16em;margin-bottom:9px}.local-status,.status-pill{color:var(--tool-muted);font:10px 'DM Mono';border:1px solid var(--tool-line);padding:8px 10px;white-space:nowrap}.status-pill{display:inline-block}.local-status i{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--tool-accent);margin-right:7px}
.ehko-drop-zone{min-height:150px;border:1px dashed var(--tool-line);background:var(--tool-sidebar);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px;cursor:pointer;transition:border-color .15s,background .15s}.ehko-drop-zone:hover,.ehko-drop-zone.is-dragging{border-color:var(--tool-accent);background:var(--tool-hover)}.ehko-drop-zone input{position:absolute;width:1px;height:1px;opacity:0}.ehko-drop-zone strong{font-size:15px}.ehko-drop-zone small{color:var(--tool-muted);font:11px 'DM Mono';margin-top:8px}.upload-icon{display:grid;place-items:center;width:40px;height:40px;border:1px solid var(--tool-accent);border-radius:50%;color:var(--tool-accent);font:22px 'DM Mono';margin-bottom:12px}
.url-row{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:end;margin-top:18px}.url-row label{display:block;color:var(--tool-muted);font:11px 'DM Mono';letter-spacing:.06em;text-transform:uppercase}.url-row input{display:block;width:100%;margin-top:8px;background:var(--tool-input);color:var(--tool-ink);border:1px solid var(--tool-line);padding:13px;font:13px 'DM Mono';outline:none}.url-row input:focus{border-color:var(--tool-accent)}.ehko-shell .primary-button{color:#111;background:var(--tool-accent);border:1px solid var(--tool-accent);padding:13px 16px;cursor:pointer;font:500 12px 'Space Grotesk';white-space:nowrap}.ehko-shell .primary-button:hover{filter:brightness(1.12)}.ehko-shell .primary-button b{font:18px 'DM Mono';font-weight:400;margin-left:14px}.ehko-shell .form-error{color:var(--tool-orange);font:11px 'DM Mono';margin:12px 0 0}
.ehko-player{background:var(--tool-sidebar)}.media-frame{position:relative;min-height:440px;background:var(--tool-deep);border:1px solid var(--tool-line);display:grid;place-items:center;overflow:hidden}.media-frame video,.media-frame iframe{display:block;width:100%;height:440px;border:0;background:#000}.media-frame video[hidden],.media-frame iframe[hidden],.empty-player[hidden]{display:none}.empty-player{text-align:center;color:#777}.empty-player span{display:block;color:var(--tool-accent);font:72px Georgia;line-height:1}.empty-player p{font:11px 'DM Mono';margin:18px 0 0}.transport{border:1px solid var(--tool-line);border-top:0;background:var(--tool-panel);padding:16px}.seek-row{display:flex;align-items:center;gap:12px;color:var(--tool-muted);font:10px 'DM Mono'}.seek-row input{flex:1;margin:0;accent-color:var(--tool-accent)}.transport-row{display:flex;justify-content:space-between;gap:14px;margin-top:16px}.transport-group{display:flex;align-items:center;gap:7px}.icon-button,.text-button{color:var(--tool-muted);background:transparent;border:1px solid var(--tool-line);padding:9px 11px;cursor:pointer;font:11px 'DM Mono'}.icon-button:hover,.text-button:hover,.text-button.active{color:var(--tool-accent);border-color:var(--tool-accent)}.play-button{width:42px;height:38px;color:#111;background:var(--tool-accent);border:1px solid var(--tool-accent);cursor:pointer;font:17px 'DM Mono'}.volume-control{display:flex;align-items:center;gap:8px;color:var(--tool-muted);font:10px 'DM Mono';margin-left:8px}.volume-control input{width:90px;margin:0;accent-color:var(--tool-accent)}
.queue-heading{margin-bottom:18px}.queue-actions{display:flex;align-items:center;gap:8px}.quiet-button{color:var(--tool-muted);background:transparent;border:1px solid var(--tool-line);padding:8px 10px;cursor:pointer;font:10px 'DM Mono'}.quiet-button:hover{color:var(--tool-accent);border-color:var(--tool-accent)}.playlist{display:grid;gap:7px}.playlist-item{display:flex;align-items:center;gap:12px;background:var(--tool-input);border:1px solid var(--tool-line);padding:11px 13px;transition:border-color .15s,background .15s}.playlist-item:hover,.playlist-item.active{border-color:var(--tool-accent)}.playlist-item.active{background:var(--tool-selected)}.playlist-item.is-dragging{opacity:.45}.track-main{display:flex;align-items:center;gap:13px;flex:1;min-width:0;text-align:left;color:var(--tool-ink);background:transparent;border:0;padding:0;cursor:pointer}.track-number{color:var(--tool-accent);font:11px 'DM Mono'}.track-copy{display:grid;gap:4px;min-width:0}.track-copy strong{font-size:13px;font-weight:500;overflow-wrap:anywhere}.track-copy small{color:var(--tool-muted);font:10px 'DM Mono'}.remove-track{color:var(--tool-muted);background:transparent;border:0;padding:5px;cursor:pointer;font:18px 'DM Mono'}.remove-track:hover{color:var(--tool-orange)}.drag-handle{color:#777;cursor:grab;font:18px 'DM Mono'}.queue-empty{text-align:center;border:1px dashed var(--tool-line);padding:34px;color:#777}.queue-empty span{display:block;color:var(--tool-accent);font:34px 'DM Mono'}.queue-empty p{font:11px 'DM Mono';margin:10px 0 0}.ehko-note{color:#777;text-align:center;font:11px 'DM Mono';margin:18px 0 0}
@media(max-width:760px){.ehko-shell{padding:0 12px 22px}.ehko-hero{padding:42px 4px 28px}.ehko-mark{width:60px;height:60px;font-size:26px}.ehko-import,.ehko-player,.ehko-queue{padding:22px 18px}.media-frame,.media-frame video,.media-frame iframe{min-height:300px;height:300px}.transport-row{display:block}.transport-group+.transport-group{margin-top:12px;flex-wrap:wrap}.volume-control{margin-left:0}.section-heading{gap:10px}}
@media(max-width:500px){.ehko-hero{display:block}.ehko-mark{margin-top:24px}.section-heading,.player-heading,.queue-heading{display:block}.local-status,.status-pill{display:inline-block;margin-top:14px}.url-row{display:block}.url-row .primary-button{width:100%;margin-top:12px}.queue-actions{margin-top:14px}.volume-control{width:100%}.volume-control input{flex:1}}

/* NullClock */
.clock-shell,.color-shell,.crypt-shell{max-width:1120px;margin:auto;padding:0 24px 32px;color:var(--tool-ink)}
.clock-shell>header,.color-shell>header,.crypt-shell>header{margin-left:0;margin-right:0}
.clock-hero,.color-hero,.crypt-hero{display:flex;justify-content:space-between;align-items:end;padding:60px 10px 38px;border-bottom:1px solid var(--tool-line)}
.clock-hero h1,.color-hero h1,.crypt-hero h1{font-size:clamp(2.6rem,6vw,5rem);line-height:.94;letter-spacing:-.07em;max-width:700px;margin:0}.clock-hero .intro-copy,.color-hero .intro-copy,.crypt-hero .intro-copy{color:var(--tool-muted);font-size:16px;line-height:1.5;max-width:520px;margin:22px 0 0}.clock-mark,.color-mark,.crypt-mark{width:84px;height:84px;border:1px solid var(--tool-line);display:grid;place-items:center;color:var(--tool-accent);font:48px Georgia;transform:rotate(-8deg)}
.section-label{display:block;color:var(--tool-accent);font:500 11px 'DM Mono';letter-spacing:.16em;margin-bottom:9px}.clock-display{display:flex;justify-content:space-between;align-items:end;background:var(--tool-panel);border:1px solid var(--tool-line);margin-top:24px;padding:30px}.time-display{font:500 clamp(3rem,9vw,7rem) 'DM Mono';letter-spacing:-.08em;line-height:.95}.date-display{color:var(--tool-muted);font:12px 'DM Mono';margin:16px 0 0}.timezone-field,.inline-form label,.color-fields label,.crypt-field,.ascii-field{display:block;color:var(--tool-muted);font:11px 'DM Mono';letter-spacing:.06em;text-transform:uppercase}.timezone-field{width:270px}.timezone-field select,.inline-form input,.crypt-field select{display:block;width:100%;margin-top:8px;background:var(--tool-input);color:var(--tool-ink);border:1px solid var(--tool-line);padding:13px;font:13px 'DM Mono';outline:none}.clock-tabs{display:flex;gap:7px;margin-top:20px}.clock-tab{color:var(--tool-muted);background:transparent;border:1px solid var(--tool-line);padding:12px 18px;cursor:pointer;font:12px 'DM Mono'}.clock-tab:hover,.clock-tab.active{background:var(--tool-accent);border-color:var(--tool-accent);color:#111}.clock-panel{background:var(--tool-panel);border:1px solid var(--tool-line);padding:30px;margin-top:10px}.clock-panel[hidden]{display:none}.panel-heading{display:flex;justify-content:space-between;align-items:start;margin-bottom:24px}.panel-heading h2{font-size:27px;letter-spacing:-.04em;margin:0}.status-pill{color:var(--tool-muted);font:10px 'DM Mono';border:1px solid var(--tool-line);padding:8px 10px;white-space:nowrap}.inline-form{display:grid;grid-template-columns:1fr 1fr auto;gap:14px;align-items:end}.inline-form input{display:block;width:100%;margin-top:8px;background:var(--tool-input);color:var(--tool-ink);border:1px solid var(--tool-line);padding:13px;font:13px 'DM Mono';outline:none}.primary-button{display:flex;justify-content:space-between;align-items:center;color:#111;background:var(--tool-accent);border:1px solid var(--tool-accent);padding:13px 16px;cursor:pointer;font:500 12px 'Space Grotesk';white-space:nowrap}.primary-button:hover{filter:brightness(1.12)}.primary-button b{font:18px 'DM Mono';font-weight:400;margin-left:15px}.clock-list{display:grid;gap:7px;margin-top:22px}.clock-item{display:flex;align-items:center;gap:8px;background:var(--tool-input);border:1px solid var(--tool-line);padding:12px 14px}.clock-item strong{flex:1;font:500 16px 'DM Mono'}.clock-item span{flex:1;color:var(--tool-muted);font:12px 'DM Mono'}.clock-item.muted{opacity:.55}.clock-item.ringing{border-color:var(--tool-accent);animation:clock-pulse 1s ease-in-out infinite alternate}.small-button,.secondary-button,.quiet-button{color:var(--tool-muted);background:transparent;border:1px solid var(--tool-line);padding:9px 11px;cursor:pointer;font:10px 'DM Mono'}.small-button:hover,.secondary-button:hover,.quiet-button:hover{color:var(--tool-accent);border-color:var(--tool-accent)}.small-button.danger:hover{color:var(--tool-orange);border-color:var(--tool-orange)}.list-empty{color:#777;border:1px dashed var(--tool-line);padding:25px;text-align:center;font:11px 'DM Mono'}.stopwatch-display{background:var(--tool-deep);border:1px solid var(--tool-line);padding:30px;text-align:center;color:var(--tool-accent);font:500 clamp(2.5rem,7vw,5rem) 'DM Mono';letter-spacing:.05em}.stopwatch-actions{display:flex;gap:8px;margin-top:14px}.stopwatch-actions .primary-button{min-width:130px}.clock-note,.color-note{color:#777;text-align:center;font:11px 'DM Mono';margin:18px 0 0}@keyframes clock-pulse{to{box-shadow:0 0 0 4px color-mix(in srgb,var(--tool-accent) 20%,transparent)}}

/* Migrated tool pages */
.portal-shell,.redirect-shell,.regex-shell,.wol-shell,.rng-shell,.webuild-shell{max-width:1120px;margin:auto;padding:0 24px 34px;color:var(--tool-ink)}
.portal-hero,.redirect-hero,.regex-hero,.wol-hero,.rng-hero,.webuild-hero{display:flex;justify-content:space-between;align-items:end;padding:60px 10px 38px;border-bottom:1px solid var(--tool-line)}
.portal-hero h1,.redirect-hero h1,.regex-hero h1,.wol-hero h1,.rng-hero h1,.webuild-hero h1{font-size:clamp(2.6rem,6vw,5rem);line-height:.94;letter-spacing:-.07em;max-width:700px;margin:0}
.portal-hero .intro-copy,.redirect-hero .intro-copy,.regex-hero .intro-copy,.wol-hero .intro-copy,.rng-hero .intro-copy,.webuild-hero .intro-copy{color:var(--tool-muted);font-size:16px;line-height:1.5;max-width:540px;margin:22px 0 0}
.portal-mark,.redirect-mark,.regex-mark,.wol-mark,.rng-mark,.webuild-mark{width:84px;height:84px;border:1px solid var(--tool-line);display:grid;place-items:center;color:var(--tool-accent);font:48px 'DM Mono';transform:rotate(-8deg)}
.portal-shell>.portal-hero,.redirect-shell>.redirect-hero,.regex-shell>.regex-hero,.wol-shell>.wol-hero,.rng-shell>.rng-hero,.webuild-shell>.webuild-hero{border-top:0;border-right:0;border-bottom:1px solid var(--tool-line);border-left:0;border-radius:0;margin:0;min-height:0}
.portal-shell .eyebrow,.redirect-shell .eyebrow,.regex-shell .eyebrow,.wol-shell .eyebrow,.rng-shell .eyebrow,.webuild-shell .eyebrow,.portal-shell .section-label,.redirect-shell .section-label,.regex-shell .section-label,.wol-shell .section-label,.rng-shell .section-label,.webuild-shell .section-label{color:var(--tool-accent);font:500 11px 'DM Mono';letter-spacing:.16em}
.portal-shell .eyebrow,.redirect-shell .eyebrow,.regex-shell .eyebrow,.wol-shell .eyebrow,.rng-shell .eyebrow,.webuild-shell .eyebrow{margin:0 0 13px}
.portal-panel,.portal-preview,.redirect-panel,.regex-builder,.regex-test,.wol-panel,.rng-panel,.rng-history,.webuild-sidebar,.webuild-stage-section{background:var(--tool-panel);border:1px solid var(--tool-line);margin-top:24px;padding:28px 30px;min-width:0}
.portal-shell .panel-heading,.redirect-shell .panel-heading,.regex-shell .panel-heading,.wol-shell .panel-heading,.rng-shell .panel-heading,.webuild-shell .panel-heading{display:flex;justify-content:space-between;align-items:start;margin-bottom:22px}
.portal-shell .panel-heading h2,.redirect-shell .panel-heading h2,.regex-shell .panel-heading h2,.wol-shell .panel-heading h2,.rng-shell .panel-heading h2,.webuild-shell .panel-heading h2{font-size:25px;letter-spacing:-.04em;margin:8px 0 0}
.portal-shell .status-pill,.redirect-shell .status-pill,.regex-shell .status-pill,.wol-shell .status-pill,.rng-shell .status-pill,.webuild-shell .status-pill{color:var(--tool-muted);font:10px 'DM Mono';border:1px solid var(--tool-line);padding:8px 10px;white-space:nowrap}
.portal-form,.rng-form{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:14px;align-items:end}
.portal-form label,.redirect-field,.regex-field,.wol-field,.rng-form label,.inspector-field{display:block;color:var(--tool-muted);font:11px 'DM Mono';letter-spacing:.05em;text-transform:uppercase}
.portal-form input,.redirect-field input,.regex-field input,.regex-field textarea,.regex-workspace select,.wol-field input,.rng-form input,.rng-form select,.webuild-inspector input,.webuild-export textarea{display:block;width:100%;margin-top:8px;background:var(--tool-input);color:var(--tool-ink);border:1px solid var(--tool-line);border-radius:0;padding:13px;font:13px 'DM Mono';outline:none}
.portal-form input:focus,.redirect-field input:focus,.regex-field input:focus,.regex-field textarea:focus,.regex-workspace select:focus,.wol-field input:focus,.rng-form input:focus,.rng-form select:focus,.webuild-inspector input:focus,.webuild-export textarea:focus{border-color:var(--tool-accent)}
.portal-shell .primary-button,.redirect-shell .primary-button,.regex-shell .primary-button,.wol-shell .primary-button,.rng-shell .primary-button,.webuild-shell .primary-button{display:flex;justify-content:space-between;align-items:center;color:#111;background:var(--tool-accent);border:1px solid var(--tool-accent);padding:13px 16px;cursor:pointer;font:500 12px 'Space Grotesk';white-space:nowrap}
.portal-shell .primary-button:hover,.redirect-shell .primary-button:hover,.regex-shell .primary-button:hover,.wol-shell .primary-button:hover,.rng-shell .primary-button:hover,.webuild-shell .primary-button:hover{filter:brightness(1.12)}
.portal-shell .primary-button b,.redirect-shell .primary-button b,.regex-shell .primary-button b,.wol-shell .primary-button b,.rng-shell .primary-button b,.webuild-shell .primary-button b{font:18px 'DM Mono';font-weight:400;margin-left:15px}
.portal-shell .form-error,.redirect-shell .form-error,.regex-shell .form-error,.wol-shell .form-error,.rng-shell .form-error{color:var(--tool-orange);font:11px 'DM Mono';margin:12px 0 0}
.portal-preview iframe{display:block;width:100%;height:min(68vh,720px);min-height:420px;background:var(--tool-deep);border:1px solid var(--tool-line)}
.portal-preview .preview-actions,.result-actions,.export-actions{display:flex;gap:8px;flex-wrap:wrap}
.portal-shell .quiet-button,.redirect-shell .secondary-button,.regex-shell .quiet-button,.wol-shell .quiet-button,.rng-shell .quiet-button,.webuild-shell .quiet-button,.webuild-shell .secondary-button{display:inline-flex;align-items:center;justify-content:center;color:var(--tool-muted);background:transparent;border:1px solid var(--tool-line);padding:9px 11px;cursor:pointer;text-decoration:none;font:10px 'DM Mono'}
.portal-shell .quiet-button:hover,.redirect-shell .secondary-button:hover,.regex-shell .quiet-button:hover,.wol-shell .quiet-button:hover,.rng-shell .quiet-button:hover,.webuild-shell .quiet-button:hover,.webuild-shell .secondary-button:hover{color:var(--tool-accent);border-color:var(--tool-accent)}
.portal-shell .quiet-button:disabled,.webuild-shell .quiet-button:disabled{opacity:.45;cursor:not-allowed}
.portal-note,.redirect-note,.wol-note,.rng-note{color:var(--tool-muted);font:11px/1.6 'DM Mono';margin:16px 0 0}
.redirect-form{display:grid;gap:17px}.redirect-field small,.regex-field small{display:block;color:var(--tool-muted);font:10px/1.5 'DM Mono';letter-spacing:0;text-transform:none;margin-top:7px}.redirect-field span{color:var(--tool-muted);text-transform:none;letter-spacing:0}.redirect-result{border-top:1px solid var(--tool-line);margin-top:28px;padding-top:25px}.redirect-result .panel-heading{margin-bottom:18px}.redirect-result .result-actions{margin-top:12px}.redirect-result .redirect-field input[readonly]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.redirect-shell .form-status{color:var(--tool-muted);font:11px 'DM Mono';margin:12px 0 0}.router-message{background:var(--tool-panel);border:1px solid var(--tool-line);margin-top:24px;padding:30px}.router-message h2{font-size:27px;margin:9px 0}.router-message p{color:var(--tool-muted);font:12px/1.6 'DM Mono';margin:0 0 16px;overflow-wrap:anywhere}
.regex-workspace{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:1px;background:var(--tool-line);border:1px solid var(--tool-line);margin-top:24px}.regex-workspace .regex-builder,.regex-workspace .regex-test{margin:0;border:0;padding:28px 30px;min-width:0}.regex-field{margin:0 0 16px}.regex-field textarea{min-height:260px;resize:vertical;text-transform:none}.regex-workspace select{margin:0;text-transform:none}.builder-row{display:grid;grid-template-columns:1fr 1fr auto;gap:8px;margin:18px 0}.builder-row input{min-width:0;margin:0}.builder-row select{min-width:0}.regex-shell .pattern-preview{min-height:60px;overflow:auto;background:var(--tool-deep);border:1px solid var(--tool-line);padding:14px;color:var(--tool-accent);font:12px/1.6 'DM Mono';white-space:pre-wrap;overflow-wrap:anywhere}.match-output{min-height:260px;max-height:460px;overflow:auto;background:var(--tool-deep);border:1px solid var(--tool-line);padding:18px;color:var(--tool-ink);font:13px/1.7 'DM Mono';white-space:pre-wrap;overflow-wrap:anywhere}.match-output mark{background:var(--tool-accent);color:#111;padding:1px 2px}
.wol-form{display:grid;grid-template-columns:1.2fr 1fr .6fr auto;gap:12px;align-items:end}.wol-field input{font-variant-numeric:tabular-nums}.wol-shell .form-status,.rng-shell .form-status,.webuild-shell .form-status{color:var(--tool-muted);font:11px/1.5 'DM Mono';margin:12px 0 0}.form-status.is-error{color:var(--tool-orange)}.form-status.is-success{color:var(--tool-accent)}.wol-shell .primary-button:disabled{opacity:.55;cursor:wait}
.rng-form{grid-template-columns:1.15fr 1fr 1fr auto}.rng-shell .result-card{display:grid;grid-template-columns:1fr auto;align-items:center;gap:10px;background:var(--tool-deep);border:1px solid var(--tool-line);margin-top:22px;padding:20px}.rng-shell .result-card .section-label{grid-column:1/-1}.rng-shell .result-card strong{color:var(--tool-accent);font:500 clamp(2rem,6vw,3.4rem) 'DM Mono';overflow-wrap:anywhere}.rng-shell .result-card .quiet-button{grid-column:2;grid-row:2}.rng-history{margin-top:20px}.history-list{display:grid;gap:7px}.history-item{display:flex;justify-content:space-between;align-items:center;gap:12px;width:100%;background:var(--tool-input);border:1px solid var(--tool-line);padding:12px 14px;color:var(--tool-ink);cursor:pointer;text-align:left}.history-item:hover{border-color:var(--tool-accent)}.history-item span{font:13px 'DM Mono';overflow-wrap:anywhere}.history-item small{color:var(--tool-muted);font:10px 'DM Mono'}.list-empty{color:var(--tool-muted);border:1px dashed var(--tool-line);padding:24px;text-align:center;font:11px 'DM Mono'}.status-pill.status-warning{color:var(--tool-orange);border-color:var(--tool-orange)}
.webuild-workspace{display:grid;grid-template-columns:minmax(270px,340px) minmax(0,1fr);gap:18px;margin-top:24px;align-items:start}.webuild-sidebar,.webuild-stage-section{margin:0;padding:22px;min-width:0}.webuild-sidebar .panel-heading{margin-bottom:18px}.webuild-sidebar .panel-heading h2,.webuild-export .panel-heading h2{font-size:20px}.webuild-add-grid{display:grid;grid-template-columns:1fr 1fr;gap:7px}.webuild-add-grid button{display:flex;justify-content:space-between;align-items:center;background:var(--tool-input);border:1px solid var(--tool-line);color:var(--tool-ink);padding:11px;cursor:pointer;font:11px 'DM Mono'}.webuild-add-grid button:hover{border-color:var(--tool-accent)}.webuild-add-grid b{color:var(--tool-accent);font:15px 'DM Mono'}.inspector-section{border-top:1px solid var(--tool-line);margin-top:24px;padding-top:22px}.webuild-inspector{display:grid;grid-template-columns:1fr 1fr;gap:12px}.inspector-kind{grid-column:1/-1;color:var(--tool-accent);font:11px 'DM Mono';text-transform:uppercase}.inspector-empty{grid-column:1/-1;color:var(--tool-muted);font:11px/1.5 'DM Mono'}.inspector-field{font-size:9px}.webuild-inspector input{padding:9px;font-size:11px}.webuild-inspector input[type=color]{height:36px;padding:3px}.webuild-export-actions{display:grid;gap:8px;margin-top:22px}.webuild-export-actions .primary-button,.webuild-export-actions .quiet-button{width:100%}.webuild-stage-section{padding:20px}.stage-heading{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:14px}.stage-heading strong{display:block;color:var(--tool-ink);font-size:13px;margin-top:6px}.webuild-canvas{position:relative;min-height:720px;overflow:hidden;background-color:#20211f;background-image:linear-gradient(to right,color-mix(in srgb,var(--tool-line) 28%,transparent) 1px,transparent 1px),linear-gradient(to bottom,color-mix(in srgb,var(--tool-line) 28%,transparent) 1px,transparent 1px);background-size:24px 24px;border:1px solid var(--tool-line);touch-action:none}.canvas-empty{position:absolute;top:50%;left:50%;width:min(90%,360px);transform:translate(-50%,-50%);color:var(--tool-muted);font:11px/1.5 'DM Mono';text-align:center;pointer-events:none}.webuild-canvas .element{position:absolute;z-index:1;margin:0;padding:8px;border:1px dashed transparent;cursor:move;min-width:40px;min-height:24px;touch-action:none;overflow-wrap:anywhere}.webuild-canvas .element:hover,.webuild-canvas .element.is-selected{border-color:var(--tool-accent);outline:1px solid color-mix(in srgb,var(--tool-accent) 35%,transparent)}.webuild-canvas .element-button{display:grid;place-items:center;border:1px solid var(--tool-accent);font:500 13px 'Space Grotesk'}.webuild-canvas .element-image{object-fit:cover}.webuild-export{border-top:1px solid var(--tool-line);margin-top:22px;padding-top:20px}.webuild-export textarea{min-height:300px;resize:vertical;font-size:11px;line-height:1.5;white-space:pre}.webuild-export .panel-heading{align-items:center}.export-actions{justify-content:flex-end}
@media(max-width:900px){.wol-form{grid-template-columns:1fr 1fr}.wol-form .primary-button{grid-column:1/-1}.webuild-workspace{grid-template-columns:1fr}.webuild-sidebar{order:1}.webuild-stage-section{order:2}}
@media(max-width:760px){.portal-shell,.redirect-shell,.regex-shell,.wol-shell,.rng-shell,.webuild-shell{padding:0 12px 24px}.portal-hero,.redirect-hero,.regex-hero,.wol-hero,.rng-hero,.webuild-hero{padding:42px 4px 28px}.portal-mark,.redirect-mark,.regex-mark,.wol-mark,.rng-mark,.webuild-mark{width:60px;height:60px;font-size:34px}.portal-panel,.portal-preview,.redirect-panel,.regex-workspace .regex-builder,.regex-workspace .regex-test,.wol-panel,.rng-panel,.rng-history{padding:22px 18px}.portal-form,.rng-form{grid-template-columns:1fr}.portal-form .primary-button,.rng-form .primary-button{width:100%}.portal-preview .panel-heading,.redirect-result .panel-heading,.regex-shell .panel-heading,.wol-shell .panel-heading,.rng-shell .panel-heading{display:block}.portal-preview .preview-actions{margin-top:14px}.portal-preview iframe{min-height:320px}.regex-workspace{grid-template-columns:1fr}.regex-workspace .regex-test{border-top:1px solid var(--tool-line)}.builder-row{grid-template-columns:1fr 1fr}.builder-row .primary-button{grid-column:1/-1}.wol-form{grid-template-columns:1fr}.wol-form .primary-button{grid-column:auto}.rng-form{grid-template-columns:1fr 1fr}.rng-form label:first-child,.rng-form .primary-button{grid-column:1/-1}.webuild-canvas{min-height:560px}.webuild-shell .stage-heading{align-items:start}.webuild-stage-section{padding:14px}}
@media(max-width:500px){.portal-hero,.redirect-hero,.regex-hero,.wol-hero,.rng-hero,.webuild-hero{display:block}.portal-mark,.redirect-mark,.regex-mark,.wol-mark,.rng-mark,.webuild-mark{margin-top:24px}.portal-shell .panel-heading,.redirect-shell .panel-heading,.wol-shell .panel-heading,.rng-shell .panel-heading{display:block}.portal-shell .status-pill,.redirect-shell .status-pill,.wol-shell .status-pill,.rng-shell .status-pill{display:inline-block;margin-top:13px}.portal-form,.rng-form{grid-template-columns:1fr}.rng-form label:first-child,.rng-form .primary-button{grid-column:auto}.redirect-result .panel-heading{display:block}.result-actions{display:grid;grid-template-columns:1fr}.regex-workspace .regex-builder,.regex-workspace .regex-test{padding:20px 16px}.builder-row{grid-template-columns:1fr}.builder-row .primary-button{grid-column:auto}.webuild-inspector{grid-template-columns:1fr}.webuild-export .panel-heading{display:block}.export-actions{margin-top:12px;justify-content:start}.stage-heading{align-items:start}.webuild-canvas{min-height:480px}}

/* NullColor */
.color-workspace{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--tool-line);border:1px solid var(--tool-line);margin-top:24px}.color-panel{background:var(--tool-panel);padding:30px;min-width:0}.palette-controls{display:grid;grid-template-columns:1.3fr .7fr auto;gap:12px;align-items:end}.palette-controls label{display:block;color:var(--tool-muted);font:11px 'DM Mono';text-transform:uppercase}.palette-controls select,.palette-controls input[type=color],.color-fields input{display:block;width:100%;margin-top:8px;background:var(--tool-input);color:var(--tool-ink);border:1px solid var(--tool-line);padding:12px;font:13px 'DM Mono';outline:none}.palette-controls input[type=color]{height:42px;padding:3px}.palette-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:4px;margin-top:22px;min-height:86px}.color-swatch{min-height:96px;border:0;padding:9px;display:flex;flex-direction:column;justify-content:space-between;align-items:start;cursor:pointer;text-align:left}.color-swatch:hover{outline:2px solid var(--tool-ink);outline-offset:-4px}.color-swatch strong{font:10px 'DM Mono'}.color-swatch small{font:10px 'DM Mono';opacity:.7}.color-panel>.quiet-button{margin-top:15px}.color-preview{height:150px;display:grid;place-items:center;border:1px solid var(--tool-line);color:#fff;font:500 18px 'DM Mono';text-shadow:0 1px 3px #000}.color-fields{display:grid;gap:12px;margin-top:20px}.color-fields label{display:block;color:var(--tool-muted);font:11px 'DM Mono';text-transform:uppercase}.color-fields input{margin-top:7px}.color-panel>.primary-button{width:100%;margin-top:18px}.status-pill.error{color:var(--tool-orange);border-color:var(--tool-orange)}

/* NullCrypt */
.crypt-workspace{display:grid;grid-template-columns:minmax(0,1fr) 310px;gap:1px;background:var(--tool-line);border:1px solid var(--tool-line);margin-top:24px}.crypt-main,.crypt-library{background:var(--tool-panel);padding:30px;min-width:0}.crypt-library{background:var(--tool-sidebar)}.crypt-textarea{display:block;width:100%;min-height:150px;resize:vertical;background:var(--tool-input);color:var(--tool-ink);border:1px solid var(--tool-line);padding:16px;font:14px/1.6 'DM Mono';outline:none}.crypt-textarea:focus,.crypt-library select:focus,.crypt-library input:focus{border-color:var(--tool-accent)}.pipeline-heading{display:flex;justify-content:space-between;align-items:end;margin:30px 0 15px}.pipeline-heading h2,.crypt-library h2,.output-heading h2{font-size:22px;letter-spacing:-.03em;margin:0}.pipeline{display:grid;gap:7px}.pipeline-empty{border:1px dashed var(--tool-line);padding:28px;text-align:center;color:#777;font:11px 'DM Mono'}.pipeline-step{display:flex;align-items:center;gap:10px;background:var(--tool-input);border:1px solid var(--tool-line);padding:11px 13px}.step-number{color:var(--tool-accent);font:11px 'DM Mono'}.step-copy{display:grid;gap:4px;flex:1;min-width:0}.step-copy strong{font-size:13px}.step-copy small{color:var(--tool-muted);font:10px 'DM Mono';overflow-wrap:anywhere}.move-step,.remove-step{color:var(--tool-muted);background:transparent;border:0;padding:4px;cursor:pointer;font:14px 'DM Mono'}.move-step:hover{color:var(--tool-accent)}.remove-step:hover{color:var(--tool-orange)}.run-row{display:flex;align-items:center;gap:14px;margin-top:15px}.step-summary{color:#777;font:10px 'DM Mono'}.output-heading{margin-top:36px}.output-text{min-height:190px;color:var(--tool-accent)}.output-actions{display:flex;gap:8px;margin-top:12px}.form-error{color:var(--tool-orange);font:11px 'DM Mono';margin:12px 0 0}.crypt-field select{margin-bottom:17px}.step-options{display:grid;gap:13px}.step-options label{display:block;color:var(--tool-muted);font:11px 'DM Mono';text-transform:uppercase}.step-options input,.step-options select{display:block;width:100%;margin-top:7px;background:var(--tool-input);color:var(--tool-ink);border:1px solid var(--tool-line);padding:11px;font:13px 'DM Mono';outline:none}.add-step{width:100%;margin-top:18px}.library-note{border-top:1px solid var(--tool-line);margin-top:28px;padding-top:18px;color:var(--tool-muted);font:11px/1.5 'DM Mono'}.library-note strong{color:var(--tool-ink);font-family:'Space Grotesk'}.library-note p{margin:8px 0 0}.crypt-note{color:#777;text-align:center;font:11px 'DM Mono';margin:18px 0 0}
@media(max-width:760px){.clock-shell,.color-shell,.crypt-shell{padding:0 12px 22px}.clock-hero,.color-hero,.crypt-hero{padding:42px 4px 28px}.clock-mark,.color-mark,.crypt-mark{width:60px;height:60px;font-size:34px}.clock-display{display:block;padding:22px 18px}.timezone-field{width:100%;margin-top:24px}.clock-panel{padding:22px 18px}.inline-form{display:block}.inline-form label+label{margin-top:14px}.inline-form .primary-button{width:100%;margin-top:14px}.color-workspace{display:block}.color-panel{padding:22px 18px}.color-panel+.color-panel{border-top:1px solid var(--tool-line)}.palette-controls{grid-template-columns:1fr 1fr}.palette-controls .primary-button{grid-column:1/-1}.crypt-workspace{display:block}.crypt-main,.crypt-library{padding:22px 18px}.crypt-library{border-top:1px solid var(--tool-line)}}
@media(max-width:500px){.clock-hero,.color-hero,.crypt-hero{display:block}.clock-mark,.color-mark,.crypt-mark{margin-top:24px}.clock-tabs{overflow:auto}.clock-tab{white-space:nowrap}.palette-grid{grid-template-columns:repeat(3,1fr)}.palette-grid .color-swatch:nth-child(n+4){display:none}.time-display{font-size:3rem}.transport-row{display:block}}

/* NullB64, NullHex, NullImg, and NullCrypto */
.b64-shell,.hex-shell,.image-shell,.crypto-shell{max-width:1120px;margin:auto;padding:0 24px 32px;color:var(--tool-ink)}.b64-shell>header,.hex-shell>header,.image-shell>header,.crypto-shell>header{margin-left:0;margin-right:0}.b64-hero,.hex-hero,.image-hero,.crypto-hero{display:flex;justify-content:space-between;align-items:end;padding:60px 10px 38px;border-bottom:1px solid var(--tool-line)}.b64-hero h1,.hex-hero h1,.image-hero h1,.crypto-hero h1{font-size:clamp(2.6rem,6vw,5rem);line-height:.94;letter-spacing:-.07em;max-width:720px;margin:0}.b64-hero .intro-copy,.hex-hero .intro-copy,.image-hero .intro-copy,.crypto-hero .intro-copy{color:var(--tool-muted);font-size:16px;line-height:1.5;max-width:520px;margin:22px 0 0}.b64-mark,.hex-mark,.image-mark,.crypto-mark{width:84px;height:84px;border:1px solid var(--tool-line);display:grid;place-items:center;color:var(--tool-accent);font:34px 'DM Mono';transform:rotate(-8deg)}.b64-workspace{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--tool-line);border:1px solid var(--tool-line);margin-top:24px}.b64-panel{background:var(--tool-panel);padding:30px;min-width:0}.panel-heading{display:flex;justify-content:space-between;align-items:start;margin-bottom:24px}.panel-heading h2{font-size:27px;letter-spacing:-.04em;margin:0}.section-label{display:block;color:var(--tool-accent);font:500 11px 'DM Mono';letter-spacing:.16em;margin-bottom:9px}.status-pill{color:var(--tool-muted);font:10px 'DM Mono';border:1px solid var(--tool-line);padding:8px 10px;white-space:nowrap}.file-drop{min-height:180px;border:1px dashed var(--tool-line);background:var(--tool-sidebar);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px;cursor:pointer}.file-drop:hover,.file-drop.is-dragging{border-color:var(--tool-accent);background:var(--tool-hover)}.file-drop input{position:absolute;width:1px;height:1px;opacity:0}.file-drop span{display:grid;place-items:center;width:42px;height:42px;border:1px solid var(--tool-accent);border-radius:50%;color:var(--tool-accent);font:22px 'DM Mono';margin-bottom:12px}.file-drop strong{font-size:15px}.file-drop small,.file-name,.tool-status,.b64-note{color:var(--tool-muted);font:11px 'DM Mono'}.file-drop small{margin-top:8px}.file-name{min-height:16px;margin:12px 0}.primary-button{display:flex;justify-content:space-between;align-items:center;color:#111;background:var(--tool-accent);border:1px solid var(--tool-accent);padding:13px 16px;cursor:pointer;font:500 12px 'Space Grotesk'}.primary-button:hover{filter:brightness(1.12)}.primary-button b{font:18px 'DM Mono';font-weight:400;margin-left:15px}.b64-panel>.primary-button{width:100%}.download-link{display:block;color:var(--tool-accent);font:11px 'DM Mono';margin-top:15px}.text-input,.hex-editor{display:block;width:100%;background:var(--tool-input);color:var(--tool-ink);border:1px solid var(--tool-line);padding:13px;font:13px 'DM Mono';outline:none}.text-input{margin-bottom:14px}.tool-status{min-height:16px;margin:14px 0 0}.b64-note{color:#777;text-align:center;margin:18px 0 0}
.hex-workspace{background:var(--tool-panel);border:1px solid var(--tool-line);margin-top:24px;padding:20px}.hex-toolbar{display:flex;align-items:center;gap:12px}.file-picker{display:inline-flex;align-items:center;color:#111;background:var(--tool-accent);padding:12px 14px;cursor:pointer;font:500 12px 'Space Grotesk'}.file-picker input{position:absolute;width:1px;height:1px;opacity:0}.hex-toolbar .status-pill{flex:1}.hex-toolbar .primary-button{white-space:nowrap}.hex-editor{min-height:560px;margin-top:16px;resize:vertical;line-height:1.55;color:var(--tool-accent);white-space:pre;tab-size:2}.form-error{color:var(--tool-orange);font:11px 'DM Mono';margin:12px 0 0}.hex-footer{display:flex;justify-content:space-between;color:#777;font:10px 'DM Mono';padding:12px 2px 0}
.image-workspace{display:grid;grid-template-columns:280px minmax(0,1fr);gap:1px;background:var(--tool-line);border:1px solid var(--tool-line);margin-top:24px;min-height:650px}.image-sidebar,.image-canvas-panel{background:var(--tool-panel);padding:24px;min-width:0}.image-sidebar{background:var(--tool-sidebar)}.image-drop{min-height:130px;border:1px dashed var(--tool-line);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:18px;cursor:pointer}.image-drop:hover,.image-drop.is-dragging{border-color:var(--tool-accent)}.image-drop input{position:absolute;width:1px;height:1px;opacity:0}.image-drop span{color:var(--tool-accent);font:24px 'DM Mono'}.image-drop strong{font-size:13px;margin-top:8px}.image-drop small{color:var(--tool-muted);font:10px 'DM Mono';margin-top:5px}.image-file-list{display:grid;gap:5px;margin-top:16px;max-height:220px;overflow:auto}.image-file{display:grid;gap:4px;width:100%;text-align:left;color:var(--tool-muted);background:var(--tool-input);border:1px solid var(--tool-line);padding:10px;cursor:pointer}.image-file:hover,.image-file.active{color:var(--tool-accent);border-color:var(--tool-accent)}.image-file strong{font-size:12px;overflow-wrap:anywhere}.image-file small,.tool-field{font:10px 'DM Mono'}.image-tools{display:grid;gap:8px;border-top:1px solid var(--tool-line);margin-top:18px;padding-top:18px}.tool-button{color:var(--tool-muted);background:transparent;border:1px solid var(--tool-line);padding:9px;text-align:left;cursor:pointer;font:10px 'DM Mono'}.tool-button:hover,.tool-button.active{color:var(--tool-accent);border-color:var(--tool-accent)}.tool-field{display:flex;align-items:center;justify-content:space-between;color:var(--tool-muted)}.tool-field input[type=color]{width:38px;height:26px;padding:2px;background:transparent;border:1px solid var(--tool-line)}.tool-field input[type=range]{width:120px;accent-color:var(--tool-accent)}.image-tools .primary-button{width:100%;margin-top:8px}.canvas-heading{display:flex;justify-content:space-between;align-items:start;margin-bottom:18px}.canvas-heading h2{font-size:24px;letter-spacing:-.04em;margin:0}.canvas-viewport{min-height:570px;background:var(--tool-deep);border:1px solid var(--tool-line);display:grid;place-items:center;overflow:auto;padding:24px}.canvas-viewport canvas{display:block;max-width:none;transform-origin:center center;cursor:crosshair}.canvas-viewport:not(.drawing) canvas{cursor:default}.canvas-empty{text-align:center;color:#777}.canvas-empty span{display:block;color:var(--tool-accent);font:65px Georgia}.canvas-empty p{font:11px 'DM Mono';margin-top:15px}
.crypto-summary{display:flex;align-items:center;gap:55px;background:var(--tool-panel);border:1px solid var(--tool-line);margin-top:24px;padding:24px 30px}.crypto-summary>div{display:grid;gap:6px}.crypto-summary strong{font:500 25px 'DM Mono';color:var(--tool-accent)}.crypto-summary small{color:#777;font:10px 'DM Mono'}.crypto-summary .quiet-button{margin-left:auto}.crypto-layout{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:1px;background:var(--tool-line);border:1px solid var(--tool-line);margin-top:12px}.market-panel,.portfolio-panel{background:var(--tool-panel);padding:30px;min-width:0}.portfolio-panel{background:var(--tool-sidebar)}.coin-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.coin-card{background:var(--tool-input);border:1px solid var(--tool-line);padding:15px}.coin-heading{display:flex;justify-content:space-between;gap:8px}.coin-heading div{display:grid;gap:4px}.coin-heading strong{font:500 16px 'DM Mono'}.coin-heading small{color:var(--tool-muted);font:10px 'DM Mono'}.coin-price{color:var(--tool-accent);font:12px 'DM Mono'}.trade-row{display:flex;gap:5px;margin-top:12px}.trade-row input{min-width:0;flex:1;background:var(--tool-panel);color:var(--tool-ink);border:1px solid var(--tool-line);padding:9px;font:10px 'DM Mono'}.small-button{color:var(--tool-muted);background:transparent;border:1px solid var(--tool-line);padding:8px 9px;cursor:pointer;font:10px 'DM Mono'}.small-button:hover{color:var(--tool-accent);border-color:var(--tool-accent)}.holdings{display:grid;gap:6px}.holding-row{display:flex;justify-content:space-between;align-items:center;background:var(--tool-input);border:1px solid var(--tool-line);padding:11px}.holding-row span{display:grid;gap:4px}.holding-row strong{font:12px 'DM Mono'}.holding-row small{color:var(--tool-muted);font:10px 'DM Mono'}.holding-row b{color:var(--tool-accent);font:11px 'DM Mono'}.portfolio-panel canvas{width:100%;height:auto;margin-top:22px;border-top:1px solid var(--tool-line)}.market-empty{color:#777;border:1px dashed var(--tool-line);padding:30px;text-align:center;font:11px 'DM Mono'}.crypto-note{color:#777;text-align:center;font:11px 'DM Mono';margin:18px 0 0}
@media(max-width:760px){.b64-shell,.hex-shell,.image-shell,.crypto-shell{padding:0 12px 22px}.b64-hero,.hex-hero,.image-hero,.crypto-hero{padding:42px 4px 28px}.b64-mark,.hex-mark,.image-mark,.crypto-mark{width:60px;height:60px;font-size:28px}.b64-workspace,.crypto-layout{display:block}.b64-panel+.b64-panel,.portfolio-panel{border-top:1px solid var(--tool-line)}.hex-toolbar{flex-wrap:wrap}.hex-toolbar .status-pill{order:3;flex-basis:100%}.image-workspace{display:block}.image-sidebar{border-bottom:1px solid var(--tool-line)}.canvas-viewport{min-height:400px}.crypto-summary{flex-wrap:wrap;gap:20px;padding:22px 18px}.crypto-summary .quiet-button{margin-left:0}.coin-grid{grid-template-columns:1fr}.market-panel,.portfolio-panel{padding:22px 18px}}
@media(max-width:500px){.b64-hero,.hex-hero,.image-hero,.crypto-hero{display:block}.b64-mark,.hex-mark,.image-mark,.crypto-mark{margin-top:24px}.hex-toolbar .primary-button{width:100%}.canvas-heading{display:block}.crypto-summary>div{width:100%}}
