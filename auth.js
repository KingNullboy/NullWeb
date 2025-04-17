document.addEventListener("DOMContentLoaded", function() {
    async function fetchBackendPasswords() {
    // Automatically detect the script's URL
    let scriptUrl = document.currentScript ? document.currentScript.src : "";
    
    try {
        const response = await fetch("https://nullwebsecurity.netlify.app/.netlify/functions/auth", {
            method: "GET",
            headers: {
                "Script-URL": scriptUrl
            }
        });

        if (!response.ok) throw new Error("Forbidden or failed");

        const data = await response.json();
        return {
            medialvl: data.medialvl, // Main password
            gxmelvl: data.gxmelvl // Secondary password
        };
    } catch (error) {
        console.error("Failed to fetch password:", error);
        return null;
    }
}

function authorize() {
    fetchBackendPasswords().then((passwords) => {
        if (passwords) {
            const enteredPassword = document.getElementById("password").value;
            const fromSocialMedia = document.referrer.includes("socialmedia");

            const correctPassword = fromSocialMedia ? passwords.medialvl : passwords.gxmelvl;

            if (enteredPassword === correctPassword) {
                localStorage.setItem("auth", enteredPassword);
                window.history.back();
            } else {
                alert("Incorrect password.");
                window.location.reload();
            }
        } else {
            alert("Error retrieving password.");
            window.location.reload();
        }
    });
}
});