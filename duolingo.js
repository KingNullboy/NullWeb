document.addEventListener("DOMContentLoaded", function () {
    function checkDuolingoStreak() {
        let iframe = document.getElementById("duolingo");
        if (!iframe) return;

        try {
            let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            let images = iframeDoc.getElementsByClassName("_1CQ4X");

            for (let img of images) {
                if (img.getAttribute("data-test") === "imageStreakEmpty") {
                    iframe.style.display = "block";
                    return;
                }
            }

            iframe.style.display = "none";
        } catch (error) {
            console.error("Cannot access iframe content due to cross-origin restrictions.");
        }
    }

    setInterval(checkDuolingoStreak, 3000);
});