<?php
/**
 * iOS Configuration Profile Generator
 * Generates a .mobileconfig file on the fly
 */

// Function to generate a UUID (standard v4)
function generateUUID() {
    return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
}

// Configuration
$domain = $_SERVER['HTTP_HOST'];
$url = "https://$domain/iosappfix.html";
$uuid1 = generateUUID();
$uuid2 = generateUUID();

$iconBase64 = base64_encode(file_get_contents('/logo.png'));

// Set Headers for Download
header('Content-Type: application/x-apple-aspen-config');
header('Content-Disposition: attachment; filename="NullWeb.mobileconfig"');

// Generate the XML
echo <<<XML
<?xml version="1.0" encoding="UTF-8"?>
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
            <string>NullWeb</string>
            <key>PayloadIdentifier</key>
            <string>com.nullweb.webclip</string>
            <key>PayloadType</key>
            <string>com.apple.webClip.managed</string>
            <key>PayloadUUID</key>
            <string>$uuid1</string>
            <key>PayloadVersion</key>
            <integer>1</integer>
            <key>Precomposed</key>
            <true/>
            <key>URL</key>
            <string>$url</string>
            <key>Icon</key>
            <data>$iconBase64</data>
        </dict>
    </array>
    <key>PayloadDisplayName</key>
    <string>NullWeb</string>
    <key>PayloadIdentifier</key>
    <string>com.nullweb.profile</string>
    <key>PayloadOrganization</key>
    <string>NullWeb</string>
    <key>PayloadUUID</key>
    <string>$uuid2</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
    <key>PayloadType</key>
    <string>Configuration</string>
</dict>
</plist>
XML;