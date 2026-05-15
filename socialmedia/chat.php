<?php
ob_start();
$title = "NullChat";
include $_SERVER['DOCUMENT_ROOT'] . '/includes/meta.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-main: #0a0a0b;
            --bg-sidebar: #0f0f11;
            --bg-input: #16161a;
            --bg-panel: #131316;
            --bg-hover: rgba(255,255,255,0.04);
            --bg-msg-hover: rgba(255,255,255,0.025);
            --text-primary: #e8e8f0;
            --text-muted: #6e6e82;
            --text-subtle: #9999b0;
            --accent: #7c6af7;
            --accent-dim: rgba(124,106,247,0.15);
            --accent-glow: rgba(124,106,247,0.3);
            --danger: #e05c6a;
            --danger-dim: rgba(224,92,106,0.12);
            --success: #4caf7d;
            --border: rgba(255,255,255,0.06);
            --border-strong: rgba(255,255,255,0.1);
            --font-ui: 'IBM Plex Sans', sans-serif;
            --font-mono: 'JetBrains Mono', monospace;
            --radius: 8px;
            --radius-sm: 5px;
            --sidebar-w: 240px;
            --transition: 0.15s ease;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            height: 100vh;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            background: var(--bg-main);
            color: var(--text-primary);
            font-family: var(--font-ui);
            font-size: 14px;
            line-height: 1.5;
        }

        /* ── LAYOUT ── */
        .app-container { display: flex; flex: 1; overflow: hidden; }

        /* ── SIDEBAR ── */
        .sidebar {
            width: var(--sidebar-w);
            background: var(--bg-sidebar);
            border-right: 1px solid var(--border);
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
        }

        .sidebar-header {
            padding: 16px 14px;
            font-weight: 700;
            font-size: 11px;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--text-muted);
            border-bottom: 1px solid var(--border);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .sidebar-header span { color: var(--text-subtle); }

        .channel-list { flex: 1; padding: 8px 6px; overflow-y: auto; }
        .channel-list::-webkit-scrollbar { width: 3px; }
        .channel-list::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 2px; }

        .chan-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 7px 10px;
            margin-bottom: 1px;
            border-radius: var(--radius-sm);
            cursor: pointer;
            color: var(--text-muted);
            transition: color var(--transition), background var(--transition);
            font-size: 13.5px;
            font-weight: 500;
            user-select: none;
        }

        .chan-item::before {
            content: '#';
            font-family: var(--font-mono);
            font-size: 13px;
            opacity: 0.5;
            flex-shrink: 0;
        }

        .chan-item:hover { background: var(--bg-hover); color: var(--text-primary); }
        .chan-item.active {
            background: var(--accent-dim);
            color: var(--accent);
            font-weight: 600;
        }
        .chan-item.active::before { opacity: 0.8; }

        /* ── CHAT VIEW ── */
        .chat-view { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }

        .chat-header {
            padding: 0 20px;
            height: 52px;
            border-bottom: 1px solid var(--border);
            display: flex;
            align-items: center;
            gap: 10px;
            flex-shrink: 0;
        }

        .chat-header-hash {
            font-family: var(--font-mono);
            color: var(--text-muted);
            font-size: 16px;
        }

        .chat-header-name {
            font-weight: 600;
            font-size: 15px;
            color: var(--text-primary);
        }

        .message-log {
            flex: 1;
            overflow-y: auto;
            padding: 16px 0;
            display: flex;
            flex-direction: column;
        }

        .message-log::-webkit-scrollbar { width: 4px; }
        .message-log::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 2px; }

        /* ── MESSAGES ── */
        .msg-row {
            display: flex;
            gap: 13px;
            padding: 4px 20px;
            position: relative;
            transition: background var(--transition);
        }

        .msg-row:hover { background: var(--bg-msg-hover); }

        .msg-row:hover .msg-actions { opacity: 1; }

        .msg-pfp {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #222;
            object-fit: cover;
            flex-shrink: 0;
            margin-top: 2px;
        }

        .msg-body { flex: 1; min-width: 0; }

        .msg-meta {
            display: flex;
            align-items: baseline;
            gap: 8px;
            margin-bottom: 3px;
        }

        .msg-author {
            font-weight: 600;
            font-size: 14px;
            color: var(--text-primary);
        }

        .msg-time {
            font-size: 11px;
            color: var(--text-muted);
            font-family: var(--font-mono);
        }

        .msg-content {
            color: #c8c8d8;
            font-size: 14px;
            line-height: 1.55;
            word-break: break-word;
        }

        /* markdown inside messages */
        .msg-content p { margin: 0 0 4px; }
        .msg-content p:last-child { margin-bottom: 0; }
        .msg-content code {
            font-family: var(--font-mono);
            font-size: 12.5px;
            background: rgba(255,255,255,0.07);
            border: 1px solid var(--border-strong);
            border-radius: 3px;
            padding: 1px 5px;
        }
        .msg-content pre {
            background: #0d0d10;
            border: 1px solid var(--border-strong);
            border-radius: var(--radius-sm);
            padding: 12px;
            overflow-x: auto;
            margin: 6px 0;
        }
        .msg-content pre code {
            background: none;
            border: none;
            padding: 0;
            font-size: 12.5px;
        }
        .msg-content strong { color: var(--text-primary); font-weight: 600; }
        .msg-content em { color: var(--text-subtle); }
        .msg-content blockquote {
            border-left: 3px solid var(--accent);
            padding-left: 10px;
            color: var(--text-subtle);
            margin: 4px 0;
        }
        .msg-content a { color: var(--accent); text-decoration: none; }
        .msg-content a:hover { text-decoration: underline; }
        .msg-content ul, .msg-content ol { padding-left: 18px; margin: 4px 0; }

        .msg-actions {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            opacity: 0;
            transition: opacity var(--transition);
        }

        /* date separator */
        .date-separator {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 20px;
            color: var(--text-muted);
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.08em;
        }

        .date-separator::before,
        .date-separator::after {
            content: '';
            flex: 1;
            height: 1px;
            background: var(--border);
        }

        /* ── INPUT AREA ── */
        .input-area {
            padding: 12px 20px 16px;
            border-top: 1px solid var(--border);
            flex-shrink: 0;
        }

        .input-wrap {
            background: var(--bg-input);
            border: 1px solid var(--border-strong);
            border-radius: var(--radius);
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 0 14px;
            transition: border-color var(--transition);
        }

        .input-wrap:focus-within { border-color: var(--accent); }

        #chatInput {
            flex: 1;
            background: none;
            border: none;
            outline: none;
            color: var(--text-primary);
            font-family: var(--font-ui);
            font-size: 14px;
            padding: 13px 0;
            width: 100%;
        }

        #chatInput::placeholder { color: var(--text-muted); }
        #chatInput:disabled { cursor: not-allowed; opacity: 0.5; }

        .input-hint {
            font-size: 11px;
            color: var(--text-muted);
            font-family: var(--font-mono);
            flex-shrink: 0;
        }

        /* ── BUTTONS ── */
        .btn-icon {
            background: none;
            border: none;
            color: var(--text-muted);
            cursor: pointer;
            padding: 5px;
            border-radius: var(--radius-sm);
            font-size: 13px;
            display: flex;
            align-items: center;
            gap: 5px;
            transition: color var(--transition), background var(--transition);
            white-space: nowrap;
        }
        .btn-icon:hover { color: var(--text-primary); background: var(--bg-hover); }
        .btn-icon.danger:hover { color: var(--danger); background: var(--danger-dim); }

        .btn-primary {
            background: var(--accent);
            color: #fff;
            border: none;
            padding: 9px 18px;
            border-radius: var(--radius-sm);
            cursor: pointer;
            font-weight: 600;
            font-family: var(--font-ui);
            font-size: 13px;
            transition: opacity var(--transition);
        }
        .btn-primary:hover { opacity: 0.85; }

        .btn-danger {
            background: var(--danger-dim);
            color: var(--danger);
            border: 1px solid rgba(224,92,106,0.2);
            padding: 4px 10px;
            border-radius: var(--radius-sm);
            cursor: pointer;
            font-size: 11px;
            font-weight: 600;
            font-family: var(--font-ui);
            transition: background var(--transition);
        }
        .btn-danger:hover { background: rgba(224,92,106,0.22); }

        .btn-ghost {
            background: rgba(255,255,255,0.06);
            color: var(--text-subtle);
            border: 1px solid var(--border);
            padding: 8px 14px;
            border-radius: var(--radius-sm);
            cursor: pointer;
            font-size: 13px;
            font-family: var(--font-ui);
            transition: background var(--transition);
        }
        .btn-ghost:hover { background: rgba(255,255,255,0.1); color: var(--text-primary); }

        /* ── MODAL ── */
        .modal-overlay {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.7);
            backdrop-filter: blur(4px);
            z-index: 9999;
            align-items: center;
            justify-content: center;
        }

        .modal-box {
            background: var(--bg-panel);
            border: 1px solid var(--border-strong);
            border-radius: 12px;
            width: 600px;
            max-height: 82vh;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .modal-header {
            padding: 20px 24px 0;
            flex-shrink: 0;
        }

        .modal-body {
            flex: 1;
            overflow-y: auto;
            padding: 0 24px 20px;
        }

        .modal-body::-webkit-scrollbar { width: 3px; }
        .modal-body::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 2px; }

        .modal-footer {
            padding: 16px 24px;
            border-top: 1px solid var(--border);
            display: flex;
            justify-content: flex-end;
            flex-shrink: 0;
        }

        .tab-nav {
            display: flex;
            gap: 2px;
            border-bottom: 1px solid var(--border);
            padding-bottom: 0;
            margin-bottom: 20px;
        }

        .tab-btn {
            background: none;
            border: none;
            border-bottom: 2px solid transparent;
            margin-bottom: -1px;
            color: var(--text-muted);
            cursor: pointer;
            padding: 10px 14px;
            font-weight: 600;
            font-size: 13px;
            font-family: var(--font-ui);
            transition: color var(--transition);
        }

        .tab-btn:hover { color: var(--text-subtle); }
        .tab-btn.active { color: var(--accent); border-bottom-color: var(--accent); }

        /* ── FORM ELEMENTS ── */
        .field-group { margin-bottom: 12px; }
        .field-label {
            display: block;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--text-muted);
            margin-bottom: 6px;
        }

        input[type="text"],
        input[type="search"],
        select {
            width: 100%;
            padding: 10px 12px;
            background: var(--bg-input);
            border: 1px solid var(--border-strong);
            border-radius: var(--radius-sm);
            color: var(--text-primary);
            font-family: var(--font-ui);
            font-size: 13.5px;
            outline: none;
            transition: border-color var(--transition);
        }

        input[type="text"]:focus,
        input[type="search"]:focus { border-color: var(--accent); }

        /* ── MANAGEMENT ITEMS ── */
        .mgmt-section { margin-top: 12px; }

        .item-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 12px;
            border-radius: var(--radius-sm);
            transition: background var(--transition);
        }

        .item-row:hover { background: var(--bg-hover); }

        /* ── ROLE EDITOR ── */
        .role-editor {
            margin-top: 16px;
            padding: 16px;
            background: rgba(255,255,255,0.03);
            border: 1px solid var(--border-strong);
            border-radius: var(--radius);
        }

        .role-editor-title {
            font-size: 13px;
            font-weight: 700;
            color: var(--text-subtle);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-bottom: 14px;
        }

        .perm-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin-top: 10px;
        }

        .perm-toggle {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 7px 10px;
            border-radius: var(--radius-sm);
            cursor: pointer;
            font-size: 12.5px;
            color: var(--text-subtle);
            transition: background var(--transition), color var(--transition);
            user-select: none;
        }

        .perm-toggle:hover { background: var(--bg-hover); color: var(--text-primary); }

        .perm-toggle input[type="checkbox"] {
            width: 14px;
            height: 14px;
            accent-color: var(--accent);
            cursor: pointer;
            flex-shrink: 0;
        }

        /* ── MEMBER ROWS ── */
        .member-row {
            padding: 10px 12px;
            border-radius: var(--radius-sm);
            transition: background var(--transition);
        }
        .member-row:hover { background: var(--bg-hover); }

        .member-header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 8px;
        }

        .member-pfp {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            object-fit: cover;
            background: #222;
        }

        .member-name { font-weight: 600; font-size: 13.5px; }

        .role-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            padding-left: 40px;
        }

        .role-chip {
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 3px 8px 3px 6px;
            border-radius: 20px;
            font-size: 11.5px;
            font-weight: 500;
            cursor: pointer;
            background: rgba(255,255,255,0.05);
            border: 1px solid var(--border);
            color: var(--text-subtle);
            transition: background var(--transition), border-color var(--transition);
            user-select: none;
        }

        .role-chip:hover { background: rgba(255,255,255,0.09); }
        .role-chip.assigned { border-color: rgba(124,106,247,0.35); background: rgba(124,106,247,0.12); }
        .role-chip input { display: none; }
        .role-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }

        /* ── EMPTY STATE ── */
        .empty-state {
            text-align: center;
            padding: 48px 20px;
            color: var(--text-muted);
        }
        .empty-state-icon { font-size: 32px; margin-bottom: 12px; opacity: 0.4; }
        .empty-state p { font-size: 13px; }

        /* ── SEARCH ── */
        .search-wrap {
            position: relative;
            margin-bottom: 14px;
        }
        .search-wrap input { padding-left: 34px; }
        .search-icon {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-muted);
            font-size: 13px;
            pointer-events: none;
        }

        /* ── NOTIFICATIONS ── */
        .toast {
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: var(--bg-panel);
            border: 1px solid var(--border-strong);
            border-radius: var(--radius);
            padding: 12px 18px;
            font-size: 13px;
            color: var(--text-primary);
            z-index: 99999;
            transform: translateY(80px);
            opacity: 0;
            transition: transform 0.25s ease, opacity 0.25s ease;
            max-width: 280px;
        }
        .toast.show { transform: translateY(0); opacity: 1; }
        .toast.error { border-color: rgba(224,92,106,0.4); }
        .toast.success { border-color: rgba(76,175,125,0.4); }

        /* ── COLOR PICKER INLINE ── */
        .color-row { display: flex; gap: 8px; align-items: center; }
        .color-row input[type="text"] { flex: 1; }
        .color-swatch {
            width: 36px;
            height: 36px;
            border-radius: var(--radius-sm);
            border: 1px solid var(--border-strong);
            flex-shrink: 0;
            cursor: pointer;
        }
    </style>
    <script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.6/purify.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
