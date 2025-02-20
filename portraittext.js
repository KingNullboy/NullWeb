function updateVisibility() {
    var textElement1 = document.getElementById("mobilePortraitText");
    var textElement2 = document.getElementById("mobileOnly");
    var textElement3 = document.getElementById("installButton");
    var isPortrait = window.matchMedia("(orientation: portrait)").matches;
    var isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isPortrait && isMobile) {
        textElement1.style = "display: block;";
    } else {
        textElement1.style = "display: none;";
    }

    if (isMobile) {
        textElement2.style = "display: block"
        textElement3.style = "display: block"
    } else {
        textElement2.style = "display: none"
        textElement3.style = "display: none"
    }
}

window.addEventListener("resize", updateVisibility);
window.addEventListener("orientationchange", updateVisibility);
document.addEventListener("DOMContentLoaded", updateVisibility);