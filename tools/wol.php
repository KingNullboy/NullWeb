<?php
$title = "NullWoL - NullWeb";
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include "../includes/meta.php"; ?>
        <style>
            .wol-form {
                max-width: 400px;
                margin: 20px auto;
                padding: 20px;
                background: #111;
                border: 1px solid #333;
                border-radius: 8px;
                text-align: left;
            }
            .form-group {
                margin-bottom: 15px;
            }
            .form-group label {
                display: block;
                margin-bottom: 5px;
                font-weight: bold;
                font-size: 0.9rem;
            }
            .form-group input {
                width: 100%;
                padding: 10px;
                background: #222;
                border: 1px solid #444;
                color: #fff;
                border-radius: 4px;
                box-sizing: border-box;
            }
            .form-group input:focus {
                border-color: #00ffcc;
                outline: none;
            }
            .submit-btn {
                width: 100%;
                padding: 12px;
                background: #00ffcc;
                color: #000;
                border: none;
                font-weight: bold;
                border-radius: 4px;
                cursor: pointer;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .submit-btn:hover {
                background: #00ccaa;
            }
            .alert {
                display: none; /* Hidden by default, controlled via JS */
                padding: 10px;
                margin-bottom: 15px;
                border-radius: 4px;
                text-align: center;
                font-size: 0.9rem;
            }
            .alert.success { display: block; background: #003311; border: 1px solid #00ff44; color: #00ff44; }
            .alert.error { display: block; background: #330000; border: 1px solid #ff0044; color: #ff0044; }
            .back-link { display: inline-block; margin-top: 20px; color: #888; text-decoration: none; }
            .back-link:hover { color: #00ffcc; }
        </style>
    </head>
    <body>
        <main class="main-wrapper">
            <h1>NullWoL Panel</h1>

            <div class="wol-form">
                <div id="statusMessage" class="alert"></div>

                <form id="wolForm">
                    <div class="form-group">
                        <label for="target">Target Hostname / WAN IP</label>
                        <input type="text" id="target" placeholder="e.g., myhome.duckdns.org or 8.8.8.8" required>
                    </div>

                    <div class="form-group">
                        <label for="mac">Device MAC Address</label>
                        <input type="text" id="mac" placeholder="e.g., 00:11:22:33:44:55" required>
                    </div>

                    <div class="form-group">
                        <label for="port">UDP Port (Default: 9)</label>
                        <input type="number" id="port" value="9" min="1" max="65535">
                    </div>

                    <button type="submit" class="submit-btn" id="submitBtn">Wake Machine</button>
                </form>
            </div>

            <a class="back-link" href="./">← Back to NullTools</a>
        </main>

        <?php include "../includes/footer.php"; ?>

        <script>
            document.getElementById('wolForm').addEventListener('submit', async (e) => {
                e.preventDefault();

                const statusMessage = document.getElementById('statusMessage');
                const submitBtn = document.getElementById('submitBtn');

                // Clear previous states
                statusMessage.className = 'alert';
                statusMessage.textContent = '';
                submitBtn.disabled = true;
                submitBtn.textContent = 'Dispatched...';

                const payload = {
                    target: document.getElementById('target').value,
                    mac: document.getElementById('mac').value,
                    port: parseInt(document.getElementById('port').value, 10) || 9
                };

                try {
                    // Hits the Nginx mapped proxy pipeline directly from the browser
                    const response = await fetch('/api/wol', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });

                    const data = await response.json();

                    if (response.ok) {
                        statusMessage.className = 'alert success';
                        statusMessage.textContent = `⚡ ${data.message || 'Magic packet dispatched!'}`;
                    } else {
                        statusMessage.className = 'alert error';
                        statusMessage.textContent = `❌ Error: ${data.error || 'Failed to dispatch magic packet.'}`;
                    }
                } catch (err) {
                    statusMessage.className = 'alert error';
                    statusMessage.textContent = '❌ Network error connecting to public endpoint.';
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Wake Machine';
                }
            });
        </script>
    </body>
</html>
