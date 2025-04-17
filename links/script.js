document.addEventListener("DOMContentLoaded", function () {
    async function fetchBackendPasswords() {
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
                medialvl: data.medialvl,
                gxmelvl: data.gxmelvl
            };
        } catch (error) {
            console.error("Failed to fetch password:", error);
            return null;
        }
    }

    fetchBackendPasswords().then((passwords) => {
        if (passwords) {
            const auth = localStorage.getItem("auth");
            if (auth !== passwords.medialvl && auth !== passwords.gxmelvl) {
                window.location.href = "/auth.html";
            }
        } else {
            alert("Error retrieving password.");
            window.location.href = "/auth.html";
        }
    });
});