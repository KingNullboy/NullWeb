document.addEventListener("DOMContentLoaded", function () {
    
    // Helper function to get a cookie value by name
    function getCookie(name) {
        let value = "; " + document.cookie;
        let parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
    }

    // 1. Ads script injection logic
    const adsSetting = getCookie("ads"); // Read from your new PHP/Cookie system
    const currentURL = window.location.href;

    // Logic: If ads is "true" OR the cookie doesn't exist yet (default to true)
    const showAds = (adsSetting === "true" || adsSetting === null);
    
    // Check exclusions (the files you don't want ads on)
    const isExcluded = currentURL.includes("hk") || 
                       currentURL.includes("ECu2-1.12.2.html") || 
                       currentURL.includes("growmi");

    if (showAds && !isExcluded) {
        console.log("Injecting ads...");
        
        let hilltopScript1 = document.createElement("script");
        hilltopScript1.async = true;
        hilltopScript1.src = "/hilltopadstype1.js";
        document.head.appendChild(hilltopScript1);

        let hilltopScript2 = document.createElement("script");
        hilltopScript2.async = true;
        hilltopScript2.src = "/hilltopadstype2.js";
        document.head.appendChild(hilltopScript2);
    }

    // 2. Simple Analytics script injection (Always inject)
    let simpleAnalyticsScript = document.createElement("script");
    simpleAnalyticsScript.async = true;
    simpleAnalyticsScript.src = "https://scripts.simpleanalyticscdn.com/latest.js";
    document.head.appendChild(simpleAnalyticsScript);
});