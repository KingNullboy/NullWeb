<?php
$title = "QR Code Generator – NullWeb";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <?php include $_SERVER['DOCUMENT_ROOT']."/includes/meta.php"; ?>
    <style>
        body {
            background: #000;
            color: #fff;
            font-family: 'Lato', sans-serif;
            margin: 0;
            padding: 0;
        }

        main {
            max-width: 600px;
            margin: 40px auto;
            padding: 25px;
            border: 2px solid #fff;
            border-radius: 15px;
            background: #111;
            box-shadow: 0 0 15px rgba(255,255,255,0.1);
        }

        h1 {
            text-align: center;
            margin-bottom: 25px;
            font-size: 2rem;
        }

        label {
            display: block;
            margin-top: 15px;
            font-weight: 300;
        }

        input, select {
            width: 100%;
            padding: 8px 10px;
            margin-top: 5px;
            border-radius: 8px;
            border: 1px solid #fff;
            background: #000;
            color: #fff;
            font-size: 1rem;
        }

        button {
            width: 100%;
            margin-top: 25px;
            padding: 12px;
            border-radius: 12px;
            border: 2px solid #fff;
            background: #000;
            color: #fff;
            font-size: 1.2rem;
            cursor: pointer;
            transition: 0.3s;
        }

        button:hover {
            background: #fff;
            color: #000;
        }

        #qr-preview {
            margin-top: 25px;
            text-align: center;
        }

        img.qr-img {
            margin-top: 15px;
            border: 2px solid #fff;
            border-radius: 10px;
        }

        .hidden { display: none; }
    </style>
</head>

<body>
    <main>
        <h1>QR Code Generator</h1>

        <label for="type">Type</label>
        <select id="type">
            <option value="url">URL</option>
            <option value="text">Text</option>
            <option value="wifi">Wi‑Fi</option>
        </select>

        <div id="field-url">
            <label>URL</label>
            <input id="url" type="text" placeholder="https://example.com">
        </div>

        <div id="field-text" class="hidden">
            <label>Text</label>
            <input id="text" type="text" placeholder="Hello world!">
        </div>

        <div id="field-wifi" class="hidden">
            <label>SSID</label>
            <input id="ssid" type="text">

            <label>Password</label>
            <input id="password" type="text">

            <label>Encryption</label>
            <select id="encryption">
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">None</option>
            </select>
        </div>

        <label>Error Correction</label>
        <select id="ec">
            <option value="L">L (Low)</option>
            <option value="M" selected>M (Medium)</option>
            <option value="Q">Q (Quartile)</option>
            <option value="H">H (High)</option>
        </select>

        <label>Size (1–20)</label>
        <input id="size" type="number" value="8" min="1" max="20">

        <button id="generate">Generate QR Code</button>

        <div id="qr-preview"></div>
    </main>

    <?php include "../../includes/footer.php"; ?>

    <script>
        const typeSel = document.getElementById("type");
        const fieldURL = document.getElementById("field-url");
        const fieldText = document.getElementById("field-text");
        const fieldWiFi = document.getElementById("field-wifi");

        function updateFields() {
            const t = typeSel.value;
            fieldURL.classList.toggle("hidden", t !== "url");
            fieldText.classList.toggle("hidden", t !== "text");
            fieldWiFi.classList.toggle("hidden", t !== "wifi");
        }

        typeSel.addEventListener("change", updateFields);
        updateFields();

        document.getElementById("generate").addEventListener("click", () => {
            let data = "";
            const type = typeSel.value;

            if (type === "url") data = document.getElementById("url").value.trim();
            if (type === "text") data = document.getElementById("text").value.trim();
            if (type === "wifi") {
                const ssid = document.getElementById("ssid").value.trim();
                const pass = document.getElementById("password").value.trim();
                const enc = document.getElementById("encryption").value;
                data = `WIFI:T:${enc};S:${ssid};P:${pass};;`;
            }

            if (!data) {
                alert("Please fill in all required fields.");
                return;
            }

            const ec = document.getElementById("ec").value;
            const size = document.getElementById("size").value;

            const url = `/tools/qr/gen.php?data=${encodeURIComponent(data)}&ec=${ec}&size=${size}`;

            document.getElementById("qr-preview").innerHTML =
                `<img class="qr-img" src="${url}" alt="QR Code">`;
        });
    </script>
</body>
</html>
