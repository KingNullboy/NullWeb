function updateVisibility() {
    var textElement1 = document.getElementById("mobilePortraitText"); // Text for portrait mode
    var textElement2 = document.getElementById("mobileOnly"); // NullAppify button
    var textElement3 = document.getElementById("installButton"); // iOS install button
    var androidButton = document.getElementById("androidDownloadButton");

    var isPortrait = window.matchMedia("(orientation: portrait)").matches; // Check if device is in portrait mode
    var isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent); // Check if mobile device
    var isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent); // Check if iOS device
    var isAndroid = /Android/i.test(navigator.userAgent); // Check if Android device

    // Show/hide mobile portrait text based on orientation (portrait only)
    if (isMobile) {
        if (isPortrait) {
            textElement1.style.display = "block"; // Show portrait message
        } else {
            textElement1.style.display = "none"; // Hide portrait message in landscape mode
        }
    } else {
        textElement1.style.display = "none"; // Hide on non-mobile devices
    }

    // Show mobile buttons
    if (isMobile) {
        textElement2.style.display = "block"; // NullAppify button
        textElement3.style.display = "block"; // iOS install button
    } else {
        textElement2.style.display = "none";
        textElement3.style.display = "none";
    }

    // Show iOS button only on iOS devices
    if (isIOS) {
        textElement3.style.display = "block"; // iOS install button
    } else {
        textElement3.style.display = "none";
    }

    // Show Android button only on Android devices
    if (isAndroid) {
        androidButton.style.display = "block"; // Android download button
    } else {
        androidButton.style.display = "none";
    }
}

// Event listeners
window.addEventListener("resize", updateVisibility);
window.addEventListener("orientationchange", updateVisibility);
document.addEventListener("DOMContentLoaded", updateVisibility);