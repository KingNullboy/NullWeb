function updateVisibility() {
    var textElement = document.getElementById("mobilePortraitText");
    var isPortrait = window.matchMedia("(orientation: portrait)").matches;
    var isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isPortrait && isMobile) {
        textElement.style = "display: block;";
    } else {
        textElement.style = "display: none;";
    }
}

window.addEventListener("resize", updateVisibility);
window.addEventListener("orientationchange", updateVisibility);
document.addEventListener("DOMContentLoaded", updateVisibility);