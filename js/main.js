document.addEventListener("DOMContentLoaded", function () {
    // Ads script injection
    if ((localStorage.getItem("ads") === "true" || localStorage.getItem("ads") === null) && !window.location.href.includes("hk.html") && !window.location.href.includes("ECu2-1.12.2.html") && !window.location.href.includes("growmi")) {
        let hilltopScript1 = document.createElement("script");
        hilltopScript1.async = true;
        hilltopScript1.src = "/hilltopadstype1.js";
        document.head.appendChild(hilltopScript1);

        let hilltopScript2 = document.createElement("script");
        hilltopScript2.async = true;
        hilltopScript2.src = "/hilltopadstype2.js";
        document.head.appendChild(hilltopScript2);
    }

    // Simple Analytics script injection
    let simpleAnalyticsScript = document.createElement("script");
    simpleAnalyticsScript.async = true;
    simpleAnalyticsScript.src = "https://scripts.simpleanalyticscdn.com/latest.js";
    document.head.appendChild(simpleAnalyticsScript);
});
