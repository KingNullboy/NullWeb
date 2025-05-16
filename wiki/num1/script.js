async function verifyStoredPassword() {
    const storedPassword = localStorage.getItem("auth");
    const scriptUrl = "https://www.null-web.vastserve.com/wiki/num1/script.js"; // update if needed

    if (!storedPassword) return false;

    try {
        const response = await fetch("https://nullwebsecurity.netlify.app/.netlify/functions/auth", {
            method: "GET",
            headers: {
                "Script-URL": scriptUrl,
                "X-Password": storedPassword
            }
        });

        if (!response.ok) return false;

        const result = await response.json();
        return result.correct === true;
    } catch {
        return false;
    }
}

async function promptPasswordUntilCorrect() {
    const scriptUrl = "https://www.null-web.vastserve.com/wiki/num1/script.js"; // same here

    while (true) {
        const userPassword = prompt("This is a password-protected site. Please enter the password.");
        if (!userPassword) {
            alert("No password entered.");
            window.location = "about:blank";
            return;
        }

        try {
            const response = await fetch("https://nullwebsecurity.netlify.app/.netlify/functions/auth", {
                method: "GET",
                headers: {
                    "Script-URL": scriptUrl,
                    "X-Password": userPassword
                }
            });

            if (!response.ok) throw new Error("Request failed");
            const result = await response.json();

            if (result.correct) {
                localStorage.setItem("auth", userPassword);
                return;
            } else {
                alert("Incorrect password.");
            }
        } catch {
            alert("Failed to check password.");
            window.location = "about:blank";
            return;
        }
    }
}

(async () => {
    const isStoredPasswordValid = await verifyStoredPassword();
    if (!isStoredPasswordValid) {
        await promptPasswordUntilCorrect();
    }
})();