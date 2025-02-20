function updateVisibility() {
    var textElement1 = document.getElementById("mobilePortraitText");
    var textElement2 = document.getElementById("mobileOnly"); // This is the NullAppify button
    var textElement3 = document.getElementById("installButton"); // This is the iOS install button
    var androidButton = document.getElementById("androidDownloadButton");

    var isPortrait = window.matchMedia("(orientation: portrait)").matches;
    var isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    var isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    var isAndroid = /Android/i.test(navigator.userAgent);

    // Show/hide mobile portrait text
    if (isPortrait && isMobile) {
        textElement1.style = "display: block;";
    } else {
        textElement1.style = "display: none;";
    }

    // Show/hide mobile-specific elements
    if (isMobile) {
        // Only show these for mobile, but not Android/iOS-specific
        textElement1.style = "display: block";
    } else {
        textElement1.style = "display: none";
    }

    // Show iOS app button and NullAppify button only on iOS
    if (isIOS) {
        textElement2.style = "display: block"; // NullAppify button
        textElement3.style = "display: block"; // iOS download button
    } else {
        textElement2.style = "display: none";
        textElement3.style = "display: none";
    }

    // Show Android download button only on Android
    if (isAndroid) {
        androidButton.style = "display: block"; // Android download button
    } else {
        androidButton.style = "display: none";
    }
}

// Event listeners
window.addEventListener("resize", updateVisibility);
window.addEventListener("orientationchange", updateVisibility);
document.addEventListener("DOMContentLoaded", updateVisibility);