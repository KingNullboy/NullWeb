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
        "name": "NullWeb Web App",
        "short_name": "NullWeb",
        "description": "A simple web app for NullWeb",
        "start_url": "/index.html",
        "display": "standalone",
        "background_color": "#000000",
        "theme_color": "#000000",
        "icons": [
            {
                "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAAByCAMAAAC4A3VPAAAANlBMVEUAAAD////8/PwWFhZdXV2cnJzT09NCQkILCwvHx8fy8vJycnLj4+O5ubkjIyOLi4svLy+rq6t1zrR1AAADbklEQVRo3u2a2XbjIBBEEQixC/H/PxvLSwwNYrFBZzJH/ZAHJ+a64nZ1NQlC08mF0IW8kBdyBBIvhlKj8XlIMa8cIb7O4iQkpgQ9i1B8BhJbjn6LW3wC0hDkFTHjkZKhoJgcjhQ8RBIxHGkRKDscqSBSjUbiGSLn/1DlRCHSDUfqNSSuerwVhL9Zrk5wHx14AdMnIKdl84jLOcNLvz4ofNbTOcjJPE2Pm+kk5NsOZnwS0vDPR9eHqcDzvPmbVIAlbhbZIPN9/BMpjZoZU043iqyUqZ1ibFZGvpGCPV44Zw43ibw9pTyhsXsdf0+Ed6RbG+ITnF5FmX48W90DGeYn2pS2KoKIHwjRanZk6JloXVpHdF7msoJ0tstqGrlQZEkmBiOd7zgQEtGmm0QWZOoN/PSO4y2vOhZZeIKIjo8PyHp1SmRepuGoXDlkSmRWJk4i4SlkaRSZlbmQBA4ek1kyBEkjj2ViuMLccY7XBv4jkVmZYKEg5vZFhgdl8tORyOy7CZxm3q1gWoIHFW4XmZMZesFN0N3WAyZXsllkRqZU/vu2B8LH8NJ2875xENtyIg9lau9JfLPaSwXaWGVfYploFXkkU/weeTve6Dj7WH+stYlMy3wPYnoQt7zkFk/qvMiUTGxJytECpLdURU1UEhm3ut84/noWIAOnAE1UEgmNEvuNEzhamGPDj5DITNqiTMGOxn6IDAPC5lpEhjJdGD/oIRLM0/cNXY1IT6Z3yxcnzxAJl/LfJqoR+ZYZOg7MNiEymjTPJqoT+ZKpo+Zm+HgNio++N1GdyKdMEb3u8D4BIF18zC3s1oq8d6ZZ44ddBpmSQ2ityN2CKCl9YgEySp2PCYCqa0ulq01mkGVb+6RCx4dbtB2BtNnF3Q0gcpdFLqQ/EgRjiJRbfyQIxhA5on/mwiWMHd09MbJqU2rrHlNALmtvJLwjjpDxMOncPTGy3sIbrL5wh0d7I2kJiUXn/omuv2KVeh3bPQlk5/7h0VKeuI9VY7snhezcP64CKboOk3g7SiB112ESX88lkH2HSbx2ppCWdCxb9RcEuXQs+Yf/R+RCXsh/B4kN7Vimxn36Dsz4DvtCXsg/j+ycCqrchw4NeEmkZiN/r2mPFd12hFXU2vrrj/5fLweifpJIp+avSznZOLzwt3WN6At5IS9kBvkDaf82WU3WxFIAAAAASUVORK5CYII=",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAAByCAMAAAC4A3VPAAAANlBMVEUAAAD////8/PwWFhZdXV2cnJzT09NCQkILCwvHx8fy8vJycnLj4+O5ubkjIyOLi4svLy+rq6t1zrR1AAADbklEQVRo3u2a2XbjIBBEEQixC/H/PxvLSwwNYrFBZzJH/ZAHJ+a64nZ1NQlC08mF0IW8kBdyBBIvhlKj8XlIMa8cIb7O4iQkpgQ9i1B8BhJbjn6LW3wC0hDkFTHjkZKhoJgcjhQ8RBIxHGkRKDscqSBSjUbiGSLn/1DlRCHSDUfqNSSuerwVhL9Zrk5wHx14AdMnIKdl84jLOcNLvz4ofNbTOcjJPE2Pm+kk5NsOZnwS0vDPR9eHqcDzvPmbVIAlbhbZIPN9/BMpjZoZU043iqyUqZ1ibFZGvpGCPV44Zw43ibw9pTyhsXsdf0+Ed6RbG+ITnF5FmX48W90DGeYn2pS2KoKIHwjRanZk6JloXVpHdF7msoJ0tstqGrlQZEkmBiOd7zgQEtGmm0QWZOoN/PSO4y2vOhZZeIKIjo8PyHp1SmRepuGoXDlkSmRWJk4i4SlkaRSZlbmQBA4ek1kyBEkjj2ViuMLccY7XBv4jkVmZYKEg5vZFhgdl8tORyOy7CZxm3q1gWoIHFW4XmZMZesFN0N3WAyZXsllkRqZU/vu2B8LH8NJ2875xENtyIg9lau9JfLPaSwXaWGVfYploFXkkU/weeTve6Dj7WH+stYlMy3wPYnoQt7zkFk/qvMiUTGxJytECpLdURU1UEhm3ut84/noWIAOnAE1UEgmNEvuNEzhamGPDj5DITNqiTMGOxn6IDAPC5lpEhjJdGD/oIRLM0/cNXY1IT6Z3yxcnzxAJl/LfJqoR+ZYZOg7MNiEymjTPJqoT+ZKpo+Zm+HgNio++N1GdyKdMEb3u8D4BIF18zC3s1oq8d6ZZ44ddBpmSQ2ityN2CKCl9YgEySp2PCYCqa0ulq01mkGVb+6RCx4dbtB2BtNnF3Q0gcpdFLqQ/EgRjiJRbfyQIxhA5on/mwiWMHd09MbJqU2rrHlNALmtvJLwjjpDxMOncPTGy3sIbrL5wh0d7I2kJiUXn/omuv2KVeh3bPQlk5/7h0VKeuI9VY7snhezcP64CKboOk3g7SiB112ESX88lkH2HSbx2ppCWdCxb9RcEuXQs+Yf/R+RCXsh/B4kN7Vimxn36Dsz4DvtCXsg/j+ycCqrchw4NeEmkZiN/r2mPFd12hFXU2vrrj/5fLweifpJIp+avSznZOLzwt3WN6At5IS9kBvkDaf82WU3WxFIAAAAASUVORK5CYII=",
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