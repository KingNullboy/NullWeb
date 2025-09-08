document.addEventListener("DOMContentLoaded", () => {
    // ===== GLOBAL STATE =====
    const files = {}; if (!files[""]) { files[""] = { type: "folder", content: "", children: [] }; }
    let currentFile = null;
    let livePreviewEnabled = true;
    let clipboard = [];
    let cutMode = false;
    let multiSelect = new Set();

    // ===== DOM ELEMENTS =====
    const editorTextarea = document.getElementById("editor");
    const preview = document.getElementById("preview");
    const togglePreviewBtn = document.getElementById("togglePreview");
    const newFileBtn = document.getElementById("newFileBtn");
    const newFolderBtn = document.getElementById("newFolderBtn");
    const fileTree = document.getElementById("fileTree");
    const highlightSelect = document.getElementById("highlightLang");
    const formatSelect = document.getElementById("formatLang");
    const contextMenu = document.getElementById("contextMenu");

    // ===== CODEMIRROR =====
    const editor = CodeMirror.fromTextArea(editorTextarea, {
        lineNumbers: true,
        theme: "dracula",
        mode: "javascript",
        indentUnit: 2,
        tabSize: 4,
        indentWithTabs: true,
    });

    // ===== UTILS =====
    function getEditorContent() { return editor.getValue(); }
    function setEditorContent(content) { editor.setValue(content); updatePreview(); }
    function setEditorMode(mode) { editor.setOption("mode", mode); }
    function saveFiles() {
        if (currentFile && files[currentFile]) files[currentFile].content = getEditorContent();
        localStorage.setItem("nullnotes-files", JSON.stringify(files));
        updatePreview();
    }

    function loadFiles() {
        const stored = localStorage.getItem("nullnotes-files");
        if (stored) Object.assign(files, JSON.parse(stored));
    }

    function createFile(name, type = "file", parent = null, content = "") {
        const path = parent ? `${parent}/${name}` : name;
        if (files[path]) return null;
        files[path] = { content, type, children: [] };

        // Add to parent folder's children
        const parentFolder = parent ?? "";  // root folder if parent null
        if (!files[parentFolder].children.includes(path)) {
            files[parentFolder].children.push(path);
        }

        updateSidebar();
        saveFiles();
        return path;
    }

    function deleteFile(path) {
        if (!files[path]) return;
        if (files[path].type === "folder") files[path].children.forEach(deleteFile);
        delete files[path];
        for (let k in files) if (files[k].children) files[k].children = files[k].children.filter(c => c !== path);
        if (currentFile === path) { setEditorContent(""); currentFile = null; }
        multiSelect.delete(path);
        updateSidebar();
        saveFiles();
    }

    // ===== SIDEBAR =====
    function updateSidebar() {
        fileTree.innerHTML = "";

        function renderFolderChildren(folderPath, container) {
            files[folderPath].children.forEach(child => {
                const itemNode = renderItemNode(child);
                container.appendChild(itemNode);

                if (files[child].type === "folder") {
                    const childrenContainer = itemNode.querySelector(".folder-children");
                    if (childrenContainer) renderFolderChildren(child, childrenContainer);
                }
            });
        }

        // Start from root folder
        const rootContainer = document.createElement("div");
        files[""].children.forEach(child => rootContainer.appendChild(renderItemNode(child)));
        fileTree.appendChild(rootContainer);
    }

    function renderItemNode(path) {
        const item = document.createElement("div");
        item.className = "sidebar-item";
        item.textContent = path.split("/").pop();
        item.dataset.path = path;

        if (multiSelect.has(path)) item.classList.add("selected");

        if (files[path].type === "folder") {
            item.classList.add("folder");

            const childrenContainer = document.createElement("div");
            childrenContainer.className = "folder-children";
            childrenContainer.style.display = "none"; // hide children initially

            files[path].children.forEach(child => {
                childrenContainer.appendChild(renderItemNode(child));
            });
            item.appendChild(childrenContainer);

            item.addEventListener("click", e => {
                e.stopPropagation();
                // Toggle folder open/close
                childrenContainer.style.display = childrenContainer.style.display === "none" ? "block" : "none";
                // Folders are not selectable as currentFile, so don't call handleSelection
            });
        } else {
            item.addEventListener("click", e => handleSelection(path, e));
        }

        // Context menu for both files and folders
        item.addEventListener("contextmenu", e => {
            e.preventDefault();
            showContextMenu(e.pageX, e.pageY, path);
        });

        return item;
    }

    function handleSelection(path, e) {
        if (e.shiftKey || e.ctrlKey) {
            if (multiSelect.has(path)) multiSelect.delete(path);
            else multiSelect.add(path);
        } else { multiSelect.clear(); multiSelect.add(path); }
        currentFile = path;
        if (files[path].type === "file") setEditorContent(files[path].content);
        updateSidebar();
    }

    // ===== CONTEXT MENU =====
    function showContextMenu(x, y, path) {
        contextMenu.style.display = "none";
        contextMenu.innerHTML = "";
        const actions = [
            { label: "Rename", fn: () => rename(path) },
            { label: "Delete", fn: () => deleteFile(path) },
            { label: "Download", fn: () => download() },
            { label: "Upload File(s)", fn: () => uploadFiles(path) },
            { label: "Upload Folder", fn: () => uploadFolder(path) },
            { label: "Copy", fn: () => copy() },
            { label: "Cut", fn: () => cut() },
            { label: "Paste", fn: () => paste(path) }
        ];
        actions.forEach(a => {
            const li = document.createElement("div");
            li.textContent = a.label;
            li.style.padding = "5px";
            li.style.cursor = "pointer";
            li.addEventListener("click", () => { a.fn(); contextMenu.style.display = "none"; });
            contextMenu.appendChild(li);
        });
        contextMenu.style.left = x + "px";
        contextMenu.style.top = y + "px";
        contextMenu.style.display = "block";
    }

    document.addEventListener("click", () => contextMenu.style.display = "none");

    // ===== CONTEXT MENU ACTIONS =====
    function rename(path) {
        if (!files[path]) return;

        const newName = prompt("New name:", path.split("/").pop());
        if (!newName) return;

        const parent = path.includes("/") ? path.split("/").slice(0, -1).join("/") : "";
        const newPath = parent ? `${parent}/${newName}` : newName;

        // Prevent overwriting
        if (files[newPath]) { alert("A file/folder with that name already exists"); return; }

        function updatePaths(oldPath, newPath) {
            const item = files[oldPath];
            files[newPath] = { ...item, children: [...item.children] };

            // Update children recursively if folder
            if (item.type === "folder") {
                item.children.forEach(child => {
                    const childName = child.split("/").pop();
                    const childNewPath = `${newPath}/${childName}`;
                    updatePaths(child, childNewPath);

                    // Update parent's children reference
                    files[newPath].children = files[newPath].children.map(c => c === child ? childNewPath : c);
                });
            }

            // Remove old item
            delete files[oldPath];
        }

        updatePaths(path, newPath);

        // Update parent folder's children array
        if (files[parent]) {
            files[parent].children = files[parent].children.map(c => c === path ? newPath : c);
        }

        currentFile = newPath;
        if (files[newPath].type === "file") setEditorContent(files[newPath].content);
        updateSidebar();
        saveFiles();
    }

    function download() {
        const targets = multiSelect.size > 0 ? Array.from(multiSelect) : [currentFile];
        targets.forEach(p => {
            if (!files[p]) return;
            const blob = new Blob([files[p].content], { type: "text/plain" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = p.split("/").pop();
            a.click();
            URL.revokeObjectURL(a.href);
        });
    }

    function ensureFolder(path) {
        if (!path) return null;
        if (files[path]) return path;
        const parent = path.includes("/") ? path.split("/").slice(0, -1).join("/") : null;
        if (parent) ensureFolder(parent);
        return createFile(path.split("/").pop(), "folder", parent);
    }

    function uploadFiles(parentFolder = null) {
        const input = document.createElement("input");
        input.type = "file";
        input.multiple = true;

        input.addEventListener("change", e => {
            Array.from(e.target.files).forEach(file => {
                const reader = new FileReader();
                reader.onload = ev => {
                    if (parentFolder) ensureFolder(parentFolder);
                    createFile(file.name, "file", parentFolder, ev.target.result);
                };
                reader.readAsText(file);
            });
        });

        input.click();
    }

    function uploadFolder(parentFolder = null) {
        const input = document.createElement("input");
        input.type = "file";
        input.multiple = true;
        input.webkitdirectory = true;

        input.addEventListener("change", e => {
            Array.from(e.target.files).forEach(f => {
                const parts = f.webkitRelativePath.split("/");
                let path = parentFolder || "";

                // Create folder hierarchy
                for (let i = 0; i < parts.length - 1; i++) {
                    const folderPath = path ? `${path}/${parts[i]}` : parts[i];
                    ensureFolder(folderPath);
                    path = folderPath;
                }

                // Create the file
                const reader = new FileReader();
                reader.onload = ev => createFile(parts[parts.length - 1], "file", path, ev.target.result);
                reader.readAsText(f);
            });
        });

        input.click();
    }

    function copy() { clipboard = Array.from(multiSelect); cutMode = false; }
    function cut() { clipboard = Array.from(multiSelect); cutMode = true; }
    function paste(target) {
        // Default to root if target not provided
        if (!target) target = "";
        if (!files[target] || files[target].type !== "folder") return;

        const itemsToPaste = Array.from(clipboard);

        itemsToPaste.forEach(src => {
            const name = src.split("/").pop();
            let destPath = target ? `${target}/${name}` : name;

            // Prevent overwriting
            let counter = 1;
            while (files[destPath]) {
                destPath = target ? `${target}/${name} (${counter})` : `${name} (${counter})`;
                counter++;
            }

            function cloneItem(srcPath, destPath, parentFolder) {
                const srcItem = files[srcPath];
                if (!srcItem) return;

                files[destPath] = {
                    type: srcItem.type,
                    content: srcItem.type === "file" ? srcItem.content : "",
                    children: [],
                };

                // Add to parent's children
                if (!files[parentFolder].children.includes(destPath)) {
                    files[parentFolder].children.push(destPath);
                }

                // Recursively clone folder contents
                if (srcItem.type === "folder") {
                    srcItem.children.forEach(child => {
                        const childName = child.split("/").pop();
                        const childDestPath = `${destPath}/${childName}`;
                        cloneItem(child, childDestPath, destPath);
                    });
                }
            }

            cloneItem(src, destPath, target);

            if (cutMode) deleteFile(src);
        });

        cutMode = false;
        updateSidebar();
        saveFiles();
    }

    // ===== NEW FILE/FOLDER BUTTONS =====
    newFileBtn.addEventListener("click", () => {
        const name = prompt("File name:"); if (!name) return;
        const path = createFile(name, "file");
        if (path) { currentFile = path; setEditorContent(files[path].content); }
    });
    newFolderBtn.addEventListener("click", () => {
        const name = prompt("Folder name:"); if (!name) return;
        createFile(name, "folder");
    });

    // ===== PREVIEW =====
    function updatePreview() {
        if (!livePreviewEnabled) return;
        if (!currentFile) { preview.srcdoc = "<html><body style='background:white;'>No file selected</body></html>"; return; }
        let content = getEditorContent();
        if (currentFile.endsWith(".md")) preview.srcdoc = `<html><body style="background:white;">${marked.parse(content || "")}</body></html>`;
        else if (currentFile.endsWith(".html")) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, "text/html");
            doc.querySelectorAll("script[src]").forEach(s => {
                const p = s.getAttribute("src"); if (files[p]) { const i = document.createElement("script"); i.textContent = files[p].content; s.replaceWith(i); }
            });
            doc.querySelectorAll("link[rel=stylesheet]").forEach(l => {
                const p = l.getAttribute("href"); if (files[p]) { const st = document.createElement("style"); st.textContent = files[p].content; l.replaceWith(st); }
            });
            if (!doc.body.style.backgroundColor) doc.body.style.backgroundColor = "white";
            content = "<!DOCTYPE html>\n" + doc.documentElement.outerHTML;
            preview.srcdoc = content;
        } else if (currentFile.endsWith(".json")) {
            try { preview.srcdoc = `<html><body style="background:white;"><pre>${JSON.stringify(JSON.parse(content), null, 2)}</pre></body></html>`; }
            catch { preview.srcdoc = `<html><body style="background:white;"><pre>${content.replace(/</g, "&lt;")}</pre></body></html>`; }
        } else { preview.srcdoc = `<html><body style="background:white;"><pre>${content.replace(/</g, "&lt;")}</pre></body></html>`; }
    }

    togglePreviewBtn.addEventListener("click", () => { livePreviewEnabled = !livePreviewEnabled; preview.style.display = livePreviewEnabled ? "block" : "none"; if (livePreviewEnabled) updatePreview(); });
    editor.on("change", () => { saveFiles(); updatePreview(); });

    // ===== HIGHLIGHT =====
    highlightSelect.addEventListener("change", () => { setEditorMode(highlightSelect.value || "javascript"); });

    // ===== FORMAT =====
    async function formatWithPrettier(lang) {
        if (!currentFile) return;
        if (!["javascript", "html", "css", "json", "markdown"].includes(lang)) { alert("Formatting not available"); return; }
        const parserMap = { javascript: "babel", html: "html", css: "css", json: "json", markdown: "markdown" };
        const code = editor.getValue() || "";
        try {
            const formatted = await prettier.format(code, { parser: parserMap[lang], plugins: prettierPlugins, tabWidth: 4, useTabs: true });
            editor.setValue(formatted);
            editor.refresh();
        } catch (e) { alert("Formatting failed: " + e.message); console.error(e); }
    }
    formatSelect.addEventListener("change", () => formatWithPrettier(formatSelect.value));
    document.addEventListener("keydown", e => { if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "f") { e.preventDefault(); formatWithPrettier(formatSelect.value || "javascript"); } });
    // Right-click anywhere in the sidebar (including root empty space)
    fileTree.addEventListener("contextmenu", e => {
        e.preventDefault();
        // Determine if a specific item was clicked
        let path = "";
        const targetItem = e.target.closest(".sidebar-item");
        if (targetItem) path = targetItem.dataset.path;

        showContextMenu(e.pageX, e.pageY, path);
    });

    console.log(prettierPlugins);

    // ===== INITIALIZE =====
    loadFiles();
    updateSidebar();
    togglePreviewBtn.click();

    // ===== EXTENSIONS SYSTEM =====
    const extensionsBtn = document.getElementById("extensionsBtn");
    const extensionsPanel = document.getElementById("extensionsPanel");
    const extensionsList = document.getElementById("extensionsList");
    let extensions = [];

    // Load extensions from localStorage
    function loadExtensions() {
        const stored = localStorage.getItem("nullnotes-extensions");
        if (stored) extensions = JSON.parse(stored);

        extensions.forEach(ext => {
            if (ext.url && !ext.content) {
                fetch(ext.url)
                    .then(r => r.text())
                    .then(js => { ext.content = js; eval(js); });
            } else if (ext.content) eval(ext.content);
        });

        updateExtensionsUI();
    }

    // Update the panel UI
    function updateExtensionsUI() {
        extensionsList.innerHTML = "";
        extensions.forEach((ext, i) => {
            const div = document.createElement("div");
            div.style.display = "flex";
            div.style.justifyContent = "space-between";
            div.style.alignItems = "center";
            div.style.padding = "2px 0";

            const name = document.createElement("span");
            name.textContent = ext.name;

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.style.marginLeft = "8px";
            removeBtn.addEventListener("click", () => {
                extensions.splice(i, 1);
                localStorage.setItem("nullnotes-extensions", JSON.stringify(extensions));
                updateExtensionsUI();
            });

            div.appendChild(name);
            div.appendChild(removeBtn);
            extensionsList.appendChild(div);
        });
    }

    // Toggle panel
    extensionsBtn.addEventListener("click", () => {
        const visible = extensionsPanel.style.display !== "none";
        if (visible) { extensionsPanel.style.display = "none"; return; }

        extensionsPanel.style.display = "block";

        // Option to add new extension
        const addBtn = document.createElement("button");
        addBtn.textContent = "Add Extension";
        addBtn.style.width = "100%";
        addBtn.style.marginTop = "5px";
        addBtn.addEventListener("click", () => {
            const name = prompt("Extension name:");
            if (!name) return;

            const url = prompt("Enter URL of JS file (leave blank to paste code):");
            if (url) {
                const ext = { name, url, content: null };
                extensions.push(ext);
                fetch(url).then(r => r.text()).then(js => { ext.content = js; eval(js); });
            } else {
                const code = prompt("Paste JS code here:");
                if (!code) return;
                extensions.push({ name, url: null, content: code });
                eval(code);
            }

            localStorage.setItem("nullnotes-extensions", JSON.stringify(extensions));
            updateExtensionsUI();
        });

        if (!extensionsPanel.querySelector("button")) extensionsPanel.appendChild(addBtn);
    });

    // Load extensions when editor loads
    loadExtensions();
});