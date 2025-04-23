function GxmeFiles() {
    alert('This will download the source code for my website. Don\'t use NullMedia from the source code. If this is your first time downloading these files on this computer: After downloading the files, press the meta key (search key on Chromebooks) type in "files", press enter, click the search bar at the top-right, type in "NullWeb", right click (click with 2 fingers) what pops up, click extract, close the files app ONCE, right click the thing that ends in ".zip", and click delete. Then click the other file twice fast, and click any file that you want to open twice fast, and enjoy your games!\nIf you have done this before on this computer: Press the meta key (search key on Chromebooks), type in files, press enter, click the search bar at the top-right, type in "NullWeb", then click the file that pops up twice fast, and click any file that you want to open twice fast, and enjoy your g*mes!');
    window.location.href = 'https://downgit.evecalm.com/#/home?url=https://github.com/nullmedia-social/NullWeb/tree/main/gxmes';
}

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

// Function to clear history entries
function clearHistory() {
  if (history && history.pushState) {
    history.pushState(null, null, location.href);
    history.back();
    history.forward();
  }
}
  
// Check localStorage entry and handle logic
window.onload = function () {
  if (localStorage.getItem('NDA_accepted') === 'false') {
    // Clear history before redirecting
    clearHistory();
    // Redirect to the data URL
    window.location.href = 'data:text/html;charset=utf-8,%3Chtml%20lang%3D%22en%22%3E%3Chead%3E%3Cmeta%20charset%3D%22UTF-8%22%3E%3Cmeta%20name%3D%22viewport%22%20content%3D%22width%3Ddevice-width%2C%20initial-scale%3D1.0%22%3E%3Ctitle%3EAccess%20Denied%20-%20NDA%20Agreement%20Not%20Accepted%3C/title%3E%3Cstyle%3Ebody%20%7Bfont-family%3A%20Arial%2C%20sans-serif%3B%20background-color%3A%20%23000%3B%20color%3A%20%23fff%3B%20text-align%3A%20center%3B%20margin%3A%200%3B%20padding%3A%200%3B%20height%3A%20100vh%3B%20display%3A%20flex%3B%20justify-content%3A%20center%3B%20align-items%3A%20center%3B%7Dh1%20%7Bfont-size%3A%202.5rem%3B%20margin-bottom%3A%2020px%3B%7Dp%20%7Bfont-size%3A%201.2rem%3B%20max-width%3A%20600px%3B%20margin%3A%200%20auto%3B%7D%3C/style%3E%3C/head%3E%3Cbody%3E%3Cdiv%3E%3Ch1%3EAccess%20Denied%3C/h1%3E%3Cp%3EYou%20are%20unable%20to%20access%20this%20site%20because%20you%20have%20not%20accepted%20the%20Non-Disclosure%20Agreement%20(NDA).%20By%20not%20accepting%20the%20NDA%2C%20you%20are%20permanently%20banned%20from%20the%20site.%20Please%20note%20that%20all%20users%20are%20required%20to%20agree%20to%20the%20terms%20of%20the%20NDA%20before%20being%20granted%20access.%3C/p%3E%3C/div%3E%3C/body%3E%3C/html%3E';
  } else if (localStorage.getItem('NDA_accepted') === null) {
    // If no NDA decision is made yet, show the confirm box
    var agreement = confirm("By accessing this site, you agree to the terms of the Non-Disclosure Agreement (NDA). Do you accept?");
    if (agreement) {
      localStorage.setItem('NDA_accepted', 'true');
    } else {
      localStorage.setItem('NDA_accepted', 'false');
      // Redirect to the data URL
      window.location.href = 'data:text/html;charset=utf-8,%3Chtml%20lang%3D%22en%22%3E%3Chead%3E%3Cmeta%20charset%3D%22UTF-8%22%3E%3Cmeta%20name%3D%22viewport%22%20content%3D%22width%3Ddevice-width%2C%20initial-scale%3D1.0%22%3E%3Ctitle%3EAccess%20Denied%20-%20NDA%20Agreement%20Not%20Accepted%3C/title%3E%3Cstyle%3Ebody%20%7Bfont-family%3A%20Arial%2C%20sans-serif%3B%20background-color%3A%20%23000%3B%20color%3A%20%23fff%3B%20text-align%3A%20center%3B%20margin%3A%200%3B%20padding%3A%200%3B%20height%3A%20100vh%3B%20display%3A%20flex%3B%20justify-content%3A%20center%3B%20align-items%3A%20center%3B%7Dh1%20%7Bfont-size%3A%202.5rem%3B%20margin-bottom%3A%2020px%3B%7Dp%20%7Bfont-size%3A%201.2rem%3B%20max-width%3A%20600px%3B%20margin%3A%200%20auto%3B%7D%3C/style%3E%3C/head%3E%3Cbody%3E%3Cdiv%3E%3Ch1%3EAccess%20Denied%3C/h1%3E%3Cp%3EYou%20are%20unable%20to%20access%20this%20site%20because%20you%20have%20not%20accepted%20the%20Non-Disclosure%20Agreement%20(NDA).%20By%20not%20accepting%20the%20NDA%2C%20you%20are%20permanently%20banned%20from%20the%20site.%20Please%20note%20that%20all%20users%20are%20required%20to%20agree%20to%20the%20terms%20of%20the%20NDA%20before%20being%20granted%20access.%3C/p%3E%3C/div%3E%3C/body%3E%3C/html%3E';
    }
  }
};