exports.handler = async (event) => {
    const allowedScripts = [
        "https://www.nullweb.byethost6.com/socialmedia/script.js",
        "https://nullweb0.netlify.app/socialmedia/script.js",
        "https://www.nullweb.byethost6.com/links/script.js",
        "https://nullweb0.netlify.app/links/script.js"
    ];

    const allowedOrigins = [
        "https://www.nullweb.byethost6.com",
        "https://nullweb0.netlify.app"
    ];

    const origin = event.headers.origin || "";
    const scriptUrl = event.headers["script-url"] || event.headers["Script-URL"] || "";

    // 🔍 Debug logs (viewable in Netlify function logs)
    console.log("Origin:", origin);
    console.log("Script-URL:", scriptUrl);
    console.log("Method:", event.httpMethod);
    console.log("Is script allowed?", allowedScripts.includes(scriptUrl));
    console.log("Allowed scripts list:", allowedScripts);
    console.log("Compared to scriptUrl:", scriptUrl);

    const corsHeader = allowedOrigins.includes(origin) ? origin : "null";

    // ✅ Handle preflight request
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": corsHeader,
                "Access-Control-Allow-Headers": "Content-Type, Script-URL",
                "Access-Control-Allow-Methods": "GET, OPTIONS"
            },
            body: ""
        };
    }

    // ❌ Reject non-GET requests
    if (event.httpMethod !== "GET") {
        return {
            statusCode: 405,
            headers: {
                "Access-Control-Allow-Origin": corsHeader,
                "Access-Control-Allow-Headers": "Content-Type, Script-URL",
                "Access-Control-Allow-Methods": "GET, OPTIONS"
            },
            body: JSON.stringify({ error: "Method Not Allowed" })
        };
    }

    // 🚫 (Temporarily disabled) Reject if script URL is not allowed
    // if (!allowedScripts.includes(scriptUrl)) {
    //     return {
    //         statusCode: 403,
    //         headers: {
    //             "Access-Control-Allow-Origin": corsHeader,
    //             "Access-Control-Allow-Headers": "Content-Type, Script-URL",
    //             "Access-Control-Allow-Methods": "GET, OPTIONS"
    //         },
    //         body: JSON.stringify({ error: "Forbidden: Invalid Script-URL" })
    //     };
    // }

    // ✅ Respond with site password env vars
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": corsHeader,
            "Access-Control-Allow-Headers": "Content-Type, Script-URL",
            "Access-Control-Allow-Methods": "GET, OPTIONS"
        },
        body: JSON.stringify({
            medialvl: process.env.SITE_PASSWORD_MEDIALVL,
            gxmelvl: process.env.SITE_PASSWORD_GXMELVL
        })
    };
};