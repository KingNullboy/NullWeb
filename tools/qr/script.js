(() => {
    const form = document.getElementById("qrForm");
    const typeSelect = document.getElementById("type");
    const preview = document.getElementById("qr-preview");
    const previewActions = document.getElementById("previewActions");
    const downloadQr = document.getElementById("downloadQr");
    const copyData = document.getElementById("copyData");
    const formError = document.getElementById("formError");
    const previewState = document.getElementById("previewState");
    const dataSummary = document.getElementById("dataSummary");
    let currentData = "";

    function setError(message) {
        formError.textContent = message;
        formError.hidden = !message;
    }

    function escapeWifi(value) {
        return value.replace(/([\\;,:"])/g, "\\$1");
    }

    function getData() {
        const type = typeSelect.value;
        if (type === "url") return document.getElementById("url").value.trim();
        if (type === "text") return document.getElementById("text").value.trim();
        const ssid = document.getElementById("ssid").value.trim();
        const password = document.getElementById("password").value;
        const encryption = document.getElementById("encryption").value;
        if (!ssid) return "";
        return `WIFI:T:${encryption};S:${escapeWifi(ssid)};P:${escapeWifi(password)};;`;
    }

    function updateFields() {
        const type = typeSelect.value;
        document.getElementById("field-url").hidden = type !== "url";
        document.getElementById("field-text").hidden = type !== "text";
        document.getElementById("field-wifi").hidden = type !== "wifi";
        setError("");
    }

    typeSelect.addEventListener("change", updateFields);
    updateFields();

    form.addEventListener("submit", event => {
        event.preventDefault();
        setError("");
        const data = getData();
        if (!data) {
            setError(typeSelect.value === "wifi" ? "Enter a network name to continue." : "Add some content to continue.");
            return;
        }
        if (typeSelect.value === "url" && !/^https?:\/\//i.test(data)) {
            setError("Enter a complete URL starting with http:// or https://.");
            return;
        }

        const params = new URLSearchParams({
            data,
            ec: document.getElementById("ec").value,
            size: String(Math.min(20, Math.max(1, Number(document.getElementById("size").value) || 8))),
            margin: String(Math.min(10, Math.max(0, Number(document.getElementById("margin").value) || 2)))
        });
        const imageUrl = `gen.php?${params}`;
        currentData = data;
        preview.innerHTML = "";
        const image = document.createElement("img");
        image.src = imageUrl;
        image.alt = "Generated QR code";
        image.onload = () => {
            preview.appendChild(image);
            previewActions.hidden = false;
            downloadQr.href = imageUrl;
            previewState.textContent = "Generated";
            dataSummary.textContent = `${data.length} characters · ${document.getElementById("ec").value} error correction`;
        };
        image.onerror = () => { preview.innerHTML = ""; setError("The QR image could not be generated."); previewState.textContent = "Error"; };
        preview.appendChild(image);
    });

    copyData.addEventListener("click", async () => {
        if (!currentData) return;
        try {
            await navigator.clipboard.writeText(currentData);
            copyData.textContent = "Copied";
            setTimeout(() => { copyData.textContent = "Copy content"; }, 1400);
        } catch { setError("Your browser blocked clipboard access."); }
    });
})();
