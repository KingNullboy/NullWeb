document.addEventListener("DOMContentLoaded", function() {
if (localStorage.getItem("ads") === "true") {
    let adScript = document.createElement("script");
    adScript.setAttribute("data-cfasync", "false");
    adScript.setAttribute("type", "text/javascript");
    adScript.src = "/adType1.js";

    document.head.appendChild(adScript);

    let currentURL = window.location.href;
    let baseURL = window.location.protocol + "//" + document.domain + "/";
    let indexURLs = [baseURL, baseURL + "index", baseURL + "index.html"];

    if (indexURLs.includes(currentURL)) {
        let extraScript = document.createElement("script");
        extraScript.setAttribute("data-cfasync", "false");
        extraScript.setAttribute("type", "text/javascript");
        extraScript.src = "https://shoukigaigoors.net/act/files/tag.min.js?z=9149882";
        extraScript.setAttribute("async", "true");

        document.head.appendChild(extraScript);
    }
}
});