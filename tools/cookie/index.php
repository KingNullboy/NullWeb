<!DOCTYPE HTML>
<html>
<head>
    <?php
        $title = "Cookie Cloud - NullTools";
        include $_SERVER['DOCUMENT_ROOT'] . '/includes/meta.php';
    ?>
    <script src="script.js" defer></script>

    <style>
        .cookie-container {
            max-width: 850px;
            width: 92%;
            margin: 40px auto;
        }

        .cookie-panel {
            border: 2px solid <?= $border ?>;
            background: <?= $bg ?>;
            color: <?= $text ?>;
            padding: 25px;
            border-radius: 16px;
            margin-bottom: 20px;
        }

        .cookie-panel h2 {
            color: <?= $border ?>;
            margin-top: 0;
        }

        .cookie-input {
            width: 100%;
            box-sizing: border-box;
            padding: 12px;
            background: rgba(255,255,255,0.05);
            border: 1px solid <?= $border ?>;
            color: <?= $text ?>;
            border-radius: 8px;
            margin: 8px 0 15px;
        }

        .cookie-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .cookie-actions button {
            flex: 1;
            min-width: 140px;
        }

        .cookie-muted {
            opacity: 0.65;
            font-size: 0.9rem;
        }

        .cookie-token {
            padding: 12px;
            border: 1px solid <?= $border ?>;
            border-radius: 8px;
            margin-top: 10px;
            overflow-wrap: anywhere;
        }

        #cookieMessage {
            margin: 15px 0;
            font-weight: bold;
        }

        #newToken {
            display: none;
        }

        #saveData {
            min-height: 160px;
            resize: vertical;
            font-family: monospace;
        }
    </style>
</head>

<body>
    <?php include $_SERVER['DOCUMENT_ROOT'] . '/includes/navbar.php'; ?>

    <main class="cookie-container">
        <h1>Cookie Cloud</h1>
        <p class="cookie-muted">
            Cloud synchronization for Cookie Clicker.
        </p>

        <div id="cookieMessage" role="status"></div>

        <section class="cookie-panel">
            <h2>Account</h2>
            <p>
                Signed in as <strong id="cookieUsername">Loading...</strong>
            </p>
            <p class="cookie-muted" id="cookieNickname"></p>
        </section>

        <section class="cookie-panel">
            <h2>Cloud Save</h2>

            <p>
                Status: <strong id="saveExists">Loading...</strong>
            </p>
            <p>
                Revision: <strong id="saveRevision">—</strong>
            </p>
            <p>
                Last updated: <strong id="saveUpdated">—</strong>
            </p>

            <hr>

            <label for="saveData">Cookie Clicker save data</label>
            <textarea
                id="saveData"
                class="cookie-input"
                placeholder="Paste a Cookie Clicker save here to upload it..."
            ></textarea>

            <div class="cookie-actions">
                <button class="headerbtn" id="uploadSave">
                    Upload Save
                </button>

                <button class="headerbtn" id="downloadSave">
                    Download Save
                </button>
            </div>

            <p class="cookie-muted">
                Uploading replaces your current cloud save.
                Revision conflicts are detected automatically.
            </p>
        </section>

        <section class="cookie-panel">
            <h2>API Tokens</h2>

            <p class="cookie-muted">
                API tokens allow external Cookie Cloud clients to access
                your saves. Each token is only displayed once.
            </p>

            <label for="tokenName">Token name</label>
            <input
                id="tokenName"
                class="cookie-input"
                type="text"
                maxlength="80"
                placeholder="e.g. Cookie Clicker Browser"
            >

            <p>Permissions:</p>

            <label>
                <input type="checkbox" id="scopeRead" checked>
                Read saves
            </label>
            <br>

            <label>
                <input type="checkbox" id="scopeWrite" checked>
                Write saves
            </label>
            <br>

            <label>
                <input type="checkbox" id="scopeDelete">
                Delete saves
            </label>

            <br><br>

            <button class="headerbtn" id="createToken">
                Generate API Token
            </button>

            <div id="newToken" class="cookie-token">
                <strong>New token — copy it now!</strong>
                <p id="tokenValue"></p>
                <button class="headerbtn" id="copyToken">
                    Copy Token
                </button>
            </div>

            <hr>

            <h3>Your Tokens</h3>
            <div id="tokenList">
                Loading...
            </div>
        </section>
    </main>

    <?php include $_SERVER['DOCUMENT_ROOT'] . '/includes/footer.php'; ?>
</body>
</html>