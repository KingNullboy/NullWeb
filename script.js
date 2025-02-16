// Allowed users and their nicknames
const VALID_USERS = {
  "knb2012": { password: "DuckSphere!", nickname: "KingNullboy" },
  "td2011": { password: "mypasswordispassword", nickname: "TD" },
  "seth2012": { password: "110311Seth", nickname: "Quantompower" },
  "td2012": { password: "mypasswordispassword", nickname: "Mr. Myers77" },
  "bry2012": { password: "password", nickname: "Bryleigh" }
};

async function updateGitHubFile() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const title = document.getElementById("title").value;
  const postContent = document.getElementById("postContent").value;

  // Validate user credentials
  if (!(username in VALID_USERS) || VALID_USERS[username].password !== password) {
      alert("Invalid username or password.");
      return;
  }

  // Get nickname
  const nickname = VALID_USERS[username].nickname;

  const pone = "github_pat_11BPPK76Y0dNfzx1aglxpH_zEe2p6OqcE1G8F3";
  const ptwo = "4o2NRwVEeP19fQAQO8QQ1fZ4hDRKHAMKGA5QRDD2sk8Z";
  const whole = pone + ptwo;

  // Fetch the current index.html content
  const response = await fetch("index.html", { mode: "no-cors" });
  if (!response.ok) {
      alert("Failed to fetch the page content.");
      return;
  }

  let currentContent = await response.text();

  // Locate the <center> tag in the body to insert new posts inside it
  let updatedContent = currentContent.replace(
      "</center>",
      "<article><h1>" + nickname + "</h1><br><h2>" + title + "</h2><br><p>" + postContent + "</p></article></center>"
  );

  // GitHub API URL for updating the file
  const githubApiUrl = "https://api.github.com/repos/nullmedia-social/KingNullboys-MiniSocialMedia/contents/index.html";

  // Get file SHA for update
  const fileData = await fetch(githubApiUrl, {
      headers: { "Authorization": "token " + whole }
  });

  if (!fileData.ok) {
      alert("Failed to retrieve file data.");
      return;
  }

  const fileJson = await fileData.json();

  // Encode updated content in base64
  const encodedContent = btoa(updatedContent);

  // Push the updated content to GitHub
  const updateResponse = await fetch(githubApiUrl, {
      method: "PUT",
      headers: {
          "Authorization": "token " + TOKEN,
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          message: "New post by " + nickname,
          content: encodedContent,
          sha: fileJson.sha
      }),
      mode: "no-cors"
  });

  if (!updateResponse.ok) {
      alert("Failed to update the file.");
      return;
  }

  alert("Post added successfully!");
}

async function password() {
  const resp = await fetch("https://nullmedia.infinityfreeapp.com/password.txt", { mode: "no-cors" });
  const Password = await resp.text();
  console.log("Fetched Password:", Password);
  console.log("Fetched Password without .text():", resp);
  let password = prompt("This is a password-protected site. Please enter the password.");
  if (password !== Password) {
      alert("Incorrect password.");
      window.location = "about:blank";
  }
}

password();