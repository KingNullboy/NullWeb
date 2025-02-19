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
    const mobileConfigContent = createMobileConfig(profileData);

    // Create a downloadable link for the .mobileconfig file
    const downloadLink = document.createElement("a");
    const blob = new Blob([mobileConfigContent], { type: "application/x-apple-aspen-config" });
    const url = URL.createObjectURL(blob);

    downloadLink.href = url;
    downloadLink.download = "mywebsite.mobileconfig";
    downloadLink.textContent = "Click here to download and install the configuration profile";

    // Append the link to the body so the user can click it
    document.body.appendChild(downloadLink);
}

// Create the XML content for the .mobileconfig file
function createMobileConfig(profile) {
    const xmlContent = `
        <?xml version="1.0" encoding="UTF-8"?>
        <plist version="1.0">
            <dict>
                <key>PayloadContent</key>
                <array>
                    <dict>
                        <key>PayloadDisplayName</key>
                        <string>${profile.displayName}</string>
                        <key>PayloadIdentifier</key>
                        <string>${profile.payloadIdentifier}</string>
                        <key>PayloadType</key>
                        <string>com.apple.webClip.managed</string>
                        <key>PayloadUUID</key>
                        <string>${generateUUID()}</string>
                        <key>PayloadVersion</key>
                        <integer>1</integer>
                        <key>URL</key>
                        <string>${profile.url}</string>
                        <key>Icon</key>
                        <string>${profile.icon}</string>
                    </dict>
                </array>
                <key>PayloadIdentifier</key>
                <string>${profile.profileIdentifier}</string>
                <key>PayloadOrganization</key>
                <string>${profile.organization}</string>
                <key>PayloadDisplayName</key>
                <string>${profile.displayName}</string>
                <key>PayloadVersion</key>
                <integer>1</integer>
            </dict>
        </plist>
    `;
    return xmlContent;
}

// Helper function to generate a UUID (needed for the Profile)
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0,
              v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}