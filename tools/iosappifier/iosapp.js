(() => {
    const form = document.getElementById("appifierForm");
    const fileInput = document.getElementById("iconFile");
    const dropZone = document.getElementById("dropZone");
    const fileLabel = document.getElementById("fileLabel");
    const fileHint = document.getElementById("fileHint");
    const iconError = document.getElementById("iconError");
    const iconPreview = document.getElementById("iconPreview");
    const previewImage = document.getElementById("previewImage");
    const summaryImage = document.getElementById("summaryImage");
    const summaryIcon = document.getElementById("summaryIcon");
    const imageDetails = document.getElementById("imageDetails");
    const formStatus = document.getElementById("formStatus");
    let iconData = "";
    const $ = id => document.getElementById(id);

    function escapeXml(value) {
        return String(value).replace(/[<>&'\"]/g, character => ({
            "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;"
        }[character]));
    }

    function formatBytes(bytes) {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }

    function setError(message) {
        iconError.textContent = message;
        iconError.hidden = !message;
        formStatus.textContent = message || "The profile is generated locally. Install it from Safari on your iPhone.";
        formStatus.classList.toggle("is-error", Boolean(message));
    }

    function clearIcon() {
        iconData = "";
        fileInput.value = "";
        iconPreview.hidden = true;
        summaryImage.hidden = true;
        summaryIcon.querySelector("span").hidden = false;
        fileLabel.textContent = "Drop an image here or choose a file";
        fileHint.textContent = "Your image stays on this device and becomes profile data when you download.";
    }

    function loadIcon(file) {
        setError("");
        if (!file || !file.type.startsWith("image/")) {
            setError("Choose a PNG, JPEG, GIF, or WebP image.");
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            setError("That image is larger than 10 MB. Choose a smaller file.");
            return;
        }
        const reader = new FileReader();
        reader.onload = event => {
            const dataUrl = event.target.result;
            iconData = dataUrl.split(",")[1] || "";
            previewImage.src = dataUrl;
            summaryImage.src = dataUrl;
            summaryImage.hidden = false;
            summaryIcon.querySelector("span").hidden = true;
            iconPreview.hidden = false;
            fileLabel.textContent = file.name;
            fileHint.textContent = "Image converted and ready to include in the profile.";
            imageDetails.textContent = `${file.type.replace("image/", "").toUpperCase()} · ${formatBytes(file.size)}`;
        };
        reader.onerror = () => setError("The image could not be read. Try another file.");
        reader.readAsDataURL(file);
    }

    fileInput.addEventListener("change", () => loadIcon(fileInput.files[0]));
    ["dragenter", "dragover"].forEach(eventName => dropZone.addEventListener(eventName, event => {
        event.preventDefault();
        dropZone.classList.add("is-dragging");
    }));
    ["dragleave", "drop"].forEach(eventName => dropZone.addEventListener(eventName, event => {
        event.preventDefault();
        dropZone.classList.remove("is-dragging");
    }));
    dropZone.addEventListener("drop", event => loadIcon(event.dataTransfer.files[0]));
    dropZone.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            fileInput.click();
        }
    });
    $("removeIcon").addEventListener("click", clearIcon);

    let idsWereEdited = false;

    function identifierPart(value) {
        return value.toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/^\.+|\.+$/g, "") || "webapp";
    }

    function getSuggestedIds() {
        let host = "";
        try { host = new URL($("url").value).hostname.replace(/^www\./, "").split(".")[0]; }
        catch { /* Use the app name when the URL is not ready yet. */ }
        const name = identifierPart($("dispName").value);
        const base = identifierPart(host || name);
        return { payload: `com.${base}.${name}.webclip`, profile: `com.${base}.${name}.profile` };
    }

    function applySuggestedIds(message = "") {
        const suggestions = getSuggestedIds();
        $("payId").value = suggestions.payload;
        $("profId").value = suggestions.profile;
        idsWereEdited = false;
        $("idSuggestion").textContent = message || "Suggested IDs are filled in. You can edit them if you have an existing naming scheme.";
    }

    $("dispName").addEventListener("input", event => {
        $("summaryName").textContent = event.target.value.trim() || "Your app";
        if (!idsWereEdited) applySuggestedIds();
    });
    $("url").addEventListener("input", event => {
        try { $("summaryUrl").textContent = event.target.value ? new URL(event.target.value).hostname : "example.com"; }
        catch { $("summaryUrl").textContent = "example.com"; }
        if (!idsWereEdited) applySuggestedIds();
    });
    ["payId", "profId"].forEach(id => $(id).addEventListener("input", () => { idsWereEdited = true; }));
    $("suggestIds").addEventListener("click", () => {
        applySuggestedIds("Suggested IDs added. You can edit them if you have an existing naming scheme.");
        $("advancedOptions").open = true;
    });

    function generateProfile() {
        const values = Object.fromEntries(new FormData(form).entries());
        const required = ["dispName", "url", "organ", "payId", "profId"];
        const missing = required.find(field => !String(values[field] || "").trim());
        if (missing || !iconData) {
            setError(missing ? "Complete all app details before downloading." : "Choose an app icon before downloading.");
            if (missing) $(missing).focus();
            return;
        }
        try { new URL(values.url); }
        catch { setError("Enter a complete website URL, including https://."); $("url").focus(); return; }

        const profileId = crypto.randomUUID ? crypto.randomUUID() : generateUUID();
        const payloadId = crypto.randomUUID ? crypto.randomUUID() : generateUUID();
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
<key>PayloadContent</key><array><dict>
<key>FullScreen</key><true/><key>IsRemovable</key><true/>
<key>Label</key><string>${escapeXml(values.dispName.trim())}</string>
<key>PayloadIdentifier</key><string>${escapeXml(values.payId.trim())}</string>
<key>PayloadType</key><string>com.apple.webClip.managed</string>
<key>PayloadUUID</key><string>${payloadId}</string><key>PayloadVersion</key><integer>1</integer>
<key>Precomposed</key><true/><key>URL</key><string>${escapeXml(values.url.trim())}</string>
<key>Icon</key><data>${iconData}</data>
</dict></array>
<key>PayloadDisplayName</key><string>${escapeXml(values.dispName.trim())} Web App</string>
<key>PayloadIdentifier</key><string>${escapeXml(values.profId.trim())}</string>
<key>PayloadOrganization</key><string>${escapeXml(values.organ.trim())}</string>
<key>PayloadUUID</key><string>${profileId}</string><key>PayloadVersion</key><integer>1</integer>
<key>PayloadType</key><string>Configuration</string>
</dict></plist>`;

        const blob = new Blob([xml], { type: "application/x-apple-aspen-config" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${values.dispName.trim().replace(/[^a-z0-9_-]+/gi, "-") || "web-app"}.mobileconfig`;
        link.click();
        URL.revokeObjectURL(link.href);
        formStatus.textContent = "Profile downloaded. Open it on your iPhone in Safari to install it.";
        formStatus.classList.remove("is-error");
    }

    form.addEventListener("submit", event => { event.preventDefault(); generateProfile(); });

    function generateUUID() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, character => {
            const random = Math.random() * 16 | 0;
            const value = character === "x" ? random : (random & 3 | 8);
            return value.toString(16);
        });
    }
})();
