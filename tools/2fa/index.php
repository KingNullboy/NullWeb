<?php
$title = "Null2FA";
$navbarLogoRelPath = "../";
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/meta.php"; ?>
</head>
<body>
<main class="twofa-shell">
  <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/navbar.php"; ?>
  <header class="page-header"><div><p class="eyebrow">LOCAL AUTHENTICATOR</p><h1>Null2FA</h1><p class="intro">Generate time-based authentication codes without sending secrets anywhere.</p></div><div class="security-mark" aria-hidden="true">⌁</div></header>
  <section class="toolbar" aria-label="Account tools"><div><span class="section-label">YOUR ACCOUNTS</span><strong id="accountCount">0 accounts</strong></div><div class="toolbar-actions"><button id="exportButton" type="button">Export JSON</button><button id="importButton" type="button">Import JSON</button><input id="importFile" type="file" accept="application/json,.json" hidden></div></section>
  <section class="add-panel"><div class="panel-heading"><div><span class="section-label">ADD ACCOUNT</span><h2>Set up an authenticator</h2></div><span class="storage-note"><i></i> Browser only</span></div><form id="accountForm" class="account-form"><label for="label">Account name<input id="label" type="text" placeholder="GitHub, email, or service name" maxlength="80" required></label><label for="secret">Secret key<input id="secret" type="text" placeholder="Base32 secret" autocomplete="off" autocapitalize="characters" spellcheck="false" required><small>Paste the setup key from your service. Spaces and dashes are removed automatically.</small></label><label for="note">Note <span>(optional)</span><input id="note" type="text" placeholder="Personal, work, backup..." maxlength="120"></label><input id="editingIndex" type="hidden" value=""><div class="form-actions"><button id="cancelEdit" class="quiet-button" type="button" hidden>Cancel</button><button id="saveAccount" class="primary-button" type="submit">Add account <b>+</b></button></div><p id="formError" class="form-error" role="alert" hidden></p></form></section>
  <section class="codes-section"><div class="codes-heading"><div><span class="section-label">CURRENT CODES</span><h2>Tap a code to copy it</h2></div><div id="timer" class="timer">Waiting for an account</div></div><div id="accounts-container" class="accounts-container"><div class="empty-state"><span>⌁</span><h3>No accounts yet</h3><p>Add an account above or import a JSON backup to get started.</p></div></div></section>
  <p class="privacy-note">Secrets are saved in this browser's local storage. Export a backup before clearing site data.</p>
</main>
<script src="script.js?v=3"></script>
</body>
</html>
