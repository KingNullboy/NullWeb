<?php
$title = "Editor";
$navbarLogoRelPath = "../";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/meta.php"; ?>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.14/codemirror.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.14/theme/dracula.min.css">
    <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
</head>
<body>
<main class="editor-shell">
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/navbar.php"; ?>
    <div id="app">
        <aside id="sidebar">
            <div class="sidebar-title"><span>EXPLORER</span><small id="fileCount">0 files</small></div>
            <div id="sidebarHeader"><button id="newFileBtn" type="button">+ File</button><button id="newFolderBtn" type="button">+ Folder</button></div>
            <div class="sidebar-actions"><button id="extensionsBtn" type="button">Extensions</button><button id="newConsoleBtn" type="button">Console</button></div>
            <div id="fileTree" aria-label="File tree"></div>
            <div id="extensionsPanel" style="display:none"><h4>Extensions</h4><div id="extensionsList"></div></div>
        </aside>
        <section id="mainArea">
            <div id="editorToolbar"><div class="toolbar-group"><button id="togglePreview" type="button">Preview <span>ON</span></button><label for="highlightLang">Language<select id="highlightLang"><option value="javascript">JavaScript</option><option value="htmlmixed">HTML</option><option value="css">CSS</option><option value="python">Python</option><option value="java">Java</option><option value="c">C</option><option value="cpp">C++</option><option value="json">JSON</option><option value="markdown">Markdown</option></select></label><label for="formatLang">Format<select id="formatLang"><option value="">Format…</option><option value="javascript">JavaScript</option><option value="html">HTML</option><option value="css">CSS</option><option value="json">JSON</option><option value="markdown">Markdown</option></select></label></div><div class="toolbar-meta"><span id="activeFile">No file selected</span><span>Ctrl ⇧ F to format</span></div></div>
            <div id="editorPreviewContainer"><div class="editor-pane"><div class="pane-label">SOURCE</div><textarea id="editor" placeholder="Create or upload a file to start editing..."></textarea></div><div class="preview-pane"><div class="pane-label">PREVIEW</div><iframe id="preview" title="Live preview"></iframe></div></div>
            <div id="consoleContainer"></div>
        </section>
    </div>
</main>
<div id="contextMenu"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.14/codemirror.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.14/mode/javascript/javascript.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.14/mode/htmlmixed/htmlmixed.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.14/mode/css/css.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.14/mode/markdown/markdown.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.14/mode/xml/xml.min.js"></script>
<script src="https://unpkg.com/prettier@3.6.2/standalone.js"></script><script src="https://unpkg.com/prettier@3.6.2/plugins/estree.js"></script><script src="https://unpkg.com/prettier@3.6.2/plugins/babel.js"></script><script src="https://unpkg.com/prettier@3.6.2/plugins/html.js"></script><script src="https://unpkg.com/prettier@3.6.2/plugins/postcss.js"></script><script src="https://unpkg.com/prettier@3.6.2/plugins/json.js"></script><script src="https://unpkg.com/prettier@3.6.2/plugins/markdown.js"></script><script src="https://raw.githubusercontent.com/nullmedia-social/NullWeb/refs/heads/main/js/md%2B.js"></script>
<script src="script.js"></script>
</body>
</html>
