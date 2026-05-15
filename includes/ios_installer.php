<?php

function generateUUID() {
    return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
}

$domain = $_SERVER['HTTP_HOST'];
$url = "https://$domain/iosappfix.html";

$iconPath = $_SERVER['DOCUMENT_ROOT'] . '/logo-fullres.png';

$iconBase64 = '';
if (file_exists($iconPath) && is_readable($iconPath)) {
    $iconBase64 = base64_encode(file_get_contents($iconPath));
}

$uuid1 = generateUUID();
$uuid2 = generateUUID();

header('Content-Type: application/x-apple-aspen-config');
header('Content-Disposition: attachment; filename="NullWeb.mobileconfig"');

$url = htmlspecialchars($url, ENT_XML1, 'UTF-8');

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