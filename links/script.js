/** Button Template:
    <button onclick="window.location.href='urlhere';" target="_blank">namehere</button>
**/

function GxmeFiles() {
    alert('This will download the source code for my website. Don\'t use NullMedia from the source code. If this is your first time downloading these files on this computer: After downloading the files, press the meta key (search key on Chromebooks) type in "files", press enter, click the search bar at the top-right, type in "NullWeb", right click (click with 2 fingers) what pops up, click extract, close the files app ONCE, right click the thing that ends in ".zip", and click delete. Then click the other file twice fast, and click any file that you want to open twice fast, and enjoy your games!\nIf you have done this before on this computer: Press the meta key (search key on Chromebooks), type in files, press enter, click the search bar at the top-right, type in "NullWeb", then click the file that pops up twice fast, and click any file that you want to open twice fast, and enjoy your g*mes!');
    window.location.href = 'https://github.com/nullmedia-social/NullWeb/archive/refs/heads/main.zip';
}

function password(pswd, altpswd) {
    let password = prompt("This is a password-protected site. Please enter the password.");
    if (password !== pswd && password !== altpswd) {
       alert("Incorrect password.");
        window.location = "about:blank";
    } else {
        if (password === pswd) {
            localStorage.setItem("auth", "medialvl");
        } else {
            localStorage.setItem("auth", "gxmelvl");
        }
    }
}

if (localStorage.getItem("auth") !== "medialvl" && localStorage.getItem("auth") !== "gxmelvl") {
    password("NullGamesPass-123", "NullMediaCrew-000");
}