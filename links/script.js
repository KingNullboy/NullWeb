function GxmeFiles() {
    alert('This will download the source code for my website. Don\'t use NullMedia from the source code. If this is your first time downloading these files on this computer: After downloading the files, press the meta key (search key on Chromebooks) type in "files", press enter, click the search bar at the top-right, type in "NullWeb", right click (click with 2 fingers) what pops up, click extract, close the files app ONCE, right click the thing that ends in ".zip", and click delete. Then click the other file twice fast, and click any file that you want to open twice fast, and enjoy your games!\nIf you have done this before on this computer: Press the meta key (search key on Chromebooks), type in files, press enter, click the search bar at the top-right, type in "NullWeb", then click the file that pops up twice fast, and click any file that you want to open twice fast, and enjoy your g*mes!');
    window.location.href = 'https://downgit.evecalm.com/#/home?url=https://github.com/nullmedia-social/NullWeb/tree/main/gxmes';
}

function promptPassword(pswd, altpswd) {
    if (localStorage.getItem("auth") !== pswd && localStorage.getItem("auth") !== altpswd) {
    let userPassword = prompt("This is a password-protected site. Please enter the password.");
    if (userPassword !== pswd && userPassword !== altpswd) {
        alert("Incorrect password.");
        window.location = "about:blank";
    } else {
        if (userPassword === pswd) {
            localStorage.setItem("auth", pswd);
        } else {
            localStorage.setItem("auth", altpswd);
        }
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

    fetchBackendPasswords().then((passwords) => {
        if (passwords) {
            promptPassword(passwords.medialvl, passwords.gxmelvl);
        } else {
            alert("Error retrieving password.");
            window.location = "about:blank";
        }
    });

// Function to clear history entries
function clearHistory() {
  if (history && history.pushState) {
    history.pushState(null, null, location.href);
    history.back();
    history.forward();
  }
}