document.addEventListener("DOMContentLoaded", function () {

    // Helper function to get a cookie value by name
    function getCookie(name) {
        let value = "; " + document.cookie;
        let parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
    }

    // Helper function to set a cookie
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/; SameSite=Lax";
    }

    const currentURL = window.location.href;
    const isExcluded = currentURL.includes("hk") ||
                       currentURL.includes("ECu2-1.12.2.html") ||
                       currentURL.includes("growmi");

    function injectAds() {
        if (isExcluded) return;
        console.log("Injecting ads...");

        let hilltopScript1 = document.createElement("script");
        hilltopScript1.async = true;
        hilltopScript1.src = "/js/hilltopadstype1.js";
        document.head.appendChild(hilltopScript1);

        let hilltopScript2 = document.createElement("script");
        hilltopScript2.async = true;
        hilltopScript2.src = "/js/hilltopadstype2.js";
        document.head.appendChild(hilltopScript2);
    }

    function showPrivacyBanner() {
        const banner = document.createElement("div");
        banner.id = "privacy-banner";
        banner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #1a1a1a;
            color: #fff;
            padding: 16px 20px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            font-family: sans-serif;
            font-size: 14px;
            z-index: 9999;
            box-shadow: 0 -2px 10px rgba(0,0,0,0.3);
        `;

        banner.innerHTML = `
            <span style="flex: 1; min-width: 200px;">
                This site is privacy friendly, but the ads might track you. Disable them if you're not cool with that.
            </span>
            <div style="display: flex; gap: 8px;">
                <button id="privacy-decline" style="padding: 8px 14px; border: 1px solid #fff; background: transparent; color: #fff; border-radius: 4px; cursor: pointer;">Disable Ads</button>
                <button id="privacy-accept" style="padding: 8px 14px; border: none; background: #fff; color: #1a1a1a; border-radius: 4px; cursor: pointer; font-weight: bold;">Got it</button>
            </div>
        `;

        document.body.appendChild(banner);

        document.getElementById("privacy-accept").addEventListener("click", function () {
            setCookie("ads", "true", 365);
            banner.remove();
            injectAds();
        });

        document.getElementById("privacy-decline").addEventListener("click", function () {
            setCookie("ads", "false", 365);
            banner.remove();
            // ads simply never get injected
        });
    }

    // 1. Ads logic
    const adsSetting = getCookie("ads");

    if (adsSetting === null) {
        // No decision made yet — show the banner, don't inject ads until they choose
        showPrivacyBanner();
    } else if (adsSetting === "true") {
        injectAds();
    }
    // if adsSetting === "false", do nothing

    // 2. Simple Analytics script injection (Always inject)
    let simpleAnalyticsScript = document.createElement("script");
    simpleAnalyticsScript.async = true;
    simpleAnalyticsScript.src = "https://scripts.simpleanalyticscdn.com/latest.js";
    document.head.appendChild(simpleAnalyticsScript);
});
