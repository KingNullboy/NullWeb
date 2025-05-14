document.addEventListener("DOMContentLoaded", function() {
    // Ads script injection
    if (localStorage.getItem("ads") === "true" || localStorage.getItem("ads") === null) {
        let adScript = document.createElement("script");
        adScript.setAttribute("data-cfasync", "false");
        adScript.setAttribute("type", "module");
        adScript.src = "https://richinfo.co/richpartners/push/js/rp-cl-ob.js?pubid=969176&siteid=361502&niche=33";
        document.head.appendChild(adScript);

        let adScript2 = document.createElement("script");
        adScript2.setAttribute("async", "true");
        adScript2.src = "https://richinfo.co/richpartners/in-page/js/richads-ob.js?pubid=969176&siteid=361500";
        document.head.appendChild(adScript2);
    }

    // Simple Analytics script injection
    let simpleAnalyticsScript = document.createElement("script");
    simpleAnalyticsScript.async = true;
    simpleAnalyticsScript.src = "https://scripts.simpleanalyticscdn.com/latest.js";
    document.head.appendChild(simpleAnalyticsScript);
});

alert("This website is temporarily under lockdown. Screw you Dylan!");
localStorage.clear();
window.location.replace("about:blank");