function promptPassword(pswd, altpswd) {
    let userPassword = prompt("This is a password-protected site. Please enter the password.");
    if (userPassword !== pswd && userPassword !== altpswd) {
        alert("Incorrect password.");
        window.location = "about:blank";
    } else {
        if (userPassword === pswd) {
            localStorage.setItem("auth", "medialvl");
        } else {
            localStorage.setItem("auth", "gxmelvl");
        }
    }
}

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
            gxmelvl: data.gxmelvl // Secondary password (can be stored locally if not secret)
        };
    } catch (error) {
        console.error("Failed to fetch password:", error);
        return null;
    }
}

if (localStorage.getItem("auth") !== "medialvl" && localStorage.getItem("auth") !== "gxmelvl") {
    fetchBackendPasswords().then((passwords) => {
        if (passwords) {
            promptPassword(passwords.medialvl, passwords.gxmelvl);
        } else {
            alert("Error retrieving password.");
            window.location = "about:blank";
        }
    });
}