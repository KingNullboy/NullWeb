// Sample data for the configuration profile
const profileData = {
    displayName: "NullWeb",
    payloadIdentifier: "com.nullweb.pwa",
    url: "https://www.nullmedia.infinityfreeapp.com/iosappfix.html/", // Your website URL
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
                    <string>` + generateUUID() + `</string>
                    <key>PayloadVersion</key>
                    <integer>2</integer>
                    <key>Precomposed</key>
                    <true/>
                    <key>URL</key>
                    <string>https://www.nullmedia.infinityfreeapp.com/iosappfix.html/</string>
                    <key>Icon</key>
                    <data>iVBORw0KGgoAAAANSUhEUgAAAHIAAAByCAMAAAC4A3VPAAAANlBMVEUAAAD////8/PwWFhZdXV2cnJzT09NCQkILCwvHx8fy8vJycnLj4+O5ubkjIyOLi4svLy+rq6t1zrR1AAADbklEQVRo3u2a2XbjIBBEEQixC/H/PxvLSwwNYrFBZzJH/ZAHJ+a64nZ1NQlC08mF0IW8kBdyBBIvhlKj8XlIMa8cIb7O4iQkpgQ9i1B8BhJbjn6LW3wC0hDkFTHjkZKhoJgcjhQ8RBIxHGkRKDscqSBSjUbiGSLn/1DlRCHSDUfqNSSuerwVhL9Zrk5wHx14AdMnIKdl84jLOcNLvz4ofNbTOcjJPE2Pm+kk5NsOZnwS0vDPR9eHqcDzvPmbVIAlbhbZIPN9/BMpjZoZU043iqyUqZ1ibFZGvpGCPV44Zw43ibw9pTyhsXsdf0+Ed6RbG+ITnF5FmX48W90DGeYn2pS2KoKIHwjRanZk6JloXVpHdF7msoJ0tstqGrlQZEkmBiOd7zgQEtGmm0QWZOoN/PSO4y2vOhZZeIKIjo8PyHp1SmRepuGoXDlkSmRWJk4i4SlkaRSZlbmQBA4ek1kyBEkjj2ViuMLccY7XBv4jkVmZYKEg5vZFhgdl8tORyOy7CZxm3q1gWoIHFW4XmZMZesFN0N3WAyZXsllkRqZU/vu2B8LH8NJ2875xENtyIg9lau9JfLPaSwXaWGVfYploFXkkU/weeTve6Dj7WH+stYlMy3wPYnoQt7zkFk/qvMiUTGxJytECpLdURU1UEhm3ut84/noWIAOnAE1UEgmNEvuNEzhamGPDj5DITNqiTMGOxn6IDAPC5lpEhjJdGD/oIRLM0/cNXY1IT6Z3yxcnzxAJl/LfJqoR+ZYZOg7MNiEymjTPJqoT+ZKpo+Zm+HgNio++N1GdyKdMEb3u8D4BIF18zC3s1oq8d6ZZ44ddBpmSQ2ityN2CKCl9YgEySp2PCYCqa0ulq01mkGVb+6RCx4dbtB2BtNnF3Q0gcpdFLqQ/EgRjiJRbfyQIxhA5on/mwiWMHd09MbJqU2rrHlNALmtvJLwjjpDxMOncPTGy3sIbrL5wh0d7I2kJiUXn/omuv2KVeh3bPQlk5/7h0VKeuI9VY7snhezcP64CKboOk3g7SiB112ESX88lkH2HSbx2ppCWdCxb9RcEuXQs+Yf/R+RCXsh/B4kN7Vimxn36Dsz4DvtCXsg/j+ycCqrchw4NeEmkZiN/r2mPFd12hFXU2vrrj/5fLweifpJIp+avSznZOLzwt3WN6At5IS9kBvkDaf82WU3WxFIAAAAASUVORK5CYII=</data>
                </dict>
            </array>
            <key>PayloadDisplayName</key>
            <string>NullMedia Web App</string>
            <key>PayloadIdentifier</key>
            <string>com.nullmedia.profile</string>
            <key>PayloadOrganization</key>
            <string>NullMedia</string>
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