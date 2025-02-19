// Sample data for the configuration profile
const profileData = {
    displayName: "NullWeb",
    payloadIdentifier: "com.nullweb.pwa",
    url: "https://www.nullmedia.infinityfreeapp.com", // Your website URL
    icon: "iosapplogo.png", // Custom icon for the web clip
    organization: "KingNullboy",
    profileIdentifier: "com.nullweb.config",
};

// Function to create and download the mobileconfig file
function generateProfile() {
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
                    <string>NullMedia</string>
                    <key>PayloadIdentifier</key>
                    <string>com.nullmedia.webclip</string>
                    <key>PayloadType</key>
                    <string>com.apple.webClip.managed</string>
                    <key>PayloadUUID</key>
                    <string>12345678-1234-1234-1234-123456789012</string>
                    <key>PayloadVersion</key>
                    <integer>1</integer>
                    <key>Precomposed</key>
                    <true/>
                    <key>URL</key>
                    <string>https://www.nullmedia.infinityfreeapp.com/</string>
                    <key>Icon</key>
                    <data></data> <!-- Optional, you can add a base64 PNG here -->
                </dict>
            </array>
            <key>PayloadDisplayName</key>
            <string>NullMedia Web App</string>
            <key>PayloadIdentifier</key>
            <string>com.nullmedia.profile</string>
            <key>PayloadOrganization</key>
            <string>NullMedia</string>
            <key>PayloadUUID</key>
            <string>87654321-4321-4321-4321-210987654321</string>
            <key>PayloadVersion</key>
            <integer>1</integer>
            <key>PayloadType</key>
            <string>Configuration</string>
        </dict>
    </plist>`;

    const blob = new Blob([mobileConfig], { type: "application/x-apple-aspen-config" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "NullMedia.mobileconfig";

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