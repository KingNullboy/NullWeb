document.addEventListener("DOMContentLoaded", function () {
    // Ads script injection
    if (localStorage.getItem("ads") === "true" || localStorage.getItem("ads") === null) {
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

async function checkPassword(input) {
    try {
        const response = await fetch("https://nullapis.netlify.app/.netlify/functions/auth", {
            method: "GET",
            headers: {
                "Script-URL": "https://www.null-web.vastserve.com/links/script.js",
                "X-Password": input
            }
        });
        const result = await response.json();
        return result.correct === true;
    } catch (err) {
        console.error("Failed to verify password:", err);
        return false;
    }
}

async function promptPasswordUntilCorrect() {
    while (true) {
        const userPassword = prompt("This is a password-protected site. Please enter the password.");

        const correct = await checkPassword(userPassword);
        if (correct) {
            localStorage.setItem("auth", userPassword);
            break;
        } else {
            alert("Incorrect password.");
        }
    }
}

async function verifyStoredPassword() {
    const stored = localStorage.getItem("auth");
    if (!stored) return false;
    return await checkPassword(stored);
}

// Immediately verify password on page load
(async () => {
    if (window.location.href.includes("gxmes/") && !window.location.href.includes("gxmes/index") && window.location.href !== window.location.protocol+"//"+document.domain+"/gxmes/") {
        const isCorrect = await verifyStoredPassword();
        if (!isCorrect) {
            await promptPasswordUntilCorrect();
        }
    }
})();