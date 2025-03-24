// Function to create and download the mobileconfig file
function generateProfile() {
    const dispName = document.getElementById("dispName").value;
    const payId = document.getElementById("payId").value;
    const icon = document.getElementById("icon").value;
    const url = document.getElementById("url").value;
    const organ = document.getElementById("organ").value;
    const profId = document.getElementById("profId").value;

    // Sample data for the configuration profile
    const profileData = {
        displayName: "${dispName}",
        payloadIdentifier: "${payId}",
        icon: "${icon}",
        url: "${url}", // Your website URL
        icon: "data:image/png;base64,${icon}", // Custom icon for the web clip
        organization: "${organ}",
        profileIdentifier: "${profId}",
    };
    const mobileConfig = `<?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
        <dict>
            <key>PayloadContent</key>
            <array>
                <dict>
                    <key>FullScreen</key>
                    <true/>
                    <key>IsRemovable</key>
                    <true/>
                    <key>Label</key>
                    <string>${dispName}</string>
                    <key>PayloadIdentifier</key>
                    <string>${payId}</string>
                    <key>PayloadType</key>
                    <string>com.apple.webClip.managed</string>
                    <key>PayloadUUID</key>
                    <string>` + generateUUID() + `</string>
                    <key>PayloadVersion</key>
                    <integer>1</integer>
                    <key>Precomposed</key>
                    <true/>
                    <key>URL</key>
                    <string>${url}</string>
                    <key>Icon</key>
                    <data>${icon}</data>
                </dict>
            </array>
            <key>PayloadDisplayName</key>
            <string>${dispName} Web App</string>
            <key>PayloadIdentifier</key>
            <string>${profId}</string>
            <key>PayloadOrganization</key>
            <string>{${organ}}</string>
            <key>PayloadUUID</key>
            <string>` + generateUUID() + `</string>
            <key>PayloadVersion</key>
            <integer>1</integer>
            <key>PayloadType</key>
            <string>Configuration</string>
        </dict>
    </plist>`;

    const blob = new Blob([mobileConfig], { type: "application/x-apple-aspen-config" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = dispName + ".mobileconfig";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Helper function to generate a UUID (needed for the Profile)
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0,
              v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}