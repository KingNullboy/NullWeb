/** Button Template:
    <button onclick="window.location.href='urlhere';" target="_blank">namehere</button>
**/

function GxmeFiles() {
    window.location.href='https://github.com/Nullboy000/HTMLFlashArchive/archive/refs/heads/main.zip'
    alert('If this is your first time on this computer: After downloading the files, press the meta key (search key) type in "files", press enter, click the search bar at the top-right, type in HTMLFlashArchive, right click (click with 2 fingers) what pops up, click extract, close the files app ONCE, right click the thing that ends in ".zip", and click delete. Then click the other file twice fast, and click any file that you want to open twice fast, and enjoy your games! \n If you have done this before on this computer: Press the meta key (search key), type in files, press enter, click the search bar at the top-right, type in "HTMLFlashArchive", then click the other file twice fast, and click any file that you want to open twice fast, and enjoy your g*mes!')
}

function password(pswd) {
    let password = prompt("This is a password-protected site. Please enter the password.");
    if (password !== pswd) {
       alert("Incorrect password.");
        window.location = "about:blank";
    } else {
        localStorage.setItem("auth", "true");
    }
}

if (localStorage.getItem("auth") !== "true") {
    password("NullMediaCrew-000");
}