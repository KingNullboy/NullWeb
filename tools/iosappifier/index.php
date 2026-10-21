<?php
$title = "iOS Appifier";
$navbarLogoRelPath = "../../";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/meta.php"; ?>
</head>
<body>
<main class="appifier-shell">
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/navbar.php"; ?>
    <header class="page-intro"><div><p class="eyebrow">IOS WEB CLIP</p><h1>Turn a website into an iPhone icon.</h1><p class="intro-copy">Fill in the details, choose an image, and download an installable configuration profile.</p></div><div class="intro-mark" aria-hidden="true">⌁</div></header>
    <form id="appifierForm" class="appifier-workspace" novalidate>
        <section class="form-panel"><div class="section-heading"><span>01</span><div><h2>App details</h2><p>These values appear on the Home Screen and in the profile.</p></div></div><div class="field-grid">
            <label class="field field-wide" for="dispName">Display name <input id="dispName" name="dispName" type="text" maxlength="64" placeholder="My Web App" autocomplete="off" required></label>
            <label class="field" for="url">Website URL <input id="url" name="url" type="url" placeholder="https://example.com" required></label>
            <label class="field" for="organ">Organization <input id="organ" name="organ" type="text" maxlength="128" placeholder="Your name or company" required></label>
        </div><details id="advancedOptions" class="advanced-options"><summary><span>Advanced profile settings</span><small>Identifiers and installation metadata</small></summary><div class="advanced-content"><div class="advanced-intro"><p>Identifiers are only used to label this profile. If you are unsure, use the suggestions below. They update automatically as you type.</p><button id="suggestIds" class="suggest-button" type="button" style="appearance:none;background:#c8f169;border:1px solid #c8f169;border-radius:2px;color:#111;cursor:pointer;font:500 11px 'DM Mono';padding:10px 13px;white-space:nowrap">Suggest IDs</button></div><div class="field-grid"><label class="field" for="payId">Payload identifier <input id="payId" name="payId" type="text" maxlength="128" placeholder="com.example.webclip" required><small class="field-help">Example: com.yourname.app.webclip</small></label><label class="field" for="profId">Profile identifier <input id="profId" name="profId" type="text" maxlength="128" placeholder="com.example.profile" required><small class="field-help">Example: com.yourname.app.profile</small></label></div><p id="idSuggestion" class="suggestion-note" aria-live="polite"></p></div></details></section>
        <section class="form-panel icon-panel"><div class="section-heading"><span>02</span><div><h2>App icon</h2><p>PNG, JPEG, GIF, or WebP. The image is converted automatically in your browser.</p></div></div>
            <label id="dropZone" class="drop-zone" for="iconFile" tabindex="0"><input id="iconFile" name="iconFile" type="file" accept="image/png,image/jpeg,image/gif,image/webp" required><span class="upload-icon">↑</span><strong id="fileLabel">Drop an image here or choose a file</strong><small id="fileHint">Your image stays on this device and becomes profile data when you download.</small></label>
            <div id="iconError" class="field-error" role="alert" hidden></div>
            <div class="icon-preview" id="iconPreview" hidden><img id="previewImage" alt="Selected app icon preview"><div><strong>Icon ready</strong><span id="imageDetails"></span></div><button id="removeIcon" type="button">Remove</button></div>
        </section>
        <aside class="summary-panel"><div class="summary-icon" id="summaryIcon"><span>⌁</span><img id="summaryImage" alt="" hidden></div><div class="summary-copy"><span class="summary-label">Home Screen preview</span><strong id="summaryName">Your app</strong><small id="summaryUrl">example.com</small></div><button class="download-button" type="submit"><span>Download profile</span><b>↓</b></button></aside>
        <p class="form-note" id="formStatus" role="status">The profile is generated locally. Install it from Safari on your iPhone.</p>
    </form>
</main>
<script src="iosapp.js?v=3"></script>
</body>
</html>