</head>
<body>
    <?php include $_SERVER['DOCUMENT_ROOT'] . '/includes/navbar.php'; ?>

    <div class="app-container">
        <aside class="sidebar">
            <div class="sidebar-header">
                <span>NullChat</span>
                <button class="btn-icon" onclick="openMgmt()" title="Server Settings">
                    ⚙
                </button>
            </div>
            <div id="channelList" class="channel-list">
                <div class="empty-state" style="padding:24px 10px;">
                    <div class="empty-state-icon">📡</div>
                    <p>Loading channels…</p>
                </div>
            </div>
        </aside>

        <main class="chat-view">
            <div class="chat-header">
                <span class="chat-header-hash" id="chatHeaderHash" style="display:none;">#</span>
                <span class="chat-header-name" id="chatHeaderName">Select a channel</span>
            </div>

            <div id="messageLog" class="message-log">
                <div class="empty-state">
                    <div class="empty-state-icon">💬</div>
                    <p>Pick a channel to start chatting</p>
                </div>
            </div>

            <div class="input-area">
                <div class="input-wrap">
                    <input type="text" id="chatInput" placeholder="Select a channel…" disabled maxlength="2000" autocomplete="off">
                    <span class="input-hint" id="charCount" style="display:none;"></span>
                </div>
            </div>
        </main>
    </div>

    <!-- MANAGEMENT MODAL -->
    <div id="mgmtModal" class="modal-overlay">
        <div class="modal-box">
            <div class="modal-header">
                <div class="tab-nav">
                    <button class="tab-btn active" onclick="switchTab('channels', this)">Channels</button>
                    <button class="tab-btn" onclick="switchTab('roles', this)">Roles</button>
                    <button class="tab-btn" onclick="switchTab('members', this)">Members</button>
                </div>
            </div>

            <div class="modal-body">
                <!-- Channels Tab -->
                <div id="tab-channels" class="tab-content">
                    <button class="btn-primary" onclick="createNewChannel()">+ New Channel</button>
                    <div id="adminChanList" class="mgmt-section"></div>
                </div>

                <!-- Roles Tab -->
                <div id="tab-roles" class="tab-content" style="display:none;">
                    <button class="btn-primary" onclick="createNewRole()">+ New Role</button>
                    <div id="adminRoleList" class="mgmt-section"></div>
                    <div id="roleEditor" class="role-editor" style="display:none;">
                        <div class="role-editor-title" id="roleEditorTitle">Edit Role</div>
                        <div class="field-group">
                            <label class="field-label">Role Name</label>
                            <input type="text" id="roleEditName" placeholder="e.g. Moderator">
                        </div>
                        <div class="field-group">
                            <label class="field-label">Color</label>
                            <div class="color-row">
                                <input type="text" id="roleEditColor" placeholder="#5865F2" oninput="updateSwatch()">
                                <div class="color-swatch" id="colorSwatch" onclick="document.getElementById('roleEditColor').focus()"></div>
                            </div>
                        </div>
                        <div class="field-group">
                            <label class="field-label">Permissions</label>
                            <div class="perm-grid" id="permToggles"></div>
                        </div>
                        <div style="display:flex; gap:8px; margin-top:14px;">
                            <button class="btn-primary" onclick="saveRole()">Save Changes</button>
                            <button class="btn-ghost" onclick="closeRoleEditor()">Cancel</button>
                        </div>
                    </div>
                </div>

                <!-- Members Tab -->
                <div id="tab-members" class="tab-content" style="display:none;">
                    <div class="search-wrap">
                        <span class="search-icon">⌕</span>
                        <input type="search" id="memberSearch" placeholder="Search members…" oninput="filterMembers(this.value)">
                    </div>
                    <div id="adminMemberList" class="mgmt-section"></div>
                </div>
            </div>

            <div class="modal-footer">
                <button class="btn-ghost" onclick="closeMgmt()">Close</button>
            </div>
        </div>
    </div>

    <!-- Toast notification -->
    <div id="toast" class="toast"></div>

    <script>
    (() => {
        // ── BEEP ──
        const beep = new Audio('data:audio/wav;base64,UklGRtIzAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0Ya4zAAAAAGcCzQQtB4cJ1wsaDlAQdRKIFIYWbhg8GvEbiR0EH18gmiGzIqkjfCQpJbIlFCZQJmYmVCYdJr8lOyWRJMMj0SK8IYUgLR+2HSEcbxqjGL8WwxSzEo8QWw');
        beep.preload = 'auto';

        // ── MARKED CONFIG ──
        marked.setOptions({
            breaks: true,
            gfm: true,
            // Disable heading IDs for security
            headerIds: false,
            mangle: false,
        });

        // Custom renderer: open links in new tab
        const renderer = new marked.Renderer();
        renderer.link = (href, title, text) => {
            const t = title ? ` title="${title}"` : '';
            return `<a href="${href}"${t} target="_blank" rel="noopener noreferrer">${text}</a>`;
        };
        marked.use({ renderer });

        // ── STATE ──
        const socket = io({ path: '/api/nullchat/socket.io', withCredentials: true, transports: ['websocket'] });
        let activeChanId = null;
        let activeChannelName = null;
        const serverId = "7c947831-d6b2-4fbd-aaf1-aa96eb6c9429";
        let isFocused = true;
        let currentUser = null;
        let currentPermissions = {};
        let cachedRoles = [];
        let allMembers = [];
        let editingRoleId = null;
        let lastMessageDate = null;

        const ALL_PERMISSIONS = [
            'administrator', 'manage_channels', 'manage_roles',
            'manage_messages', 'send_messages', 'view_channels',
            'kick_members', 'ban_members'
        ];

        window.addEventListener('focus', () => isFocused = true);
        window.addEventListener('blur', () => isFocused = false);

        // ── API ──
        async function api(url, opt = {}) {
            opt.credentials = 'include';
            if (opt.body) opt.headers = { ...opt.headers, 'Content-Type': 'application/json' };
            try {
                const res = await fetch(url, opt);
                const data = await res.json();
                if (!res.ok) {
                    showToast(data.error || `Error ${res.status}`, 'error');
                    return null;
                }
                return data;
            } catch (e) {
                showToast('Network error', 'error');
                return null;
            }
        }

        // ── TOAST ──
        let toastTimer = null;
        function showToast(msg, type = '') {
            const t = document.getElementById('toast');
            t.textContent = msg;
            t.className = `toast ${type} show`;
            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
        }

        // ── UTILS ──
        function formatTime(ts) {
            if (!ts) return '';
            const date = new Date(typeof ts === 'string' && /^\d+$/.test(ts) ? parseInt(ts) : ts);
            if (isNaN(date)) return '';
            return date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', hour12: true });
        }

        function formatDateLabel(ts) {
            const date = new Date(typeof ts === 'string' && /^\d+$/.test(ts) ? parseInt(ts) : ts);
            if (isNaN(date)) return '';
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            if (date.toDateString() === today.toDateString()) return 'Today';
            if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
            return date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
        }

        function isSameDay(ts1, ts2) {
            const d1 = new Date(typeof ts1 === 'string' && /^\d+$/.test(ts1) ? parseInt(ts1) : ts1);
            const d2 = new Date(typeof ts2 === 'string' && /^\d+$/.test(ts2) ? parseInt(ts2) : ts2);
            return d1.toDateString() === d2.toDateString();
        }

        function canDelete(msg) {
            return currentUser && (
                currentUser === msg.author_username ||
                currentPermissions.manage_messages === true ||
                currentPermissions.administrator === true
            );
        }

        function parseContent(raw) {
            const trimmed = raw.trim();
            // Sanitize then parse markdown
            const dirty = marked.parse(trimmed);
            return DOMPurify.sanitize(dirty, {
                ALLOWED_TAGS: ['p','br','strong','em','code','pre','a','ul','ol','li','blockquote','h1','h2','h3','h4','h5','h6','hr','del','span'],
                ALLOWED_ATTR: ['href','title','target','rel','class'],
            });
        }

        function scrollToBottom() {
            const log = document.getElementById('messageLog');
            log.scrollTop = log.scrollHeight;
        }

        function isNearBottom() {
            const log = document.getElementById('messageLog');
            return log.scrollHeight - log.scrollTop - log.clientHeight < 100;
        }

        // ── INIT ──
        async function init() {
            const user = await api('/api/chat/me');
            currentUser = user?.username || null;
            currentPermissions = user?.permissions || {};
            await loadChannels();
        }

        // ── TABS & MODAL ──
        function switchTab(tab, btn) {
            document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
            document.getElementById(`tab-${tab}`).style.display = 'block';
            btn.classList.add('active');
            if (tab === 'roles') loadRoles();
            if (tab === 'channels') loadChannels();
            if (tab === 'members') loadMembers();
        }
        window.switchTab = switchTab;

        function openMgmt() {
            document.getElementById('mgmtModal').style.display = 'flex';
            loadChannels();
        }
        window.openMgmt = openMgmt;

        function closeMgmt() {
            document.getElementById('mgmtModal').style.display = 'none';
        }
        window.closeMgmt = closeMgmt;

        // Close modal on backdrop click
        document.getElementById('mgmtModal').addEventListener('click', e => {
            if (e.target === e.currentTarget) closeMgmt();
        });

        // ── CHANNELS ──
        async function loadChannels() {
            const chans = await api(`/api/chat/guilds/${serverId}/channels`) ?? [];
            const list = document.getElementById('channelList');
            const adminList = document.getElementById('adminChanList');

            if (!chans.length) {
                list.innerHTML = `<div class="empty-state" style="padding:20px 10px;"><div class="empty-state-icon">📭</div><p>No channels yet</p></div>`;
            } else {
                list.innerHTML = chans.map(c => `
                    <div class="chan-item ${activeChanId === c.id ? 'active' : ''}"
                         onclick="selectChannel('${c.id}', '${escAttr(c.name)}')"
                         data-chan-id="${c.id}">
                        ${escText(c.name)}
                    </div>
                `).join('');
            }

            adminList.innerHTML = chans.length ? chans.map(c => `
                <div class="item-row">
                    <span style="color:var(--text-subtle); font-family:var(--font-mono); font-size:13px;"># ${escText(c.name)}</span>
                    <button class="btn-danger" onclick="deleteChannel('${c.id}')">Delete</button>
                </div>
            `).join('') : `<p style="color:var(--text-muted); font-size:13px; padding:10px 0;">No channels.</p>`;

            if (chans.length && !activeChanId) selectChannel(chans[0].id, chans[0].name);
        }
        window.loadChannels = loadChannels;

        async function createNewChannel() {
            const name = prompt("Channel name:");
            if (!name?.trim()) return;
            const res = await api(`/api/chat/guilds/${serverId}/channels`, {
                method: 'POST',
                body: JSON.stringify({ name: name.trim(), position: 0 })
            });
            if (res) { showToast('Channel created', 'success'); loadChannels(); }
        }
        window.createNewChannel = createNewChannel;

        async function deleteChannel(id) {
            if (!confirm("Delete this channel and all its messages?")) return;
            const res = await api(`/api/chat/channels/${id}`, { method: 'DELETE' });
            if (res) {
                showToast('Channel deleted');
                if (activeChanId === id) {
                    activeChanId = null;
                    activeChannelName = null;
                    document.getElementById('messageLog').innerHTML = `<div class="empty-state"><div class="empty-state-icon">💬</div><p>Pick a channel to start chatting</p></div>`;
                    document.getElementById('chatInput').disabled = true;
                    document.getElementById('chatInput').placeholder = 'Select a channel…';
                    document.getElementById('chatHeaderHash').style.display = 'none';
                    document.getElementById('chatHeaderName').textContent = 'Select a channel';
                }
                loadChannels();
            }
        }
        window.deleteChannel = deleteChannel;

        // ── ROLES ──
        async function loadRoles() {
            cachedRoles = await api(`/api/chat/guilds/${serverId}/roles`) ?? [];
            const list = document.getElementById('adminRoleList');
            list.innerHTML = cachedRoles.length ? cachedRoles.map(r => `
                <div class="item-row">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span style="width:10px; height:10px; border-radius:50%; background:${escAttr(r.color || '#888')}; display:inline-block; flex-shrink:0;"></span>
                        <span style="font-weight:600; font-size:13.5px;">${escText(r.name)}</span>
                    </div>
                    <div style="display:flex; gap:6px;">
                        <button class="btn-ghost" style="font-size:12px; padding:5px 10px;" onclick="openRoleEditor(${r.id})">Edit</button>
                        <button class="btn-danger" onclick="deleteRole(${r.id})">Delete</button>
                    </div>
                </div>
            `).join('') : `<p style="color:var(--text-muted); font-size:13px; padding:10px 0;">No roles yet.</p>`;
        }
        window.loadRoles = loadRoles;

        function openRoleEditor(roleId) {
            const role = cachedRoles.find(r => r.id === roleId);
            if (!role) return;
            editingRoleId = roleId;

            document.getElementById('roleEditorTitle').textContent = `Editing "${role.name}"`;
            document.getElementById('roleEditName').value = role.name;
            document.getElementById('roleEditColor').value = role.color || '#5865F2';
            updateSwatch();

            const perms = role.permissions || {};
            document.getElementById('permToggles').innerHTML = ALL_PERMISSIONS.map(p => `
                <label class="perm-toggle">
                    <input type="checkbox" id="perm_${p}" ${perms[p] ? 'checked' : ''}
                        onchange="handleAdminToggle('${p}', this.checked)">
                    ${p.replace(/_/g, ' ')}
                </label>
            `).join('');

            document.getElementById('roleEditor').style.display = 'block';
            document.getElementById('roleEditor').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        window.openRoleEditor = openRoleEditor;

        function updateSwatch() {
            const val = document.getElementById('roleEditColor').value.trim();
            const swatch = document.getElementById('colorSwatch');
            swatch.style.background = val || '#5865F2';
        }
        window.updateSwatch = updateSwatch;

        function handleAdminToggle(permKey, checked) {
            if (permKey === 'administrator' && checked) {
                ALL_PERMISSIONS.forEach(p => {
                    const el = document.getElementById(`perm_${p}`);
                    if (el) el.checked = true;
                });
            }
        }
        window.handleAdminToggle = handleAdminToggle;

        function closeRoleEditor() {
            document.getElementById('roleEditor').style.display = 'none';
            editingRoleId = null;
        }
        window.closeRoleEditor = closeRoleEditor;

        async function saveRole() {
            if (!editingRoleId) return;
            const name = document.getElementById('roleEditName').value.trim();
            const color = document.getElementById('roleEditColor').value.trim();
            if (!name) { showToast('Role name is required', 'error'); return; }

            const permissions = {};
            ALL_PERMISSIONS.forEach(p => {
                permissions[p] = document.getElementById(`perm_${p}`)?.checked ?? false;
            });

            const res = await api(`/api/chat/roles/${editingRoleId}`, {
                method: 'PATCH',
                body: JSON.stringify({ name, color, permissions })
            });
            if (res) {
                showToast('Role saved', 'success');
                closeRoleEditor();
                loadRoles();
            }
        }
        window.saveRole = saveRole;

        async function deleteRole(id) {
            if (!confirm("Delete this role? Members will lose its permissions.")) return;
            const res = await api(`/api/chat/roles/${id}`, { method: 'DELETE' });
            if (res) { showToast('Role deleted'); loadRoles(); }
        }
        window.deleteRole = deleteRole;

        async function createNewRole() {
            const name = prompt("Role name:");
            if (!name?.trim()) return;
            const color = prompt("Color hex:", "#5865F2") || "#5865F2";
            const res = await api(`/api/chat/guilds/${serverId}/roles`, {
                method: 'POST',
                body: JSON.stringify({ name: name.trim(), color, permissions: { send_messages: true, view_channels: true }, position: 0 })
            });
            if (res) { showToast('Role created', 'success'); loadRoles(); }
        }
        window.createNewRole = createNewRole;

        // ── MEMBERS ──
        async function loadMembers() {
            allMembers = await api(`/api/chat/guilds/${serverId}/members`) ?? [];
            if (!cachedRoles.length) cachedRoles = await api(`/api/chat/guilds/${serverId}/roles`) ?? [];
            renderMembers(allMembers);
        }
        window.loadMembers = loadMembers;

        function filterMembers(q) {
            const lq = q.toLowerCase();
            renderMembers(allMembers.filter(m => m.username.toLowerCase().includes(lq)));
        }
        window.filterMembers = filterMembers;

        function renderMembers(members) {
            const list = document.getElementById('adminMemberList');
            if (!members.length) {
                list.innerHTML = `<div class="empty-state" style="padding:24px 0;"><p>No members found</p></div>`;
                return;
            }
            list.innerHTML = members.map(m => {
                const memberRoleIds = (m.roles || []).map(r => r.id);
                const chips = cachedRoles.map(r => {
                    const assigned = memberRoleIds.includes(r.id);
                    return `
                        <label class="role-chip ${assigned ? 'assigned' : ''}" title="${assigned ? 'Remove role' : 'Assign role'}">
                            <input type="checkbox" ${assigned ? 'checked' : ''}
                                onchange="toggleMemberRole('${escAttr(m.username)}', ${r.id}, this.checked, this.closest('.role-chip'))">
                            <span class="role-dot" style="background:${escAttr(r.color || '#888')};"></span>
                            ${escText(r.name)}
                        </label>
                    `;
                }).join('');

                return `
                    <div class="member-row">
                        <div class="member-header">
                            <img src="/socialmedia/pfps/${escAttr(m.pfp || 'default.png')}" class="member-pfp"
                                 onerror="this.src='/socialmedia/pfps/default.png'">
                            <span class="member-name">${escText(m.username)}</span>
                        </div>
                        <div class="role-chips">${chips || '<span style="color:var(--text-muted);font-size:12px;">No roles available</span>'}</div>
                    </div>
                `;
            }).join('');
        }

        async function toggleMemberRole(username, roleId, assign, chipEl) {
            // Optimistic UI
            if (chipEl) chipEl.classList.toggle('assigned', assign);

            const res = assign
                ? await api(`/api/chat/members/${username}/roles`, { method: 'POST', body: JSON.stringify({ roleId }) })
                : await api(`/api/chat/members/${username}/roles/${roleId}`, { method: 'DELETE' });

            if (res) {
                showToast(assign ? 'Role assigned' : 'Role removed', 'success');
                // Update allMembers cache
                const m = allMembers.find(x => x.username === username);
                if (m) {
                    if (assign) {
                        const role = cachedRoles.find(r => r.id === roleId);
                        if (role && !m.roles.find(r => r.id === roleId)) m.roles.push(role);
                    } else {
                        m.roles = m.roles.filter(r => r.id !== roleId);
                    }
                }
            } else {
                // Revert optimistic update
                if (chipEl) chipEl.classList.toggle('assigned', !assign);
            }
        }
        window.toggleMemberRole = toggleMemberRole;

        // ── CHAT ──
        async function selectChannel(id, name) {
            activeChanId = id;
            activeChannelName = name;
            lastMessageDate = null;

            document.getElementById('chatHeaderHash').style.display = 'inline';
            document.getElementById('chatHeaderName').textContent = name;

            const input = document.getElementById('chatInput');
            input.disabled = false;
            input.placeholder = `Message #${name}`;

            document.querySelectorAll('.chan-item').forEach(el => {
                el.classList.toggle('active', el.dataset.chanId === id);
            });

            socket.emit('join_channel', id);

            document.getElementById('messageLog').innerHTML = `<div class="empty-state"><div class="empty-state-icon" style="font-size:20px; margin-bottom:8px;">⏳</div><p>Loading…</p></div>`;

            const msgs = await api(`/api/chat/channels/${id}/messages`) ?? [];
            const log = document.getElementById('messageLog');
            log.innerHTML = '';
            lastMessageDate = null;

            if (!msgs.length) {
                log.innerHTML = `<div class="empty-state"><div class="empty-state-icon">🌱</div><p>No messages yet. Be the first!</p></div>`;
            } else {
                msgs.forEach(m => renderMessage(m, false));
            }
            scrollToBottom();
        }
        window.selectChannel = selectChannel;

        function renderMessage(msg, shouldScroll = true) {
            const log = document.getElementById('messageLog');

            // Clear empty state if present
            const empty = log.querySelector('.empty-state');
            if (empty) empty.remove();

            // Date separator
            if (!lastMessageDate || !isSameDay(lastMessageDate, msg.timestamp)) {
                const sep = document.createElement('div');
                sep.className = 'date-separator';
                sep.textContent = formatDateLabel(msg.timestamp);
                log.appendChild(sep);
                lastMessageDate = msg.timestamp;
            }

            const wasNearBottom = isNearBottom();
            const div = document.createElement('div');
            div.className = 'msg-row';
            div.dataset.messageId = msg.id;

            const deleteBtn = canDelete(msg)
                ? `<div class="msg-actions"><button class="btn-icon danger" onclick="deleteMessage('${msg.id}')">✕ Delete</button></div>`
                : '';

            div.innerHTML = `
                <img src="/socialmedia/pfps/${escAttr(msg.pfp || 'default.png')}"
                     class="msg-pfp"
                     onerror="this.src='/socialmedia/pfps/default.png'">
                <div class="msg-body">
                    <div class="msg-meta">
                        <span class="msg-author">${escText(msg.author_username)}</span>
                        <span class="msg-time">${formatTime(msg.timestamp)}</span>
                    </div>
                    <div class="msg-content">${parseContent(msg.content)}</div>
                </div>
                ${deleteBtn}
            `;

            log.appendChild(div);
            if (shouldScroll && wasNearBottom) scrollToBottom();
        }

        async function deleteMessage(messageId) {
            if (!confirm('Delete this message?')) return;
            const res = await api(`/api/chat/messages/${messageId}`, { method: 'DELETE' });
            if (res) removeMessageEl(messageId);
        }
        window.deleteMessage = deleteMessage;

        function removeMessageEl(id) {
            document.querySelector(`[data-message-id="${id}"]`)?.remove();
        }

        // ── INPUT ──
        const chatInput = document.getElementById('chatInput');
        const charCount = document.getElementById('charCount');

        chatInput.addEventListener('input', () => {
            const len = chatInput.value.length;
            if (len > 1800) {
                charCount.style.display = 'inline';
                charCount.textContent = `${len}/2000`;
                charCount.style.color = len > 1950 ? 'var(--danger)' : 'var(--text-muted)';
            } else {
                charCount.style.display = 'none';
            }
        });

        chatInput.addEventListener('keydown', async e => {
            if (e.key !== 'Enter' || e.shiftKey) return;
            e.preventDefault();
            const content = chatInput.value.trim();
            if (!content || !activeChanId) return;
            chatInput.value = '';
            charCount.style.display = 'none';
            await api(`/api/chat/channels/${activeChanId}/messages`, {
                method: 'POST',
                body: JSON.stringify({ content })
            });
        });

        // ── SOCKET EVENTS ──
        socket.on('new_message', msg => {
            if (msg.channel_id === activeChanId) {
                renderMessage(msg, true);
            }
            if (!isFocused) {
                beep.currentTime = 0;
                beep.play().catch(() => {});
            }
        });

        socket.on('message_deleted', id => removeMessageEl(id));

        // ── ESCAPE HELPERS ──
        function escText(s) {
            return String(s)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');
        }
        function escAttr(s) { return escText(s); }

        // ── START ──
        init();
    })();
    </script>
</body>
</html>