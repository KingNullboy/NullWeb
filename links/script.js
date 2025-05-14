function GxmeFiles() {
    alert('This will download the source code for my website. Don\'t use NullMedia from the source code. If this is your first time downloading these files on this computer: After downloading the files, press the meta key (search key on Chromebooks) type in "files", press enter, click the search bar at the top-right, type in "NullWeb", right click (click with 2 fingers) what pops up, click extract, close the files app ONCE, right click the thing that ends in ".zip", and click delete. Then click the other file twice fast, and click any file that you want to open twice fast, and enjoy your games!\nIf you have done this before on this computer: Press the meta key (search key on Chromebooks), type in files, press enter, click the search bar at the top-right, type in "NullWeb", then click the file that pops up twice fast, and click any file that you want to open twice fast, and enjoy your g*mes!');
    window.location.href = 'https://downgit.evecalm.com/#/home?url=https://github.com/nullmedia-social/NullWeb/tree/main/gxmes';
}

async function promptPassword() {
    let userPassword = prompt("This is a password-protected site. Please enter the password.");
    if (!userPassword) {
        alert("No password entered.");
        window.location = "about:blank";
        return;
    }

    const scriptUrl = document.currentScript ? document.currentScript.src : "";

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
        } else {
            alert("Incorrect password.");
            window.location = "about:blank";
        }
    } catch (err) {
        alert("Failed to check password.");
        window.location = "about:blank";
    }
}

if (!localStorage.getItem("auth")) {
    promptPassword();
}

function clearHistory() {
    if (history && history.pushState) {
        history.pushState(null, null, location.href);
        history.back();
        history.forward();
    }
}