let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Dynamically generate and add the manifest
    generateManifest();

    // Show the Android button when the event fires
    document.getElementById('installButtonAndroid').style.display = 'block';
});

function generateManifest() {
    // Define the manifest as a JavaScript object
    const manifest = {
        "name": "NullMedia Web App",
        "short_name": "NullMedia",
        "description": "A simple web app for NullMedia",
        "start_url": "/index.html",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#000000",
        "icons": [
            {
                "src": "icons/icon-192x192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "icons/icon-512x512.png",
                "sizes": "512x512",
                "type": "image/png"
            }
        ]
    };

    // Create a Blob from the manifest object
    const manifestBlob = new Blob([JSON.stringify(manifest)], { type: "application/json" });

    // Create an object URL for the blob
    const manifestURL = URL.createObjectURL(manifestBlob);

    // Create a link tag to reference the manifest file
    const linkTag = document.createElement("link");
    linkTag.rel = "manifest";
    linkTag.href = manifestURL;

    // Append the link tag to the <head> section of the HTML
    document.head.appendChild(linkTag);
}

function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    }
}