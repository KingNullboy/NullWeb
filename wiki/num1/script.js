function password(pswd) {
    let password = prompt("This is a password-protected site. Please enter the password.");
    if (password !== pswd) {
        alert("Incorrect password.");
        window.location = "about:blank";
    }
  }
  
  password("NullMediaCrew-000");